/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: 'http://localhost:8000/api',
  }
}

module.exports = nextConfig
