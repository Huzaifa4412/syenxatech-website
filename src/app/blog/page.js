import BlogListingClient from "@/components/blog-listing-client";
import { blogPosts } from "@/lib/seo";
import { minutesFromWords } from "@/lib/reading-time";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { POSTS_QUERY } from "@/sanity/queries";

/**
 * Blog index. Posts managed in Sanity Studio are listed first (newest first),
 * followed by the legacy hard-coded posts that still live as static routes.
 */
export default async function BlogPage() {
    let sanityPosts = [];
    try {
        sanityPosts = await sanityFetch({ query: POSTS_QUERY, tags: ["post"] });
    } catch (error) {
        console.error("Failed to load posts from Sanity", error);
    }

    const fromSanity = (sanityPosts || []).map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        publishedAt: post.publishedAt,
        keywords: post.keywords || [],
        readingTime: minutesFromWords(post.wordCount),
        coverImage: post.mainImage?.asset
            ? {
                  src: urlFor(post.mainImage).width(1200).height(900).fit("crop").url(),
                  alt: post.mainImage.alt || "",
              }
            : null,
    }));

    const sanitySlugs = new Set(fromSanity.map((post) => post.slug));
    const legacy = blogPosts
        .filter((post) => !sanitySlugs.has(post.slug))
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            description: post.description,
            publishedAt: null,
            keywords: post.keywords || [],
            readingTime: null,
            coverImage: null,
        }));

    return <BlogListingClient posts={[...fromSanity, ...legacy]} />;
}
