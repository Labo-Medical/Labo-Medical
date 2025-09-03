import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Messages = Record<string, string>;

type I18nContextValue = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
};

const supported = ['fr', 'es', 'ar'] as const;
const defaultLang = 'fr';

const I18nContext = createContext<I18nContextValue>({
  lang: defaultLang,
  setLang: () => {},
  t: (key: string) => key,
});

function getInitialLang(): string {
  const stored = localStorage.getItem('lang');
  if (stored && supported.includes(stored as any)) return stored;
  const nav = navigator.language.slice(0, 2);
  return supported.includes(nav as any) ? nav : defaultLang;
}

async function loadMessages(lang: string): Promise<Messages> {
  switch (lang) {
    case 'es':
      return (await import('./es.json')).default;
    case 'ar':
      return (await import('./ar.json')).default;
    default:
      return (await import('./fr.json')).default;
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<string>(getInitialLang());
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    loadMessages(lang).then(setMessages);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string) => messages[key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
