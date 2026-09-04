import { useCasesData } from "@/lib/use-cases-data";
import {
    blogPosts,
    canonicalUrl,
    SITE_LAST_UPDATED,
    staticRoutes,
} from "@/lib/seo";
import { client } from "@/sanity/client";

const siteLastModified = new Date(SITE_LAST_UPDATED);

async function getSanityBlogRoutes() {
    try {
        const posts = await client
            .withConfig({ useCdn: false })
            .fetch(
                `*[_type == "post" && defined(slug.current) && defined(publishedAt)]{
                    "slug": slug.current, _updatedAt
                }`
            );
        return (posts || []).map((post) => ({
            path: `/blog/${post.slug}`,
            priority: 0.65,
            changeFrequency: "monthly",
            lastModified: post._updatedAt
                ? new Date(post._updatedAt)
                : siteLastModified,
        }));
    } catch (error) {
        console.error("Failed to load Sanity posts for sitemap", error);
        return [];
    }
}

export default async function sitemap() {
    const sanityBlogRoutes = await getSanityBlogRoutes();
    const sanitySlugs = new Set(sanityBlogRoutes.map((route) => route.path));

    const legacyBlogRoutes = blogPosts
        .map((post) => ({
            path: `/blog/${post.slug}`,
            priority: 0.65,
            changeFrequency: "monthly",
            lastModified: new Date(post.dateModified || post.datePublished),
        }))
        .filter((route) => !sanitySlugs.has(route.path));

    const useCaseRoutes = Object.keys(useCasesData).map((slug) => ({
        path: `/use-cases/${slug}`,
        priority: 0.75,
        changeFrequency: "monthly",
    }));

    return [
        ...staticRoutes,
        ...useCaseRoutes,
        ...sanityBlogRoutes,
        ...legacyBlogRoutes,
    ].map((route) => ({
        url: canonicalUrl(route.path),
        lastModified: route.lastModified || siteLastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
