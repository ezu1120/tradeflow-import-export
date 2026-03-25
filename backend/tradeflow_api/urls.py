from django.contrib import admin
from django.urls import path, include, re_path
from .views import api_root, admin_login
from .staff_views import staff_users_list, staff_user_detail
from django.http import HttpResponse
from django.conf import settings
import os

import mimetypes

def serve_frontend(request, path=''):
    dist_dir = os.path.join(settings.BASE_DIR, 'frontend_dist')
    file_path = os.path.join(dist_dir, path)
    if path and os.path.exists(file_path) and os.path.isfile(file_path):
        mime_type, _ = mimetypes.guess_type(file_path)
        mime_type = mime_type or 'application/octet-stream'
        with open(file_path, 'rb') as f:
            return HttpResponse(f.read(), content_type=mime_type)
    index_path = os.path.join(dist_dir, 'index.html')
    if os.path.exists(index_path):
        with open(index_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse('Frontend not built yet', status=404)

admin.site.site_header = "TradeFlow Administration"
admin.site.site_title = "TradeFlow Admin Portal"
admin.site.index_title = "Welcome to TradeFlow Admin Dashboard"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/blog/', include('blog.urls')),
    path('api/quotes/', include('quotes.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/admin-panel/login/', admin_login, name='admin-login'),
    path('api/admin-panel/users/', staff_users_list, name='staff-users-list'),
    path('api/admin-panel/users/<int:pk>/', staff_user_detail, name='staff-user-detail'),
    path('api/settings/', include('settings_manager.urls')),
    path('api/content/', include('content.urls')),
    re_path(r'^(?P<path>.+\..+)$', serve_frontend),  # static files with extensions
    re_path(r'^.*$', serve_frontend),  # all other routes -> index.html
]
