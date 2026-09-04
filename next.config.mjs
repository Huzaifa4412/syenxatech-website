/** @type {import('next').NextConfig} */
const nextConfig = {
    // Lets CI or a local verification build write somewhere other than .next,
    // so it never clobbers a running `next dev` (NEXT_DIST_DIR=.next-build).
    distDir: process.env.NEXT_DIST_DIR || ".next",
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.facebook.com",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    reactStrictMode: false,
    async redirects() {
        return [
            // Canonical host: bare domain -> www (permanent). Vercel's own domain
            // redirect issues a 307, which does not pass link equity; this 308
            // covers requests that reach the app directly.
            {
                source: "/:path*",
                has: [{ type: "host", value: "syenxatech.com" }],
                destination: "https://www.syenxatech.com/:path*",
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
            {
                // Long-lived caching for static assets served from /public.
                source: "/:all*(svg|jpg|jpeg|png|webp|avif|webm|mp4|ico)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
