import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify('AIzaSyDZZCzQbGTbL1p8aNFmj2ccOMSNagRHaJo'),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify('shuaq-foundation.firebaseapp.com'),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify('shuaq-foundation'),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify('shuaq-foundation.firebasestorage.app'),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify('228057496846'),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify('1:228057496846:web:8b95de21e25b1aec38eb5f'),
    'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify('G-5PCLJBZ545'),
  }
})
