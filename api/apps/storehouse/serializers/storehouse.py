# Django REST Framework
from rest_framework import serializers

# My models
from apps.storehouse.models import StoreHouse

class StoreHouseModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = StoreHouse
        fields = "__all__"