/** @type {impomrt('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mywheels-staging-public.s3.ap-southeast-1.amazonaws.com'],
  },
}

module.exports = nextConfig
