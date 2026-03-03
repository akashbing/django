from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as Base
from django.contrib.auth import get_user_model
from .models import PasswordResetToken

User = get_user_model()

@admin.register(User)
class UserAdmin(Base):
    list_display    = ("id","email","name","is_active","is_staff","created_at","last_login")
    list_filter     = ("is_active","is_staff")
    search_fields   = ("email","name")
    ordering        = ("-created_at",)
    readonly_fields = ("created_at","updated_at","last_login")
    fieldsets = (
        (None,            {"fields": ("email","password")}),
        ("Personal Info", {"fields": ("name",)}),
        ("Permissions",   {"fields": ("is_active","is_staff","is_superuser","groups","user_permissions")}),
        ("Timestamps",    {"fields": ("created_at","updated_at","last_login")}),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("email","name","password1","password2","is_active","is_staff")}),)

@admin.register(PasswordResetToken)
class ResetTokenAdmin(admin.ModelAdmin):
    list_display = ("user","token","created_at","is_used")
