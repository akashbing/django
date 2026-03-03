from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (RegisterSerializer, LoginSerializer, UserSerializer,
    ForgotPasswordSerializer, ResetPasswordSerializer, ChangePasswordSerializer)
from .models import PasswordResetToken

User = get_user_model()

def get_tokens(user):
    r = RefreshToken.for_user(user)
    return {"refresh": str(r), "access": str(r.access_token)}


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        s = RegisterSerializer(data=request.data)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        user = s.save()
        return Response({"message": "Account created!", "user": UserSerializer(user).data, "tokens": get_tokens(user)}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        s = LoginSerializer(data=request.data)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        user = authenticate(request, username=s.validated_data["email"], password=s.validated_data["password"])
        if not user:
            return Response({"error": "Invalid email or password."}, status=401)
        if not user.is_active:
            return Response({"error": "Account is deactivated."}, status=403)
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])
        return Response({"message": "Login successful.", "user": UserSerializer(user).data, "tokens": get_tokens(user)})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            RefreshToken(request.data.get("refresh")).blacklist()
            return Response({"message": "Logged out."})
        except Exception:
            return Response({"error": "Invalid token."}, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)
    def patch(self, request):
        s = UserSerializer(request.user, data=request.data, partial=True)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        s.save()
        return Response({"message": "Profile updated.", "user": s.data})


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        s = ChangePasswordSerializer(data=request.data)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        if not request.user.check_password(s.validated_data["old_password"]):
            return Response({"error": "Current password is incorrect."}, status=400)
        request.user.set_password(s.validated_data["new_password"])
        request.user.save()
        return Response({"message": "Password changed.", "tokens": get_tokens(request.user)})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        s = ForgotPasswordSerializer(data=request.data)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        email = s.validated_data["email"].lower()
        # Always return success (don't reveal if email exists)
        try:
            user  = User.objects.get(email=email, is_active=True)
            token = PasswordResetToken.objects.create(user=user)
            reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token.token}"
            send_mail(
                subject="Reset your password",
                message=f"Hi {user.name},\n\nClick the link below to reset your password (valid for 1 hour):\n\n{reset_url}\n\nIf you did not request this, ignore this email.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=True,
            )
        except User.DoesNotExist:
            pass
        return Response({"message": "If that email exists, a reset link has been sent."})


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        s = ResetPasswordSerializer(data=request.data)
        if not s.is_valid():
            return Response({"errors": s.errors}, status=400)
        try:
            token_obj = PasswordResetToken.objects.select_related("user").get(token=s.validated_data["token"])
        except PasswordResetToken.DoesNotExist:
            return Response({"error": "Invalid or expired reset link."}, status=400)
        if not token_obj.is_valid():
            return Response({"error": "Reset link has expired. Please request a new one."}, status=400)
        token_obj.user.set_password(s.validated_data["password"])
        token_obj.user.save()
        token_obj.is_used = True
        token_obj.save()
        return Response({"message": "Password reset successfully. You can now log in."})


class ValidateResetTokenView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        token = request.query_params.get("token")
        if not token:
            return Response({"valid": False, "error": "Token required."}, status=400)
        try:
            token_obj = PasswordResetToken.objects.get(token=token)
            return Response({"valid": token_obj.is_valid()})
        except PasswordResetToken.DoesNotExist:
            return Response({"valid": False, "error": "Invalid token."})
