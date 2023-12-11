# Generated by Django 4.2.7 on 2023-12-10 06:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SportEvent', '0024_delete_user_remove_sportevent_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='sportevent',
            name='user',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
