# From Django REST
from rest_framework.permissions import BasePermission

class IsOperator(BasePermission):

    """
        Allows access only to operator.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous == True:
            return False
        if user.role == "operator":
            return True
        return False