/**
 * Renders one or more JSON-LD blocks. Accepts a single schema object or an
 * array of them. Server component: safe to use from any page or layout.
 */
export default function JsonLd({ data }) {
    const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
    if (items.length === 0) return null;
    return items.map((item, index) => (
        <script
            key={item["@id"] || item["@type"] || index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(item).replace(/</g, "\\u003c"),
            }}
        />
    ));
}
