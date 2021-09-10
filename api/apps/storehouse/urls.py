# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from apps.storehouse import views

router = DefaultRouter()

# StoreHouse
router.register(r'storehouse', views.StoreHouseViewSet, basename='storehouse')

# Article
router.register(r'article', views.ArticleViewSet, basename='article')
router.register(r'article/(?P<article_id>\d+)/entry', views.EntryArticleViewSet, basename='entry_article')
router.register(r'article/(?P<entry_article_id>\d+)/output', views.OutputArticleViewSet, basename='output_entryu_article')

# Logistcs
router.register(r'article/logistics/(?P<article_id>\d+)',views.Logistics, basename='article_output')

# Types
router.register(r'type/article', views.TypeArticleViewSet, basename='storehouse')
router.register(r'brand', views.BrandViewSet, basename='storehouse')

urlpatterns = [
    path('', include(router.urls)),
    path('article/entry/all/', views.AllEntry.as_view(), name='all_entry'),
]