# From Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# Utilities
from apps.utils.models import WorldMarketModel

class StoreHouse(WorldMarketModel):

    name        = models.CharField(max_length=30, unique=True)
    location    = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name