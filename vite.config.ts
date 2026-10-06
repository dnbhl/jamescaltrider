import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Security: dev server binds to 127.0.0.1 only and sends hardened headers.
// NOTE: 'unsafe-inline' / 'unsafe-eval' in script-src are required by Vite's
// dev HMR client only. Set a strict CSP (nonce-based) at the production host.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data:",
        "media-src 'self'",
        "connect-src 'self' ws://127.0.0.1:* http://127.0.0.1:*",
        "frame-ancestors 'self'",
        "object-src 'none'",
        "base-uri 'self'",
      ].join('; '),
    },
  },
  build: {
    target: 'es2019',
    cssMinify: true,
    sourcemap: false,
  },
});
