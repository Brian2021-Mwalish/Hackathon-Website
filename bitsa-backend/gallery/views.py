from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from .models import Photo
from .serializers import PhotoSerializer

class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]  # Allow anyone to view photos
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]  # Only authenticated users can upload
        return [AllowAny()]  # Anyone can view

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

class PhotoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            # Only allow admin or photo uploader to modify/delete
            return [IsAuthenticated()]
        return [AllowAny()]  # Anyone can view individual photos

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_staff and instance.uploaded_by != request.user:
            return Response({'error': 'You can only edit your own photos'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_staff and instance.uploaded_by != request.user:
            return Response({'error': 'You can only delete your own photos'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
