import type { TFunction, i18n as I18nType } from 'i18next';

// Strictly resolve blog keys from the CURRENT language first, without falling back to FR.
// Tries in order: blog.*, home.blog.*, pages.blog.* within current lang; then falls back via t().
export function tBlog(i18n: I18nType, t: TFunction, key: string): string {
  const lang = (i18n.language || '').split('-')[0] || i18n.language;
  const candidates = [
    `blog.${key}`,
    `home.blog.${key}`,
    `pages.blog.${key}`,
  ];
  for (const k of candidates) {
    try {
      const anyI = i18n as any;
      if (typeof anyI.exists === 'function' && anyI.exists(k, { lng: lang })) {
        return i18n.t(k, { lng: lang }) as unknown as string;
      }
      if (typeof anyI.getFixedT === 'function') {
        const tfixed = anyI.getFixedT(lang);
        const val = tfixed(k, { defaultValue: '' }) as string;
        if (val) return val;
      }
    } catch {}
  }
  // Fallback: let t() resolve with normal fallbacks
  return t(candidates[0] as any);
}
