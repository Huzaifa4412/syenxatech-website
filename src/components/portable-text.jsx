import Image from "next/image";
import Link from "next/link";
import { PortableText as PortableTextRenderer } from "@portabletext/react";
import { ArrowRight, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { blockToPlainText, slugifyHeading } from "@/lib/portable-text-utils";
import VideoEmbed from "@/components/video-embed";

/*
 * Renders Sanity rich text. Text styling lives in the `.article-body` rules
 * in globals.css so Sanity posts and legacy posts share one typographic
 * system; custom blocks (video, gallery, callout, figures, CTA) carry their
 * own Tailwind classes and opt out of those rules with `not-prose`.
 */

/* ---------- headings with anchor ids for the table of contents ---------- */
const headingIds = new WeakMap();
function headingId(value) {
    if (!value) return undefined;
    if (headingIds.has(value)) return headingIds.get(value);
    const id = slugifyHeading(blockToPlainText(value)) || undefined;
    headingIds.set(value, id);
    return id;
}

/* ---------- media ---------- */
function PortableImage({ value }) {
    if (!value?.asset) return null;
    const width = 1200;
    const height = 675;
    return (
        <figure>
            <Image
                src={urlFor(value).width(width).height(height).fit("crop").url()}
                alt={value.alt || ""}
                width={width}
                height={height}
                sizes="(max-width: 896px) 100vw, 800px"
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
    );
}

function PortableVideo({ value }) {
    const posterUrl = value?.poster?.asset
        ? urlFor(value.poster).width(1280).height(720).fit("crop").url()
        : undefined;
    return (
        <VideoEmbed
            url={value?.url}
            caption={value?.caption}
            posterUrl={posterUrl}
            className="my-10"
        />
    );
}

function PortableGallery({ value }) {
    const images = (value?.images || []).filter((img) => img?.asset);
    if (!images.length) return null;
    const cols = value.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
    return (
        <figure className="not-prose my-10">
            <div className={`grid grid-cols-1 ${cols} gap-4`}>
                {images.map((img) => (
                    <figure key={img._key} className="m-0">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-900/10 bg-zinc-100">
                            <Image
                                src={urlFor(img).width(900).height(675).fit("crop").url()}
                                alt={img.alt || ""}
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover"
                            />
                        </div>
                        {img.caption && (
                            <figcaption className="mt-2 text-xs text-zinc-500">
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>
            {value.caption && (
                <figcaption className="mt-3 text-center text-sm text-zinc-500">
                    {value.caption}
                </figcaption>
            )}
        </figure>
    );
}

/* ---------- editorial blocks ---------- */
const calloutTones = {
    note: {
        icon: Info,
        wrap: "bg-white border-zinc-900/10",
        icon_wrap: "bg-zinc-900 text-white",
        label: "Note",
    },
    tip: {
        icon: Lightbulb,
        wrap: "bg-[#ff541f]/[0.06] border-[#ff541f]/20",
        icon_wrap: "bg-[#ff541f] text-white",
        label: "Tip",
    },
    warning: {
        icon: TriangleAlert,
        wrap: "bg-amber-50 border-amber-500/30",
        icon_wrap: "bg-amber-500 text-white",
        label: "Heads up",
    },
};

function Callout({ value }) {
    const tone = calloutTones[value?.tone] || calloutTones.note;
    const Icon = tone.icon;
    return (
        <aside
            className={`not-prose my-10 flex gap-4 rounded-2xl border p-5 md:p-6 ${tone.wrap}`}
        >
            <span
                className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${tone.icon_wrap}`}
            >
                <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
                <p className="font-geometric text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {value?.title || tone.label}
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-zinc-800">{value?.body}</p>
            </div>
        </aside>
    );
}

function StatGroup({ value }) {
    const stats = (value?.stats || []).filter((s) => s?.value && s?.label);
    if (!stats.length) return null;
    const cols =
        stats.length >= 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
    return (
        <section className="not-prose my-10 rounded-3xl bg-zinc-900 text-white p-7 md:p-9">
            {value.title && (
                <p className="font-geometric text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff541f]">
                    {value.title}
                </p>
            )}
            <dl className={`grid grid-cols-2 ${cols} gap-y-8 ${value.title ? "mt-6" : ""}`}>
                {stats.map((stat, idx) => (
                    <div
                        key={stat._key || idx}
                        className={`flex flex-col gap-1.5 md:px-6 ${idx > 0 ? "md:border-l md:border-white/10" : "md:pl-0"}`}
                    >
                        <dd
                            className={`order-1 font-display font-bold tracking-tighter tabular-nums whitespace-nowrap ${
                                String(stat.value).length > 5
                                    ? "text-3xl md:text-4xl"
                                    : "text-4xl md:text-5xl"
                            }`}
                        >
                            {stat.value}
                        </dd>
                        <dt className="order-2 text-sm text-zinc-400 leading-snug">{stat.label}</dt>
                    </div>
                ))}
            </dl>
        </section>
    );
}

function CtaBlock({ value }) {
    if (!value?.heading) return null;
    const href = value.buttonHref || "/contact";
    const internal = href.startsWith("/");
    const button = (
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff541f] text-white text-sm font-bold hover:bg-zinc-900 transition-colors duration-300">
            {value.buttonLabel || "Talk to us"}
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </span>
    );
    return (
        <aside className="not-prose my-12 relative overflow-hidden rounded-3xl border border-[#ff541f]/20 bg-[#ff541f]/[0.06] p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6">
            <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#ff541f]/15 blur-[80px] pointer-events-none" />
            <div className="relative flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 text-balance">
                    {value.heading}
                </h3>
                {value.text && (
                    <p className="mt-2 text-zinc-600 leading-relaxed max-w-[52ch]">{value.text}</p>
                )}
            </div>
            <div className="relative shrink-0">
                {internal ? <Link href={href}>{button}</Link> : <a href={href}>{button}</a>}
            </div>
        </aside>
    );
}

/* ---------- inline ---------- */
function PortableLink({ children, value }) {
    const href = value?.href || "#";
    if (href.startsWith("/")) {
        return <Link href={href}>{children}</Link>;
    }
    return (
        <a
            href={href}
            target={value?.blank ? "_blank" : undefined}
            rel={value?.blank ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    );
}

export const portableTextComponents = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
        h2: ({ children, value }) => <h2 id={headingId(value)}>{children}</h2>,
        h3: ({ children, value }) => <h3 id={headingId(value)}>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul>{children}</ul>,
        number: ({ children }) => <ol>{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        code: ({ children }) => <code>{children}</code>,
        link: PortableLink,
    },
    types: {
        image: PortableImage,
        videoEmbed: PortableVideo,
        imageGallery: PortableGallery,
        callout: Callout,
        statGroup: StatGroup,
        ctaBlock: CtaBlock,
    },
};

export default function PortableText({ value }) {
    if (!Array.isArray(value) || value.length === 0) return null;
    return <PortableTextRenderer value={value} components={portableTextComponents} />;
}
