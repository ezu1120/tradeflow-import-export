from rest_framework import serializers
from .models import Category, BlogPost


class CategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'posts_count', 'created_at']
    
    def get_posts_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'image', 'author',
            'category', 'read_time', 'is_featured', 'views_count',
            'created_at', 'published_date'
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'image',
            'author', 'category', 'read_time', 'is_featured',
            'views_count', 'created_at', 'updated_at', 'published_date'
        ]
