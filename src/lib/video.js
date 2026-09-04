/**
 * Turn a pasted video URL into something we can render.
 * Supports YouTube, Vimeo, and directly hosted .mp4 / .webm / .mov files.
 */
export function parseVideoUrl(url) {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();

    if (/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(trimmed)) {
        return { type: "file", src: trimmed };
    }

    let parsed;
    try {
        parsed = new URL(trimmed, "https://www.syenxatech.com");
    } catch {
        return null;
    }
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
        const id = parsed.pathname.slice(1).split("/")[0];
        return id ? youtube(id) : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
        const v = parsed.searchParams.get("v");
        if (v) return youtube(v);
        const match = parsed.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
        return match ? youtube(match[2]) : null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
        const match = parsed.pathname.match(/(\d+)/);
        return match
            ? {
                  type: "iframe",
                  provider: "vimeo",
                  src: `https://player.vimeo.com/video/${match[1]}?dnt=1&title=0&byline=0&portrait=0`,
              }
            : null;
    }
    return null;
}

function youtube(id) {
    return {
        type: "iframe",
        provider: "youtube",
        src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
    };
}
