import { defineConfig } from 'vite';

// Configuración simple para servir en GitHub Pages.
// Si no hay variable, usa el nombre del repo actual.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Knight-s-Path';

export default defineConfig({
  base: `/${repo}/`
});
