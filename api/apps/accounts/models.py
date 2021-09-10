# From Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# Utilities
from apps.utils.models import WorldMarketModel

role=(
    ("admin","admin"),
    ("operator","operator"),
)

class User(WorldMarketModel, AbstractUser):

    """
        User model.

        Extend from Django's Abstract User, Add some extra fields.
    """

    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )

    REQUIRED_FIELDS = ['role','email']

    role = models.CharField(
        'role',
        max_length=10,
        choices=role,
        null=True,
        help_text='Define a rol for a user'
    )

    store_house = models.ForeignKey('storehouse.StoreHouse', on_delete=models.SET_NULL, null=True, blank=False)

    multi_store_house = models.BooleanField(default=False,help_text='Full access to see information of all store house .')

    def __str__(self):
        """Return username."""
        return self.username

    def get_short_name(self):
        """Return username."""
        return self.username