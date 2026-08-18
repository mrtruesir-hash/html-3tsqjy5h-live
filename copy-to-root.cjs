const fs=require('fs');const path=require('path');
// Run the H1-as-H2 regression guard against _preview BEFORE promoting it to root, so the
// fix (SEO-AUDIT.md finding C2) can never again be skipped by a forgotten manual step.
require('./fix-h1.cjs');
const src='_preview';
function copyDir(s,d){
  for(const e of fs.readdirSync(s,{withFileTypes:true})){
    const sp=path.join(s,e.name), dp=path.join(d,e.name);
    if(e.isDirectory()){ fs.mkdirSync(dp,{recursive:true}); copyDir(sp,dp); }
    else { fs.copyFileSync(sp,dp); }
  }
}
copyDir(src,'.');
console.log('COPIED _preview -> root');
