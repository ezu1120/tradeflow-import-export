import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsPageBlog() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Blog Page Header" subtitle="The banner shown at the top of the Blog page" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="blog_page_badge" value={settings.blog_page_badge} onChange={handleChange} />
      <Field label="Page Title" name="blog_page_title" value={settings.blog_page_title} onChange={handleChange} />
      <Field label="Page Subtitle" name="blog_page_subtitle" value={settings.blog_page_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
