/**
 * Homepage demo video. Responsive 16:9 wrapper (the previous fixed 900x600
 * iframe overflowed on mobile), lazy-loaded, and served from the privacy-
 * enhanced YouTube domain so it does not add third-party cookies to the LCP path.
 */
const HeroDialog = () => {
    return (
        <section
            aria-labelledby="demo-video-heading"
            className="w-full max-w-5xl mx-auto px-6 py-12"
        >
            <h2 id="demo-video-heading" className="sr-only">
                Watch a Syenxa Tech AI calling agent demo
            </h2>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-900/10 bg-zinc-900 shadow-xl shadow-zinc-900/10">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/sqfogWpfa8M?rel=0&modestbranding=1"
                    title="Syenxa Tech AI calling agent demo video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
        </section>
    );
};

export default HeroDialog;
