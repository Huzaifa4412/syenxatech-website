import { siteConfig } from "@/lib/seo";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/private/"],
            },
            // AI search and answer engines are welcome to crawl and cite the site.
            {
                userAgent: [
                    "GPTBot",
                    "ChatGPT-User",
                    "OAI-SearchBot",
                    "PerplexityBot",
                    "ClaudeBot",
                    "Google-Extended",
                    "Bingbot",
                ],
                allow: "/",
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
