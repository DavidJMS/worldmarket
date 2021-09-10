# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Permissions
from rest_framework.permissions import (AllowAny,IsAuthenticated,IsAdminUser)

# My Permissions
from apps.accounts.permissions import IsOperator

# Serializers
from apps.storehouse import serializers

# My Models
from apps.storehouse.models import StoreHouse

# Utils
import datetime as datetime_modules

class StoreHouseViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Store House view set.

        Handle CRUD of Store House.
    """

    queryset = StoreHouse.objects.all()
    serializer_class = serializers.StoreHouseModelSerializer
    
    def get_permissions(self):
        """
            Instantiates and returns the list of permissions that this view requires.
        """
        # import pdb; pdb.set_trace()
        permission_classes:list = [IsAdminUser,]
        if self.action == "list":
            permission_classes.append(IsOperator)
        return [permission() for permission in permission_classes]

    def check_permissions(self, request):
        """
            Check if the request should be permitted.
            Raises an appropriate exception if the request is not permitted.
        """
        total_permissions = self.get_permissions()
        not_permissions = len(total_permissions)
        for permission in total_permissions:
            if not permission.has_permission(request, self):
                not_permissions -=1
            
        if not_permissions == 0:    
            self.permission_denied(
                request,
                message=getattr(permission, 'message', None),
                code=getattr(permission, 'code', None)
            )