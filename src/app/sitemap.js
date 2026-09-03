import { useCasesData } from "@/lib/use-cases-data";
import { absoluteUrl, blogPosts, staticRoutes } from "@/lib/seo";
import { client } from "@/sanity/client";
import { POST_SLUGS_QUERY } from "@/sanity/queries";

const lastModified = new Date("2026-05-15");

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
            lastModified: post._updatedAt ? new Date(post._updatedAt) : lastModified,
        }));
    } catch (error) {
        console.error("Failed to load Sanity posts for sitemap", error);
        return [];
    }
}

export default async function sitemap() {
    const sanityBlogRoutes = await getSanityBlogRoutes();
    const sanitySlugs = new Set(sanityBlogRoutes.map((route) => route.path));

    const blogRoutes = blogPosts
        .map((post) => ({
            path: `/blog/${post.slug}`,
            priority: 0.65,
            changeFrequency: "monthly",
        }))
        .filter((route) => !sanitySlugs.has(route.path));

    const useCaseRoutes = Object.keys(useCasesData).map((slug) => ({
        path: `/use-cases/${slug}`,
        priority: 0.75,
        changeFrequency: "monthly",
    }));

    return [
        ...staticRoutes,
        ...sanityBlogRoutes,
        ...blogRoutes,
        ...useCaseRoutes,
    ].map((route) => ({
        url: absoluteUrl(route.path),
        lastModified: route.lastModified || lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
