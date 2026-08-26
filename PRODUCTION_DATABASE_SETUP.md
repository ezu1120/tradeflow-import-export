# Production Database Setup Guide

## Overview
This guide explains how to populate the production database with sample data for products, services, blog posts, FAQs, and testimonials.

## Available Seeders

The backend includes two Django management commands for populating data:

### 1. `populate_content` - Products, Services, FAQs, Testimonials
- **Location**: `backend/content/management/commands/populate_content.py`
- **Creates**:
  - 6 Services (shipping, customs, warehousing, insurance, consulting, delivery)
  - 12 Products (6 imports, 6 exports)
  - 6 FAQs
  - 6 Testimonials

### 2. `populate_blog` - Blog Posts
- **Location**: `backend/blog/management/commands/populate_blog.py`
- **Creates**:
  - 5 Blog Categories
  - 5 Featured Blog Posts

## Method 1: Run Via SSH on VPS (Recommended)

### Step 1: SSH into your VPS
```bash
ssh your-user@your-vps-ip
```

### Step 2: Access the Django container
```bash
# Find the backend container name
docker ps

# Access the container (replace with actual container name)
docker exec -it <backend-container-name> bash
```

### Step 3: Run the management commands
```bash
# Populate products, services, FAQs, and testimonials
python manage.py populate_content

# Populate blog posts and categories
python manage.py populate_blog
```

### Step 4: Verify the data
```bash
# Check products count
python manage.py shell -c "from content.models import Product; print(f'Products: {Product.objects.count()}')"

# Check services count
python manage.py shell -c "from content.models import Service; print(f'Services: {Service.objects.count()}')"

# Check blog posts count
python manage.py shell -c "from blog.models import BlogPost; print(f'Blog Posts: {BlogPost.objects.count()}')"
```

## Method 2: Load from JSON Fixture (Alternative)

The project includes a `data_dump.json` file with pre-populated data.

### Run via SSH:
```bash
# Access the Django container
docker exec -it <backend-container-name> bash

# Load the fixture
python manage.py loaddata data_dump.json
```

## Method 3: Via Coolify Build Script (Automatic)

The `build.sh` script already attempts to load data automatically on deployment:

```bash
# Check build.sh - it includes:
python manage.py loaddata data_dump.json || echo "Fixture load failed (may already exist)"
```

If this didn't work during deployment, you can manually trigger it using Method 1 or 2.

## Verification

After running the seeders, verify the data is accessible:

### Frontend Pages to Check:
1. **Products Page**: https://tradeflow.ethiohotel.site/products
   - Should show 12 products (6 imports, 6 exports)

2. **Services Page**: https://tradeflow.ethiohotel.site/services
   - Should show 6 services with icons and descriptions

3. **Blog Page**: https://tradeflow.ethiohotel.site/blog
   - Should show 5 blog posts with categories

4. **Home Page Testimonials**: https://tradeflow.ethiohotel.site/
   - Should show 6 customer testimonials in carousel

### API Endpoints to Check:
```bash
# Check products API
curl https://api-tradeflow.ethiohotel.site/api/content/products/

# Check services API
curl https://api-tradeflow.ethiohotel.site/api/content/services/

# Check blog posts API
curl https://api-tradeflow.ethiohotel.site/api/blog/posts/

# Check testimonials API
curl https://api-tradeflow.ethiohotel.site/api/content/testimonials/
```

## Troubleshooting

### "Products already exist, skipping"
This means data has already been loaded. To reset and reload:
```bash
python manage.py shell
>>> from content.models import Product, Service, FAQ, Testimonial
>>> Product.objects.all().delete()
>>> Service.objects.all().delete()
>>> FAQ.objects.all().delete()
>>> Testimonial.objects.all().delete()
>>> exit()

# Then run the populate command again
python manage.py populate_content
```

### "Permission denied" errors
Make sure you're running commands inside the Docker container, not on the host VPS.

### Database connection errors
Verify the `DATABASE_URL` environment variable is correctly set in Coolify.

## Admin Access

To create or verify products/services via Django admin panel:
1. Visit: https://api-tradeflow.ethiohotel.site/admin/
2. Login credentials: `admin` / `admin123` (check ADMIN_ACCESS.txt)
3. Navigate to:
   - Content → Products
   - Content → Services
   - Blog → Blog Posts
   - Content → Testimonials
   - Content → FAQs

## Quick Command Reference

```bash
# SSH to VPS
ssh user@vps-ip

# List containers
docker ps

# Access Django container
docker exec -it <container-name> bash

# Run seeders
python manage.py populate_content
python manage.py populate_blog

# Or load fixture
python manage.py loaddata data_dump.json

# Check data counts
python manage.py shell -c "from content.models import Product, Service; print(f'Products: {Product.objects.count()}, Services: {Service.objects.count()}')"
```

## Notes

- The seeder commands are **idempotent** - they check if data exists before creating it
- Image paths in the data reference files in `/backend/frontend_dist/` which are static files
- All data uses realistic trade/import-export business content
- Default admin user credentials are in `backend/ADMIN_ACCESS.txt`
