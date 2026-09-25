/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.unsplash.com" },
    // ],
    unoptimized:true
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/pools",
        destination: "/services/swimming-pool-construction",
        permanent: true,
      },
      {
        source: "/landscaping",
        destination: "/services/villa-landscaping",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
