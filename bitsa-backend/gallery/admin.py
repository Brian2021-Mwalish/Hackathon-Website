from django.contrib import admin
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['title', 'uploaded_by', 'uploaded_at']
    list_filter = ['uploaded_at', 'uploaded_by']
    search_fields = ['title', 'description']
    readonly_fields = ['uploaded_at']

    def has_add_permission(self, request):
        return request.user.is_staff

    def has_change_permission(self, request, obj=None):
        if obj is not None:
            return request.user.is_staff or obj.uploaded_by == request.user
        return request.user.is_staff

    def has_delete_permission(self, request, obj=None):
        if obj is not None:
            return request.user.is_staff or obj.uploaded_by == request.user
        return request.user.is_staff
