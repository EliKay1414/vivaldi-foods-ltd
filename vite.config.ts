import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      TanStackRouterVite(),
      react(),
      tailwindcss(),
      {
        name: 'google-site-verification',
        transformIndexHtml(html) {
          const token = env.VITE_GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION
          if (!token) return html
          return html.replace(
            '</head>',
            `  <meta name="google-site-verification" content="${token}" />\n</head>`,
          )
        },
      },
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
