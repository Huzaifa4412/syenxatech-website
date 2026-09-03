import { defineQuery } from "groq";

const IMAGE_FIELDS = /* groq */ `asset, hotspot, crop, alt`;

const POST_CARD_FIELDS = /* groq */ `
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    publishedAt,
    keywords,
    "category": category->{ title, "slug": slug.current },
    mainImage{ ${IMAGE_FIELDS} },
    "wordCount": length(string::split(pt::text(body), " "))
`;

export const POSTS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc){ ${POST_CARD_FIELDS} }
`);

export const POST_SLUGS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && defined(publishedAt)]{
        "slug": slug.current
    }
`);

export const POST_QUERY = defineQuery(`
    *[_type == "post" && slug.current == $slug][0]{
        ${POST_CARD_FIELDS},
        _updatedAt,
        "author": author->{
            name, role, bio, linkedin,
            image{ ${IMAGE_FIELDS} }
        },
        heroVideo{ url, caption, poster{ ${IMAGE_FIELDS} } },
        keyTakeaways,
        faq[]{ _key, question, answer },
        "relatedPosts": relatedPosts[]->[defined(slug.current) && defined(publishedAt)]{
            ${POST_CARD_FIELDS}
        },
        body[]{
            ...,
            _type == "image" => { ${IMAGE_FIELDS}, caption },
            _type == "videoEmbed" => { url, caption, poster{ ${IMAGE_FIELDS} } },
            _type == "imageGallery" => {
                columns, caption,
                images[]{ _key, ${IMAGE_FIELDS}, caption }
            },
            _type == "statGroup" => { title, stats[]{ _key, value, label } },
            _type == "callout" => { tone, title, body },
            _type == "ctaBlock" => { heading, text, buttonLabel, buttonHref }
        },
        seo{ metaTitle, metaDescription }
    }
`);

/** Newest posts other than the current one, used when no related posts are picked. */
export const RELATED_POSTS_QUERY = defineQuery(`
    *[_type == "post" && defined(slug.current) && defined(publishedAt) && slug.current != $slug]
    | order(publishedAt desc)[0...3]{ ${POST_CARD_FIELDS} }
`);
