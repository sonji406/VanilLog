/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vanillog-bucket.s3.amazonaws.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
