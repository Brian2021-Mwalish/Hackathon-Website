from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
from django.core.files import File
from datetime import timedelta
import os
import random
import urllib.request

from events.models import Event

class Command(BaseCommand):
    help = "Seed the database with dummy events, users and placeholder images."

    def handle(self, *args, **options):
        media_events_dir = os.path.join(settings.MEDIA_ROOT, 'events')
        os.makedirs(media_events_dir, exist_ok=True)

        # Create users (organizers and attendees)
        users_info = [
            ('organizer1', 'organizer1@example.com', 'password123'),
            ('organizer2', 'organizer2@example.com', 'password123'),
            ('attendee1', 'attendee1@example.com', 'password123'),
            ('attendee2', 'attendee2@example.com', 'password123'),
        ]

        created_users = {}
        for username, email, pwd in users_info:
            user, created = User.objects.get_or_create(username=username, defaults={'email': email})
            if created:
                user.set_password(pwd)
                user.save()
            created_users[username] = user

        organizer1 = created_users['organizer1']
        organizer2 = created_users['organizer2']
        attendee1 = created_users['attendee1']
        attendee2 = created_users['attendee2']

        # Create sample events
        created = 0
        skipped = 0
        for i in range(1, 6):
            title = f"Sample Event {i}"
            if Event.objects.filter(title=title).exists():
                skipped += 1
                continue

            start = timezone.now() + timedelta(days=i)
            end = start + timedelta(hours=2)
            organizer = organizer1 if i % 2 else organizer2
            capacity = random.choice([None, 10, 25, 50])
            is_public = True if i % 3 else False

            event = Event.objects.create(
                title=title,
                description=f"This is a description for {title}. Use this to verify UI rendering.",
                organizer=organizer,
                location=f"Venue {i}",
                start_time=start,
                end_time=end,
                capacity=capacity,
                is_public=is_public
            )

            # Download placeholder image and attach to event.image
            try:
                img_url = f"https://picsum.photos/seed/event{i}/800/600"
                filename = f"event_{i}.jpg"
                temp_path = os.path.join(media_events_dir, filename)
                urllib.request.urlretrieve(img_url, temp_path)
                with open(temp_path, 'rb') as f:
                    django_file = File(f)
                    event.image.save(filename, django_file, save=True)
            except Exception:
                pass

            # Add some attendees
            if i % 2:
                event.attendees.add(attendee1)
            if i % 3:
                event.attendees.add(attendee2)

            created += 1

        self.stdout.write(self.style.SUCCESS(f"Seed complete: created {created} events, skipped {skipped} existing events."))
        self.stdout.write(self.style.SUCCESS("Users available: organizer1/organizer2/attendee1/attendee2 (password: password123)"))
