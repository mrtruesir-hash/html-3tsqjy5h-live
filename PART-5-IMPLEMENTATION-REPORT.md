# dbbetaff.com — Part 5: SEO Tools, Original Data & Linkable Assets

**Scope:** Two client-side affiliate calculators, a `/tools/` index, an original-research `/research/` section with one sourced commission benchmark page. No redesign, no mass content, no country pages, no invented DBBET or competitor data.

**Date:** 2026-08-19

---

## 1–2. The Two Calculators

Both live under `/tools/` as specified:

- **`/tools/affiliate-revenue-calculator/`** — accepts clicks, registration rate, registrations (override), FTD rate, FTDs (override), CPA amount, RevShare %, average monthly NGR/player, months, and optional hybrid CPA/RevShare. Every field is optional; the calculator works from whatever combination is filled in (direct registrations/FTDs, or derived from rates). Outputs estimated registrations, estimated FTDs, CPA revenue, RevShare revenue, Hybrid revenue (each only shown if its inputs are present), revenue-per-click, and effective CPA per model.
- **`/tools/cpa-vs-revshare-calculator/`** — accepts FTDs, CPA/FTD, average monthly NGR/player, RevShare %, months, and optional hybrid CPA/RevShare. Outputs CPA income, RevShare income, Hybrid income, the dollar difference between CPA and RevShare, and the break-even point in months — plus a lightweight CSS bar-chart comparison (no charting library).

**All calculations are 100% client-side** — a single inline `<script>` per page, vanilla JS, no framework, no network calls, no server storage of any kind. Both pages carry a `<noscript>` notice, since a calculator inherently requires JS to function. Every result panel is wrapped in `aria-live="polite" role="status"` so screen readers announce new results; every input uses a real `<label for>`; the form submits on Enter (native `<form>`/`<button type="submit">`), so both are keyboard-operable without any custom key handling. Both display a `Show the formulas used` `<details>` block making every calculation transparent, and both carry the exact disclaimer text specified:

> "These calculations are estimates for planning purposes only. Actual affiliate earnings depend on the affiliate agreement, player activity, traffic quality, deductions, attribution rules and other commercial terms."

**Verified against hand-computed examples before shipping** (see §G) — both tools' live JS output matched the manually-derived example numbers exactly.

## 3. Tool UX

Both pages reuse the site's existing dark palette, typography and container patterns (no new visual system) with a small addition of `.calc-field`/`.calc-grid`/`.results-box`/`.bar-*` CSS scoped to these two pages only. Layout is a responsive `repeat(auto-fit,minmax(...))` grid, matching the pattern already used across guides/pillars, so it reflows naturally on mobile. Results are labeled "Example / estimate" via a visible tag at the top of every result panel. No charting library was added — the CPA vs RevShare comparison uses plain `<div>` bars with a JS-computed width percentage (~15 lines total).

## 4. SEO Content Around the Tools

Both tool pages include the exact section list requested (What is affiliate revenue / How CPA is calculated / How RevShare is calculated / How Hybrid is calculated / What FTD means / Why actual earnings differ / Example calculation / FAQ for the revenue calculator; the equivalent CPA/RevShare/Hybrid-definitions set for the comparison calculator). Content is intentionally short and non-repetitive — the calculator itself is the primary value, and each section is 1–3 sentences that explain a concept the calculator uses, not padding.

## 5. Structured Data

Both tool pages and the tools index use only the schema types the spec authorized: `WebPage` (or the page's own type), `BreadcrumbList`, `SoftwareApplication` (on the two calculators only — `applicationCategory: BusinessApplication`, `operatingSystem: Any (runs in browser)`, `offers: {price: 0}`, which is a legitimate, accurate description of a free browser-based tool, not an invented schema use), and `FAQPage` with real, non-padded Q&As matching the visible FAQ accordion exactly. No ratings, reviews, or aggregate ratings anywhere.

## 6. Internal Linking

Implemented exactly the examples given, plus the reverse direction where natural:

- `/guides/cpa-vs-revshare/` → links to the CPA vs RevShare Calculator inline (in the break-even example) and in its Related row, plus a new link to the research benchmark
- `/guides/igaming-affiliate-marketing/` (pillar) → Affiliate Revenue Calculator (Revenue calculation section) and CPA vs RevShare Calculator (Hybrid commissions section) — both tools, contextually placed, plus both in the closing "See also" row along with `/research/`
- `/guides/sportsbook-affiliate-marketing/` (pillar) → Affiliate Revenue Calculator (Conversion rates section + closing "See also" row)
- `/dbbet-affiliate-program/` → CPA vs RevShare Calculator (one link, inside the existing Hybrid-model paragraph, where it genuinely helps a reader compare models) and the Commission Benchmark research page (added to the existing "Learn the fundamentals first" card grid)
- New pages link back appropriately: both calculators link to each other, to `/guides/cpa-vs-revshare/`, `/guides/what-is-revshare/` (revenue calculator only), and to `/dbbet-affiliate-program/`; `/tools/` and `/research/` link to each other and to `/guides/`
- Sitewide footer ("Affiliates" column) on all 9 full-template pages (`/`, `/instruction/`, `/mob-cash/`, `/partner-benefits/`, `/blog/`, `/dbbet-affiliate-program/`, `/guides/`, both guide pillars) now includes `/tools/` and `/research/`, matching the pattern already established for `/guides/` in Part 4

No page received more than 2–3 new contextual links — kept deliberately short of a "link farm."

## 7. Tools Index Page

`/tools/` explains DBBETAFF provides free affiliate marketing tools, with crawlable HTML `<a>` cards (not JS-rendered) linking to both calculators plus a pointer to `/guides/` and `/research/`.

## 8–9. Original Data / Research Section

`/research/` (index) and `/research/igaming-affiliate-commission-benchmark/` were created. The research page distinguishes **four explicit data-quality categories** (verified first-party / publicly available / third-party reported / requires verification) and labels every row of its comparison table accordingly with a colored badge, source citation, and "date checked."

**For DBBET specifically:** figures are reused from this session's already-verified terms (55% RevShare exact-max, up to $110 CPA as a stated ceiling, weekly $30-min/monthly $100-min payout, payment methods) — the same data already published on `/dbbet-affiliate-program/`, not re-derived or newly invented. **A reusable data structure was created**: `dbbet-verified-terms.json` at the repo root, holding every DBBET term as a structured object with `model`/`rate`/`notes`/`data_type`/`last_verified`/`source` fields (plus GEO, payment frequency, payment methods, traffic restrictions, and a `_meta` block documenting the update process). This file is the intended single source of truth going forward.

**Honesty note on the "reusable data structure":** this site has no live templating/build pipeline (Node isn't in this environment's PATH and nothing here runs a generator at request time) — everything is static HTML. So `dbbet-verified-terms.json` is a genuinely structured, updatable source of truth, but updating it does **not** automatically regenerate the HTML table; the JSON and the table's DBBET row currently match because they were populated from the same values in the same pass, and any future change requires editing both. This is documented in the JSON's own `_meta.update_process` field so it isn't overstated as more automated than it is.

## Competitor Data — How It Was Sourced (not invented)

Per the explicit "do not invent competitor data" instruction, three competitor programs already referenced elsewhere on this site (Mostbet, Parimatch, Royal Partners — from the existing `dbbet-vs-mostbet` / `dbbet-vs-parimatch` / `dbbet-vs-royal-partners` blog comparisons) were researched via live web search and fetch:

- **Mostbet Partners**: reported RevShare 30–60%, CPA $20–$220 (GEO-dependent), sourced from statsdrone.com and Mostbet's own regional marketing page. Labeled **third-party reported**.
- **Parimatch Affiliates**: reported RevShare up to 45%, CPA up to $300 (Tier-1). Attempted to fetch Parimatch's own official domain (pmaffiliates.com) directly — it returned a 403 (blocked). Labeled **third-party reported**, sourced from aggregator listings only.
- **Royal Partners**: reported figures varied significantly across sources ($90–$700 CPA, 20–60% RevShare). Attempted to fetch royal.partners directly — also 403. Rather than pick one number from disagreeing sources, the table shows the full reported range and this row is labeled **requires verification**, with the disagreement itself called out as a limitation.

Nothing was estimated or guessed for any competitor — every figure traces to a specific cited URL with a checked date, and where sources disagreed or couldn't be confirmed, that uncertainty is shown rather than resolved by picking a number.

## 10–11. Research Page Structure & Linkability

The page includes methodology, definitions (CPA/RevShare/Hybrid), the comparison table, a Sources section (one citation per program), a Limitations section, Methodology Notes explaining why per-row dates matter more than a single page-level update date, and an FAQ. `Published`, `Last updated`, and `Data verification date` are all shown in the byline. Designed to be citable: clean scrollable table, concise definitions, explicit source URLs, and a stated preference that anyone citing this page cite the specific row's date/source rather than the page-level date.

---

## A. Files Changed

**New:**
- `valid-tools-slugs.json`, `valid-research-slugs.json` — routing allowlists (same pattern as `valid-guide-slugs.json`)
- `dbbet-verified-terms.json` — DBBET's structured, reusable verified-terms data
- `tools/index.html`, `tools/affiliate-revenue-calculator/index.html`, `tools/cpa-vs-revshare-calculator/index.html`
- `research/index.html`, `research/igaming-affiliate-commission-benchmark/index.html`

**Modified:**
- `functions/_middleware.js` — routing extended for `/tools/` and `/research/` (see below)
- `dbbet-affiliate-program/index.html`, `guides/cpa-vs-revshare/index.html`, `guides/igaming-affiliate-marketing/index.html`, `guides/sportsbook-affiliate-marketing/index.html`, `guides/index.html` — contextual links added per §6
- `index.html`, `instruction/index.html`, `mob-cash/index.html`, `partner-benefits/index.html`, `blog/index.html` — footer link additions only
- `sitemap.xml` — 5 new URLs appended (87 total, up from 82)

**Routing fix applied proactively this time:** having hit the identical `PAGES`-allowlist gap in both Part 3 and Part 4 (each time discovered only after deploying), this phase's middleware changes were written and locally verified *before* the first push — `'tools'`/`'research'` added to `PAGES`, two new rules (5c, 5d) mirroring the existing `/blog/`/`/guides/` soft-404 protection for `/tools/<slug>/` and `/research/<slug>/`, and matching clauses added to rule 6's "known path" check. Purely additive; no existing rule changed.

## B. Routes Created

`/tools/`, `/tools/affiliate-revenue-calculator/`, `/tools/cpa-vs-revshare-calculator/`, `/research/`, `/research/igaming-affiliate-commission-benchmark/` — exactly the 5 URLs the spec required, nothing extra.

## C. Metadata

All 5 new pages: unique title, unique meta description, single H1, self-referencing canonical, full OG/Twitter tags, visible + schema breadcrumb. No hreflang (English-only, no localized equivalents, consistent with the `/guides/` precedent from Part 4).

## D. Structured Data Implemented

See §5 above. `Organization`/`Person`/`WebSite` nodes are shared by `@id` reference exactly as established sitewide; no duplicate canonical entities were created.

## E. Testing Results

| Test | Method | Result |
|---|---|---|
| JSON-LD validity | Parsed every `<script type="application/ld+json">` on all new/modified pages | ✅ All valid |
| JS syntax sanity | Brace/paren balance check on both calculators' inline `<script>` blocks | ✅ Balanced |
| **Calculator correctness** | Loaded both tools locally, injected the exact worked examples already published in the guides (2,000 clicks/6%/30% → $3,240 CPA / $648 RevShare; 30 FTDs/$100 CPA/$50 NGR/40%/6mo → $3,000 / $3,600 / 5.0-month break-even), submitted via real DOM events | ✅ Live output matched hand-computed values exactly on both tools |
| Visual render | Browser screenshot of `/tools/affiliate-revenue-calculator/`, `/tools/cpa-vs-revshare-calculator/` (incl. the bar chart), `/research/igaming-affiliate-commission-benchmark/` (incl. the comparison table) | ✅ All render correctly with the site's existing visual identity |
| Title/H1/canonical uniqueness | Programmatic check across all 5 new + 10 modified pages | ✅ All pass, no duplicates |
| Div/HTML structural balance | Count check | ✅ Clean except the homepage's pre-existing, already-documented imbalance (unrelated to this phase) |
| Internal link resolution | Every `href="/..."` on the 5 new pages checked against real files on disk | ✅ 100% resolve |
| Sitemap inclusion | Added 5 URLs, re-validated XML | ✅ Valid, 87 total URLs |
| Routing (`/tools/`, `/research/` + nested slugs) | Traced middleware logic by hand for valid and invalid slugs under both trees | ✅ Valid slugs pass through; invalid `/tools/<typo>/` or `/research/<typo>/` correctly 404 |

**Not yet run (pending deploy):** live HTTP 200 checks, live sitemap fetch, live structured-data re-fetch, live mobile-viewport screenshot (same tooling limitation noted in Parts 3–4), live keyboard-navigation click-through.

## F. Remaining Issues

1. **`dbbet-verified-terms.json` is not wired to auto-generate the HTML table** — it's a genuinely structured, documented source of truth, but this static site has no build step to consume it automatically; future updates require editing both files by hand (documented in the JSON's own `_meta` field so this isn't overstated).
2. **Parimatch's and Royal Partners' official affiliate domains both blocked automated fetch (403)** — their benchmark rows rely on third-party aggregators only; Royal Partners' row is explicitly marked "requires verification" due to significant disagreement between sources ($90–$700 CPA). A manual visit to their affiliate signup flow (which a bot-detection-blocked fetch can't do) would be needed to upgrade either row.
3. **The benchmark currently covers 4 programs** — deliberately not padded further this phase; expanding it is a natural candidate for a future, separately-authorized phase.
4. Carried-over open items from Parts 3–4 (Sub-Partner 10% stat, Trustpilot link legitimacy, the residual "45+ regions" anchor text in a couple of old blog posts, `/guides/` translations) remain unresolved and unrelated to this phase.

---

*End of Part 5 report. All changes committed; awaiting Ray's go-ahead to push and deploy.*
