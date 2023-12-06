from django.db import models

class SportEvent(models.Model):
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
        return self.name

class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True)
    password = models.CharField(max_length=128) 