from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    author_email = serializers.CharField(source='author.email', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'content', 'excerpt', 'author', 'author_name', 'author_email',
            'category', 'tags', 'read_time', 'is_published', 'created_at',
            'updated_at', 'published_at'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'published_at']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
