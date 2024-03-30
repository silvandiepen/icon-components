#!/usr/bin/env node
var ye=Object.defineProperty;var c=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var fe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),de=(e,t)=>{for(var r in t)ye(e,r,{get:t[r],enumerable:!0})};var ee=fe((Bt,Re)=>{Re.exports={name:"icon-components",version:"1.9.20",description:"Generate Icon Components",main:"index.js",bin:"dist/cli.js",scripts:{test:"npm run build && npm run test:jest && npm run test:all","test:jest":"jest --verbose","test:external":"sh test/scripts/external.sh","test:lists":"sh test/scripts/lists.sh","test:templates":"sh test/scripts/templates.sh","test:cleanup":"sh test/scripts/cleanup.sh","test:copy":"sh test/scripts/copy.sh","test:remove":"sh test/scripts/remove.sh","test:prependline":"sh test/scripts/prependLine.sh","test:iconfolder":"sh test/scripts/iconFolder.sh","test:all":"npm run test:lists && npm run test:remove && npm run test:templates && npm run test:cleanup && npm run test:external && npm run test:copy && npm run test:prependline && npm run test:iconfolder",build:"tsup",lint:"eslint --ext .js,.ts --ignore-path .gitignore .","lint:fix":"eslint --ext .js,.ts --ignore-path .gitignore . --fix",docs:"npx gieter","docs:local":"node ../gieter/dist/index.js",dev:"tsc -w",prepublishOnly:"npm run test"},repository:{type:"git",url:"git+https://github.com/silvandiepen/icon-components.git"},keywords:["icons","svg","components","generate"],author:"Sil van Diepen",license:"MIT",bugs:{url:"https://github.com/silvandiepen/icon-components/issues"},homepage:"https://github.com/silvandiepen/icon-components#readme",dependencies:{"@sil/args":"^0.1.0","@sil/case":"^0.0.3","cli-block":"^1.3.8",ejs:"^3.1.8",kleur:"^4.1.5",mkdirp:"^1.0.4",prettier:"^2.7.1",rimraf:"^3.0.2",svgo:"^2.8.0"},devDependencies:{"@types/ejs":"^3.1.1","@types/jest":"^28.1.6","@types/node":"^18.6.2","@types/svgo":"^2.6.3","@typescript-eslint/eslint-plugin":"^5.31.0","@typescript-eslint/parser":"^5.31.0","@zerollup/ts-transform-paths":"^1.7.18",chai:"^4.3.6",eslint:"^8.20.0","eslint-config-prettier":"^8.5.0","eslint-plugin-import":"^2.26.0","eslint-plugin-prettier":"^4.2.1",jest:"^28.1.3","ts-jest":"^28.0.7","ts-node":"^10.9.2","tsc-alias":"^1.8.8",tslint:"^6.1.1",tsup:"^8.0.2",typescript:"^4.7.4"},engines:{npm:">=7.0.0",node:">=16.0.0"}}});import hr from"rimraf";import{blockFooter as gt}from"cli-block";import{join as ke,basename as De,extname as Ae}from"path";import{blockLineError as Pe}from"cli-block";import{kebabCase as $e,PascalCase as U}from"@sil/case";import{join as we,extname as J}from"path";import{kebabCase as Fe}from"@sil/case";var _={};de(_,{CONST_CASE:()=>u,WAIT:()=>$,asyncForEach:()=>n,asyncRemoveAttrs:()=>E,asyncRemoveTags:()=>v,createAFolder:()=>S,dirExist:()=>O,dirExists:()=>j,fileName:()=>l,fixJsx:()=>Se,formatFile:()=>w,getAttrData:()=>R,getExtension:()=>m,getTagData:()=>L,prefixedName:()=>h,removeAttrs:()=>he,removeFix:()=>f,removeStyle:()=>y,removeTags:()=>C,svgOnly:()=>x});import d from"path";import{existsSync as ue}from"fs";import{format as ge}from"prettier";import{kebabCase as P,upperSnakeCase as Te}from"@sil/case";import{lstat as ve}from"fs/promises";var{mkdir:xe}=c("fs").promises,$=async(e=0)=>new Promise(t=>{setTimeout(()=>{t("resolved")},e)}),n=async(e,t)=>{for(let r=0;r<e.length;r++)await t(e[r],r,e)},l=(e,t=null)=>t?`${t.prefix}${d.basename(e).replace(".template","").replace(d.extname(e),"")}`:`${d.basename(e).replace(".template","").replace(d.extname(e),"")}`,B=e=>new RegExp(`<[/]{0,1}(${e}|${e})[^><]*>`,"g"),C=(e,t)=>(t.forEach(r=>{e=e.replace(B(r),"")}),e),v=async(e,t)=>(await n(t,r=>{e=e.replace(B(r),"")}),e),G=e=>new RegExp(` ${e}="[^"]*"`,"gi"),he=(e,t)=>(t.forEach(r=>{e=e.replace(G(r),"")}),e),E=async(e,t)=>(await n(t,r=>{e=e.replace(G(r),"")}),e),y=e=>e.replace(/<style.*?>.*?<\/style>/ig,""),x=e=>e.substring(e.indexOf("<svg"),e.indexOf("</svg>")+6),h=(e,t)=>t===""?P(l(e)):t?`${t}-${P(l(e))}`:`icon-${P(l(e))}`,m=e=>{let t=d.basename(e.replace(".template","")).split(".");return t[0]="",t.join(".")},Se=e=>e.replaceAll("fill-rule","fillRule").replaceAll("clip-rule","clipRule").replace("xlink:href","xlinkHref").replace("xmlns:xlink","xmlnsXlink"),S=async e=>{try{await xe(e,{recursive:!0,mode:509})}catch{console.log(`error creating folder ${e}`)}},j=async e=>{try{return await ve(e),!0}catch{return!1}},L=(e,t)=>{let r=new RegExp(`<${t}>(.|
)*?</${t}>`,"gi"),i=e.match(r);return i?C(i[0],[t]):""},R=(e,t)=>{let r=new RegExp(`${t}="(.|
)*?"`,"gi"),i=e.match(r);return i?C(i[0],[t]):""},w=(e,t)=>{let r=null;if(["scss","css","less","graphql","html","vue","yaml","mdx"].includes(t))r=t;else switch(t){case"js":case"jsx":r="babel";break;case"ts":case"tsx":r="typescript";break;case"json":r="json5";break;case"md":r="markdown";break}return r?ge(e,{parser:r}):e},O=e=>{try{return ue(e)}catch{return!1}},u=e=>{let t=Te(e);return isNaN(parseInt(t.charAt(0)))?t:`_${t}`},f=(e,t)=>(e.startsWith(t.removePrefix)&&(e=e.replace(t.removePrefix,"")),e.endsWith(t.removeAffix)&&(e=e.replace(t.removeAffix,"")),e.includes(t.removeString)&&(e=e.replace(t.removeString,"")),e);var H=c("fs").promises,Y=(e,t,r)=>{let i=L(r,"style"),o=e.styles?e.styles.find(s=>s.name===t):null;return{data:i+(o?o.data:""),ext:"css"}},be=async e=>{let t=e.styleDir?e.styleDir:e.src;if(!O(t))return[];let r=await H.readdir(t),i=[];return await n(r,async o=>{if(![".css",".scss",".sass",".less",".stylus"].includes(J(o)))return;let s=await H.readFile(we(t,o)).then(p=>p.toString());i.push({name:f(Fe(l(o)),e),extension:J(o),data:s||""})}),i},X=async e=>{try{let t=await be(e).then(r=>r);return{...e,styles:t}}catch(t){console.log(t)}};import K from"path";var F=c("fs").promises,Q=async e=>{e.template==null&&(console.error("You need to define a template"),e.template="src/templates/default");let t=[];if((await F.lstat(e.template)).isDirectory()){let i=await F.readdir(e.template);await n(i,async o=>{let s=await F.readFile(K.join(e.template,o));t.push({file:o,data:s.toString()})})}else{let i=await F.readFile(K.join(e.template));t.push({file:e.template,data:i.toString()})}return t};var V=c("fs").promises,Z=async e=>(e=await X(e),e=await Ce(e),e),Ce=async e=>{try{let t=await Le(e).then(i=>i),r=await Q(e).then(i=>i);return e.filter&&(t=t.filter(i=>i.og_name.includes(e.filter))),{...e,files:t,templates:r}}catch(t){console.log(t)}},Ee=async(e,t)=>{try{return V.readFile(ke(e.src,t)).then(r=>r.toString())}catch(r){console.warn(r)}},je=e=>{let t=R(e,"viewbox").replace(/[^\d. ]/g,"").split(" ");return t.length!==4&&Pe("Some file does not have a viewbox"),{width:parseInt(t[2],10),height:parseInt(t[3],10)}},Le=async e=>{let t=await V.readdir(e.src),r=[];return await n(t,async i=>{if(Ae(i)!==".svg")return;let o=await Ee(e,i).then(x),s=await E(e.svgOnly?x(o):o,e.removeAttrs),p=await v(e.svgOnly?x(o):o,e.removeTags),W=await v(s,e.removeTags),M=f($e(l(i)),e),pe=Y(e,M,o),{width:me,height:ce}=je(o),T=f(De(i),e);r.push({og_name:i,name:M,title:U(T),title_lowercase:T.toLowerCase(),fileName:h(T,e.prefix),componentName:U(h(T,e.prefix)),data:e.removeStyle?y(o):o,data_clean:{attrs:e.removeStyle?y(s):s,tags:e.removeStyle?y(p):p,both:e.removeStyle?y(W):W},width:me,height:ce,style:pe})}),r};import{join as g,dirname as Oe}from"path";import{render as ze}from"ejs";import{kebabCase as te,PascalCase as qe}from"@sil/case";import{red as I,yellow as We,blue as b,bold as Me,blockHeader as Be,blockLineError as Ge,blockLineSuccess as He,blockMid as N,blockRowLine as Je,blockSettings as Ye}from"cli-block";var{mkdir:_e,stat:Ie,writeFile:Ne}=c("fs").promises,Xe=ee(),Ke=async e=>{let t=Oe(e);if((await Ie(t)).isDirectory())return!0;_e(t)},k=async(e,t)=>{let r=t.dest?t.dest:e.dest;await S(r);let i=g(r,t.name+(t.ext?t.ext:"")),o=e.prependLine?`${e.prependLine}
${t.data}`:t.data;try{await Ke(i),await Ne(i,o,{encoding:"utf8",flag:"w"})}catch(s){console.log(s)}},Qe=async(e,t,r)=>ze(t.data,{...r,...e,..._,PascalCase:qe,kebabCase:te,upperSnakeCase:u}),Ue=async function(e,t){await n(e.templates,async r=>{try{let i=await Qe(t,r,e),o=m(r.file);if(await k(e,{data:w(i,o),ext:o,name:te(l(t.name)),dest:e.dest}),He(`${t.name}${b(m(r.file))}${t.style?` ${b("+ style")}`:""}`),!(!e.inRoot&&e.parentIndex))return;let s=`export * from "./${t.name}";`,p=[".ts",".tsx"].includes(o)?".ts":".js";await k(e,{data:w(s,p),ext:p,name:"index",dest:e.dest})}catch(i){Ge(`${t.name}${b(m(r.file))} ${i}`)}})},Ve=async e=>{if(Be(`Generating Icons - ${Xe.version}`),N("Settings"),e.src&&e.dest){let t={dest:e.dest,src:e.src,template:e.template?e.template:null};e.removeAttrs.length>0&&(t.removeAttrs=e.removeAttrs),e.removeTags.length>0&&(t.removeTags=e.removeTags),e.removeStyle&&(t.removeStyle=e.removeStyle),e.prefix&&(t.prefix=e.prefix),e.optimize&&(t.optimize=e.optimize),e.stripStyle&&(t.stripStyle=e.stripStyle),e.removeOld&&(t.removeOld=e.removeOld),e.removeAffix&&(t.removeAffix=e.removeAffix),e.removeString&&(t.removeString=e.removeString),e.removePrefix&&(t.removePrefix=e.removePrefix),e.list&&(t.list=e.list),e.listTemplate.length&&(t.listTemplate=e.listTemplate),e.index&&(t.index=e.index),e.indexTemplate.length&&(t.indexTemplate=e.indexTemplate),e.types&&(t.types=e.types),e.typesTemplate.length&&(t.typesTemplate=e.typesTemplate),e.parentIndex&&(t.parentIndex=e.parentIndex),e.iconFolder&&(t.iconFolder=e.iconFolder),e.inRoot&&(t.inRoot=e.inRoot),e.filter&&(t.filter=e.filter),await Ye(t),e.files.length<1&&(N("Warnings"),Je(["src",`${We().italic(e.src)} ${I("Your source folder doesn't contain any")+I().bold(" .svg ")+I("files.")}`,""]))}},Ze=async e=>{e.files.length>0&&(N(`${Me("Files")} ${b().bold("("+e.files.length+")")}`),await n(e.files,async t=>{let r=g(e.dest);e.iconFolder&&!e.inRoot?r=g(e.dest,e.iconFolder,l(t.name)):e.inRoot?e.iconFolder&&(r=g(e.dest,e.iconFolder)):r=g(e.dest,l(t.name)),await S(r),Ue({...e,dest:r},t)})),await $(100)},re=async e=>(await Ve(e),await Ze(e),e);import{lstat as et,copyFile as ie}from"fs/promises";import{basename as tt,join as D}from"path";import{blockLineSuccess as oe}from"cli-block";var ae=async e=>{await n(e.copy,async t=>{let r=t.includes("=")?t.split("=")[0]:t,i=t.includes("=")?t.split("=")[1]:tt(t);if((await et(r)).isDirectory()){let s=D(r),p=D(e.dest,r.split("/")[r.split("/").length-1]);await ie(s,p),oe(`Copied ${i}`)}else{let s=D(r),p=D(e.dest,i);await ie(s,p),oe(`Copied ${i}`)}})};import{basename as rt,join as z,extname as it}from"path";import{blockErrors as se,blockLineError as ot,blockLineSuccess as at,blockMid as st}from"cli-block";import{PascalCase as nt,kebabCase as lt}from"@sil/case";import mt from"ejs";var{readdir:ne,readFile:q,lstat:pt}=c("fs").promises,ct=async e=>{let t=[];try{if(!await j(e)){ot(`The directory ${e} does not exist`);return}let i=await ne(z(__dirname,e));return await n(i,async o=>{let s=await q(z(__dirname,e,o));t.push({file:o,data:s.toString()})}),t}catch(r){console.log(r)}},yt=async e=>{let t=[];return await n(e,async r=>{if((await pt(r)).isDirectory()){let o=await ne(r);try{await n(o,async s=>{let p=await q(z(r,s));t.push({file:s,data:p.toString()})})}catch(s){se(["Couldn't get the template ",s,o])}}else try{let o=await q(r);t.push({file:r,data:o.toString()})}catch(o){se(["Couldn't get the template ",o,r])}}),t},ft=async(e,t="list")=>{let r=[];switch(t){case"list":r=e.listTemplate;break;case"index":r=e.indexTemplate;break;case"types":r=e.typesTemplate;break}if(r[0]==null||r.length<1){let i=`../src/templates/${t}`;return await ct(i)}return await yt(r)},dt=async(e,t)=>{let r=[];try{await n(t,i=>{r.push({name:l(i.file),ext:m(i.file),data:mt.render(i.data,{...e,PascalCase:nt,kebabCase:lt,upperSnakeCase:u})})})}catch(i){console.warn(i)}return r},xt=async(e,t)=>{await n(t,async r=>{await k(e,{...r,name:rt(r.name).replace(it(r.name),"")}),at(r.name)})},A=async(e,t="list")=>{if(!e[t])return;st(t);let r=await ft(e,t),i=await dt(e,r);await xt(e,i)};import{getArgs as ut}from"@sil/args";var a={src:"",dest:"",styleDir:"",optimize:!0,template:null,inRoot:!1,copy:[],removeOld:!1,removePrefix:"",removeAffix:"",removeString:"",stripStyle:!1,prefix:"",list:!1,listTemplate:[],type:"",removeStyle:!1,removeAttrs:["fill","id","class"],removeTags:["svg"],svgOnly:!1,index:!1,indexTemplate:[],types:!1,typesTemplate:[],parentIndex:!1,prependLine:"",iconFolder:"",filter:""},le=()=>{let e=ut();return{src:e.src||a.src,dest:e.dest||a.dest,styleDir:e.styleDir||a.styleDir,optimize:e.optimize||a.optimize,template:e.template||a.template,inRoot:e.inRoot||a.inRoot,copy:e.copy||a.copy,removeOld:e.removeOld||a.removeOld,removePrefix:e.removePrefix||a.removePrefix,removeAffix:e.removeAffix||a.removeAffix,removeString:e.removeString||a.removeString,stripStyle:e.stripStyle||a.stripStyle,prefix:e.prefix||a.prefix,list:e.list||a.list,listTemplate:e.listTemplate||a.listTemplate,type:e.type||a.type,removeStyle:e.removeStyle||a.removeStyle,removeAttrs:e.removeAttrs||a.removeAttrs,removeTags:e.removeTags||a.removeTags,svgOnly:e.svgOnly||a.svgOnly,index:e.index||a.index,indexTemplate:e.indexTemplate||a.indexTemplate,types:e.types||a.types,typesTemplate:e.typesTemplate||a.typesTemplate,parentIndex:e.parentIndex||a.parentIndex,prependLine:e.prependLine||a.prependLine,iconFolder:e.iconFolder||a.iconFolder,filter:e.filter||a.filter}};Z(le()).then(re).then(async e=>{await A(e,"list"),await A(e,"index"),await A(e,"types"),e.copy.length>0&&await ae(e)}).then(()=>{gt("Done!")});
//# sourceMappingURL=cli.mjs.map