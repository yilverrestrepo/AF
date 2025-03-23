import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  // Resto de tu configuración de Next.js
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
});

export default nextConfig;

