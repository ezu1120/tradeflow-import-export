from django.db import models

class QuoteRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('quoted', 'Quoted'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    CARGO_TYPE_CHOICES = [
        ('general', 'General Cargo'),
        ('perishable', 'Perishable Goods'),
        ('hazardous', 'Hazardous Materials'),
        ('oversized', 'Oversized Freight'),
        ('electronics', 'Electronics'),
        ('other', 'Other'),
    ]
    
    # Contact Information
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company_name = models.CharField(max_length=200, blank=True)
    
    # Shipment Details
    origin_country = models.CharField(max_length=100)
    destination_country = models.CharField(max_length=100)
    cargo_type = models.CharField(max_length=20, choices=CARGO_TYPE_CHOICES)
    weight = models.DecimalField(max_digits=10, decimal_places=2, help_text="Weight in kg")
    
    # Additional Information
    additional_info = models.TextField(blank=True)
    
    # Status and Tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    quote_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    quote_currency = models.CharField(max_length=3, default='USD')
    admin_notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"Quote Request from {self.email} - {self.origin_country} to {self.destination_country}"
