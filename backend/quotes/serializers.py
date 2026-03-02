from rest_framework import serializers
from .models import QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    cargo_type_display = serializers.CharField(source='get_cargo_type_display', read_only=True)
    
    class Meta:
        model = QuoteRequest
        fields = [
            'id', 'email', 'phone', 'company_name',
            'origin_country', 'destination_country',
            'cargo_type', 'cargo_type_display', 'weight',
            'additional_info', 'status', 'status_display',
            'quote_amount', 'quote_currency', 'admin_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'quote_amount', 'quote_currency', 'admin_notes']


class QuoteRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = [
            'email', 'phone', 'company_name',
            'origin_country', 'destination_country',
            'cargo_type', 'weight', 'additional_info'
        ]
