"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const VIDEO_ID = "sqfogWpfa8M";

/**
 * Click-to-load facade: the YouTube player (and its ~1 MB of script) is only
 * requested when the visitor presses play, instead of on every page view.
 */
export default function DemoVideo() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="hp-demo-video relative aspect-video overflow-hidden rounded-3xl bg-zinc-200 ring-1 ring-zinc-900/10">
            {loaded ? (
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="Syenxa Tech AI calling agent demo video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    aria-label="Play the Syenxa Tech AI calling agent demo video"
                    className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#ff541f]"
                >
                    <Image
                        src="/video-thumbnail.jpeg"
                        alt=""
                        fill
                        sizes="(max-width: 1280px) 100vw, 1200px"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"
                    />
                    <span className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 flex items-center gap-4 text-left">
                        <span className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-white text-zinc-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-active:scale-95">
                            <Play className="size-6 sm:size-7 translate-x-0.5 fill-current" strokeWidth={0} />
                        </span>
                        <span className="text-white">
                            <span className="block text-lg sm:text-2xl font-semibold tracking-tight">
                                Watch the call walkthrough
                            </span>
                            <span className="block text-sm text-white/80">
                                A real look at the calling-agent experience
                            </span>
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}
