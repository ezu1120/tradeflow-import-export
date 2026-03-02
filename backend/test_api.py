"""
Simple script to test API endpoints
Run with: python test_api.py
"""

import requests
import json

BASE_URL = 'http://localhost:8000/api'

def test_blog_posts():
    print("\n=== Testing Blog Posts API ===")
    response = requests.get(f'{BASE_URL}/blog/posts/')
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Successfully fetched {data['count']} blog posts")
        if data['results']:
            print(f"   First post: {data['results'][0]['title']}")
    else:
        print(f"❌ Failed: {response.status_code}")

def test_featured_posts():
    print("\n=== Testing Featured Posts ===")
    response = requests.get(f'{BASE_URL}/blog/posts/featured/')
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Successfully fetched {len(data)} featured posts")
    else:
        print(f"❌ Failed: {response.status_code}")

def test_categories():
    print("\n=== Testing Categories API ===")
    response = requests.get(f'{BASE_URL}/blog/categories/')
    if response.status_code == 200:
        data = response.json()
        categories = data if isinstance(data, list) else data.get('results', [])
        print(f"✅ Successfully fetched {len(categories)} categories")
        for cat in categories:
            print(f"   - {cat['name']}: {cat['posts_count']} posts")
    else:
        print(f"❌ Failed: {response.status_code}")

def test_quote_submission():
    print("\n=== Testing Quote Submission ===")
    quote_data = {
        'email': 'test@example.com',
        'phone': '+1234567890',
        'origin_country': 'United States',
        'destination_country': 'Germany',
        'cargo_type': 'general',
        'weight': 500,
        'additional_info': 'Test quote request'
    }
    
    response = requests.post(
        f'{BASE_URL}/quotes/',
        json=quote_data,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✅ Quote submitted successfully")
        print(f"   Message: {data['message']}")
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   Error: {response.text}")

def test_contact_submission():
    print("\n=== Testing Contact Form Submission ===")
    contact_data = {
        'name': 'Test User',
        'email': 'testuser@example.com',
        'phone': '+1234567890',
        'company': 'Test Company',
        'subject': 'general',
        'message': 'This is a test message'
    }
    
    response = requests.post(
        f'{BASE_URL}/contacts/messages/',
        json=contact_data,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✅ Contact message submitted successfully")
        print(f"   Message: {data['message']}")
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   Error: {response.text}")

def test_newsletter_subscription():
    print("\n=== Testing Newsletter Subscription ===")
    newsletter_data = {
        'email': 'newsletter@example.com'
    }
    
    response = requests.post(
        f'{BASE_URL}/contacts/newsletter/',
        json=newsletter_data,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✅ Newsletter subscription successful")
        print(f"   Message: {data['message']}")
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   Error: {response.text}")

if __name__ == '__main__':
    print("=" * 50)
    print("TradeFlow API Test Suite")
    print("=" * 50)
    print("\nMake sure the Django server is running:")
    print("python manage.py runserver")
    print("\nStarting tests...")
    
    try:
        test_blog_posts()
        test_featured_posts()
        test_categories()
        test_quote_submission()
        test_contact_submission()
        test_newsletter_subscription()
        
        print("\n" + "=" * 50)
        print("✅ All tests completed!")
        print("=" * 50)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the server")
        print("Make sure Django server is running: python manage.py runserver")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
