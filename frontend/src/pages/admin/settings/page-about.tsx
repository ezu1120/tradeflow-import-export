import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsPageAbout() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="About Page Header" subtitle="The banner shown at the top of the About page" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="about_page_badge" value={settings.about_page_badge} onChange={handleChange} />
      <Field label="Page Title" name="about_page_title" value={settings.about_page_title} onChange={handleChange} />
      <Field label="Page Subtitle" name="about_page_subtitle" value={settings.about_page_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
