import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PageClosing({ title = "Let's make it work for your business.", description = "Tell us what your team handles today. We'll map out a practical next step and a fixed quote.", label = "Book a free demo" }) {
    return <section className="sp-closing"><div className="sp-container"><div className="sp-closing-inner"><div><p className="sp-eyebrow">Your next step</p><h2>{title}</h2><p>{description}</p></div><Link href="/contact" className="sp-button">{label}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>;
}
