import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/* global process */
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/PowerApp/' : '/',
})
