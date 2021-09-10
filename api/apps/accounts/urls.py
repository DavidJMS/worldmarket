# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from apps.accounts import views

router = DefaultRouter()
router.register(r'accounts', views.UserViewSet, basename='accounts')

urlpatterns = [
    path('', include(router.urls))
]