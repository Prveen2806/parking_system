import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    open:true
  },
  build:{
    outDir:'build'
  },
  resolve:{
    alias:{
        "@components": "/src/components",
      "@service": "/src/services",
      "@context": "/src/context",
      "@layout": "/src/layout",
      "@routes": "/src/routes",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@data": "/src/data",
    }
  }
})
