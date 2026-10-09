# Live site technical and on-page SEO audit — https://www.syenxatech.com (as served 2026-10-08, ~17:02–17:18 UTC)

Method note (applies to every section): all facts below were measured directly against the live production site with `curl` (raw HTML, headers, status codes), a local HTML parser, headless/desktop Chrome 155 (DevTools performance traces, Lighthouse 12.8.2 CLI and Lighthouse 13.4.1 via DevTools), and public search engines. Nothing was submitted, no chat or booking was started, and the local repository was not read. Where a source link is the live URL itself, the fact is a direct observation of that URL's response on 2026-10-08.

---

## 1. Redirects and canonicalisation

### Takeaway
The apex-to-www redirect is a **307 Temporary Redirect** (not 301/308), and every page's `rel=canonical`, `og:url`, JSON-LD `@id`, robots.txt `Host`/`Sitemap` and all sitemap `<loc>` values point at the **non-www apex**, which itself 307-redirects back to www. The site therefore tells crawlers the canonical is a URL that temporarily redirects to the page declaring it — a canonical/redirect contradiction against the intended www canonical host.

### Cited Findings
- `http://syenxatech.com/` → **308 Permanent Redirect**, `Location: https://syenxatech.com/` → **307 Temporary Redirect**, `Location: https://www.syenxatech.com/` → **200**. Two-hop chain (308 then 307). — [http://syenxatech.com/](http://syenxatech.com/)
- `https://syenxatech.com/` → **307 Temporary Redirect**, `Location: https://www.syenxatech.com/`, `Cache-Control: public, max-age=0, must-revalidate`, `Server: Vercel` → **200**. — [https://syenxatech.com/](https://syenxatech.com/)
- `http://www.syenxatech.com/` → **308 Permanent Redirect**, `Location: https://www.syenxatech.com/` → **200** (single hop). — [http://www.syenxatech.com/](http://www.syenxatech.com/)
- `https://www.syenxatech.com/` → **200 OK** directly, `Content-Type: text/html; charset=utf-8`, `Content-Length: 128886` (decoded), `X-Matched-Path: /`, `X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT`, `Age: 237971` (about 2.75 days). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The 200 page at www declares `<link rel="canonical" href="https://syenxatech.com">` (non-www, no trailing slash), `og:url = https://syenxatech.com`, and `<link rel="author" href="https://syenxatech.com">`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Every inner page checked does the same: canonical = `https://syenxatech.com/<path>` (non-www) on /about, /services, /ai-calling-agents, /ai-chatbots, /website-development, /digital-marketing, /blog, /use-cases, /contact, 4 use-case pages and 4 blog posts. Example: `https://syenxatech.com/ai-calling-agents`. — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Trailing slash is normalised with a permanent redirect: `https://www.syenxatech.com/services/` → **308** → `/services`. — [https://www.syenxatech.com/services/](https://www.syenxatech.com/services/)
- URLs are case-sensitive: `https://www.syenxatech.com/Services` → **404**; `/index.html` → **404**. — [https://www.syenxatech.com/Services](https://www.syenxatech.com/Services)
- No `hreflang` / `rel=alternate` links on any page checked. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

### Inferences
- The 307 response carries only Vercel platform headers (no Next.js headers), which suggests it is a domain-level redirect configured in the hosting dashboard (where the status is typically selectable between 307 and 308) rather than something in page code — unconfirmed. A 307 passes users correctly but signals "temporary", so the apex can stay in the index as a separate URL.
- Because canonical (non-www) and the serving host (www) disagree, and the non-www URL only temporarily redirects, search engines must pick the canonical themselves. Bing-sourced results (section 4) list **www** URLs, i.e. the engine has overridden the declared canonical.
- The fix has two halves that must ship together: make apex→www a 308/301, and switch canonical, `og:url`, JSON-LD `@id`/`url`, robots `Sitemap`, and sitemap `<loc>` to `https://www.syenxatech.com/...`.
- The home page `Age` of ~2.75 days plus sitemap `lastmod` of 2026-05-15 on every URL suggests the production deployment has not changed since about 2026-10-05 and that the SEO metadata live today is an older generation than the "canonical host is www" convention the business intends. This is worth confirming against the deployment history before planning fixes (some may already exist unreleased).

### Gaps
- Could not see the Vercel project settings, so whether the 307 is a domain setting or a `next.config` redirect is unconfirmed.
- Did not test every possible legacy URL for redirect chains; only the host variants, trailing slash, and case variants above.

---

## 2. robots.txt, sitemap.xml, llms.txt, pricing.md and page coverage

### Takeaway
robots.txt and the sitemap are reachable but both reference the non-www host; all 18 sitemap URLs return a 307 (not 200) on first request. `/privacy-policy`, `/terms-of-service` and `/pricing.md` are **404** on the live site; `/llms.txt` is served and, unlike everything else, uses www URLs.

### Cited Findings
- `robots.txt` → 200, `text/plain`, 133 bytes. Full content: `User-Agent: *` / `Allow: /` / `Disallow: /private/` / `Disallow: /api/` / `Host: https://syenxatech.com` / `Sitemap: https://syenxatech.com/sitemap.xml`. — [https://www.syenxatech.com/robots.txt](https://www.syenxatech.com/robots.txt)
- `sitemap.xml` → 200, `application/xml`, 3,138 bytes, **18 URLs**, every `<loc>` on `https://syenxatech.com/...` (non-www), every `<lastmod>` = `2026-05-15T00:00:00.000Z`. — [https://www.syenxatech.com/sitemap.xml](https://www.syenxatech.com/sitemap.xml)
- The 18 sitemap URLs: `/` (priority 1), `/about` (0.7), `/services` (0.9), `/ai-calling-agents` (0.9), `/ai-chatbots` (0.9), `/website-development` (0.8), `/digital-marketing` (0.8), `/use-cases` (0.8), `/blog` (0.7), `/contact` (0.6), 4 blog posts (0.65): `/blog/how-ai-calling-agents-are-transforming-sales`, `/blog/top-benefits-of-ai-chatbots`, `/blog/ai-automation-solutions-reduce-costs`, `/blog/syenxa-tech-leading-ai-solutions`, and 4 use cases (0.75): `/use-cases/doctor`, `/use-cases/real-estate`, `/use-cases/gym`, `/use-cases/beauty-salon`. — [https://www.syenxatech.com/sitemap.xml](https://www.syenxatech.com/sitemap.xml)
- All 18 sitemap `<loc>` URLs return **307** on first hop (to the www equivalent); none returns 200 directly. The www equivalents all return 200. — [https://syenxatech.com/ai-calling-agents](https://syenxatech.com/ai-calling-agents)
- None of the 18 pages is self-canonical in the strict sense: each 200 page (www) names the non-www URL as canonical. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Status of the pages named in the brief (www host): `/about` 200, `/services` 200, `/ai-calling-agents` 200, `/ai-chatbots` 200, `/website-development` 200, `/digital-marketing` 200, `/blog` 200, `/use-cases` 200, `/contact` 200 — all present in the sitemap. — [https://www.syenxatech.com/sitemap.xml](https://www.syenxatech.com/sitemap.xml)
- `/privacy-policy` → **404** (`X-Matched-Path: /404`). — [https://www.syenxatech.com/privacy-policy](https://www.syenxatech.com/privacy-policy)
- `/terms-of-service` → **404**. `/privacy`, `/terms`, `/pricing` also 404. — [https://www.syenxatech.com/terms-of-service](https://www.syenxatech.com/terms-of-service)
- Footer "Privacy Policy" and "Terms of Service" links exist on every page but are `href="#"` (dead). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- `/llms.txt` → 200, `text/plain; charset=utf-8`, 1,683 bytes. Lists 5 service links, 4 use-case links, contact and email, all on `https://www.syenxatech.com/...`. Describes the firm as "an AI Automation Agency specializing in custom AI Voice Calling Agents, omnichannel AI Chatbots, Next.js Web Development, and Digital Marketing Automation." — [https://www.syenxatech.com/llms.txt](https://www.syenxatech.com/llms.txt)
- `/pricing.md` → **404** (29,912-byte HTML 404 page). `/llms-full.txt` also 404. — [https://www.syenxatech.com/pricing.md](https://www.syenxatech.com/pricing.md)
- Also 404: `/favicon.ico`, `/manifest.json`, `/site.webmanifest`, `/feed.xml`, `/rss.xml`, `/.well-known/security.txt`. — [https://www.syenxatech.com/favicon.ico](https://www.syenxatech.com/favicon.ico)
- The 404 template returns a correct 404 status but emits two conflicting robots metas (`noindex` and `index, follow`) and `canonical = https://syenxatech.com`; title "Page Not Found | Syenxa Tech". — [https://www.syenxatech.com/privacy-policy](https://www.syenxatech.com/privacy-policy)
- The blog index links to exactly 4 posts ("4 articles · 8 topics"), matching the sitemap. `/blog` responded `X-Vercel-Cache: STALE`, `Age: 6456` (it is being revalidated periodically), while other pages were `HIT` with ages of 1.2–2.75 days. — [https://www.syenxatech.com/blog](https://www.syenxatech.com/blog)

### Inferences
- A sitemap in which 100% of URLs redirect is treated by Search Console as "Page with redirect" for every entry; combined with the 307 this weakens the sitemap as a canonical signal.
- `Host:` is a legacy Yandex-only directive; harmless but it also names the wrong host.
- `Disallow: /private/` and `/api/` block paths that return 404 anyway.
- llms.txt (www) disagrees with canonical/sitemap (non-www); three different host signals are being sent to machines.
- No legal pages on a site running Meta Pixel and a lead form is a trust and ad-policy gap as well as an SEO one (Meta and Google Ads landing-page policies expect a reachable privacy policy).

### Gaps
- Did not crawl for orphan pages beyond the sitemap and the internal links found on the pages fetched; there may be routes that exist but are linked nowhere.
- Search Console coverage data is not available to an outside auditor.

---

## 3. Home page HTML: metadata, headings, content, links, images, structured data

### Takeaway
Metadata is complete and well-sized, but the server-rendered H1 reads only "AI agents that" (the last word is typed in by JavaScript and hero text ships at `opacity:0`), there are two H1s on every page, 8 of 9 FAQ answers are absent from visible HTML, the FAQ intro is leftover copy about "safety professionals" and "certified training", and the OG image dimensions are mis-declared. JSON-LD is valid JSON but has no postal address, uses non-www IDs, and the home page has no FAQPage markup.

### Cited Findings

**Head metadata**
- `<title>`: "AI Automation Agency & AI Calling Solutions | Syenxa Tech" (57 characters). `<html lang="en">`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Meta description (165 characters): "Syenxa Tech is an AI automation agency building custom AI calling agents, voice AI for sales, AI chatbots, and high-performance Next.js websites for business growth." — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- `robots`: `index, follow`; `googlebot`: `index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1`. No `X-Robots-Tag` header. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Canonical: `https://syenxatech.com` (non-www). Hreflang: none. Meta keywords present (7 phrases incl. "AI Calling Agents", "Custom Website Development Company"). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Open Graph: `og:title` = title, `og:description` = description, `og:url` = `https://syenxatech.com`, `og:site_name` = Syenxa Tech, `og:locale` = en_US, `og:type` = website, `og:image` = `https://syenxatech.com/hero-bg.jpg`, `og:image:width` 1200, `og:image:height` 630, `og:image:alt` "Syenxa Tech AI and digital solutions". Twitter: `summary_large_image`, same title/description/image; no `twitter:site`/`twitter:creator`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- OG image: declared URL `https://syenxatech.com/hero-bg.jpg` → 307 → `https://www.syenxatech.com/hero-bg.jpg` → 200, `image/jpeg`, 229,824 bytes. **Actual pixel size 1440 × 985** (aspect 1.46:1), not the declared 1200 × 630 (1.91:1). The same image is the OG/Twitter image on every page checked. — [https://www.syenxatech.com/hero-bg.jpg](https://www.syenxatech.com/hero-bg.jpg)
- Icons: `rel=icon` → `/logo.svg` (302,901 bytes; an SVG wrapper around embedded base64 PNG data, zero `<path>` elements; 224,513 bytes over the wire with Brotli). `apple-touch-icon` → `/Logo.png`, which is **54 × 41 px**, 819 bytes. — [https://www.syenxatech.com/logo.svg](https://www.syenxatech.com/logo.svg)

**Headings**
- **Two `<h1>` elements.** H1 #1 (hero): server-rendered text is "AI agents that" with `aria-label="AI agents that never sleep."`; the three words are inside spans with inline `style="opacity:0;transform:translateY(115%) rotate(4deg)"`, the whole inner wrapper is `aria-hidden="true"`, and the final word is an empty span filled by a typewriter script (observed mid-animation in the browser as "AIagentsthat never"). H1 #2 (footer wordmark): "SYENXA TECH". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The footer "SYENXA TECH" H1 appears on every page checked, so every page has 2 H1s. — [https://www.syenxatech.com/about](https://www.syenxatech.com/about)
- H2/H3/H4 outline in source order: H2 "Our Services & Expertise ." → H3 "AI Calling Agent", "Website Development", "AI Chatbot", "Digital Marketing & Apps" → H2 "About Syenxa Tech" → H3 "AI Calling Agent & Automation Experts" → H2 "GET IN TOUCH WITH US" → H4 "Our Location", "Phone Number", "Email Address" → nine H3 FAQ questions ("What services does SynexaTech offer?", "How much does your AI chatbot cost?", "Can your chatbot work on WhatsApp and Instagram?", "Do you offer a free chatbot trial?", "How long does it take to deliver my chatbot?", "Do you build websites too?", "Is hosting and domain included in the website price?", "What are AI calling agents, and how do they work?", "What is the pricing for AI calling agents?") → H3 "Socials", "Legal" → H1 "SYENXA TECH". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- "Frequently Asked Questions" is not a heading element; the FAQ H3s sit under the H2 "GET IN TOUCH WITH US". Lighthouse flags `heading-order` (H4 following H2). — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Visible content**
- Visible text in the server HTML: **596 words** (3,883 characters) including navigation, marquee duplicates and footer. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Section order as rendered: nav → hero (eyebrow "AI automation for growing businesses", H1, sub-copy "Syenxa Tech builds AI calling agents, chatbots, and websites that answer every lead and book meetings around the clock.", CTAs "Book a Demo" → /contact and "Explore Services" → /services, "Trusted by 150+ businesses worldwide", three floating mock cards: AI voice agent / WhatsApp chatbot / "Meeting booked Tuesday, 2:30 PM", three counters) → scrolling marquee of service links → "What We Do / Our Services & Expertise" (4 cards) → "About Syenxa Tech" with a YouTube embed → stats band (2014, 304, 189, 20) → "Get Started / Slots are available" button → contact form → FAQ accordion → footer. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Hero counters render in server HTML as "+ Happy clients", "k Conversations", "24/7 Availability" (numbers are animated in by JS; the script targets are 150 and 120). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Only the first FAQ answer is in the visible HTML; the other 8 answers exist only inside the serialized React payload in a `<script>` (collapsed accordion content is not in the DOM). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- FAQ intro paragraph is unrelated template copy: "Whether you're a safety professional, a fresh learner, or a corporate client seeking certified training, we understand you may have questions… from course selection and certification to delivery methods and international recognition." The same paragraph is on /services. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The "Digital Marketing & Apps" card body describes mobile apps, not marketing: "Custom Android and iOS mobile applications with scalable architecture and seamless user experiences for national brands." — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- A footer-style block ("Syenxa Tech / Email / Phone / © 2026 Syenxa Tech. All rights reserved.") is rendered mid-page inside the About section, and a second footer follows at the bottom spelled "Synexa Tech". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- One `<iframe>`: `https://www.youtube.com/embed/sqfogWpfa8M`, 900 × 600, title "YouTube video player", no `loading="lazy"`. YouTube's oEmbed reports the video title as "Synexatech" on channel "SyenxaTech". — [https://www.youtube.com/watch?v=sqfogWpfa8M](https://www.youtube.com/watch?v=sqfogWpfa8M)
- Landmarks: 1 `<header>`, 2 `<nav>`, 3 `<section>`, 1 `<footer>`, **no `<main>`**. One `<form>` with Name, Email (type `text`, not `email`), Phone, Message; no `autocomplete` attributes (Chrome logs "An element doesn't have an autocomplete attribute (count: 3)"). 14 `<button>` elements, 45 inline SVGs. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Internal links and anchor text (35 `<a>` elements)**
- Nav: "SYENXATECH" → `/`; "Home" → `/`; "Services" → `/services`; "Blog" → `/blog`; "About" → `/about`; "FAQ" → `/#faqs`; "Contact" → `/contact`. The nav "Get Started" control is a `<button>`, not a link. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Hero: "Book a Demo" → `/contact`; "Explore Services" → `/services`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Marquee (rendered twice): "AI Calling Agents" → `/ai-calling-agents`; "AI Chatbots" → `/ai-chatbots`; "Website Development" → `/website-development`; **"Mobile Apps" → `/digital-marketing`**; "Use Cases" → `/use-cases`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Service cards: 4 icon-only links with **no anchor text or aria-label** → `/ai-calling-agents`, `/website-development`, `/ai-chatbots`, `/digital-marketing`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Contact: `mailto:syenxatech@gmail.com` and `tel:+12897963492` (each twice). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Footer: "Linkedin", "Instagram", "Facebook", "Privacy Policy", "Terms of Service" are all `href="#"`; plus one **empty-text external link to `https://github.com/arihantcodes/spectrum-ui`** (UI-kit template leftover) in the Socials list. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- No home-page links to any blog post or to any `/use-cases/*` detail page. No `rel`/`target` attributes on any link. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Images**
- 21 `<img>` elements; 0 missing the `alt` attribute; 12 have empty `alt=""` (repeated 41 × 41 avatar PNGs `hero-r-1..3.png` in the service cards). Named alts: "Syenxa Tech Logo" (×2), "Synexa Tech Logo" (footer, misspelled), "Syenxa Tech client 1"–"5". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The logo and avatar images have no `width`/`height` attributes (Lighthouse `unsized-images`). Six images are `<link rel=preload>`-ed (logo.svg and five 41 px avatars). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The Meta Pixel `<noscript>` fallback is rendered through the Next image optimizer (`/_next/image?url=https://www.facebook.com/tr?id=1452148583208605&ev=PageView&noscript=1`), `alt="meta-pixels"`, 1 × 1. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- There are no content images on the home page other than the logo and avatars: no product screenshots, team photos, client logos or case-study visuals. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**JSON-LD (2 blocks, both parse)**
- Block 1 `ProfessionalService`: `@id` `https://syenxatech.com/#organization`, `name` "Syenxa Tech", `url` `https://syenxatech.com`, `logo` `https://syenxatech.com/logo.svg`, `image` `https://syenxatech.com/hero-bg.jpg`, `contactPoint` {telephone "+1 289 796-3492", contactType "customer service", email "syenxatech@gmail.com", areaServed "Worldwide", availableLanguage "en"}, `sameAs` [`https://www.linkedin.com/company/syenxatech`, `https://www.instagram.com/syenxatech`, `https://www.facebook.com/people/SyenxaTech/61584113090992/#`], `description`, `knowsAbout` (5 topics). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Block 2 `WebSite`: `@id` `https://syenxatech.com/#website`, `url` `https://syenxatech.com`, `publisher` → `#organization`, `inLanguage` "en". No `SearchAction`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Missing from the `ProfessionalService` node: `address` (no PostalAddress at all), top-level `telephone`, `priceRange`, `geo`, `openingHoursSpecification`, `foundingDate`, `founder`. Visible page says "Texas, United States"; schema says `areaServed: "Worldwide"`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- No `FAQPage` on the home page even though it has 9 FAQs; no `BreadcrumbList` on any page fetched; blog posts carry only the site-wide `ProfessionalService` + `WebSite` blocks (no `Article`/`BlogPosting`, no `datePublished`). — [https://www.syenxatech.com/blog/how-ai-calling-agents-are-transforming-sales](https://www.syenxatech.com/blog/how-ai-calling-agents-are-transforming-sales)
- The schema `sameAs` profiles are real URLs, but the visible footer social links are `href="#"`. LinkedIn URL returns 200 ("SyenxaTech | LinkedIn"); Instagram URL returns 200; the Facebook URL returned HTTP 400 to a scripted request (Facebook blocks non-browser clients, so this is inconclusive), and it carries a stray trailing `/#`. — [https://www.linkedin.com/company/syenxatech](https://www.linkedin.com/company/syenxatech)
- No `aggregateRating` or `Review` markup anywhere (correct, given no verifiable reviews were found). — [https://www.syenxatech.com/](https://www.syenxatech.com/)

### Inferences
- A crawler that does not execute JavaScript sees an H1 of "AI agents that", which contains neither "AI calling agents" nor "website development"; the `aria-label` is not a substitute for heading text in indexing. The competing footer H1 "SYENXA TECH" is the only fully-formed H1 in raw HTML.
- Because the hero headline and paragraph ship at `opacity:0` and are revealed by script, the hero is blank until hydration; this is also the direct cause of the LCP "render delay" measured in section 5.
- `ProfessionalService` is a `LocalBusiness` subtype, for which Google's guidelines expect `address`; without it the node is weak for local/knowledge-panel purposes and inconsistent with the on-page "Texas" claim. Using an SVG that wraps a PNG as `logo` is a risk for logo eligibility.
- The mis-declared OG dimensions mean social platforms will crop a 1440 × 985 image to 1.91:1; a purpose-built 1200 × 630 image per priority page would fix both the crop and the "same image everywhere" problem.
- The "Mobile Apps" → `/digital-marketing` anchor and the "Digital Marketing & Apps" card send mixed topical signals for that URL.
- With ~600 words, most of them nav/labels, the home page has thin crawlable copy for the two target topics; the 8 hidden FAQ answers (which hold every pricing statement on the site) contribute nothing to non-rendering crawlers.

### Gaps
- Google's Rich Results Test and the Schema.org validator were not run (they need an interactive browser session); JSON-LD findings are from parsing the markup directly.
- Whether Googlebot's renderer captures the typed H1 word at snapshot time is unknown.
- The contact form's submission endpoint could not be identified from the static bundles without submitting the form (which was out of scope).

---

## 4. Indexing and visibility

### Takeaway
The site is indexed in Bing's ecosystem (DuckDuckGo returns the www home page plus at least nine inner pages), but brand visibility is minimal: an exact-match "Syenxa Tech" query returns only the site's own home page, a US web-search tool returned no syenxatech.com result at all and instead surfaced look-alike names (Syenex, SYNNEX, Synapxe, Synax), and no third-party review or directory profile could be confirmed. Google's index status could not be verified.

### Cited Findings
- DuckDuckGo `site:syenxatech.com` returned 10 results on page 1, all on the **www** host: `/`, `/contact`, `/website-development`, `/about`, `/blog/syenxa-tech-leading-ai-solutions`, `/use-cases`, `/services`, `/ai-calling-agents`, `/ai-chatbots`, `/digital-marketing`. — [https://html.duckduckgo.com/html/?q=site%3Asyenxatech.com](https://html.duckduckgo.com/html/?q=site%3Asyenxatech.com)
- In that index the `/use-cases` title is "AI Automation Use Cases by Industry | Syenxa Tech", whereas the live title today is "AI Voice Agent & Chatbot Industry Use Cases | Syenxa Tech" — the index holds an older version of that page. — [https://www.syenxatech.com/use-cases](https://www.syenxatech.com/use-cases)
- DuckDuckGo exact-match `"Syenxa Tech"` returned **one** result — the home page, snippet = the meta description — followed by "No more results found". — [https://html.duckduckgo.com/html/?q=%22Syenxa+Tech%22](https://html.duckduckgo.com/html/?q=%22Syenxa+Tech%22)
- A US web search for `site:syenxatech.com` and for `"Syenxa Tech"` returned no syenxatech.com pages; results were for similarly named entities: Syenex (synthetic-biology company, Chicago/Boston; Crunchbase slug `syenex`), SYNNEX / Synnex Technology International (IT distributor), Synapxe (Singapore national HealthTech agency), SYNAX TECH SRL (Romania), Synex Technology Solutions, Synexa. Example result: — [https://jobs.lightbank.com/companies/syenex](https://jobs.lightbank.com/companies/syenex)
- LinkedIn company page exists: "SyenxaTech | **9 followers** on LinkedIn. Building Smart Digital Solutions for Modern Businesses"; the page's own structured data gives `numberOfEmployees: 1` and `sameAs: www.syenxatech.com`. — [https://www.linkedin.com/company/syenxatech](https://www.linkedin.com/company/syenxatech)
- Instagram handle `syenxatech` resolves (HTTP 200; content behind login wall). — [https://www.instagram.com/syenxatech](https://www.instagram.com/syenxatech)
- A YouTube channel "SyenxaTech" (`@SyenxaTech`) exists and hosts the embedded home-page video, titled "Synexatech". — [https://www.youtube.com/@SyenxaTech](https://www.youtube.com/@SyenxaTech)
- Cal.com booking page `syenxa-tech/30min` resolves (HTTP 200). — [https://cal.com/syenxa-tech/30min](https://cal.com/syenxa-tech/30min)
- A guessed GoodFirms profile URL redirected to the GoodFirms home page (no profile at that slug). — [https://www.goodfirms.co/company/syenxa-tech](https://www.goodfirms.co/company/syenxa-tech)
- Domain `syenxatech.com` was **registered 2025-07-16** (registrar Tucows Domains Inc.; expires 2027-07-16; last changed 2026-06-25); nameservers are `ns1/ns2.vercel-dns.com`. — [https://rdap.verisign.com/com/v1/domain/syenxatech.com](https://rdap.verisign.com/com/v1/domain/syenxatech.com)
- Chrome's performance tooling reported "no data for this page in CrUX" for the home page, i.e. not enough real Chrome traffic to appear in the Chrome UX Report. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

### Inferences
- Brand-name confusion is a real risk: "Syenxa" is one transposition away from "Synexa"/"Syenex"/"Synnex", search engines auto-correct toward the larger entities, and the site itself uses "Synexa Tech" / "SynexaTech" / "Synexatech" in its footer, FAQ and video title (section 7), which reinforces the wrong spelling.
- A 15-month-old domain, 9 LinkedIn followers, one listed employee and absence from CrUX indicate very low authority and traffic; ranking for head terms such as "AI calling agents" or "website development services" in the US is unrealistic near-term without long-tail/vertical pages, citations and links.
- Search engines listing www URLs despite non-www canonicals confirms the canonical tags are currently being ignored rather than helping.

### Gaps
- **Google index status is unverified.** A direct `site:` query to Google was met with its "unusual traffic" CAPTCHA wall, which was not bypassed. Search Console is the authoritative source.
- Bing's own results page returned unrelated junk to scripted requests (anti-bot), so Bing figures come via DuckDuckGo, and total indexed-page count beyond the first 10 is unknown.
- Clutch, Trustpilot and Crunchbase all returned HTTP 403 to scripted requests, so the existence of profiles or reviews there is **unconfirmed either way**; none surfaced in any search result. No Google Business Profile could be checked (requires Google Maps/Search). I found no reviews of Syenxa Tech on any third-party site.
- Backlink profile, keyword rankings and US SERP positions for the target terms were not measurable without a paid SEO tool.

---

## 5. Performance and Core Web Vitals

### Takeaway
PageSpeed Insights API was rate-limited on both attempts, so lab data comes from local Lighthouse runs: **Performance 28 (mobile) and 42 (desktop)**, with mobile LCP 17.3 s and desktop LCP 5.2 s. Almost all LCP time (88–98%) is "render delay", because the hero text is hidden until JavaScript animates it in; an eagerly loaded YouTube embed (~1.0 MB) and Meta Pixel (~216 KB, ~1.3 s main-thread blocking on mobile) account for 60% of page weight. CLS is effectively 0. No field data exists.

### Cited Findings

**PageSpeed Insights / field data**
- PSI API (`runPagespeed`, mobile and desktop, 4 categories) returned **HTTP 429** "Quota exceeded for quota metric 'Queries' and limit 'Queries per day'" on the first call and again on one retry several minutes later. — [https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.syenxatech.com/&strategy=mobile&category=performance](https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.syenxatech.com/&strategy=mobile&category=performance)
- Field data: none. Chrome DevTools reported "Metrics (field / real users): n/a – no data for this page in CrUX"; the CrUX API itself requires a key (HTTP 403). — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Local Lighthouse 12.8.2 CLI, headless Chrome 155, simulated throttling (same engine and presets PSI uses; run from a non-Google machine)**
- **Mobile** (150 ms RTT, 1.6 Mbps, 4× CPU): Performance **28**; FCP **7.9 s**; LCP **17.3 s**; TBT **2,120 ms**; CLS **0** (0.00008); Speed Index **10.1 s**; TTI **18.0 s**; Max Potential FID 880 ms; server response 100 ms; total transfer **2,153 KiB** (2,204,505 bytes) over **74 requests**; DOM 668 elements; JS execution 4.1 s; main-thread work 10.5 s. Lighthouse warned the test machine's CPU was slower than expected (benchmark index 639), so the mobile score is likely somewhat pessimistic. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- **Desktop** (40 ms RTT, 10 Mbps, 1× CPU): Performance **42**; FCP **2.5 s**; LCP **5.2 s**; TBT **400 ms**; CLS **0** (0.00006); Speed Index **3.6 s**; TTI 5.2 s; total transfer **2,228 KiB** over **93 requests**; JS execution 1.4 s; main-thread work 3.7 s. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- **LCP element** (both form factors): the hero paragraph `<p class="mt-7 text-lg lg:text-xl text-zinc-600 …">` "Syenxa Tech builds AI calling agents, chatbots, and websites that answer every lead…" — text, not an image. LCP phase breakdown, mobile: TTFB 2,102 ms (12%), load delay 0, load time 0, **render delay 15,243 ms (88%)**; desktop: TTFB 595 ms (11%), **render delay 4,637 ms (89%)**. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Transfer by type (mobile run): Script 24 requests / **1,350,658 bytes** (4.7 MB decoded); Font 25 / 399,719; Image 9 / 272,812; Stylesheet 5 / 88,119; Document 2 / 82,971; Third-party 20 requests / **1,322,522 bytes (60% of total)**. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Transfer by host (mobile run): `www.youtube.com` 995,491 bytes (8 requests); `www.syenxatech.com` 881,983 (54); `connect.facebook.net` 215,660 (2); `fonts.gstatic.com` 35,219; `i.ytimg.com` 25,719; `www.google.com` 24,774; `app.cal.com` 24,659; plus doubleclick and googleapis beacons pulled in by the YouTube player. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Largest single requests: YouTube `player_embed_es6 base.js` 483 KB; YouTube embeds JS 227 KB and 161 KB; **`/logo.svg` 225 KB**; `fbevents.js` 113 KB; Pixel config 103 KB; YouTube embed document 64 KB; YouTube player CSS 59 KB; first-party chunks 54 KB and 52 KB. — [https://www.syenxatech.com/logo.svg](https://www.syenxatech.com/logo.svg)
- Third-party main-thread cost (mobile): **Facebook 1,446 ms main-thread, 1,343 ms blocking**; cal.com 135 ms / 26 ms. Desktop: Facebook 470 ms / 362 ms blocking. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Top opportunities/diagnostics flagged (mobile, estimated savings): Largest Contentful Paint element (LCP −14,850 ms potential); Reduce JavaScript execution time 4.1 s (TBT −2,350 ms); Minimize main-thread work 10.5 s (script evaluation 3.7 s, style/layout 2.4 s, "other" 3.0 s); Reduce impact of third-party code (1,370 ms blocked); Use efficient cache lifetimes (205 KiB; LCP −1,800 ms); Preconnect to required origins (−600 ms LCP); Reduce unused JavaScript (121 KiB; ~35% of the Pixel scripts and ~48–52% of first-party chunks `517-…js` and `248-…js` unused); third-party facade available for the YouTube embed; Legacy JavaScript 24 KiB; forced reflow; 9 non-composited animations (hero elements animating `filter: blur()` together with opacity/transform); unsized images; render-blocking CSS (3 stylesheets, ~357 ms). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Longest tasks (mobile): `fbevents.js` 882 ms; inline document script 652 ms; Pixel config 561 ms; first-party chunk `517-…js` 477 ms; `4bd1b696-…js` 385 ms. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Chrome DevTools observed runs (real, not simulated, throttling)**
- Desktop, no throttling, warm cache: **LCP 2,709 ms** = TTFB 52 ms + **render delay 2,657 ms (98.1%)**; CLS 0.00; DOM 670 elements; one layout update of 388 ms; Facebook 402 ms main-thread. So even on a fast machine with a 52 ms TTFB, the hero copy is not painted until ~2.7 s. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Mobile emulation (412 × 823, Slow 4G, 4× CPU, cache disabled): **FCP 4,832 ms; LCP 11,048 ms** (hero paragraph); CLS 0.0014; DOMContentLoaded 5,540 ms; load event 15,218 ms; document TTFB 56 ms over HTTP/2. Long tasks were recorded continuously from 0.9 s to the end of sampling at ~41.8 s (total long-task time 25,887 ms; blocking portion after FCP 12,301 ms) — the main thread never goes idle under 4× throttle. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Payload measured by direct fetch**
- HTML document: 128,886 bytes decoded, **18,585 bytes** Brotli; time-to-first-byte by `curl` from the test location 1.24 s on the first connection and 0.40–0.82 s for the other 200 pages (includes DNS/TLS setup each time). 41,067 bytes of the HTML are inline scripts (React flight payload). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- First-party JavaScript referenced by the home page: 15 chunks, **242,060 bytes transfer / 757,069 bytes decoded** (includes a 41 KB `nomodule` polyfill modern browsers skip). Largest: `4bd1b696-…js` 54 KB, `517-…js` 52 KB, `248-…js` 43 KB. — [https://www.syenxatech.com/_next/static/chunks/517-1b161e5abc0763d2.js](https://www.syenxatech.com/_next/static/chunks/517-1b161e5abc0763d2.js)
- CSS: 3 render-blocking stylesheets, 28,028 bytes transfer / 200,459 bytes decoded. — [https://www.syenxatech.com/_next/static/css/a7ac05e26ab8ba93.css](https://www.syenxatech.com/_next/static/css/a7ac05e26ab8ba93.css)
- Fonts: **24 `.woff2` files are `<link rel=preload>`-ed in the `<head>` of every page, 359,128 bytes total**; a 25th font (Roboto) is pulled by the YouTube iframe. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Third-party requests seen on load: YouTube embed (+ doubleclick, google.com, googleapis beacons), Meta Pixel ID `1452148583208605` (`fbevents.js`, config, `PageView` beacon), Cal.com `app.cal.com/embed/embed.js` (calLink `syenxa-tech/30min`). **No request to any n8n host and no chat widget was loaded on the live home page**; no Google Analytics or Tag Manager. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- On desktop viewports Next.js prefetches RSC payloads for 9 nav/marquee routes (`/services?_rsc=…`, `/blog`, `/about`, `/contact`, `/ai-calling-agents`, `/ai-chatbots`, `/website-development`, `/digital-marketing`, `/use-cases`) plus their page chunks, which is why the desktop run shows 93 requests vs 74 on mobile. — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Lighthouse 13.4.1 (via Chrome DevTools) — non-performance categories**
- Mobile: **Accessibility 85, Best Practices 77, SEO 100**, "Agentic Browsing" 67. Desktop: **Accessibility 90, Best Practices 77, SEO 100**, Agentic Browsing 67. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Failing accessibility audits: (1) `button-name` — the mobile hamburger button (`md:hidden … p-2 rounded-full`) has no accessible name (mobile only); (2) `color-contrast` — white on brand orange `#ff541f` is **3.21:1** (nav "Get Started", "Get Started" CTA, form submit button, chat-bubble mock at 12 px), orange `#ff541f` on background `#faf9f7` is **3.05:1** ("Contact Us" eyebrow), `#f54900` on `#faf9f7` is 3.42:1; required 4.5:1; (3) `heading-order` — H4 after H2 in the contact block; (4) `link-name` — the 4 icon-only service-card links and the empty GitHub link have no discernible name; (5) `landmark-one-main` — no `<main>` landmark. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Failing best-practice audits: `third-party-cookies` (2: `app.cal.com/embed/embed.js` and the `facebook.com/tr` Pixel beacon) and `inspector-issues` (issues raised for the YouTube embed, Cal.com embed and Pixel beacon). Agentic Browsing fails `agent-accessibility-tree` ("Accessibility tree is not well-formed"). — [https://www.syenxatech.com/](https://www.syenxatech.com/)

### Inferences
- The dominant performance problem is architectural, not network: the server responds in ~50–100 ms and CLS is ~0, but the LCP text is server-rendered invisible and waits for hydration plus a staggered entrance animation. Rendering the hero headline and paragraph visible in the initial HTML (animate only decorative elements, or animate with CSS that does not start from `opacity:0`) would remove most of the 2.7 s (desktop) to 11–17 s (mobile) LCP.
- Second-order wins, in rough order of payoff: replace the YouTube iframe with a click-to-load facade (−~1.0 MB, 8+ requests, and the third-party-cookie/inspector issues); delay the Meta Pixel until after load/idle or consent (−~1.3 s mobile blocking); cut the 24 preloaded fonts to the 2–4 weights actually used above the fold (−~300 KB of high-priority requests that currently compete with CSS and delay FCP on slow links); replace the 303 KB PNG-in-SVG logo with a real vector or small raster; drop continuous main-thread animations (marquee, typewriter, blur filters) or make them compositor-only.
- Lighthouse SEO = 100 is not evidence of sound SEO here: it does not test canonical-vs-host conflicts, redirecting sitemap URLs, dead legal links, the truncated H1, or structured-data completeness.
- The live site, an agency selling "Core Web Vitals"-optimised websites, currently fails LCP and TBT thresholds in lab tests; that is a credibility issue on the /website-development page specifically.
- The absence of the n8n chat widget on the live page means either it is disabled, removed, or failing silently; a redesign should not assume a working chat entry point.

### Gaps
- **No PageSpeed Insights numbers** (API quota exhausted twice). Local Lighthouse uses the same engine but different hardware and network location, so scores will differ from PSI by some margin; the mobile run in particular carried a slow-CPU warning.
- **No field (CrUX) data** exists for the URL or could be retrieved for the origin, so real-user LCP/INP/CLS are unknown.
- INP cannot be measured in the lab without real interactions and was not assessed; the TBT and continuous long-task evidence suggests risk but is not an INP measurement.
- Tests ran from a location served by Vercel's Mumbai edge (`bom1`); US visitors will hit a US edge, but since TTFB is not the bottleneck the conclusions should hold.
- Only the home page was performance-tested.

---

## 6. Response headers and hosting

### Takeaway
Hosted on Vercel (Next.js App Router, statically prerendered, Brotli, HTTP/2) with a partial security-header set: HSTS, X-Frame-Options, X-Content-Type-Options and Referrer-Policy are present; **Content-Security-Policy and Permissions-Policy are absent**. Files served from `/public` (logo, OG image, avatars) are sent with `max-age=0, must-revalidate`.

### Cited Findings
- Hosting: `Server: Vercel`, `X-Vercel-Id: bom1::…`, `X-Vercel-Cache: HIT`, `X-Nextjs-Prerender: 1`, `X-Matched-Path: /`, `X-Nextjs-Stale-Time: 4294967294`, `Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch`; DNS on `ns1/ns2.vercel-dns.com`; A records 64.29.17.65 and 64.29.17.1; protocol `h2`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Compression: `Content-Encoding: br` on HTML (128,886 → 18,585 bytes) and on JS/CSS. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- HTML caching: `Cache-Control: public, max-age=0, must-revalidate`, weak `ETag`, served from edge cache (`Age` 106,223–237,985 s across pages). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Hashed build assets: `Cache-Control: public,max-age=31536000,immutable`. — [https://www.syenxatech.com/_next/static/chunks/webpack-0e4474f3588f84bf.js](https://www.syenxatech.com/_next/static/chunks/webpack-0e4474f3588f84bf.js)
- `/public` assets (`/logo.svg`, `/hero-r-1.png`, `/hero-bg.jpg`): `Cache-Control: public, max-age=0, must-revalidate` — revalidated on every visit (the browser re-requested `logo.svg` twice in one page view, receiving 304s). — [https://www.syenxatech.com/logo.svg](https://www.syenxatech.com/logo.svg)
- `Strict-Transport-Security: max-age=63072000` (2 years; **no `includeSubDomains`, no `preload`**). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- `X-Frame-Options: SAMEORIGIN`; `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- **Not present:** `Content-Security-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Embedder-Policy`, `X-Robots-Tag`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- `Access-Control-Allow-Origin: *` and `Content-Disposition: inline` are sent on HTML documents. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The apex 307 response carries HSTS but none of the other security headers. — [https://syenxatech.com/](https://syenxatech.com/)

### Inferences
- X-Frame-Options, X-Content-Type-Options and Referrer-Policy appear on page responses but not on the apex redirect response, which suggests they are set in the application's own header config rather than by the platform; if so, adding CSP (at least `frame-ancestors`, and a report-only policy covering YouTube, Facebook and Cal.com) and a restrictive Permissions-Policy is a small extension of existing config.
- Giving `/public` images a long `max-age` (or moving them through the image optimizer / hashed imports) removes repeat-visit revalidation requests.
- `Access-Control-Allow-Origin: *` on static public HTML is Vercel's default and low-risk for a brochure site with no authenticated content.

### Gaps
- No external scanner grade (e.g. securityheaders.com, SSL Labs) was collected; TLS configuration was not graded.
- Cookie attributes set by first-party code were not enumerated (only third-party cookies flagged by Lighthouse).

---

## 7. Content consistency across the live site

### Takeaway
The site contradicts itself on location, company age and scale, delivery times, brand spelling and service naming. The strongest credibility conflicts: a "Texas, United States" address beside an Ontario, Canada phone number; "2014 Year of establishment / 304 projects / 189 clients" against a domain registered in July 2025 and a LinkedIn page showing 1 employee and 9 followers; and "20 5-Star Reviews" captioned "More than 100 reviews are done" with no reviews visible anywhere.

### Cited Findings

**Location, phone, email**
- Contact block (home, /services, /digital-marketing, blog posts): "Our Location: **Texas, United States**"; "Phone Number: **+1 289 796-3492**"; "Email Address: **syenxatech@gmail.com**". No street address, city or ZIP anywhere. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Area code 289 belongs to the Golden Horseshoe region of **Southern Ontario, Canada** (overlay of 905), not Texas. — [https://en.wikipedia.org/wiki/Area_codes_905,_289,_365,_and_742](https://en.wikipedia.org/wiki/Area_codes_905,_289,_365,_and_742)
- Home About section: "Based in the United States, we provide AI solutions for small businesses worldwide". /about: "a leading AI and digital solutions company based in the USA". Blog: "An American Company Serving Global Clients"; meta keywords include "American AI Company". — [https://www.syenxatech.com/blog/syenxa-tech-leading-ai-solutions](https://www.syenxatech.com/blog/syenxa-tech-leading-ai-solutions)
- JSON-LD on every page: no address; `areaServed: "Worldwide"`. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The dedicated /contact page shows **only the email** — no phone and no location — and uses a different form (Name, Email, Services dropdown, Message; email placeholder "john@example.com") from the home-page form (Name, Email, Phone, Message). — [https://www.syenxatech.com/contact](https://www.syenxatech.com/contact)
- One phone number (+1 289 796-3492) and one email (a free Gmail address, not a domain mailbox) are used consistently across all pages; no second number was found. — [https://www.syenxatech.com/services](https://www.syenxatech.com/services)

**Company age, scale and social proof**
- Home stats band: "**2014** Year of establishment — More than 10 years in the field"; "**304** Projects are launched"; "**189** Happy clients — Clients from all over the world"; "**20** 5-Star Reviews — **More than 100 reviews are done**" (20 vs 100+ in the same tile). — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Home hero: "Trusted by **150+** businesses worldwide" with counters targeting 150 "Happy clients" and 120 "k Conversations" — versus 189 happy clients lower on the same page. — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- /services stats: "10+ Years building software", "304 Projects delivered", "189 Clients worldwide", "24/7 Agent coverage". /about: "Join **hundreds** of businesses worldwide". — [https://www.syenxatech.com/services](https://www.syenxatech.com/services)
- The domain was registered on 2025-07-16. — [https://rdap.verisign.com/com/v1/domain/syenxatech.com](https://rdap.verisign.com/com/v1/domain/syenxatech.com)
- LinkedIn company page: 9 followers; structured data lists 1 employee. — [https://www.linkedin.com/company/syenxatech](https://www.linkedin.com/company/syenxatech)
- Home About block prints a bare "2026" label above "About Syenxa Tech". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- Testimonials: there are **no named testimonials, client logos or review excerpts on the home page**. The five hero avatars are 41 × 41 px images with alts "Syenxa Tech client 1"–"5". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- The only quote on the site is on /use-cases/doctor, attributed to an unnamed "Multi-Location Dental Practice": "We went from three separate phone systems to one unified eSIM solution. Our costs dropped by 60%…". — [https://www.syenxatech.com/use-cases/doctor](https://www.syenxatech.com/use-cases/doctor)
- Use-case page titles are built from generic or invented client names: "Multi-Location Dental Practice AI Automation Use Case", "Urban Living Estate Agents AI Automation Use Case", "IronClad Fitness chain AI Automation Use Case", "Luxe Spa & Salon AI Automation Use Case"; the keywords meta labels them "business automation case study". — [https://www.syenxatech.com/use-cases/gym](https://www.syenxatech.com/use-cases/gym)
- /use-cases/doctor is written for the **UK**, not the US: "outside surgery hours", "NHS & Private Insurance Verification", "High DNA (Did Not Attend) rates", "three local eSIM numbers (020, 0161, 0121)", "enquiries". Its stat counters render in HTML without numbers ("% Reduction in DNAs", "/7 Availability", "% Patient Satisfaction Increase"). — [https://www.syenxatech.com/use-cases/doctor](https://www.syenxatech.com/use-cases/doctor)
- /ai-calling-agents hero stats: "100% Instant Lead Coverage", "<5s Average Response Time", "24/7 Global Availability", "3x Higher Conversion Rate" — unsourced; its FAQ schema cites "contacting a lead within the first 5 minutes increases conversion rates by up to 391%" without attribution. — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)

**Pricing and delivery statements**
- Home and /services FAQ (answers hidden in collapsed accordion): chatbot "one-time setup fee of **$150 USD upto $350 USD**. There are no monthly charges, and you also get a free 7-day trial"; websites "Pricing starts at **$200 USD**, delivered within **5–7 working days**"; "hosting and domain charges are separate"; chatbots delivered "in just **3 working days**"; AI calling agents "Pricing is custom and depends on call volume, duration, language, and region. We offer a free consultation". — [https://www.syenxatech.com/](https://www.syenxatech.com/)
- /services repeats "Chatbots ship in 3 days, websites in 5 to 7", "Delivered in 5 to 7 working days", "You leave with a fixed quote and a delivery date", "No long contracts", "Support is included, not an upsell". — [https://www.syenxatech.com/services](https://www.syenxatech.com/services)
- **Contradiction:** /website-development FAQ schema says "A standard custom business website typically takes **2 to 4 weeks**, while complex web applications or e-commerce platforms take **4 to 8 weeks**" — versus 5–7 working days on home and /services. No price is stated on /website-development. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- /ai-calling-agents states no price; its FAQ advises evaluating vendors on "transparent pricing per call minute", while the site's own calling-agent pricing is "custom". — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- There is no pricing page (`/pricing` and `/pricing.md` are 404). — [https://www.syenxatech.com/pricing](https://www.syenxatech.com/pricing)
- Positioning mismatch: $150–$350 chatbots and $200 websites sit beside "Enterprise AI integration" (llms.txt), "enterprise-grade voice intelligence", "Powered by Enterprise Web Stack" and "for national brands". — [https://www.syenxatech.com/llms.txt](https://www.syenxatech.com/llms.txt)

**Brand spelling**
- Across the 18 pages fetched: "Syenxa Tech" 836 occurrences; "**Synexa Tech**" 69 (the site-wide footer: "Synexa Tech", "© 2026 Synexa Tech. All rights reserved.", logo alt "Synexa Tech Logo"); "**SynexaTech**" 4 (FAQ: "What services does SynexaTech offer?"); nav wordmark "SYENXATECH"; YouTube video title "Synexatech". — [https://www.syenxatech.com/](https://www.syenxatech.com/)

**Service naming and templates**
- The fourth service is labelled four different ways: nav/marquee "Mobile Apps" (→ /digital-marketing); home card "Digital Marketing & Apps" (body about Android/iOS apps); /services "Mobile App Development"; the destination page's H1 is "Digital Marketing & SEO Services" and its title is "AI Marketing Automation Agency & SEO Services | Syenxa Tech" with no mobile-app content. — [https://www.syenxatech.com/digital-marketing](https://www.syenxatech.com/digital-marketing)
- /about and /digital-marketing are rendered in the blog-article template ("All articles", "Blog" label, "Topics" tags, "Put this to work… Talk to us" sidebar) rather than as standalone pages. — [https://www.syenxatech.com/about](https://www.syenxatech.com/about)
- /website-development lists 11 portfolio projects, several of them the company's own ("Syenxa AI Platform", "Syenxa AI Calorie Tracker", "Syenxa GYM") and two near-identical entries ("Home Services", "Home Services Pro"); includes a "Mobile App Dev" feature card. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- FAQ intro copy about safety training (see section 3) appears on both home and /services. — [https://www.syenxatech.com/services](https://www.syenxatech.com/services)

### Inferences
- For a US buyer (and for Google's E-E-A-T assessment) the Texas-vs-Ontario mismatch, the Gmail address, missing legal pages, unverifiable scale claims and absent reviews compound into a trust deficit that design polish alone will not fix; the redesign needs one verifiable NAP (name, address, phone), claims that can be evidenced, and real proof (named clients, recordings, screenshots, dated case studies).
- Company-age and client-count claims that are contradicted by public records (domain age, LinkedIn) are also a risk under ad-platform and consumer-protection rules on misleading claims; they should be replaced with defensible numbers or removed.
- The UK-flavoured use cases and "worldwide" schema dilute the stated US targeting; the US pages need US vocabulary (practice/office hours, no-shows, insurance verification, US area codes).
- The 5–7-days vs 2–4-weeks conflict sits on the two pages most likely to be read together by a website-development prospect and should be reconciled into one tiered statement.
- Fixing the "Synexa" misspellings on the site and on YouTube is a prerequisite for cleaning up brand-name confusion in search (section 4).

### Gaps
- The true business location, founding date, client count and review count are not knowable from outside; the notes report the contradictions, not which version is correct.
- Not every page's full body text was reviewed line by line (blog post bodies and three of four use-case pages were sampled for metadata and key terms only).
- Whether the 7-day free trial and listed prices are current offers could not be verified.

---

## 8. Priority pages: /ai-calling-agents and /website-development

### Takeaway
Both pages have well-formed titles and descriptions and a clear, keyword-bearing primary H1, but share the site-wide faults (non-www canonical, second footer H1, generic OG image, FAQ answers not in visible HTML). /ai-calling-agents is thin at 332 words with no pricing, proof, audio demo or US reference; /website-development has 634 words dominated by portfolio blurbs, has no H2 above its four feature cards, and contradicts the home page on delivery time.

### Cited Findings

**/ai-calling-agents**
- Status 200; HTML 49,556 bytes decoded / 10,156 bytes Brotli. — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Title (61 chars): "AI Voice Agents & Outbound AI Calling Solutions | Syenxa Tech". — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Description (159 chars): "Deploy custom AI voice agents for 24/7 outbound sales calls, inbound lead qualification, and instant appointment booking. Zero wait times, human-like voice AI." — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Canonical: `https://syenxatech.com/ai-calling-agents` (non-www; 307s to www). Robots: `index, follow`. `og:url` non-www; OG image = site-wide `hero-bg.jpg`. — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- H1 count 2: "AI Calling Agents For Sales & Outbound Calls." and footer "SYENXA TECH". — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Outline: H2 "Why Businesses Choose AI Voice Agents" → H3 ×6 ("24/7 Inbound & Outbound Calling", "Human-grade Conversational Voice AI", "Infinite Call Scalability", "Real-time CRM & Calendar Auto-Booking", "Intelligent Lead Qualification", "Proven Revenue Growth") → H2 "Everything You Need to Know About AI Voice Agents" → H2 "Ready to Automate Your Outbound & Inbound Sales Calls?". — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Visible word count: **332** (including nav and footer). CTAs: "Deploy Your AI Voice Agent", "View Real Use Cases", "Schedule a Live Voice AI Demo". — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- JSON-LD: 4 blocks — `ProfessionalService`, `WebSite`, `FAQPage` (5 questions with answers), `Service` (name "AI Calling Agents & Voice AI Solutions", serviceType "AI Voice Call Automation", provider = an un-ID'd `Organization` node, url non-www; no `areaServed`, no `offers`). — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- The 5 FAQ questions are visible but their answers appear only in the JSON-LD/script payload, not in the rendered HTML text (collapsed accordion). — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)
- Term usage: the title leads with "AI Voice Agents", the H1 with "AI Calling Agents", body copy mostly "AI voice agents"; "USA"/"United States"/any US city does not appear in the page body. — [https://www.syenxatech.com/ai-calling-agents](https://www.syenxatech.com/ai-calling-agents)

**/website-development**
- Status 200; HTML 88,069 bytes decoded / 12,504 bytes Brotli. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Title (58 chars): "Custom Website Development Services & Agency | Syenxa Tech". — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Description (160 chars): "Syenxa Tech is a custom website development company building high-performance Next.js websites, web apps, and e-commerce platforms engineered for speed and SEO." — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Canonical: `https://syenxatech.com/website-development` (non-www). Robots: `index, follow`. OG image = site-wide `hero-bg.jpg`. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- H1 count 2: "Custom Website Development Agency." and footer "SYENXA TECH". — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Outline: H1 → H3 ×4 directly (no H2: "Responsive Web Design", "Mobile App Dev", "Technical SEO Built-in", "E-Commerce Platforms") → H2 "Featured Web Development Projects" → H3 ×11 project names → H2 "Custom Website Development Questions" → H2 "Ready to Build Your Custom Website?". — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Visible word count: **634** (including nav and footer), most of it the 11 portfolio descriptions, each tagged "Next.js Tailwind" with a "Visit Site" link. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- JSON-LD: 4 blocks — `ProfessionalService`, `WebSite`, `FAQPage` (4 questions), `Service` (name "Custom Website Development Services", serviceType "Website Development Agency", un-ID'd `Organization` provider). — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- Page claims "Core Web Vitals, JSON-LD schemas, and fast server-side rendering built into every page" and "ultra-fast page load times (Core Web Vitals)". — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)
- The exact phrase "website development services" appears in the title and Service schema; the H1 uses "Custom Website Development Agency."; no US/location wording in the body. — [https://www.syenxatech.com/website-development](https://www.syenxatech.com/website-development)

**Other pages, quick reference (all 200, all canonical to non-www, all 2 × H1)**
- /about — title "About Syenxa Tech | Leading AI Automation Agency" (48); H1 "About Syenxa Tech"; 485 words. — [https://www.syenxatech.com/about](https://www.syenxatech.com/about)
- /services — title "AI Automation Services & Digital Solutions | Syenxa Tech" (56); H1 "Everything you need to automate and grow ."; 553 words. — [https://www.syenxatech.com/services](https://www.syenxatech.com/services)
- /ai-chatbots — title "AI Chatbot Development & Support Solutions | Syenxa Tech" (56); H1 "AI Chatbots For Omnichannel Sales & Support."; 221 words; FAQPage + Service schema. — [https://www.syenxatech.com/ai-chatbots](https://www.syenxatech.com/ai-chatbots)
- /digital-marketing — title "AI Marketing Automation Agency & SEO Services | Syenxa Tech" (59); H1 "Digital Marketing & SEO Services"; 226 words; Service schema. — [https://www.syenxatech.com/digital-marketing](https://www.syenxatech.com/digital-marketing)
- /blog — title "AI Automation & Digital Growth Blog | Syenxa Tech" (49); H1 "Notes from the machines that answer ."; 268 words. — [https://www.syenxatech.com/blog](https://www.syenxatech.com/blog)
- /use-cases — title "AI Voice Agent & Chatbot Industry Use Cases | Syenxa Tech" (57); H1 "AI Voice & Chatbot Industry Use Cases."; 133 words. — [https://www.syenxatech.com/use-cases](https://www.syenxatech.com/use-cases)
- /contact — title "Hire AI Developers & Contact Syenxa Tech | AI Agency" (52); H1 "Let's Start a Conversation."; 95 words. — [https://www.syenxatech.com/contact](https://www.syenxatech.com/contact)
- Use-case detail pages: 224–298 words; meta descriptions only 64–84 characters. Blog posts: 261–291 words each; titles 62–70 characters. — [https://www.syenxatech.com/blog/top-benefits-of-ai-chatbots](https://www.syenxatech.com/blog/top-benefits-of-ai-chatbots)

### Inferences
- Both priority pages are far thinner than pages that typically rank for competitive US service terms; /ai-calling-agents at ~290 words of unique body copy has no pricing guidance, integrations detail, sample call, industries, compliance (TCPA/consent) content or evidence, all of which US buyers and search engines look for.
- Title/H1 term mismatch on /ai-calling-agents ("AI Voice Agents" vs "AI Calling Agents") splits the primary keyword; choosing "AI calling agents" as the lead term in title, H1 and first paragraph, with "AI voice agents" as the secondary, would align it with the stated target.
- FAQ answers that exist only in JSON-LD and not in visible page text conflict with Google's structured-data rule that marked-up content be visible to users; rendering the answers in the DOM (collapsed is fine if present in HTML) fixes both the policy risk and the thin-content problem.
- The `Service` nodes should reference the organisation by `@id` rather than declaring a second anonymous Organization, and add `areaServed: US`.
- 261–291-word blog posts with no Article schema, dates or authors are unlikely to rank or to support the service pages; they function as thin content.
- /website-development's own performance claims are contradicted by the measured home-page lab scores (section 5), which a technically minded prospect can check in seconds.

### Gaps
- No keyword-ranking, search-volume or competitor SERP data was gathered for "AI calling agents" or "website development services" (out of scope for a live-site crawl and not available without an SEO tool).
- Performance was not measured for these two pages individually.
- Portfolio "Visit Site" link targets on /website-development were not followed, so whether the showcased sites are live client work is unverified.
