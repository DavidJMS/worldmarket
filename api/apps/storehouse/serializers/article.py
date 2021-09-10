# Django REST Framework
from django.db.models.fields.related import OneToOneField
from rest_framework import serializers

# My models
from apps.storehouse.models import (Article, EntryArticle, OutputArticle)

# My Serializers
from .types import (TypeArticleModelSerializer,BrandModelSerializer)
from .storehouse import StoreHouseModelSerializer
from apps.accounts.serializers import UserModelSerializer

class ArticleModelSerializer(serializers.ModelSerializer):

    type_article    = TypeArticleModelSerializer(many=False, read_only=True)
    brand           = BrandModelSerializer(many=False, read_only=True)
    registered_by   = UserModelSerializer(many=False, read_only=True)

    class Meta:

        model = Article
        fields = "__all__"

class CreateArticleModelSerializer(serializers.ModelSerializer):

    registered_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:

        model = Article
        fields = "__all__"

    def validate(self, data):
        # Validate that not have other aticle with the same values
        if Article.objects.filter(
            type_article=data["type_article"],
            brand=data["brand"]
            ).exists():
            raise serializers.ValidationError({"error":"Ya existe un articulo con estos datos"})
        return data

class EntryArticleModelSerializer(serializers.ModelSerializer):

    article         = ArticleModelSerializer(many=False, read_only=True)
    storehouse      = StoreHouseModelSerializer(many=False, read_only=True)
    registered_by   = UserModelSerializer(many=False, read_only=True)

    class Meta:

        model = EntryArticle
        fields = "__all__"

class CreateEntryArticleModelSerializer(serializers.ModelSerializer):

    registered_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:

        model = EntryArticle
        exclude = ["article","rest_quantity"]

    def validate(self,data):
        data["article"] = self.context["article"]
        data["rest_quantity"] = data["quantity"]
        return data

class OutputArticleModelSerializer(serializers.ModelSerializer):

    lote_article    = EntryArticleModelSerializer(many=False, read_only=True)
    storehouse      = StoreHouseModelSerializer(many=False, read_only=True)
    registered_by   = UserModelSerializer(many=False, read_only=True)

    class Meta:

        model = OutputArticle
        fields = "__all__"

class CreateOutputArticleModelSerializer(serializers.ModelSerializer):

    registered_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:

        model = OutputArticle
        exclude = ["lote_article"]

    def validate(self,data):

        self.lote_article = self.context["lote_article"]
        if self.lote_article.rest_quantity < data["quantity"]:
            raise serializers.ValidationError({"error":"La cantidad de salida no puede ser mayor a la cantidad restante"})
        data["lote_article"] = self.lote_article
        return data
    
    def create(self, data):
        output_article = OutputArticle.objects.create(**data)
        self.lote_article.rest_quantity -= output_article.quantity
        self.lote_article.save()
        return output_article