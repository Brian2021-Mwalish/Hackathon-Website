from django.contrib import admin
from django.utils.html import format_html
from .models import Photo

# detect available fields on Photo
_model_fields = {f.name for f in Photo._meta.get_fields() if getattr(f, 'concrete', False)}

# pick a sensible timestamp field if present
_timestamp_candidates = ['created_at', 'created', 'uploaded_at', 'timestamp', 'created_on']
_timestamp_field = next((f for f in _timestamp_candidates if f in _model_fields), None)

# pick uploader field if present
_uploader_field = 'uploaded_by' if 'uploaded_by' in _model_fields else next((f for f in ['uploaded_by', 'uploader', 'owner'] if f in _model_fields), None)

# build admin attributes defensively
_list_display = ['id', 'title', 'image_preview']
if _uploader_field:
    _list_display.append(_uploader_field)
if _timestamp_field:
    _list_display.append(_timestamp_field)

_list_filter = []
if _timestamp_field:
    _list_filter.append(_timestamp_field)
if _uploader_field:
    _list_filter.append(_uploader_field)

_readonly_fields = ['image_preview']
if _timestamp_field:
    _readonly_fields.append(_timestamp_field)

_ordering = ['-' + _timestamp_field] if _timestamp_field else ['-id']

# primary fields shown in main fieldset (do not include timestamp here to avoid duplicates)
_primary_fields = ['title', 'image', 'caption']
if _uploader_field:
    _primary_fields.append(_uploader_field)

fieldsets = (
    (None, {'fields': tuple(_primary_fields)}),
)
if _timestamp_field:
    fieldsets += (
        ('Timestamps', {'fields': ( _timestamp_field, ), 'classes': ('collapse',)}),
    )

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = tuple(_list_display)
    list_filter = tuple(_list_filter)
    search_fields = ('title', 'caption',)
    readonly_fields = tuple(_readonly_fields)
    ordering = tuple(_ordering)
    list_per_page = 30
    fieldsets = fieldsets

    actions = ['make_private', 'make_public']

    def image_preview(self, obj):
        img = getattr(obj, 'image', None)
        if img:
            return format_html('<img src="{}" style="max-height:120px; max-width:180px; object-fit:cover;"/>', img.url)
        return "(no image)"
    image_preview.short_description = 'Preview'

    def make_private(self, request, queryset):
        if hasattr(Photo, 'is_public'):
            updated = queryset.update(is_public=False)
            self.message_user(request, f"{updated} photo(s) marked private.")
        else:
            self.message_user(request, "No is_public field on Photo model to update.")
    make_private.short_description = "Mark selected photos private"

    def make_public(self, request, queryset):
        if hasattr(Photo, 'is_public'):
            updated = queryset.update(is_public=True)
            self.message_user(request, f"{updated} photo(s) marked public.")
        else:
            self.message_user(request, "No is_public field on Photo model to update.")
    make_public.short_description = "Mark selected photos public"

    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
