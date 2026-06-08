#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Load fixture - exclude tokens since they'll be recreated on login
python manage.py shell -c "
import django
from django.core import serializers
from django.contrib.auth.models import User
from staff.models import StaffProfile

# Only load if DB is empty
if User.objects.count() == 0:
    from django.core.management import call_command
    try:
        call_command('loaddata', 'data_dump.json', verbosity=2)
        print('Fixture loaded successfully')
    except Exception as e:
        print(f'Fixture load failed: {e}')
        # Fallback: create users manually
        admin = User.objects.create_superuser('admin', 'admin@tradeflow.com', '1234@Abc')
        for username, password, role in [
            ('import_manager', 'Manager@123', 'import_manager'),
            ('export_manager', 'Manager@123', 'export_manager'),
            ('import_staff',   'Staff@123',   'import_staff'),
            ('export_staff',   'Staff@123',   'export_staff'),
        ]:
            u = User.objects.create_user(username, password=password, is_staff=True)
            StaffProfile.objects.get_or_create(user=u, defaults={'role': role})
            print(f'Created {username}')
        print('Manual user creation done')
else:
    print(f'DB already has {User.objects.count()} users, skipping fixture load')
"
