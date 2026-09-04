"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires a PageView on client-side route changes only. The initial PageView
 * is sent by the inline pixel bootstrap in the root layout, so the first
 * render is skipped to avoid double counting.
 */
export default function FacebookPixel() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "PageView");
        }
    }, [pathname]);

    return null;
}
