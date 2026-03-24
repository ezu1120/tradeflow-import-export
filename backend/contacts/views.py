from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
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

    @action(detail=True, methods=['post'], url_path='reply')
    def reply(self, request, pk=None):
        contact = self.get_object()
        reply_text = request.data.get('reply_text', '').strip()

        if not reply_text:
            return Response({'error': 'Reply message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        # Build email body
        body = (
            f"Dear {contact.name},\n\n"
            f"{reply_text}\n\n"
            f"---\n"
            f"This is a reply to your message: \"{contact.message[:200]}{'...' if len(contact.message) > 200 else ''}\"\n\n"
            f"TradeFlow Team"
        )

        try:
            send_mail(
                subject=f"Re: {contact.get_subject_display()} — TradeFlow",
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[contact.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({'error': f'Failed to send email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Persist reply and mark as replied
        contact.reply_text = reply_text
        contact.replied_at = timezone.now()
        contact.status = 'replied'
        contact.save(update_fields=['reply_text', 'replied_at', 'status'])

        return Response({'message': 'Reply sent successfully.'}, status=status.HTTP_200_OK)


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
