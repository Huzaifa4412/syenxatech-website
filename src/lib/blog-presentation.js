const voiceCover = {
    src: "/images/blog/voice-ai-v1.webp",
    alt: "Charcoal headphones beside a sculptural orange voice waveform",
};
const websiteCover = {
    src: "/images/blog/website-design-v1.webp",
    alt: "Laptop displaying a website on a sunlit creative studio desk",
};
const automationCover = {
    src: "/images/blog/automation-v1.webp",
    alt: "Glass conversation bubbles and connected ceramic blocks representing automated workflows",
};

export function getBlogCategory(post) {
    if (post.category) return post.category;
    const topic = `${post.title || ""} ${(post.keywords || []).join(" ")}`;
    if (/call|voice|answering/i.test(topic)) return "AI Calling Agents";
    if (/chatbot|chat automation/i.test(topic)) return "AI Chatbots";
    if (/website|web design|web development/i.test(topic)) return "Website Development";
    if (/automation|workflow/i.test(topic)) return "AI Automation";
    if (/marketing|seo/i.test(topic)) return "Digital Marketing";
    return "Company";
}

// CMS images take priority. These editorial covers replace the text-only
// legacy thumbnails on the index without changing the articles themselves.
export function getBlogCover(post) {
    if (post.coverImage?.src && !post.coverImage.src.startsWith("/covers/")) {
        return post.coverImage;
    }
    const category = getBlogCategory(post);
    if (category === "AI Calling Agents") return voiceCover;
    if (category === "Website Development") return websiteCover;
    if (category === "AI Chatbots") return {
        src: "/images/blog/chatbots-v1.webp",
        alt: "Orange glass and cream ceramic speech bubbles on a stone pedestal",
    };
    if (category === "Company") return {
        src: "/images/blog/studio-v1.webp",
        alt: "Sunlit creative studio with laptops, an oak table and terracotta furniture",
    };
    return automationCover;
}
