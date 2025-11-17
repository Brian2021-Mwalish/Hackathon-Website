from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'description', 'image', 'image_url', 'uploaded_by', 'uploaded_by_name', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
