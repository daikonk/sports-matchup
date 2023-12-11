"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from SportEvent import views                            # add this
from SportEvent import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
        
router = routers.DefaultRouter()                      # add this
router.register(r'sportevents', views.EventView, 'sportevent')     # add this
        
urlpatterns = [
    path('admin/', admin.site.urls),           
    path('api/', include(router.urls)),                # add this
    path('api/registeruser/', authenticate.register_user, name='register'),
    path('api/loginuser/', authenticate.login_user, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user-details/', authenticate.user_details, name='user-details'),
]