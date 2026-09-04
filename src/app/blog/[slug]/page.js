import { notFound } from "next/navigation";
import SEOContentPage from "@/components/SEOContentPage";
import JsonLd from "@/components/JsonLd";
import PortableText from "@/components/portable-text";
import VideoEmbed from "@/components/video-embed";
import { extractHeadings } from "@/lib/portable-text-utils";
import { formatPostDate, minutesFromWords } from "@/lib/reading-time";
import {
    absoluteUrl,
    canonicalUrl,
    createMetadata,
    generateBreadcrumbSchema,
    generateFaqSchema,
    ORGANIZATION_ID,
    siteConfig,
} from "@/lib/seo";
import { client, sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
    POST_QUERY,
    POST_SLUGS_QUERY,
    RELATED_POSTS_QUERY,
} from "@/sanity/queries";

async function getPost(slug) {
    return sanityFetch({
        query: POST_QUERY,
        params: { slug },
        tags: ["post", `post:${slug}`],
    });
}

function toCard(post) {
    return {
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        publishedAt: post.publishedAt,
        readingTime: minutesFromWords(post.wordCount),
        category: post.category?.title || null,
        coverImage: post.mainImage?.asset
            ? {
                  src: urlFor(post.mainImage).width(800).height(500).fit("crop").url(),
                  alt: post.mainImage.alt || "",
              }
            : null,
    };
}

export async function generateStaticParams() {
    try {
        const slugs = await client.withConfig({ useCdn: false }).fetch(POST_SLUGS_QUERY);
        return (slugs || []).map(({ slug }) => ({ slug }));
    } catch (error) {
        console.error("Failed to load post slugs from Sanity", error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    const image = post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
        : undefined;

    return createMetadata({
        title: post.seo?.metaTitle || `${post.title} | ${siteConfig.name}`,
        description: post.seo?.metaDescription || post.excerpt,
        path: `/blog/${post.slug}`,
        type: "article",
        keywords: post.keywords || [],
        image,
        imageAlt: post.mainImage?.alt,
        publishedTime: post.publishedAt,
        modifiedTime: post._updatedAt || post.publishedAt,
    });
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    // Related: editor picks first, otherwise the newest other posts.
    let related = (post.relatedPosts || []).filter(Boolean);
    if (related.length === 0) {
        try {
            related = await sanityFetch({
                query: RELATED_POSTS_QUERY,
                params: { slug },
                tags: ["post"],
            });
        } catch (error) {
            console.error("Failed to load related posts", error);
            related = [];
        }
    }

    const coverImage = post.mainImage?.asset
        ? {
              src: urlFor(post.mainImage).width(1600).height(686).fit("crop").url(),
              alt: post.mainImage.alt || "",
          }
        : null;

    const heroMedia = post.heroVideo?.url ? (
        <VideoEmbed
            url={post.heroVideo.url}
            caption={post.heroVideo.caption}
            posterUrl={
                post.heroVideo.poster?.asset
                    ? urlFor(post.heroVideo.poster).width(1600).height(900).fit("crop").url()
                    : coverImage?.src
            }
            title={post.title}
            priority
        />
    ) : null;

    const author = post.author?.name
        ? {
              name: post.author.name,
              role: post.author.role,
              bio: post.author.bio,
              linkedin: post.author.linkedin,
              imageUrl: post.author.image?.asset
                  ? urlFor(post.author.image).width(96).height(96).fit("crop").url()
                  : null,
              imageAlt: post.author.image?.alt,
          }
        : null;

    const pageUrl = canonicalUrl(`/blog/${post.slug}`);

    const articleLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        inLanguage: "en",
        headline: post.title,
        description: post.seo?.metaDescription || post.excerpt,
        image: coverImage?.src || absoluteUrl(siteConfig.ogImage),
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        keywords: (post.keywords || []).join(", "),
        articleSection: post.category?.title,
        mainEntityOfPage: pageUrl,
        author: author
            ? { "@type": "Person", name: author.name, jobTitle: author.role, url: author.linkedin }
            : { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        publisher: { "@id": ORGANIZATION_ID },
    };

    const breadcrumbLd = generateBreadcrumbSchema([
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
    ]);

    const faq = (post.faq || []).filter((item) => item?.question && item?.answer);

    return (
        <>
            <JsonLd data={[articleLd, breadcrumbLd]} />
            {faq.length > 0 && <JsonLd data={generateFaqSchema(faq)} />}
            <SEOContentPage
                title={post.title}
                subtitle={post.subtitle}
                content={<PortableText value={post.body} />}
                keywords={post.keywords?.length ? post.keywords : undefined}
                category={post.category?.title}
                author={author}
                date={formatPostDate(post.publishedAt)}
                dateTime={post.publishedAt}
                readingTime={minutesFromWords(post.wordCount)}
                coverImage={coverImage}
                heroMedia={heroMedia}
                headings={extractHeadings(post.body)}
                keyTakeaways={post.keyTakeaways}
                faq={faq}
                related={(related || []).map(toCard)}
                shareUrl={pageUrl}
            />
        </>
    );
}
