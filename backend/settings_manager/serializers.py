from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    # Use CharField for email fields to skip strict email validation
    company_email = serializers.CharField(max_length=200, required=False)
    contact_email = serializers.CharField(max_length=200, required=False)

    class Meta:
        model = SiteSettings
        fields = '__all__'
