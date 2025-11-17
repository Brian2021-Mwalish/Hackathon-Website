from django.urls import path
from . import views

urlpatterns = [
    path('photos/', views.PhotoListCreateView.as_view(), name='photo-list-create'),
    path('photos/<int:pk>/', views.PhotoDetailView.as_view(), name='photo-detail'),
]
