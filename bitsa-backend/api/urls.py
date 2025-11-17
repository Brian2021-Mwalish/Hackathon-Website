from django.urls import path, include

urlpatterns = [
    path('auth/', include('accounts.urls')),
    path('gallery/', include('gallery.urls')),
    path('blogs/', include('blogs.urls')),
]
