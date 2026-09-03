import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // fast, cached reads of published content
    perspective: "published",
});

/**
 * Fetch from Sanity with Next.js ISR caching.
 * Content is re-fetched at most every `revalidate` seconds. `tags` additionally
 * allow on-demand purging with revalidateTag() from a webhook later on.
 */
export function sanityFetch({ query, params = {}, revalidate = 60, tags = [] }) {
    return client.fetch(query, params, {
        next: { revalidate, tags },
    });
}
