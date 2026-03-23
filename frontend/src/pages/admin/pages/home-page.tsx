import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useSettingsPage, Field } from "../settings/shared";

function SettingsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function HomeAdminPage() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Home Page</h2>
          <p className="text-slate-400 text-sm mt-1">Hero, stats, and quote form section</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <SettingsBlock title="Hero Section">
        <Field label="Badge Text" name="hero_badge_text" value={settings.hero_badge_text} onChange={handleChange} full />
        <Field label="Main Title" name="hero_title" value={settings.hero_title} onChange={handleChange} />
        <Field label="Title Highlight (gold text)" name="hero_title_highlight" value={settings.hero_title_highlight} onChange={handleChange} />
        <Field label="Subtitle" name="hero_subtitle" value={settings.hero_subtitle} onChange={handleChange} textarea full />
        <Field label="Primary Button" name="hero_cta_primary" value={settings.hero_cta_primary} onChange={handleChange} />
        <Field label="Secondary Button" name="hero_cta_secondary" value={settings.hero_cta_secondary} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Stats & Numbers">
        <Field label="Years Value (e.g. 15+)" name="stat_years" value={settings.stat_years} onChange={handleChange} />
        <Field label="Years Label" name="stat_years_label" value={settings.stat_years_label} onChange={handleChange} />
        <Field label="Countries Value (e.g. 50+)" name="stat_countries" value={settings.stat_countries} onChange={handleChange} />
        <Field label="Countries Label" name="stat_countries_label" value={settings.stat_countries_label} onChange={handleChange} />
        <Field label="Shipments Value (e.g. 10K+)" name="stat_shipments" value={settings.stat_shipments} onChange={handleChange} />
        <Field label="Shipments Label" name="stat_shipments_label" value={settings.stat_shipments_label} onChange={handleChange} />
        <Field label="Success Rate (e.g. 99.8%)" name="stat_success_rate" value={settings.stat_success_rate} onChange={handleChange} />
        <Field label="Success Label" name="stat_success_label" value={settings.stat_success_label} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Quote Form Section">
        <Field label="Badge Text" name="quote_badge" value={settings.quote_badge} onChange={handleChange} />
        <Field label="Title" name="quote_title" value={settings.quote_title} onChange={handleChange} />
        <Field label="Subtitle" name="quote_subtitle" value={settings.quote_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="Trust Bar Section">
        <Field label="Badge" name="trust_bar_badge" value={settings.trust_bar_badge} onChange={handleChange} full />
        <Field label="Title" name="trust_bar_title" value={settings.trust_bar_title} onChange={handleChange} full />
        <Field label="Statement" name="trust_bar_statement" value={settings.trust_bar_statement} onChange={handleChange} textarea full />
        <Field label="Cert 1" name="cert1_name" value={settings.cert1_name} onChange={handleChange} />
        <Field label="Cert 2" name="cert2_name" value={settings.cert2_name} onChange={handleChange} />
        <Field label="Cert 3" name="cert3_name" value={settings.cert3_name} onChange={handleChange} />
        <Field label="Cert 4" name="cert4_name" value={settings.cert4_name} onChange={handleChange} />
        <Field label="Cert 5" name="cert5_name" value={settings.cert5_name} onChange={handleChange} />
        <Field label="Cert 6" name="cert6_name" value={settings.cert6_name} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Featured Services Section — Heading">
        <Field label="Badge" name="featured_services_badge" value={settings.featured_services_badge} onChange={handleChange} />
        <Field label="Title" name="featured_services_title" value={settings.featured_services_title} onChange={handleChange} />
        <Field label="Subtitle" name="featured_services_subtitle" value={settings.featured_services_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="Featured Service 1">
        <Field label="Title" name="fs1_title" value={settings.fs1_title} onChange={handleChange} />
        <Field label="Description" name="fs1_desc" value={settings.fs1_desc} onChange={handleChange} textarea full />
        <Field label="Feature 1" name="fs1_f1" value={settings.fs1_f1} onChange={handleChange} />
        <Field label="Feature 2" name="fs1_f2" value={settings.fs1_f2} onChange={handleChange} />
        <Field label="Feature 3" name="fs1_f3" value={settings.fs1_f3} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Featured Service 2">
        <Field label="Title" name="fs2_title" value={settings.fs2_title} onChange={handleChange} />
        <Field label="Description" name="fs2_desc" value={settings.fs2_desc} onChange={handleChange} textarea full />
        <Field label="Feature 1" name="fs2_f1" value={settings.fs2_f1} onChange={handleChange} />
        <Field label="Feature 2" name="fs2_f2" value={settings.fs2_f2} onChange={handleChange} />
        <Field label="Feature 3" name="fs2_f3" value={settings.fs2_f3} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Featured Service 3">
        <Field label="Title" name="fs3_title" value={settings.fs3_title} onChange={handleChange} />
        <Field label="Description" name="fs3_desc" value={settings.fs3_desc} onChange={handleChange} textarea full />
        <Field label="Feature 1" name="fs3_f1" value={settings.fs3_f1} onChange={handleChange} />
        <Field label="Feature 2" name="fs3_f2" value={settings.fs3_f2} onChange={handleChange} />
        <Field label="Feature 3" name="fs3_f3" value={settings.fs3_f3} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="About Section (Home)">
        <Field label="Badge" name="home_about_badge" value={settings.home_about_badge} onChange={handleChange} />
        <Field label="Section Subtitle (gold text)" name="home_about_section_title" value={settings.home_about_section_title} onChange={handleChange} />
        <Field label="Inner Heading" name="home_about_inner_title" value={settings.home_about_inner_title} onChange={handleChange} full />
        <Field label="Highlight 1" name="home_about_highlight1" value={settings.home_about_highlight1} onChange={handleChange} full />
        <Field label="Highlight 2" name="home_about_highlight2" value={settings.home_about_highlight2} onChange={handleChange} full />
        <Field label="Highlight 3" name="home_about_highlight3" value={settings.home_about_highlight3} onChange={handleChange} full />
        <Field label="Highlight 4" name="home_about_highlight4" value={settings.home_about_highlight4} onChange={handleChange} full />
        <Field label="Feature 1 Title" name="home_about_feat1_title" value={settings.home_about_feat1_title} onChange={handleChange} />
        <Field label="Feature 1 Desc" name="home_about_feat1_desc" value={settings.home_about_feat1_desc} onChange={handleChange} />
        <Field label="Feature 2 Title" name="home_about_feat2_title" value={settings.home_about_feat2_title} onChange={handleChange} />
        <Field label="Feature 2 Desc" name="home_about_feat2_desc" value={settings.home_about_feat2_desc} onChange={handleChange} />
        <Field label="Feature 3 Title" name="home_about_feat3_title" value={settings.home_about_feat3_title} onChange={handleChange} />
        <Field label="Feature 3 Desc" name="home_about_feat3_desc" value={settings.home_about_feat3_desc} onChange={handleChange} />
        <Field label="CTA Title" name="home_about_cta_title" value={settings.home_about_cta_title} onChange={handleChange} full />
        <Field label="CTA Subtitle" name="home_about_cta_subtitle" value={settings.home_about_cta_subtitle} onChange={handleChange} textarea full />
        <Field label="CTA Button" name="home_about_cta_btn" value={settings.home_about_cta_btn} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Impact Stats Quote">
        <Field label="Quote Text" name="impact_quote" value={settings.impact_quote} onChange={handleChange} textarea full />
        <Field label="Quote Author" name="impact_quote_author" value={settings.impact_quote_author} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Testimonials Section">
        <Field label="Badge" name="testimonial_badge" value={settings.testimonial_badge} onChange={handleChange} />
        <Field label="Title" name="testimonial_title" value={settings.testimonial_title} onChange={handleChange} />
        <Field label="Subtitle" name="testimonial_subtitle" value={settings.testimonial_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>
    </div>
  );
}
