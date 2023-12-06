# SportEvent/authentication.py
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserProfileSerializer


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')
        if User.objects.filter(username=username).exists():
            return Response({"message": "User with this username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({"message": "User with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        # Create a new user
        user = User.objects.create_user(email=email, password=password, username=username)
        access_token = AccessToken.for_user(user)

        response_data = {
            "message": "User registered successfully",
            "user_id": user.id,
            "email": user.email,
            "access_token": str(access_token),
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response({"message": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)