/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SITE_URL: string;
  VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}