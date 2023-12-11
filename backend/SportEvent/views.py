from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.files import File
from .models import SportEvent
from .serializers import SportEventSerializer
from .models import UserProfile
from .serializers import ProfileSerializer

class EventView(viewsets.ModelViewSet):
    serializer_class = SportEventSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user', None)
        if user_id is not None:
            return SportEvent.objects.filter(user_id=user_id)
        else:
            return SportEvent.objects.all()
        
class UserProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user', None)
        if user_id is not None:
            return UserProfile.objects.filter(user=user_id)
        else:
            return UserProfile.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Handle the file upload
        if 'profile_pic' in request.FILES:
            file = request.FILES['profile_pic']
        else:
            # Use the default profile picture if no new file is uploaded
            file = File(open('./images/profile.png', 'rb'))

        # Save the file to the UserProfile instance
        user_profile = UserProfile.objects.get(id=serializer.data['id'])
        user_profile.profile_pic = file
        user_profile.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')  # Get the userId from the URL
        instance = get_object_or_404(UserProfile, user=user_id)  # Get the UserProfile instance based on userId

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Handle the file upload
        if 'profile_pic' in request.FILES:
            file = request.FILES['profile_pic']
        else:
            # Use the default profile picture if no new file is uploaded
            file = File(open('profile.png', 'rb'))

        # Save the file to the UserProfile instance
        instance.profile_pic = file
        instance.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)