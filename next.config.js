/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['localhost'], // if the images are hosted locally
    },
    headers: () => [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ],
  }
  

module.exports = nextConfig
