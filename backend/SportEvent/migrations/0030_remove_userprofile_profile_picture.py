# Generated by Django 4.2.7 on 2023-12-10 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SportEvent', '0029_userprofile_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='profile_picture',
        ),
    ]
