# From Django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.base import ModelState

# Utilities
from apps.utils.models import WorldMarketModel

class TypeArticle(WorldMarketModel):

    name        = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name

class Brand(WorldMarketModel):

    name        = models.CharField(max_length=30, unique=True)

    def __str__(self) -> str:
        return self.name