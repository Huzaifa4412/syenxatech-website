import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCaseServices } from "@/lib/use-cases-data";
import UseCaseVisual from "./use-case-visual";

export default function UseCaseTile({ data }) {
    const service = useCaseServices.find(item => item.id === data.service);
    return <article className="uc-card"><Link href={`/use-cases/${data.slug}`}>
        <div className="uc-card-image"><Image src={data.image} alt={data.imageAlt} fill sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw" /><span className="uc-card-category">{service.name}</span><span className="uc-card-arrow"><ArrowUpRight size={21} /></span></div>
        <div className="uc-card-copy"><p className="uc-eyebrow">{data.industry}</p><h3>{data.title} <span>{data.accent}</span></h3><p className="uc-card-summary">{data.summary}</p><UseCaseVisual data={data} compact /><span className="uc-card-link">Explore this use case <ArrowRight size={15} /></span></div>
    </Link></article>;
}
