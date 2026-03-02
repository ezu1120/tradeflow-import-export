from django.core.management.base import BaseCommand
from django.utils import timezone
from blog.models import Category, BlogPost


class Command(BaseCommand):
    help = 'Populate database with sample blog posts'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating categories...')
        
        # Create categories
        categories_data = [
            {'name': 'Regulations', 'description': 'Trade regulations and compliance'},
            {'name': 'Logistics', 'description': 'Logistics and shipping solutions'},
            {'name': 'Technology', 'description': 'Technology innovations in trade'},
            {'name': 'Market Analysis', 'description': 'Global market trends and analysis'},
            {'name': 'Sustainability', 'description': 'Sustainable trade practices'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category.name}'))
        
        self.stdout.write('Creating blog posts...')
        
        # Create blog posts
        posts_data = [
            {
                'title': 'Navigating Global Trade Regulations in 2025',
                'excerpt': 'Understanding the latest changes in international trade policies and how they impact your business operations across different markets.',
                'content': '''<h2>Introduction</h2>
<p>The landscape of global trade regulations continues to evolve rapidly in 2025. Businesses engaged in international commerce must stay informed about these changes to maintain compliance and competitive advantage.</p>

<h2>Key Regulatory Changes</h2>
<p>Several major economies have introduced new trade policies this year, affecting customs procedures, tariff structures, and documentation requirements. Understanding these changes is crucial for smooth operations.</p>

<h3>Digital Documentation</h3>
<p>Many countries are now requiring digital submission of trade documents, streamlining the customs clearance process while enhancing security and traceability.</p>

<h3>Environmental Standards</h3>
<p>New environmental regulations are being implemented globally, requiring businesses to demonstrate sustainable practices in their supply chains.</p>

<h2>Best Practices for Compliance</h2>
<ul>
<li>Stay updated with regulatory changes in your target markets</li>
<li>Invest in compliance management systems</li>
<li>Work with experienced customs brokers</li>
<li>Maintain accurate documentation</li>
<li>Conduct regular compliance audits</li>
</ul>

<h2>Conclusion</h2>
<p>Navigating global trade regulations requires vigilance, expertise, and the right partnerships. By staying informed and proactive, businesses can turn regulatory compliance into a competitive advantage.</p>''',
                'author': 'Sarah Chen',
                'category': 'Regulations',
                'image': '/global-trade-shipping-containers.jpg',
                'read_time': '8 min read',
                'is_featured': True,
            },
            {
                'title': 'Logistics Cost Optimization Strategies',
                'excerpt': 'Learn proven methods to reduce shipping costs without compromising delivery times or service quality.',
                'content': '''<h2>Understanding Logistics Costs</h2>
<p>Logistics costs can account for a significant portion of your overall business expenses. Optimizing these costs while maintaining service quality is essential for profitability.</p>

<h2>Key Optimization Strategies</h2>
<h3>1. Route Optimization</h3>
<p>Implementing advanced route planning software can reduce fuel costs and delivery times significantly.</p>

<h3>2. Consolidation</h3>
<p>Combining shipments when possible reduces per-unit shipping costs and improves efficiency.</p>

<h3>3. Carrier Negotiation</h3>
<p>Building strong relationships with carriers and negotiating volume discounts can lead to substantial savings.</p>

<h2>Technology Solutions</h2>
<p>Modern logistics management systems provide real-time visibility and analytics, enabling data-driven decision-making for cost optimization.</p>''',
                'author': 'Michael Rodriguez',
                'category': 'Logistics',
                'image': '/logistics-warehouse-management.jpg',
                'read_time': '6 min read',
                'is_featured': False,
            },
            {
                'title': 'Digital Transformation in Supply Chain',
                'excerpt': 'How AI and automation are revolutionizing import/export operations and creating new efficiencies.',
                'content': '''<h2>The Digital Revolution</h2>
<p>Artificial intelligence and automation are transforming how businesses manage their supply chains, from predictive analytics to automated customs clearance.</p>

<h2>AI Applications</h2>
<h3>Predictive Analytics</h3>
<p>AI-powered systems can forecast demand, optimize inventory levels, and predict potential disruptions before they occur.</p>

<h3>Automated Documentation</h3>
<p>Machine learning algorithms can automatically generate and verify trade documents, reducing errors and processing time.</p>

<h2>Benefits of Digital Transformation</h2>
<ul>
<li>Increased efficiency and speed</li>
<li>Reduced human error</li>
<li>Better visibility and tracking</li>
<li>Cost savings</li>
<li>Improved customer satisfaction</li>
</ul>''',
                'author': 'Emma Watson',
                'category': 'Technology',
                'image': '/supply-chain-technology.png',
                'read_time': '7 min read',
                'is_featured': True,
            },
            {
                'title': 'Asia-Pacific Trade Growth Opportunities',
                'excerpt': 'Exploring emerging opportunities in the fastest-growing trade corridors and how to capitalize on them.',
                'content': '''<h2>The Asia-Pacific Advantage</h2>
<p>The Asia-Pacific region continues to be the fastest-growing trade corridor globally, offering immense opportunities for businesses willing to navigate its complexities.</p>

<h2>Key Markets</h2>
<h3>China</h3>
<p>Despite challenges, China remains a crucial market with its massive consumer base and manufacturing capabilities.</p>

<h3>Southeast Asia</h3>
<p>Countries like Vietnam, Thailand, and Indonesia are emerging as manufacturing hubs and growing consumer markets.</p>

<h2>Success Strategies</h2>
<p>Understanding local regulations, building strong partnerships, and adapting to cultural differences are key to success in Asia-Pacific markets.</p>''',
                'author': 'David Park',
                'category': 'Market Analysis',
                'image': '/asia-trade-ports-business.jpg',
                'read_time': '9 min read',
                'is_featured': False,
            },
            {
                'title': 'Sustainable Export Practices',
                'excerpt': 'Meeting environmental standards while maintaining competitive shipping costs and operational efficiency.',
                'content': '''<h2>The Sustainability Imperative</h2>
<p>Environmental sustainability is no longer optional in international trade. Businesses must adopt green practices to meet regulations and customer expectations.</p>

<h2>Green Logistics Solutions</h2>
<h3>Carbon-Neutral Shipping</h3>
<p>Many carriers now offer carbon offset programs and are investing in cleaner fuel alternatives.</p>

<h3>Sustainable Packaging</h3>
<p>Eco-friendly packaging materials reduce environmental impact while often lowering costs.</p>

<h2>Benefits Beyond Compliance</h2>
<p>Sustainable practices can enhance brand reputation, attract environmentally conscious customers, and often lead to cost savings through efficiency improvements.</p>''',
                'author': 'James Miller',
                'category': 'Sustainability',
                'image': '/green-logistics-sustainability.jpg',
                'read_time': '6 min read',
                'is_featured': False,
            },
        ]
        
        for post_data in posts_data:
            category_name = post_data.pop('category')
            post_data['category'] = categories[category_name]
            post_data['is_published'] = True
            post_data['published_date'] = timezone.now()
            
            post, created = BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults=post_data
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created post: {post.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'Post already exists: {post.title}'))
        
        self.stdout.write(self.style.SUCCESS('Successfully populated blog data!'))
