#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Load all data from fixture (users, products, blog, settings, etc.)
# Uses --ignorenonexistent to skip any fields not in current models
python manage.py loaddata data_dump.json || echo "Fixture load failed or already loaded"
