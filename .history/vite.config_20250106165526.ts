import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    imports: [
      'vue'
    ],
    dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)),
    eslintrc: {
      enabled: true,
      filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
      globalsPropValue: true
    }

  })
  ],
})
