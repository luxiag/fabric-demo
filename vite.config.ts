import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue(),
  AutoImport({
    imports: [
      'vue', {
        '@/utils/index.ts': [
          "throttle",
          "debounce"
        ]
      }

    ],
    // dirs: ["./src/utils/index.ts"],
    dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)),
    eslintrc: {
      enabled: true,
      filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
      globalsPropValue: true
    }

  })
  ],
})
