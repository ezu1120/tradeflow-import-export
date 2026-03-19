from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, BlogPost
from .serializers import CategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured', 'author']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['created_at', 'views_count', 'published_date']
    ordering = ['-created_at']
    lookup_field = 'slug'

    def get_queryset(self):
        # Admin can see all posts
        if self.request.user and self.request.user.is_staff:
            return BlogPost.objects.all()
        return BlogPost.objects.filter(is_published=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured', 'increment_views']:
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = BlogPost.objects.filter(is_published=True, is_featured=True)[:3]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def increment_views(self, request, slug=None):
        post = self.get_object()
        post.views_count += 1
        post.save(update_fields=['views_count'])
        return Response({'views_count': post.views_count})
