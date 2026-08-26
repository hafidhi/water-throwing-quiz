import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/water-throwing-quiz/', // <- penting! supaya asset jadi relatif
    plugins: [react(), tailwindcss()],
})
