"""
URL configuration for bitsa_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Import the view function: from django.urls import include, path
    3. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from my_app import views
    2. Import the view function: from django.urls import include, path
    3. Add a URL to urlpatterns:  path('', views.Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('gallery/', include('gallery.urls')),
    path('api/gallery/', include('gallery.urls')),
    path('blogs/', include('blogs.urls')),
    path('api/blogs/', include('blogs.urls')),
    path('events/', include('events.urls')),
    path('api/events/', include('events.urls')),
]

# Serve media files from MEDIA_URL -> MEDIA_ROOT for testing environments.
# NOTE: serving media via Django in production is not recommended; use a proper static/media server (nginx, S3, etc.)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
