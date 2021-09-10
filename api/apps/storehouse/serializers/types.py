# Django REST Framework
from rest_framework import serializers

# My models
from apps.storehouse.models import (TypeArticle, Brand)

class TypeArticleModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = TypeArticle
        fields = "__all__"

class BrandModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = Brand
        fields = "__all__"