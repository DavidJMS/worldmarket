# Django
from django.conf import settings
from django.contrib.auth import password_validation, authenticate
from django.contrib.auth.hashers import make_password

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from apps.accounts.models import User
from apps.storehouse.models import StoreHouse


class UserModelSerializer(serializers.ModelSerializer):
    """
        User Model serializer
    """

    class Meta:

        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_superuser',
            'is_active',
            'last_login',
            'role',
            'multi_store_house',
            'store_house'
        ]

class UserLoginSerializer(serializers.Serializer):
    """
        User login serializer.

        Handle the login request data.
    """

    username = serializers.CharField(min_length=4, max_length=30)
    password = serializers.CharField(min_length=4, max_length=16)

    def validate(self, data):
        """Check credentials."""
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError({'error':'Invalid credentials'})
        self.context['user'] = user
        return data

    def create(self, data):
        """Generate or retrieve new token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

class UserSignUpSerializer(serializers.Serializer):
    """
        User sign up serializer.

        Handle sign up data validation and user creation.
    """

    # Username Field
    username = serializers.CharField(
        min_length=4, 
        max_length=30,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    # Email Field
    email = serializers.EmailField(
        min_length=4,
        max_length=30,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    # Password
    password = serializers.CharField(min_length=4, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)

    # Names Fields
    first_name = serializers.CharField(min_length=2, max_length=30)
    last_name = serializers.CharField(min_length=2, max_length=30)

    # Role Field
    role = serializers.CharField(min_length=5, max_length=30)

    # multi departament
    store_house = serializers.IntegerField(max_value=None, min_value=None, required=False)

    # Campus
    multi_store_house = serializers.BooleanField()

    def validate(self, data):
        """Verify passwords match and departament, role fiels have a correct value."""
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Passwords don't match.")
        password_validation.validate_password(passwd)
        return data

    def create(self, data):
        """Handle user and profile creation."""
        
        if data.get("role") == "admin":
            data["is_staff"] = True
            data["multi_store_house"] = True

        store_house = data.get("store_house")
        data.pop("password_confirmation")
        data.pop("store_house")

        data["password"] = make_password(data.get('password'))
        user = User(**data)

        if data.get("multi_store_house") == False:
            if store_house is None:
                raise serializers.ValidationError({'multi_store_house':'The Campus value is none, please send this field'})
            try:
                store_house = StoreHouse.objects.get(id=store_house)
            except StoreHouse.DoesNotExist as e:
                raise serializers.ValidationError({'store_house':'The store_house does not exist'})
            user.store_house = store_house
        user.save()
        return user