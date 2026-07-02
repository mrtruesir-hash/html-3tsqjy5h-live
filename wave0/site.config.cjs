// site.config.cjs — single source of truth for the dbbetaff.com rebuild.
// Required by build-langs.cjs, blog-gen.cjs, gen-seo.cjs, gen-redirects.cjs and the 410 Pages Function.
// Wave numbers are LANGUAGE-BUDGET gated: 0=English(no budget), 1=RU, 2=PT-BR, 3=FR, 4=AR-EG.
// Critical Analysis R4: Egypt MUST be wave 4 (behind its compliance + RTL gate).
module.exports = {
  ORIGIN: 'https://dbbetaff.com',
  TRAILING_SLASH: true, // canonical form is WITH slash

  // SITE languages (core pages). path = URL segment; hreflang = attribute value.
  // Short paths kept (/ar/, /pt/) to avoid new-URL churn; regional hreflang values applied.
  LANGUAGES: [
    { path: '',   hreflang: 'en',    xDefault: true }, // en = root, also x-default
    { path: 'ru', hreflang: 'ru'    },
    { path: 'ar', hreflang: 'ar-EG' },
    { path: 'fr', hreflang: 'fr'    },
    { path: 'pt', hreflang: 'pt-BR' },
  ],

  // Every language tree NOT in LANGUAGES is demolished -> 410 (zero inheritance).
  DROPPED_LANGS: ['es', 'tr', 'uz', 'az', 'sw', 'so', 'fa', 'ur', 'hi', 'bn', 'ne', 'si'],

  // BLOG country hubs. wave gates publication (phased publishing).
  // Wave 1 opened for the Russia/CIS (ru) hub — RU translation budget approved.
  CURRENT_WAVE: 1,
  MARKETS: [
    { id: 'global',             lang: 'en',    pillar: 'igaming-affiliate-programs',            wave: 0 },
    { id: 'bangladesh',         lang: 'en',    pillar: 'bangladesh-affiliate-programs',         wave: 0 },
    { id: 'tanzania',           lang: 'en',    pillar: 'tanzania-affiliate-programs',           wave: 0 },
    { id: 'sri-lanka',          lang: 'en',    pillar: 'sri-lanka-affiliate-programs',          wave: 0 },
    { id: 'somalia',            lang: 'en',    pillar: 'somalia-affiliate-programs',            wave: 0, flag: 'light' },
    { id: 'russia-cis',         lang: 'ru',    pillar: 'cis-affiliate-programs',                wave: 1 },
    { id: 'uzbekistan',         lang: 'ru',    pillar: 'uzbekistan-affiliate-programs',         wave: 1 },
    { id: 'azerbaijan',         lang: 'ru',    pillar: 'azerbaijan-affiliate-programs',         wave: 1 },
    { id: 'brazil',             lang: 'pt-BR', pillar: 'brazil-affiliate-programs',             wave: 2 },
    { id: 'francophone-africa', lang: 'fr',    pillar: 'francophone-africa-affiliate-programs', wave: 3 },
    { id: 'egypt',              lang: 'ar-EG', pillar: 'egypt-affiliate-programs',              wave: 4, flag: 'compliance-light-rtl' },
  ],

  // Build-time quality gates (blog-gen.cjs throws on violation -> a stub cannot be emitted).
  QUALITY: { MIN_WORDS: 1500, MIN_H2: 4, MIN_RELATED: 3, REQUIRE_MONEY_LINK: true },
};
