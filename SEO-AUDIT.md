# dbbetaff.com — SEO & Technical Audit (Phase 1: Audit Only)

**Site:** https://dbbetaff.com (DBBET Partners — an independent affiliate-recruitment site promoting the DBBET sportsbook/casino affiliate program; distinct from the DBBET player-facing operator sites, e.g. dbbetke.com, dbbetso.com, dbbet-abraham.com)
**Repo:** `C:\Users\cosev\Desktop\dbbetaff-live`
**Audit date:** 2026-08-18
**Method:** Read-only. No production code, content, or configuration was modified. Findings are based on live `curl -A "Mozilla/5.0"` requests against production plus direct inspection of source files (routing logic in `functions/_middleware.js`, build scripts, JSON configs, and rendered HTML). No file changes were made as part of this audit beyond creating this report.

---

## A. Executive Summary

The site's core technical hygiene is better than a typical legacy codebase would suggest: HTTP→HTTPS is force-redirected, trailing slashes are consistently canonicalized via 301, root-level junk paths hard-404 (no soft-404 shell), JSON-LD across all sampled pages is syntactically valid, image `alt` coverage is 100% on the pages sampled, and — notably — the site's disclosure of its own relationship to "DBBET" (i.e., that dbbetaff.com is an independent affiliate site, not the operator) is **clear and repeated** across `/about/`, `/affiliate-disclosure/`, and the sitewide footer. That disclosure is a genuine strength, not a gap.

However, five **Critical (P0)** issues need attention before any further SEO push, because they either actively damage crawlability/trust or carry legal/compliance exposure:

1. **54+ live URLs return a soft-duplicate of the homepage instead of a 404** — every combination of a "kept" language prefix (`/ru/`, `/bn/`, etc.) with a legal/utility page that was never built for that language (`/about/`, `/privacy/`, `/terms/`, etc.) silently serves the English homepage as a `200`.
2. **`og-image.png` is broken sitewide** — the URL referenced in `og:image`, `twitter:image`, and the Organization schema's `logo` field returns HTML (the homepage), not an image. Every social share of the site shows no preview image, and the site's own structured-data logo fails to resolve.
3. **Commission figures (55% RevShare, $110 CPA, $30 minimum payout) are stated as unqualified fact** in the page's meta description and structured data, with no citation and no way for this audit to verify they're current/accurate.
4. **A direct internal contradiction**: the homepage's `Service` schema states payments are "weekly," while the `FAQPage` schema on the *same page* states payments are "typically monthly." One of these is wrong.
5. **An unqualified "Licensed & trusted international brand" claim** appears twice on the homepage with no jurisdiction, regulator, or licence number named anywhere on the site.

None of these require large engineering effort — the P0 fixes are almost all trivial-to-small in complexity — but items 3–5 need Ray's factual input (real figures, real payment cadence, real licence status) before any copy can be safely corrected; they are not fixable by code alone.

Beyond the P0s, the audit surfaced a well-understood, cleanly-explainable multilingual situation: the site was deliberately cut from 17 to 9 live locales on 2026-07-10, with 5 of those 9 staged `noindex` pending review. That decision is implemented consistently in the live routing logic (`functions/_middleware.js`) — the *confusion* going into this audit (mismatched locale counts across different files) turned out to be stale documentation and a stale sitemap, not stale routing behavior. See Section G for the full picture.

---

## B. Critical Problems (P0)

### B1. Soft-duplicate-content trap: `{live-language}/{page-not-built-for-that-language}/`
- **URL/file:** `functions/_middleware.js` (routing rule 6, the "known page" allowlist check). Live examples verified: `/ru/about/`, `/ru/contact/`, `/ar/cookies/`, `/bn/terms/`, `/id/affiliate-disclosure/`, `/uz/privacy/`.
- **Current behavior:** The routing Function validates URL *shape* only — a live language prefix (from `KEPT_LANGS`) plus a slug that exists in the *global* `PAGES` allowlist (`about, affiliate-disclosure, app, contact, cookies, instruction, mob-cash, partner-benefits, privacy, terms`). It never checks whether that specific language actually has that page built. None of the 9 live language folders contain `about/`, `contact/`, `affiliate-disclosure/`, `cookies/`, `privacy/`, `terms/`, or a `blog/` folder on disk — only `index.html`, `instruction/`, `mob-cash/`, and `partner-benefits/` exist per language. Because the shape check passes, Cloudflare Pages' static-asset layer falls through and serves the **English homepage** as a live `200`, self-canonicalized to `https://dbbetaff.com/`. Verified independently across 6 different language/page combinations — not a one-off.
- **Why it matters:** This is a textbook soft-404/duplicate-content trap — exactly the failure mode the site's own routing logic (per its inline comments) was built to eliminate for unknown top-level slugs, but the fix was never extended to this specific combination. At minimum 54 URLs (9 languages × 6 missing page types) are affected, likely more once `/{lang}/blog/` combinations are counted. Any crawler or user reaching these via an old link, a scanner, or a guessed URL gets a confusing duplicate of the homepage instead of a proper 404, diluting crawl signal and creating a real (if currently low-traffic) duplicate-content footprint.
- **Recommended fix (describe only, not implemented):** Tighten routing rule 6 so it validates against a **per-language** page set (i.e., only `instruction`, `mob-cash`, `partner-benefits` for the 9 live languages, since those are the only pages that actually exist per-language) rather than the global `PAGES` set. Any other combination should fall through to the real 404 handler.
- **Priority:** P0
- **Complexity:** Small — the fix lives entirely inside `functions/_middleware.js`'s existing rule 6; no new pages need to be built.

### B2. `og-image.png` is not an image — breaks social previews and schema logo sitewide
- **URL/file:** `https://dbbetaff.com/og-image.png`, referenced in `og:image` / `twitter:image` on every page that has Open Graph tags, and as `Organization.logo` in the homepage's JSON-LD `@graph`.
- **Current behavior:** `curl -A "Mozilla/5.0" -s https://dbbetaff.com/og-image.png` returns HTTP `200` with `Content-Type: text/html; charset=utf-8`, and the response body is the homepage's `index.html` (starts with `<!DOCTYPE html><html lang="en">...`). No `og-image.png` file exists anywhere in the repo — this is almost certainly Cloudflare Pages' SPA-fallback behavior serving `index.html` for any unmatched static-asset path instead of a proper 404.
- **Why it matters:** Every social platform that generates a link-preview card (Facebook, LinkedIn, X, Telegram, WhatsApp, Slack) will fail to render an image for any shared dbbetaff.com URL that carries this og:image value — which is the homepage and every other page that has OG tags at all (see B/C on missing OG elsewhere). This directly hurts click-through on the site's primary sharing/virality channels (Telegram is explicitly one of the program's stated traffic sources). It also means the Organization schema's own `logo` field — used by Google for brand/knowledge-panel display — resolves to nothing.
- **Recommended fix (describe only):** Upload a real 1200×630 image at `/og-image.png` (or repoint the meta tags / schema to an existing valid image, e.g. the working `/favicon.svg` used elsewhere, though a proper raster OG image is preferable since not all platforms render SVG previews).
- **Priority:** P0
- **Complexity:** Trivial (one asset upload + confirming the existing meta-tag references resolve).

### B3. Commission/payout figures stated as unqualified, unsourced fact
- **URL/file:** Homepage `<head>` — `meta description`, `twitter:description`, and the `Service` schema's `offers.description` (`"Revenue Share up to 55 percent, CPA up to 110 USD per player, Hybrid plans available. Weekly payments with a 30 USD minimum payout."`).
- **Current behavior:** Specific percentages and dollar figures (55% RevShare, $110 CPA, $30 minimum payout) are presented as current fact, with only the word "up to" as a hedge — no link to full terms, no date-stamped source, no "terms and conditions apply" disclaimer near the figures themselves.
- **Why it matters:** This audit has no way to verify these figures against the real, current DBBET Partners commission schedule (per the brief's explicit instruction not to assume content is true). If these numbers are stale or inaccurate, a sub-affiliate who signs up expecting them and finds different real terms is a real trust/reputational/potential-legal (advertising-accuracy) risk — not just an SEO one.
- **Recommended fix (describe only):** Ray to confirm these figures against the actual current program terms before the next deploy; add a visible "terms apply" qualifier and/or link to full commission terms near any page or schema block that states specific numbers.
- **Priority:** P0
- **Complexity:** Trivial to edit the copy once the correct figures are confirmed — the blocker is factual verification, not implementation.

### B4. Internal contradiction: payment cadence ("weekly" vs. "typically monthly") on the same page
- **URL/file:** Homepage — `Service` schema (`offers.description`: *"Weekly payments with a 30 USD minimum payout"*) vs. `FAQPage` schema, Q3 (*"Payments are processed on a regular schedule (typically monthly, once the minimum threshold is reached)"*) and Q4 (*"...typically monthly..."*).
- **Current behavior:** Two different structured-data blocks on the identical page state two different, mutually exclusive payment cadences.
- **Why it matters:** Beyond the obvious trust problem for a human reader who notices, this is exactly the kind of internal inconsistency that can suppress a page's eligibility for rich results (Google's FAQ/Service rich-result guidelines expect structured data to be accurate and consistent with the rest of the page) and undermines AI-search citation confidence, since AI answer engines weight consistency as a trust signal.
- **Recommended fix (describe only):** Ray to confirm the actual, current payment cadence, then make both schema blocks (and any visible copy stating a cadence) agree.
- **Priority:** P0
- **Complexity:** Trivial once the correct cadence is confirmed.

### B5. Unqualified "Licensed" claim with no jurisdiction, regulator, or licence number
- **URL/file:** Homepage body copy — *"Licensed & trusted international brand"* (bullet list) and *"a trusted, licensed and player-loved brand"* (intro paragraph). Not present in the JSON-LD Organization schema (no licence/regulator field exists there at all).
- **Current behavior:** The word "Licensed" is used twice on the homepage with zero supporting detail — no named jurisdiction, no regulator, no licence number, anywhere on the site.
- **Why it matters:** This is the single highest compliance-risk item found in this audit. An unqualified licensing claim in the gambling-adjacent affiliate space is the kind of statement regulators and ad platforms (Google Ads, Meta) specifically scrutinize, and if DBBET's actual licensing varies by GEO (which is the case for at least one sibling GEO site in this same brand family, per prior work on this account), a blanket "Licensed" statement with no jurisdiction is potentially misleading to a visitor evaluating the program's legitimacy.
- **Recommended fix (describe only):** Ray to confirm DBBET's actual current licence(s)/jurisdiction(s) and either cite them specifically (e.g., "Licensed by the Curaçao Gaming Control Board, licence no. X") or soften the claim to something defensible without a specific citation.
- **Priority:** P0
- **Complexity:** Trivial to edit copy once the correct licensing facts are confirmed — this is a factual/legal decision, not an engineering one.

---

## C. High-Priority Problems (P1)

### C1. `www.dbbetaff.com` has no DNS record at all
- **URL/file:** DNS configuration (outside the repo, in the Cloudflare zone for dbbetaff.com).
- **Current behavior:** `curl` to both `http://www.dbbetaff.com/` and `https://www.dbbetaff.com/` fails with "Could not resolve host" — this is not a missing-redirect situation, the subdomain is entirely unresolvable.
- **Why it matters:** Not a ranking penalty (Google simply treats it as absent), but a real brand-trust/stray-link risk: anyone who types `www.` out of habit, or any external link/business card/ad using the `www.` form, gets a hard connection failure instead of landing on the working site.
- **Recommended fix (describe only):** Add a DNS record for `www` and a 301 redirect to the apex domain.
- **Priority:** P1
- **Complexity:** Trivial.

### C2. `fix-h1.cjs` — a real bug-fix script — is not wired into the build pipeline
- **URL/file:** `fix-h1.cjs` (repo root); `package.json`'s `scripts` block.
- **Current behavior:** This script exists specifically to correct a confirmed real bug: on `/partner-benefits/`, `/instruction/`, and `/mob-cash/`, the page-hero heading was originally emitted as `<h2>` instead of `<h1>`. The script patches this by finding the first `<h2>` inside the `page-hero` block and rewriting it to `<h1>`. It runs against files in `_preview/`, which `copy-to-root.cjs` then promotes to the live root. The fix **is currently holding live** (confirmed via curl — all three pages correctly show one `<h1>` today) — but `fix-h1.cjs` is **not referenced anywhere in `package.json`'s `scripts`**, meaning it was run manually, once, as an ad-hoc patch.
- **Why it matters:** If the underlying template that generates these three pages' hero section is ever regenerated or edited again, the original `<h2>`-instead-of-`<h1>` bug could silently recur with no automated step to catch or re-apply the fix before `copy-to-root.cjs` ships it live.
- **Recommended fix (describe only):** Either wire `fix-h1.cjs` into the build/copy pipeline as an automatic post-generation step, or (preferable) fix the root template that emits `<h2>` in the first place so the patch script becomes unnecessary.
- **Priority:** P1
- **Complexity:** Small.

### C3. Open Graph / Twitter Card metadata completely absent on `/about/`, `/blog/` index, and all blog posts
- **URL/file:** `about/index.html`, `blog/index.html`, and all sampled blog post files (e.g. `blog/dbbet-vs-mostbet/index.html`).
- **Current behavior:** Confirmed via case-insensitive search for `og:`/`twitter:` returning zero matches on each of these page types. The 7 static/language homepages sampled (home, partner-benefits, instruction, mob-cash, ru, ar, pt) all have complete, correct OG/Twitter blocks — the gap is specifically about-page and all blog content.
- **Why it matters:** Blog content is the site's primary organic-growth and shareable asset; sharing any blog post link on Telegram/LinkedIn/Facebook currently renders as a bare link with no title, description, or image card.
- **Recommended fix (describe only):** Add the same OG/Twitter block pattern already used on static/language pages to the about-page and blog-post templates. Likely a single shared head-template fix, since about/blog appear to be generated outside the main static/language templating path.
- **Priority:** P1
- **Complexity:** Small–medium (touches whatever template generates `/about/` and blog posts, which appears distinct from the main page template).

### C4. JSON-LD / structured data completely absent on `/about/` and `/blog/` index
- **URL/file:** `about/index.html`, `blog/index.html`.
- **Current behavior:** Zero `<script type="application/ld+json">` blocks found on either page — no Organization, WebPage, or any schema at all, in contrast to every other sampled page.
- **Why it matters:** These are two of the site's more entity/trust-relevant pages (About establishes who's behind the site; the blog index is a hub for the site's largest content asset) — leaving them with zero structured data is a missed, low-cost opportunity for entity consistency and rich-result eligibility.
- **Recommended fix (describe only):** Add at minimum WebPage + breadcrumb schema referencing the same `@id` nodes (`#org`, `#ray`) used elsewhere on the site.
- **Priority:** P1
- **Complexity:** Small.

### C5. Organization/Person schema drifts between static pages and blog posts
- **URL/file:** Compare the `@graph` block on `/`, `/partner-benefits/`, etc. against the flat `BlogPosting.publisher`/`author` objects on blog posts (e.g. `blog/dbbet-vs-mostbet/index.html`).
- **Current behavior:** Static/language pages use one consistent Organization definition (`@id: https://dbbetaff.com/#org`, `logo: .../og-image.png` [broken, see B2], `sameAs` includes the Trustpilot URL, linked `founder` reference to `#ray`). Blog posts instead embed a **second, different** Organization object with no `@id`, a different `logo` (`favicon.svg` — which at least resolves, unlike the static pages' broken reference), a different `description` string, no `sameAs`, and no `founder` link. Similarly, blog posts embed a full duplicate `Person` object inline (matching today's values, but not linked by `@id`) rather than referencing the sitewide `#ray` node.
- **Why it matters:** Google's Knowledge Graph and AI answer engines build entity confidence from seeing the *same* `@id` and consistent property values repeated sitewide. Two different, disconnected Organization definitions for the same brand — one of which has a broken logo — actively weakens that signal, and because the blog version is a literal copy rather than an `@id` reference, any future edit to the canonical Organization/Person data (e.g. correcting the logo) will silently fail to propagate to blog content.
- **Recommended fix (describe only):** Update the blog-post schema generator to reference `{"@id": "https://dbbetaff.com/#org"}` / `{"@id": "https://dbbetaff.com/#ray"}` instead of duplicating the full objects, ideally wrapped in the same `@graph` pattern used elsewhere.
- **Priority:** P1
- **Complexity:** Medium — requires locating and editing whichever function in the blog generator actually produces the live schema (see D-section note on `blog-gen.cjs`'s apparent stale/superseded function).

### C6. Primary affiliate/registration CTA links lack `rel="sponsored"`/`"nofollow"`
- **URL/file:** Homepage, both the header `JOIN NOW` CTA and the mobile sticky-bar `JOIN NOW` CTA — both point to `https://dbbet-manager.com/Ray` (confirmed via redirect chain to trigger a `refpa96317.com` → `partnersdbbet.com` affiliate-tracking flow).
- **Current behavior:** Both links carry `rel="noopener"` only. No `nofollow` or `sponsored`.
- **Why it matters:** Google's guidance for affiliate/commercial outbound links calls for `nofollow` or `sponsored` to avoid passing unearned ranking signal through paid/commercial links and to stay aligned with link-scheme policy. Low severity for current rankings, but a standard, easy compliance fix.
- **Recommended fix (describe only):** Add `sponsored nofollow` to the existing `rel` attribute on both CTA instances.
- **Priority:** P1
- **Complexity:** Trivial.

### C7. Blog-slug source-of-truth mismatch: `valid-blog-slugs.json` (40 entries) vs. actual `blog/` folder count (~85)
- **URL/file:** `valid-blog-slugs.json`, `blog/` directory.
- **Current behavior:** `valid-blog-slugs.json` contains 40 slug entries; the `blog/` directory on disk has roughly 85 subfolders. Roughly half of the physical blog folders are not represented in the file that (per its name and likely per the routing Function's slug-validation logic) is meant to be the authoritative list of valid posts.
- **Why it matters:** If `functions/_middleware.js`'s slug validation actually uses this file, up to ~45 real blog posts could be serving inconsistently (some sub-check in this audit found blog posts outside the sampled 3 loading fine, so the practical impact needs confirming) — either genuinely-valid posts are being treated as invalid somewhere in the pipeline, or the file is simply stale documentation for a subset (e.g. only newly-added or specially-tracked posts) and disk presence is what actually governs live behavior. This needs direct investigation of the Function's slug-check logic against this file before any fix is scoped.
- **Recommended fix (describe only):** Reconcile which list is authoritative; either regenerate `valid-blog-slugs.json` from the actual `blog/` directory, or confirm the routing logic doesn't depend on it being complete.
- **Priority:** P1
- **Complexity:** Small (investigation) → depends on findings for the actual fix.

### C8. No company registration, legal entity, or business address anywhere on the site
- **URL/file:** Searched homepage and `/about/` for "registered office," "company number," "Ltd," "LLC," "Limited," "registration number," "address:" — zero matches anywhere.
- **Current behavior:** The only named real-world identity on the entire site is "Ray Truelead, Head of Affiliates" (LinkedIn + Telegram). No registered business name, company number, or physical/registered address exists for dbbetaff.com as an entity.
- **Why it matters:** For a commercial site in the gambling-adjacent affiliate space that handles payout arrangements, the complete absence of any business registration/address is a trust-signal gap relevant both to Google's E-E-A-T evaluation and to a prospective affiliate's own due diligence before signing up. (Note: this pattern is common in the affiliate-marketing niche broadly and may reflect an intentional operator decision — flagging for Ray's awareness, not assuming it's wrong.)
- **Recommended fix (describe only):** Add a registered business name/jurisdiction line if one exists; if the site intentionally operates without a formal registered entity, that's a business decision for Ray, not something to paper over in code.
- **Priority:** P1
- **Complexity:** Small (content addition) — contingent on Ray confirming what, if anything, exists to disclose.

### C9. `sitemap.xml` is stale — not regenerated since the 2026-07-10 locale teardown
- **URL/file:** `sitemap.xml`.
- **Current behavior:** `lastmod` dates in the sitemap are ~6 weeks old relative to this audit. The sitemap currently lists only 4 non-English locales (ru, pt, fr, ar) — which, per the forensic trace of `functions/_middleware.js` and `build-langs.cjs`, is *consistent* with those being the only locales both live AND indexed (`index,follow`); the other 5 live locales (bn, uz, si, ur, id) are deliberately `noindex` pending review, so their absence from the sitemap is arguably correct as-is. However, the sitemap not having been regenerated since the teardown means it wasn't a deliberate, verified decision so much as a side effect of nobody re-running the sitemap generator — worth confirming it will be correctly regenerated (adding the 5 pending locales once they're approved for indexing) rather than needing another manual fix later.
- **Why it matters:** A stale sitemap is a process risk, not an active bug today — but it means the site currently has no automatic mechanism keeping the sitemap in sync with indexation decisions.
- **Recommended fix (describe only):** Re-run/verify the sitemap generator now, and confirm it's wired to regenerate automatically as part of the deploy pipeline (or establish a manual checklist step) so future locale/indexation changes propagate.
- **Priority:** P1
- **Complexity:** Small.

---

## D. Medium-Priority Problems (P2)

| # | Finding | URL/File | Why it matters | Recommended fix | Complexity |
|---|---|---|---|---|---|
| D1 | `template.html` uses a stale query-param hreflang scheme (`?lang=ru`) referencing 8 now-dead languages; confirmed **dead code** in production (redirects to a 404), but is the literal source `build-langs.cjs` reads | `template.html` | Documentation/maintenance trap for whoever next edits this file — doesn't reflect current `KEPT_LANGS`/`DROPPED_LANGS` reality | Update the hreflang block to match current live locales and drop the `?lang=` pattern | Trivial |
| D2 | `redirect-map.json`'s internal `"__note"` comment lists a stale dropped-language set (12 codes, including several that are actually live today) | `redirect-map.json` | Could mislead a future editor into re-dropping languages that were deliberately restored; the code itself (`_middleware.js`) is correct, only the comment is wrong | Update the comment to match `DROPPED_LANGS`/`KEPT_LANGS` in `_middleware.js` | Trivial |
| D3 | 8 dropped-language folders (az, es, fa, hi, ne, so, sw, tr) remain as physical static files in the deployed build, gated only by the edge routing rule | Repo root language folders | Not a live risk today (the 410 rule fires before static serving), but unnecessary deploy bloat and a latent risk if the routing Function is ever bypassed/misconfigured | Remove the 8 dead-language folders from the repo/deploy artifact for defense-in-depth | Small |
| D4 | `id` (Indonesian) locale has no entry in `seo-i18n.json`, so it silently serves English title/meta on what should be an Indonesian page | `seo-i18n.json`, `/id/` | A live locale is showing wrong-language metadata, undermining the point of localizing it at all | Add a real Indonesian entry to `seo-i18n.json` | Small |
| D5 | 3 blog meta descriptions exceed the ~155-160 char safe display length (worst: 220 chars on `/blog/dbbet-vs-mostbet/`) | Sampled blog posts | SERP truncation risk / Google may auto-generate a replacement snippet, undermining deliberately-written CTR copy | Trim to ≤160 chars | Trivial |
| D6 | `/about/` title is thin and generic ("About \| DBBET Partners", 22 chars, no keywords) — the weakest title on the site | `about/index.html` | Missed keyword/entity opportunity on a trust-relevant page | Rewrite with a more descriptive, keyword-aware title | Trivial |
| D7 | Icon `alt` text is present everywhere (100% coverage) but often generic single words ("target," "vision," "revenue") rather than descriptive | Sampled pages | Minor accessibility/content-quality refinement; not a gap, a polish item | Either write more descriptive alt text for content-bearing icons, or `alt=""` for purely decorative ones per WCAG practice | Small |
| D8 | No dedicated author bio page for "Ray Truelead" — blog bylines link to the generic `/about/` company page instead | Blog posts, `/about/` | Soft E-E-A-T gap; the link target is reasonable but isn't a true author-entity page | Build a real author page reusing the existing `#ray` Person schema content | Small |
| D9 | Images are sized via inline CSS (`style="width:...;height:..."`) rather than HTML `width`/`height` attributes | Sampled pages | Not a live CLS risk in practice (inline CSS reserves the box just as attributes would), but HTML attributes are the more portable/standard signal some tooling still checks for | Standardize to explicit HTML attributes | Trivial |
| D10 | Trustpilot review link exists only inside JSON-LD `sameAs`, not as a visible clickable link anywhere on the rendered page | Homepage | If intended as a visible trust signal it's currently invisible to users; also unverified whether the Trustpilot profile is real/active (see D11) | Add a visible link if the profile is confirmed real | Trivial |
| D11 | No visible embedded reviews/testimonials found anywhere (positive: no fake ones either) — but the cited Trustpilot profile's authenticity/standing wasn't verifiable from the codebase | Homepage (schema only) | Confirm the Trustpilot profile is real and in good standing before continuing to cite it in schema | Ray to verify directly on Trustpilot | Trivial (verification only) |
| D12 | `/about/`, `/affiliate-disclosure/`, `/cookies/` are all thin content (roughly 110-150 words each) using an identical bare template | Those 3 pages | Thin pages rarely rank on their own; for the disclosure page specifically, thinness can read as low-effort compliance rather than genuine transparency | Expand with more substantive detail (team background, concrete disclosure mechanics) | Small |
| D13 | Responsible-gambling messaging exists sitewide in the footer and more substantively on `/affiliate-disclosure/` (which names GamCare/BeGambleAware), but is absent from the homepage's main visible body content near the CTA buttons | Homepage | Standard practice to have it in the footer, but not reinforced near the actual conversion points | Consider a brief RG reference near primary CTAs, not just the footer | Trivial |
| D14 | "There is no upper limit — the more engaged players you bring, the more you earn" (FAQ answer) edges toward income-guarantee-adjacent phrasing, even though it's hedged elsewhere by "depends on quality of traffic" | Homepage FAQ schema | Worth a compliance read given how prominently it answers "How much can I earn?" | Soften slightly or add an explicit disclaimer nearby | Trivial |
| D15 | Homepage claims "45+ regions and growing," "tens of thousands of players," "thousands of partners already earning," and "round-the-clock support" — all unsourced scale/SLA claims | Homepage | Same unverifiable-claim pattern as the P0 commission figures, lower stakes since these are softer marketing statements rather than specific dollar/percent figures | Either source these figures or soften to non-specific language | Trivial |
| D16 | `blog-gen.cjs`'s `blogSchema()` function (as read) appears to omit `datePublished`/`dateModified` and use `author = publisher`, but the **live output is actually correct** (has both dates, distinct Person author) — meaning either a different, unread code path is what's actually live, or the file was hand-patched post-generation | `blog-gen.cjs` | Live output is fine today; the risk is a future "fix" based on the misleading function actually regressing working behavior | Confirm which code path is truly active in production and document/consolidate it | Needs follow-up read (file exceeds a single read pass at ~82KB) |

---

## E. Low-Priority Improvements

| # | Finding | Why it matters | Recommended fix | Complexity |
|---|---|---|---|---|
| E1 | The `?lang=` query parameter is fully inert/dead — confirmed to have zero effect on served content (only read by the unused Angular `app/` scaffold, which isn't part of the live build) | No functional risk, but it's a vestigial artifact worth cleaning up or repurposing | Remove references to it, or wire it as a genuine redirect-to-path-based-URL convenience for any old external links that might use it | Trivial |
| E2 | The `app/` directory and Angular dependencies in `package.json` (`@angular/core`, `rxjs`, `zone.js`, etc.) are entirely unused by the actual production build | Dead weight in the repo; not an SEO issue, but a codebase-hygiene one that could confuse future contributors into thinking this is an Angular SPA (which has real SEO implications if anyone tried to "fix" something by leaning into it) | Remove the unused Angular scaffold, or clearly document that it's vestigial | Small |
| E3 | No breadcrumb UI is visibly rendered on static pages (schema-only breadcrumb), while blog posts do show a visible breadcrumb trail | Minor UX/consistency inconsistency, not an indexing issue since the schema itself is present and correct | Add a matching visible breadcrumb UI to static pages for consistency | Small |

---

## F. Current URL Inventory

### Static pages (English root — all confirmed live, `200`, `index,follow`)
`/`, `/about/`, `/affiliate-disclosure/`, `/contact/`, `/cookies/`, `/instruction/`, `/mob-cash/`, `/partner-benefits/`, `/privacy/`, `/terms/`

### Blog
`/blog/` (index) + individual post slugs. `valid-blog-slugs.json` lists 40 entries; the `blog/` directory on disk holds roughly 85 subfolders (see C7 — reconciliation needed). 37 legacy/duplicate blog-slug 301 mappings exist in `redirect-map.json`.

### Per-language pages that physically exist (only 3, for each of the 9 live languages)
`/{lang}/`, `/{lang}/instruction/`, `/{lang}/mob-cash/`, `/{lang}/partner-benefits/`

### Confirmed dead/gone
`/az/`, `/es/`, `/fa/`, `/hi/`, `/ne/`, `/so/`, `/sw/`, `/tr/`, and all their sub-paths → live `410 Gone` with `x-robots-tag: noindex`.

### Redirect behavior (all clean, no findings)
- HTTP → HTTPS: `301` forced.
- Trailing slash: no-slash form always `301`s to the slash form; slash form is what canonical tags self-reference.
- `index.html` suffix: `308` collapses to the canonical directory URL.
- Case sensitivity: capitalized variants (`/Partner-Benefits/`) return a clean `404`, no duplicate served.
- `www.dbbetaff.com`: unresolvable (see C1).
- `?lang=` query param: inert, serves identical content, no duplicate-URL risk (see E1).

---

## G. Current Multilingual Inventory

**The full picture, reconciled from `functions/_middleware.js` (routing, authoritative), `build-langs.cjs` (generation), `seo-i18n.json`, `sitemap.xml`, and live curl checks:**

On 2026-07-10 the site was deliberately cut from 17 to 9 live locales via the edge routing Function. The next day, 5 of those were re-added as staged, `noindex` pages pending review.

| Language | Folder on disk | Live status | Meta robots | In sitemap.xml | In `seo-i18n.json` |
|---|---|---|---|---|---|
| en (root) | — | 200 | index,follow | ✅ | — |
| ru | ✅ | 200 | index,follow | ✅ | ✅ |
| ar | ✅ | 200 | index,follow | ✅ | ✅ |
| fr | ✅ | 200 | index,follow | ✅ | ✅ |
| pt | ✅ | 200 | index,follow | ✅ | ✅ |
| bn | ✅ | 200 | **noindex**,follow | ❌ (correct, given noindex) | ✅ |
| uz | ✅ | 200 | **noindex**,follow | ❌ (correct, given noindex) | ✅ |
| si | ✅ | 200 | **noindex**,follow | ❌ (correct, given noindex) | ✅ |
| ur | ✅ | 200 | **noindex**,follow | ❌ (correct, given noindex) | ✅ |
| id | ✅ | 200 | **noindex**,follow | ❌ (correct, given noindex) | ❌ **missing (D4)** |
| az | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| es | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| fa | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| hi | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| ne | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| so | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| sw | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |
| tr | ✅ (dead weight) | **410** | n/a | ❌ | ✅ (stale) |

**hreflang correctness:** confirmed fully reciprocal and correct across all 9 live locales — every live page's hreflang block references exactly the 9 live locales plus `x-default`, and every referenced URL resolves live. This part of the implementation is solid.

**Duplicate-content translation quality (English vs. Russian vs. Arabic, spot-checked):** genuine, distinct per-language content — the Russian and Arabic homepages each add a locale-specific traffic section beyond a straight translation of the English page, not stub/copy-paste pages.

**The one real routing gap in this system is B1** (soft-duplicate at `{live-lang}/{page-not-built-for-that-language}/`), not the locale count itself — the 9-live/8-dead/4-indexed split is a coherent, intentional design once traced to its source.

---

## H. Current Metadata Inventory

*(Sampled: homepage, `/partner-benefits/`, `/instruction/`, `/mob-cash/`, `/about/`, `/blog/` index, 3 blog posts, `/ru/`, `/ar/`, `/pt/` — 12 pages total)*

| Page | Title (chars) | Description (chars) | Canonical | H1 count | OG present | JSON-LD present |
|---|---|---|---|---|---|---|
| `/` | 56 | 162 | ✅ self-ref | 1 | ✅ | ✅ (Organization/Person/WebSite/WebPage/BreadcrumbList/FAQPage/Service) |
| `/partner-benefits/` | 53 | 148 | ✅ self-ref | 1 | ✅ | ✅ |
| `/instruction/` | 58 | 148 | ✅ self-ref | 1 | ✅ | ✅ |
| `/mob-cash/` | 54 | 148 | ✅ self-ref | 1 | ✅ | ✅ |
| `/about/` | 22 (thin, D6) | 141 | ✅ self-ref | 1 (thin — "About") | ❌ **missing (C3)** | ❌ **missing (C4)** |
| `/ru/` | 64 | 157 | ✅ self-ref | 1 | ✅ | ✅ |
| `/ar/` | 69 | 158 | ✅ self-ref | 1 | ✅ | ✅ |
| `/pt/` | 70 | 153 | ✅ self-ref | 1 | ✅ | ✅ |
| `/blog/` (index) | 51 | 185 (over cap, D5) | ✅ self-ref | 1 | ❌ **missing (C3)** | ❌ **missing (C4)** |
| `/blog/dbbet-vs-mostbet/` | 61 | 220 (over cap, D5) | ✅ self-ref | 1 | ❌ **missing (C3)** | ✅ (BlogPosting, but schema drift — C5) |
| `/blog/how-to-become-a-betting-affiliate/` | 56 | 147 | ✅ self-ref | 1 | ❌ **missing (C3)** | ✅ (BlogPosting, schema drift — C5) |
| `/blog/igaming-affiliate-programs/` | 82 (over cap) | 175 (over cap, D5) | ✅ self-ref | 1 | ❌ **missing (C3)** | ✅ (BlogPosting, schema drift — C5) |

No duplicate titles or duplicate meta descriptions found across the 12 pages sampled (full-site duplicate risk across the ~85 blog posts not individually verified — flagged as a follow-up scope item, not a known issue).

**Image `alt` coverage:** 33/33 sampled `<img>` tags (100%) have non-empty `alt` text — no empty, missing, or filename-as-alt instances found.

**Image optimization:** all sampled content images are `.webp`, ≤20KB each — no oversized-image issues found.

---

## I. Recommended Architecture (target state — description only, not implemented)

1. **Routing:** Extend `functions/_middleware.js`'s page-validation rule to check per-language page existence (not just a global slug allowlist), so `{lang}/{page-not-built}` correctly 404s instead of soft-serving the homepage.
2. **Schema:** Move blog-post schema generation onto the same `@graph`/`@id`-reference pattern already used on static/language pages, so there is exactly one Organization and one Person node sitewide, referenced by `@id` everywhere rather than duplicated.
3. **Sitemap:** Wire sitemap regeneration into the deploy pipeline (or a documented manual step) so it can never drift out of sync with `KEPT_LANGS`/indexation decisions again the way it did after the 2026-07-10 teardown.
4. **Blog slug source of truth:** Consolidate to one authoritative list (`valid-blog-slugs.json` regenerated from disk, or disk treated as authoritative and the JSON retired) so there's no ambiguity about which of the ~85 blog folders are "real."
5. **Metadata coverage:** Bring `/about/` and blog content up to parity with the rest of the site (OG/Twitter + JSON-LD), likely via a shared head-partial used by all page-generation paths rather than three separate hand-rolled approaches.
6. **Dead-language cleanup:** Remove the 8 dropped-language folders from the deploy artifact for defense-in-depth, since they currently rely solely on the edge routing rule to stay unreachable.
7. **Trust/compliance copy:** Once Ray confirms the real commission figures, payment cadence, and licensing facts, those should live in exactly one place (ideally a small structured data source, similar to how `seo-i18n.json` centralizes locale strings) so the Service schema, FAQ schema, and visible copy can never drift out of sync with each other again the way B4 shows they already have.

---

## J. Recommended Implementation Order

**Phase 2a — Critical (P0), do first, all trivial-to-small complexity:**
1. Fix `og-image.png` (upload a real asset) — unblocks social sharing and schema logo immediately.
2. Tighten `_middleware.js` rule 6 to close the soft-duplicate trap (B1).
3. Ray confirms real commission figures, payment cadence, and licensing facts — this gates B3, B4, B5 and should happen in parallel with the engineering items above, since it's the longest-lead-time item (a factual/business decision, not code).
4. Correct the copy/schema for B3–B5 once facts are confirmed.

**Phase 2b — High priority (P1):**
5. Add `www` DNS + redirect.
6. Wire `fix-h1.cjs` into the build pipeline (or fix the source template directly).
7. Add OG/Twitter + JSON-LD to `/about/` and blog templates.
8. Unify Organization/Person schema on blog posts to reference the sitewide `@id` nodes.
9. Add `rel="sponsored nofollow"` to the two affiliate CTA links.
10. Investigate and reconcile the blog-slug source-of-truth mismatch (C7).
11. Add company/registration disclosure if applicable (Ray's call).
12. Regenerate `sitemap.xml` and confirm it's wired into the deploy process going forward.

**Phase 2c — Medium (P2) and Low (E), batch together once P0/P1 are shipped:**
13. `template.html`/`redirect-map.json` documentation cleanup (D1, D2).
14. Remove dead-language folders from the deploy artifact (D3).
15. Add the missing `id` locale entry to `seo-i18n.json` (D4).
16. Trim the 3 over-length blog meta descriptions (D5); rewrite the `/about/` title (D6).
17. Polish icon alt text (D7); build a real author page for Ray (D8); standardize image sizing attributes (D9).
18. Resolve the Trustpilot link visibility/verification question (D10, D11).
19. Expand thin content on `/about/`, `/affiliate-disclosure/`, `/cookies/` (D12).
20. Reinforce RG messaging near CTAs (D13); soften unsourced scale claims and the "no upper limit" phrasing (D14, D15).
21. Resolve the `blog-gen.cjs` stale-function question (D16) — confirm which code path is actually live and document it.
22. Low-priority cleanup: retire the dead `?lang=` param handling and the unused Angular scaffold (E1, E2); add visible breadcrumb UI to static pages (E3).

---

*End of Phase 1 audit. No code was changed. This report exists solely at `SEO-AUDIT.md` in the repo root, per the audit brief's instruction.*
