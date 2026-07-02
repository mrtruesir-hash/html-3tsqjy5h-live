#!/usr/bin/env node
/* blog-gen.cjs — REBUILT country-hub blog generator for dbbetaff.com.
 * Config-driven (site.config.cjs), quality-gated (a stub CANNOT be emitted),
 * emits pages wrapped in the real site shell (header+footer+mobile-bar) so blog
 * pages are first-class, crawlable site pages (old posts were bare/orphaned).
 *
 * Content lives in ./blog-content.cjs (decoupled data). Run: node blog-gen.cjs
 * Writes blog/<slug>/index.html for every PILLAR + ARTICLE whose market.wave <= CURRENT_WAVE.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const CFG = require('./site.config.cjs');
const CONTENT = require('./blog-content.cjs'); // { PILLARS:[...], ARTICLES:[...] }

const ORIGIN = CFG.ORIGIN;
const Q = CFG.QUALITY;
const MARKET = Object.fromEntries(CFG.MARKETS.map(m => [m.id, m]));
const LANG_VALUES = new Set(CFG.LANGUAGES.map(l => l.hreflang));
const MONEY = '/partner-benefits/';

// ---- helpers ---------------------------------------------------------------
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const attr = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const url = slug => ORIGIN + '/blog/' + slug + '/';
const rel = slug => '/blog/' + slug + '/';
function countWords(htmlBody){ return htmlBody.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).length; }

// language switcher — exactly the 5 site LANGUAGES (was 16; collapsed)
const LANG_MENU = [
  { flag:'🇬🇧', name:'English',  href:'/' },
  { flag:'🇷🇺', name:'Русский',  href:'/ru/' },
  { flag:'🇪🇬', name:'العربية',  href:'/ar/' },
  { flag:'🇫🇷', name:'Français', href:'/fr/' },
  { flag:'🇧🇷', name:'Português', href:'/pt/' },
];

const NAV = [
  { t:'AFFILIATE HUB',    href:'/' },
  { t:'PARTNER BENEFITS', href:'/partner-benefits/' },
  { t:'INSTRUCTION',      href:'/instruction/' },
  { t:'MOB-CASH AGENT',   href:'/mob-cash/' },
  { t:'TERMS',            href:'/terms/' },
  { t:'BLOG',             href:'/blog/' },
];

function header(){
  return `<header class="site-header" id="siteHeader"><div class="header-inner">`
    + `<a class="logo" href="/"><span class="logo-db"><img class="logo-mark" src="/favicon.svg" alt="DB"></span><span class="logo-bet">BET</span><span class="logo-sub">PARTNERS</span></a>`
    + `<nav class="main-nav" id="mainNav">`
    + NAV.map(n=>`<a class="nav-link" href="${n.href}">${n.t}</a>`).join('')
    + `</nav><div class="header-right"><div class="lang-selector" id="langSelector">`
    + `<button class="lang-current"><span class="flag">🇬🇧</span><span class="lang-name">English</span><span class="caret">▾</span></button>`
    + `<ul class="lang-menu" id="langMenu">`
    + LANG_MENU.map(l=>`<li><a href="${l.href}"><span class="flag">${l.flag}</span> ${l.name}</a></li>`).join('')
    + `</ul></div></div></div></header>`;
}

function footer(){
  return `<footer class="site-footer"><div class="container footer-inner">`
    + `<div class="footer-brand"><span class="logo-db"><img class="logo-mark" src="/favicon.svg" alt="DB"></span><span class="logo-bet">BET PARTNERS</span>`
    + `<p>The iGaming affiliate program for serious media buyers — up to 55% RevShare, $110 CPA and hybrid deals.</p></div>`
    + `<div class="footer-cols">`
    + `<div><h5>Affiliates</h5>`
    + `<a href="/partner-benefits/">Partner Benefits</a><a href="/instruction/">Instruction</a><a href="/mob-cash/">Mob-Cash Agent</a><a href="/blog/">Blog</a><a href="/app/">App</a></div>`
    + `<div><h5>Company</h5><a href="/about/">About</a><a href="/contact/">Contact</a></div>`
    + `</div></div>`
    + `<div class="footer-bottom"><div class="container"><div class="footer-legal-links">`
    + `<a href="/terms/">Terms</a><a href="/privacy/">Privacy</a><a href="/cookies/">Cookies</a><a href="/affiliate-disclosure/">Affiliate Disclosure</a><a href="/about/">About</a><a href="/contact/">Contact</a>`
    + `</div></div></div></footer>`;
}

function mobileBar(){
  return `<div class="mobile-join-bar"><a class="btn btn-join mobile-join-btn" href="${MONEY}">Become a Partner</a></div>`;
}

function breadcrumb(page){
  const crumbs = [['Home','/'],['Blog','/blog/']];
  if (page.type === 'article' && page.pillarSlug) crumbs.push([page.pillarTitle, rel(page.pillarSlug)]);
  crumbs.push([page.h1, rel(page.slug)]);
  const html = `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>`
    + crumbs.map((c,i)=> i<crumbs.length-1
        ? `<li><a href="${c[1]}">${esc(c[0])}</a></li>`
        : `<li aria-current="page">${esc(c[0])}</li>`).join('')
    + `</ol></nav>`;
  return { html, crumbs };
}

function schemaBlogPosting(page){
  return JSON.stringify({
    '@context':'https://schema.org','@type':'BlogPosting',
    headline: page.h1, description: page.metaDesc, inLanguage: page.lang,
    datePublished: page.datePublished, dateModified: page.dateModified,
    author:{'@type':'Organization', name:'DBBET Partners'},
    publisher:{'@type':'Organization', name:'DBBET Partners',
      logo:{'@type':'ImageObject', url: ORIGIN + '/favicon.svg'}},
    mainEntityOfPage: url(page.slug)
  });
}
function schemaBreadcrumb(crumbs){
  return JSON.stringify({
    '@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement: crumbs.map((c,i)=>({'@type':'ListItem', position:i+1, name:c[0], item: ORIGIN + c[1]}))
  });
}
function schemaFaq(faq){
  return JSON.stringify({
    '@context':'https://schema.org','@type':'FAQPage',
    mainEntity: faq.map(f=>({'@type':'Question', name:f.q,
      acceptedAnswer:{'@type':'Answer', text:f.a}}))
  });
}

// render the article body from sections [{h2, paras:[], h3blocks:[{h3,paras}]}]
function renderBody(page){
  let h = `<p class="post-intro">${page.intro}</p>`;
  for (const s of page.sections){
    h += `<h2>${esc(s.h2)}</h2>`;
    for (const p of (s.paras||[])) h += `<p>${p}</p>`;
    for (const b of (s.h3blocks||[])){
      h += `<h3>${esc(b.h3)}</h3>`;
      for (const p of (b.paras||[])) h += `<p>${p}</p>`;
    }
  }
  return h;
}

// related-links block (hub-and-spoke); also satisfies internal-link gate
function relatedBlock(page){
  if (!page.related || !page.related.length) return '';
  const items = page.related.map(r=>`<li><a href="${rel(r.slug)}">${esc(r.title)}</a></li>`).join('');
  return `<aside class="related"><h2>Related guides</h2><ul>${items}</ul></aside>`;
}

function ctaBlock(){
  return `<div class="post-cta"><h2>Start earning with DBBET Partners</h2>`
    + `<p>Up to 55% RevShare, $110 CPA and hybrid deals, with payouts in your market's local rails.</p>`
    + `<a class="btn btn-join" href="${MONEY}">Become a Partner</a></div>`;
}

// ---- quality gates (throw -> build fails -> a stub cannot ship) -------------
function assertQuality(page){
  const id = `${page.type}:${page.slug}`;
  if (!page.title || !page.metaDesc || !page.h1 || !page.intro) throw new Error(`[blog-gen] ${id}: missing required field (title/metaDesc/h1/intro)`);
  if (!LANG_VALUES.has(page.lang)) throw new Error(`[blog-gen] ${id}: lang "${page.lang}" not in site.config LANGUAGES`);
  if (!MARKET[page.market]) throw new Error(`[blog-gen] ${id}: orphan — market "${page.market}" has no entry in site.config MARKETS`);
  const bodyHtml = renderBody(page);
  const words = countWords(bodyHtml);
  if (words < Q.MIN_WORDS) throw new Error(`[blog-gen] ${id}: ${words}w < MIN_WORDS ${Q.MIN_WORDS}`);
  const h2count = (page.sections||[]).length;
  if (h2count < Q.MIN_H2) throw new Error(`[blog-gen] ${id}: ${h2count} H2 < MIN_H2 ${Q.MIN_H2}`);
  const internal = (page.related||[]).length + (page.type==='article'?1:0); // +1 = up-link to pillar
  if (internal < Q.MIN_RELATED) throw new Error(`[blog-gen] ${id}: ${internal} internal links < MIN_RELATED ${Q.MIN_RELATED}`);
  if (Q.REQUIRE_MONEY_LINK && page.money === false) throw new Error(`[blog-gen] ${id}: money link required`);
  return { bodyHtml, words };
}

// ---- page assembly ---------------------------------------------------------
function renderPage(page){
  const { bodyHtml } = assertQuality(page);
  const bc = breadcrumb(page);
  const schemas = [schemaBlogPosting(page), schemaBreadcrumb(bc.crumbs)];
  if (page.faq && page.faq.length) schemas.push(schemaFaq(page.faq));

  const head = `<!doctype html><html lang="${attr(page.lang)}"><head>`
    + `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`
    + `<title>${esc(page.title)}</title>`
    + `<meta name="description" content="${attr(page.metaDesc)}">`
    + `<link rel="canonical" href="${url(page.slug)}">`
    + `<meta name="robots" content="index,follow">`
    + `<link rel="icon" href="/favicon.svg">`
    + `<link rel="stylesheet" href="/styles.css">`
    + schemas.map(s=>`<script type="application/ld+json">${s}</script>`).join('')
    + `</head>`;

  const upLink = (page.type==='article' && page.pillarSlug)
    ? `<p class="up-to-pillar"><a href="${rel(page.pillarSlug)}">← ${esc(page.pillarTitle)}</a></p>` : '';

  const body = `<body>` + header()
    + `<main class="page-wrap blog-page"><article class="blog-post">`
    + bc.html
    + `<h1>${esc(page.h1)}</h1>`
    + upLink
    + bodyHtml
    + ctaBlock()
    + relatedBlock(page)
    + `</article></main>`
    + footer() + mobileBar() + `</body></html>`;

  return head + body;
}

// ---- build -----------------------------------------------------------------
function published(market){ return MARKET[market] && MARKET[market].wave <= CFG.CURRENT_WAVE; }

function build(){
  const pillarBySlug = Object.fromEntries((CONTENT.PILLARS||[]).map(p=>[p.slug,p]));
  const pillarByMarket = Object.fromEntries((CONTENT.PILLARS||[]).map(p=>[p.market,p]));
  const allSlugs = new Set();
  let written = 0, skippedWave = 0;

  const pages = [];
  for (const p of (CONTENT.PILLARS||[])) pages.push(Object.assign({ type:'pillar' }, p));
  for (const a of (CONTENT.ARTICLES||[])){
    const pillar = pillarByMarket[a.market];
    pages.push(Object.assign({ type:'article',
      pillarSlug: pillar && pillar.slug, pillarTitle: pillar && pillar.h1 }, a));
  }

  // slug-collision guard (CA R3): two content items must not share a slug
  for (const pg of pages){
    if (allSlugs.has(pg.slug)) throw new Error(`[blog-gen] duplicate slug: ${pg.slug}`);
    allSlugs.add(pg.slug);
  }

  for (const pg of pages){
    if (!published(pg.market)){ skippedWave++; continue; }
    // article must have a published pillar to link up to (no orphans)
    if (pg.type==='article' && !(pillarByMarket[pg.market] && published(pg.market)))
      throw new Error(`[blog-gen] ${pg.slug}: no published pillar for market ${pg.market}`);
    const html = renderPage(pg);
    const dir = path.join('blog', pg.slug);
    fs.mkdirSync(dir, { recursive:true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    written++;
  }

  // /blog/ index — lists published pillars (crawlable hub)
  writeBlogIndex(pages.filter(p=>p.type==='pillar' && published(p.market)));

  console.log(`[blog-gen] OK wave<=${CFG.CURRENT_WAVE}: wrote ${written} pages, ${skippedWave} held for later waves.`);
  return { written, skippedWave };
}

function writeBlogIndex(pillars){
  const cards = pillars.map(p=>`<li><a href="${rel(p.slug)}"><h3>${esc(p.h1)}</h3><p>${esc(p.metaDesc)}</p></a></li>`).join('');
  const head = `<!doctype html><html lang="en"><head><meta charset="utf-8">`
    + `<meta name="viewport" content="width=device-width, initial-scale=1">`
    + `<title>Blog — iGaming Affiliate Guides by Country | DBBET Partners</title>`
    + `<meta name="description" content="In-depth iGaming affiliate-recruitment guides by country: payouts, local payment rails, top brands and traffic sources.">`
    + `<link rel="canonical" href="${ORIGIN}/blog/">`
    + `<meta name="robots" content="index,follow">`
    + `<link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/styles.css"></head>`;
  const body = `<body>${header()}<main class="page-wrap blog-index">`
    + `<h1>iGaming Affiliate Guides by Country</h1>`
    + `<p class="blog-index-intro">Country-by-country guides for affiliates and media buyers — how to earn promoting betting and casino traffic with DBBET Partners.</p>`
    + `<ul class="blog-hub-list">${cards}</ul></main>${footer()}${mobileBar()}</body></html>`;
  fs.mkdirSync('blog', { recursive:true });
  fs.writeFileSync(path.join('blog','index.html'), head+body);
}

if (require.main === module){
  try { build(); }
  catch(e){ console.error(String(e.message||e)); process.exit(1); }
}
module.exports = { build, renderPage, assertQuality };
