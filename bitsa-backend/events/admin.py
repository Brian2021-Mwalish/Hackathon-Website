from django.contrib import admin
from django.utils.html import format_html
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'location', 'start_time', 'is_public', 'capacity', 'attendees_count', 'image_preview')
    list_filter = ('is_public', 'start_time', 'organizer')
    search_fields = ('title', 'description', 'organizer__username', 'organizer__email', 'location')
    readonly_fields = ('created_at', 'updated_at', 'attendees_count',)
    ordering = ('-start_time',)
    list_per_page = 25

    # make attendees manageable with a nicer widget
    filter_horizontal = ('attendees',)

    fieldsets = (
        ('Basic', {'fields': ('title', 'description', 'organizer')}),
        ('Details', {'fields': ('location', 'start_time', 'end_time', 'image')}),
        ('Capacity', {'fields': ('capacity', 'is_public', 'attendees')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )

    actions = ['make_public', 'make_private', 'export_attendees']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:100px; max-width:200px; object-fit:cover;"/>', obj.image.url)
        return "(no image)"
    image_preview.short_description = 'Image'

    def make_public(self, request, queryset):
        updated = queryset.update(is_public=True)
        self.message_user(request, f"{updated} event(s) made public.")
    make_public.short_description = "Make selected events public"

    def make_private(self, request, queryset):
        updated = queryset.update(is_public=False)
        self.message_user(request, f"{updated} event(s) made private.")
    make_private.short_description = "Make selected events private"

    def export_attendees(self, request, queryset):
        """
        Minimal action: tell admin how many attendees selected events have.
        For full CSV export, implement streaming response in a custom admin view.
        """
        total = sum(e.attendees.count() for e in queryset)
        self.message_user(request, f"Selected events have a total of {total} attendee(s).")
    export_attendees.short_description = "Show total attendees for selected events"

    def save_model(self, request, obj, form, change):
        if not change:
            obj.organizer = request.user
        super().save_model(request, obj, form, change)

    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
