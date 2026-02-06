import type { NextConfig } from 'next'

const CHECKOUT_URL = process.env.CHECKOUT_URL || 'http://localhost:3001'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite /checkout paths to the checkout zone
      {
        source: '/checkout',
        destination: `${CHECKOUT_URL}/checkout`,
      },
      {
        source: '/checkout/:path+',
        destination: `${CHECKOUT_URL}/checkout/:path+`,
      },
      // Rewrite checkout zone static assets
      {
        source: '/checkout-static/_next/:path+',
        destination: `${CHECKOUT_URL}/checkout-static/_next/:path+`,
      },
    ]
  },
}

export default nextConfig
