const fs=require('fs');const path=require('path');
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
