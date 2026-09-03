const WORDS_PER_MINUTE = 220;

/** Minutes to read, from a word count. Always at least 1. */
export function minutesFromWords(wordCount = 0) {
    const words = Number(wordCount) || 0;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatPostDate(value, options = {}) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...options,
    });
}
