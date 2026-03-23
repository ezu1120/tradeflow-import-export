import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsPageContact() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Contact Page Header" subtitle="The banner shown at the top of the Contact page" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="contact_page_badge" value={settings.contact_page_badge} onChange={handleChange} />
      <Field label="Page Title" name="contact_page_title" value={settings.contact_page_title} onChange={handleChange} />
      <Field label="Page Subtitle" name="contact_page_subtitle" value={settings.contact_page_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
