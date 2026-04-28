import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.aliexpress.com" },
      { protocol: "https", hostname: "**.spocket.co" },
      { protocol: "https", hostname: "**.cjdropshipping.com" },
      { protocol: "https", hostname: "**.printful.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cloudflare.com" },
    ],
  },
};

export default nextConfig;