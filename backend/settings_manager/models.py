from django.db import models


class SiteSettings(models.Model):
    # ── Company Info ──────────────────────────────────────────────────────────
    company_name = models.CharField(max_length=200, default='TradeFlow')
    company_tagline = models.CharField(max_length=300, default='Global Trade, Simplified.')
    company_description = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')
    company_email = models.CharField(max_length=200, default='hello@tradehub.com')
    company_phone = models.CharField(max_length=50, default='+251 991 001 124')
    company_address = models.CharField(max_length=300, default='Addis Ababa, Ethiopia')

    # ── Hero Section ──────────────────────────────────────────────────────────
    hero_badge_text = models.CharField(max_length=200, default='TRUSTED BY 2,000+ GLOBAL ENTERPRISES')
    hero_title = models.CharField(max_length=200, default='Global Trade,')
    hero_title_highlight = models.CharField(max_length=200, default='Simplified.')
    hero_subtitle = models.TextField(default='Expert Import-Export solutions connecting your business to the world\'s most lucrative markets.')
    hero_cta_primary = models.CharField(max_length=100, default='Request a Quote')
    hero_cta_secondary = models.CharField(max_length=100, default='Our Products')

    # ── Stats ─────────────────────────────────────────────────────────────────
    stat_years = models.CharField(max_length=20, default='15+')
    stat_years_label = models.CharField(max_length=50, default='Years Experience')
    stat_countries = models.CharField(max_length=20, default='50+')
    stat_countries_label = models.CharField(max_length=50, default='Countries Served')
    stat_shipments = models.CharField(max_length=20, default='10K+')
    stat_shipments_label = models.CharField(max_length=50, default='Shipments Delivered')
    stat_success_rate = models.CharField(max_length=20, default='99.8%')
    stat_success_label = models.CharField(max_length=50, default='Success Rate')

    # ── About Page ────────────────────────────────────────────────────────────
    about_title = models.CharField(max_length=200, default='Your Trusted Partner in Global Commerce')
    about_description = models.TextField(default='For over two decades, we\'ve been eliminating the complexity of international trade, helping businesses expand globally with confidence.')
    about_story = models.TextField(default='TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.')
    about_commitment = models.TextField(default='We\'re committed to transparency, reliability, and building long-term partnerships that drive mutual success.')
    about_founded_text = models.CharField(max_length=200, default='Trusted by Fortune 500 Companies')
    about_founded_sub = models.CharField(max_length=200, default='Delivering excellence in global trade since 2004')

    # ── Services Section ──────────────────────────────────────────────────────
    services_title = models.CharField(max_length=200, default='Our Services')
    services_subtitle = models.TextField(default='Comprehensive import-export solutions designed to streamline your global trade operations')

    # ── Products Section ──────────────────────────────────────────────────────
    products_title = models.CharField(max_length=200, default='Premium Import Solutions')
    products_subtitle = models.TextField(default='Discover our curated selection of high-quality products from trusted global suppliers')
    products_badge = models.CharField(max_length=100, default='PRODUCT CATALOG')

    # ── Quote Form Section ────────────────────────────────────────────────────
    quote_title = models.CharField(max_length=200, default='Request a Custom Quote')
    quote_subtitle = models.TextField(default='Get a personalized shipping quote tailored to your specific needs. Our logistics experts will analyze your requirements and provide competitive pricing within 24 hours.')
    quote_badge = models.CharField(max_length=100, default='Get Started')

    # ── Contact Info ──────────────────────────────────────────────────────────
    contact_email = models.CharField(max_length=200, default='info@globalexports.com')
    contact_phone = models.CharField(max_length=50, default='+251 991 001 124')
    contact_address = models.CharField(max_length=300, default='Addis Ababa, Ethiopia')
    working_hours = models.CharField(max_length=200, default='Mon-Fri, 9 AM - 6 PM')
    working_hours_sat = models.CharField(max_length=100, default='10 AM - 4 PM')

    # ── Footer ────────────────────────────────────────────────────────────────
    footer_tagline = models.TextField(default='Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.')

    # ── Social Media ──────────────────────────────────────────────────────────
    facebook_url = models.CharField(max_length=300, blank=True, default='https://facebook.com')
    twitter_url = models.CharField(max_length=300, blank=True, default='https://twitter.com')
    linkedin_url = models.CharField(max_length=300, blank=True, default='https://linkedin.com')
    instagram_url = models.CharField(max_length=300, blank=True, default='https://instagram.com')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return f'Site Settings (updated {self.updated_at})'

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
