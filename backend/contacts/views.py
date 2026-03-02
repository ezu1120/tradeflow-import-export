from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import ContactMessage, Newsletter
from .serializers import (
    ContactMessageSerializer,
    ContactMessageCreateSerializer,
    NewsletterSerializer
)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'subject']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ContactMessageCreateSerializer
        return ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'message': 'Thank you for contacting us! We will get back to you soon.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.filter(is_active=True)
    serializer_class = NewsletterSerializer
    http_method_names = ['get', 'post', 'delete']
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Check if email already exists
        email = serializer.validated_data['email']
        if Newsletter.objects.filter(email=email).exists():
            return Response({
                'message': 'This email is already subscribed to our newsletter.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        
        return Response({
            'message': 'Successfully subscribed to our newsletter!',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
