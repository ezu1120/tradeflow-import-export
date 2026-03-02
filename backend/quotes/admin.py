from django.contrib import admin
from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'phone', 'company_name', 'origin_country', 'destination_country', 'cargo_type', 'weight', 'status', 'created_at']
    list_filter = ['status', 'cargo_type', 'created_at']
    search_fields = ['email', 'phone', 'company_name', 'origin_country', 'destination_country']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('email', 'phone', 'company_name')
        }),
        ('Shipment Details', {
            'fields': ('origin_country', 'destination_country', 'cargo_type', 'weight', 'additional_info')
        }),
        ('Quote Information', {
            'fields': ('status', 'quote_amount', 'quote_currency', 'admin_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    actions = ['mark_as_reviewed', 'mark_as_quoted', 'mark_as_accepted']
    
    def mark_as_reviewed(self, request, queryset):
        queryset.update(status='reviewed')
        self.message_user(request, f'{queryset.count()} quote(s) marked as reviewed.')
    mark_as_reviewed.short_description = 'Mark selected as reviewed'
    
    def mark_as_quoted(self, request, queryset):
        queryset.update(status='quoted')
        self.message_user(request, f'{queryset.count()} quote(s) marked as quoted.')
    mark_as_quoted.short_description = 'Mark selected as quoted'
    
    def mark_as_accepted(self, request, queryset):
        queryset.update(status='accepted')
        self.message_user(request, f'{queryset.count()} quote(s) marked as accepted.')
    mark_as_accepted.short_description = 'Mark selected as accepted'
