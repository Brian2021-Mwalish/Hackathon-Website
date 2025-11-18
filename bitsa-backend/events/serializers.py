from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    organizer_email = serializers.CharField(source='organizer.email', read_only=True)
    attendees_count = serializers.IntegerField(source='attendees_count', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'organizer', 'organizer_name', 'organizer_email',
            'location', 'start_time', 'end_time', 'is_public', 'capacity',
            'attendees_count', 'image', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'organizer', 'attendees_count', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['organizer'] = self.context['request'].user
        return super().create(validated_data)
