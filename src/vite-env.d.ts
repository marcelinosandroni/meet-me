/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "demo" (padrão): MockSchedulingService/localStorage. "real": chama /api/* */
  readonly VITE_API_MODE?: 'demo' | 'real';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
