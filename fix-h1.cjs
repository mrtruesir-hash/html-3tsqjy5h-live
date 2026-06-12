const fs=require('fs');const path=require('path');
function walk(dir){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p);
    else if(e.name==='index.html'){
      let h=fs.readFileSync(p,'utf8');
      const isSub=/partner-benefits|instruction|mob-cash/.test(p);
      if(isSub){
        const hi=h.indexOf('class="page-hero');
        if(hi>-1){
          const after=h.slice(hi);
          const m=after.match(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/);
          if(m){
            const repl='<h1'+(m[1]||'')+'>'+m[2]+'</h1>';
            h=h.slice(0,hi)+after.replace(m[0],repl);
            fs.writeFileSync(p,h);
          }
        }
      }
    }
  }
}
walk('_preview');
console.log('H1 fix applied to sub-pages');
