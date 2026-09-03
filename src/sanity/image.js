import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build an optimized image URL from a Sanity image field (respects hotspot/crop). */
export function urlFor(source) {
    return builder.image(source).auto("format");
}
