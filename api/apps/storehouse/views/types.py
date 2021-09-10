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
from apps.storehouse import serializers

# My Models
from apps.storehouse.models import (TypeArticle, Brand)

# Utils
import datetime as datetime_modules

class TypeArticleViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Type Article House view set.

        Handle CRUD of Type Articles.
    """

    queryset = TypeArticle.objects.all()
    serializer_class = serializers.TypeArticleModelSerializer
    permission_classes = [IsAdminUser]

class BrandViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Brand view set.

        Handle CRUD of Brand.
    """

    queryset = Brand.objects.all()
    serializer_class = serializers.BrandModelSerializer
    permission_classes = [IsAdminUser]