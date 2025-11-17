from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import BlogPost
from .serializers import BlogPostSerializer

class IsAuthorOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow authors of a blog post or admins to edit/delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author or admin
        return obj.author == request.user or request.user.is_staff

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrAdmin]

    def get_queryset(self):
        queryset = BlogPost.objects.all()

        # Filter by published status for non-admin users
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True)

        # Filter by author if specified
        author = self.request.query_params.get('author', None)
        if author is not None:
            queryset = queryset.filter(author__id=author)

        # Filter by category if specified
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__icontains=category)

        # Search by title or content
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(content__icontains=search) |
                models.Q(excerpt__icontains=search)
            )

        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['patch'])
    def publish(self, request, pk=None):
        """Publish a blog post (admin only)"""
        if not request.user.is_staff:
            return Response(
                {'error': 'Only admins can publish posts'},
                status=status.HTTP_403_FORBIDDEN
            )

        blog_post = self.get_object()
        blog_post.is_published = True
        if not blog_post.published_at:
            blog_post.published_at = timezone.now()
        blog_post.save()

        serializer = self.get_serializer(blog_post)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def unpublish(self, request, pk=None):
        """Unpublish a blog post (admin only)"""
        if not request.user.is_staff:
            return Response(
                {'error': 'Only admins can unpublish posts'},
                status=status.HTTP_403_FORBIDDEN
            )

        blog_post = self.get_object()
        blog_post.is_published = False
        blog_post.save()

        serializer = self.get_serializer(blog_post)
        return Response(serializer.data)
