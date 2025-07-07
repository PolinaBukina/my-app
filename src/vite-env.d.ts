/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // другие переменные...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}