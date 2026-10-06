/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional HTTPS form endpoint (Formspree, Netlify Forms, Basin…). */
  readonly VITE_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
