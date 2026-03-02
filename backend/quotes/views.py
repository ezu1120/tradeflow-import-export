from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import QuoteRequest
from .serializers import QuoteRequestSerializer, QuoteRequestCreateSerializer


class QuoteRequestViewSet(viewsets.ModelViewSet):
    queryset = QuoteRequest.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'cargo_type']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return QuoteRequestCreateSerializer
        return QuoteRequestSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return success message
        return Response({
            'message': 'Quote request submitted successfully! We will contact you within 24 hours.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
