/** Plain text of a single Portable Text block. */
export function blockToPlainText(block) {
    if (!block || !Array.isArray(block.children)) return "";
    return block.children.map((child) => child.text || "").join("");
}

export function slugifyHeading(text = "") {
    return text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80);
}

/** Table of contents from the h2 blocks of a Portable Text body. */
export function extractHeadings(body = []) {
    if (!Array.isArray(body)) return [];
    const seen = new Map();
    return body
        .filter((block) => block._type === "block" && block.style === "h2")
        .map((block) => {
            const text = blockToPlainText(block).trim();
            let id = slugifyHeading(text) || "section";
            const count = seen.get(id) || 0;
            seen.set(id, count + 1);
            if (count > 0) id = `${id}-${count + 1}`;
            return { id, text };
        })
        .filter((heading) => heading.text);
}
