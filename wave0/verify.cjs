const fs=require("fs"),path=require("path");
function walk(d){let r=[];for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())r=r.concat(walk(p));else if(f==="index.html")r.push(p.replace(/\\/g,"/"));}return r;}
const pages=walk("blog");
let allOK=true;
for(const p of pages.sort()){
  const h=fs.readFileSync(p,"utf8");
  const isIndex=p==="blog/index.html";
  const c={hdr:/<header class="site-header"/.test(h),ftr:/<footer class="site-footer"/.test(h),
    canon:/<link rel="canonical" href="https:\/\/dbbetaff\.com\/blog\/[^"]*\/">/.test(h),
    bp:/"@type":"BlogPosting"/.test(h),bc:/"@type":"BreadcrumbList"/.test(h),faq:/"@type":"FAQPage"/.test(h),
    money:/href="\/partner-benefits\/"/.test(h),lang5:((h.match(/lang-menu[\s\S]*?<\/ul>/)||[""])[0].match(/<li>/g)||[]).length,
    h2:(h.match(/<h2>/g)||[]).length};
  const ok=c.hdr&&c.ftr&&c.money&&c.lang5===5&&(isIndex||(c.canon&&c.bp&&c.bc&&c.h2>=4));
  if(!ok)allOK=false;
  console.log((ok?"OK ":"BAD")+" "+p.replace("blog/","").replace("/index.html","").padEnd(38),JSON.stringify(c));
}
const built=new Set(pages.map(p=>p.replace(/^blog\/(.*)\/index\.html$/,"/blog/$1/")));
built.add("/blog/");
const all=pages.map(p=>fs.readFileSync(p,"utf8")).join("");
const refs=[...new Set((all.match(/href="\/blog\/[^"]*"/g)||[]).map(s=>s.slice(6,-1)))];
const dead=refs.filter(r=>!built.has(r));
console.log("\nALL VALID:",allOK,"| internal blog links:",refs.length,"| DEAD:",dead.length,dead);
