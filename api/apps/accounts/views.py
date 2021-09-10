# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Permissions
from rest_framework.permissions import (AllowAny,IsAuthenticated,IsAdminUser)

# Serializers
from apps.accounts import serializers

# My Models
from apps.accounts.models import User

# Utils
import datetime as datetime_modules

class UserViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        User view set.

        Handle sign up, login and account verification.
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserModelSerializer
    # permissions = [AllowAny]

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['login']:
            permissions = [AllowAny]
        elif self.action in ['logout']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAdminUser]
        return [p() for p in permissions]

    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = serializers.UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': serializers.UserModelSerializer(user).data,
            'access_token': token,
            'detail': "You have logged into the system",
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def logout(self, request):
        """User logout to the system"""
        user = request.user
        user.last_login = datetime_modules.datetime.now()
        user.save()
        user.auth_token.delete()
        data = {
            'detail': "You have disconnected from the system"
        }
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        """User sign up."""
        serializer = serializers.UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = serializers.UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)