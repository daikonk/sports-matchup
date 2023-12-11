from django.db import models
from django.contrib.auth.models import User

class SportEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sport = models.CharField(max_length=200)
    eventname = models.CharField(max_length=200)
    members = models.IntegerField(default=0)
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    location_address = models.CharField(max_length=200)
    location_city = models.CharField(max_length=200)
    location_state = models.CharField(max_length=200)
    location_zip = models.CharField(max_length=200)
    datetime = models.DateTimeField()
    phonenum = models.CharField(max_length=200)
    info = models.TextField()
    skill = models.CharField(max_length=200)

    def __str__(self):
        return self.eventname

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    age = models.IntegerField(default=0)
    sport = models.CharField(max_length=200)
    skill = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone_num = models.CharField(max_length=200)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)