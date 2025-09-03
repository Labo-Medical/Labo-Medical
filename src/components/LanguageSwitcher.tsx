import { useI18n } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      aria-label="Choisir la langue"
    >
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="ar">العربية</option>
    </select>
  );
}
