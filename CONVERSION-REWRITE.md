# Conversion Rewrite — Change List & Revised Copy

Status: DRAFT for review. Nothing published. Edit at source in template.html page sections (page-affiliate-hub, page-partner-benefits, page-instruction, page-mob-cash); the per-language + root files are build artifacts.

Independent-affiliate, 18+/responsible-gambling, and "not the official DBBET site" disclaimers are KEPT on every page (currently in the footer). Do not remove them.

## UTM scheme for every CTA -> join link

Base join link stays: https://dbbet-manager.com/Ray
Append: ?utm_source=dbbetaff&utm_medium=cta&utm_campaign=PAGE&utm_content=PLACEMENT

- utm_source = dbbetaff (always)
- utm_medium = cta (buttons/links) or join-bar (sticky mobile bar)
- utm_campaign = home | partner-benefits | instruction | mob-cash
- utm_content = hero | mid | footer | faq | niche-sports | niche-casino | dashboard | agent | blog-card (describes the exact placement)

Example: https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=home&utm_content=hero

Implementation note: add a tiny helper in script.js (joinUrl(campaign,content)) so all CTAs build the URL consistently, or hard-code the full URL per button. Telegram @Ray_Lead links can carry ?start=dbbetaff-PAGE if tracking is wanted there too.
---

## 1) HOMEPAGE (page-affiliate-hub)

### Problems today
- Opens corporate ("About DBBET / Our History / Values & Mission / Our Team") instead of answering "what do I get and why now".
- Only 2 JOIN NOW CTAs, no UTMs.
- Blog is only in nav/footer, never surfaced in the body.
- "Our Team" cards use placeholder initials (AM, MK, 24) in .avatar = low-trust filler.

### Change list
1. Replace H1 + add answer-first intro (2-4 sentences) directly under the hero.
2. Add a benefit row (RevShare/CPA/Hybrid/Sub-affiliate) high on the page, above the history block.
3. Demote "Our History / Values & Mission" lower or trim to 2-3 lines each (keep for E-E-A-T, not as the lead).
4. Replace the placeholder team avatars with a verifiable trust block (see Trust signals).
5. Add a "From the blog" 3-card strip linking 3 cornerstone posts + /blog/.
6. Hero CTA + a mid-page CTA + keep sticky mobile join bar, all with UTMs.
7. Internal links: hero secondary button -> /partner-benefits; blog strip -> /blog/.

### Revised copy
H1: Turn Your iGaming Traffic Into Recurring Revenue
Intro (answer-first): DBBET Partners pays affiliates up to 55% lifetime RevShare, $110 CPA, or a hybrid of both, plus 10% on every sub-affiliate you refer. We are an independent affiliate site for the DBBET program (not the official partnersdbbet.com) — we help media buyers, tipsters, Telegram owners and review sites get approved and paid faster. Apply free in 2 minutes; approval in 24-48h.

Primary CTA: Apply free in 2 minutes -> https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=home&utm_content=hero
Secondary CTA (internal): See all partner benefits -> /partner-benefits
Mid-page CTA: Get approved in 24-48h -> https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=home&utm_content=mid

Benefit row (4 cards, benefit-led):
- Up to 55% RevShare — a lifetime cut of net revenue from every player you send.
- $110 CPA — fixed payout per qualifying first deposit; pick CPA when you want cash up front.
- Hybrid deals — combine CPA + RevShare to balance upfront and recurring income.
- 10% sub-affiliate — earn on the affiliates you recruit, with no cap on your network.

"From the blog" strip (surfaces blog in body): heading "Grow faster with our playbooks" + 3 cards -> /blog/revshare-explained/, /blog/how-to-join-igaming-affiliate-program/, /blog/traffic-sources-for-affiliates/ and a "See all guides" link -> /blog/.
---

## 2) PARTNER-BENEFITS (page-partner-benefits)

### Problems today
- H1 "Everything You Need to Earn More" is vague; no answer-first value statement.
- 3 JOIN NOW CTAs, no UTMs.
- Niche grid (Sports/Casino/Esports/Online Games/Slots) is descriptive, not benefit-led.

### Change list
1. Add answer-first intro under H1.
2. Make each commission card lead with the payout + who it suits.
3. Each niche card ends with a micro-CTA to the join link (UTM utm_content=niche-X).
4. Keep the existing FAQ; add a final strong CTA after it (utm_content=faq).
5. Add UTMs to all 3 existing CTAs; add one internal link to /instruction ("See how payouts work").

### Revised copy
H1: Everything You Need to Earn More from iGaming Traffic
Intro (answer-first): Get paid your way — up to 55% lifetime RevShare, a fixed $110 CPA, or a hybrid of both, with 10% on sub-affiliates on top. You also get ready-made creatives, landing pages and a dedicated manager. No setup fees, no minimum traffic to apply.

Hero CTA: Apply free in 2 minutes -> https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=partner-benefits&utm_content=hero
Mid CTA (after benefit cards): Start earning — approval in 24-48h -> ...&utm_campaign=partner-benefits&utm_content=mid
Niche micro-CTAs: "Promote [niche] with DBBET" -> ...&utm_campaign=partner-benefits&utm_content=niche-sports (etc: niche-casino, niche-esports, niche-games, niche-slots)
Post-FAQ CTA: Still deciding? Apply free and ask your manager -> ...&utm_campaign=partner-benefits&utm_content=faq
Internal link: "See exactly how RevShare, CPA and Hybrid pay" -> /instruction

Benefit cards (lead with payout + fit):
- RevShare up to 55% — best for steady, long-term player traffic; you earn for the life of the account.
- CPA up to $110 — best for high-volume campaigns that want cash per first deposit.
- Hybrid — best when you want upfront CPA plus a smaller recurring RevShare tail.
- Sub-affiliate 10% — best for networks, agencies and Telegram owners who recruit other affiliates.
- Ready-to-use materials — banners, landings, videos and creatives in every format, refreshed monthly.
- Exclusive player bonuses — welcome offers that lift your referred players conversion rate.
---

## 3) INSTRUCTION (page-instruction)

### Problems today
- H1 "How to Succeed with DBBET" is fine but the page opens straight into mechanics with no answer-first framing.
- CREDIBILITY RISK: the "Statistics & Dashboard Guide" section shows a .dash-preview block with hardcoded numbers presented as if real account data: Clicks 128,540 / Registrations 6,212 / First Deposits 2,184 / Earnings $48,930. These are unsourced/fabricated and must not stand as implied real earnings (YMYL).
- Only 2 CTAs, no UTMs.

### Change list
1. Add answer-first intro under H1.
2. FIX the dashboard stats (pick ONE):
   Option A (recommended): relabel the block as a clearly-marked illustrative mock-up. Add a visible caption "Example dashboard — illustrative figures, not actual earnings" and change the .ds-val numbers to round, obviously-sample values, OR overlay a watermark/aria-label "sample data". Keep it only if Ray confirms it reads as a UI demo, not a results claim.
   Option B (safest): replace the four fake stat values with neutral labels — Clicks / Registrations / First Deposits / Earnings shown as dashes or "Your data" placeholders, so the screenshot shows the dashboard layout without inventing performance.
   Until Ray decides, mark inline: [UNVERIFIED — confirm with Ray: are 128,540 / 6,212 / 2,184 / $48,930 real aggregate figures we can source? If not, relabel as example or blank them].
3. Add UTMs to the 2 CTAs; add internal links from each "How X works" block to /partner-benefits.
4. Keep Contact (Telegram @Ray_Lead / Email) but make the Telegram a tracked link.

### Revised copy
H1: How to Succeed as a DBBET Affiliate
Intro (answer-first): Here is exactly how you get paid: generate a referral link or promo code, send players, and earn RevShare, CPA or a hybrid — tracked in real time in your dashboard. Below we break down each commission type, sub-affiliate links, and how to read your stats. Apply free in 2 minutes to get your links.

Hero CTA: Get my referral links (free) -> https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=instruction&utm_content=hero
Dashboard-section CTA: Open your live dashboard -> ...&utm_campaign=instruction&utm_content=dashboard
Per-block internal link: "See payout rates" -> /partner-benefits
Dashboard caption (replaces implied-real stats): "Example dashboard layout — illustrative figures only, not a guarantee of earnings."
---

## 4) MOB-CASH AGENT (page-mob-cash)

### Problems today
- H1 "Earn as a Mob-Cash Agent" is okay; no answer-first intro of what the program is and who it is for.
- 3 CTAs, no UTMs. "Transparent Rates" currently has no actual rate (verify before adding numbers).

### Change list
1. Add answer-first intro under H1 explaining what Mob-Cash is in plain terms.
2. Keep benefit cards (Additional Income / Fast Settlements / Reliable Support / Easy Onboarding); make them benefit-led.
3. Add UTMs to all 3 CTAs; add internal link to /partner-benefits and /instruction.
4. Do NOT invent commission rates. If a specific rate is shown, mark [UNVERIFIED — confirm exact Mob-Cash agent rate with Ray].

### Revised copy
H1: Become a DBBET Mob-Cash Agent
Intro (answer-first): Mob-Cash is DBBET local-agent program: you help players deposit and cash out locally and earn a commission on the volume you handle. It suits people with an on-the-ground network — shops, cashiers, community hubs — who want an additional income stream alongside (or instead of) online affiliate traffic. Apply free and your manager sets you up.

Hero CTA: Become an agent (free) -> https://dbbet-manager.com/Ray?utm_source=dbbetaff&utm_medium=cta&utm_campaign=mob-cash&utm_content=hero
Mid CTA: Start earning as an agent -> ...&utm_campaign=mob-cash&utm_content=mid
Footer CTA: Apply in 2 minutes — approval in 24-48h -> ...&utm_campaign=mob-cash&utm_content=footer
Internal links: "Compare with online affiliate payouts" -> /partner-benefits ; "How payouts and tracking work" -> /instruction

---

## Trust signals — replace placeholder team initials (homepage "Our Team")

Current .avatar initials (AM, MK, 24, ...) read as filler. Replace with signals we can actually stand behind. Pick from what Ray can verify:
- Real first-name + role + photo/headshot of the actual manager(s) (e.g. "Ray — Head of Affiliates"), if Ray approves using his name/photo. Highest trust.
- "Dedicated manager assigned on approval" + response-time commitment (e.g. replies within X hours) — only state a number Ray confirms.
- Concrete program facts instead of people: payout schedule, supported payout methods, languages supported, years the program has run — each only if verifiable.
- Direct contact proof: live Telegram @Ray_Lead link + email, framed as "talk to a real person before you apply".
Until verified, mark each placeholder: [UNVERIFIED — confirm with Ray: real name/role/photo or a factual trust stat to use here].
Do NOT invent headcounts, names, or "24/7" claims unless Ray confirms staffing.

---

## Internal-linking tightening (every page routes to partner-benefits + join)
- Global: nav already links all pages; ensure every page body has at least one in-content link to /partner-benefits and one CTA to the join link.
- Home -> /partner-benefits (hero secondary), -> /blog/ (blog strip), -> join (hero+mid).
- Partner-benefits -> /instruction (how payouts work), -> join (hero+mid+niche+faq).
- Instruction -> /partner-benefits (per block + dashboard CTA), -> join (hero+dashboard).
- Mob-cash -> /partner-benefits + /instruction, -> join (hero+mid+footer).
- Blog articles already CTA to join; ensure their CTA also carries UTMs (utm_campaign=blog&utm_content=SLUG) — separate small task in blog-gen.cjs if wanted.

## Build / publish notes
- Edit only in template.html page sections; then run: node build-langs.cjs && node blog-gen.cjs && node gen-seo.cjs && node copy-to-root.cjs
- template.html currently has base64=0, so build-langs is safe.
- Do NOT publish until Ray approves copy + resolves the [UNVERIFIED] items (dashboard stats, team trust signals, any Mob-Cash rate).
