# Generated by Django 4.2.7 on 2023-12-11 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SportEvent', '0030_remove_userprofile_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics/'),
        ),
    ]