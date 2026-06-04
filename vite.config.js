import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/despensa-inteligente/',
  resolve: {
    alias: {
      "lucide-react/icons": fileURLToPath(
        new URL("./node_modules/lucide-react/dist/esm/icons", import.meta.url)
      ),
    },
  },
})
