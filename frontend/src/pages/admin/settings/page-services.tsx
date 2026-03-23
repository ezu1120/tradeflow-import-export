import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsPageServices() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Services Page Header" subtitle="The banner shown at the top of the Services page" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="services_page_badge" value={settings.services_page_badge} onChange={handleChange} />
      <Field label="Page Title" name="services_page_title" value={settings.services_page_title} onChange={handleChange} />
      <Field label="Page Subtitle" name="services_page_subtitle" value={settings.services_page_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
