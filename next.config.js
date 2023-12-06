/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {},
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
