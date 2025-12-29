/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important for Vercel
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig