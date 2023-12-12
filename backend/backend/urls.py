from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from django.conf import settings
from django.conf.urls.static import static
from SportEvent import views                            # add this
from SportEvent import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
        
router = routers.DefaultRouter()                      # add this
router.register(r'sportevents', views.EventView, 'sportevent')     # add this 
router.register(r'profiles', views.UserProfileView, 'profile')

urlpatterns = [
    path('admin/', admin.site.urls),           
    path('api/', include(router.urls)),                # add this
    path('api/registeruser/', authenticate.register_user, name='register'),
    path('api/loginuser/', authenticate.login_user, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user-details/', authenticate.user_details, name='user-details'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)