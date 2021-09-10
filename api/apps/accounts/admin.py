"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from apps.accounts.models import User


class CustomUserAdmin(UserAdmin):
    """User model admin."""

    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff','role')
    list_filter = ('is_staff', 'created', 'modified')

admin.site.register(User, CustomUserAdmin)