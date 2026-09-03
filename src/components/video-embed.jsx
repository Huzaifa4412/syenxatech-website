import { parseVideoUrl } from "@/lib/video";

/**
 * Renders a YouTube / Vimeo iframe or a hosted video file inside a
 * rounded 16:9 frame. Works as a server component.
 */
export default function VideoEmbed({
    url,
    caption,
    posterUrl,
    title = "Video",
    className = "",
    priority = false,
}) {
    const video = parseVideoUrl(url);
    if (!video) return null;

    return (
        <figure className={`not-prose ${className}`}>
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-900/10 shadow-xl shadow-zinc-900/[0.06]">
                {video.type === "file" ? (
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={video.src}
                        poster={posterUrl || undefined}
                        controls
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={video.src}
                        title={caption || title}
                        loading={priority ? "eager" : "lazy"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                )}
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-zinc-500">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
