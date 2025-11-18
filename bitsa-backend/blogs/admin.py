from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_published', 'read_time', 'created_at', 'published_at')
    list_filter = ('is_published', 'category', 'created_at', 'author')
    search_fields = ('title', 'content', 'excerpt', 'author__username', 'author__email')
    readonly_fields = ('created_at', 'updated_at', 'published_at',)
    list_per_page = 25
    ordering = ('-created_at',)
    fieldsets = (
        ('Basic', {'fields': ('title', 'content', 'excerpt', 'author')}),
        ('Metadata', {'fields': ('category', 'tags', 'read_time')}),
        ('Publishing', {'fields': ('is_published', 'published_at')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )

    actions = ['make_published', 'make_unpublished']

    def make_published(self, request, queryset):
        updated = queryset.filter(is_published=False).update(is_published=True, published_at=admin.utils.timezone.now())
        self.message_user(request, f"{updated} post(s) marked as published.")
    make_published.short_description = "Mark selected posts as published"

    def make_unpublished(self, request, queryset):
        updated = queryset.filter(is_published=True).update(is_published=False)
        self.message_user(request, f"{updated} post(s) marked as unpublished.")
    make_unpublished.short_description = "Mark selected posts as unpublished"
