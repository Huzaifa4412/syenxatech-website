import Image from "next/image";
import { ScoreRings } from "./Charts";

/** Browser window frame around a screenshot, with Lighthouse-style score rings. */
export function BrowserMockup({ src, alt, url = "yourbusiness.com", priority = false }) {
    return (
        <figure aria-label={alt} className="relative w-full max-w-[560px] mx-auto">
            <div aria-hidden className="absolute -inset-6 bg-[#ff541f]/10 rounded-[3rem] blur-3xl pointer-events-none" />
            <div className="relative rounded-[1.6rem] bg-zinc-900/[0.05] ring-1 ring-zinc-900/[0.06] p-1.5">
                <div className="rounded-[calc(1.6rem-0.375rem)] bg-white shadow-[0_30px_70px_-25px_rgba(24,24,27,0.35)] overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-900/5 bg-zinc-50">
                        <span className="flex gap-1.5" aria-hidden>
                            <span className="size-2.5 rounded-full bg-zinc-300" />
                            <span className="size-2.5 rounded-full bg-zinc-300" />
                            <span className="size-2.5 rounded-full bg-zinc-300" />
                        </span>
                        <span className="flex-1 text-center text-[11px] font-mono text-zinc-500 bg-white rounded-md py-1 border border-zinc-900/5">
                            https://{url}
                        </span>
                    </div>
                    <div className="relative aspect-[16/10] bg-zinc-100">
                        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 560px" className="object-cover object-top" />
                    </div>
                </div>
            </div>
            <div className="relative -mt-8 mx-6 rounded-2xl bg-white border border-zinc-900/10 shadow-xl shadow-zinc-900/10 px-4 pt-3 pb-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 text-center mb-1">Target Lighthouse scores, every build</p>
                <ScoreRings />
            </div>
            <figcaption className="sr-only">{alt}, shown in a browser window with target Lighthouse scores of 98 performance, 100 SEO, 96 accessibility and 100 best practices.</figcaption>
        </figure>
    );
}

/** Laptop and phone frames showing two screenshots side by side. */
export function DeviceShowcase({ desktop, mobile }) {
    return (
        <figure aria-label="Responsive website shown on a laptop and a phone" className="relative w-full pb-6">
            <div aria-hidden className="absolute -inset-6 bg-[#ff541f]/10 rounded-[3rem] blur-3xl pointer-events-none" />
            <div className="relative pr-[18%]">
                <div className="rounded-t-2xl bg-zinc-900 p-2 pb-0 shadow-[0_30px_70px_-25px_rgba(24,24,27,0.4)]">
                    <div className="relative aspect-[16/10] rounded-t-lg overflow-hidden bg-zinc-100">
                        <Image src={desktop.src} alt={desktop.alt} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover object-top" />
                    </div>
                </div>
                <div aria-hidden className="h-3 bg-zinc-800 rounded-b-xl" />
                <div aria-hidden className="mx-auto h-2 w-[40%] bg-zinc-700 rounded-b-2xl" />
            </div>
            <div className="absolute right-0 bottom-0 w-[26%] max-w-[190px] z-10">
                <div className="rounded-[1.6rem] bg-zinc-900 p-1.5 shadow-2xl shadow-zinc-900/40 ring-1 ring-white/10">
                    <div className="relative aspect-[9/19] rounded-[1.25rem] overflow-hidden bg-zinc-100">
                        <Image src={mobile.src} alt={mobile.alt} fill sizes="190px" className="object-cover object-top" />
                    </div>
                </div>
            </div>
            <figcaption className="sr-only">
                {desktop.alt}; {mobile.alt}. Every site is designed mobile-first and tested on real devices before launch.
            </figcaption>
        </figure>
    );
}
