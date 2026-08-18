# dbbetaff.com — Part 4: Content Architecture & SEO Pillar Pages

**Scope:** Build topical authority around iGaming affiliate marketing, sportsbook affiliate marketing, and the DBBET affiliate program specifically — a `/guides/` section with 2 new topical pillars + 8 supporting guides, plus strengthening the existing `/dbbet-affiliate-program/` commercial pillar. No redesign, no mass content, no country/doorway pages, no invented facts.

**Date:** 2026-08-19

---

## A. New Pages (11)

| URL | Type | Template |
|---|---|---|
| `/guides/` | Content hub / index | Full (header+footer) |
| `/guides/igaming-affiliate-marketing/` | Pillar #1 | Full |
| `/guides/sportsbook-affiliate-marketing/` | Pillar #2 | Full |
| `/guides/what-is-an-igaming-affiliate-program/` | Supporting | Lightweight |
| `/guides/how-igaming-affiliate-programs-work/` | Supporting | Lightweight |
| `/guides/cpa-vs-revshare/` | Supporting | Lightweight |
| `/guides/what-is-revshare/` | Supporting | Lightweight |
| `/guides/igaming-affiliate-tracking/` | Supporting | Lightweight |
| `/guides/affiliate-kpis/` | Supporting | Lightweight |
| `/guides/how-to-choose-an-igaming-affiliate-program/` | Supporting | Lightweight |
| `/guides/sportsbook-affiliate-programs/` | Supporting | Lightweight |

Pillar #3, `/dbbet-affiliate-program/`, already existed (Part 3) — not recreated, only strengthened (see §C). Exactly the 10 new URLs the spec listed, plus the required `/guides/` index. No additional pages were created.

## B. Modified Pages

- `/dbbet-affiliate-program/` — added cross-links to both new pillars and the most relevant supporting guides, plus a new "Learn the fundamentals first" section (see §C for detail)
- `/` (homepage) — added an "Affiliate Marketing Guides" card to the existing "DBBET Affiliate Resources" section; added `/guides/` to the footer "Program" column
- `/instruction/`, `/mob-cash/`, `/partner-benefits/` — added `/guides/` to the footer "Program" column (no other changes)
- `/blog/` — added `/guides/` to the footer "Affiliates" column; added one sentence in the intro linking to `/guides/` for readers who want the fundamentals first

## C. Files Changed

**New:**
- `valid-guide-slugs.json` — the allowlist of 10 real `/guides/<slug>/` routes (mirrors `valid-blog-slugs.json`'s role for `/blog/`)
- `guides/index.html`, `guides/igaming-affiliate-marketing/index.html`, `guides/sportsbook-affiliate-marketing/index.html`, and the 8 supporting guide files listed in §A

**Modified:**
- `functions/_middleware.js` — see the routing-bug fix below, this is the one "genuine bug discovered" change to the technical foundation the spec permits
- `dbbet-affiliate-program/index.html` — three additions: (1) a sentence in the "What is the DBBET affiliate program?" section pointing new readers to the iGaming Affiliate Marketing pillar first; (2) a note under the Hybrid commission model linking to CPA vs RevShare and What Is RevShare for the general mechanics; (3) a new "Learn the fundamentals first" section (4-card grid) placed right before the FAQ, linking down to both pillars and two key supporting guides. The bottom "Related" line was also updated to include the new pillar and CPA vs RevShare guide. The footer's Affiliates column now includes `/guides/`. No existing verified commercial content was rewritten.
- `index.html`, `instruction/index.html`, `mob-cash/index.html`, `partner-benefits/index.html`, `blog/index.html` — footer link additions only, as described in §B
- `sitemap.xml` — 11 new `<url>` entries appended (82 total, up from 71)

**A routing bug found and fixed while building this phase:** `functions/_middleware.js` rule 6 hard-404s any top-level path that isn't in an explicit allowlist. Unlike `/blog/<slug>/`, which the rule special-cases unconditionally, a brand-new `/guides/` tree with nested `/guides/<slug>/` URLs was not accounted for anywhere in that logic — every new page in this phase would have 404'd in production exactly like the Part 3 pages briefly did (same root cause, caught before deploying this time). Fixed by: adding `'guides'` to the `PAGES` set (for the `/guides/` index itself), adding a new rule 5b that mirrors the existing blog-slug validation (`/guides/<slug>/` must be in `valid-guide-slugs.json` or it hard-404s — this is what prevents typo/soft-404 crawl traps under `/guides/`), and adding an explicit `seg[0] === 'guides'` clause to rule 6's "known path" check. This is a routing-logic fix, not a redesign or behavior change to any existing route.

## D. Internal-Link Map

```
iGaming Affiliate Marketing (pillar)
    ├─ What Is an iGaming Affiliate Program?
    │     → How iGaming Affiliate Programs Work
    ├─ How iGaming Affiliate Programs Work
    │     → iGaming Affiliate Tracking, Affiliate KPIs
    ├─ CPA vs RevShare vs Hybrid
    │     → What Is RevShare?, Affiliate KPIs, DBBET Affiliate Program
    ├─ What Is RevShare?
    │     → CPA vs RevShare, Affiliate KPIs, DBBET Affiliate Program
    ├─ iGaming Affiliate Tracking
    │     → How Programs Work, Affiliate KPIs, DBBET Affiliate Program
    ├─ Affiliate KPIs
    │     → Tracking, CPA vs RevShare, DBBET Affiliate Program
    ├─ How to Choose an iGaming Affiliate Program
    │     → CPA vs RevShare, Affiliate KPIs, DBBET Affiliate Program
    └─ DBBET Affiliate Program (commercial pillar)

Sportsbook Affiliate Marketing (pillar)
    ├─ Sportsbook Affiliate Programs
    │     → Sportsbook Affiliate Marketing, CPA vs RevShare, DBBET Affiliate Program
    └─ DBBET Affiliate Program (commercial pillar)

/guides/ (index) → both pillars, all 8 supporting guides (grouped by pillar), DBBET Affiliate Program, /blog/
Homepage, Instruction, Mob-Cash, Partner Benefits, Blog → /guides/ (footer, on every full-template page)
DBBET Affiliate Program → both pillars + CPA vs RevShare + How to Choose (new "Learn the fundamentals" section)
```

Every supporting guide's breadcrumb (visible + schema) chains Home → Guides → its pillar → itself, and every guide carries a "&larr; Part of our [pillar] guide" link directly under its byline, plus a "Related" line near the end. Both pillars carry a "Guides in this series" card grid linking down to every one of their supporting guides plus the DBBET Affiliate Program. No anchor text is keyword-stuffed — every link uses the plain guide title or a short descriptive phrase.

## E. Metadata for Every New Page

All 11 new pages carry: a unique `<title>`, a unique meta description, exactly one `<h1>`, a self-referencing canonical, `lang="en"`, full OG/Twitter tags, and a visible + schema breadcrumb. No hreflang was added to any `/guides/` page — none has a real localized equivalent yet (Part 4 explicitly builds English first, per the spec), so adding hreflang would have violated the "no fake language URLs" rule established in Part 2. Verified programmatically (title/H1/canonical counts) across all 11 files with zero failures — see §G.

## F. Structured Data Implemented

Every new page uses the site's existing unified `@graph` pattern (shared `Organization`/`Person`/`WebSite` nodes by `@id`, referenced rather than duplicated):

- **Both pillars + `/guides/` index:** `Article` (pillars only) or `WebPage` (index), `BreadcrumbList`, `FAQPage` (pillars only, real Q&As matching the visible FAQ accordion)
- **8 supporting guides:** `Article`, `BreadcrumbList`, and `FAQPage` where a genuine FAQ was included (6 of 8 guides carry 2-3 real, non-padded FAQ entries; two shorter guides — How iGaming Affiliate Programs Work and iGaming Affiliate Tracking — carry FAQs; all 8 in fact include at least one FAQ pair)
- All `Article` nodes use `datePublished`/`dateModified` (2026-08-19, the date this content was actually written and verified against existing site facts) and attribute authorship to the real, existing `Person` node (Ray Truelead) — no new author was invented
- No reviews, ratings, or testimonials were added anywhere, consistent with the standing rule from Part 3

## G. Testing Results

| Test | Method | Result |
|---|---|---|
| JSON-LD validity, all new/modified pages | Parsed every `<script type="application/ld+json">` block | ✅ All valid |
| Unique title / single H1 / self-referencing canonical | Programmatic check, 17 files (11 new + 6 modified) | ✅ All pass; no duplicate titles across the set |
| Div/HTML structural balance | `<div>` vs `</div>` count | ✅ Clean on all new/modified files except the homepage's pre-existing, already-documented imbalance from before this phase (unaffected by this phase's edits) |
| Internal link resolution | Every `href="/..."` on new pages checked against real files on disk | ✅ 100% resolve, aside from `/favicon.ico`, which is a pre-existing sitewide pattern (already present on `/about/`, `/contact/`, `/editorial-policy/` before this phase) that resolves live at 200 despite not existing in the repo — not a new issue |
| Sitemap inclusion | Added 11 URLs, re-validated XML | ✅ Valid XML, 82 total URLs (was 71) |
| Local render check | Static server + browser screenshot on `/guides/` and `/guides/cpa-vs-revshare/` | ✅ Both render correctly with the site's real CSS — same header, colors, typography as every other page |
| Routing (`/guides/` and `/guides/<slug>/`) | Traced through `functions/_middleware.js` logic by hand for both valid and invalid slugs | ✅ Valid slugs pass through to the static file; an invalid `/guides/<typo>/` now correctly 404s (rule 5b) instead of soft-serving the homepage |
| 404 behavior for a bad guide slug | Same trace as above | ✅ Hard 404, matching the existing `/blog/<slug>/` soft-404 protection pattern |
| Existing routes unaffected | Confirmed the middleware changes are additive (new rule 5b + one new PAGES entry + one new rule-6 clause) with no changes to existing rules 1-4, 7, or any other PAGES/LANG_PAGES entries | ✅ No existing route's logic changed |

**Not yet run (pending deploy):** live HTTP 200 checks, live sitemap fetch, live robots/indexability headers, live structured-data re-fetch, live mobile-viewport screenshot (the same browser-tool limitation noted in the Part 3 report applies here — viewport meta tags are present and confirmed on all new pages, and every new page reuses the identical CSS classes/containers already used and working sitewide, but a direct mobile screenshot was not captured this pass), and live language-selector/navigation click-through. These will be run immediately after push and reported.

## H. Factual Information Requiring Manual Verification

Nothing new was invented in this phase — every commercial figure referenced (55% RevShare, up to $110 CPA, weekly $30 / monthly $100 payout minimums, bank transfer/e-wallet/crypto payment methods, the Asia/Africa/CIS/Middle East/LatAm GEO framing) is the same, already-verified data from Parts 2-3, and every new guide explicitly uses hedged language ("hypothetical," "example calculation," "confirm with the affiliate team") around anything not independently confirmed. Two specific items carried over from earlier reports remain open and are not re-litigated here:

1. **"Sub-Partner 10%" stat card** on the homepage — still not independently reconfirmed by Ray, unchanged this phase.
2. **Trustpilot `sameAs` link legitimacy** — still unverified, unchanged this phase.

Nothing in Part 4's new content depends on either of these, so neither blocks this phase.

## I. Remaining SEO Issues

1. **A pre-existing "45+ regions"-style claim still lives inside `blog-gen.cjs`'s generator source and, by extension, in a small number of already-published GEO-tagged blog posts** (e.g. `tier-1-vs-tier-3-affiliate-traffic`, `affiliate-programs-africa`) as internal-link anchor text ("DBBET's 45+ region coverage"). This is the same class of unverifiable specific-count claim that Part 3 already softened sitewide on the homepage/instruction/mob-cash/partner-benefits pages — the blog posts themselves were out of Part 3's scope and remain out of Part 4's scope (this phase only touches `/guides/` and the pages listed in §B). Flagging it here since it wasn't previously surfaced: a future pass should decide whether to soften this specific anchor text in the affected blog posts and regenerate them from `blog-gen.cjs`, or edit the published HTML directly.
2. **`/guides/` has no localized versions yet**, by design this phase (spec explicitly said English-first, no automatic translation). When language versions are approved, they'll need genuine translation (not machine translation) and proper hreflang clusters per the Part 2 multilingual rule — not started.
3. **Mobile layout not directly re-screenshotted** this phase (same tooling limitation as Part 3) — recommend a manual check before treating Part 4 as fully closed, though risk is low given 100% CSS/class reuse from already-mobile-tested templates.
4. **The two carried-over open items from §H** (Sub-Partner 10% stat, Trustpilot link) remain unresolved and unrelated to this phase.

---

*End of Part 4 report. All changes committed; awaiting Ray's go-ahead to push and deploy, consistent with this project's established pattern. Per the explicit "STOP after Part 4" instruction, no further phase (additional guides, country pages, backlink work, calculators) will begin without new authorization.*
