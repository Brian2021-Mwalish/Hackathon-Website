from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_events')
    location = models.CharField(max_length=255, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    is_public = models.BooleanField(default=True)
    capacity = models.PositiveIntegerField(null=True, blank=True, help_text="Maximum number of attendees (optional)")
    attendees = models.ManyToManyField(User, blank=True, related_name='events_attending')
    image = models.ImageField(upload_to='events/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_time']

    def __str__(self):
        return self.title

    @property
    def attendees_count(self):
        return self.attendees.count()

    def clean(self):
        # Ensure capacity is not less than current attendees when saving
        if self.capacity is not None and self.pk is not None:
            current_attendees = self.attendees.count()
            if self.capacity < current_attendees:
                raise ValidationError("Capacity cannot be less than current number of attendees.")

    def save(self, *args, **kwargs):
        # run clean to enforce capacity constraint
        self.clean()
        super().save(*args, **kwargs)
