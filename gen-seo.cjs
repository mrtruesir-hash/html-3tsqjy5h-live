const fs=require('fs');
const base='https://dbbetaff.com';
const OUT='_preview';
const LANGS=['ru','es','pt','fr','tr','ar','uz','az','sw','so','fa','ur','hi','bn','ne','si'];
const LOCALES=['en'].concat(LANGS);
const SLUGS=['','partner-benefits','instruction','mob-cash'];
function urlFor(loc,slug){var p=base+'/';if(loc!=='en')p+=loc+'/';if(slug)p+=slug+'/';return p;}
function exists(loc,slug){var d=OUT+(loc==='en'?'':'/'+loc)+(slug?'/'+slug:'');return fs.existsSync(d+'/index.html');}
const today=new Date().toISOString().slice(0,10);
const NL='\n';
let x='<?xml version="1.0" encoding="UTF-8"?>'+NL;
x+='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+NL;
SLUGS.forEach(function(slug){
  var alts=LOCALES.filter(function(l){return exists(l,slug);});
  alts.forEach(function(loc){
    var u=urlFor(loc,slug);
    var pr=(slug===''&&loc==='en')?'1.0':(slug===''?'0.9':'0.8');
    x+='  <url>'+NL;
    x+='    <loc>'+u+'</loc>'+NL;
    alts.forEach(function(a){
      x+='    <xhtml:link rel="alternate" hreflang="'+a+'" href="'+urlFor(a,slug)+'"/>'+NL;
    });
    x+='    <xhtml:link rel="alternate" hreflang="x-default" href="'+urlFor('en',slug)+'"/>'+NL;
    x+='    <lastmod>'+today+'</lastmod>'+NL;
    x+='    <changefreq>weekly</changefreq>'+NL;
    x+='    <priority>'+pr+'</priority>'+NL;
    x+='  </url>'+NL;
  });
});
/* BLOG-SITEMAP-PATCH */
if(fs.existsSync('blog/index.html')){
  x+='  <url>'+NL+'    <loc>'+base+'/blog/</loc>'+NL+'    <lastmod>'+today+'</lastmod>'+NL+'    <changefreq>weekly</changefreq>'+NL+'    <priority>0.8</priority>'+NL+'  </url>'+NL;
}
if(fs.existsSync('blog')){
  fs.readdirSync('blog').forEach(function(slug){
    if(fs.existsSync('blog/'+slug+'/index.html')){
      x+='  <url>'+NL+'    <loc>'+base+'/blog/'+slug+'/</loc>'+NL+'    <lastmod>'+today+'</lastmod>'+NL+'    <changefreq>weekly</changefreq>'+NL+'    <priority>0.7</priority>'+NL+'  </url>'+NL;
    }
  });
}
x+='</urlset>'+NL;
fs.writeFileSync(OUT+'/sitemap.xml',x);
var robots='User-agent: *'+NL+'Allow: /'+NL+NL+'Sitemap: '+base+'/sitemap.xml'+NL;
fs.writeFileSync(OUT+'/robots.txt',robots);
var n=(x.match(/<loc>/g)||[]).length;
console.log('SEO done: sitemap('+n+' urls, hreflang) + robots');
