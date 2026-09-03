// Public Sanity configuration. These values are safe to expose to the browser.
// Override them with NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local.
export const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4dnd98c5";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Hard-coded API date. Bump deliberately when adopting new API behaviour.
export const apiVersion = "2026-09-03";
