from rest_framework import serializers
from .models import ContactMessage, Newsletter


class ContactMessageSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone', 'company',
            'subject', 'subject_display', 'message',
            'status', 'status_display', 'admin_notes',
            'reply_text', 'replied_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'admin_notes', 'reply_text', 'replied_at']


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'company', 'subject', 'message']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'is_active', 'subscribed_at']
        read_only_fields = ['is_active', 'subscribed_at']
