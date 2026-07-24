import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, 'src');
const INCLUDE_PATTERN = /<include\s+src="([^"]+)"\s*><\/include>/g;

function resolveIncludePath(src) {
  const normalized = src.startsWith('/') ? src.slice(1) : src;
  return resolve(root, normalized);
}

function processIncludes(html) {
  return html.replace(INCLUDE_PATTERN, (_, src) => {
    const filePath = resolveIncludePath(src);
    const content = readFileSync(filePath, 'utf-8');
    return processIncludes(content);
  });
}

function htmlIncludes() {
  return {
    name: 'html-includes',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return processIncludes(html);
      },
    },
  };
}

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  base: './',
  plugins: [htmlIncludes()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
