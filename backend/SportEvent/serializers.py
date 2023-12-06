from rest_framework import serializers
from .models import SportEvent
from django.contrib.auth.models import User

class SportEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportEvent
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'username']  # Include any additional fields you need
        