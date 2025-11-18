from rest_framework import serializers
from .models import Event
from datetime import datetime

class EventSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    organizer_email = serializers.CharField(source='organizer.email', read_only=True)
    attendees_count = serializers.IntegerField(source='attendees_count', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'organizer', 'organizer_name', 'organizer_email',
            'location', 'start_time', 'end_time', 'is_public', 'capacity',
            'attendees_count', 'image', 'date', 'time', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'organizer', 'attendees_count', 'created_at', 'updated_at']

    def get_date(self, obj):
        return obj.start_time.date().isoformat() if obj.start_time else None

    def get_time(self, obj):
        return obj.start_time.time().isoformat() if obj.start_time else None

    def create(self, validated_data):
        # Handle date and time combination for start_time
        date = self.context['request'].data.get('date')
        time = self.context['request'].data.get('time')
        if date and time:
            start_time_str = f"{date}T{time}"
            try:
                validated_data['start_time'] = datetime.fromisoformat(start_time_str)
            except ValueError:
                raise serializers.ValidationError("Invalid date or time format")

        validated_data['organizer'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Handle date and time combination for start_time
        date = self.context['request'].data.get('date')
        time = self.context['request'].data.get('time')
        if date and time:
            start_time_str = f"{date}T{time}"
            try:
                validated_data['start_time'] = datetime.fromisoformat(start_time_str)
            except ValueError:
                raise serializers.ValidationError("Invalid date or time format")

        return super().update(instance, validated_data)
