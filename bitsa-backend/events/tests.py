from django.test import TestCase
from django.contrib.auth.models import User
from .models import Event
from django.utils import timezone
from datetime import timedelta

class EventModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='u1', password='pass')
        self.event = Event.objects.create(
            title='Test Event',
            description='Desc',
            organizer=self.user,
            start_time=timezone.now() + timedelta(days=1),
            is_public=True
        )

    def test_attendees_count_property(self):
        self.assertEqual(self.event.attendees_count, 0)

    def test_str(self):
        self.assertEqual(str(self.event), 'Test Event')
