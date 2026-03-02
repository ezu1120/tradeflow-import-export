# TradeFlow Django Backend API

## 🚀 Quick Start

### 1. Activate Virtual Environment

```bash
# Windows
.\venv\Scripts\Activate.ps1

# Linux/Mac
source venv/bin/activate
```

### 2. Configure Settings

Update `tradeflow_api/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    'django_filters',
    
    # Local apps
    'blog',
    'quotes',
    'contacts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add this
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
}
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser

```bash
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

## 📊 Database Models

### Blog App
- **Category**: Blog post categories
- **BlogPost**: Blog articles with title, content, author, category, etc.

### Quotes App
- **QuoteRequest**: Customer quote requests with shipment details

### Contacts App
- **ContactMessage**: Contact form submissions
- **Newsletter**: Email newsletter subscriptions

## 🔌 API Endpoints

### Blog Endpoints
```
GET    /api/blog/posts/              # List all blog posts
GET    /api/blog/posts/{id}/         # Get single post
GET    /api/blog/posts/featured/     # Get featured posts
GET    /api/blog/categories/         # List categories
POST   /api/blog/posts/{id}/view/    # Increment view count
```

### Quote Endpoints
```
GET    /api/quotes/                  # List all quotes (admin)
POST   /api/quotes/                  # Create quote request
GET    /api/quotes/{id}/             # Get single quote
PATCH  /api/quotes/{id}/             # Update quote (admin)
```

### Contact Endpoints
```
GET    /api/contacts/messages/       # List messages (admin)
POST   /api/contacts/messages/       # Submit contact form
POST   /api/contacts/newsletter/     # Subscribe to newsletter
```

## 🛠️ Admin Panel

Access at: `http://localhost:8000/admin/`

Features:
- Manage blog posts and categories
- View and respond to quote requests
- Handle contact messages
- Manage newsletter subscriptions

## 📝 Sample Data

Create sample blog posts:

```bash
python manage.py shell
```

```python
from blog.models import Category, BlogPost
from datetime.datetime import datetime

# Create categories
cat1 = Category.objects.create(name="Regulations", description="Trade regulations and compliance")
cat2 = Category.objects.create(name="Logistics", description="Logistics and shipping")
cat3 = Category.objects.create(name="Technology", description="Tech innovations in trade")

# Create blog posts
BlogPost.objects.create(
    title="Navigating Global Trade Regulations in 2025",
    excerpt="Understanding the latest changes in international trade policies...",
    content="Full article content here...",
    author="Sarah Chen",
    category=cat1,
    image="/global-trade-shipping-containers.jpg",
    read_time="8 min read",
    is_featured=True,
    is_published=True,
    published_date=datetime.now()
)
```

## 🔐 Environment Variables

Create `.env` file:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 📦 Dependencies

- Django 5.0.1
- Django REST Framework 3.14.0
- Django CORS Headers 4.3.1
- Django Filter 23.5
- Python Decouple 3.8

## 🚀 Deployment

For production:
1. Set `DEBUG=False`
2. Configure proper database (PostgreSQL recommended)
3. Set up static files serving
4. Configure ALLOWED_HOSTS
5. Use environment variables for sensitive data
6. Set up HTTPS

## 📚 Next Steps

1. Implement authentication (JWT tokens)
2. Add image upload functionality
3. Implement email notifications
4. Add search functionality
5. Create API documentation (Swagger/OpenAPI)
6. Add rate limiting
7. Implement caching (Redis)
8. Set up celery for async tasks
