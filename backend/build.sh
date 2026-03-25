#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Create superadmin
python manage.py shell -c "
from django.contrib.auth.models import User
from staff.models import StaffProfile

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@tradeflow.com', '1234@Abc')
    print('Created admin')
else:
    print('admin already exists')

for username, password, role in [
    ('import_manager', 'Manager@123', 'import_manager'),
    ('export_manager', 'Manager@123', 'export_manager'),
    ('import_staff',   'Staff@123',   'import_staff'),
    ('export_staff',   'Staff@123',   'export_staff'),
]:
    if not User.objects.filter(username=username).exists():
        u = User.objects.create_user(username, password=password, is_staff=True)
        StaffProfile.objects.get_or_create(user=u, defaults={'role': role})
        print(f'Created {username}')
    else:
        print(f'{username} already exists')
"

python manage.py populate_blog || true
python manage.py populate_content || true
