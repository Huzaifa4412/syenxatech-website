/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.facebook.com",
    },
  ],
};

export default nextConfig;
