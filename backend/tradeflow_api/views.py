from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    """
    API Root - Welcome endpoint with links to all available endpoints
    """
    return Response({
        'message': 'Welcome to TradeFlow API',
        'version': '1.0',
        'endpoints': {
            'blog': {
                'posts': request.build_absolute_uri('/api/blog/posts/'),
                'featured_posts': request.build_absolute_uri('/api/blog/posts/featured/'),
                'categories': request.build_absolute_uri('/api/blog/categories/'),
            },
            'quotes': {
                'list_create': request.build_absolute_uri('/api/quotes/'),
            },
            'contacts': {
                'messages': request.build_absolute_uri('/api/contacts/messages/'),
                'newsletter': request.build_absolute_uri('/api/contacts/newsletter/'),
            },
            'admin': request.build_absolute_uri('/admin/'),
        },
        'documentation': {
            'blog_posts': 'GET /api/blog/posts/ - List all blog posts',
            'blog_post_detail': 'GET /api/blog/posts/{slug}/ - Get single post',
            'featured_posts': 'GET /api/blog/posts/featured/ - Get featured posts',
            'categories': 'GET /api/blog/categories/ - List categories',
            'submit_quote': 'POST /api/quotes/ - Submit quote request',
            'submit_contact': 'POST /api/contacts/messages/ - Submit contact message',
            'subscribe_newsletter': 'POST /api/contacts/newsletter/ - Subscribe to newsletter',
        }
    })


from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import secrets


@api_view(['POST'])
def admin_login(request):
    """Custom admin panel login"""
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user and user.is_staff:
        # Generate a simple token (use proper token auth in production)
        token = secrets.token_hex(32)
        return Response({
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
            }
        })
    return Response({'error': 'Invalid credentials or insufficient permissions'}, status=status.HTTP_401_UNAUTHORIZED)
