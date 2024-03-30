#!/usr/bin/env node
var ye=Object.defineProperty;var y=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var de=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),fe=(e,t)=>{for(var r in t)ye(e,r,{get:t[r],enumerable:!0})};var ee=de((Jt,_e)=>{_e.exports={name:"icon-components",version:"1.9.23",description:"Generate Icon Components",main:"index.js",bin:"dist/cli.js",scripts:{test:"npm run build && npm run test:jest && npm run test:all","test:jest":"jest --verbose","test:external":"sh test/scripts/external.sh","test:lists":"sh test/scripts/lists.sh","test:templates":"sh test/scripts/templates.sh","test:cleanup":"sh test/scripts/cleanup.sh","test:copy":"sh test/scripts/copy.sh","test:remove":"sh test/scripts/remove.sh","test:prependline":"sh test/scripts/prependLine.sh","test:iconfolder":"sh test/scripts/iconFolder.sh","test:all":"npm run test:lists && npm run test:remove && npm run test:templates && npm run test:cleanup && npm run test:external && npm run test:copy && npm run test:prependline && npm run test:iconfolder",build:"tsup",lint:"eslint --ext .js,.ts --ignore-path .gitignore .","lint:fix":"eslint --ext .js,.ts --ignore-path .gitignore . --fix",docs:"npx gieter","docs:local":"node ../gieter/dist/index.js",dev:"tsc -w",prepublishOnly:"npm run test","yolo:publish":'npm run build && git commit -am "yolo" && npm version patch && npm publish --access public && git push --follow-tags'},repository:{type:"git",url:"git+https://github.com/silvandiepen/icon-components.git"},keywords:["icons","svg","components","generate"],author:"Sil van Diepen",license:"MIT",bugs:{url:"https://github.com/silvandiepen/icon-components/issues"},homepage:"https://github.com/silvandiepen/icon-components#readme",dependencies:{"@sil/args":"^0.1.0","@sil/case":"^0.0.3","cli-block":"^1.3.8",ejs:"^3.1.8",kleur:"^4.1.5",mkdirp:"^1.0.4",prettier:"^2.7.1",rimraf:"^3.0.2",svgo:"^2.8.0"},devDependencies:{"@types/ejs":"^3.1.1","@types/jest":"^28.1.6","@types/node":"^18.6.2","@types/svgo":"^2.6.3","@typescript-eslint/eslint-plugin":"^5.31.0","@typescript-eslint/parser":"^5.31.0","@zerollup/ts-transform-paths":"^1.7.18",chai:"^4.3.6",eslint:"^8.20.0","eslint-config-prettier":"^8.5.0","eslint-plugin-import":"^2.26.0","eslint-plugin-prettier":"^4.2.1",jest:"^28.1.3","ts-jest":"^28.0.7","ts-node":"^10.9.2","tsc-alias":"^1.8.8",tslint:"^6.1.1",tsup:"^8.0.2",typescript:"^4.7.4"},engines:{npm:">=7.0.0",node:">=16.0.0"}}});import br from"rimraf";import{blockFooter as vt}from"cli-block";import{join as ke,basename as De,extname as Pe}from"path";import{blockLineError as Ae}from"cli-block";import{kebabCase as $e,PascalCase as U}from"@sil/case";import{join as Se,extname as J}from"path";import{kebabCase as be}from"@sil/case";var N={};fe(N,{CONST_CASE:()=>x,WAIT:()=>j,asyncForEach:()=>n,asyncRemoveAttrs:()=>E,asyncRemoveTags:()=>v,createAFolder:()=>S,dirExist:()=>R,dirExists:()=>L,fileName:()=>p,fixJsx:()=>we,formatFile:()=>b,getAttrData:()=>O,getExtension:()=>c,getTagData:()=>_,prefixedName:()=>w,removeAttrs:()=>ve,removeFix:()=>f,removeStyle:()=>d,removeTags:()=>C,svgOnly:()=>u});import g from"path";import{existsSync as ue}from"fs";import{format as xe}from"prettier";import{kebabCase as $,upperSnakeCase as he}from"@sil/case";import{lstat as Te}from"fs/promises";var{mkdir:ge}=y("fs").promises,j=async(e=0)=>new Promise(t=>{setTimeout(()=>{t("resolved")},e)}),n=async(e,t)=>{for(let r=0;r<e.length;r++)await t(e[r],r,e)},p=(e,t=null)=>t?`${t.prefix}${g.basename(e).replace(".template","").replace(g.extname(e),"")}`:`${g.basename(e).replace(".template","").replace(g.extname(e),"")}`,B=e=>new RegExp(`<[/]{0,1}(${e}|${e})[^><]*>`,"g"),C=(e,t)=>(t.forEach(r=>{e=e.replace(B(r),"")}),e),v=async(e,t)=>(await n(t,r=>{e=e.replace(B(r),"")}),e),G=e=>new RegExp(` ${e}="[^"]*"`,"gi"),ve=(e,t)=>(t.forEach(r=>{e=e.replace(G(r),"")}),e),E=async(e,t)=>(await n(t,r=>{e=e.replace(G(r),"")}),e),d=e=>e.replace(/<style.*?>.*?<\/style>/ig,""),u=e=>e.substring(e.indexOf("<svg"),e.indexOf("</svg>")+6),w=(e,t)=>t===""?$(p(e)):t?`${t}-${$(p(e))}`:`icon-${$(p(e))}`,c=e=>{let t=g.basename(e.replace(".template","")).split(".");return t[0]="",t.join(".")},we=e=>e.replaceAll("fill-rule","fillRule").replaceAll("clip-rule","clipRule").replace("xlink:href","xlinkHref").replace("xmlns:xlink","xmlnsXlink"),S=async e=>{try{await ge(e,{recursive:!0,mode:509})}catch{console.log(`error creating folder ${e}`)}},L=async e=>{try{return await Te(e),!0}catch{return!1}},_=(e,t)=>{let r=new RegExp(`<${t}>(.|
)*?</${t}>`,"gi"),s=e.match(r);return s?C(s[0],[t]):""},O=(e,t)=>{let r=new RegExp(`${t}="(.|
)*?"`,"gi"),s=e.match(r);return s?C(s[0],[t]):""},b=(e,t)=>{let r=null;if(["scss","css","less","graphql","html","vue","yaml","mdx"].includes(t))r=t;else switch(t){case"js":case"jsx":r="babel";break;case"ts":case"tsx":r="typescript";break;case"json":r="json5";break;case"md":r="markdown";break}return r?xe(e,{parser:r}):e},R=e=>{try{return ue(e)}catch{return!1}},x=e=>{let t=he(e);return isNaN(parseInt(t.charAt(0)))?t:`_${t}`},f=(e,t)=>(e.startsWith(t.removePrefix)&&(e=e.replace(t.removePrefix,"")),e.endsWith(t.removeAffix)&&(e=e.replace(t.removeAffix,"")),e.includes(t.removeString)&&(e=e.replace(t.removeString,"")),e);var H=y("fs").promises,Y=(e,t,r)=>{let s=_(r,"style"),i=e.styles?e.styles.find(a=>a.name===t):null;return{data:s+(i?i.data:""),ext:"css"}},Fe=async e=>{let t=e.styleDir?e.styleDir:e.src;if(!R(t))return[];let r=await H.readdir(t),s=[];return await n(r,async i=>{if(![".css",".scss",".sass",".less",".stylus"].includes(J(i)))return;let a=await H.readFile(Se(t,i)).then(l=>l.toString());s.push({name:f(be(p(i)),e),extension:J(i),data:a||""})}),s},X=async e=>{try{let t=await Fe(e).then(r=>r);return{...e,styles:t}}catch(t){console.log(t)}};import K from"path";var F=y("fs").promises,Q=async e=>{e.template==null&&(console.error("You need to define a template"),e.template="src/templates/default");let t=[];if((await F.lstat(e.template)).isDirectory()){let s=await F.readdir(e.template);await n(s,async i=>{let a=await F.readFile(K.join(e.template,i));t.push({file:i,data:a.toString()})})}else{let s=await F.readFile(K.join(e.template));t.push({file:e.template,data:s.toString()})}return t};var V=y("fs").promises,Z=async e=>(e=await X(e),e=await je(e),e),je=async e=>{try{let t=await Le(e).then(s=>s),r=await Q(e).then(s=>s);return e.filter&&(t=t.filter(s=>s.og_name.includes(e.filter))),{...e,files:t,templates:r}}catch(t){console.log(t)}},Ce=async(e,t)=>{try{return V.readFile(ke(e.src,t)).then(r=>r.toString())}catch(r){console.warn(r)}},Ee=e=>{let t=O(e,"viewbox").replace(/[^\d. ]/g,"").split(" ");return t.length!==4&&Ae("Some file does not have a viewbox"),{width:parseInt(t[2],10),height:parseInt(t[3],10)}},Le=async e=>{let t=await V.readdir(e.src),r=[];return await n(t,async s=>{if(Pe(s)!==".svg")return;let i=await Ce(e,s).then(u),a=await E(e.svgOnly?u(i):i,e.removeAttrs),l=await v(e.svgOnly?u(i):i,e.removeTags),m=await v(a,e.removeTags),M=f($e(p(s)),e),pe=Y(e,M,i),{width:ce,height:me}=Ee(i),T=f(De(s),e);r.push({og_name:s,name:M,title:U(T),title_lowercase:T.toLowerCase(),fileName:w(T,e.prefix),componentName:U(w(T,e.prefix)),data:e.removeStyle?d(i):i,data_clean:{attrs:e.removeStyle?d(a):a,tags:e.removeStyle?d(l):l,both:e.removeStyle?d(m):m},width:ce,height:me,style:pe})}),r};import{join as h,dirname as Oe}from"path";import{render as qe}from"ejs";import{kebabCase as te,PascalCase as We}from"@sil/case";import{red as I,yellow as ze,blue as k,bold as Me,blockHeader as Be,blockLineError as Ge,blockLineSuccess as He,blockMid as q,blockRowLine as Je,blockSettings as Ye}from"cli-block";var{mkdir:Re,stat:Ne,writeFile:Ie}=y("fs").promises,Xe=ee(),Ke=async e=>{let t=Oe(e);if((await Ne(t)).isDirectory())return!0;Re(t)},D=async(e,t)=>{let r=t.dest?t.dest:e.dest;await S(r);let s=h(r,t.name+(t.ext?t.ext:"")),i=e.prependLine?`${e.prependLine}
${t.data}`:t.data;try{await Ke(s),await Ie(s,i,{encoding:"utf8",flag:"w"})}catch(a){console.log(a)}},Qe=async(e,t,r)=>qe(t.data,{...r,...e,...N,PascalCase:We,kebabCase:te,upperSnakeCase:x}),Ue=async function(e,t){await n(e.templates,async r=>{try{let s=await Qe(t,r,e),i=c(r.file);if(await D(e,{data:b(s,i),ext:i,name:te(p(t.name)),dest:e.dest}),He(`${t.name}${k(c(r.file))}${t.style?` ${k("+ style")}`:""}`),!(!e.inRoot&&e.parentIndex))return;let a=`export * from "./${t.name}";`,l=[".ts",".tsx"].includes(i)?".ts":".js";await D(e,{data:b(a,l),ext:l,name:"index",dest:e.dest})}catch(s){Ge(`${t.name}${k(c(r.file))} ${s}`)}})},Ve=e=>{let t={};return Object.keys(e).forEach(r=>{let s=e[r];(typeof s=="object"&&s.length>0||(typeof s=="string"||typeof s=="number"||typeof s=="boolean")&&s)&&(t[r]=s)}),t},Ze=async e=>{if(Be(`Generating Icons - ${Xe.version}`),q("Settings"),e.src&&e.dest){let t={...Ve(e),files:e.files.length};await Ye(t),e.files.length<1&&(q("Warnings"),Je(["src",`${ze().italic(e.src)} ${I("Your source folder doesn't contain any")+I().bold(" .svg ")+I("files.")}`,""]))}},et=async e=>{e.files.length>0&&(q(`${Me("Files")} ${k().bold("("+e.files.length+")")}`),await n(e.files,async t=>{let r=h(e.dest);e.iconFolder&&!e.inRoot?r=h(e.dest,e.iconFolder,p(t.name)):e.inRoot?e.iconFolder&&(r=h(e.dest,e.iconFolder)):r=h(e.dest,p(t.name)),await S(r),Ue({...e,dest:r},t)})),await j(100)},re=async e=>(await Ze(e),await et(e),e);import{lstat as tt,copyFile as se}from"fs/promises";import{basename as rt,join as P}from"path";import{blockLineSuccess as ie,blockMid as st}from"cli-block";var it=e=>typeof e=="string"?e.split(",").map(t=>t.trim()):e.map(t=>t.trim()),oe=async e=>{let t=it(e.copy);await n(t,async r=>{let s=r.includes("=")?r.split("=")[0]:r,i=r.includes("=")?r.split("=")[1]:rt(r),a=await tt(s);if(st("Copy"),a.isDirectory()){let l=P(s),m=P(e.dest,s.split("/")[s.split("/").length-1]);await se(l,m),ie(`Copied ${i}`)}else{let l=P(s),m=P(e.dest,i);await se(l,m),ie(`Copied ${i}`)}})};import{basename as ot,join as W,extname as at}from"path";import{blockErrors as ae,blockLineError as nt,blockLineSuccess as lt,blockMid as pt}from"cli-block";import{PascalCase as ct,kebabCase as mt}from"@sil/case";import dt from"ejs";var{readdir:ne,readFile:z,lstat:yt}=y("fs").promises,ft=async e=>{let t=[];try{let r=W(__dirname,e);if(!await L(r)){nt(`The directory ${r} does not exist`);return}let i=await ne(r);return await n(i,async a=>{let l=await z(W(__dirname,e,a));t.push({file:a,data:l.toString()})}),t}catch(r){console.log(r)}},gt=async e=>{let t=[];return await n(e,async r=>{if((await yt(r)).isDirectory()){let i=await ne(r);try{await n(i,async a=>{let l=await z(W(r,a));t.push({file:a,data:l.toString()})})}catch(a){ae(["Couldn't get the template ",a,i])}}else try{let i=await z(r);t.push({file:r,data:i.toString()})}catch(i){ae(["Couldn't get the template ",i,r])}}),t},ut=async(e,t="list")=>{let r=[];switch(t){case"list":r=e.listTemplate;break;case"index":r=e.indexTemplate;break;case"types":r=e.typesTemplate;break}if(r[0]==null||r.length<1){let s=`../src/templates/${t}`;return await ft(s)}return await gt(r)},xt=async(e,t)=>{let r=[];try{await n(t,s=>{r.push({name:p(s.file),ext:c(s.file),data:dt.render(s.data,{...e,PascalCase:ct,kebabCase:mt,upperSnakeCase:x})})})}catch(s){console.warn(s)}return r},ht=async(e,t)=>{await n(t,async r=>{await D(e,{...r,name:ot(r.name).replace(at(r.name),"")}),lt(r.name)})},A=async(e,t="list")=>{if(!e[t])return;pt(t);let r=await ut(e,t),s=await xt(e,r);await ht(e,s)};import{getArgs as Tt}from"@sil/args";var o={src:"",dest:"",styleDir:"",optimize:!0,template:null,inRoot:!1,copy:[],removeOld:!1,removePrefix:"",removeAffix:"",removeString:"",stripStyle:!1,prefix:"",list:!1,listTemplate:[],type:"",removeStyle:!1,removeAttrs:["fill","id","class"],removeTags:["svg"],svgOnly:!1,index:!1,indexTemplate:[],types:!1,typesTemplate:[],parentIndex:!1,prependLine:"",iconFolder:"",filter:""},le=()=>{let e=Tt();return{src:e.src||o.src,dest:e.dest||o.dest,styleDir:e.styleDir||o.styleDir,optimize:e.optimize||o.optimize,template:e.template||o.template,inRoot:e.inRoot||o.inRoot,copy:e.copy||o.copy,removeOld:e.removeOld||o.removeOld,removePrefix:e.removePrefix||o.removePrefix,removeAffix:e.removeAffix||o.removeAffix,removeString:e.removeString||o.removeString,stripStyle:e.stripStyle||o.stripStyle,prefix:e.prefix||o.prefix,list:e.list||o.list,listTemplate:e.listTemplate||o.listTemplate,type:e.type||o.type,removeStyle:e.removeStyle||o.removeStyle,removeAttrs:e.removeAttrs||o.removeAttrs,removeTags:e.removeTags||o.removeTags,svgOnly:e.svgOnly||o.svgOnly,index:e.index||o.index,indexTemplate:e.indexTemplate||o.indexTemplate,types:e.types||o.types,typesTemplate:e.typesTemplate||o.typesTemplate,parentIndex:e.parentIndex||o.parentIndex,prependLine:e.prependLine||o.prependLine,iconFolder:e.iconFolder||o.iconFolder,filter:e.filter||o.filter}};Z(le()).then(re).then(async e=>{await A(e,"list"),await A(e,"index"),await A(e,"types"),e.copy.length>0&&await oe(e)}).then(()=>{vt("Done!")});
//# sourceMappingURL=cli.mjs.map