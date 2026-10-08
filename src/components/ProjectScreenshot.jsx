"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { projectScreenshotDimensions } from "@/lib/project-screenshots";
import "./project-screenshot.css";

export default function ProjectScreenshot({ src, title, alt, sizes }) {
    const headingId = useId();
    const dialogRef = useRef(null);
    const canvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [imageState, setImageState] = useState("loading");
    const dimensions = projectScreenshotDimensions[src];
    const ZoomIcon = zoomed ? ZoomOut : ZoomIn;

    const openPreview = () => {
        setImageState("loading");
        setOpen(true);
        dialogRef.current.showModal();
    };
    const resetPreview = () => {
        setOpen(false);
        setZoomed(false);
        canvasRef.current?.scrollTo(0, 0);
    };
    const toggleZoom = () => {
        setZoomed((value) => !value);
        canvasRef.current?.scrollTo(0, 0);
    };

    return (
        <>
            <button type="button" className="project-screenshot-trigger" onClick={openPreview}
                aria-label={`Enlarge ${title} website screenshot`} aria-haspopup="dialog">
                <Image src={src} alt={alt} {...dimensions} sizes={sizes} className="project-screenshot-image" />
                <span className="project-screenshot-hint" aria-hidden="true"><Maximize2 size={14} />View larger</span>
            </button>
            <dialog ref={dialogRef} className="project-preview-dialog" aria-labelledby={headingId}
                onClose={resetPreview} onClick={(event) => {
                    if (event.target === dialogRef.current) dialogRef.current.close();
                }}>
                <div className="project-preview-toolbar">
                    <h3 id={headingId}>{title}</h3>
                    <button type="button" onClick={toggleZoom} aria-pressed={zoomed} className="project-preview-zoom">
                        <ZoomIcon size={18} aria-hidden="true" />{zoomed ? "Fit image" : "Zoom in"}
                    </button>
                    <button type="button" autoFocus aria-label="Close screenshot preview" onClick={() => dialogRef.current.close()}>
                        <X size={22} aria-hidden="true" />
                    </button>
                </div>
                <div ref={canvasRef} className={`project-preview-canvas${zoomed ? " is-zoomed" : ""}`} tabIndex={0}
                    aria-label={zoomed ? "Enlarged screenshot. Scroll to explore the image." : "Full website screenshot"}>
                    {open && imageState !== "ready" && <p className="project-preview-status" role="status">
                        {imageState === "error" ? <a href={src} target="_blank" rel="noopener noreferrer">Open the original screenshot</a> : "Loading screenshot…"}
                    </p>}
                    {open && <Image src={src} alt={alt} {...dimensions} sizes={`${dimensions.width}px`} quality={90}
                        onLoad={() => setImageState("ready")} onError={() => setImageState("error")}
                        className="project-preview-full" style={{ "--project-image-width": `${dimensions.width}px` }} />}
                </div>
            </dialog>
        </>
    );
}
