from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.utils import timezone
from .models import Event
from .serializers import EventSerializer

class IsOrganizerOrAdmin(permissions.BasePermission):
    """
    Allow safe methods to all. Allow modifications only to the organizer or staff.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.organizer == request.user or request.user.is_staff

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsOrganizerOrAdmin()]

    def get_queryset(self):
        qs = Event.objects.all()
        # Visibility: all events for everyone (for viewing purposes)

        # Filters
        organizer = self.request.query_params.get('organizer')
        if organizer:
            qs = qs.filter(organizer__id=organizer)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                models.Q(title__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(location__icontains=search)
            )
        upcoming = self.request.query_params.get('upcoming')
        if upcoming and upcoming.lower() in ['1', 'true', 'yes']:
            qs = qs.filter(start_time__gte=timezone.now())

        return qs.order_by('-start_time')

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rsvp(self, request, pk=None):
        """
        Toggle RSVP for the authenticated user.
        If capacity is set and full, return 400 when trying to join.
        """
        event = self.get_object()
        user = request.user
        if user in event.attendees.all():
            event.attendees.remove(user)
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)

        if event.capacity is not None and event.attendees_count >= event.capacity:
            return Response({'error': 'Event is full'}, status=status.HTTP_400_BAD_REQUEST)

        event.attendees.add(user)
        return Response({'status': 'added'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def publish(self, request, pk=None):
        """Admin-only: make an event public"""
        if not request.user.is_staff:
            return Response({'error': 'Only admins can publish events'}, status=status.HTTP_403_FORBIDDEN)
        event = self.get_object()
        event.is_public = True
        event.save()
        return Response(self.get_serializer(event).data)

    @action(detail=True, methods=['patch'])
    def unpublish(self, request, pk=None):
        """Admin-only: make an event private"""
        if not request.user.is_staff:
            return Response({'error': 'Only admins can unpublish events'}, status=status.HTTP_403_FORBIDDEN)
        event = self.get_object()
        event.is_public = False
        event.save()
        return Response(self.get_serializer(event).data)
