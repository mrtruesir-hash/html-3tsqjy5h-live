/**
 * functions/_middleware.js — Cloudflare Pages Function (M6 teardown + soft-404 fix).
 *
 * Runs BEFORE the static asset / SPA fallback, in order:
 *   1. trailing-slash canonicalisation (without-slash -> 301 with-slash)
 *   2. 301 redirects for retired OLD-version URLs -> nearest live page (redirect-map.json)
 *   3. 301 dropped-language trees -> their English equivalent (prefix strip: /ne/mob-cash/ -> /mob-cash/)
 *        GSC (sc-domain:dbbetaff.com) shows these old-version pages still carry the site's
 *        (residual) traffic, so we REDIRECT (capture equity) rather than 410 (discard) — R1/F14.
 *   4. 410 Gone for exact dead URLs with no equivalent (gone-urls.json) — usually empty.
 *   5. 404 for any /blog/<slug>/ that is NOT a real page (valid-blog-slugs.json)
 *        -> fixes the soft-404 where gated/typo slugs (egypt-, brazil-, ...) return 200 + homepage.
 *   6. otherwise pass through to the static asset.
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

const DROPPED_LANGS = ['es', 'tr', 'uz', 'az', 'sw', 'so', 'fa', 'ur', 'hi', 'bn', 'ne', 'si'];
const VALID = new Set(VALID_SLUGS);
const goneList = (Array.isArray(GONE) ? GONE : []).filter((u) => typeof u === 'string' && u.startsWith('/'));

const withSlash = (p) => (p.endsWith('/') ? p : p + '/');
// a request for a real file (has an extension): /styles.css /favicon.svg /x.webp /sitemap.xml /llms.txt /robots.txt /app.js …
const isFileRequest = (p) => /\.[a-zA-Z0-9]{1,8}$/.test(p);

export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);

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

    // 3. dropped-language tree -> 301 to English equivalent (strip the /{lang}/ prefix)
    const dl = path.match(/^\/([a-z]{2})\/(.*)$/);
    if (dl && DROPPED_LANGS.includes(dl[1])) {
      return Response.redirect(url.origin + '/' + dl[2], 301);
    }

    // 4. 410 Gone (exact dead URL with no equivalent) — normally empty
    if (goneList.includes(path)) {
      return new Response(null, { status: 410, statusText: 'Gone' });
    }

    // 5. soft-404 fix: a /blog/<slug>/ that is not a real published page -> 404
    const m = path.match(/^\/blog\/([^/]+)\/$/);
    if (m && !VALID.has(m[1])) {
      return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain' } });
    }

    // 6. pass through to the static asset
    return context.next();
  } catch (e) {
    return context.next(); // fail-open: never break the site
  }
}
