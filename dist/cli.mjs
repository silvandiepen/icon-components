#!/usr/bin/env node
var me=Object.defineProperty;var m=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var de=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ye=(e,t)=>{for(var r in t)me(e,r,{get:t[r],enumerable:!0})};var ee=de((Bt,je)=>{je.exports={name:"icon-components",version:"1.9.15",description:"Generate Icon Components",main:"index.js",bin:"dist/cli.js",scripts:{test:"npm run build && npm run test:jest && npm run test:all","test:jest":"jest --verbose","test:external":"sh test/scripts/external.sh","test:lists":"sh test/scripts/lists.sh","test:templates":"sh test/scripts/templates.sh","test:cleanup":"sh test/scripts/cleanup.sh","test:copy":"sh test/scripts/copy.sh","test:prependline":"sh test/scripts/prependLine.sh","test:iconfolder":"sh test/scripts/iconFolder.sh","test:all":"npm run test:lists && npm run test:templates && npm run test:cleanup && npm run test:external && npm run test:copy && npm run test:prependline && npm run test:iconfolder",build:"tsup",lint:"eslint --ext .js,.ts --ignore-path .gitignore .","lint:fix":"eslint --ext .js,.ts --ignore-path .gitignore . --fix",docs:"npx gieter","docs:local":"node ../gieter/dist/index.js",dev:"tsc -w",prepublishOnly:"npm run test"},repository:{type:"git",url:"git+https://github.com/silvandiepen/icon-components.git"},keywords:["icons","svg","components","generate"],author:"Sil van Diepen",license:"MIT",bugs:{url:"https://github.com/silvandiepen/icon-components/issues"},homepage:"https://github.com/silvandiepen/icon-components#readme",dependencies:{"@sil/case":"^0.0.3","cli-block":"^1.3.8",ejs:"^3.1.8",kleur:"^4.1.5",mkdirp:"^1.0.4",prettier:"^2.7.1",rimraf:"^3.0.2",svgo:"^2.8.0",yargs:"^17.5.1"},devDependencies:{"@types/ejs":"^3.1.1","@types/jest":"^28.1.6","@types/node":"^18.6.2","@types/svgo":"^2.6.3","@typescript-eslint/eslint-plugin":"^5.31.0","@typescript-eslint/parser":"^5.31.0","@zerollup/ts-transform-paths":"^1.7.18",chai:"^4.3.6",eslint:"^8.20.0","eslint-config-prettier":"^8.5.0","eslint-plugin-import":"^2.26.0","eslint-plugin-prettier":"^4.2.1",jest:"^28.1.3","ts-jest":"^28.0.7","ts-node":"^10.9.2","tsc-alias":"^1.8.8",tslint:"^6.1.1",tsup:"^8.0.2",typescript:"^4.7.4"},engines:{npm:">=7.0.0",node:">=16.0.0"}}});import xr from"rimraf";import{blockFooter as yt}from"cli-block";import{join as be,basename as K,extname as Fe}from"path";import{blockLineError as ke}from"cli-block";import{kebabCase as De,PascalCase as Q}from"@sil/case";import{join as ve,extname as G}from"path";import{kebabCase as Se}from"@sil/case";var L={};ye(L,{CONST_CASE:()=>x,WAIT:()=>A,asyncForEach:()=>n,asyncRemoveAttrs:()=>$,asyncRemoveTags:()=>T,createAFolder:()=>q,dirExist:()=>E,fileName:()=>l,fixJsx:()=>he,formatFile:()=>v,getAttrData:()=>j,getExtension:()=>c,getTagData:()=>C,prefixedName:()=>h,removeAttrs:()=>Te,removeFix:()=>y,removeStyle:()=>d,removeTags:()=>P,svgOnly:()=>u});import f from"path";import{existsSync as ue}from"fs";import{format as xe}from"prettier";import{kebabCase as D,upperSnakeCase as ge}from"@sil/case";var{mkdir:fe}=m("fs").promises,A=async(e=0)=>new Promise(t=>{setTimeout(()=>{t("resolved")},e)}),n=async(e,t)=>{for(let r=0;r<e.length;r++)await t(e[r],r,e)},l=(e,t=null)=>t?`${t.prefix}${f.basename(e).replace(".template","").replace(f.extname(e),"")}`:`${f.basename(e).replace(".template","").replace(f.extname(e),"")}`,W=e=>new RegExp(`<[/]{0,1}(${e}|${e})[^><]*>`,"g"),P=(e,t)=>(t.forEach(r=>{e=e.replace(W(r),"")}),e),T=async(e,t)=>(await n(t,r=>{e=e.replace(W(r),"")}),e),B=e=>new RegExp(` ${e}="[^"]*"`,"gi"),Te=(e,t)=>(t.forEach(r=>{e=e.replace(B(r),"")}),e),$=async(e,t)=>(await n(t,r=>{e=e.replace(B(r),"")}),e),d=e=>e.replace(/<style.*?>.*?<\/style>/ig,""),u=e=>e.substring(e.indexOf("<svg"),e.indexOf("</svg>")+6),h=(e,t)=>t===""?D(l(e)):t?`${t}-${D(l(e))}`:`icon-${D(l(e))}`,c=e=>{let t=f.basename(e.replace(".template","")).split(".");return t[0]="",t.join(".")},he=e=>e.replaceAll("fill-rule","fillRule").replaceAll("clip-rule","clipRule").replace("xlink:href","xlinkHref").replace("xmlns:xlink","xmlnsXlink"),q=async e=>{try{await fe(e,{recursive:!0,mode:509})}catch{console.log(`error creating folder ${e}`)}},C=(e,t)=>{let r=new RegExp(`<${t}>(.|
)*?</${t}>`,"gi"),a=e.match(r);return a?P(a[0],[t]):""},j=(e,t)=>{let r=new RegExp(`${t}="(.|
)*?"`,"gi"),a=e.match(r);return a?P(a[0],[t]):""},v=(e,t)=>{let r=null;if(["scss","css","less","graphql","html","vue","yaml","mdx"].includes(t))r=t;else switch(t){case"js":case"jsx":r="babel";break;case"ts":case"tsx":r="typescript";break;case"json":r="json5";break;case"md":r="markdown";break}return r?xe(e,{parser:r}):e},E=e=>{try{return ue(e)}catch{return!1}},x=e=>{let t=ge(e);return isNaN(parseInt(t.charAt(0)))?t:`_${t}`},y=(e,t)=>(e.startsWith(t.removePrefix)&&(e=e.replace(t.removePrefix,"")),e.endsWith(t.removeAffix)&&(e=e.replace(t.removeAffix,"")),e.includes(t.removeString)&&(e=e.replace(t.removeString,"")),e);var M=m("fs").promises,H=(e,t,r)=>{let a=C(r,"style"),s=e.styles?e.styles.find(o=>o.name===t):null;return{data:a+(s?s.data:""),ext:"css"}},we=async e=>{let t=e.styleDir?e.styleDir:e.src;if(!E(t))return[];let r=await M.readdir(t),a=[];return await n(r,async s=>{if(![".css",".scss",".sass",".less",".stylus"].includes(G(s)))return;let o=await M.readFile(ve(t,s)).then(p=>p.toString());a.push({name:y(Se(l(s)),e),extension:G(s),data:o||""})}),a},J=async e=>{try{let t=await we(e).then(r=>r);return{...e,styles:t}}catch(t){console.log(t)}};import Y from"path";var S=m("fs").promises,X=async e=>{e.template==null&&(console.error("You need to define a template"),e.template="src/templates/default");let t=[];if((await S.lstat(e.template)).isDirectory()){let a=await S.readdir(e.template);await n(a,async s=>{let o=await S.readFile(Y.join(e.template,s));t.push({file:s,data:o.toString()})})}else{let a=await S.readFile(Y.join(e.template));t.push({file:e.template,data:a.toString()})}return t};var U=m("fs").promises,V=async e=>(e=await J(e),e=await Ae(e),e),Ae=async e=>{try{let t=await qe(e).then(a=>a),r=await X(e).then(a=>a);return e.filter&&(t=t.filter(a=>a.name.includes(e.filter))),{...e,files:t,templates:r}}catch(t){console.log(t)}},Pe=async(e,t)=>{try{return U.readFile(be(e.src,t)).then(r=>r.toString())}catch(r){console.warn(r)}},$e=e=>{let t=j(e,"viewbox").replace(/[^\d. ]/g,"").split(" ");return t.length!==4&&ke("Some file does not have a viewbox"),{width:parseInt(t[2],10),height:parseInt(t[3],10)}},qe=async e=>{let t=await U.readdir(e.src),r=[];return await n(t,async a=>{if(Fe(a)!==".svg")return;let s=await Pe(e,a).then(u),o=await $(e.svgOnly?u(s):s,e.removeAttrs),p=await T(e.svgOnly?u(s):s,e.removeTags),N=await T(o,e.removeTags),z=y(De(l(a)),e),le=H(e,z,s),{width:pe,height:ce}=$e(s);a=y(a,e),r.push({og_name:a,name:z,title:Q(K(a)),title_lowercase:K(a).toLowerCase(),fileName:h(a,e.prefix),componentName:Q(h(a,e.prefix)),data:e.removeStyle?d(s):s,data_clean:{attrs:e.removeStyle?d(o):o,tags:e.removeStyle?d(p):p,both:e.removeStyle?d(N):N},width:pe,height:ce,style:le})}),r};import{join as g,dirname as Ee}from"path";import{render as _e}from"ejs";import{kebabCase as te,PascalCase as Ie}from"@sil/case";import{red as R,yellow as Ne,blue as w,bold as ze,blockHeader as We,blockLineError as Be,blockLineSuccess as Me,blockMid as O,blockRowLine as Ge,blockSettings as He}from"cli-block";import Ce from"yargs";var i={src:"",dest:"",styleDir:"",optimize:!0,template:null,inRoot:!1,copy:[],removeOld:!1,removePrefix:"",removeAffix:"",removeString:"",stripStyle:!1,prefix:"",list:!1,listTemplate:[],type:"",removeStyle:!1,removeAttrs:["fill","id","class"],removeTags:["svg"],svgOnly:!1,index:!1,indexTemplate:[],types:!1,typesTemplate:[],parentIndex:!1,prependLine:"",iconFolder:"",filter:""},Z=()=>{let e=Ce.options({src:{required:!0,type:"string",default:i.src,alias:"source"},dest:{required:!0,type:"string",default:i.dest,alias:"destination"},sd:{required:!0,type:"string",default:i.styleDir,alias:"styleDir"},o:{required:!1,type:"boolean",default:i.optimize,alias:"optimize"},t:{required:!1,type:"string",default:i.template,alias:"template"},p:{required:!1,type:"string",default:i.prefix,alias:"prefix"},c:{required:!1,type:"array",default:i.copy,alias:"copy"},l:{required:!1,type:"boolean",default:i.list,alias:"list"},lt:{required:!1,type:"array",default:i.listTemplate,alias:"listTemplate"},ir:{required:!1,type:"boolean",default:i.inRoot,alias:"inRoot"},type:{required:!1,type:"string",default:i.type},ra:{required:!1,type:"array",default:i.removeAttrs,alias:"removeAttrs"},rt:{required:!1,type:"array",default:i.removeTags,alias:"removeTags"},rs:{required:!1,type:"boolean",default:i.removeStyle,alias:"removeStyle"},ro:{type:"boolean",default:i.removeOld,alias:"removeOld"},rmPrx:{type:"string",default:i.removePrefix,alias:"removePrefix"},rmAfx:{type:"string",default:i.removeAffix,alias:"removeAffix"},rmStr:{type:"string",default:i.removeString,alias:"removeString"},ss:{type:"boolean",default:i.stripStyle,alias:"stripStyle"},svg:{type:"boolean",default:i.svgOnly,alias:"svgOnly"},idx:{required:!1,type:"boolean",default:i.index,alias:"index"},idxt:{required:!1,type:"array",default:i.indexTemplate,alias:"indexTemplate"},tps:{required:!1,type:"boolean",default:i.types,alias:"types"},tpst:{required:!1,type:"array",default:i.typesTemplate,alias:"typesTemplate"},pidx:{required:!1,type:"boolean",default:i.parentIndex,alias:"parentIndex"},ppl:{required:!1,type:"string",default:i.prependLine,alias:"prependLine"},if:{required:!1,type:"string",default:i.iconFolder,alias:"iconFolder"},ft:{required:!1,type:"string",default:i.filter,alias:"filter"}}).argv;return{src:e.src,dest:e.dest,styleDir:e.sd,optimize:e.o,template:e.t,inRoot:e.ir,copy:e.c,removeOld:e.ro,removePrefix:e.rmPre,removeAffix:e.rmAff,removeString:e.rmStr,stripStyle:e.ss,prefix:e.p,list:e.lt.filter(Boolean).length>0?!0:e.l,listTemplate:e.lt,type:e.type,removeStyle:e.rs,removeAttrs:e.ra,removeTags:e.rt,svgOnly:e.svg,index:e.idxt.filter(Boolean).length>0?!0:e.idx,indexTemplate:e.idxt,types:e.tpst.filter(Boolean).length>0?!0:e.tps,typesTemplate:e.tpst,parentIndex:e.pidx,prependLine:e.ppl,iconFolder:e.if,filter:e.ft}};var{mkdir:Le,stat:Re,writeFile:Oe}=m("fs").promises,Je=ee(),Ye=async e=>{let t=Ee(e);if((await Re(t)).isDirectory())return!0;Le(t)},b=async(e,t)=>{let r=t.dest?t.dest:e.dest,a=g(r,t.name+(t.ext?t.ext:"")),s=e.prependLine?`${e.prependLine}
${t.data}`:t.data;try{await Ye(a),await Oe(a,s,{encoding:"utf8",flag:"w"})}catch(o){console.log(o)}},Xe=async(e,t,r)=>_e(t.data,{...r,...e,...L,PascalCase:Ie,kebabCase:te,upperSnakeCase:x}),Ke=async function(e,t){await n(e.templates,async r=>{try{let a=await Xe(t,r,e),s=c(r.file);if(await b(e,{data:v(a,s),ext:s,name:te(l(t.name)),dest:e.dest}),Me(`${t.name}${w(c(r.file))}${t.style?` ${w("+ style")}`:""}`),!(!e.inRoot&&e.parentIndex))return;let o=`export * from "./${t.name}";`,p=[".ts",".tsx"].includes(s)?".ts":".js";await b(e,{data:v(o,p),ext:p,name:"index",dest:e.dest})}catch(a){Be(`${t.name}${w(c(r.file))} ${a}`)}})},Qe=async e=>{if(We(`Generating Icons - ${Je.version}`),O("Settings"),e.src&&e.dest){let t={destination:e.dest,source:e.src,prefix:e.prefix,template:e.template?e.template:null,optimize:e.optimize,removeOld:e.removeOld,removeAttrs:e.removeAttrs,removeTags:e.removeTags,removeStyle:e.removeStyle,list:e.list?e.list:i.list,listTemplate:e.listTemplate?e.listTemplate:i.listTemplate,index:e.index?e.index:i.index,indexTemplate:e.indexTemplate?e.indexTemplate:i.indexTemplate,types:e.types?e.types:i.types,typesTemplate:e.typesTemplate?e.typesTemplate:i.typesTemplate,parentIndex:e.parentIndex?e.parentIndex:i.parentIndex,totalFiles:e.files.length,iconFolder:e.iconFolder?e.iconFolder:i.iconFolder,inRoot:e.inRoot?e.inRoot:i.inRoot,filter:e.filter?e.filter:i.filter};await He(t),e.files.length<1&&(O("Warnings"),Ge(["src",`${Ne().italic(e.src)} ${R("Your source folder doesn't contain any")+R().bold(" .svg ")+R("files.")}`,""]))}},Ue=async e=>{e.files.length>0&&(O(`${ze("Files")} ${w().bold("("+e.files.length+")")}`),await n(e.files,async t=>{let r=g(e.dest);e.iconFolder&&!e.inRoot?r=g(e.dest,e.iconFolder,l(t.name)):e.inRoot?e.iconFolder&&(r=g(e.dest,e.iconFolder)):r=g(e.dest,l(t.name)),await q(r),Ke({...e,dest:r},t)})),await A(100)},re=async e=>(await Qe(e),await Ue(e),e);import{lstat as Ve,copyFile as ae}from"fs/promises";import{basename as Ze,join as F}from"path";import{blockLineSuccess as ie}from"cli-block";var se=async e=>{await n(e.copy,async t=>{let r=t.includes("=")?t.split("=")[0]:t,a=t.includes("=")?t.split("=")[1]:Ze(t);if((await Ve(r)).isDirectory()){let o=F(r),p=F(e.dest,r.split("/")[r.split("/").length-1]);await ae(o,p),ie(`Copied ${a}`)}else{let o=F(r),p=F(e.dest,a);await ae(o,p),ie(`Copied ${a}`)}})};import{basename as et,join as _,extname as tt}from"path";import{blockErrors as oe,blockLineSuccess as rt,blockMid as at}from"cli-block";import{PascalCase as it,kebabCase as st}from"@sil/case";import nt from"ejs";var{readdir:ne,readFile:I,lstat:ot}=m("fs").promises,lt=async e=>{let t=[];try{let r=await ne(_(__dirname,e));return await n(r,async a=>{let s=await I(_(__dirname,e,a));t.push({file:a,data:s.toString()})}),t}catch(r){console.log(r)}},pt=async e=>{let t=[];return await n(e,async r=>{if((await ot(r)).isDirectory()){let s=await ne(r);try{await n(s,async o=>{let p=await I(_(r,o));t.push({file:o,data:p.toString()})})}catch(o){oe(["Couldn't get the template ",o,s])}}else try{let s=await I(r);t.push({file:r,data:s.toString()})}catch(s){oe(["Couldn't get the template ",s,r])}}),t},ct=async(e,t="list")=>{let r=[];switch(t){case"list":r=e.listTemplate;break;case"index":r=e.indexTemplate;break;case"types":r=e.typesTemplate;break}if(r[0]==null||r.length<1){let a=`../src/templates/${t}`;return await lt(a)}return await pt(r)},mt=async(e,t)=>{let r=[];try{await n(t,a=>{r.push({name:l(a.file),ext:c(a.file),data:nt.render(a.data,{...e,PascalCase:it,kebabCase:st,upperSnakeCase:x})})})}catch(a){console.warn(a)}return r},dt=async(e,t)=>{await n(t,async r=>{await b(e,{...r,name:et(r.name).replace(tt(r.name),"")}),rt(r.name)})},k=async(e,t="list")=>{if(!e[t])return;at(t);let r=await ct(e,t),a=await mt(e,r);await dt(e,a)};V(Z()).then(re).then(async e=>{await k(e,"list"),await k(e,"index"),await k(e,"types"),e.copy.length>0&&await se(e)}).then(()=>{yt("Done!")});
//# sourceMappingURL=cli.mjs.map