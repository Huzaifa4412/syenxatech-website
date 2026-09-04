import BlogListingClient from "@/components/blog-listing-client";
import JsonLd from "@/components/JsonLd";
import {
    blogPosts,
    canonicalUrl,
    generateBreadcrumbSchema,
    ORGANIZATION_ID,
    WEBSITE_ID,
} from "@/lib/seo";
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

    const allPosts = [...fromSanity, ...legacy];

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${canonicalUrl("/blog")}#blog`,
        url: canonicalUrl("/blog"),
        name: "Syenxa Tech Blog",
        description:
            "Insights on AI calling agents, AI chatbots, automation, website development and digital marketing for growing businesses.",
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        blogPost: allPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: canonicalUrl(`/blog/${post.slug}`),
            ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
        })),
    };

    return (
        <>
            <JsonLd
                data={[
                    blogSchema,
                    generateBreadcrumbSchema([{ name: "Blog", path: "/blog" }]),
                ]}
            />
            <BlogListingClient posts={allPosts} />
        </>
    );
}
