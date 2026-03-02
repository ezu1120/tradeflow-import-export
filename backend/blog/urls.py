from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BlogPostViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'posts', BlogPostViewSet, basename='blogpost')

urlpatterns = [
    path('', include(router.urls)),
]
