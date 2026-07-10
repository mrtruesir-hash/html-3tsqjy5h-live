/**
 * functions/_middleware.js — Cloudflare Pages Function (M6 teardown + soft-404 fix).
 *
 * Runs BEFORE the static asset / SPA fallback, in order:
 *   1. trailing-slash canonicalisation (without-slash -> 301 with-slash)
 *   2. 301 redirects for retired OLD-version URLs -> nearest live page (redirect-map.json)
 *   3. 410 Gone for the demolished (dropped) language trees + all sub-paths.
 *        Total removal, zero connection: 410 (not 301) so no equity/association is inherited.
 *        SAFE from the old /so/ -> / -> /so/ loop: a 410 returns a BODY, never a redirect the app
 *        can bounce off. NOTE: the Angular app still knows these langs and may client-side redirect
 *        a returning user (localStorage lang) onto a 410 — the app/build must drop them too (B1).
 *   4. 410 Gone for exact dead URLs with no equivalent (gone-urls.json) — usually empty.
 *   5. 404 for any /blog/<slug>/ that is NOT a real page (valid-blog-slugs.json)
 *        -> fixes the soft-404 where gated/typo slugs (egypt-, brazil-, ...) return 200 + homepage.
 *   6. 404 for any ROOT path that is not a known page (PAGES allowlist, lang-prefix aware)
 *        -> kills the catch-all where /anything/ returned the 200 homepage shell (a crawl trap).
 *   7. otherwise pass through to the static asset.
 *
 * FAIL-OPEN: any error falls through to context.next() so the Function can never break the site.
 * A true 410 needs a Function (Pages _redirects cannot return 410).
 *
 * Deploy: copy to functions/_middleware.js; copy the JSON files to the repo root.
 * Regenerate valid-blog-slugs.json whenever hubs change.
 */
import REDIRECTS from '../redirect-map.json';
import GONE from '../gone-urls.json';
import VALID_SLUGS from '../valid-blog-slugs.json';

const VALID = new Set(VALID_SLUGS);
const goneList = (Array.isArray(GONE) ? GONE : []).filter((u) => typeof u === 'string' && u.startsWith('/'));
// Demolished language trees — removed TOTALLY with 410 (Gone), never 301 (zero equity/connection).
const DROPPED_LANGS = new Set(['es', 'tr', 'az', 'sw', 'so', 'fa', 'hi', 'ne']);
// Kept/live languages (en = root, no prefix). Used to strip a lang prefix before the known-page check.
// bn/uz/si/ur re-added + id net-new as properly-localized (SSG-baked) languages, launched noindex until reviewed.
const KEPT_LANGS = new Set(['ru', 'ar', 'fr', 'pt', 'bn', 'uz', 'si', 'ur', 'id']);
// The site's real top-level pages. ⚠️ Keep in sync with the repo's page dirs — a real page missing
// here will be hard-404'd. ('blog' + blog slugs are handled separately, rule 5.)
const PAGES = new Set(['about', 'affiliate-disclosure', 'app', 'contact', 'cookies', 'instruction', 'mob-cash', 'partner-benefits', 'privacy', 'terms']);

const withSlash = (p) => (p.endsWith('/') ? p : p + '/');
// a request for a real file (has an extension): /styles.css /favicon.svg /x.webp /sitemap.xml /llms.txt /robots.txt /app.js …
const isFileRequest = (p) => /\.[a-zA-Z0-9]{1,8}$/.test(p);

export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);

    // 0a. Never serve the build-staging dir. `_preview/` is the generator's scratch output
    //     (copy-to-root promotes it to the real paths). It's removed from git + gitignored,
    //     but the Cloudflare build regenerates it, so block it here so /_preview/* can't be
    //     crawled as a full duplicate of the site. Must run BEFORE the isFileRequest passthrough.
    if (url.pathname === '/_preview' || url.pathname.startsWith('/_preview/')) {
      return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' } });
    }

    // 0. NEVER rewrite static-asset requests — serve them exactly as asked.
    //    Without this, rule 1 would 301 /styles.css -> /styles.css/ (a path that does not
    //    exist), breaking CSS/JS/images/sitemap site-wide (every page renders unstyled).
    if (isFileRequest(url.pathname)) {
      return context.next();
    }

    const path = withSlash(url.pathname);

    // 1. enforce trailing slash (canonical form)
    if (url.pathname !== path) {
      return Response.redirect(url.origin + path + url.search, 301);
    }

    // 2. explicit 301 (retired URL -> nearest live equivalent)
    const target = REDIRECTS[path];
    if (target && typeof target === 'string' && target.startsWith('/')) {
      return Response.redirect(url.origin + withSlash(target), 301);
    }

    // 3. 410 Gone for the demolished language trees (the prefix AND all sub-paths).
    if (DROPPED_LANGS.has(path.split('/')[1])) {
      return new Response('Gone', {
        status: 410,
        headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' },
      });
    }

    // 4. 410 Gone (exact dead URL with no equivalent) — normally empty
    if (goneList.includes(path)) {
      return new Response('Gone', { status: 410, statusText: 'Gone', headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' } });
    }

    // 5. soft-404 fix: a /blog/<slug>/ that is not a real published page -> 404
    const m = path.match(/^\/blog\/([^/]+)\/$/);
    if (m && !VALID.has(m[1])) {
      return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain' } });
    }

    // 6. root-level soft-404 fix: hard-404 ANY path that is not a known page.
    //    Strip an optional kept-language prefix, then require: home, /blog/*, or a known top-level page.
    {
      let seg = path.split('/').filter(Boolean); // '/' -> [], '/ru/' -> ['ru'], '/ru/instruction/' -> ['ru','instruction']
      if (seg.length && KEPT_LANGS.has(seg[0])) seg = seg.slice(1); // drop a kept-lang prefix
      const known =
        seg.length === 0 ||                       // home ( / or /{lang}/ )
        seg[0] === 'blog' ||                      // /blog/ and /blog/<slug>/ (rule 5 already gated slugs)
        (seg.length === 1 && PAGES.has(seg[0]));  // a known top-level page
      if (!known) {
        return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain' } });
      }
    }

    // 7. pass through to the static asset
    return context.next();
  } catch (e) {
    return context.next(); // fail-open: never break the site
  }
}
