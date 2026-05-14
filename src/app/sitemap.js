import { useCasesData } from "@/lib/use-cases-data";
import { absoluteUrl, blogPosts, staticRoutes } from "@/lib/seo";

const lastModified = new Date("2026-05-15");

export default function sitemap() {
    const blogRoutes = blogPosts.map((post) => ({
        path: `/blog/${post.slug}`,
        priority: 0.65,
        changeFrequency: "monthly",
    }));

    const useCaseRoutes = Object.keys(useCasesData).map((slug) => ({
        path: `/use-cases/${slug}`,
        priority: 0.75,
        changeFrequency: "monthly",
    }));

    return [...staticRoutes, ...blogRoutes, ...useCaseRoutes].map((route) => ({
        url: absoluteUrl(route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
