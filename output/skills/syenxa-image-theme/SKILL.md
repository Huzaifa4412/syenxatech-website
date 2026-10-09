---
name: syenxa-image-theme
description: Generate or edit images for Syenxa Tech, or when the user requests the same warm ivory, orange and sunlit editorial theme as its website. Use for hero artwork, service illustrations, niche photos and blog covers; retain the requested subject and format.
---

# Syenxa Image Theme

Create new subjects that belong beside the saved Syenxa website images. The visual identity is warm, welcoming and tangible: ivory plaster, pale oak, travertine, charcoal details and a restrained orange focal accent in directional daylight. The result should feel like carefully composed editorial photography.

## Choose the visual family

Read [references/visual-library.md](references/visual-library.md), then inspect the closest bundled image with the available image viewer before writing the prompt. Paths are relative to this skill, so the references work outside the original repository.

- **Business / industry photography:** believable people, a recognizable niche and a candid working moment. Use a different setting, action, objects and camera angle for each niche. Preserve the shared lighting and palette; never reuse the same generic reception for every business.
- **Service / editorial still-life:** one clear idea expressed through tangible objects. Orange phone for calling, glass and ceramic speech bubbles for chat, laptop and layout sketches for websites, connected physical forms for automation. Vary the metaphor when the subject changes.
- **Abstract hero backdrop:** orange translucent glass and cream stone/ceramic forms; keep the copy side quiet and let the sculpture grow toward the opposite edge. Use the voice-wave reference for this family.

Use [references/prompt-recipes.md](references/prompt-recipes.md) for new prompts, and the saved source prompts under `references/original-prompts/` when revisiting an existing asset. Recipes reconstructed from visual references are labelled; do not call them original generation prompts.

## Theme anchors

- Light warm ivory and cream should dominate. Supporting materials: pale oak, porous travertine, ivory plaster, matte ceramic, brushed silver and charcoal. Amber-orange glass and a burnt-orange phone are established motifs, not requirements for every scene.
- Use believable window sunlight, warm highlights, directional shadows and tactile surfaces. Keep whites readable and skin tones natural. Avoid a heavy yellow filter or orange tint across the whole photograph.
- Prefer balanced asymmetry, a clear silhouette and generous breathing room. A few purposeful props should explain the subject. Avoid clutter, decorative objects with no role and repeated stock-photo compositions.
- Use high realism for people and architecture. Sculptural concepts may be impossible in arrangement, but their glass, stone, reflections and shadows should feel physically credible.
- Avoid neon, blue/purple technology gradients, circuitry wallpaper, robots, holograms, glossy plastic CGI and excessive lens flare unless the user explicitly changes the direction.
- Generate clean image assets. Keep website UI, headings, labels, prices, logos and watermarks out of the image unless requested. Add real text in the website rather than baking it into a raster. DM Sans is the surrounding site font, not an instruction to generate lettering.

The current site palette, verified from homepage/interior CSS, is paper `#faf9f7`, ink `#292824`, muted `#6d665d`, burnt orange `#bd4119`, line `#ded8ce`, with brighter brand orange `#ff541f` in global branding. These are palette cues for photography, not exact pixel requirements.

## Prompt and generation workflow

1. Identify the requested subject, placement, crop and whether this is a new asset or edit. Infer ordinary choices from the target section; ask only when a missing detail changes the result materially.
2. Select the closest visual family and inspect one or two relevant references. For a new niche, keep its distinctive business action; an orange accent alone does not make a generic office photograph useful.
3. Combine a concrete scene with the shared style block in the recipes. State aspect ratio, camera position, subject placement and any space needed for HTML copy. Industry photos and blog covers commonly use 3:2; backgrounds may need 16:9 or a wider crop. Do not force every placement into the same ratio.
4. Use the available built-in image generation/editing tool and its imagegen skill when available. Do not merely return a prompt if the user asked to generate an image. Follow the tool's reference-image rules: use bundled images as visual style references when supported and clarify that only their art direction should transfer, not the old subject. A text-only request for prompts or this skill does not authorize an extra image generation run.
5. Inspect the result against the reference and target crop. Check palette, lighting, subject legibility, hands/faces, material realism, object geometry and unexpected text. For responsive photos, keep the essential action inside the central 70-80% and test the intended desktop/mobile crops. A wide hero with copy has a different placement requirement.
6. Save the generated master and the exact final prompt. When integrating in the Syenxa Next.js repo, export a suitable WebP under `public/images/` using a descriptive versioned filename; preserve originals and record dimensions/tool/reference paths in the output notes. Optimize rather than upscale small images. Typical saved WebPs use quality 82-85, adjusted for detail and visual quality. Do not overwrite an existing approved asset silently.

## Truth and scope

Generated company scenes are conceptual studio images, not evidence of actual staff, offices, clients or facilities. Use honest alt text and captions where appropriate. Real portfolio screenshots, product identity, logos and named people should come from their actual supplied assets; do not regenerate them as proof of work. This skill authorizes neither publication nor changes to unrelated pages. The user's explicit visual direction takes precedence over these defaults.
