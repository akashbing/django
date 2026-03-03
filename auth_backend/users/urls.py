from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("register/",              views.RegisterView.as_view(),           name="register"),
    path("login/",                 views.LoginView.as_view(),              name="login"),
    path("logout/",                views.LogoutView.as_view(),             name="logout"),
    path("token/refresh/",         TokenRefreshView.as_view(),             name="token_refresh"),
    path("profile/",               views.ProfileView.as_view(),            name="profile"),
    path("change-password/",       views.ChangePasswordView.as_view(),     name="change_password"),
    path("forgot-password/",       views.ForgotPasswordView.as_view(),     name="forgot_password"),
    path("reset-password/",        views.ResetPasswordView.as_view(),      name="reset_password"),
    path("validate-reset-token/",  views.ValidateResetTokenView.as_view(), name="validate_reset_token"),
]
