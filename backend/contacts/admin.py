from django.contrib import admin
from .models import ContactMessage, Newsletter


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'phone', 'company', 'subject', 'status', 'created_at']
    list_filter = ['status', 'subject', 'created_at']
    search_fields = ['name', 'email', 'phone', 'company', 'message']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone', 'company')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Status & Notes', {
            'fields': ('status', 'admin_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    actions = ['mark_as_read', 'mark_as_replied', 'mark_as_archived']
    
    def mark_as_read(self, request, queryset):
        queryset.update(status='read')
        self.message_user(request, f'{queryset.count()} message(s) marked as read.')
    mark_as_read.short_description = 'Mark selected as read'
    
    def mark_as_replied(self, request, queryset):
        queryset.update(status='replied')
        self.message_user(request, f'{queryset.count()} message(s) marked as replied.')
    mark_as_replied.short_description = 'Mark selected as replied'
    
    def mark_as_archived(self, request, queryset):
        queryset.update(status='archived')
        self.message_user(request, f'{queryset.count()} message(s) marked as archived.')
    mark_as_archived.short_description = 'Mark selected as archived'


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    date_hierarchy = 'subscribed_at'
    ordering = ['-subscribed_at']
    
    actions = ['activate_subscriptions', 'deactivate_subscriptions']
    
    def activate_subscriptions(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} subscription(s) activated.')
    activate_subscriptions.short_description = 'Activate selected subscriptions'
    
    def deactivate_subscriptions(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} subscription(s) deactivated.')
    deactivate_subscriptions.short_description = 'Deactivate selected subscriptions'
