# Digital marketing page visuals

## Delivery walkthrough and original work

The page leads with a four-stage interactive delivery desk: Discover, Plan, Create, Improve. Audit, strategy and review sheets are clearly identified as process illustrations. The Create stage and the portfolio use the existing original Knitty Petit and Nature Tech screenshots without altering the images. These show website design and development craft; no SEO performance, revenue uplift or client testimonial is inferred from them.

`scripts/build-marketing-sample.py` creates the two-page public sample plan and renders both pages for visual and text-bounds verification. The preview image is rendered from the actual PDF, not a decorative document mockup. Public assets: `public/downloads/syenxa-sample-marketing-action-plan.pdf` and `public/images/marketing/sample-action-plan-preview.webp`. The plan is labelled an example engagement and includes priorities, ownership, review points and an illustrative 90-day sequence. It contains no projected traffic or fabricated client results.

The report gallery uses original, unmodified screenshots from [Semrush's Organic Rankings Overview documentation](https://www.semrush.com/kb/890-Organic-Rankings-Overview). They explain the product; they are historical educational examples, not Syenxa Tech or client performance, current rankings, or promised outcomes. Source URLs, dimensions and context are recorded in `src/lib/marketing-report-examples.js`. No charts or statistics were fabricated. Local PNG originals keep the numbers readable when enlarged.

- Keyword screenshot: 2244 × 784, documentation upload April 20, 2023.
- Traffic and ranking-band screenshots: 2244 × 902, chart dates November 2022–April 2023.
- Downloaded October 10, 2026. The on-page source link provides attribution; SEMrush is not presented as a partner or endorsement.

## Hero artwork

Conceptual artwork, not evidence of an office or client results. Generated with the built-in image-generation tool using the Syenxa image-theme skill. Source master: `C:/Users/HUZAIFA/.codex/generated_images/01a126bf-9e50-7d91-aada-ed042ed34cbc/exec-a9cd3c7a-2ad6-45be-8939-1aafaf215188.png`. Project export: `public/images/marketing/search-discovery-v1.webp`, 1440 × 960, WebP quality 85. Reference: `C:/Users/HUZAIFA/.codex/skills/syenxa-image-theme/references/images/blog/website-design-v1.webp`.

Exact generation prompt:

> Use case: stylized-concept. Create one standalone editorial website image, landscape 3:2, for a digital marketing and SEO service hero. Main subject: a beautifully crafted brushed silver magnifying glass leaning diagonally across three ascending ivory travertine blocks, with one translucent amber-orange glass block integrated in the ascending arrangement. The magnifier has physically plausible clear glass lens and charcoal handle. This is a tactile metaphor for finding search opportunities and building visibility, not a data chart. Pale oak surface, textured warm ivory plaster backdrop, warm directional window sunlight from upper left with soft architectural shadows. Strong asymmetrical arrangement, close three-quarter camera view. Main subject within central 75 percent to crop on mobile. Premium tangible editorial photography, refined materials, realistic refraction, generous breathing room, ivory dominates, restrained burnt-orange accent, subtle charcoal detail. Match the supplied reference ONLY in art direction, lighting and material palette; change the subject completely. No laptop, no text, no numbers, no logos, no watermark, no website UI, no circuitry, no robots, no blue or purple, no neon, no glossy plastic CGI.
