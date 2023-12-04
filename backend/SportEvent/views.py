from django.shortcuts import render
from rest_framework import viewsets
from .models import SportEvent
from .serializers import SportEventSerializer

class EventView(viewsets.ModelViewSet):
    queryset = SportEvent.objects.all()
    serializer_class = SportEventSerializer
