import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="notfound-page">
      <h1>{t('pages.notfound.title')}</h1>
      <p>{t('pages.notfound.message')}</p>
    </main>
  );
}