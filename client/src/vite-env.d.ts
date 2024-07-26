/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYU_MERCHANT_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
