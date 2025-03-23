import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  // Configuración para imágenes
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Habilitar Server Actions
  experimental: {
    serverActions: true,
  },
  // Configuración para i18n
  i18n: {
    locales: ['es', 'en', 'fr', 'de'],
    defaultLocale: 'es',
  },
  // Asegurarse de que Vercel pueda construir correctamente
  transpilePackages: ['next-pwa'],
});

export default nextConfig;

