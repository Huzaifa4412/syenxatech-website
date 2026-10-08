import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import Reveal from "./Reveal";

const WORK = [
    { title: "Knitty Petit", category: "E-commerce store", image: "/website-portfolio/knittypetit.png", href: "https://www.knittypetit.shop/" },
    { title: "Aurora Beauty Salon", category: "Beauty & wellness", image: "/website-portfolio/aurora-beauty.png", href: "https://aurora-beauty-lab.vercel.app/" },
    { title: "Home Services", category: "Home services", image: "/website-portfolio/home-services1.png", href: "https://home-service-site.vercel.app/" },
    { title: "Pane Di Dio", category: "Bakery", image: "/website-portfolio/pane-di-dio.png", href: "https://pane-di-dio-website.vercel.app/" },
    { title: "Nature Tech", category: "Industry & energy", image: "/website-portfolio/naturetech.png", href: "https://naturetech-website.vercel.app/" },
    { title: "Neon Craft", category: "Custom products", image: "/website-portfolio/neon-craft.png", href: "https://website-codex-ivory.vercel.app/" },
];

export default function WorkRail() {
    return (
        <section id="work" aria-labelledby="work-heading" className="hp-section hp-work">
            <div className="hp-container">
                <Reveal className="hp-section-heading">
                    <p className="hp-eyebrow">A few things we've built</p>
                    <h2 id="work-heading">Different businesses.<br /><span>Distinctive websites.</span></h2>
                    <p>Thoughtful design, useful details and a clear next step. Explore our website portfolio.</p>
                </Reveal>
                <div className="hp-work-grid">
                    {WORK.map((item, index) => (
                        <Reveal key={item.href} as="article" className={`hp-work-item hp-work-item-${index + 1}`} delay={(index % 2) * 0.07} amount={0.1}>
                            <div className="hp-work-image">
                                <ProjectScreenshot src={item.image} title={item.title} alt={`${item.title} website built by Syenxa Tech`}
                                    sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1328px) 45vw, 590px" />
                            </div>
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="hp-work-link hp-work-caption" aria-label={`${item.title}, opens the website in a new tab`}>
                                <div><h3>{item.title}</h3><p>{item.category}</p></div><ArrowUpRight size={20} />
                            </a>
                        </Reveal>
                    ))}
                </div>
                <Link href="/website-development" className="hp-text-link hp-work-all">Explore website development <ArrowUpRight size={18} /></Link>
            </div>
        </section>
    );
}
