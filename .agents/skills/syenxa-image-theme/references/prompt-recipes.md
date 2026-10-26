# Syenxa prompt recipes

Use these as adaptable starting points. Replace bracketed scene and crop choices with the actual brief before sending a prompt. Keep the subject-specific action and the shared art direction in the same prompt.

## Shared style block

> Premium warm editorial photography for Syenxa Tech. Warm ivory and cream architecture, pale oak and porous travertine, restrained burnt-orange or amber focal accent, subtle charcoal details. Believable directional window sunlight, soft architectural shadows, tactile matte and translucent materials, natural color and realistic depth. Calm balanced asymmetry with generous breathing room and one clear subject. No readable text, logos, watermark, website layout, robots, neon, circuitry or blue/purple technology gradients.

Avoid asking for every listed material in every scene. A subject that naturally uses wood can remain primarily wood; the common thread is the warm light, restraint and tactile realism.

## Business niche photography

> Use case: photorealistic-natural. Asset type: standalone website industry photo, landscape 3:2. [Recognizable business environment] with [staff/customer action] and [two or three identifying objects]. Candid working moment, realistic people, faces and hands, professional but welcoming atmosphere. [Camera position distinct from existing niche images]. Primary people and identifying objects inside the central 70 percent, suitable for near-square desktop and wider mobile cropping. [Shared style block].

Choose actions that reveal the niche:

| Subject | Scene ingredients |
| --- | --- |
| Clinic | Patient check-in, receptionist in scrubs, clean chairs and softly visible clinical corridor. |
| Real estate | Agent consulting a couple with a house model, floor plan and keys; neighborhood outside window. |
| Gym | Member check-in with gym bag, fitness staff, recognizable weights and benches behind them. |
| Salon | Stylist attending to a seated client, mirrors, tan chairs and neatly arranged hair tools. |
| New niche example: restaurant | Host welcoming guests beside a reservation book with no readable text, warm wood counter and dining tables beyond. This is a future recipe, not an existing generated asset. |

The exact original four niche prompts are in `original-prompts/industry-image-prompts.json`.

## Calling service still-life (reconstructed recipe)

> Use case: photorealistic-natural. A sculptural burnt-orange telephone handset resting on a pale porous travertine slab in front of a textured ivory plaster wall. Close three-quarter view, handset clearly readable and physically plausible, restrained cord placement, warm window sunlight and soft plant shadows. The phone is the clear focal object, with enough room around it for a service-card crop. Landscape 3:2. [Shared style block].

Reference: `images/home-voice-service-v1.webp`. This recipe is derived from the saved image, not the original generation prompt.

## Chat service still-life (reconstructed recipe)

> Use case: stylized-concept. A large rounded translucent amber-orange glass speech bubble alongside one smaller opaque ivory ceramic speech bubble on a pale travertine ledge. Clear silhouettes, gentle refraction, believable surface contact and warm directional light against an ivory plaster wall. Minimal elegant gallery still-life, landscape 3:2, both key forms safely within the intended card crop. [Shared style block].

Reference: `images/home-chat-service-v1.webp`. For blog chat covers, use the original saved blog recipe with three small conversation dots inside the orange bubble.

## Abstract hero background (reconstructed recipe)

> Use case: stylized-concept. Wide editorial hero backdrop of sculptural flowing ribbons, alternating translucent amber-orange glass and softly textured ivory stone or ceramic. Forms rise and grow toward the right edge, leaving the left 45 percent as quiet warm ivory negative space for HTML headline copy. Gentle sunlight, refined refraction and soft long shadows on a cream surface. Physical materials and elegant architectural composition, landscape 16:9. [Shared style block].

Reference: `images/voice-hero-wave-v1.webp`. Reverse the layout only when the target page puts its copy on the right. Do not place generated text inside the negative space.

## About / company studio

Use the exact About prompt in `original-prompts/about-studio-asset.md` for the established laptop/phone/oak composition. For an adjacent scene, retain the cream papers, sunlight and material palette while changing the camera position or purposeful props. Treat it as a conceptual studio still-life; never present it as a photo of the company's actual office.

For an empty company workspace, use the original company recipe in `original-prompts/blog-covers-prompts.md`.

## Blog cover selection

Read the corresponding original recipe in `original-prompts/blog-covers-prompts.md`:

- Voice: charcoal headphones + orange ceramic waveform bars.
- Website development: laptop + abstract cream/terracotta screen + notebook.
- Automation: connected cream forms + glass speech bubbles.
- Chatbots: two glass/ceramic bubbles + three conversation dots.
- Company: empty oak studio + terracotta chair + orange lamp.

Use a distinct composition for a new article rather than repeatedly republishing one image. Match the article's actual subject; keep the essential metaphor inside the central 80 percent for responsive covers. Exact article titles belong in HTML.

## Style-reference instruction for edits or reference-aware generation

> Use the attached Syenxa image only as an art-direction reference for warm ivory, restrained orange accents, directional daylight, natural materials and editorial realism. Create [new subject and scene]. Preserve the visual family while changing the subject and composition to suit [placement]. Do not copy the original room, people or props unless the user asked for a variation of that exact scene.

## Example future invocation

User request: `Use $syenxa-image-theme to generate a restaurant image for the industry section.`

Expected choice: a recognizable restaurant host/guest scene, distinct from clinics and salons, using warm wood/ivory and daylight. Inspect the reception and one industry reference, then generate an image from the restaurant recipe. Do not add a phone just to force the brand accent, generate a page mockup, or depict a real named client without supplied evidence.
