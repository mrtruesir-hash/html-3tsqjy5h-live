#!/usr/bin/env node
// IndexNow submitter for dbbetaff.com
// Usage:
//   node indexnow-submit.cjs                -> submits all URLs from sitemap.xml
//   node indexnow-submit.cjs <url> [<url>]  -> submits the given URL(s)
const fs = require('fs');

const HOST = 'dbbetaff.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function getKey() {
  const k = fs.readFileSync('.indexnow-key', 'utf8').trim();
    if (!/^[a-f0-9]{8,128}$/i.test(k)) throw new Error('Invalid IndexNow key');
      return k;
      }

      function urlsFromSitemap() {
        const xml = fs.readFileSync('sitemap.xml', 'utf8');
          const out = [];
            const re = /<loc>([^<]+)<\/loc>/gi;
              let m;
                while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
                  return out;
                  }

                  async function main() {
                    const key = getKey();
                      let urls = process.argv.slice(2);
                        if (urls.length === 0) urls = urlsFromSitemap();
                          urls = [...new Set(urls)].filter(u => u.startsWith('https://' + HOST));
                            if (urls.length === 0) { console.log('No URLs to submit.'); return; }

                              const body = {
                                  host: HOST,
                                      key: key,
                                          keyLocation: 'https://' + HOST + '/' + key + '.txt',
                                              urlList: urls
                                                };

                                                  console.log('Submitting ' + urls.length + ' URL(s) to IndexNow...');
                                                    const res = await fetch(ENDPOINT, {
                                                        method: 'POST',
                                                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                                                                body: JSON.stringify(body)
                                                                  });
                                                                    console.log('IndexNow HTTP ' + res.status + ' ' + res.statusText);
                                                                      // 200 or 202 = accepted. IndexNow forwards to Bing, Yandex, Seznam, etc.
                                                                      }

                                                                      main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
                                                                      