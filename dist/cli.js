#!/usr/bin/env node
var he=Object.create;var R=Object.defineProperty;var ve=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var we=Object.getPrototypeOf,be=Object.prototype.hasOwnProperty;var Fe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ke=(e,t)=>{for(var r in t)R(e,r,{get:t[r],enumerable:!0})},De=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Se(t))!be.call(e,i)&&i!==r&&R(e,i,{get:()=>t[i],enumerable:!(a=ve(t,i))||a.enumerable});return e};var S=(e,t,r)=>(r=e!=null?he(we(e)):{},De(t||!e||!e.__esModule?R(r,"default",{value:e,enumerable:!0}):r,e));var pe=Fe((ut,Re)=>{Re.exports={name:"icon-components",version:"1.9.15",description:"Generate Icon Components",main:"index.js",bin:"dist/cli.js",scripts:{test:"npm run build && npm run test:jest && npm run test:all","test:jest":"jest --verbose","test:external":"sh test/scripts/external.sh","test:lists":"sh test/scripts/lists.sh","test:templates":"sh test/scripts/templates.sh","test:cleanup":"sh test/scripts/cleanup.sh","test:copy":"sh test/scripts/copy.sh","test:prependline":"sh test/scripts/prependLine.sh","test:iconfolder":"sh test/scripts/iconFolder.sh","test:all":"npm run test:lists && npm run test:templates && npm run test:cleanup && npm run test:external && npm run test:copy && npm run test:prependline && npm run test:iconfolder",build:"tsup",lint:"eslint --ext .js,.ts --ignore-path .gitignore .","lint:fix":"eslint --ext .js,.ts --ignore-path .gitignore . --fix",docs:"npx gieter","docs:local":"node ../gieter/dist/index.js",dev:"tsc -w",prepublishOnly:"npm run test"},repository:{type:"git",url:"git+https://github.com/silvandiepen/icon-components.git"},keywords:["icons","svg","components","generate"],author:"Sil van Diepen",license:"MIT",bugs:{url:"https://github.com/silvandiepen/icon-components/issues"},homepage:"https://github.com/silvandiepen/icon-components#readme",dependencies:{"@sil/case":"^0.0.3","cli-block":"^1.3.8",ejs:"^3.1.8",kleur:"^4.1.5",mkdirp:"^1.0.4",prettier:"^2.7.1",rimraf:"^3.0.2",svgo:"^2.8.0",yargs:"^17.5.1"},devDependencies:{"@types/ejs":"^3.1.1","@types/jest":"^28.1.6","@types/node":"^18.6.2","@types/svgo":"^2.6.3","@typescript-eslint/eslint-plugin":"^5.31.0","@typescript-eslint/parser":"^5.31.0","@zerollup/ts-transform-paths":"^1.7.18",chai:"^4.3.6",eslint:"^8.20.0","eslint-config-prettier":"^8.5.0","eslint-plugin-import":"^2.26.0","eslint-plugin-prettier":"^4.2.1",jest:"^28.1.3","ts-jest":"^28.0.7","ts-node":"^10.9.2","tsc-alias":"^1.8.8",tslint:"^6.1.1",tsup:"^8.0.2",typescript:"^4.7.4"},engines:{npm:">=7.0.0",node:">=16.0.0"}}});var Ue=S(require("rimraf")),ue=require("cli-block");var f=require("path"),ie=require("cli-block"),k=require("@sil/case");var F=require("path"),ee=require("@sil/case");var M={};ke(M,{CONST_CASE:()=>b,WAIT:()=>O,asyncForEach:()=>l,asyncRemoveAttrs:()=>I,asyncRemoveTags:()=>P,createAFolder:()=>N,dirExist:()=>B,fileName:()=>p,fixJsx:()=>$e,formatFile:()=>q,getAttrData:()=>W,getExtension:()=>y,getTagData:()=>z,prefixedName:()=>$,removeAttrs:()=>Pe,removeFix:()=>v,removeStyle:()=>h,removeTags:()=>_,svgOnly:()=>w});var g=S(require("path")),K=require("fs"),Q=require("prettier"),T=require("@sil/case"),{mkdir:Ae}=require("fs").promises,O=async(e=0)=>new Promise(t=>{setTimeout(()=>{t("resolved")},e)}),l=async(e,t)=>{for(let r=0;r<e.length;r++)await t(e[r],r,e)},p=(e,t=null)=>t?`${t.prefix}${g.default.basename(e).replace(".template","").replace(g.default.extname(e),"")}`:`${g.default.basename(e).replace(".template","").replace(g.default.extname(e),"")}`,U=e=>new RegExp(`<[/]{0,1}(${e}|${e})[^><]*>`,"g"),_=(e,t)=>(t.forEach(r=>{e=e.replace(U(r),"")}),e),P=async(e,t)=>(await l(t,r=>{e=e.replace(U(r),"")}),e),V=e=>new RegExp(` ${e}="[^"]*"`,"gi"),Pe=(e,t)=>(t.forEach(r=>{e=e.replace(V(r),"")}),e),I=async(e,t)=>(await l(t,r=>{e=e.replace(V(r),"")}),e),h=e=>e.replace(/<style.*?>.*?<\/style>/ig,""),w=e=>e.substring(e.indexOf("<svg"),e.indexOf("</svg>")+6),$=(e,t)=>t===""?(0,T.kebabCase)(p(e)):t?`${t}-${(0,T.kebabCase)(p(e))}`:`icon-${(0,T.kebabCase)(p(e))}`,y=e=>{let t=g.default.basename(e.replace(".template","")).split(".");return t[0]="",t.join(".")},$e=e=>e.replaceAll("fill-rule","fillRule").replaceAll("clip-rule","clipRule").replace("xlink:href","xlinkHref").replace("xmlns:xlink","xmlnsXlink"),N=async e=>{try{await Ae(e,{recursive:!0,mode:509})}catch{console.log(`error creating folder ${e}`)}},z=(e,t)=>{let r=new RegExp(`<${t}>(.|
)*?</${t}>`,"gi"),a=e.match(r);return a?_(a[0],[t]):""},W=(e,t)=>{let r=new RegExp(`${t}="(.|
)*?"`,"gi"),a=e.match(r);return a?_(a[0],[t]):""},q=(e,t)=>{let r=null;if(["scss","css","less","graphql","html","vue","yaml","mdx"].includes(t))r=t;else switch(t){case"js":case"jsx":r="babel";break;case"ts":case"tsx":r="typescript";break;case"json":r="json5";break;case"md":r="markdown";break}return r?(0,Q.format)(e,{parser:r}):e},B=e=>{try{return(0,K.existsSync)(e)}catch{return!1}},b=e=>{let t=(0,T.upperSnakeCase)(e);return isNaN(parseInt(t.charAt(0)))?t:`_${t}`},v=(e,t)=>(e.startsWith(t.removePrefix)&&(e=e.replace(t.removePrefix,"")),e.endsWith(t.removeAffix)&&(e=e.replace(t.removeAffix,"")),e.includes(t.removeString)&&(e=e.replace(t.removeString,"")),e);var Z=require("fs").promises,te=(e,t,r)=>{let a=z(r,"style"),i=e.styles?e.styles.find(n=>n.name===t):null;return{data:a+(i?i.data:""),ext:"css"}},qe=async e=>{let t=e.styleDir?e.styleDir:e.src;if(!B(t))return[];let r=await Z.readdir(t),a=[];return await l(r,async i=>{if(![".css",".scss",".sass",".less",".stylus"].includes((0,F.extname)(i)))return;let n=await Z.readFile((0,F.join)(t,i)).then(c=>c.toString());a.push({name:v((0,ee.kebabCase)(p(i)),e),extension:(0,F.extname)(i),data:n||""})}),a},re=async e=>{try{let t=await qe(e).then(r=>r);return{...e,styles:t}}catch(t){console.log(t)}};var G=S(require("path"));var C=require("fs").promises,ae=async e=>{e.template==null&&(console.error("You need to define a template"),e.template="src/templates/default");let t=[];if((await C.lstat(e.template)).isDirectory()){let a=await C.readdir(e.template);await l(a,async i=>{let n=await C.readFile(G.default.join(e.template,i));t.push({file:i,data:n.toString()})})}else{let a=await C.readFile(G.default.join(e.template));t.push({file:e.template,data:a.toString()})}return t};var se=require("fs").promises,oe=async e=>(e=await re(e),e=await Ce(e),e),Ce=async e=>{try{let t=await Le(e).then(a=>a),r=await ae(e).then(a=>a);return e.filter&&(t=t.filter(a=>a.name.includes(e.filter))),{...e,files:t,templates:r}}catch(t){console.log(t)}},je=async(e,t)=>{try{return se.readFile((0,f.join)(e.src,t)).then(r=>r.toString())}catch(r){console.warn(r)}},Ee=e=>{let t=W(e,"viewbox").replace(/[^\d. ]/g,"").split(" ");return t.length!==4&&(0,ie.blockLineError)("Some file does not have a viewbox"),{width:parseInt(t[2],10),height:parseInt(t[3],10)}},Le=async e=>{let t=await se.readdir(e.src),r=[];return await l(t,async a=>{if((0,f.extname)(a)!==".svg")return;let i=await je(e,a).then(w),n=await I(e.svgOnly?w(i):i,e.removeAttrs),c=await P(e.svgOnly?w(i):i,e.removeTags),Y=await P(n,e.removeTags),X=v((0,k.kebabCase)(p(a)),e),xe=te(e,X,i),{width:ge,height:Te}=Ee(i);a=v(a,e),r.push({og_name:a,name:X,title:(0,k.PascalCase)((0,f.basename)(a)),title_lowercase:(0,f.basename)(a).toLowerCase(),fileName:$(a,e.prefix),componentName:(0,k.PascalCase)($(a,e.prefix)),data:e.removeStyle?h(i):i,data_clean:{attrs:e.removeStyle?h(n):n,tags:e.removeStyle?h(c):c,both:e.removeStyle?h(Y):Y},width:ge,height:Te,style:xe})}),r};var m=require("path"),ce=require("ejs"),D=require("@sil/case");var o=require("cli-block");var ne=S(require("yargs")),s={src:"",dest:"",styleDir:"",optimize:!0,template:null,inRoot:!1,copy:[],removeOld:!1,removePrefix:"",removeAffix:"",removeString:"",stripStyle:!1,prefix:"",list:!1,listTemplate:[],type:"",removeStyle:!1,removeAttrs:["fill","id","class"],removeTags:["svg"],svgOnly:!1,index:!1,indexTemplate:[],types:!1,typesTemplate:[],parentIndex:!1,prependLine:"",iconFolder:"",filter:""},le=()=>{let e=ne.default.options({src:{required:!0,type:"string",default:s.src,alias:"source"},dest:{required:!0,type:"string",default:s.dest,alias:"destination"},sd:{required:!0,type:"string",default:s.styleDir,alias:"styleDir"},o:{required:!1,type:"boolean",default:s.optimize,alias:"optimize"},t:{required:!1,type:"string",default:s.template,alias:"template"},p:{required:!1,type:"string",default:s.prefix,alias:"prefix"},c:{required:!1,type:"array",default:s.copy,alias:"copy"},l:{required:!1,type:"boolean",default:s.list,alias:"list"},lt:{required:!1,type:"array",default:s.listTemplate,alias:"listTemplate"},ir:{required:!1,type:"boolean",default:s.inRoot,alias:"inRoot"},type:{required:!1,type:"string",default:s.type},ra:{required:!1,type:"array",default:s.removeAttrs,alias:"removeAttrs"},rt:{required:!1,type:"array",default:s.removeTags,alias:"removeTags"},rs:{required:!1,type:"boolean",default:s.removeStyle,alias:"removeStyle"},ro:{type:"boolean",default:s.removeOld,alias:"removeOld"},rmPrx:{type:"string",default:s.removePrefix,alias:"removePrefix"},rmAfx:{type:"string",default:s.removeAffix,alias:"removeAffix"},rmStr:{type:"string",default:s.removeString,alias:"removeString"},ss:{type:"boolean",default:s.stripStyle,alias:"stripStyle"},svg:{type:"boolean",default:s.svgOnly,alias:"svgOnly"},idx:{required:!1,type:"boolean",default:s.index,alias:"index"},idxt:{required:!1,type:"array",default:s.indexTemplate,alias:"indexTemplate"},tps:{required:!1,type:"boolean",default:s.types,alias:"types"},tpst:{required:!1,type:"array",default:s.typesTemplate,alias:"typesTemplate"},pidx:{required:!1,type:"boolean",default:s.parentIndex,alias:"parentIndex"},ppl:{required:!1,type:"string",default:s.prependLine,alias:"prependLine"},if:{required:!1,type:"string",default:s.iconFolder,alias:"iconFolder"},ft:{required:!1,type:"string",default:s.filter,alias:"filter"}}).argv;return{src:e.src,dest:e.dest,styleDir:e.sd,optimize:e.o,template:e.t,inRoot:e.ir,copy:e.c,removeOld:e.ro,removePrefix:e.rmPre,removeAffix:e.rmAff,removeString:e.rmStr,stripStyle:e.ss,prefix:e.p,list:e.lt.filter(Boolean).length>0?!0:e.l,listTemplate:e.lt,type:e.type,removeStyle:e.rs,removeAttrs:e.ra,removeTags:e.rt,svgOnly:e.svg,index:e.idxt.filter(Boolean).length>0?!0:e.idx,indexTemplate:e.idxt,types:e.tpst.filter(Boolean).length>0?!0:e.tps,typesTemplate:e.tpst,parentIndex:e.pidx,prependLine:e.ppl,iconFolder:e.if,filter:e.ft}};var{mkdir:Oe,stat:_e,writeFile:Ie}=require("fs").promises,Ne=pe(),ze=async e=>{let t=(0,m.dirname)(e);if((await _e(t)).isDirectory())return!0;Oe(t)},j=async(e,t)=>{let r=t.dest?t.dest:e.dest,a=(0,m.join)(r,t.name+(t.ext?t.ext:"")),i=e.prependLine?`${e.prependLine}
${t.data}`:t.data;try{await ze(a),await Ie(a,i,{encoding:"utf8",flag:"w"})}catch(n){console.log(n)}},We=async(e,t,r)=>(0,ce.render)(t.data,{...r,...e,...M,PascalCase:D.PascalCase,kebabCase:D.kebabCase,upperSnakeCase:b}),Be=async function(e,t){await l(e.templates,async r=>{try{let a=await We(t,r,e),i=y(r.file);if(await j(e,{data:q(a,i),ext:i,name:(0,D.kebabCase)(p(t.name)),dest:e.dest}),(0,o.blockLineSuccess)(`${t.name}${(0,o.blue)(y(r.file))}${t.style?` ${(0,o.blue)("+ style")}`:""}`),!(!e.inRoot&&e.parentIndex))return;let n=`export * from "./${t.name}";`,c=[".ts",".tsx"].includes(i)?".ts":".js";await j(e,{data:q(n,c),ext:c,name:"index",dest:e.dest})}catch(a){(0,o.blockLineError)(`${t.name}${(0,o.blue)(y(r.file))} ${a}`)}})},Me=async e=>{if((0,o.blockHeader)(`Generating Icons - ${Ne.version}`),(0,o.blockMid)("Settings"),e.src&&e.dest){let t={destination:e.dest,source:e.src,prefix:e.prefix,template:e.template?e.template:null,optimize:e.optimize,removeOld:e.removeOld,removeAttrs:e.removeAttrs,removeTags:e.removeTags,removeStyle:e.removeStyle,list:e.list?e.list:s.list,listTemplate:e.listTemplate?e.listTemplate:s.listTemplate,index:e.index?e.index:s.index,indexTemplate:e.indexTemplate?e.indexTemplate:s.indexTemplate,types:e.types?e.types:s.types,typesTemplate:e.typesTemplate?e.typesTemplate:s.typesTemplate,parentIndex:e.parentIndex?e.parentIndex:s.parentIndex,totalFiles:e.files.length,iconFolder:e.iconFolder?e.iconFolder:s.iconFolder,inRoot:e.inRoot?e.inRoot:s.inRoot,filter:e.filter?e.filter:s.filter};await(0,o.blockSettings)(t),e.files.length<1&&((0,o.blockMid)("Warnings"),(0,o.blockRowLine)(["src",`${(0,o.yellow)().italic(e.src)} ${(0,o.red)("Your source folder doesn't contain any")+(0,o.red)().bold(" .svg ")+(0,o.red)("files.")}`,""]))}},Ge=async e=>{e.files.length>0&&((0,o.blockMid)(`${(0,o.bold)("Files")} ${(0,o.blue)().bold("("+e.files.length+")")}`),await l(e.files,async t=>{let r=(0,m.join)(e.dest);e.iconFolder&&!e.inRoot?r=(0,m.join)(e.dest,e.iconFolder,p(t.name)):e.inRoot?e.iconFolder&&(r=(0,m.join)(e.dest,e.iconFolder)):r=(0,m.join)(e.dest,p(t.name)),await N(r),Be({...e,dest:r},t)})),await O(100)},me=async e=>(await Me(e),await Ge(e),e);var A=require("fs/promises"),u=require("path"),H=require("cli-block");var de=async e=>{await l(e.copy,async t=>{let r=t.includes("=")?t.split("=")[0]:t,a=t.includes("=")?t.split("=")[1]:(0,u.basename)(t);if((await(0,A.lstat)(r)).isDirectory()){let n=(0,u.join)(r),c=(0,u.join)(e.dest,r.split("/")[r.split("/").length-1]);await(0,A.copyFile)(n,c),(0,H.blockLineSuccess)(`Copied ${a}`)}else{let n=(0,u.join)(r),c=(0,u.join)(e.dest,a);await(0,A.copyFile)(n,c),(0,H.blockLineSuccess)(`Copied ${a}`)}})};var d=require("path"),x=require("cli-block"),E=require("@sil/case");var fe=S(require("ejs"));var{readdir:ye,readFile:J,lstat:He}=require("fs").promises,Je=async e=>{let t=[];try{let r=await ye((0,d.join)(__dirname,e));return await l(r,async a=>{let i=await J((0,d.join)(__dirname,e,a));t.push({file:a,data:i.toString()})}),t}catch(r){console.log(r)}},Ye=async e=>{let t=[];return await l(e,async r=>{if((await He(r)).isDirectory()){let i=await ye(r);try{await l(i,async n=>{let c=await J((0,d.join)(r,n));t.push({file:n,data:c.toString()})})}catch(n){(0,x.blockErrors)(["Couldn't get the template ",n,i])}}else try{let i=await J(r);t.push({file:r,data:i.toString()})}catch(i){(0,x.blockErrors)(["Couldn't get the template ",i,r])}}),t},Xe=async(e,t="list")=>{let r=[];switch(t){case"list":r=e.listTemplate;break;case"index":r=e.indexTemplate;break;case"types":r=e.typesTemplate;break}if(r[0]==null||r.length<1){let a=`../src/templates/${t}`;return await Je(a)}return await Ye(r)},Ke=async(e,t)=>{let r=[];try{await l(t,a=>{r.push({name:p(a.file),ext:y(a.file),data:fe.default.render(a.data,{...e,PascalCase:E.PascalCase,kebabCase:E.kebabCase,upperSnakeCase:b})})})}catch(a){console.warn(a)}return r},Qe=async(e,t)=>{await l(t,async r=>{await j(e,{...r,name:(0,d.basename)(r.name).replace((0,d.extname)(r.name),"")}),(0,x.blockLineSuccess)(r.name)})},L=async(e,t="list")=>{if(!e[t])return;(0,x.blockMid)(t);let r=await Xe(e,t),a=await Ke(e,r);await Qe(e,a)};oe(le()).then(me).then(async e=>{await L(e,"list"),await L(e,"index"),await L(e,"types"),e.copy.length>0&&await de(e)}).then(()=>{(0,ue.blockFooter)("Done!")});
//# sourceMappingURL=cli.js.map