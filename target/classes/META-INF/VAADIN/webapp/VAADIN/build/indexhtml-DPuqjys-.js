(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.webPush=!1;window.Vaadin.featureFlags.formFillerAddon=!1;window.Vaadin.featureFlags.reactRouter=!1;const ua="modulepreload",ga=function(a,t){return new URL(a,t).href},fe={},Vt=function(t,e,o){let r=Promise.resolve();if(e&&e.length>0){const i=document.getElementsByTagName("link");r=Promise.all(e.map(n=>{if(n=ga(n,o),n in fe)return;fe[n]=!0;const l=n.endsWith(".css"),s=l?'[rel="stylesheet"]':"";if(!!o)for(let u=i.length-1;u>=0;u--){const m=i[u];if(m.href===n&&(!l||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${s}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":ua,l||(p.as="script",p.crossOrigin=""),p.href=n,document.head.appendChild(p),l)return new Promise((u,m)=>{p.addEventListener("load",u),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${n}`)))})}))}return r.then(()=>t()).catch(i=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i})};function Ot(a){return a=a||[],Array.isArray(a)?a:[a]}function L(a){return`[Vaadin.Router] ${a}`}function ha(a){if(typeof a!="object")return String(a);const t=Object.prototype.toString.call(a).match(/ (.*)\]$/)[1];return t==="Object"||t==="Array"?`${t} ${JSON.stringify(a)}`:t}const It="module",Et="nomodule",Ht=[It,Et];function ue(a){if(!a.match(/.+\.[m]?js$/))throw new Error(L(`Unsupported type for bundle "${a}": .js or .mjs expected.`))}function Me(a){if(!a||!R(a.path))throw new Error(L('Expected route config to be an object with a "path" string property, or an array of such objects'));const t=a.bundle,e=["component","redirect","bundle"];if(!X(a.action)&&!Array.isArray(a.children)&&!X(a.children)&&!$t(t)&&!e.some(o=>R(a[o])))throw new Error(L(`Expected route config "${a.path}" to include either "${e.join('", "')}" or "action" function but none found.`));if(t)if(R(t))ue(t);else if(Ht.some(o=>o in t))Ht.forEach(o=>o in t&&ue(t[o]));else throw new Error(L('Expected route bundle to include either "'+Et+'" or "'+It+'" keys, or both'));a.redirect&&["bundle","component"].forEach(o=>{o in a&&console.warn(L(`Route config "${a.path}" has both "redirect" and "${o}" properties, and "redirect" will always override the latter. Did you mean to only use "${o}"?`))})}function ge(a){Ot(a).forEach(t=>Me(t))}function he(a,t){let e=document.head.querySelector('script[src="'+a+'"][async]');return e||(e=document.createElement("script"),e.setAttribute("src",a),t===It?e.setAttribute("type",It):t===Et&&e.setAttribute(Et,""),e.async=!0),new Promise((o,r)=>{e.onreadystatechange=e.onload=i=>{e.__dynamicImportLoaded=!0,o(i)},e.onerror=i=>{e.parentNode&&e.parentNode.removeChild(e),r(i)},e.parentNode===null?document.head.appendChild(e):e.__dynamicImportLoaded&&o()})}function ba(a){return R(a)?he(a):Promise.race(Ht.filter(t=>t in a).map(t=>he(a[t],t)))}function rt(a,t){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${a}`,{cancelable:a==="go",detail:t}))}function $t(a){return typeof a=="object"&&!!a}function X(a){return typeof a=="function"}function R(a){return typeof a=="string"}function qe(a){const t=new Error(L(`Page not found (${a.pathname})`));return t.context=a,t.code=404,t}const tt=new class{};function xa(a){const t=a.port,e=a.protocol,i=e==="http:"&&t==="80"||e==="https:"&&t==="443"?a.hostname:a.host;return`${e}//${i}`}function be(a){if(a.defaultPrevented||a.button!==0||a.shiftKey||a.ctrlKey||a.altKey||a.metaKey)return;let t=a.target;const e=a.composedPath?a.composedPath():a.path||[];for(let l=0;l<e.length;l++){const s=e[l];if(s.nodeName&&s.nodeName.toLowerCase()==="a"){t=s;break}}for(;t&&t.nodeName.toLowerCase()!=="a";)t=t.parentNode;if(!t||t.nodeName.toLowerCase()!=="a"||t.target&&t.target.toLowerCase()!=="_self"||t.hasAttribute("download")||t.hasAttribute("router-ignore")||t.pathname===window.location.pathname&&t.hash!==""||(t.origin||xa(t))!==window.location.origin)return;const{pathname:r,search:i,hash:n}=t;rt("go",{pathname:r,search:i,hash:n})&&(a.preventDefault(),a&&a.type==="click"&&window.scrollTo(0,0))}const va={activate(){window.document.addEventListener("click",be)},inactivate(){window.document.removeEventListener("click",be)}},ya=/Trident/.test(navigator.userAgent);ya&&!X(window.PopStateEvent)&&(window.PopStateEvent=function(a,t){t=t||{};var e=document.createEvent("Event");return e.initEvent(a,!!t.bubbles,!!t.cancelable),e.state=t.state||null,e},window.PopStateEvent.prototype=window.Event.prototype);function xe(a){if(a.state==="vaadin-router-ignore")return;const{pathname:t,search:e,hash:o}=window.location;rt("go",{pathname:t,search:e,hash:o})}const wa={activate(){window.addEventListener("popstate",xe)},inactivate(){window.removeEventListener("popstate",xe)}};var at=Ge,ka=Kt,_a=Ia,za=Ve,Sa=We,Ze="/",Fe="./",Oa=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Kt(a,t){for(var e=[],o=0,r=0,i="",n=t&&t.delimiter||Ze,l=t&&t.delimiters||Fe,s=!1,d;(d=Oa.exec(a))!==null;){var p=d[0],u=d[1],m=d.index;if(i+=a.slice(r,m),r=m+p.length,u){i+=u[1],s=!0;continue}var g="",j=a[r],Z=d[2],ut=d[3],At=d[4],I=d[5];if(!s&&i.length){var T=i.length-1;l.indexOf(i[T])>-1&&(g=i[T],i=i.slice(0,T))}i&&(e.push(i),i="",s=!1);var F=g!==""&&j!==void 0&&j!==g,V=I==="+"||I==="*",Dt=I==="?"||I==="*",C=g||n,gt=ut||At;e.push({name:Z||o++,prefix:g,delimiter:C,optional:Dt,repeat:V,partial:F,pattern:gt?Ea(gt):"[^"+A(C)+"]+?"})}return(i||r<a.length)&&e.push(i+a.substr(r)),e}function Ia(a,t){return Ve(Kt(a,t))}function Ve(a){for(var t=new Array(a.length),e=0;e<a.length;e++)typeof a[e]=="object"&&(t[e]=new RegExp("^(?:"+a[e].pattern+")$"));return function(o,r){for(var i="",n=r&&r.encode||encodeURIComponent,l=0;l<a.length;l++){var s=a[l];if(typeof s=="string"){i+=s;continue}var d=o?o[s.name]:void 0,p;if(Array.isArray(d)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(d.length===0){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var u=0;u<d.length;u++){if(p=n(d[u],s),!t[l].test(p))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');i+=(u===0?s.prefix:s.delimiter)+p}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(p=n(String(d),s),!t[l].test(p))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+p+'"');i+=s.prefix+p;continue}if(s.optional){s.partial&&(i+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}return i}}function A(a){return a.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Ea(a){return a.replace(/([=!:$/()])/g,"\\$1")}function He(a){return a&&a.sensitive?"":"i"}function $a(a,t){if(!t)return a;var e=a.source.match(/\((?!\?)/g);if(e)for(var o=0;o<e.length;o++)t.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return a}function Ra(a,t,e){for(var o=[],r=0;r<a.length;r++)o.push(Ge(a[r],t,e).source);return new RegExp("(?:"+o.join("|")+")",He(e))}function La(a,t,e){return We(Kt(a,e),t,e)}function We(a,t,e){e=e||{};for(var o=e.strict,r=e.start!==!1,i=e.end!==!1,n=A(e.delimiter||Ze),l=e.delimiters||Fe,s=[].concat(e.endsWith||[]).map(A).concat("$").join("|"),d=r?"^":"",p=a.length===0,u=0;u<a.length;u++){var m=a[u];if(typeof m=="string")d+=A(m),p=u===a.length-1&&l.indexOf(m[m.length-1])>-1;else{var g=m.repeat?"(?:"+m.pattern+")(?:"+A(m.delimiter)+"(?:"+m.pattern+"))*":m.pattern;t&&t.push(m),m.optional?m.partial?d+=A(m.prefix)+"("+g+")?":d+="(?:"+A(m.prefix)+"("+g+"))?":d+=A(m.prefix)+"("+g+")"}}return i?(o||(d+="(?:"+n+")?"),d+=s==="$"?"$":"(?="+s+")"):(o||(d+="(?:"+n+"(?="+s+"))?"),p||(d+="(?="+n+"|"+s+")")),new RegExp(d,He(e))}function Ge(a,t,e){return a instanceof RegExp?$a(a,t):Array.isArray(a)?Ra(a,t,e):La(a,t,e)}at.parse=ka;at.compile=_a;at.tokensToFunction=za;at.tokensToRegExp=Sa;const{hasOwnProperty:Ta}=Object.prototype,Wt=new Map;Wt.set("|false",{keys:[],pattern:/(?:)/});function ve(a){try{return decodeURIComponent(a)}catch{return a}}function ja(a,t,e,o,r){e=!!e;const i=`${a}|${e}`;let n=Wt.get(i);if(!n){const d=[];n={keys:d,pattern:at(a,d,{end:e,strict:a===""})},Wt.set(i,n)}const l=n.pattern.exec(t);if(!l)return null;const s=Object.assign({},r);for(let d=1;d<l.length;d++){const p=n.keys[d-1],u=p.name,m=l[d];(m!==void 0||!Ta.call(s,u))&&(p.repeat?s[u]=m?m.split(p.delimiter).map(ve):[]:s[u]=m&&ve(m))}return{path:l[0],keys:(o||[]).concat(n.keys),params:s}}function Ke(a,t,e,o,r){let i,n,l=0,s=a.path||"";return s.charAt(0)==="/"&&(e&&(s=s.substr(1)),e=!0),{next(d){if(a===d)return{done:!0};const p=a.__children=a.__children||a.children;if(!i&&(i=ja(s,t,!p,o,r),i))return{done:!1,value:{route:a,keys:i.keys,params:i.params,path:i.path}};if(i&&p)for(;l<p.length;){if(!n){const m=p[l];m.parent=a;let g=i.path.length;g>0&&t.charAt(g)==="/"&&(g+=1),n=Ke(m,t.substr(g),e,i.keys,i.params)}const u=n.next(d);if(!u.done)return{done:!1,value:u.value};n=null,l++}return{done:!0}}}}function Ca(a){if(X(a.route.action))return a.route.action(a)}function Aa(a,t){let e=t;for(;e;)if(e=e.parent,e===a)return!0;return!1}function Da(a){let t=`Path '${a.pathname}' is not properly resolved due to an error.`;const e=(a.route||{}).path;return e&&(t+=` Resolution had failed on route: '${e}'`),t}function Ua(a,t){const{route:e,path:o}=t;if(e&&!e.__synthetic){const r={path:o,route:e};if(!a.chain)a.chain=[];else if(e.parent){let i=a.chain.length;for(;i--&&a.chain[i].route&&a.chain[i].route!==e.parent;)a.chain.pop()}a.chain.push(r)}}class dt{constructor(t,e={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e.baseUrl||"",this.errorHandler=e.errorHandler,this.resolveRoute=e.resolveRoute||Ca,this.context=Object.assign({resolver:this},e.context),this.root=Array.isArray(t)?{path:"",__children:t,parent:null,__synthetic:!0}:t,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(t){ge(t);const e=[...Ot(t)];this.root.__children=e}addRoutes(t){return ge(t),this.root.__children.push(...Ot(t)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(t){const e=Object.assign({},this.context,R(t)?{pathname:t}:t),o=Ke(this.root,this.__normalizePathname(e.pathname),this.baseUrl),r=this.resolveRoute;let i=null,n=null,l=e;function s(d,p=i.value.route,u){const m=u===null&&i.value.route;return i=n||o.next(m),n=null,!d&&(i.done||!Aa(p,i.value.route))?(n=i,Promise.resolve(tt)):i.done?Promise.reject(qe(e)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},e,i.value),Ua(l,i.value),Promise.resolve(r(l)).then(g=>g!=null&&g!==tt?(l.result=g.result||g,l):s(d,p,g)))}return e.next=s,Promise.resolve().then(()=>s(!0,this.root)).catch(d=>{const p=Da(l);if(d?console.warn(p):d=new Error(p),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(t,e){return new URL(t,e)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(t){if(!this.baseUrl)return t;const e=this.__effectiveBaseUrl,o=this.constructor.__createUrl(t,e).href;if(o.slice(0,e.length)===e)return o.slice(e.length)}}dt.pathToRegexp=at;const{pathToRegexp:ye}=dt,we=new Map;function Je(a,t,e){const o=t.name||t.component;if(o&&(a.has(o)?a.get(o).push(t):a.set(o,[t])),Array.isArray(e))for(let r=0;r<e.length;r++){const i=e[r];i.parent=t,Je(a,i,i.__children||i.children)}}function ke(a,t){const e=a.get(t);if(e&&e.length>1)throw new Error(`Duplicate route with name "${t}". Try seting unique 'name' route properties.`);return e&&e[0]}function _e(a){let t=a.path;return t=Array.isArray(t)?t[0]:t,t!==void 0?t:""}function Ya(a,t={}){if(!(a instanceof dt))throw new TypeError("An instance of Resolver is expected");const e=new Map;return(o,r)=>{let i=ke(e,o);if(!i&&(e.clear(),Je(e,a.root,a.root.__children),i=ke(e,o),!i))throw new Error(`Route "${o}" not found`);let n=we.get(i.fullPath);if(!n){let s=_e(i),d=i.parent;for(;d;){const g=_e(d);g&&(s=g.replace(/\/$/,"")+"/"+s.replace(/^\//,"")),d=d.parent}const p=ye.parse(s),u=ye.tokensToFunction(p),m=Object.create(null);for(let g=0;g<p.length;g++)R(p[g])||(m[p[g].name]=!0);n={toPath:u,keys:m},we.set(s,n),i.fullPath=s}let l=n.toPath(r,t)||"/";if(t.stringifyQueryParams&&r){const s={},d=Object.keys(r);for(let u=0;u<d.length;u++){const m=d[u];n.keys[m]||(s[m]=r[m])}const p=t.stringifyQueryParams(s);p&&(l+=p.charAt(0)==="?"?p:`?${p}`)}return l}}let ze=[];function Pa(a){ze.forEach(t=>t.inactivate()),a.forEach(t=>t.activate()),ze=a}const Ba=a=>{const t=getComputedStyle(a).getPropertyValue("animation-name");return t&&t!=="none"},Na=(a,t)=>{const e=()=>{a.removeEventListener("animationend",e),t()};a.addEventListener("animationend",e)};function Se(a,t){return a.classList.add(t),new Promise(e=>{if(Ba(a)){const o=a.getBoundingClientRect(),r=`height: ${o.bottom-o.top}px; width: ${o.right-o.left}px`;a.setAttribute("style",`position: absolute; ${r}`),Na(a,()=>{a.classList.remove(t),a.removeAttribute("style"),e()})}else a.classList.remove(t),e()})}const Xa=256;function Bt(a){return a!=null}function Ma(a){const t=Object.assign({},a);return delete t.next,t}function E({pathname:a="",search:t="",hash:e="",chain:o=[],params:r={},redirectFrom:i,resolver:n},l){const s=o.map(d=>d.route);return{baseUrl:n&&n.baseUrl||"",pathname:a,search:t,hash:e,routes:s,route:l||s.length&&s[s.length-1]||null,params:r,redirectFrom:i,getUrl:(d={})=>_t(U.pathToRegexp.compile(Qe(s))(Object.assign({},r,d)),n)}}function Oe(a,t){const e=Object.assign({},a.params);return{redirect:{pathname:t,from:a.pathname,params:e}}}function qa(a,t){t.location=E(a);const e=a.chain.map(o=>o.route).indexOf(a.route);return a.chain[e].element=t,t}function kt(a,t,e){if(X(a))return a.apply(e,t)}function Ie(a,t,e){return o=>{if(o&&(o.cancel||o.redirect))return o;if(e)return kt(e[a],t,e)}}function Za(a,t){if(!Array.isArray(a)&&!$t(a))throw new Error(L(`Incorrect "children" value for the route ${t.path}: expected array or object, but got ${a}`));t.__children=[];const e=Ot(a);for(let o=0;o<e.length;o++)Me(e[o]),t.__children.push(e[o])}function yt(a){if(a&&a.length){const t=a[0].parentNode;for(let e=0;e<a.length;e++)t.removeChild(a[e])}}function _t(a,t){const e=t.__effectiveBaseUrl;return e?t.constructor.__createUrl(a.replace(/^\//,""),e).pathname:a}function Qe(a){return a.map(t=>t.path).reduce((t,e)=>e.length?t.replace(/\/$/,"")+"/"+e.replace(/^\//,""):t,"")}class U extends dt{constructor(t,e){const o=document.head.querySelector("base"),r=o&&o.getAttribute("href");super([],Object.assign({baseUrl:r&&dt.__createUrl(r,document.URL).pathname.replace(/[^\/]*$/,"")},e)),this.resolveRoute=n=>this.__resolveRoute(n);const i=U.NavigationTrigger;U.setTriggers.apply(U,Object.keys(i).map(n=>i[n])),this.baseUrl,this.ready,this.ready=Promise.resolve(t),this.location,this.location=E({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(t),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(t){const e=t.route;let o=Promise.resolve();X(e.children)&&(o=o.then(()=>e.children(Ma(t))).then(i=>{!Bt(i)&&!X(e.children)&&(i=e.children),Za(i,e)}));const r={redirect:i=>Oe(t,i),component:i=>{const n=document.createElement(i);return this.__createdByRouter.set(n,!0),n}};return o.then(()=>{if(this.__isLatestRender(t))return kt(e.action,[t,r],e)}).then(i=>{if(Bt(i)&&(i instanceof HTMLElement||i.redirect||i===tt))return i;if(R(e.redirect))return r.redirect(e.redirect);if(e.bundle)return ba(e.bundle).then(()=>{},()=>{throw new Error(L(`Bundle not found: ${e.bundle}. Check if the file name is correct`))})}).then(i=>{if(Bt(i))return i;if(R(e.component))return r.component(e.component)})}setOutlet(t){t&&this.__ensureOutlet(t),this.__outlet=t}getOutlet(){return this.__outlet}setRoutes(t,e=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(t),e||this.__onNavigationEvent(),this.ready}render(t,e){const o=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},R(t)?{pathname:t}:t,{__renderId:o});return this.ready=this.resolve(r).then(i=>this.__fullyResolveChain(i)).then(i=>{if(this.__isLatestRender(i)){const n=this.__previousContext;if(i===n)return this.__updateBrowserHistory(n,!0),this.location;if(this.location=E(i),e&&this.__updateBrowserHistory(i,o===1),rt("location-changed",{router:this,location:this.location}),i.__skipAttach)return this.__copyUnchangedElements(i,n),this.__previousContext=i,this.location;this.__addAppearingContent(i,n);const l=this.__animateIfNeeded(i);return this.__runOnAfterEnterCallbacks(i),this.__runOnAfterLeaveCallbacks(i,n),l.then(()=>{if(this.__isLatestRender(i))return this.__removeDisappearingContent(),this.__previousContext=i,this.location})}}).catch(i=>{if(o===this.__lastStartedRenderId)throw e&&this.__updateBrowserHistory(r),yt(this.__outlet&&this.__outlet.children),this.location=E(Object.assign(r,{resolver:this})),rt("error",Object.assign({router:this,error:i},r)),i}),this.ready}__fullyResolveChain(t,e=t){return this.__findComponentContextAfterAllRedirects(e).then(o=>{const i=o!==e?o:t,l=_t(Qe(o.chain),o.resolver)===o.pathname,s=(d,p=d.route,u)=>d.next(void 0,p,u).then(m=>m===null||m===tt?l?d:p.parent!==null?s(d,p.parent,m):m:m);return s(o).then(d=>{if(d===null||d===tt)throw qe(i);return d&&d!==tt&&d!==o?this.__fullyResolveChain(i,d):this.__amendWithOnBeforeCallbacks(o)})})}__findComponentContextAfterAllRedirects(t){const e=t.result;return e instanceof HTMLElement?(qa(t,e),Promise.resolve(t)):e.redirect?this.__redirect(e.redirect,t.__redirectCount,t.__renderId).then(o=>this.__findComponentContextAfterAllRedirects(o)):e instanceof Error?Promise.reject(e):Promise.reject(new Error(L(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${ha(e)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(t){return this.__runOnBeforeCallbacks(t).then(e=>e===this.__previousContext||e===t?e:this.__fullyResolveChain(e))}__runOnBeforeCallbacks(t){const e=this.__previousContext||{},o=e.chain||[],r=t.chain;let i=Promise.resolve();const n=()=>({cancel:!0}),l=s=>Oe(t,s);if(t.__divergedChainIndex=0,t.__skipAttach=!1,o.length){for(let s=0;s<Math.min(o.length,r.length)&&!(o[s].route!==r[s].route||o[s].path!==r[s].path&&o[s].element!==r[s].element||!this.__isReusableElement(o[s].element,r[s].element));s=++t.__divergedChainIndex);if(t.__skipAttach=r.length===o.length&&t.__divergedChainIndex==r.length&&this.__isReusableElement(t.result,e.result),t.__skipAttach){for(let s=r.length-1;s>=0;s--)i=this.__runOnBeforeLeaveCallbacks(i,t,{prevent:n},o[s]);for(let s=0;s<r.length;s++)i=this.__runOnBeforeEnterCallbacks(i,t,{prevent:n,redirect:l},r[s]),o[s].element.location=E(t,o[s].route)}else for(let s=o.length-1;s>=t.__divergedChainIndex;s--)i=this.__runOnBeforeLeaveCallbacks(i,t,{prevent:n},o[s])}if(!t.__skipAttach)for(let s=0;s<r.length;s++)s<t.__divergedChainIndex?s<o.length&&o[s].element&&(o[s].element.location=E(t,o[s].route)):(i=this.__runOnBeforeEnterCallbacks(i,t,{prevent:n,redirect:l},r[s]),r[s].element&&(r[s].element.location=E(t,r[s].route)));return i.then(s=>{if(s){if(s.cancel)return this.__previousContext.__renderId=t.__renderId,this.__previousContext;if(s.redirect)return this.__redirect(s.redirect,t.__redirectCount,t.__renderId)}return t})}__runOnBeforeLeaveCallbacks(t,e,o,r){const i=E(e);return t.then(n=>{if(this.__isLatestRender(e))return Ie("onBeforeLeave",[i,o,this],r.element)(n)}).then(n=>{if(!(n||{}).redirect)return n})}__runOnBeforeEnterCallbacks(t,e,o,r){const i=E(e,r.route);return t.then(n=>{if(this.__isLatestRender(e))return Ie("onBeforeEnter",[i,o,this],r.element)(n)})}__isReusableElement(t,e){return t&&e?this.__createdByRouter.get(t)&&this.__createdByRouter.get(e)?t.localName===e.localName:t===e:!1}__isLatestRender(t){return t.__renderId===this.__lastStartedRenderId}__redirect(t,e,o){if(e>Xa)throw new Error(L(`Too many redirects when rendering ${t.from}`));return this.resolve({pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,__redirectCount:(e||0)+1,__renderId:o})}__ensureOutlet(t=this.__outlet){if(!(t instanceof Node))throw new TypeError(L(`Expected router outlet to be a valid DOM Node (but got ${t})`))}__updateBrowserHistory({pathname:t,search:e="",hash:o=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==o){const i=r?"replaceState":"pushState";window.history[i](null,document.title,t+e+o),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(t,e){let o=this.__outlet;for(let r=0;r<t.__divergedChainIndex;r++){const i=e&&e.chain[r].element;if(i)if(i.parentNode===o)t.chain[r].element=i,o=i;else break}return o}__addAppearingContent(t,e){this.__ensureOutlet(),this.__removeAppearingContent();const o=this.__copyUnchangedElements(t,e);this.__appearingContent=[],this.__disappearingContent=Array.from(o.children).filter(i=>this.__addedByRouter.get(i)&&i!==t.result);let r=o;for(let i=t.__divergedChainIndex;i<t.chain.length;i++){const n=t.chain[i].element;n&&(r.appendChild(n),this.__addedByRouter.set(n,!0),r===o&&this.__appearingContent.push(n),r=n)}}__removeDisappearingContent(){this.__disappearingContent&&yt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(yt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(t,e){if(e)for(let o=e.chain.length-1;o>=t.__divergedChainIndex&&this.__isLatestRender(t);o--){const r=e.chain[o].element;if(r)try{const i=E(t);kt(r.onAfterLeave,[i,{},e.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&yt(r.children)}}}__runOnAfterEnterCallbacks(t){for(let e=t.__divergedChainIndex;e<t.chain.length&&this.__isLatestRender(t);e++){const o=t.chain[e].element||{},r=E(t,t.chain[e].route);kt(o.onAfterEnter,[r,{},t.resolver],o)}}__animateIfNeeded(t){const e=(this.__disappearingContent||[])[0],o=(this.__appearingContent||[])[0],r=[],i=t.chain;let n;for(let l=i.length;l>0;l--)if(i[l-1].route.animate){n=i[l-1].route.animate;break}if(e&&o&&n){const l=$t(n)&&n.leave||"leaving",s=$t(n)&&n.enter||"entering";r.push(Se(e,l)),r.push(Se(o,s))}return Promise.all(r).then(()=>t)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(t){const{pathname:e,search:o,hash:r}=t?t.detail:window.location;R(this.__normalizePathname(e))&&(t&&t.preventDefault&&t.preventDefault(),this.render({pathname:e,search:o,hash:r},!0))}static setTriggers(...t){Pa(t)}urlForName(t,e){return this.__urlForName||(this.__urlForName=Ya(this)),_t(this.__urlForName(t,e),this)}urlForPath(t,e){return _t(U.pathToRegexp.compile(t)(e),this)}static go(t){const{pathname:e,search:o,hash:r}=R(t)?this.__createUrl(t,"http://a"):t;return rt("go",{pathname:e,search:o,hash:r})}}const Fa=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,zt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Va(){function a(){return!0}return ta(a)}function Ha(){try{return Wa()?!0:Ga()?zt?!Ka():!Va():!1}catch{return!1}}function Wa(){return localStorage.getItem("vaadin.developmentmode.force")}function Ga(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Ka(){return!!(zt&&Object.keys(zt).map(t=>zt[t]).filter(t=>t.productionMode).length>0)}function ta(a,t){if(typeof a!="function")return;const e=Fa.exec(a.toString());if(e)try{a=new Function(e[1])}catch(o){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",o)}return a(t)}window.Vaadin=window.Vaadin||{};const Ee=function(a,t){if(window.Vaadin.developmentMode)return ta(a,t)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Ha());function Ja(){}const Qa=function(){if(typeof Ee=="function")return Ee(Ja)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});Qa();U.NavigationTrigger={POPSTATE:wa,CLICK:va};var Nt,v;(function(a){a.CONNECTED="connected",a.LOADING="loading",a.RECONNECTING="reconnecting",a.CONNECTION_LOST="connection-lost"})(v||(v={}));class to{constructor(t){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=t,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(e=>{var o;(o=e.active)===null||o===void 0||o.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(t){this.stateChangeListeners.add(t)}removeStateChangeListener(t){this.stateChangeListeners.delete(t)}loadingStarted(){this.state=v.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(v.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(v.CONNECTION_LOST)}decreaseLoadingCount(t){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=t))}get state(){return this.connectionState}set state(t){if(t!==this.connectionState){const e=this.connectionState;this.connectionState=t,this.loadingCount=0;for(const o of this.stateChangeListeners)o(e,this.connectionState)}}get online(){return this.connectionState===v.CONNECTED||this.connectionState===v.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(t){typeof t.data=="object"&&t.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(t.data.result===!0&&(this.state=v.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const eo=a=>!!(a==="localhost"||a==="[::1]"||/^127\.\d+\.\d+\.\d+$/u.exec(a)),wt=window;if(!(!((Nt=wt.Vaadin)===null||Nt===void 0)&&Nt.connectionState)){let a;eo(window.location.hostname)?a=!0:a=navigator.onLine,wt.Vaadin||(wt.Vaadin={}),wt.Vaadin.connectionState=new to(a?v.CONNECTED:v.CONNECTION_LOST)}function S(a,t,e,o){var r=arguments.length,i=r<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(a,t,e,o);else for(var l=a.length-1;l>=0;l--)(n=a[l])&&(i=(r<3?n(i):r>3?n(t,e,i):n(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=globalThis,Jt=St.ShadowRoot&&(St.ShadyCSS===void 0||St.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qt=Symbol(),$e=new WeakMap;let te=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==Qt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Jt&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=$e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&$e.set(e,t))}return t}toString(){return this.cssText}};const ea=a=>new te(typeof a=="string"?a:a+"",void 0,Qt),x=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((o,r,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[i+1],a[0]);return new te(e,a,Qt)},ao=(a,t)=>{if(Jt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),r=St.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=e.cssText,a.appendChild(o)}},Re=Jt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ea(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:oo,defineProperty:io,getOwnPropertyDescriptor:ro,getOwnPropertyNames:no,getOwnPropertySymbols:so,getPrototypeOf:lo}=Object,Y=globalThis,Le=Y.trustedTypes,co=Le?Le.emptyScript:"",Xt=Y.reactiveElementPolyfillSupport,nt=(a,t)=>a,Rt={toAttribute(a,t){switch(t){case Boolean:a=a?co:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},ee=(a,t)=>!oo(a,t),Te={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:ee};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Y.litPropertyMetadata??(Y.litPropertyMetadata=new WeakMap);let Q=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Te){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(t,o,e);r!==void 0&&io(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){const{get:r,set:i}=ro(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return r==null?void 0:r.call(this)},set(n){const l=r==null?void 0:r.call(this);i.call(this,n),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Te}static _$Ei(){if(this.hasOwnProperty(nt("elementProperties")))return;const t=lo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nt("properties"))){const e=this.properties,o=[...no(e),...so(e)];for(const r of o)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,r]of e)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const r=this._$Eu(e,o);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const r of o)e.unshift(Re(r))}else t!==void 0&&e.push(Re(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ao(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostConnected)==null?void 0:o.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostDisconnected)==null?void 0:o.call(e)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){var i;const o=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,o);if(r!==void 0&&o.reflect===!0){const n=(((i=o.converter)==null?void 0:i.toAttribute)!==void 0?o.converter:Rt).toAttribute(e,o.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){var i;const o=this.constructor,r=o._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=o.getPropertyOptions(r),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)==null?void 0:i.fromAttribute)!==void 0?n.converter:Rt;this._$Em=r,this[r]=l.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,o){if(t!==void 0){if(o??(o=this.constructor.getPropertyOptions(t)),!(o.hasChanged??ee)(this[t],e))return;this.P(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),o.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,n]of r)n.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(o=this._$EO)==null||o.forEach(r=>{var i;return(i=r.hostUpdate)==null?void 0:i.call(r)}),this.update(e)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Q[nt("elementProperties")]=new Map,Q[nt("finalized")]=new Map,Xt==null||Xt({ReactiveElement:Q}),(Y.reactiveElementVersions??(Y.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=globalThis,Lt=st.trustedTypes,je=Lt?Lt.createPolicy("lit-html",{createHTML:a=>a}):void 0,aa="$lit$",D=`lit$${(Math.random()+"").slice(9)}$`,oa="?"+D,po=`<${oa}>`,M=document,ct=()=>M.createComment(""),pt=a=>a===null||typeof a!="object"&&typeof a!="function",ia=Array.isArray,mo=a=>ia(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",Mt=`[ 	
\f\r]`,ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Ae=/>/g,B=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),De=/'/g,Ue=/"/g,ra=/^(?:script|style|textarea|title)$/i,na=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),fo=na(1),bi=na(2),q=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Ye=new WeakMap,N=M.createTreeWalker(M,129);function sa(a,t){if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(t):t}const uo=(a,t)=>{const e=a.length-1,o=[];let r,i=t===2?"<svg>":"",n=ot;for(let l=0;l<e;l++){const s=a[l];let d,p,u=-1,m=0;for(;m<s.length&&(n.lastIndex=m,p=n.exec(s),p!==null);)m=n.lastIndex,n===ot?p[1]==="!--"?n=Ce:p[1]!==void 0?n=Ae:p[2]!==void 0?(ra.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=B):p[3]!==void 0&&(n=B):n===B?p[0]===">"?(n=r??ot,u=-1):p[1]===void 0?u=-2:(u=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?B:p[3]==='"'?Ue:De):n===Ue||n===De?n=B:n===Ce||n===Ae?n=ot:(n=B,r=void 0);const g=n===B&&a[l+1].startsWith("/>")?" ":"";i+=n===ot?s+po:u>=0?(o.push(d),s.slice(0,u)+aa+s.slice(u)+D+g):s+D+(u===-2?l:g)}return[sa(a,i+(a[e]||"<?>")+(t===2?"</svg>":"")),o]};class mt{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let i=0,n=0;const l=t.length-1,s=this.parts,[d,p]=uo(t,e);if(this.el=mt.createElement(d,o),N.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=N.nextNode())!==null&&s.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(aa)){const m=p[n++],g=r.getAttribute(u).split(D),j=/([.?@])?(.*)/.exec(m);s.push({type:1,index:i,name:j[2],strings:g,ctor:j[1]==="."?ho:j[1]==="?"?bo:j[1]==="@"?xo:jt}),r.removeAttribute(u)}else u.startsWith(D)&&(s.push({type:6,index:i}),r.removeAttribute(u));if(ra.test(r.tagName)){const u=r.textContent.split(D),m=u.length-1;if(m>0){r.textContent=Lt?Lt.emptyScript:"";for(let g=0;g<m;g++)r.append(u[g],ct()),N.nextNode(),s.push({type:2,index:++i});r.append(u[m],ct())}}}else if(r.nodeType===8)if(r.data===oa)s.push({type:2,index:i});else{let u=-1;for(;(u=r.data.indexOf(D,u+1))!==-1;)s.push({type:7,index:i}),u+=D.length-1}i++}}static createElement(t,e){const o=M.createElement("template");return o.innerHTML=t,o}}function et(a,t,e=a,o){var n,l;if(t===q)return t;let r=o!==void 0?(n=e._$Co)==null?void 0:n[o]:e._$Cl;const i=pt(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==i&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),i===void 0?r=void 0:(r=new i(a),r._$AT(a,e,o)),o!==void 0?(e._$Co??(e._$Co=[]))[o]=r:e._$Cl=r),r!==void 0&&(t=et(a,r._$AS(a,t.values),r,o)),t}class go{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,r=((t==null?void 0:t.creationScope)??M).importNode(e,!0);N.currentNode=r;let i=N.nextNode(),n=0,l=0,s=o[0];for(;s!==void 0;){if(n===s.index){let d;s.type===2?d=new ft(i,i.nextSibling,this,t):s.type===1?d=new s.ctor(i,s.name,s.strings,this,t):s.type===6&&(d=new vo(i,this,t)),this._$AV.push(d),s=o[++l]}n!==(s==null?void 0:s.index)&&(i=N.nextNode(),n++)}return N.currentNode=M,r}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class ft{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,o,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),pt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==q&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mo(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==y&&pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:o}=t,r=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=mt.createElement(sa(o.h,o.h[0]),this.options)),o);if(((i=this._$AH)==null?void 0:i._$AD)===r)this._$AH.p(e);else{const n=new go(r,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=Ye.get(t.strings);return e===void 0&&Ye.set(t.strings,e=new mt(t)),e}k(t){ia(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const i of t)r===e.length?e.push(o=new ft(this.S(ct()),this.S(ct()),this,this.options)):o=e[r],o._$AI(i),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class jt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,r,i){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=y}_$AI(t,e=this,o,r){const i=this.strings;let n=!1;if(i===void 0)t=et(this,t,e,0),n=!pt(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const l=t;let s,d;for(t=i[0],s=0;s<i.length-1;s++)d=et(this,l[o+s],e,s),d===q&&(d=this._$AH[s]),n||(n=!pt(d)||d!==this._$AH[s]),d===y?t=y:t!==y&&(t+=(d??"")+i[s+1]),this._$AH[s]=d}n&&!r&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ho extends jt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class bo extends jt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class xo extends jt{constructor(t,e,o,r,i){super(t,e,o,r,i),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??y)===q)return;const o=this._$AH,r=t===y&&o!==y||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==y&&(o===y||r);r&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class vo{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const qt=st.litHtmlPolyfillSupport;qt==null||qt(mt,ft),(st.litHtmlVersions??(st.litHtmlVersions=[])).push("3.1.2");const yo=(a,t,e)=>{const o=(e==null?void 0:e.renderBefore)??t;let r=o._$litPart$;if(r===void 0){const i=(e==null?void 0:e.renderBefore)??null;o._$litPart$=r=new ft(t.insertBefore(ct(),i),i,void 0,e??{})}return r._$AI(a),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yo(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return q}}var Xe;lt._$litElement$=!0,lt.finalized=!0,(Xe=globalThis.litElementHydrateSupport)==null||Xe.call(globalThis,{LitElement:lt});const Zt=globalThis.litElementPolyfillSupport;Zt==null||Zt({LitElement:lt});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wo={attribute:!0,type:String,converter:Rt,reflect:!1,hasChanged:ee},ko=(a=wo,t,e)=>{const{kind:o,metadata:r}=e;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),i.set(e.name,a),o==="accessor"){const{name:n}=e;return{set(l){const s=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,s,a)},init(l){return l!==void 0&&this.P(n,void 0,a),l}}}if(o==="setter"){const{name:n}=e;return function(l){const s=this[n];t.call(this,l),this.requestUpdate(n,s,a)}}throw Error("Unsupported decorator location: "+o)};function O(a){return(t,e)=>typeof e=="object"?ko(a,t,e):((o,r,i)=>{const n=r.hasOwnProperty(i);return r.constructor.createProperty(i,n?{...o,wrapped:!0}:o),n?Object.getOwnPropertyDescriptor(r,i):void 0})(a,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _o={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zo=a=>(...t)=>({_$litDirective$:a,values:t});class So{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oo=zo(class extends So{constructor(a){var t;if(super(a),a.type!==_o.ATTRIBUTE||a.name!=="class"||((t=a.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(t=>a[t]).join(" ")+" "}update(a,[t]){var o,r;if(this.st===void 0){this.st=new Set,a.strings!==void 0&&(this.nt=new Set(a.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!((o=this.nt)!=null&&o.has(i))&&this.st.add(i);return this.render(t)}const e=a.element.classList;for(const i of this.st)i in t||(e.remove(i),this.st.delete(i));for(const i in t){const n=!!t[i];n===this.st.has(i)||(r=this.nt)!=null&&r.has(i)||(n?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return q}}),Ft="css-loading-indicator";var $;(function(a){a.IDLE="",a.FIRST="first",a.SECOND="second",a.THIRD="third"})($||($={}));class w extends lt{static create(){var t,e;const o=window;return!((t=o.Vaadin)===null||t===void 0)&&t.connectionIndicator||(o.Vaadin||(o.Vaadin={}),o.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(o.Vaadin.connectionIndicator)),(e=o.Vaadin)===null||e===void 0?void 0:e.connectionIndicator}constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=$.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=v.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}render(){return fo`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Oo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var t;super.connectedCallback();const e=window;!((t=e.Vaadin)===null||t===void 0)&&t.connectionState&&(this.connectionStateStore=e.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(t){t!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=t,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var t;const e=(t=this.connectionStateStore)===null||t===void 0?void 0:t.state;return this.offline=e===v.CONNECTION_LOST,this.reconnecting=e===v.RECONNECTING,this.updateLoading(e===v.LOADING),this.loading?!1:e!==this.lastMessageState?(this.lastMessageState=e,!0):!1}updateLoading(t){this.loading=t,this.loadingBarState=$.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,t,()=>{this.loadingBarState=$.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,t,()=>{this.loadingBarState=$.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,t,()=>{this.loadingBarState=$.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(Ft)){const t=document.createElement("style");t.id=Ft,t.textContent=this.getDefaultStyle(),document.head.appendChild(t)}}else{const t=document.getElementById(Ft);t&&document.head.removeChild(t)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case $.IDLE:return"display: none";case $.FIRST:case $.SECOND:case $.THIRD:return"display: block";default:return""}}timeoutFor(t,e,o,r){return t!==0&&window.clearTimeout(t),e?window.setTimeout(o,r):0}static get instance(){return w.create()}}S([O({type:Number})],w.prototype,"firstDelay",void 0);S([O({type:Number})],w.prototype,"secondDelay",void 0);S([O({type:Number})],w.prototype,"thirdDelay",void 0);S([O({type:Number})],w.prototype,"expandedDuration",void 0);S([O({type:String})],w.prototype,"onlineText",void 0);S([O({type:String})],w.prototype,"offlineText",void 0);S([O({type:String})],w.prototype,"reconnectingText",void 0);S([O({type:Boolean,reflect:!0})],w.prototype,"offline",void 0);S([O({type:Boolean,reflect:!0})],w.prototype,"reconnecting",void 0);S([O({type:Boolean,reflect:!0})],w.prototype,"expanded",void 0);S([O({type:Boolean,reflect:!0})],w.prototype,"loading",void 0);S([O({type:String})],w.prototype,"loadingBarState",void 0);S([O({type:Boolean})],w.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",w);w.instance;var Pe;const Tt=window;Tt.Vaadin||(Tt.Vaadin={});(Pe=Tt.Vaadin).registrations||(Pe.registrations=[]);Tt.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Be extends Error{}const it=window.document.body,b=window;class Io{constructor(t){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",it.$=it.$||[],this.config=t||{},b.Vaadin=b.Vaadin||{},b.Vaadin.Flow=b.Vaadin.Flow||{},b.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const e=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||e&&e.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,b.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,b.Vaadin.connectionState.loadingFinished(),!b.Vaadin.listener&&(b.Vaadin.listener={},document.addEventListener("click",t=>{t.target&&(t.target.hasAttribute("router-link")?this.navigation="link":t.composedPath().some(e=>e.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async t=>{if(this.pathname=t.pathname,b.Vaadin.connectionState.online)try{await this.flowInit()}catch(e){if(e instanceof Be)return b.Vaadin.connectionState.state=v.CONNECTION_LOST,this.offlineStubAction();throw e}else return this.offlineStubAction();return this.container.onBeforeEnter=(e,o)=>this.flowNavigate(e,o),this.container.onBeforeLeave=(e,o)=>this.flowLeave(e,o),this.container}}async flowLeave(t,e){const{connectionState:o}=b.Vaadin;return this.pathname===t.pathname||!this.isFlowClientLoaded()||o.offline?Promise.resolve({}):new Promise(r=>{this.loadingStarted(),this.container.serverConnected=i=>{r(e&&i?e.prevent():{}),this.loadingFinished()},it.$server.leaveNavigation(this.getFlowRoutePath(t),this.getFlowRouteQuery(t))})}async flowNavigate(t,e){return this.response?new Promise(o=>{this.loadingStarted(),this.container.serverConnected=(r,i)=>{e&&r?o(e.prevent()):e&&e.redirect&&i?o(e.redirect(i.pathname)):(this.container.style.display="",o(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},it.$server.connectClient(this.getFlowRoutePath(t),this.getFlowRouteQuery(t),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(t){return decodeURIComponent(t.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(t){return t.search&&t.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:t,appConfig:e}=this.response;typeof t=="string"&&await this.loadScript(t);const{appId:o}=e;await(await Vt(()=>import("./FlowBootstrap-CHUuW4WK.js"),__vite__mapDeps([]),import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(o),await this.config.imports());const i=`flow-container-${o.toLowerCase()}`,n=document.querySelector(i);n?this.container=n:(this.container=document.createElement(i),this.container.id=o),it.$[o]=this.container;const l=await Vt(()=>import("./FlowClient-BZ2ixoyw.js"),__vite__mapDeps([]),import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(t){return new Promise((e,o)=>{const r=document.createElement("script");r.onload=()=>e(),r.onerror=o,r.src=t,document.body.appendChild(r)})}injectAppIdScript(t){const e=t.substring(0,t.lastIndexOf("-")),o=document.createElement("script");o.type="module",o.setAttribute("data-app-id",e),document.body.append(o)}async flowInitClient(t){return t.init(),new Promise(e=>{const o=setInterval(()=>{Object.keys(b.Vaadin.Flow.clients).filter(i=>i!=="TypeScript").reduce((i,n)=>i||b.Vaadin.Flow.clients[n].isActive(),!1)||(clearInterval(o),e())},5)})}async flowInitUi(){const t=b.Vaadin&&b.Vaadin.TypeScript&&b.Vaadin.TypeScript.initial;return t?(b.Vaadin.TypeScript.initial=void 0,Promise.resolve(t)):new Promise((e,o)=>{const i=new XMLHttpRequest,n=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;i.open("GET",n),i.onerror=()=>o(new Be(`Invalid server response when initializing Flow UI.
        ${i.status}
        ${i.responseText}`)),i.onload=()=>{const l=i.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?e(JSON.parse(i.responseText)):i.onerror()},i.send()})}addConnectionIndicator(){w.create(),b.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){b.Vaadin.connectionState.state=v.RECONNECTING;const t=new XMLHttpRequest;t.open("HEAD","sw.js"),t.onload=()=>{b.Vaadin.connectionState.state=v.CONNECTED},t.onerror=()=>{b.Vaadin.connectionState.state=v.CONNECTION_LOST},setTimeout(()=>t.send(),50)}}),b.addEventListener("offline",()=>{this.isFlowClientLoaded()||(b.Vaadin.connectionState.state=v.CONNECTION_LOST)})}async offlineStubAction(){const t=document.createElement("iframe");t.setAttribute("src","./offline-stub.html"),t.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let o;const r=()=>{o!==void 0&&(b.Vaadin.connectionState.removeStateChangeListener(o),o=void 0)};return t.onBeforeEnter=(i,n,l)=>{o=()=>{b.Vaadin.connectionState.online&&(r(),l.render(i,!1))},b.Vaadin.connectionState.addStateChangeListener(o)},t.onBeforeLeave=(i,n,l)=>{r()},t}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:Eo}=new Io({imports:()=>Vt(()=>import("./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js").then(a=>a.av),__vite__mapDeps([]),import.meta.url)}),$o=[...Eo],Ro=new U(document.querySelector("#outlet"));Ro.setRoutes($o);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var a="ShadyCSS"in window&&!ShadyCSS.nativeShadow,t=document.implementation.createHTMLDocument(""),e=new WeakMap,o=typeof DOMException=="object"?Error:DOMException,r=Object.defineProperty,i=Array.prototype.forEach,n=/@import.+?;?$/gm;function l(c){var f=c.replace(n,"");return f!==c&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),f.trim()}function s(c){return"isConnected"in c?c.isConnected:document.contains(c)}function d(c){return c.filter(function(f,h){return c.indexOf(f)===h})}function p(c,f){return c.filter(function(h){return f.indexOf(h)===-1})}function u(c){c.parentNode.removeChild(c)}function m(c){return c.shadowRoot||e.get(c)}var g=["addRule","deleteRule","insertRule","removeRule"],j=CSSStyleSheet,Z=j.prototype;Z.replace=function(){return Promise.reject(new o("Can't call replace on non-constructed CSSStyleSheets."))},Z.replaceSync=function(){throw new o("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function ut(c){return typeof c=="object"?H.isPrototypeOf(c)||Z.isPrototypeOf(c):!1}function At(c){return typeof c=="object"?Z.isPrototypeOf(c):!1}var I=new WeakMap,T=new WeakMap,F=new WeakMap,V=new WeakMap;function Dt(c,f){var h=document.createElement("style");return F.get(c).set(f,h),T.get(c).push(f),h}function C(c,f){return F.get(c).get(f)}function gt(c,f){F.get(c).delete(f),T.set(c,T.get(c).filter(function(h){return h!==f}))}function ne(c,f){requestAnimationFrame(function(){f.textContent=I.get(c).textContent,V.get(c).forEach(function(h){return f.sheet[h.method].apply(f.sheet,h.args)})})}function ht(c){if(!I.has(c))throw new TypeError("Illegal invocation")}function Ut(){var c=this,f=document.createElement("style");t.body.appendChild(f),I.set(c,f),T.set(c,[]),F.set(c,new WeakMap),V.set(c,[])}var H=Ut.prototype;H.replace=function(f){try{return this.replaceSync(f),Promise.resolve(this)}catch(h){return Promise.reject(h)}},H.replaceSync=function(f){if(ht(this),typeof f=="string"){var h=this;I.get(h).textContent=l(f),V.set(h,[]),T.get(h).forEach(function(_){_.isConnected()&&ne(h,C(h,_))})}},r(H,"cssRules",{configurable:!0,enumerable:!0,get:function(){return ht(this),I.get(this).sheet.cssRules}}),r(H,"media",{configurable:!0,enumerable:!0,get:function(){return ht(this),I.get(this).sheet.media}}),g.forEach(function(c){H[c]=function(){var f=this;ht(f);var h=arguments;V.get(f).push({method:c,args:h}),T.get(f).forEach(function(z){if(z.isConnected()){var k=C(f,z).sheet;k[c].apply(k,h)}});var _=I.get(f).sheet;return _[c].apply(_,h)}}),r(Ut,Symbol.hasInstance,{configurable:!0,value:ut});var se={childList:!0,subtree:!0},le=new WeakMap;function W(c){var f=le.get(c);return f||(f=new pe(c),le.set(c,f)),f}function de(c){r(c.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return W(this).sheets},set:function(f){W(this).update(f)}})}function Yt(c,f){for(var h=document.createNodeIterator(c,NodeFilter.SHOW_ELEMENT,function(z){return m(z)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),_=void 0;_=h.nextNode();)f(m(_))}var bt=new WeakMap,G=new WeakMap,xt=new WeakMap;function ma(c,f){return f instanceof HTMLStyleElement&&G.get(c).some(function(h){return C(h,c)})}function ce(c){var f=bt.get(c);return f instanceof Document?f.body:f}function Pt(c){var f=document.createDocumentFragment(),h=G.get(c),_=xt.get(c),z=ce(c);_.disconnect(),h.forEach(function(k){f.appendChild(C(k,c)||Dt(k,c))}),z.insertBefore(f,null),_.observe(z,se),h.forEach(function(k){ne(k,C(k,c))})}function pe(c){var f=this;f.sheets=[],bt.set(f,c),G.set(f,[]),xt.set(f,new MutationObserver(function(h,_){if(!document){_.disconnect();return}h.forEach(function(z){a||i.call(z.addedNodes,function(k){k instanceof Element&&Yt(k,function(K){W(K).connect()})}),i.call(z.removedNodes,function(k){k instanceof Element&&(ma(f,k)&&Pt(f),a||Yt(k,function(K){W(K).disconnect()}))})})}))}if(pe.prototype={isConnected:function(){var c=bt.get(this);return c instanceof Document?c.readyState!=="loading":s(c.host)},connect:function(){var c=ce(this);xt.get(this).observe(c,se),G.get(this).length>0&&Pt(this),Yt(c,function(f){W(f).connect()})},disconnect:function(){xt.get(this).disconnect()},update:function(c){var f=this,h=bt.get(f)===document?"Document":"ShadowRoot";if(!Array.isArray(c))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Iterator getter is not callable.");if(!c.every(ut))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Failed to convert value to 'CSSStyleSheet'");if(c.some(At))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+h+": Can't adopt non-constructed stylesheets");f.sheets=c;var _=G.get(f),z=d(c),k=p(_,z);k.forEach(function(K){u(C(K,f)),gt(K,f)}),G.set(f,z),f.isConnected()&&z.length>0&&Pt(f)}},window.CSSStyleSheet=Ut,de(Document),"ShadowRoot"in window){de(ShadowRoot);var me=Element.prototype,fa=me.attachShadow;me.attachShadow=function(f){var h=fa.call(this,f);return f.mode==="closed"&&e.set(this,h),h}}var vt=W(document);vt.isConnected()?vt.connect():document.addEventListener("DOMContentLoaded",vt.connect.bind(vt))})();const{toString:Lo}=Object.prototype;function To(a){return Lo.call(a)==="[object RegExp]"}function jo(a,{preserve:t=!0,whitespace:e=!0,all:o}={}){if(o)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let r=t,i;typeof t=="function"?(r=!1,i=t):To(t)&&(r=!1,i=p=>t.test(p));let n=!1,l="",s="",d="";for(let p=0;p<a.length;p++){if(l=a[p],a[p-1]!=="\\"&&(l==='"'||l==="'")&&(n===l?n=!1:n||(n=l)),!n&&l==="/"&&a[p+1]==="*"){const u=a[p+2]==="!";let m=p+2;for(;m<a.length;m++){if(a[m]==="*"&&a[m+1]==="/"){r&&u||i&&i(s)?d+=`/*${s}*/`:e||(a[m+2]===`
`?m++:a[m+2]+a[m+3]===`\r
`&&(m+=2)),s="";break}s+=a[m]}p=m+1;continue}d+=l}return d}const Co=CSSStyleSheet.toString().includes("document.createElement"),Ao=(a,t)=>{const e=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(a)!=null&&(a=jo(a));for(var o,r=a;(o=e.exec(a))!==null;){r=r.replace(o[0],"");const i=document.createElement("link");i.rel="stylesheet",i.href=o[2]||o[4];const n=o[1]||o[5];n&&(i.media=n),t===document?document.head.appendChild(i):t.appendChild(i)}return r},Do=(a,t,e)=>(e?t.adoptedStyleSheets=[a,...t.adoptedStyleSheets]:t.adoptedStyleSheets=[...t.adoptedStyleSheets,a],()=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter(o=>o!==a)}),Uo=(a,t,e)=>{const o=new CSSStyleSheet;return o.replaceSync(a),Co?Do(o,t,e):(e?t.adoptedStyleSheets.splice(0,0,o):t.adoptedStyleSheets.push(o),()=>{t.adoptedStyleSheets.splice(t.adoptedStyleSheets.indexOf(o),1)})},Yo=(a,t)=>{const e=document.createElement("style");e.type="text/css",e.textContent=a;let o;if(t){const i=Array.from(document.head.childNodes).filter(n=>n.nodeType===Node.COMMENT_NODE).find(n=>n.data.trim()===t);i&&(o=i)}return document.head.insertBefore(e,o),()=>{e.remove()}},J=(a,t,e,o)=>{if(e===document){const i=Po(a);if(window.Vaadin.theme.injectedGlobalCss.indexOf(i)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(i)}const r=Ao(a,e);return e===document?Yo(r,t):Uo(r,e,o)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Ne(a){let t,e,o=2166136261;for(t=0,e=a.length;t<e;t++)o^=a.charCodeAt(t),o+=(o<<1)+(o<<4)+(o<<7)+(o<<8)+(o<<24);return("0000000"+(o>>>0).toString(16)).substr(-8)}function Po(a){let t=Ne(a);return t+Ne(t+a)}document._vaadintheme_flowcrmtutorial_componentCss||(document._vaadintheme_flowcrmtutorial_componentCss=!0);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Bo(a){const t=customElements.get(a.is);if(!t)Object.defineProperty(a,"version",{get(){return"24.3.6"}}),customElements.define(a.is,a);else{const e=t.version;e&&a.version&&e===a.version?console.warn(`The component ${a.is} has been loaded twice`):console.error(`Tried to define ${a.is} version ${a.version} when version ${t.version} is already in use. Something will probably break.`)}}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class No extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}Bo(No);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Xo=a=>class extends a{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(e,o,r){super.attributeChangedCallback(e,o,r),e==="theme"&&this._set_theme(r)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const la=[];function da(a){return a&&Object.prototype.hasOwnProperty.call(a,"__themes")}function Mo(a){return da(customElements.get(a))}function qo(a=[]){return[a].flat(1/0).filter(t=>t instanceof te?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ct(a,t,e={}){a&&Mo(a)&&console.warn(`The custom element definition for "${a}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),t=qo(t),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(a,t,e):la.push({themeFor:a,styles:t,include:e.include,moduleId:e.moduleId})}function Gt(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():la}function Zo(a,t){return(a||"").split(" ").some(e=>new RegExp(`^${e.split("*").join(".*")}$`,"u").test(t))}function Fo(a=""){let t=0;return a.startsWith("lumo-")||a.startsWith("material-")?t=1:a.startsWith("vaadin-")&&(t=2),t}function ca(a){const t=[];return a.include&&[].concat(a.include).forEach(e=>{const o=Gt().find(r=>r.moduleId===e);o?t.push(...ca(o),...o.styles):console.warn(`Included moduleId ${e} not found in style registry`)},a.styles),t}function Vo(a,t){const e=document.createElement("style");e.innerHTML=a.map(o=>o.cssText).join(`
`),t.content.appendChild(e)}function Ho(a){const t=`${a}-default-theme`,e=Gt().filter(o=>o.moduleId!==t&&Zo(o.themeFor,a)).map(o=>({...o,styles:[...ca(o),...o.styles],includePriority:Fo(o.moduleId)})).sort((o,r)=>r.includePriority-o.includePriority);return e.length>0?e:Gt().filter(o=>o.moduleId===t)}const vi=a=>class extends Xo(a){static finalize(){if(super.finalize(),this.elementStyles)return;const e=this.prototype._template;!e||da(this)||Vo(this.getStylesForThis(),e)}static finalizeStyles(e){const o=this.getStylesForThis();return e?[...super.finalizeStyles(e),...o]:o}static getStylesForThis(){const e=Object.getPrototypeOf(this.prototype),o=(e?e.constructor.__themes:[])||[];this.__themes=[...o,...Ho(this.is)];const r=this.__themes.flatMap(i=>i.styles);return r.filter((i,n)=>n===r.lastIndexOf(i))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Wo=(a,...t)=>{const e=document.createElement("style");e.id=a,e.textContent=t.map(o=>o.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",e)},P=(a,...t)=>{Wo(`lumo-${a}`,t)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Go=x`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,ae=x`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ct("",ae,{moduleId:"lumo-typography"});P("typography-props",Go);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ko=x`
  ${ea(ae.cssText.replace(/,\s*:host/su,""))}
`;P("typography",Ko);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Jo=x`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;P("color-props",Jo);const oe=x`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ct("",oe,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("color",oe);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pa=x`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;P("spacing-props",pa);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Qo=x`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;x`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 400;
  }
`;P("style-props",Qo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ie=x`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;Ct("",ie,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("badge",ie);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ti=x`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ei=x`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-tint-5 {
    background-color: var(--lumo-tint-5pct);
  }
  .bg-tint-10 {
    background-color: var(--lumo-tint-10pct);
  }
  .bg-tint-20 {
    background-color: var(--lumo-tint-20pct);
  }
  .bg-tint-30 {
    background-color: var(--lumo-tint-30pct);
  }
  .bg-tint-40 {
    background-color: var(--lumo-tint-40pct);
  }
  .bg-tint-50 {
    background-color: var(--lumo-tint-50pct);
  }
  .bg-tint-60 {
    background-color: var(--lumo-tint-60pct);
  }
  .bg-tint-70 {
    background-color: var(--lumo-tint-70pct);
  }
  .bg-tint-80 {
    background-color: var(--lumo-tint-80pct);
  }
  .bg-tint-90 {
    background-color: var(--lumo-tint-90pct);
  }
  .bg-tint {
    background-color: var(--lumo-tint);
  }

  .bg-shade-5 {
    background-color: var(--lumo-shade-5pct);
  }
  .bg-shade-10 {
    background-color: var(--lumo-shade-10pct);
  }
  .bg-shade-20 {
    background-color: var(--lumo-shade-20pct);
  }
  .bg-shade-30 {
    background-color: var(--lumo-shade-30pct);
  }
  .bg-shade-40 {
    background-color: var(--lumo-shade-40pct);
  }
  .bg-shade-50 {
    background-color: var(--lumo-shade-50pct);
  }
  .bg-shade-60 {
    background-color: var(--lumo-shade-60pct);
  }
  .bg-shade-70 {
    background-color: var(--lumo-shade-70pct);
  }
  .bg-shade-80 {
    background-color: var(--lumo-shade-80pct);
  }
  .bg-shade-90 {
    background-color: var(--lumo-shade-90pct);
  }
  .bg-shade {
    background-color: var(--lumo-shade);
  }

  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast {
    background-color: var(--lumo-contrast);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }

  .bg-warning {
    background-color: var(--lumo-warning-color);
  }
  .bg-warning-10 {
    background-color: var(--lumo-warning-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ai=x`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border {
    border: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-b {
    border-bottom: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-e {
    border-inline-end: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-l {
    border-left: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-r {
    border-right: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-s {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-t {
    border-top: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-dashed {
    --lumo-utility-border-style: dashed;
  }
  .border-dotted {
    --lumo-utility-border-style: dotted;
  }

  /* === Border color === */
  .border-contrast-5 {
    --lumo-utility-border-color: var(--lumo-contrast-5pct);
  }
  .border-contrast-10 {
    --lumo-utility-border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-20 {
    --lumo-utility-border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-30 {
    --lumo-utility-border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-40 {
    --lumo-utility-border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-50 {
    --lumo-utility-border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-60 {
    --lumo-utility-border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-70 {
    --lumo-utility-border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-80 {
    --lumo-utility-border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-90 {
    --lumo-utility-border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast {
    --lumo-utility-border-color: var(--lumo-contrast);
  }

  .border-primary {
    --lumo-utility-border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    --lumo-utility-border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    --lumo-utility-border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    --lumo-utility-border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    --lumo-utility-border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    --lumo-utility-border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    --lumo-utility-border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    --lumo-utility-border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    --lumo-utility-border-color: var(--lumo-success-color-10pct);
  }

  .border-warning {
    --lumo-utility-border-color: var(--lumo-warning-color);
  }
  .border-warning-10 {
    --lumo-utility-border-color: var(--lumo-warning-color-10pct);
  }
  .border-warning-strong {
    --lumo-utility-border-color: var(--lumo-warning-text-color);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
  .rounded-full {
    border-radius: 9999px;
  }

  /* === Divide === */
  .divide-x > * + * {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .divide-y > * + * {
    border-block-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const oi=x`
  /* === Backdrop filter === */
  .backdrop-blur-none {
    backdrop-filter: blur(0);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
  .backdrop-blur {
    backdrop-filter: blur(8px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
  .backdrop-blur-2xl {
    backdrop-filter: blur(40px);
  }
  .backdrop-blur-3xl {
    backdrop-filter: blur(64px);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ii=x`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-auto {
    flex: auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }

  /* === Flex shrink === */
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-shrink {
    flex-shrink: 1;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }
  .col-span-full {
    grid-column: 1 / -1;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }
  .row-span-full {
    grid-row: 1 / -1;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ri=x`
  /* === Aspect ratio === */
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    aspect-ratio: 16 / 9;
  }

  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Top, end, bottom, start === */
  .-bottom-xs {
    bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-bottom-s {
    bottom: calc(var(--lumo-space-s) / -1);
  }
  .-bottom-m {
    bottom: calc(var(--lumo-space-m) / -1);
  }
  .-bottom-l {
    bottom: calc(var(--lumo-space-l) / -1);
  }
  .-bottom-xl {
    bottom: calc(var(--lumo-space-xl) / -1);
  }
  .-bottom-full {
    bottom: -100%;
  }
  .bottom-0 {
    bottom: 0;
  }
  .bottom-xs {
    bottom: var(--lumo-space-xs);
  }
  .bottom-s {
    bottom: var(--lumo-space-s);
  }
  .bottom-m {
    bottom: var(--lumo-space-m);
  }
  .bottom-l {
    bottom: var(--lumo-space-l);
  }
  .bottom-xl {
    bottom: var(--lumo-space-xl);
  }
  .bottom-auto {
    bottom: auto;
  }
  .bottom-full {
    bottom: 100%;
  }

  .-end-xs {
    inset-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-end-s {
    inset-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-end-m {
    inset-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-end-l {
    inset-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-end-xl {
    inset-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .-end-full {
    inset-inline-end: -100%;
  }
  .end-0 {
    inset-inline-end: 0;
  }
  .end-xs {
    inset-inline-end: var(--lumo-space-xs);
  }
  .end-s {
    inset-inline-end: var(--lumo-space-s);
  }
  .end-m {
    inset-inline-end: var(--lumo-space-m);
  }
  .end-l {
    inset-inline-end: var(--lumo-space-l);
  }
  .end-xl {
    inset-inline-end: var(--lumo-space-xl);
  }
  .end-auto {
    inset-inline-end: auto;
  }
  .end-full {
    inset-inline-end: 100%;
  }

  .-start-xs {
    inset-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-start-s {
    inset-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-start-m {
    inset-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-start-l {
    inset-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-start-xl {
    inset-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .-start-full {
    inset-inline-start: -100%;
  }
  .start-0 {
    inset-inline-start: 0;
  }
  .start-xs {
    inset-inline-start: var(--lumo-space-xs);
  }
  .start-s {
    inset-inline-start: var(--lumo-space-s);
  }
  .start-m {
    inset-inline-start: var(--lumo-space-m);
  }
  .start-l {
    inset-inline-start: var(--lumo-space-l);
  }
  .start-xl {
    inset-inline-start: var(--lumo-space-xl);
  }
  .start-auto {
    inset-inline-start: auto;
  }
  .start-full {
    inset-inline-start: 100%;
  }

  .-top-xs {
    top: calc(var(--lumo-space-xs) / -1);
  }
  .-top-s {
    top: calc(var(--lumo-space-s) / -1);
  }
  .-top-m {
    top: calc(var(--lumo-space-m) / -1);
  }
  .-top-l {
    top: calc(var(--lumo-space-l) / -1);
  }
  .-top-xl {
    top: calc(var(--lumo-space-xl) / -1);
  }
  .-top-full {
    top: -100%;
  }
  .top-0 {
    top: 0;
  }
  .top-xs {
    top: var(--lumo-space-xs);
  }
  .top-s {
    top: var(--lumo-space-s);
  }
  .top-m {
    top: var(--lumo-space-m);
  }
  .top-l {
    top: var(--lumo-space-l);
  }
  .top-xl {
    top: var(--lumo-space-xl);
  }
  .top-auto {
    top: auto;
  }
  .top-full {
    top: 100%;
  }

  /* === Visibility === */
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }

  /* === Z-index === */
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .z-30 {
    z-index: 30;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    /* Display */
    .sm\\:block {
      display: block;
    }
    .sm\\:flex {
      display: flex;
    }
    .sm\\grid {
      display: grid;
    }
    .sm\\:hidden {
      display: none;
    }
    .sm\\:inline {
      display: inline;
    }
    .sm\\:inline-block {
      display: inline-block;
    }
    .sm\\:inline-flex {
      display: inline-flex;
    }
    .sm\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .sm\\:absolute {
      position: absolute;
    }
    .sm\\:fixed {
      position: fixed;
    }
    .sm\\:relative {
      position: relative;
    }
    .sm\\:static {
      position: static;
    }
    .sm\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 768px) {
    /* Display */
    .md\\:block {
      display: block;
    }
    .md\\:flex {
      display: flex;
    }
    .md\\grid {
      display: grid;
    }
    .md\\:hidden {
      display: none;
    }
    .md\\:inline {
      display: inline;
    }
    .md\\:inline-block {
      display: inline-block;
    }
    .md\\:inline-flex {
      display: inline-flex;
    }
    .md\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .md\\:absolute {
      position: absolute;
    }
    .md\\:fixed {
      position: fixed;
    }
    .md\\:relative {
      position: relative;
    }
    .md\\:static {
      position: static;
    }
    .md\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1024px) {
    /* Display */
    .lg\\:block {
      display: block;
    }
    .lg\\:flex {
      display: flex;
    }
    .lg\\grid {
      display: grid;
    }
    .lg\\:hidden {
      display: none;
    }
    .lg\\:inline {
      display: inline;
    }
    .lg\\:inline-block {
      display: inline-block;
    }
    .lg\\:inline-flex {
      display: inline-flex;
    }
    .lg\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .lg\\:absolute {
      position: absolute;
    }
    .lg\\:fixed {
      position: fixed;
    }
    .lg\\:relative {
      position: relative;
    }
    .lg\\:static {
      position: static;
    }
    .lg\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1280px) {
    /* Display */
    .xl\\:block {
      display: block;
    }
    .xl\\:flex {
      display: flex;
    }
    .xl\\grid {
      display: grid;
    }
    .xl\\:hidden {
      display: none;
    }
    .xl\\:inline {
      display: inline;
    }
    .xl\\:inline-block {
      display: inline-block;
    }
    .xl\\:inline-flex {
      display: inline-flex;
    }
    .xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .xl\\:absolute {
      position: absolute;
    }
    .xl\\:fixed {
      position: fixed;
    }
    .xl\\:relative {
      position: relative;
    }
    .xl\\:static {
      position: static;
    }
    .xl\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1536px) {
    /* Display */
    .\\32xl\\:block {
      display: block;
    }
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\grid {
      display: grid;
    }
    .\\32xl\\:hidden {
      display: none;
    }
    .\\32xl\\:inline {
      display: inline;
    }
    .\\32xl\\:inline-block {
      display: inline-block;
    }
    .\\32xl\\:inline-flex {
      display: inline-flex;
    }
    .\\32xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .\\32xl\\:absolute {
      position: absolute;
    }
    .\\32xl\\:fixed {
      position: fixed;
    }
    .\\32xl\\:relative {
      position: relative;
    }
    .\\32xl\\:static {
      position: static;
    }
    .\\32xl\\:sticky {
      position: sticky;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ni=x`
  /* === Box shadow === */
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const si=x`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const li=x`
  /* === Margin === */
  .-m-xs {
    margin: calc(var(--lumo-space-xs) / -1);
  }
  .-m-s {
    margin: calc(var(--lumo-space-s) / -1);
  }
  .-m-m {
    margin: calc(var(--lumo-space-m) / -1);
  }
  .-m-l {
    margin: calc(var(--lumo-space-l) / -1);
  }
  .-m-xl {
    margin: calc(var(--lumo-space-xl) / -1);
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }
  .m-auto {
    margin: auto;
  }

  /* === Margin (bottom) === */
  .-mb-xs {
    margin-bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-mb-s {
    margin-bottom: calc(var(--lumo-space-s) / -1);
  }
  .-mb-m {
    margin-bottom: calc(var(--lumo-space-m) / -1);
  }
  .-mb-l {
    margin-bottom: calc(var(--lumo-space-l) / -1);
  }
  .-mb-xl {
    margin-bottom: calc(var(--lumo-space-xl) / -1);
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }
  .mb-auto {
    margin-bottom: auto;
  }

  /* === Margin (end) === */
  .-me-xs {
    margin-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-me-s {
    margin-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-me-m {
    margin-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-me-l {
    margin-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-me-xl {
    margin-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }
  .me-auto {
    margin-inline-end: auto;
  }

  /* === Margin (horizontal) === */
  .-mx-xs {
    margin-inline: calc(var(--lumo-space-xs) / -1);
  }
  .-mx-s {
    margin-inline: calc(var(--lumo-space-s) / -1);
  }
  .-mx-m {
    margin-inline: calc(var(--lumo-space-m) / -1);
  }
  .-mx-l {
    margin-inline: calc(var(--lumo-space-l) / -1);
  }
  .-mx-xl {
    margin-inline: calc(var(--lumo-space-xl) / -1);
  }
  .mx-0 {
    margin-inline: 0;
  }
  .mx-xs {
    margin-inline: var(--lumo-space-xs);
  }
  .mx-s {
    margin-inline: var(--lumo-space-s);
  }
  .mx-m {
    margin-inline: var(--lumo-space-m);
  }
  .mx-l {
    margin-inline: var(--lumo-space-l);
  }
  .mx-xl {
    margin-inline: var(--lumo-space-xl);
  }
  .mx-auto {
    margin-inline: auto;
  }

  /* === Margin (left) === */
  .-ml-xs {
    margin-left: calc(var(--lumo-space-xs) / -1);
  }
  .-ml-s {
    margin-left: calc(var(--lumo-space-s) / -1);
  }
  .-ml-m {
    margin-left: calc(var(--lumo-space-m) / -1);
  }
  .-ml-l {
    margin-left: calc(var(--lumo-space-l) / -1);
  }
  .-ml-xl {
    margin-left: calc(var(--lumo-space-xl) / -1);
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }
  .ml-auto {
    margin-left: auto;
  }

  /* === Margin (right) === */
  .-mr-xs {
    margin-right: calc(var(--lumo-space-xs) / -1);
  }
  .-mr-s {
    margin-right: calc(var(--lumo-space-s) / -1);
  }
  .-mr-m {
    margin-right: calc(var(--lumo-space-m) / -1);
  }
  .-mr-l {
    margin-right: calc(var(--lumo-space-l) / -1);
  }
  .-mr-xl {
    margin-right: calc(var(--lumo-space-xl) / -1);
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }
  .mr-auto {
    margin-right: auto;
  }

  /* === Margin (start) === */
  .-ms-xs {
    margin-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-ms-s {
    margin-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-ms-m {
    margin-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-ms-l {
    margin-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-ms-xl {
    margin-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }
  .ms-auto {
    margin-inline-start: auto;
  }

  /* === Margin (top) === */
  .-mt-xs {
    margin-top: calc(var(--lumo-space-xs) / -1);
  }
  .-mt-s {
    margin-top: calc(var(--lumo-space-s) / -1);
  }
  .-mt-m {
    margin-top: calc(var(--lumo-space-m) / -1);
  }
  .-mt-l {
    margin-top: calc(var(--lumo-space-l) / -1);
  }
  .-mt-xl {
    margin-top: calc(var(--lumo-space-xl) / -1);
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }
  .mt-auto {
    margin-top: auto;
  }

  /* === Margin (vertical) === */
  .-my-xs {
    margin-block: calc(var(--lumo-space-xs) / -1);
  }
  .-my-s {
    margin-block: calc(var(--lumo-space-s) / -1);
  }
  .-my-m {
    margin-block: calc(var(--lumo-space-m) / -1);
  }
  .-my-l {
    margin-block: calc(var(--lumo-space-l) / -1);
  }
  .-my-xl {
    margin-block: calc(var(--lumo-space-xl) / -1);
  }
  .my-0 {
    margin-block: 0;
  }
  .my-xs {
    margin-block: var(--lumo-space-xs);
  }
  .my-s {
    margin-block: var(--lumo-space-s);
  }
  .my-m {
    margin-block: var(--lumo-space-m);
  }
  .my-l {
    margin-block: var(--lumo-space-l);
  }
  .my-xl {
    margin-block: var(--lumo-space-xl);
  }
  .my-auto {
    margin-block: auto;
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const di=x`
  .transition {
    transition: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow,
      transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-all {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-colors {
    transition: color, background-color, border-color, text-decoration-color, fill,
      stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-none {
    transition: none;
  }
  .transition-opacity {
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-shadow {
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-transform {
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ci=x`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line clamp === */
  [class*='line-clamp-'] {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .line-clamp-1 {
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    -webkit-line-clamp: 2;
  }
  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }
  .line-clamp-4 {
    -webkit-line-clamp: 4;
  }
  .line-clamp-5 {
    -webkit-line-clamp: 5;
  }
  .line-clamp-6 {
    -webkit-line-clamp: 6;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }
  .text-warning {
    color: var(--lumo-warning-text-color);
  }
  .text-warning-contrast {
    color: var(--lumo-warning-contrast-color);
  }

  /* == Text decoration === */
  .line-through {
    text-decoration-line: line-through;
  }
  .no-underline {
    text-decoration-line: none;
  }
  .underline {
    text-decoration-line: underline;
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-break-spaces {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const re=x`
${ti}
${ei}
${ai}
${oi}
${ii}
${ri}
${ni}
${si}
${li}
${di}
${ci}
`;Ct("",re,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("utility",re);const pi=`@charset "UTF-8";.login-register-button{background:transparent;position:relative;bottom:10px;color:#0ef;border-radius:30px}.form-link{position:relative;bottom:10px}.google-button>vaadin-icon{margin-right:5px}.google-button{background:transparent;border:1px solid var(--lumo-contrast-30pct);position:relative;bottom:50px;height:45px;border-radius:30px;width:260px;color:#fff}.login-or-layout div{background:var(--lumo-contrast-40pct);height:1px;width:130px}.login-or-layout{position:relative;bottom:55px;color:#fff;width:100%;display:flex;align-items:center;justify-content:center}.login-form-layout{display:flex;justify-content:center;align-items:center;height:100%;width:100%;background:transparent;padding:0}.form vaadin-login-form-wrapper vaadin-text-field::part(error-message),.form vaadin-login-form-wrapper vaadin-password-field::part(error-message){display:none}.form vaadin-login-form-wrapper::part(form-title){width:100%;text-align:center;margin-bottom:10px;background:linear-gradient(270deg,gray,#1fd7e8df 60%);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:40px}.form vaadin-login-form-wrapper vaadin-button:last-child{margin-top:10px;color:#0ef}.form vaadin-login-form-wrapper vaadin-button:nth-child(2){margin-top:30px;height:55px;text-align:center;font-size:1.2rem;padding:1rem 2.5rem;border:.5px solid white;outline:none;border-radius:40px;cursor:pointer;text-transform:uppercase;background:linear-gradient(to left,#1fd7e8df,#021d4eae 40%);color:#fff;font-weight:700;transition:.6s;box-shadow:0 0 60px #1f4c65;-webkit-box-reflect:below 20px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.4))}.form vaadin-login-form-wrapper vaadin-button:nth-child(2):active{scale:.92}.form vaadin-login-form-wrapper vaadin-button:nth-child(2):hover{background:#021d4e;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%);color:#000}.form vaadin-login-form-wrapper vaadin-text-field::part(input-field),.form vaadin-login-form-wrapper vaadin-password-field::part(input-field){color:#000;border:.5px solid white;height:3em;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}.form vaadin-login-form{background:transparent;align-items:center;width:100%}.form vaadin-login-form-wrapper{background:transparent;height:100%;align-items:center}.form{background:#000;height:100%}.forgot-password{color:#0ef;margin-top:70px}.form-link{color:#0ef}.login-text{background:linear-gradient(270deg,gray,#1fd7e8df 60%);-webkit-background-clip:text;background-clip:text;color:transparent}vaadin-email-field.email>input:placeholder-shown{color:var(--lumo-shade-60pct)}vaadin-email-field.email::part(input-field){color:#000;border:.5px solid white;height:3em;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-password-field.password::part(input-field){color:#000;border-radius:20px;height:3em;border:.5px solid white;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-email-field.email>[slot=suffix]{color:#0ef}vaadin-email-field.email::part(label){color:#fff}vaadin-password-field.password::part(label){color:#fff}vaadin-password-field.password::part(reveal-button){color:#0ef}.form{background-image:url(../../images/background.png);background-size:cover}.text{margin-left:50px}.button2{position:relative;top:10px}vaadin-password-field.password::part(error-message){position:absolute;top:483px;font-size:11px}vaadin-email-field.email::part(error-message){position:fixed;top:395px;font-size:11px}vaadin-text-field.register-field:nth-child(2)::part(error-message){position:fixed;top:305px;font-size:11px}vaadin-text-field.register-field:first-child::part(error-message){position:fixed;top:215px;font-size:11px}v-notification-card{width:100%;text-align:center;background:green}.register-login-button{background:transparent;position:relative;bottom:10p;color:#0ef;top:15px;border-radius:30px}.back-continue{position:relative;right:130px}.register-upload vaadin-upload-file::part(meta),.register-upload vaadin-upload-file::part(done-icon){position:absolute;z-index:9999}.register-avatar{position:fixed;width:250px;height:250px;left:53px;pointer-events:none;border:1px solid var(--lumo-contrast-40pct)}vaadin-upload.register-upload>vaadin-button{display:flex;padding-left:15px;width:170px;color:#fff;background:transparent;border:1px solid var(--lumo-contrast-20pct);position:absolute;bottom:12px;left:-10px;border-radius:20px}.register-upload vaadin-upload-file::part(remove-button){position:absolute;display:none;background:green}.register-upload vaadin-upload-file::part(done-icon),.register-upload vaadin-upload-file[uploading]{display:none}vaadin-button.button1{position:absolute;bottom:100p;top:495px;left:15px}.form-link{top:20px}.register-fields-layout{background-image:url(../../images/background.png);background-size:cover;height:100%;align-items:center;justify-content:center}.register-form{background:#000;height:100%;-webkit-user-select:none;user-select:none}.accordion{height:450px}vaadin-text-field.register-field>input:placeholder-shown{color:var(--lumo-shade-50pct)}vaadin-date-picker.date-picker::part(toggle-button):before{color:#0ef}.button2,.back-continue{margin-left:20px}vaadin-icon.button2,vaadin-icon.back-continue{border-radius:50%;border:1px solid #0ef;width:50px;margin-top:7px;padding-top:9px;padding-bottom:10px;color:#fff;height:50px;-webkit-box-reflect:left-side 20px linear-gradient(to left,rgba(0,0,0,0),rgba(0,0,0,.4))}.button2,.back-continue{padding:10px;margin-bottom:10px}vaadin-icon.button2:active,vaadin-icon.back-continue:active{scale:.92;border:1px solid white;background:#0ef;color:#000}vaadin-button.back-continue:active{scale:.92}vaadin-button.back-continue:hover{background:#021d4e;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%);color:#000}.panel vaadin-accordion-heading::part(toggle){display:none;background:transparent}.panel vaadin-accordion-panel[disabled]{display:none;background:transparent}.accordion vaadin-accordion-heading{display:none;background:transparent}.hint2{color:#0ef}.hint{color:var(--lumo-contrast-80pct)}vaadin-upload.register-upload>vaadin-button[disabled]{display:none}.register-upload{color:#fff}vaadin-button.button1{margin-top:20px;width:17em;height:3em;text-align:center;font-size:1.2rem;padding:1rem 2.5rem;border:.5px solid white;outline:none;border-radius:40px;cursor:pointer;text-transform:uppercase;background:linear-gradient(to left,#1fd7e8df,#021d4eae 40%);color:#fff;font-weight:700;-webkit-box-reflect:below 20px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.4))}vaadin-button.button1:active{scale:.92}vaadin-button.button1:hover{background:#021d4e;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%);color:#000}.panel{background:#0ef;-webkit-background-clip:text;background-clip:text;color:transparent}.register-form{overflow:hidden;background-image:url(../../register_images/background.png);background-size:cover}vaadin-button.btn{font-size:1.2rem;padding:1rem 2.5rem;border:none;outline:none;border-radius:.4rem;cursor:pointer;text-transform:uppercase;background-color:#0e0e1a;color:#eaeaea;font-weight:700;transition:.6s;box-shadow:0 0 60px #1f4c65;-webkit-box-reflect:below 10px linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.4))}vaadin-button.btn:active{scale:.92}vaadin-button.btn:hover{background:#021d4e;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%);color:#040426}vaadin-text-field.register-field::part(input-field){border:.5px solid white;height:3em;transition:.6s;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-text-field.register-field>input:placeholder-shown{color:var(--lumo-shade-60pct)}vaadin-text-field.register-field{cursor:pointer}vaadin-text-field.register-field>[slot=suffix]{color:#0ef}vaadin-text-field.register-field::part(label){color:#fff}vaadin-combo-box.gender::part(input-field){border:.5px solid white;height:3em;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-combo-box.gender>input{background:linear-gradient(to right,#000 80%,#fff 10%);-webkit-background-clip:text;background-clip:text;color:transparent}vaadin-combo-box.gender::part(label){color:#fff}vaadin-combo-box.gender::part(toggle-button):before{color:#0ef}.gender vaadin-combo-box-overlay{background:#0ef}vaadin-date-picker.date-picker::part(input-field){border:.5px solid white;height:3em;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-date-picker.date-picker>input{background:linear-gradient(to right,#000 80%,#fff 10%);-webkit-background-clip:text;background-clip:text;color:transparent}vaadin-date-picker.date-picker::part(label){color:#fff}.comments-count{font-family:serif;color:#fff;font-size:12px}.icons{animation:pulse 1s infinite}.message-list{animation:fadeInUp 3s none}.send-icon{animation:fadeInRight 4s none}.input{animation:bounceInUp 3s none}.comment-name{display:flex;justify-content:center;align-items:center;color:#fff;font-family:serif;font-size:12px;margin-left:30px}.more-icon:hover,.comment-button:hover,.heart-icon:hover,.view-icon:hover,.view-button:hover{animation:fadeOutUp .9s forwards;display:inline-block}.artwork-upload{z-index:0}.artwork-upload vaadin-upload-file,.artwork-upload vaadin-upload-file::part(meta),.artwork-upload vaadin-upload-file::part(done-icon),.artwork-upload vaadin-upload-file[uploading],.register-upload vaadin-upload-file::part(name),.artwork-upload vaadin-upload-file::part(remove-button),.artwork-upload vaadin-upload-file::part(name),.artwork-upload>vaadin-button[disabled],.artwork-upload vaadin-upload-file-list::part(list),.artwork-upload vaadin-upload-file-list{all:unset;position:absolute;transform:translateY(100%);display:none;border:none;width:10px;margin:0}vaadin-icon.main-artwork-icons:nth-child(1){background:var(--lumo-primary-color)}vaadin-icon.main-artwork-icons:nth-child(2){background:var(--lumo-error-color);position:relative;right:20px}vaadin-icon.main-artwork-icons:nth-child(3){background:var(--lumo-warning-color);position:relative;right:40px}vaadin-icon.main-artwork-icons{border-radius:50%;padding:3px;color:#fff}.main-artwork-reactions{color:#fff;position:relative;right:40px}vaadin-text-area.add-artwork-area::part(label){color:#fff;font-weight:700}image{events-pointer:none}.add-artwork-header-text{color:#fff;font-weight:700}vaadin-text-area.add-artwork-area>textarea:placeholder-shown{color:#fff}vaadin-button.add-main-post-button{background:var(--lumo-primary-color);color:#fff;border-radius:8px;font-weight:700}.add-artwork-avatar{width:50px;height:50px;border:1px solid gray;pointer-events:none}.add-artwork-layout{margin-bottom:px;align-items:center;font-size:14px;color:#fff;font-weight:700}vaadin-text-area.add-artwork-area::part(input-field){background:#333436;border:1px solid var(--lumo-contrast-5pct);border-radius:8px;color:#fff;height:200px}vaadin-text-area.add-artwork-area{margin-top:3px;width:100%}.post-button{color:var(--lumo-primary-color);margin-left:100px;font-weight:700;font-size:17px}vaadin-button.feed-comment>vaadin-icon,vaadin-button.feed-like>vaadin-icon,vaadin-button.feed-heart>vaadin-icon,vaadin-button.feed-reaction>vaadin-icon{width:30px;height:30px}vaadin-button.feed-like::part(label),vaadin-button.feed-heart::part(label),vaadin-button.feed-comment::part(label),vaadin-button.feed-reaction::part(label){font-size:14px;color:#fff}.feed-comment,.feed-like,.feed-heart,.feed-reaction{width:100px;background:transparent;margin:0;padding:0}vaadin-button.feed-comment>vaadin-icon{color:var(--lumo-success-text-color)}vaadin-button.feed-heart>vaadin-icon{color:var(--lumo-error-color)}vaadin-button.feed-like>vaadin-icon{color:var(--lumo-primary-color)}.feed-date-posted{color:var(--lumo-contrast-70pct);font-style:italic;font-size:8px;display:flex;justify-content:center;align-items:center;background:var(--lumo-contrast-20pct);height:15px;margin:0;width:100%}.feed-name{margin-top:0;font-size:12px}vaadin-app-layout.main-feed[overlay]{background:#000;-webkit-user-select:none;user-select:none}.profile-layout2{justify-content:center;align-items:center;border-top:.5px solid gray;background:var(--lumo-contrast-10pct);display:flex}vaadin-button.feed-follow{color:var(--lumo-primary-color);background:transparent}.feed-avatar{pointer-events:none;margin-left:10px;margin-top:10px;width:50px;height:50px;border:1px solid gray;margin-bottom:5px}vaadin-icon.feed-share{display:none}.main-feed-buttons{display:flex;justify-content:center;align-items:center;margin-bottom:10px}.main-feed-image{position:relative;display:inline-block;padding:0;margin:none;pointer-events:none}vaadin-icon.hearticon{color:#0ef;margin-left:100px}.heartreactions-span{color:#fff}vaadin-icon.likeicon{color:#0ef;margin-left:50px}.totalreactions-span{color:#fff}vaadin-button.unlike{border-radius:20px;font-size:15px;margin-left:50px;background:#0ef}vaadin-button.unlike::part(label){color:var(--lumo-shade-70pct)}vaadin-button.unheart{border-radius:20px;font-size:15px;background:#0ef}vaadin-button.unheart::part(label){color:var(--lumo-shade-70pct)}.total-reactions{font-size:12px;color:#fff}vaadin-button.like-button>vaadin-icon{color:#0ef}vaadin-button.like-button::part(label){color:#fff}vaadin-button.heart-button>vaadin-icon{color:#0ef}vaadin-button.heart-button::part(label){color:#fff}.heart-button{border-top:.9px solid #0ef;border-bottom:.9px solid #0ef;width:120px;background:#000;border-radius:20px}.like-button{border-top:.9px solid #0ef;border-bottom:.9px solid #0ef;margin-left:12px;width:120px;height:35px;background:#000;border-radius:20px}.artworks-count{font-size:12px;margin-right:10px;text-shadow:2px 2px 4px black;color:#fff}.artworks-name{font-size:15px}.artwork-image{width:91vw}vaadin-app-layout.artwork-main::part(navbar){background:#000;border-radius:20px;border-top:.5px solid rgb(0,255,255);border-bottom:.5px solid rgb(0,255,255)}.title,.posted{animation:backInRight 2s none}.artwork-image{animation:backInDown 2s none}.posted{margin-bottom:10px;font-style:italic;font-size:12px;color:var(--lumo-contrast-60pct);margin-left:20px}.title{color:#fff;font-size:25px}.artwork-image{border-top:2px solid #0ef;border-bottom:2px solid #0ef;border-radius:20px}.fullname{animation:bounceInDown 2s none;font-size:15px;font-weight:700;color:#fff;margin-left:30px}.purple-area::part(input-field){background:#c500ff}.black-area::part(input-field){background:#000}.white-area::part(input-field){background:#333436}.red-area::part(input-field){background:#e2013b}.red-area>textarea:placeholder-shown,.black-area>textarea:placeholder-shown,.purple-area>textarea:placeholder-shown{color:#fff;font-weight:700}.white-area>textarea:placeholder-shown{color:#fff}.white-area{margin-top:-2px;height:200px}.red-area,.black-area,.purple-area{margin-top:-2px;height:180px}.white-area::part(input-field){border:1px solid var(--lumo-contrast-5pct);border-radius:8px;color:#fff;height:200px}.red-area::part(input-field),.black-area::part(input-field),.purple-area::part(input-field){border:1px solid var(--lumo-contrast-5pct);border-radius:0;color:#fff;height:182px;padding-top:80p;margin-left:5px!important;margin-right:5px!important}.add-artwork-background-tabs vaadin-tab:nth-child(8)>div{background:linear-gradient(to bottom,gray,#000)}.add-artwork-background-tabs vaadin-tab:nth-child(7)>div{background:linear-gradient(to bottom,#ff0,orange,purple)}.add-artwork-background-tabs vaadin-tab:nth-child(6)>div{background:linear-gradient(to top,#C500FF,var(--lumo-primary-color))}.add-artwork-background-tabs vaadin-tab:nth-child(5)>div{background:linear-gradient(to bottom,#E2013B,#C500FF,var(--lumo-primary-color))}.add-artwork-background-tabs vaadin-tab:nth-child(4)>div{background:#000}.add-artwork-background-tabs vaadin-tab:nth-child(3)>div{background:#e2013b}.add-artwork-background-tabs vaadin-tab:nth-child(2)>div{background:#c500ff}.add-artwork-background-tabs vaadin-tab:nth-child(1)>div{background:#fff}.add-artwork-background-tabs[orientation=horizontal]{all:unset}.add-artwork-background-tabs::part(back-button),.add-artwork-background-tabs::part(forward-button){display:none}.add-artwork-background-tabs vaadin-tab:before{width:38px}.add-artwork-background-tabs vaadin-tab{margin-top:7px;padding:4px;width:45px}.add-artwork-background-tabs::part(tabs){all:unset;display:flex;overflow:auto}.add-artwork-background-tabs vaadin-tab>div{position:relative;height:37px;width:37px;border-radius:4px;margin:0}.add-artwork-background-tabs vaadin-tab:first-child{margin-left:10px!important}.add-artwork-background-tab{justify-content:space-between;width:100%;margin-left:12px}.add-artwork-layout>div>vaadin-button{color:#fff;background:#333436;border:.5px solid var(--lumo-contrast-10pct);font-size:11px;height:30px;width:100px}.add-artwork-layout>div{display:flex;flex-direction:column}.add-artwork-layout{padding-left:12px}vaadin-app-layout.add-artwork-app-layout[overlay]{background:var(--primary);-webkit-user-select:none;user-select:none}vaadin-app-layout.add-artwork-app-layout::part(navbar){align-items:center;margin:0;background:var(--primary);border-bottom:.5px solid var(--lumo-contrast-10pct)}.custom-field{margin-top:80px}vaadin-text-field.custom-field::part(input-field){border:.5px solid white;height:3em;transition:.6s;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-text-field.custom-field{cursor:pointer}vaadin-text-field.custom-field>input{color:#000}vaadin-text-field.custom-field:active{scale:.92}vaadin-text-field.custom-field>[slot=suffix]{color:#0ef;animation:bounce 3s none}vaadin-text-field.custom-field::part(label){color:#fff}.form-layout{margin-top:60px}vaadin-app-layout.register-form::part(navbar){background:#000}vaadin-app-layout.register-form::part(content){justify-content:center;align-items:center}.time-picker{animation:fadeInRight 4s none}vaadin-time-picker.time-picker::part(input-field){border:.5px solid white;height:3em;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-time-picker.time-picker>input{background:linear-gradient(to right,#000 80%,#fff 10%);-webkit-background-clip:text;background-clip:text;color:transparent}vaadin-time-picker.time-picker::part(label){color:#fff}vaadin-time-picker.time-picker::part(toggle-button){color:#0ef;animation:bounce 1s none}vaadin-text-area.text-area::part(input-field){border:.5px solid white;height:3em;transition:.6s;border-radius:20px;background:linear-gradient(270deg,#021d4eae,#1fd7e8df 60%)}vaadin-text-area.text-area{color:#000;cursor:pointer;animation:fadeInLeft 3s none}vaadin-text-field.register-field>input{color:#000}vaadin-text-area.text-area:active{scale:.92}vaadin-text-area.text-area>[slot=suffix]{color:#0ef;animation:bounce 3s none}vaadin-text-area.text-area::part(label){color:#fff}.divider2{background:#0ef;width:280px}.divider{background:#0ef;width:270px;margin-left:10px}.details vaadin-details-summary:active{color:#fff}.details vaadin-details-summary{color:var(--lumo-contrast-70pct);margin-left:30px}.details vaadin-details-summary::part(toggle){color:#0ef}.touch-icon{margin-top:10px;color:#0ef}.access-link{color:#fff;padding:5px 10px 5px 0;max-height:40px;margin-top:10px;margin-bottom:10px}.edit-student-icon{margin-right:10px;color:#0ef;width:17px;height:17px}.edit-student,.add,.edit{font-size:12px}.edit-icon{width:20px;height:20px;color:#0ef;margin-left:20px;margin-right:10px}.add-icon{width:20px;height:20px;color:#0ef;margin-right:10px}vaadin-app-layout.acessinfo-main{background-image:url(../../images/background.png);background-size:cover}vaadin-app-layout.acessinfo-main::part(navbar){background:#000;border-top:.9px solid #0ef}.details vaadin-details{color:#fff}.acess-details2{text-decoration-color:#0ef;text-decoration-line:underline;text-underline-offset:8px;text-decoration-thickness:.15px;margin-left:15px;margin-bottom:10px;color:#fff;font-size:15px}.acess-details{text-decoration-color:#0ef;text-decoration-line:underline;text-underline-offset:8px;text-decoration-thickness:.15px;margin-left:30px;margin-bottom:20px;color:#fff;font-size:15px}.welcome{margin-top:10px;font-size:15px;font-family:monospace;margin-left:20px}.contact-link:active{text-decoration-color:#0ef;text-decoration-line:underline;text-underline-offset:8px;text-decoration-thickness:.15px}.contact-link{color:#fff}.access-details{text-decoration-color:#0ef;text-decoration-line:underline;text-underline-offset:8px;text-decoration-thickness:.15px;margin-bottom:10px;color:#fff;font-size:15px}.noinfo-span{text-decoration-color:#0ef;text-decoration-line:underline;text-underline-offset:8px;text-decoration-thickness:.15px;margin-left:15px;margin-bottom:10px;color:#fff;font-size:15px}.contact-details vaadin-details-summary:active{color:#fff}.contact-details vaadin-details-summary{color:var(-lumo-contrast-70pct);margin-left:10px}.contact-details vaadin-details-summary::part(toggle){color:#0ef}.add-contact-icon,.edit-contact-icon{width:17px;height:17px;color:#0ef;margin-left:80px}.edit-contact-text{color:#fff;margin-left:15px;font-size:12px}.add-contact-text{margin-left:15px;color:#fff;font-size:12px}.fa{font-family:"Font Awesome 6 Free"!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-code-branch:before{content:""}.fa-user:before{content:""}.forgot-confirm-dialog>[slot=cancel-button]{color:var(--lumo-error-text-color);position:relative;bottom:5px;border-radius:20px}.forgot-confirm-dialog::part(content),.forgot-confirm-dialog::part(footer),.forgot-confirm-dialog::part(header){background:var(--lumo-contrast-10pct)}.forgot-confirm-dialog>[slot=confirm-button]{border-radius:20px}.forgot-confirm-dialog::part(overlay){background:#000;border:1px solid var(--lumo-contrast-40pct);border-radius:30px}.forgot-password-strength{position:absolute;top:130px}.forgot-verification-text,.forgot-recovery-text{margin-left:20px;font-size:20px}.forgot-rest-text{font-weight:700;font-size:28px}.forgot-cancel-button{width:100%;color:var(--lumo-error-text-color);text-align:center;height:45px}.forgot-new-password-field::part(input-field){background:var(--lumo-contrast-10pct);color:#fff;height:50px;border-radius:20px;border:.5px solid var(--lumo-contrast-40pct)}.forgot-new-password-field{width:100%}.forgot-invalid-text{position:absolute;top:130px}.forgot-resend{color:var(--lumo-primary-text-color)}.forgot-sent-text{text-align:center}.forgot-masked-email-text{color:#fff;font-weight:700}.forgot-verify-layout{color:#fff;width:100%;height:100%;justify-content:center;align-items:center;background:var(--lumo-contrast-10pct)}.forgot-password-text{font-size:20px}.forgot-loading-indicator{color:#fff;animation:spin .6s linear infinite}.forgot-recover-text{color:#fff}.forgot-lose-text{color:#fff;font-weight:700;font-size:28px}.forgot-send-button,.forgot-verify-button,.forgot-reset-button{width:100%;color:#fff;background:var(--lumo-primary-color);height:45px;border-radius:30px}.forgot-email-field>[slot=suffix]{color:#fff}.forgot-email-field>input{color:#fff}.forgot-email-field::part(label),.forgot-new-password-field::part(label){color:#fff;margin-bottom:10px}.forgot-email-field>input:placeholder-shown{color:var(--lumo-contrast-30pct)}.forgot-email-field{width:100%}.forgot-email-field::part(input-field){width:100%;background:var(--lumo-contrast-100pct);height:60px;border:.5px solid var(--lumo-contrast-50pct);border-radius:15px;color:#fff}.forgot-main-layout{width:100%;height:100%;justify-content:center;align-items:center;background:var(--lumo-contrast-10pct)}.forgot-header-layout{width:100%;align-items:center;font-weight:700;color:#fff}vaadin-text-field.digit-field::part(input-field){border:.5px solid var(--lumo-contrast-50pct);height:3em;border-radius:10px;background:var(--lumo-contrast-10pct);color:#fff;-webkit-user-select:none;user-select:none}vaadin-text-field.digit-field{cursor:pointer;width:43px}vaadin-text-field.digit-field>input{-webkit-user-select:none;user-select:none}vaadin-text-field.digit-field>[slot=suffix]{color:#0ef;animation:bounce 3s none}vaadin-text-field.digit-field::part(label){color:#fff}.add-artwork-edit-main>vaadin-horizontal-layout{background:gree;position:fixed}.add-artwork-edit-main{overflow-y:auto;height:500p!important;background:green;padding:10p;z-index:99999}.add-artwork-edit-main>div:nth-child(2){position:fixed;bottom:0;display:flex;justify-content:end}.edit-image-header-component>div{display:flex;flex-direction:column;gap:5px;margin-right:10px;margin-top:10px;gap:25px}.edit-image-header-component>div{display:flex;color:#fff;padding-top:5px;width:100%;justify-content:end!important}.edit-image-header-component>div>div>vaadin-icon{fill:#fff!important}.edit-image-header-component>div>div>span{margin-right:15px}.edit-image-header-component>div>div>span{font-size:12px;font-weight:700}.edit-image-header-component>div>div{display:flex;justify-content:end;align-items:center}.edit-image-header-component>vaadin-icon{font-size:28px;margin-top:10px}.edit-image-header-component{position:fixed;top:0;display:flex;justify-content:space-between;padding-left:10px}.edit-image-footer-component{position:fixed;bottom:0;display:flex;justify-content:end}.add-artwork-edit-main img{width:359p;max-height:694p;object-fit:cove}.add-artwork-edit-main>div:first-child{background:green;margin-bottom:20px}.add-artwork-edit-main vaadin-button{color:#fff;background:var(--lumo-primary-color);font-weight:700;font-size:15px;height:41px;width:85px!important;border-radius:8px;margin-bottom:8px;margin-right:8px}.add-artwork-edit-main img{max-width:359p;height:650p;pointer-events:none}.add-artwork-edit-main{background:#000}.add-artwork-edit-main{height:100p;display:flex;align-items:center;justify-content:center;overflow-y:hidden}.add-post-text-area-with-image>textarea:placeholder-shown{color:#fff}.add-post-text-area-with-image::part(input-field){border:1px solid var(--lumo-contrast-5pct);border-radius:8px;color:#fff;height:80px;background:var(--text-area-color)}.add-post-remove-main-div>div:nth-child(3):active,.add-post-remove-main-div>div:nth-child(4):active{background:var(--hover-color)}.add-post-remove-main-div>div:nth-child(3){margin-bottom:12p}.add-post-remove-main-div>div:nth-child(3)>vaadin-icon,.add-post-remove-main-div>div:nth-child(4)>vaadin-icon{background:var(--button-contrast-color);font-size:28px;padding:10px;border-radius:50%}.add-post-remove-main-div>div:nth-child(3),.add-post-remove-main-div>div:nth-child(4){display:flex;flex-direction:row;align-items:center;gap:8px;padding:6px 10px}.add-post-remove-main-div>div:nth-child(2){background:var(--nav-border);height:.5px;margin:10px 10px 12px}.add-post-remove-main-div{margin:10p;z-index:999999}.add-post-remove-main-div>div:first-child>div>span:first-child{color:#fff;font-weight:700;font-size:15px}.add-post-remove-main-div>div:first-child>div{display:flex;flex-direction:column;margin-left:12px;color:var(--block-text-color)}.add-post-remove-main-div>div:first-child{display:flex;flex-direction:row;align-items:center;margin-top:10px;margin-left:10px;margin-right:10px}.add-post-image-div>div:last-child div>vaadin-icon{align-self:center}.add-post-image-div>div:last-child div{display:fle;flex-direction:colum;justify-content:cente;width:100%}.add-post-remove-main-div>div:first-child>img{min-width:55px;height:50px;border-radius:8px;object-fit:cover;pointer-events:none}.add-post-image-div>div>img{height:165p}.add-post-image-div>div{border-radius:8px;width:170px;height:165px;background:green}.add-post-image-div vaadin-vertical-layout{z-index:9999999999999}.add-post-image-div>div:not(.add-post-image-div>div:first-child){width:;position:relativ;right:74p}.add-post-image-div>div,.add-post-image-div>div>div:last-child{display:flex;flex-direction:row}.add-post-image-div>div>div:last-child>vaadin-icon:last-child{margin-left:5px}.add-post-image-div>div>div:last-child>vaadin-icon:active{filter:contrast(50%)}.add-post-image-div>div>div:last-child>vaadin-icon{color:#fff;background:var(--lumo-shade-50pct);border-radius:50%;padding:9px;font-size:23px}.add-post-image-div>div>div:last-child{position:relative;top:8px;right:86px;height:34px}.add-post-image-div>div:first-child{margin-left:12px}.add-post-image-div>div:last-child{margin-right:12px}.add-post-image-div>div>div:first-child:active{filter:contrast(50%)}.add-post-image{height:165px;width:170px;border-radius:8px;object-fit:cover;pointer-events:none}.add-post-image-div::-webkit-scrollbar{display:none}.add-post-image-div{display:flex;flex-direction:row;align-items:center;margin-top:6px;gap:6px;width:100%;height:180p;overflow-x:auto;scroll-behavior:smooth}.artwork-upload>vaadin-button{width:100%}.post-add-photos-button>div{width:359px;display:flex;align-items:center;justify-content:start;z-index:99999}.post-add-photos-button:before{background:none}.post-add-photos-button{background:none;border-radius:0;color:unset;width:100%;padding:0 0 0 12px;z-index:99999}.add-artwork-app-layout>vaadin-vertical-layout>vaadin-form-layout>vaadin-text-area::part(input-field){margin-left:12px;margin-right:12px}.add-artwork-app-layout>vaadin-vertical-layout>vaadin-form-layout>vaadin-text-area{display:flex;justify-content:center;align-items:center}.add-artwork-app-layout>vaadin-vertical-layout>vaadin-form-layout>vaadin-horizontal-layout{margin-left:12px}.add-artwork-app-layout>vaadin-vertical-layout{padding-left:0;padding-right:0;padding-top:5px;height:100%}.add-post-main-layout{display:flex;flex-direction:column}.add-post-actions-div>div:nth-child(1)>vaadin-icon{color:var(--lumo-success-color)}.add-post-actions-div>div:nth-child(2)>vaadin-icon{color:var(--lumo-primary-color)}.add-post-actions-div>div:nth-child(3)>vaadin-icon{color:var(--lumo-error-color)}.add-post-actions-div>div:nth-child(4)>vaadin-icon{color:var(--lumo-warning-color)}.add-post-actions-div>div:nth-child(5)>vaadin-icon{color:var(--lumo-error-text-color)}.add-post-actions-div vaadin-icon{font-size:12px;margin-right:15px}.add-post-actions-div>div:active,.post-add-photos-button:active,.post-add-photos-button>div:active,.artwork-upload>vaadin-button:active{background:var(--hover-color)}.add-post-actions-div>div{padding-top:6px;padding-bottom:6px;padding-left:12px;display:flex;flex-direction:row;align-items:center;width:100%}.add-post-actions-div>vaadin-button{width:335px;margin-left:12px;margin-right:12px;height:53px;border-radius:5px;margin-top:10px}.add-post-actions-div{margin-top:5px;width:100%;display:flex;flex-direction:column}.post-description{background:var(--primary);white-space:pre;padding-left:10px;font-size:23p;letter-spacing:1p;text-shadow:.5px .5px currentColo}.post-comment-main-layout{padding:0 0 0 10px}.post-comment-footer-layout>div>vaadin-icon:nth-child(1){background:var(--lumo-primary-color)}.post-comment-footer-layout>div>vaadin-icon:nth-child(2){background:var(--lumo-error-color);right:3px}.post-comment-footer-layout>div>vaadin-icon:nth-child(3){background:var(--lumo-warning-color);right:6px}.post-comment-footer-layout>div>vaadin-icon{position:relative;font-size:12px;border-radius:50%;padding:3px;color:#fff}.post-comment-footer-layout>span:nth-child(3){margin-right:10px}.post-comment-footer-layout>span:nth-child(2){margin-right:15px}.post-comment-footer-layout>span:nth-child(2),.post-comment-footer-layout>span:nth-child(3){font-weight:700}.post-comment-footer-layout>span:nth-child(1){margin-left:60px;margin-right:15px}.post-comment-footer-layout{display:flex;flex-direction:row;width:100%;align-items:center;color:var(--lumo-contrast-70pct);position:relative;bottom:12px}.post-comment-layout>div>span:nth-child(2){word-wrap:break-word;white-space:pre-wrap}.post-comment-layout>div>span:nth-child(1){font-weight:700;font-size:14px}.post-comment-layout>div{display:flex;flex-direction:column;color:#fff;background:var(--lumo-contrast-5pct);padding:10px;border-radius:15px;max-width:270px;white-space:pre;justify-content:center;margin:0}.post-comment-layout>vaadin-avatar{pointer-events:none;width:40px;height:40px;border:.5px solid var(--lumo-contrast-20pct);margin-right:8px}.post-comment-layout{margin-bottom:10p;display:flex;flex-direction:row}.post-comment-virtual-list{height:auto;padding-top:5px}.post-sorted-line{height:.5px;width:100%;background:var(--nav-border)}.post-sorted-okay-button{background:var(--lumo-primary-color);font-weight:700;color:#fff;width:100%;border-radius:6px;margin:0}.comment-app-layout>vaadin-form-layout{overflow-x:hidden;height:auto}.post-sorted-header{border-bottom:.5px solid var(--nav-border);justify-content:center;font-weight:700;color:#fff;padding-top:15px;padding-bottom:10px}.post-sorted-div vaadin-radio-group[has-value]>vaadin-radio-button::part(radio){background:var(--lumo-primary-color);border:1px solid var(--lumo-primary-color);color:green}.post-sorted-div vaadin-radio-button::part(radio){border:1px solid white;background:none;font-size:20px}.post-sorted-div>span:nth-child(2){display:flex;justify-content:space-between;align-items:center;color:var(--lumo-contrast-70pct)}.post-sorted-div{display:flex;flex-direction:column}.post-sorted-layout{padding-top:10px;padding-bottom:15px}.post-sorted-text{padding-left:8px;margin-bottom:10px}.post-send-icon{color:var(--lumo-primary-color);font-size:30px;transform:rotate(40deg);margin-top:10p;display:flex;justify-content:center;align-items:center}.post-upload>vaadin-button>vaadin-icon{font-size:25px}.post-upload>vaadin-button{background:none;color:var(--lumo-contrast-60pct);margin:0;font-size:20px;width:28px;padding:0;height:50px}.post-text-area>textarea:placeholder-shown{position:relative;top:10px}.post-text-area::part(input-field){background:var(--text-field);border-radius:40px;width:300px;border:1px solid var(--lumo-contrast-10pct);position:relative;right:10px;overflow:hidden}.post-upload::part(done-icon),.post-upload[uploading],.post-upload::part(name),.post-upload::part(remove-button){display:none}.post-footer-layout{width:100%;border-top:.5px solid var(--nav-border);padding:5px;align-items:center}.post-header-layout>span{font-weight:700}.post-header-layout{width:100%;justify-content:space-between;align-items:center;padding-right:5px;padding-left:10px}.post-search-icon,.post-header-layout>vaadin-icon:nth-child(1){font-size:20px;color:#fff}/*!
 * animate.css - https://animate.style/
 * Version - 4.1.1
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2020 Animate.css
 */:root{--animate-duration: 1s;--animate-delay: 1s;--animate-repeat: 1}.animate__animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-duration:var(--animate-duration);animation-duration:var(--animate-duration);-webkit-animation-fill-mode:both;animation-fill-mode:both}.animate__animated.animate__infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.animate__animated.animate__repeat-1{-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-iteration-count:var(--animate-repeat);animation-iteration-count:var(--animate-repeat)}.animate__animated.animate__repeat-2{-webkit-animation-iteration-count:2;animation-iteration-count:2;-webkit-animation-iteration-count:calc(var(--animate-repeat) * 2);animation-iteration-count:calc(var(--animate-repeat) * 2)}.animate__animated.animate__repeat-3{-webkit-animation-iteration-count:3;animation-iteration-count:3;-webkit-animation-iteration-count:calc(var(--animate-repeat) * 3);animation-iteration-count:calc(var(--animate-repeat) * 3)}.animate__animated.animate__delay-1s{-webkit-animation-delay:1s;animation-delay:1s;-webkit-animation-delay:var(--animate-delay);animation-delay:var(--animate-delay)}.animate__animated.animate__delay-2s{-webkit-animation-delay:2s;animation-delay:2s;-webkit-animation-delay:calc(var(--animate-delay) * 2);animation-delay:calc(var(--animate-delay) * 2)}.animate__animated.animate__delay-3s{-webkit-animation-delay:3s;animation-delay:3s;-webkit-animation-delay:calc(var(--animate-delay) * 3);animation-delay:calc(var(--animate-delay) * 3)}.animate__animated.animate__delay-4s{-webkit-animation-delay:4s;animation-delay:4s;-webkit-animation-delay:calc(var(--animate-delay) * 4);animation-delay:calc(var(--animate-delay) * 4)}.animate__animated.animate__delay-5s{-webkit-animation-delay:5s;animation-delay:5s;-webkit-animation-delay:calc(var(--animate-delay) * 5);animation-delay:calc(var(--animate-delay) * 5)}.animate__animated.animate__faster{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:calc(var(--animate-duration) / 2);animation-duration:calc(var(--animate-duration) / 2)}.animate__animated.animate__fast{-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-duration:calc(var(--animate-duration) * .8);animation-duration:calc(var(--animate-duration) * .8)}.animate__animated.animate__slow{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-duration:calc(var(--animate-duration) * 2);animation-duration:calc(var(--animate-duration) * 2)}.animate__animated.animate__slower{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-duration:calc(var(--animate-duration) * 3);animation-duration:calc(var(--animate-duration) * 3)}@media print,(prefers-reduced-motion: reduce){.animate__animated{-webkit-animation-duration:1ms!important;animation-duration:1ms!important;-webkit-transition-duration:1ms!important;transition-duration:1ms!important;-webkit-animation-iteration-count:1!important;animation-iteration-count:1!important}.animate__animated[class*=Out]{opacity:0}}@-webkit-keyframes bounce{0%,20%,53%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0) scaleY(1.1);transform:translate3d(0,-30px,0) scaleY(1.1)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0) scaleY(1.05);transform:translate3d(0,-15px,0) scaleY(1.05)}80%{-webkit-transition-timing-function:cubic-bezier(.215,.61,.355,1);transition-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translate3d(0,0,0) scaleY(.95);transform:translateZ(0) scaleY(.95)}90%{-webkit-transform:translate3d(0,-4px,0) scaleY(1.02);transform:translate3d(0,-4px,0) scaleY(1.02)}}@keyframes bounce{0%,20%,53%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0) scaleY(1.1);transform:translate3d(0,-30px,0) scaleY(1.1)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0) scaleY(1.05);transform:translate3d(0,-15px,0) scaleY(1.05)}80%{-webkit-transition-timing-function:cubic-bezier(.215,.61,.355,1);transition-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translate3d(0,0,0) scaleY(.95);transform:translateZ(0) scaleY(.95)}90%{-webkit-transform:translate3d(0,-4px,0) scaleY(1.02);transform:translate3d(0,-4px,0) scaleY(1.02)}}.animate__bounce{-webkit-animation-name:bounce;animation-name:bounce;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}@keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}.animate__flash{-webkit-animation-name:flash;animation-name:flash}@-webkit-keyframes pulse{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes pulse{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.animate__pulse{-webkit-animation-name:pulse;animation-name:pulse;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}@-webkit-keyframes rubberBand{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes rubberBand{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.animate__rubberBand{-webkit-animation-name:rubberBand;animation-name:rubberBand}@-webkit-keyframes shakeX{0%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shakeX{0%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}.animate__shakeX{-webkit-animation-name:shakeX;animation-name:shakeX}@-webkit-keyframes shakeY{0%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}20%,40%,60%,80%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}}@keyframes shakeY{0%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}20%,40%,60%,80%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}}.animate__shakeY{-webkit-animation-name:shakeY;animation-name:shakeY}@-webkit-keyframes headShake{0%{-webkit-transform:translateX(0);transform:translate(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translate(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translate(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translate(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translate(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translate(0)}}@keyframes headShake{0%{-webkit-transform:translateX(0);transform:translate(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translate(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translate(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translate(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translate(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translate(0)}}.animate__headShake{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:headShake;animation-name:headShake}@-webkit-keyframes swing{20%{-webkit-transform:rotate3d(0,0,1,15deg);transform:rotate3d(0,0,1,15deg)}40%{-webkit-transform:rotate3d(0,0,1,-10deg);transform:rotate3d(0,0,1,-10deg)}60%{-webkit-transform:rotate3d(0,0,1,5deg);transform:rotate3d(0,0,1,5deg)}80%{-webkit-transform:rotate3d(0,0,1,-5deg);transform:rotate3d(0,0,1,-5deg)}to{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0)}}@keyframes swing{20%{-webkit-transform:rotate3d(0,0,1,15deg);transform:rotate3d(0,0,1,15deg)}40%{-webkit-transform:rotate3d(0,0,1,-10deg);transform:rotate3d(0,0,1,-10deg)}60%{-webkit-transform:rotate3d(0,0,1,5deg);transform:rotate3d(0,0,1,5deg)}80%{-webkit-transform:rotate3d(0,0,1,-5deg);transform:rotate3d(0,0,1,-5deg)}to{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0)}}.animate__swing{-webkit-transform-origin:top center;transform-origin:top center;-webkit-animation-name:swing;animation-name:swing}@-webkit-keyframes tada{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg);transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes tada{0%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg);transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.animate__tada{-webkit-animation-name:tada;animation-name:tada}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg);transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg);transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg);transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg);transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg);transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg);transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg);transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg);transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__wobble{-webkit-animation-name:wobble;animation-name:wobble}@-webkit-keyframes jello{0%,11.1%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skew(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skew(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skew(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skew(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skew(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skew(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skew(-.1953125deg) skewY(-.1953125deg)}}@keyframes jello{0%,11.1%,to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skew(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skew(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skew(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skew(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skew(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skew(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skew(-.1953125deg) skewY(-.1953125deg)}}.animate__jello{-webkit-animation-name:jello;animation-name:jello;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes heartBeat{0%{-webkit-transform:scale(1);transform:scale(1)}14%{-webkit-transform:scale(1.3);transform:scale(1.3)}28%{-webkit-transform:scale(1);transform:scale(1)}42%{-webkit-transform:scale(1.3);transform:scale(1.3)}70%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes heartBeat{0%{-webkit-transform:scale(1);transform:scale(1)}14%{-webkit-transform:scale(1.3);transform:scale(1.3)}28%{-webkit-transform:scale(1);transform:scale(1)}42%{-webkit-transform:scale(1.3);transform:scale(1.3)}70%{-webkit-transform:scale(1);transform:scale(1)}}.animate__heartBeat{-webkit-animation-name:heartBeat;animation-name:heartBeat;-webkit-animation-duration:1.3s;animation-duration:1.3s;-webkit-animation-duration:calc(var(--animate-duration) * 1.3);animation-duration:calc(var(--animate-duration) * 1.3);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}@-webkit-keyframes backInDown{0%{-webkit-transform:translateY(-1200px) scale(.7);transform:translateY(-1200px) scale(.7);opacity:.7}80%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes backInDown{0%{-webkit-transform:translateY(-1200px) scale(.7);transform:translateY(-1200px) scale(.7);opacity:.7}80%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.animate__backInDown{-webkit-animation-name:backInDown;animation-name:backInDown}@-webkit-keyframes backInLeft{0%{-webkit-transform:translateX(-2000px) scale(.7);transform:translate(-2000px) scale(.7);opacity:.7}80%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes backInLeft{0%{-webkit-transform:translateX(-2000px) scale(.7);transform:translate(-2000px) scale(.7);opacity:.7}80%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.animate__backInLeft{-webkit-animation-name:backInLeft;animation-name:backInLeft}@-webkit-keyframes backInRight{0%{-webkit-transform:translateX(2000px) scale(.7);transform:translate(2000px) scale(.7);opacity:.7}80%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes backInRight{0%{-webkit-transform:translateX(2000px) scale(.7);transform:translate(2000px) scale(.7);opacity:.7}80%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.animate__backInRight{-webkit-animation-name:backInRight;animation-name:backInRight}@-webkit-keyframes backInUp{0%{-webkit-transform:translateY(1200px) scale(.7);transform:translateY(1200px) scale(.7);opacity:.7}80%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes backInUp{0%{-webkit-transform:translateY(1200px) scale(.7);transform:translateY(1200px) scale(.7);opacity:.7}80%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.animate__backInUp{-webkit-animation-name:backInUp;animation-name:backInUp}@-webkit-keyframes backOutDown{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:translateY(700px) scale(.7);transform:translateY(700px) scale(.7);opacity:.7}}@keyframes backOutDown{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:translateY(700px) scale(.7);transform:translateY(700px) scale(.7);opacity:.7}}.animate__backOutDown{-webkit-animation-name:backOutDown;animation-name:backOutDown}@-webkit-keyframes backOutLeft{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:translateX(-2000px) scale(.7);transform:translate(-2000px) scale(.7);opacity:.7}}@keyframes backOutLeft{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:translateX(-2000px) scale(.7);transform:translate(-2000px) scale(.7);opacity:.7}}.animate__backOutLeft{-webkit-animation-name:backOutLeft;animation-name:backOutLeft}@-webkit-keyframes backOutRight{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:translateX(2000px) scale(.7);transform:translate(2000px) scale(.7);opacity:.7}}@keyframes backOutRight{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateX(0px) scale(.7);transform:translate(0) scale(.7);opacity:.7}to{-webkit-transform:translateX(2000px) scale(.7);transform:translate(2000px) scale(.7);opacity:.7}}.animate__backOutRight{-webkit-animation-name:backOutRight;animation-name:backOutRight}@-webkit-keyframes backOutUp{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:translateY(-700px) scale(.7);transform:translateY(-700px) scale(.7);opacity:.7}}@keyframes backOutUp{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}20%{-webkit-transform:translateY(0px) scale(.7);transform:translateY(0) scale(.7);opacity:.7}to{-webkit-transform:translateY(-700px) scale(.7);transform:translateY(-700px) scale(.7);opacity:.7}}.animate__backOutUp{-webkit-animation-name:backOutUp;animation-name:backOutUp}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.animate__bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-duration:calc(var(--animate-duration) * .75);animation-duration:calc(var(--animate-duration) * .75);-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0) scaleY(3);transform:translate3d(0,-3000px,0) scaleY(3)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0) scaleY(.9);transform:translate3d(0,25px,0) scaleY(.9)}75%{-webkit-transform:translate3d(0,-10px,0) scaleY(.95);transform:translate3d(0,-10px,0) scaleY(.95)}90%{-webkit-transform:translate3d(0,5px,0) scaleY(.985);transform:translate3d(0,5px,0) scaleY(.985)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0) scaleY(3);transform:translate3d(0,-3000px,0) scaleY(3)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0) scaleY(.9);transform:translate3d(0,25px,0) scaleY(.9)}75%{-webkit-transform:translate3d(0,-10px,0) scaleY(.95);transform:translate3d(0,-10px,0) scaleY(.95)}90%{-webkit-transform:translate3d(0,5px,0) scaleY(.985);transform:translate3d(0,5px,0) scaleY(.985)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}@-webkit-keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0) scaleX(3);transform:translate3d(-3000px,0,0) scaleX(3)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0) scaleX(1);transform:translate3d(25px,0,0) scaleX(1)}75%{-webkit-transform:translate3d(-10px,0,0) scaleX(.98);transform:translate3d(-10px,0,0) scaleX(.98)}90%{-webkit-transform:translate3d(5px,0,0) scaleX(.995);transform:translate3d(5px,0,0) scaleX(.995)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0) scaleX(3);transform:translate3d(-3000px,0,0) scaleX(3)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0) scaleX(1);transform:translate3d(25px,0,0) scaleX(1)}75%{-webkit-transform:translate3d(-10px,0,0) scaleX(.98);transform:translate3d(-10px,0,0) scaleX(.98)}90%{-webkit-transform:translate3d(5px,0,0) scaleX(.995);transform:translate3d(5px,0,0) scaleX(.995)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__bounceInLeft{-webkit-animation-name:bounceInLeft;animation-name:bounceInLeft}@-webkit-keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0) scaleX(3);transform:translate3d(3000px,0,0) scaleX(3)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0) scaleX(1);transform:translate3d(-25px,0,0) scaleX(1)}75%{-webkit-transform:translate3d(10px,0,0) scaleX(.98);transform:translate3d(10px,0,0) scaleX(.98)}90%{-webkit-transform:translate3d(-5px,0,0) scaleX(.995);transform:translate3d(-5px,0,0) scaleX(.995)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0) scaleX(3);transform:translate3d(3000px,0,0) scaleX(3)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0) scaleX(1);transform:translate3d(-25px,0,0) scaleX(1)}75%{-webkit-transform:translate3d(10px,0,0) scaleX(.98);transform:translate3d(10px,0,0) scaleX(.98)}90%{-webkit-transform:translate3d(-5px,0,0) scaleX(.995);transform:translate3d(-5px,0,0) scaleX(.995)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__bounceInRight{-webkit-animation-name:bounceInRight;animation-name:bounceInRight}@-webkit-keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0) scaleY(5);transform:translate3d(0,3000px,0) scaleY(5)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0) scaleY(.9);transform:translate3d(0,-20px,0) scaleY(.9)}75%{-webkit-transform:translate3d(0,10px,0) scaleY(.95);transform:translate3d(0,10px,0) scaleY(.95)}90%{-webkit-transform:translate3d(0,-5px,0) scaleY(.985);transform:translate3d(0,-5px,0) scaleY(.985)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0) scaleY(5);transform:translate3d(0,3000px,0) scaleY(5)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0) scaleY(.9);transform:translate3d(0,-20px,0) scaleY(.9)}75%{-webkit-transform:translate3d(0,10px,0) scaleY(.95);transform:translate3d(0,10px,0) scaleY(.95)}90%{-webkit-transform:translate3d(0,-5px,0) scaleY(.985);transform:translate3d(0,-5px,0) scaleY(.985)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__bounceInUp{-webkit-animation-name:bounceInUp;animation-name:bounceInUp}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}.animate__bounceOut{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-duration:calc(var(--animate-duration) * .75);animation-duration:calc(var(--animate-duration) * .75);-webkit-animation-name:bounceOut;animation-name:bounceOut}@-webkit-keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0) scaleY(.985);transform:translate3d(0,10px,0) scaleY(.985)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0) scaleY(.9);transform:translate3d(0,-20px,0) scaleY(.9)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0) scaleY(3);transform:translate3d(0,2000px,0) scaleY(3)}}@keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0) scaleY(.985);transform:translate3d(0,10px,0) scaleY(.985)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0) scaleY(.9);transform:translate3d(0,-20px,0) scaleY(.9)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0) scaleY(3);transform:translate3d(0,2000px,0) scaleY(3)}}.animate__bounceOutDown{-webkit-animation-name:bounceOutDown;animation-name:bounceOutDown}@-webkit-keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0) scaleX(.9);transform:translate3d(20px,0,0) scaleX(.9)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0) scaleX(2);transform:translate3d(-2000px,0,0) scaleX(2)}}@keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0) scaleX(.9);transform:translate3d(20px,0,0) scaleX(.9)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0) scaleX(2);transform:translate3d(-2000px,0,0) scaleX(2)}}.animate__bounceOutLeft{-webkit-animation-name:bounceOutLeft;animation-name:bounceOutLeft}@-webkit-keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0) scaleX(.9);transform:translate3d(-20px,0,0) scaleX(.9)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0) scaleX(2);transform:translate3d(2000px,0,0) scaleX(2)}}@keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0) scaleX(.9);transform:translate3d(-20px,0,0) scaleX(.9)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0) scaleX(2);transform:translate3d(2000px,0,0) scaleX(2)}}.animate__bounceOutRight{-webkit-animation-name:bounceOutRight;animation-name:bounceOutRight}@-webkit-keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0) scaleY(.985);transform:translate3d(0,-10px,0) scaleY(.985)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0) scaleY(.9);transform:translate3d(0,20px,0) scaleY(.9)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0) scaleY(3);transform:translate3d(0,-2000px,0) scaleY(3)}}@keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0) scaleY(.985);transform:translate3d(0,-10px,0) scaleY(.985)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0) scaleY(.9);transform:translate3d(0,20px,0) scaleY(.9)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0) scaleY(3);transform:translate3d(0,-2000px,0) scaleY(3)}}.animate__bounceOutUp{-webkit-animation-name:bounceOutUp;animation-name:bounceOutUp}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.animate__fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInDown{-webkit-animation-name:fadeInDown;animation-name:fadeInDown}@-webkit-keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInDownBig{-webkit-animation-name:fadeInDownBig;animation-name:fadeInDownBig}@-webkit-keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInLeft{-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}@-webkit-keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInLeftBig{-webkit-animation-name:fadeInLeftBig;animation-name:fadeInLeftBig}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInRight{-webkit-animation-name:fadeInRight;animation-name:fadeInRight}@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInRightBig{-webkit-animation-name:fadeInRightBig;animation-name:fadeInRightBig}@-webkit-keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInUp{-webkit-animation-name:fadeInUp;animation-name:fadeInUp}@-webkit-keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInUpBig{-webkit-animation-name:fadeInUpBig;animation-name:fadeInUpBig}@-webkit-keyframes fadeInTopLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,-100%,0);transform:translate3d(-100%,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInTopLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,-100%,0);transform:translate3d(-100%,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInTopLeft{-webkit-animation-name:fadeInTopLeft;animation-name:fadeInTopLeft}@-webkit-keyframes fadeInTopRight{0%{opacity:0;-webkit-transform:translate3d(100%,-100%,0);transform:translate3d(100%,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInTopRight{0%{opacity:0;-webkit-transform:translate3d(100%,-100%,0);transform:translate3d(100%,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInTopRight{-webkit-animation-name:fadeInTopRight;animation-name:fadeInTopRight}@-webkit-keyframes fadeInBottomLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,100%,0);transform:translate3d(-100%,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInBottomLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,100%,0);transform:translate3d(-100%,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInBottomLeft{-webkit-animation-name:fadeInBottomLeft;animation-name:fadeInBottomLeft}@-webkit-keyframes fadeInBottomRight{0%{opacity:0;-webkit-transform:translate3d(100%,100%,0);transform:translate3d(100%,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fadeInBottomRight{0%{opacity:0;-webkit-transform:translate3d(100%,100%,0);transform:translate3d(100%,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__fadeInBottomRight{-webkit-animation-name:fadeInBottomRight;animation-name:fadeInBottomRight}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.animate__fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.animate__fadeOutDown{-webkit-animation-name:fadeOutDown;animation-name:fadeOutDown}@-webkit-keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.animate__fadeOutDownBig{-webkit-animation-name:fadeOutDownBig;animation-name:fadeOutDownBig}@-webkit-keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.animate__fadeOutLeft{-webkit-animation-name:fadeOutLeft;animation-name:fadeOutLeft}@-webkit-keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.animate__fadeOutLeftBig{-webkit-animation-name:fadeOutLeftBig;animation-name:fadeOutLeftBig}@-webkit-keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.animate__fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}@-webkit-keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.animate__fadeOutRightBig{-webkit-animation-name:fadeOutRightBig;animation-name:fadeOutRightBig}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.animate__fadeOutUp{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}@-webkit-keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.animate__fadeOutUpBig{-webkit-animation-name:fadeOutUpBig;animation-name:fadeOutUpBig}@-webkit-keyframes fadeOutTopLeft{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(-100%,-100%,0);transform:translate3d(-100%,-100%,0)}}@keyframes fadeOutTopLeft{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(-100%,-100%,0);transform:translate3d(-100%,-100%,0)}}.animate__fadeOutTopLeft{-webkit-animation-name:fadeOutTopLeft;animation-name:fadeOutTopLeft}@-webkit-keyframes fadeOutTopRight{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(100%,-100%,0);transform:translate3d(100%,-100%,0)}}@keyframes fadeOutTopRight{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(100%,-100%,0);transform:translate3d(100%,-100%,0)}}.animate__fadeOutTopRight{-webkit-animation-name:fadeOutTopRight;animation-name:fadeOutTopRight}@-webkit-keyframes fadeOutBottomRight{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(100%,100%,0);transform:translate3d(100%,100%,0)}}@keyframes fadeOutBottomRight{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(100%,100%,0);transform:translate3d(100%,100%,0)}}.animate__fadeOutBottomRight{-webkit-animation-name:fadeOutBottomRight;animation-name:fadeOutBottomRight}@-webkit-keyframes fadeOutBottomLeft{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(-100%,100%,0);transform:translate3d(-100%,100%,0)}}@keyframes fadeOutBottomLeft{0%{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{opacity:0;-webkit-transform:translate3d(-100%,100%,0);transform:translate3d(-100%,100%,0)}}.animate__fadeOutBottomLeft{-webkit-animation-name:fadeOutBottomLeft;animation-name:fadeOutBottomLeft}@-webkit-keyframes flip{0%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);transform:perspective(400px) scaleZ(1) translateZ(0) rotateY(-360deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);transform:perspective(400px) scaleZ(1) translateZ(150px) rotateY(-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);transform:perspective(400px) scaleZ(1) translateZ(150px) rotateY(-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);transform:perspective(400px) scale3d(.95,.95,.95) translateZ(0) rotateY(0);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);transform:perspective(400px) scaleZ(1) translateZ(0) rotateY(0);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes flip{0%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);transform:perspective(400px) scaleZ(1) translateZ(0) rotateY(-360deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);transform:perspective(400px) scaleZ(1) translateZ(150px) rotateY(-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);transform:perspective(400px) scaleZ(1) translateZ(150px) rotateY(-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);transform:perspective(400px) scale3d(.95,.95,.95) translateZ(0) rotateY(0);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);transform:perspective(400px) scaleZ(1) translateZ(0) rotateY(0);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.animate__animated.animate__flip{-webkit-backface-visibility:visible;backface-visibility:visible;-webkit-animation-name:flip;animation-name:flip}@-webkit-keyframes flipInX{0%{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(1,0,0,10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInX{0%{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotateX(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotateX(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(1,0,0,10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.animate__flipInX{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInX;animation-name:flipInX}@-webkit-keyframes flipInY{0%{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotateY(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-20deg);transform:perspective(400px) rotateY(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(0,1,0,10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInY{0%{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotateY(90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-20deg);transform:perspective(400px) rotateY(-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(0,1,0,10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.animate__flipInY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInY;animation-name:flipInY}@-webkit-keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}@keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}.animate__flipOutX{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-duration:calc(var(--animate-duration) * .75);animation-duration:calc(var(--animate-duration) * .75);-webkit-animation-name:flipOutX;animation-name:flipOutX;-webkit-backface-visibility:visible!important;backface-visibility:visible!important}@-webkit-keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}@keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}.animate__flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-duration:calc(var(--animate-duration) * .75);animation-duration:calc(var(--animate-duration) * .75);-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipOutY;animation-name:flipOutY}@-webkit-keyframes lightSpeedInRight{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skew(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skew(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skew(-5deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes lightSpeedInRight{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skew(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skew(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skew(-5deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__lightSpeedInRight{-webkit-animation-name:lightSpeedInRight;animation-name:lightSpeedInRight;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes lightSpeedInLeft{0%{-webkit-transform:translate3d(-100%,0,0) skewX(30deg);transform:translate3d(-100%,0,0) skew(30deg);opacity:0}60%{-webkit-transform:skewX(-20deg);transform:skew(-20deg);opacity:1}80%{-webkit-transform:skewX(5deg);transform:skew(5deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes lightSpeedInLeft{0%{-webkit-transform:translate3d(-100%,0,0) skewX(30deg);transform:translate3d(-100%,0,0) skew(30deg);opacity:0}60%{-webkit-transform:skewX(-20deg);transform:skew(-20deg);opacity:1}80%{-webkit-transform:skewX(5deg);transform:skew(5deg)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__lightSpeedInLeft{-webkit-animation-name:lightSpeedInLeft;animation-name:lightSpeedInLeft;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes lightSpeedOutRight{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skew(30deg);opacity:0}}@keyframes lightSpeedOutRight{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skew(30deg);opacity:0}}.animate__lightSpeedOutRight{-webkit-animation-name:lightSpeedOutRight;animation-name:lightSpeedOutRight;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}@-webkit-keyframes lightSpeedOutLeft{0%{opacity:1}to{-webkit-transform:translate3d(-100%,0,0) skewX(-30deg);transform:translate3d(-100%,0,0) skew(-30deg);opacity:0}}@keyframes lightSpeedOutLeft{0%{opacity:1}to{-webkit-transform:translate3d(-100%,0,0) skewX(-30deg);transform:translate3d(-100%,0,0) skew(-30deg);opacity:0}}.animate__lightSpeedOutLeft{-webkit-animation-name:lightSpeedOutLeft;animation-name:lightSpeedOutLeft;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}@-webkit-keyframes rotateIn{0%{-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes rotateIn{0%{-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}.animate__rotateIn{-webkit-animation-name:rotateIn;animation-name:rotateIn;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes rotateInDownLeft{0%{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes rotateInDownLeft{0%{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}.animate__rotateInDownLeft{-webkit-animation-name:rotateInDownLeft;animation-name:rotateInDownLeft;-webkit-transform-origin:left bottom;transform-origin:left bottom}@-webkit-keyframes rotateInDownRight{0%{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes rotateInDownRight{0%{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}.animate__rotateInDownRight{-webkit-animation-name:rotateInDownRight;animation-name:rotateInDownRight;-webkit-transform-origin:right bottom;transform-origin:right bottom}@-webkit-keyframes rotateInUpLeft{0%{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes rotateInUpLeft{0%{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}.animate__rotateInUpLeft{-webkit-animation-name:rotateInUpLeft;animation-name:rotateInUpLeft;-webkit-transform-origin:left bottom;transform-origin:left bottom}@-webkit-keyframes rotateInUpRight{0%{-webkit-transform:rotate3d(0,0,1,-90deg);transform:rotate3d(0,0,1,-90deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}@keyframes rotateInUpRight{0%{-webkit-transform:rotate3d(0,0,1,-90deg);transform:rotate3d(0,0,1,-90deg);opacity:0}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0);opacity:1}}.animate__rotateInUpRight{-webkit-animation-name:rotateInUpRight;animation-name:rotateInUpRight;-webkit-transform-origin:right bottom;transform-origin:right bottom}@-webkit-keyframes rotateOut{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,200deg);transform:rotate3d(0,0,1,200deg);opacity:0}}@keyframes rotateOut{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,200deg);transform:rotate3d(0,0,1,200deg);opacity:0}}.animate__rotateOut{-webkit-animation-name:rotateOut;animation-name:rotateOut;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes rotateOutDownLeft{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}}@keyframes rotateOutDownLeft{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}}.animate__rotateOutDownLeft{-webkit-animation-name:rotateOutDownLeft;animation-name:rotateOutDownLeft;-webkit-transform-origin:left bottom;transform-origin:left bottom}@-webkit-keyframes rotateOutDownRight{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}@keyframes rotateOutDownRight{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}.animate__rotateOutDownRight{-webkit-animation-name:rotateOutDownRight;animation-name:rotateOutDownRight;-webkit-transform-origin:right bottom;transform-origin:right bottom}@-webkit-keyframes rotateOutUpLeft{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}@keyframes rotateOutUpLeft{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}.animate__rotateOutUpLeft{-webkit-animation-name:rotateOutUpLeft;animation-name:rotateOutUpLeft;-webkit-transform-origin:left bottom;transform-origin:left bottom}@-webkit-keyframes rotateOutUpRight{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg);opacity:0}}@keyframes rotateOutUpRight{0%{opacity:1}to{-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg);opacity:0}}.animate__rotateOutUpRight{-webkit-animation-name:rotateOutUpRight;animation-name:rotateOutUpRight;-webkit-transform-origin:right bottom;transform-origin:right bottom}@-webkit-keyframes hinge{0%{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate3d(0,0,1,80deg);transform:rotate3d(0,0,1,80deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate3d(0,0,1,60deg);transform:rotate3d(0,0,1,60deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}@keyframes hinge{0%{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate3d(0,0,1,80deg);transform:rotate3d(0,0,1,80deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate3d(0,0,1,60deg);transform:rotate3d(0,0,1,60deg);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}.animate__hinge{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-duration:calc(var(--animate-duration) * 2);animation-duration:calc(var(--animate-duration) * 2);-webkit-animation-name:hinge;animation-name:hinge;-webkit-transform-origin:top left;transform-origin:top left}@-webkit-keyframes jackInTheBox{0%{opacity:0;-webkit-transform:scale(.1) rotate(30deg);transform:scale(.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes jackInTheBox{0%{opacity:0;-webkit-transform:scale(.1) rotate(30deg);transform:scale(.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.animate__jackInTheBox{-webkit-animation-name:jackInTheBox;animation-name:jackInTheBox}@-webkit-keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg);transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg);transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__rollIn{-webkit-animation-name:rollIn;animation-name:rollIn}@-webkit-keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg);transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}@keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg);transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}.animate__rollOut{-webkit-animation-name:rollOut;animation-name:rollOut}@-webkit-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.animate__zoomIn{-webkit-animation-name:zoomIn;animation-name:zoomIn}@-webkit-keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomInDown{-webkit-animation-name:zoomInDown;animation-name:zoomInDown}@-webkit-keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomInLeft{-webkit-animation-name:zoomInLeft;animation-name:zoomInLeft}@-webkit-keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomInRight{-webkit-animation-name:zoomInRight;animation-name:zoomInRight}@-webkit-keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomInUp{-webkit-animation-name:zoomInUp;animation-name:zoomInUp}@-webkit-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}@keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}to{opacity:0}}.animate__zoomOut{-webkit-animation-name:zoomOut;animation-name:zoomOut}@-webkit-keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomOutDown{-webkit-animation-name:zoomOutDown;animation-name:zoomOutDown;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0)}}@keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0)}}.animate__zoomOutLeft{-webkit-animation-name:zoomOutLeft;animation-name:zoomOutLeft;-webkit-transform-origin:left center;transform-origin:left center}@-webkit-keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0)}}@keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0)}}.animate__zoomOutRight{-webkit-animation-name:zoomOutRight;animation-name:zoomOutRight;-webkit-transform-origin:right center;transform-origin:right center}@-webkit-keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.animate__zoomOutUp{-webkit-animation-name:zoomOutUp;animation-name:zoomOutUp;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__slideInDown{-webkit-animation-name:slideInDown;animation-name:slideInDown}@-webkit-keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft}@-webkit-keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__slideInRight{-webkit-animation-name:slideInRight;animation-name:slideInRight}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.animate__slideInUp{-webkit-animation-name:slideInUp;animation-name:slideInUp}@-webkit-keyframes slideOutDown{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes slideOutDown{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.animate__slideOutDown{-webkit-animation-name:slideOutDown;animation-name:slideOutDown}@-webkit-keyframes slideOutLeft{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes slideOutLeft{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.animate__slideOutLeft{-webkit-animation-name:slideOutLeft;animation-name:slideOutLeft}@-webkit-keyframes slideOutRight{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes slideOutRight{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.animate__slideOutRight{-webkit-animation-name:slideOutRight;animation-name:slideOutRight}@-webkit-keyframes slideOutUp{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes slideOutUp{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.animate__slideOutUp{-webkit-animation-name:slideOutUp;animation-name:slideOutUp}.story-view-header-layout{position:fixed;top:0;width:100%;height:60px;justify-content:center;margin-top:10px;padding:0}.story-display-video>vaadin-icon{display:none}.story-display-video{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;background:transparent;border:none}.story-app-layout>vaadin-form-layout{overflow:hidden}.story-edit-content-text{position:fixed;bottom:70px;filter:drop-shadow(.5px .5px .5px black);text-align:center;word-wrap:break-word;-webkit-user-select:none;user-select:none;color:#fff}.edit-story-add-text-layout>vaadin-button{margin-left:75px;background:var(--lumo-primary-color);color:#fff;border-radius:30px}.edit-story-add-text-layout{position:fixed;left:3px;top:320px;align-items:center}.container{height:100px;width:100px}.story-share-button:hover>.edit-story-field::part(input-field){background:transparent}.edit-story-field>input:placeholder-shown{color:#fff;margin-left:5px}.edit-story-field-value::part(input-field){background:none;border:none}.edit-story-field::part(input-field){background:var(--lumo-shade-50pct);border:.5px solid gray}.edit-story-field::part(input-field),.edit-story-field-value::part(input-field){color:#fff;height:50px;width:280px;border-radius:30px;padding-left:5px}.edit-story-buttons-layout{position:fixed;right:0;top:50px;background:gree;max-width:80px}.story-setting-icon::part(label){font-size:13px;font-weight:700}.story-setting-icon>vaadin-icon{font-size:23px}.story-setting-icon{all:unset;display:flex;flex-direction:column;position:fixed;bottom:15px;left:10px;color:#fff;background:transparent;max-width:100px;height:40px;border-radius:7px}.story-share-button>vaadin-icon{font-size:17px;transform:rotate(45deg)}.story-share-button{bottom:5px;right:15px;color:#fff;background:var(--lumo-primary-color);border-radius:7px;align-items:center;justify-content:center;font-weight:700;margin-bottom:10px;max-width:120px;height:38px;position:fixed;font-size:13px}.story-text-button{color:#fff;background:#000;background:var(--lumo-contrast-10pct);border-radius:50%;max-width:45px;font-size:30px;padding:13px}.with-border1{position:absolute;top:200px}.with-border{top:100px;position:absolute;-webkit-user-select:none;user-select:none}.v-dragged.card{outline:1px dotted hotpink;opacity:.5;background:green}.story-edit-text{position:absolute;cursor:move}.story-edit-video{width:100%;height:100%}.story-edit-image{display:none;pointer-events:none;max-height:701px;object-fit:cove}.story-edit-image,.story-edit-video{object-fit:cove;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.story-edit-close-icon{position:fixed;right:140px;top:10px;filter:drop-shadow(.5px .5px .5px black);font-size:30px;color:#fff}.story-previous-images{height:185px;border-radius:10px}.previous-main-layout span{position:absolute;top:662px;font-weight:700;color:var(--lumo-primary-text-color);font-size:14px}.story-upload-image-layout{width:100%;justify-content:center}.previous-main-layout{display:flex;justify-content:center;align-items:center;width:100%;height:100%;margin:0;overflow-x:hidden}.previous-row-layout{padding-top:2px;margin:0}.previous-images{width:160px;height:185px;object-fit:cover;border-radius:10px;pointer-events:none}.story-previous-layout{width:100%}.story-previous-layout{color:#fff;padding-left:10px;margin-top:5p}.story-header-text{margin-right:30px;width:100%;text-align:center;font-size:23px}.story-main-text-button{position:relative;right:4px;background:linear-gradient(var(--lumo-contrast-10pct),var(--lumo-contrast-20pct))}.story-upload-button{position:relative;left:4px;background:linear-gradient(var(--lumo-success-color),var(--lumo-success-text-color))}.upload-multi-button,.story-upload-button,.story-main-text-button{color:#fff;border-radius:10px;width:105px;height:150px}.story-app-layout vaadin-form-layout{background:var(--lumo-contrast-10pct);height:100%;width:100%;overflow-y:hidden}.upload-multi-button::part(label),.story-upload-button::part(label),.story-main-text-button::part(label){font-weight:700;margin-top:70px}.upload-multi-button>vaadin-icon,.story-upload-button>vaadin-icon,.story-main-text-button>vaadin-icon{padding:12px;position:absolute;left:27px;bottom:65px;color:#000;background:#fff;font-size:32px;border-radius:50%}.upload-multi-button{background:linear-gradient(var(--lumo-primary-color),var(--lumo-primary-text-color))}.story-multi-upload vaadin-upload-file::part(remove-button),.story-multi-upload vaadin-upload-file::part(done-icon),.story-multi-upload vaadin-upload-file::part(meta){display:none}.story-multi-upload vaadin-upload-file[uploading]{display:none}.story-image,.story-image2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:603px;object-fit:cove}.story-header-text{color:#fff;font-weight:700}.story-display-image{pointer-events:none;object-fit:;margin-top:200p}.story-reacted-like,.story-reacted-heart,.story-reacted-happy{padding:5px;border-radius:50%;color:#fff}.story-reacted-like{background:var(--lumo-primary-color)}.story-reacted-heart{background:var(--lumo-error-color)}.story-reacted-happy{background:var(--lumo-warning-color)}.story-icons-layout>vaadin-icon{font-size:15px}.story-icons-layout{position:fixed;bottom:590px;left:15px}.story-content{background:#000;color:#fff}vaadin-button.story-display-eye-icon>vaadin-icon{font-size:25px;filter:drop-shadow(1px 1px 1px black)}vaadin-button.story-display-eye-icon{color:var(--lumo-primary-color);background:transparent;width:100%;border-radius:0;margin:}.story-display-text-layout{position:fixed;bottom:0;margin-bottom:57px;background:transparent;display:flex;align-items:center;justify-content:center;word-wrap:break-word;max-hieght:100px;padding:0;width:100%}.story-progress-layout{padding-left:15px;padding-right:15px;position:absolute;margin:0}vaadin-progress-bar.story-progress-inactive::part(bar){height:1px;margin:0}vaadin-progress-bar.story-progress-active::part(value){background:#fff;height:1px}.swipe-animation{animation:swipe .3s ease}@keyframes swipe{0%{transform:translate(100%);opacity:0}to{transform:translate(0);opacity:1}}vaadin-icon.story-angle-left-icon{position:fixed;top:300px;left:20px;font-size:30px;padding:5px;background:var(--lumo-shade-80pct);border-radius:50%;border:1px solid var(--lumo-contrast-60pct);color:#fff}vaadin-icon.story-angle-right-icon{position:fixed;top:300px;right:20px;font-size:30px;padding:5px;background:var(--lumo-shade-80pct);border-radius:50%;border:1px solid var(--lumo-contrast-60pct);color:#fff}.story-image-layout{display:flex;align-items:center;justify-content:center}.story-happy-icon,.story-heart-icon,.story-like-icon{font-size:30px;padding:10px;margin-bottom:10px;margin-top:10px;border-radius:50%;animation:pulse 1s infinite;color:#fff}.story-happy-icon{background:var(--lumo-warning-color)}.story-heart-icon{background:var(--lumo-error-color);border-radius:50%;margin-left:40px;margin-right:40px}.story-like-icon{background:var(--lumo-primary-color)}.story-footer-layout{position:fixed;bottom:0;display:flex;justify-content:space-between;width:270px}vaadin-app-layout.story-display-layout[overlay]{background:#000}.story-display-close-icon{margin-right:15px;margin-top:10px;filter:drop-shadow(.5px .5px .5px black);color:#fff;font-size:30px}.story-display-layout2{padding:0;margin-top:0;-webkit-user-select:none;user-select:none}vaadin-app-layout.story-display-layout::part(navbar){background:#000;-webkit-user-select:none;user-select:none}.story-hours-ago{font-size:12px;position:relative;bottom:7px;text-shadow:.5px .5px .5px black}.story-display-name{word-wrap:break-word;color:#fff;font-weight:700;text-shadow:1px 1px 1px black;position:relative;top:10px}vaadin-avatar.story-display-avatar{height:40px;width:40px;margin-left:10px;margin-top:10px;border:1px solid gray;pointer-events:none}.story-own-numbers{position:relative;bottom:200px;height:50px;padding:5px;margin-left:7px;font-size:11px;font-weight:700;margin-left:;background:var(--lumo-primary-color);border-radius:5px}.story-own-name{position:relative;bottom:60px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;text-shadow:1px 1px 1px black}.story-own-user-image{width:110px;height:198px;border-radius:15px;pointer-events:none;object-fit:cover}.story-own-feed{margin:8px 0 0;padding:0;border:1px solid var(--lumo-contrast-20pct);margin-bottom:px;border-radius:15px;height:198px;max-width:110px}.happening-create-text{color:#fff;font-weight:700;font-size:11px;position:relative;bottom:8px}vaadin-text-field.story-field>input{border-radius:20px}vaadin-button.story-eye-icon vaadin-icon{font-size:25px}vaadin-button.story-eye-icon{color:var(--lumo-primary-text-color);background:none}.story-text-layout{position:fixed;bottom:57px;padding:0;margin:0;background:#000;display:flex;align-items:center;justify-content:center;border-top:.5px solid gray}.story-text{color:#fff;background:#000;margin-left:5px;margin-bottom:5px;display:flex;align-items:center;justify-content:center}.story-done-text{color:#fff;font-weight:700;font-size:11px;position:fixed;bottom:416px;left:309px;background:var(--lumo-primary-color);border-radius:20px;width:46px;height:30px;display:flex;align-items:center;justify-content:center}.story-div{overflow:hidden}vaadin-text-field.story-field>input:placeholder-shown{margin-left:5px;color:#fff}vaadin-text-field.story-field::part(input-field){background:var(--lumo-shade-80pct);height:50px;border-radius:25px;width:300px;color:#fff;word-wrap:break-word}vaadin-text-field.story-field{position:fixed;bottom:400px;left:5px}.story-image2{pointer-events:none}.story-image{pointer-events:none;overflow:hidden}.story-header-layout{display:flex;align-items:center;justify-content:space-betwee;width:100%}vaadin-button.story-discard-button{margin-left:110px;color:#fff;background:var(--lumo-error-color);border-radius:30px;font-weight:700}.story-upload vaadin-upload-file[uploading]{display:none}vaadin-icon.story-close-icon{margin-left:20px;color:#fff}vaadin-app-layout.story-app-layout[overlay]{background:#000}vaadin-app-layout.story-app-layout::part(navbar){background:var(--lumo-contrast-10pct)}.happening-numbers{position:relative;bottom:200px;padding:5px;font-size:11px;font-weight:700;margin-left:7px;background:var(--lumo-primary-color);border-radius:5px}.happening-name{position:relative;bottom:60px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;text-shadow:1px 1px 1px black}.happening-user-image{width:110px;height:197px;border-radius:15px;pointer-events:none;position:relative;object-fit:cover}.happenings-feed{margin:8px 0;padding:0;border:1px solid var(--lumo-contrast-20pct);border-radius:15px;max-height:197px;max-width:110px}.main-happening-layout{margin-bottom:8p;padding:0;background:#000;background:var(--primary);border-bottom:.5px solid var(--lumo-contrast-20pct);overflow-x:auto;overflow-y:hidden}.happening-profile-layout{position:relative;display:flex;align-items:center;justify-content:center;border:1px solid var(--lumo-contrast-20pct);border-radius:15px;padding:0;margin-left:8px;margin-top:8px;margin-bottom:8px;max-width:112px;max-height:200px}vaadin-icon.happening-add-icon{width:25px;height:25px;display:flex;color:#fff;padding:3px;position:relative;bottom:25px;background:var(--lumo-primary-color);border-radius:50%;border:1px solid white}.happening-profile-image{height:123px;width:110px;object-fit:cover;border-radius:15px 15px 0 0;pointer-events:none}.search-people-name{color:#fff;font-weight:700;margin-left:10px;margin-right:10px;font-size:14px;position:relative;bottom:15px}.search-people-see-all-button{width:330px;height:33px;color:#fff;background:var(--button-contrast-color);border-radius:5px;font-weight:700}.search-people-buttons-layout{position:relative;display:flex;margin-bottom:5px}.search-people-buttons-layout>vaadin-button:nth-child(2){background:var(--lumo-contrast-10pct);width:90px}vaadin-button.search-unfollow-button{background:var(--button-contrast-color)}vaadin-button.search-follow-button{background:var(--lumo-primary-color)}.search-people-buttons-layout>vaadin-button:nth-child(1){width:105px}.search-people-buttons-layout>vaadin-button:nth-child(1),.search-people-buttons-layout>vaadin-button:nth-child(2){color:#fff;height:35px;border-radius:5px;font-weight:700;font-size:15px}.search-people-header-text{color:#fff;font-weight:700;position:relative;top:10px;left:-80px}.search-layout{margin-left:15px}.search-history-layout{padding:0}.search-people-main-layout{padding:0;align-items:center}.search-people-child-layout:nth-child(1){margin-left:15px}.search-people-child-layout{padding:0;margin:0;height:365px;width:200px;border:.5px solid var(--lumo-contrast-20pct);border-radius:10px;align-items:center;justify-content:space-between}.search-people-parent-layout{overflow:auto;width:100%;padding:0}.search-people-image{width:230px;height:230px;border-radius:10px 10px 0 0;object-fit:cover;pointer-events:none}.search-remove-x-layout{padding:0;position:relative;right:10px;height:40px;bottom:;width:100%}.search-remove-div{align-items:center;height:100;text-align:center;margin-left:10px}.search-dialog-header-layout{align-items:center;font-size:15px;margin-left:15px;margin-top:20px;color:#fff;background:var(--primary)}vaadin-tool-tip{margin-bottom:100px}.search-history-followers-text{position:relative;bottom:18px}vaadin-button.search-history-unfollow-button,vaadin-button.search-history-follow-button{margin:0;color:#fff;font-weight:700;border-radius:8px}.search-history-middle-layout{padding:0;height:83px}.search-delete-dialog::part(overlay){background:#000}.search-delete-dialog::part(content){padding:0;height:175px;background:var(--lumo-contrast-20pct)}.searc-delete-header-layout{padding:}.search-delete-text{position:relative;bottom:10px;color:var(--lumo-contrast-70pct)}.search-delete-footer>vaadin-button:nth-child(1){background:var(--lumo-contrast-10pct)}.search-delete-footer>vaadin-button:nth-child(2){background:var(--lumo-primary-color)}.search-delete-footer{position:relative;bottom:10px;top:10p;width:100%;height:100p;justify-content:center}.search-delete-footer>vaadin-button:nth-child(1),.search-delete-footer>vaadin-button:nth-child(2){color:#fff;font-weight:700;width:135px;height:37px;border-radius:7px}.search-delete-header{color:#fff;font-weight:700;font-size:16px}vaadin-button.search-history-unfollow-button,vaadin-button.search-history-follow-button{position:absolute;top:45px;width:252px}.search-history-main-layout{padding:0;background:var(--primary);overflow-x:auto;height:100%}.search-history-layout-1{align-items:center;justify-content:space-between;padding:0;position:relative;width:100%}.search-dialog-header-name{position:relative;right:7px}.search-poke-text{position:relative;right:10px}.search-line-div{background:var(--lumo-contrast-20pct);height:1px;margin:20px 10px}.search-poke-icon{color:#fff;background:var(--lumo-contrast-10pct);padding:10px;border-radius:50%;height:44px;width:44px}.search-poke-layout{align-items:center;height:100%;text-align:center;margin-left:10px;margin-top:20px;margin-bottom:20px;width:310px}.search-header-avatar{border:.5px solid var(--lumo-contrast-30pct);pointer-events:none}.search-delete-helper-text{font-size:11px;position:relative;bottom:20px}.search-remove-text,.search-poke-text{color:#fff;font-weight:700;font-size:15px}.search-remove-icon{color:#fff;background:var(--lumo-contrast-10pct);padding:10px;border-radius:50%;height:43px;width:50px}.search-dialog::part(overlay){position:absolute;top:465px;background:#000;border-radius:25px 25px 0 0;-webkit-user-select:none;user-select:none}.search-dialog::part(content){background:var(--lumo-contrast-20pct);width:328px;height:auto;padding:20px 0}.loading-span{margin-top:10px;margin-left:10px;color:#fff}.dots:after{content:"";animation:dots 2s infinite}.dots{position:relative;bottom:3px}vaadin-button.search-history-unfollow-button{background:var(--button-contrast-color)}vaadin-button.search-history-follow-button{background:var(--lumo-primary-color)}.search-history-avatar{margin-left:5px;border:.5px solid var(--lumo-contrast-30pct);pointer-events:none}.search-history-name{color:#fff;width:100%}.search-history-followers-text{font-size:11px;margin:0;width:100%}.search-history-cross-icon{color:var(--lumo-contrast-50pct);font-size:25px;margin-right:10px}.search-history-text{color:#fff;font-weight:700}.search-history-clear-text{color:#35abf0;margin-right:15p}.search-parent-header{align-items:center;width:100%;padding:0}.search-child-header{justify-content:space-between;width:330px;position:relative;right:10px}.search-no-searches-found{text-align:center;width:100%}.search-recent-text{margin-top:10px;margin-left:10px}.search-layout{align-items:center}.search-name{width:245px;font-size:15px}.search-more-icon{position:absolut;right:0;margin-right:20p;font-size:12px;color:var(--lumo-contrast-70pct)}.search-history-layout{width:100%;padding-top:2px;padding-bottom:5px;overflow-x:auto;margin:0}vaadin-avatar.search-avatar{border:.5px solid var(--lumo-contrast-30pct)}.search-recent-text{color:#fff;font-weight:700}.search-main-layout{height:100%;background:var(--primary);padding:0}.search-header-layout{justify-content:space-between;width:100%;padding:0}.search-see-all-text{color:#35abf0;margin-top:10px;margin-right:10px}.search-icon-1{font-size:25px;color:var(--lumo-primary-contrast-color);position:relative;left:40px}.search-header-layout-1{align-items:center;padding:0;margin:0;background:var(--primary);height:100%;width:100%}vaadin-text-field.search-text-field-1::part(input-field){border-radius:30px;width:250px;position:relative;right:10px}.chat-unblock-layout>span:nth-child(1){margin-top:6px}.chat-unblock-layout>span:nth-child(2){color:var(--secondary)}.chat-unblock-layout>vaadin-button{color:#fff;text-shadow:.5px .5px white;width:345px;margin-bottom:8px;background:var(--button-contrast-color);font-size:15px}.chat-unblock-layout{display:flex;flex-direction:column;align-items:center;width:100%;border-top:.5px solid var(--nav-border);font-size:14px;color:#fff;margin-left:8px;margin-right:8px}.chat-message-span>span{align-self:flex-start;background:var(--lumo-contrast-5pct);border-radius:15px;padding:10px 15px;display:flex;justify-content:center;position:relativ;bottom:10px;font-size:15px;max-width:230px;color:#fff;margin-bottom:3px}.chat-message-span{display:flex;flex-direction:column}.chat-message-span>span:last-child{position:relative;bottom:13px;color:#fff!important;background:var(--button-contrast-color);border-radius:50%;width:0;height:7px;display:flex;align-items:center;padding-top:10px!important;border:1px solid var(--primary);margin:0}.outgoing-reaction{position:relative;right:15px;bottom:14px;color:#fff!important;background:var(--button-contrast-color);border-radius:50%;width:23px;height:24px;display:flex;align-items:center;padding-right:4px;padding-top:1px;border:1px solid var(--primary)}.chat-message-list{all:unset;display:flex;flex-direction:column}.chat-message-list>span,.chat-message-list>div>div>span:last-child{width:350px;display:flex;justify-content:end;align-items:flex-end;color:var(--secondary);font-size:12px}.chat-status-avatar{width:20px;height:20px}.chat-emojis>span{margin:0;background:green}.chat-emojis-div{display:flex;flex-direction:row;justify-content:space-evenly;font-size:32px;width:100%}.incoming-message>span{background:var(--lumo-contrast-1pct)!important;border-radius:20px!important;padding-bottom:10px!important;padding-top:10px !importan;padding-left:10px !importan;padding-right:10px !importan;bottom:10px;font-size:15px!important;max-width:230px!important;display:flex;flex-direction:row}.incoming-message>span{color:#fff!important}.outgoing-message>span:last-child{display:flex;justify-content:en}. chat-message-list .message{padding:10p;border-radius:10px;margin-bottom:10px;max-width:60%;color:#fff}.incoming-message>vaadin-avatar{width:25px;height:25px;margin-right:5px;display:fle;pointer-events:none;margin-left:10px}.incoming-message{display:flex;color:#fff;align-items:center;flex-direction:row}.incoming-message>span{align-self:flex-start;background:var(--primary);border-radius:15px;padding:10px 15px;display:flex;justify-content:center;position:relativ;bottom:10px;font-size:15px;max-width:230px;color:#fff;margin-top:5px}.outgoing-message{display:flex;flex-direction:column;color:#fff!important;align-self:flex-en;align-items:flex-end;width:100%}.outgoing-message>span{background:var(--lumo-primary-color);border-radius:20px;padding:10px;bottom:10px;font-size:15px;max-width:230px;color:#fff;margin-right:10px;margin-bottom:5px}.message-timestamp-group{font-size:10px!important;color:var(--secondary)!important;width:100%;margin-top:15px;margin-bottom:15px;justify-content:center!important}.chat-layout{height:100%;overflow-y:auto;justify-content:end}.chat-message-list::-webkit-scrollbar{display:none}.chat-message-list{word-wrap:break-word;overflow-y:auto;width:100%;height:100%;behavior:smooth}.chat-message-list>div>div>span:last-child{margin-right:10px}.chat-message-list>div>span:last-child{font-size:14px;color:var(--lumo-contrast-50pct)}.chat-message-list>div>span:first-child,.chat-message-list>div>span:last-child{background:var(--lumo-primary-color);border-radius:15px;padding:10px;bottom:10px;font-size:15px;max-width:230px;color:#fff;margin-right:10px;margin-bottom:3px}.chat-footer-layout>div>vaadin-text-field{width:160px}.chat-footer-layout>div>vaadin-text-field::part(input-field){position:relative;border-radius:30px;right:10px}.chat-footer-layout>div:nth-child(1)>vaadin-icon:first-child,.chat-footer-layout>div:nth-child(1)>vaadin-icon:last-child{font-size:13px}.chat-footer-layout>div:nth-child(1)>vaadin-icon:nth-child(1),.chat-footer-layout>div:nth-child(1)>vaadin-icon:nth-child(2),.chat-footer-layout>div:nth-child(1)>vaadin-icon:nth-child(3){margin-right:15px}.chat-footer-layout>div>vaadin-icon{font-size:15px}.chat-footer-layout>div:nth-child(2)>vaadin-icon:last-child{position:relative;right:35px;bottom:30px;transform:rotate(45deg)}.chat-footer-layout>div:nth-child(1)>vaadin-icon:first-child{margin-left:15px}.chat-footer-layout>div{display:flex;flex-direction:row;align-items:center}.chat-footer-layout{width:100%;display:flex;align-items:center;color:var(--lumo-primary-color);border-top:.5px solid var(--nav-border);padding-top:5px}.chat-header-layout>div:nth-child(1) div>span:last-child{font-size:12px;color:var(--lumo-contrast-60pct)}.chat-header-layout>div:nth-child(1) div{display:flex;flex-direction:column}.chat-header-layout>div:nth-child(1) div>span{margin-left:10px;font-size:15px;text-shadow:.5px .5px white}.chat-header-layout>div:nth-child(1){width:240px}.chat-header-layout>div:nth-child(1)>vaadin-avatar{margin-left:5px}.chat-header-layout>div:nth-child(2)>vaadin-icon:last-child{font-size:13px;transform:rotate(180deg);margin-right:15px;margin-left:5px;font-size:15px}.chat-header-layout>div:nth-child(2)>vaadin-icon{font-size:20px;margin-right:10p}.chat-header-layout>div:nth-child(1)>vaadin-icon:first-child{font-size:23px;margin-left:10px}.chat-header-layout>div:nth-child(1){display:flex;flex-direction:row;align-items:center}.chat-header-layout{width:100%;display:flex;align-items:center;color:#fff}.chat-header-layout{justify-content:space-between}.chat-app-layout[overlay],.chat-app-layout::part(navbar){background:var(--primary)}.message-delivery-line1{margin-top:0!important;margin-bottom:20px}.privacysafety-information>span:last-child{color:var(--primary-text-color);margin:0;padding:3px}.privacysafety-information>span:first-child{color:var(--secondary)}.privacysafety-information{font-size:12px}.privacysafety-main-layout{height:100%;overflow-x:auto;padding-left:10px;padding-right:10px}.privacysafety-main-layout::-webkit-scrollbar{display:none}.privacysafety-line{margin-top:10px;padding:0!important;height:.5px;background:var(--nav-border)}.privacysafety-main-div{margin-top:20px;padding-left:10p;padding-right:10p}.privacysafety-main-div>span{font-size:13px;text-shadow:.5px .5px white;margin-bottom:2px}.privacysafety-main-div>div>div>span:last-child{font-size:12px;color:var(--block-text-color)}.privacysafety-main-div>div{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-top:2px;padding-top:2px;padding-bottom:10px;padding-right:5px}.privacysafety-main-div>div>div{display:flex;flex-direction:column}.privacysafety-main-div{display:flex;flex-direction:column}.read-receipts-main-layout>span{color:var(--block-text-color);font-size:12px;margin-left:10px;margin-right:15px}.read-receipts-main-layout>div{margin:20px 15px 10px 10px}.read-receipts-main-layout>div>div{display:flex;justify-content:space-between;width:100%}.read-receipts-main-layout{display:flex;flex-direction:column}.request-settings-privacy-and-support>div:nth-child(4)>div>span:last-child{font-size:11px;color:var(--block-text-color)}.request-settings-privacy-and-support>div:nth-child(4)>div{display:flex;flex-direction:column}.request-settings-privacy-and-support>div:nth-child(2)>span:last-child{margin-right:15px;color:var(--block-text-color)}.request-settings-privacy-and-support>div:nth-child(2){display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%}.request-settings-actions>div>vaadin-icon,.request-settings-privacy-and-support>div>vaadin-icon,.request-settings-privacy-and-support>div>div>vaadin-icon{background:var(--button-contrast-color);padding:8px;border-radius:50%;font-size:23px;margin-right:10px;margin-left:15px}.request-settings-privacy-and-support>div:nth-child(2){margin-top:10px}.request-settings-actions>div,.request-settings-privacy-and-support>div{display:flex;flex-direction:row;align-items:center;padding-top:7px;padding-bottom:7px}.request-settings-actions>span,.request-settings-privacy-and-support>span{font-size:13px;margin-left:15px}.request-settings-actions>div{display:flex;flex-direction:row;align-items:center;margin-top:10px}.request-settings-avatar-name>span{font-weight:700;font-size:23px;color:#fff}.request-settings-avatar-name>vaadin-avatar{width:90px;height:90px}.request-settings-avatar-name{display:flex;flex-direction:column;width:100%;align-items:center}.request-settings-main-layout::-webkit-scrollbar{display:none}.request-settings-main-layout{height:100%;overflow-y:auto}.request-settings-actions>div:active,.request-settings-privacy-and-support>div:active,.privacysafety-main-div>div:active,.privacysafety-information>span:last-child:active{background:var(--hover-color)}.block-on-tagbook-buttons-div>vaadin-button:last-child{margin-bottom:15px}.block-on-tagbook-buttons-div>vaadin-button{width:100%;color:#fff;text-shadow:.5px .5px white;border-radius:8px;height:42px}.block-on-tagbook-buttons-div{display:flex;flex-direction:column;width:100%;padding-left:10px;padding-right:10px}.block-on-tagbook-main-div>div>span:nth-child(2){font-size:16px;color:var(--block-text-color)}.block-on-tagbook-main-div>div>span:nth-child(1){color:var(--lumo-contrast-20pct);font-size:11px;margin-right:5px}.block-on-tagbook-main-div>span:nth-child(1){margin-top:10px;margin-bottom:8px}.block-on-tagbook-main-div>span:nth-child(2){color:var(--block-text-color)}.block-on-tagbook-main-div>div{display:flex;flex-direction:row;align-items:center;margin-bottom:8px}.block-on-tagbook-main-div{display:flex;flex-direction:column}.block-on-tagbook-main-layout{padding-left:20px;padding-right:20px}.block-main-layout{overflow:hidden}.block-dialog>div{display:flex;flex-direction:row;align-self:end}.block-dialog>div>vaadin-button:nth-child(2){color:var(--lumo-primary-color)}.block-dialog>div>vaadin-button{color:#fff;background:none;margin:0;font-size:15px;position:relative;top:15px}.block-dialog>span:nth-child(1){margin-bottom:5px;font-size:18px;text-shadow:.5px .5px white}.block-dialog::part(overlay){border-radius:3px;height:auto;width:310px;word-wrap:break-word}.block-dialog::part(content){display:flex;flex-direction:column;color:#fff;justify-content:center;background:#424242;padding-top:15px;overflow-y:auto}.block-list>div{display:flex;flex-direction:row;align-items:center;margin-left:15px}.block-list>div>span:nth-child(1){color:var(--lumo-contrast-20pct);margin-right:5px}.block-list>div>span{font-size:11px;color:var(--block-text-color);margin-right:5px}.block-section>div>vaadin-icon{background:var(--button-contrast-color);padding:9px;font-size:23px;border-radius:50%}.block-section>div>span{color:var(--block-error-color)}.block-section>div{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1px 10px;margin-bottom:8px;margin-top:12px}.block-section{border-bottom:.5px solid var(--nav-border);padding-bottom:5px}.block-section>div:active{background:var(--hover-color)}.friends-of-friends-main-layout vaadin-radio-group>label{color:#fff;text-shadow:.5px .5px white;font-size:13px}.friends-of-friends-main-layout vaadin-radio-button:active{background:var(--hover-color)}.friends-of-friends-main-layout vaadin-radio-button{width:100%;padding-top:7px;padding-bottom:7px}.friends-of-friends-main-layout vaadin-radio-group{margin-top:10px;width:100%}.friends-of-friends-main-layout vaadin-radio-button>label{margin-bottom:15p}.friends-of-friends-main-layout{padding-left:18px;padding-right:18px}.friends-of-friends-main-layout>div>vaadin-radio-button{color:var(--primary)!important}.friends-of-friends-main-layout vaadin-radio-group[has-value]>vaadin-radio-button::part(radio):after{border:4.5px solid white}.friends-of-friends-main-layout vaadin-radio-button::part(radio){border:1.5px solid white!important;background:none!important;font-size:15px;padding-left:0!important;margin-left:20px;width:13px;height:13px}.block-an-account-header-layout>vaadin-text-field>input:placeholder-shown,.block-an-account-header-layout>vaadin-text-field>[slot=prefix]{color:var(--secondary)}.block-an-account-header-layout>vaadin-text-field::part(input-field){border-radius:30px;background:var(--text-field)}.block-an-account-header-layout>vaadin-text-field{margin:2px 10px 0}.block-an-account-header-layout>div:first-child{padding-top:10px;border-bottom:.5px solid var(--nav-border)}.block-an-account-header-layout{width:100%;display:flex;flex-direction:column;color:#fff;text-shadow:.5px .5px white}.blocked-accounts-div vaadin-avatar{border:.5px solid var(--secondary)}.blocked-accounts-div>div>div>span:first-child{position:relative;top:3px}.blocked-accounts-div>div>div>span:last-child{position:relative;color:var(--secondary);bottom:3px}.blocked-accounts-div>div{display:flex;flex-direction:row;align-items:center}.blocked-accounts-div>div>div{display:flex;flex-direction:column;margin-left:10px}.blocked-accounts-div vaadin-button{background:var(--lumo-primary-color);color:#fff;text-shadow:.5px .5px white;width:80px;height:35px;padding:0}.blocked-accounts-div{display:flex;flex-direction:row;padding:10px 15px 0 10px;align-items:center;justify-content:space-between}.blocked-accounts-header-layout{width:100%;align-items:center;justify-content:space-between;color:#fff;text-shadow:.5px .5px white;padding-right:10px}.message-mute-header{padding-left:0!important;color:#fff;text-shadow:.5px .5px white;align-self:center;margin-bottom:5px;margin-top:25px}.message-mute-main-layout>vaadin-button{background:var(--lumo-primary-color);color:#fff;text-shadow:.5px .5px white;margin-left:8px;margin-right:8px;margin-bottom:8px}.message-mute-main-layout>span{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-left:18px;padding-top:10p;padding-bottom:10px}.message-mute-main-layout>span:first-child{all:unset;height:4px;background:var(--button-contrast-color);width:35px;align-self:center;border-radius:5px;margin-top:12px}.message-mute-main-layout>span:nth-child(8){padding-bottom:5px!important}.message-mute-main-layout>div>vaadin-radio-button{display:flex;color:var(--primary)!important}.message-mute-main-layout{display:flex;flex-direction:column}.message-mute-main-layout vaadin-radio-group[has-value]>vaadin-radio-button::part(radio):after,.custom-mute-layout vaadin-radio-group[has-value]>vaadin-radio-button::part(radio):after{border:6.5px solid white}.message-mute-main-layout vaadin-radio-group[has-value]>vaadin-radio-button::part(radio){background:#fff !importan}.message-mute-main-layout vaadin-radio-button::part(radio){border:1.5px solid white!important;background:none!important;font-size:15px;padding-left:0!important}.archive-div>div>span:nth-child(2){color:var(--secondary)}.archive-div>div{display:flex;flex-direction:column;margin-left:10px}.archive-div>vaadin-avatar{width:45px;height:45px;border:.5px solid var(--lumo-contrast-20pct);margin-left:15px}.archive-div{display:flex;flex-direction:row;align-items:center;padding-top:5px;padding-bottom:5px}.archive-main-layout{height:100%}.message-request-options>div{display:flex;flex-direction:row;align-items:center;width:100%}.message-request-options>span{height:4px;background:var(--button-contrast-color);width:35px;align-self:center;border-radius:5px;margin-bottom:10px}.message-request-options>div{padding-top:7px;padding-bottom:8px;padding-left:10px}.message-request-options>div>vaadin-icon,.message-request-options>div>div>vaadin-icon{background:var(--button-contrast-color);border-radius:50%;font-size:27px;padding:12px;margin-right:10px}.message-request-options{display:flex;flex-direction:column;margin-top:10px}.user-request-delete-dialog>div{display:flex;flex-direction:row;align-self:end}.user-request-delete-dialog>div>vaadin-button:nth-child(2){color:var(--lumo-primary-color)}.user-request-delete-dialog>div>vaadin-button{color:#fff;background:none;margin:10px 0 0;font-size:15px}.user-request-delete-dialog>span:nth-child(1){margin-bottom:5px;font-size:18px;text-shadow:.5px .5px white}.user-request-delete-dialog::part(overlay){border-radius:3px;height:180px}.user-request-delete-dialog::part(content){display:flex;flex-direction:column;color:#fff;justify-content:center;background:#424242}.user-request-footer-layout>vaadin-button{color:#fff;font-weight:700;width:165px;margin-top:12px;margin-bottom:12px}.user-request-app-layout{border-bottom:.5px solid var(--lumo-contrast-10pct)}.user-request-footer-layout{display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;width:100%;border-top:.5px solid var(--nav-border)}.user-request-messages-div>div>vaadin-avatar{width:25px;height:25px;margin-right:5px}.user-request-messages-div>div{align-self:start;display:flex;flex-direction:row;align-items:end}.user-request-messages-div>div>span{border-bottom-left-radius:15px!important;margin-bottom:0!important}.user-request-messages-div>span:first-child{border-top-left-radius:15px;border-top-right-radius:15px}.user-request-messages-div>span{margin-left:32px}.user-request-messages-div>span,.user-request-messages-div>div>span{align-self:start;margin-bottom:3px;border-radius:20p;border-radius:4px 15px 15px 4px;background:var(--lumo-contrast-5pct);padding:5px 15px;display:flex;justify-content:cente;font-size:15px;max-width:230px;color:#fff}.user-request-messages-div{display:flex;flex-direction:column;margin-top:10px;margin-left:10px}.user-request-main-layout::-webkit-scrollbar{display:none}.user-request-main-layout{display:flex;flex-direction:column;overflow-y:auto;height:100%}.user-request-time{font-size:12px;margin-top:25px;color:var(--secondary);width:100%;text-align:center}.user-request-view-profile>span{font-size:23px;font-weight:700;color:#fff;margin-bottom:5px;text-align:center}.user-request-view-profile>vaadin-avatar{width:85px;height:85px;margin-top:15px;margin-bottom:5px}.user-request-view-profile>vaadin-button{font-weight:700;color:#fff;background:var(--lumo-contrast-5pct);border-radius:8px;height:30px}.user-request-view-profile{display:flex;flex-direction:column;align-items:center}.request-header-layout>div>span{color:#fff;font-weight:700}.request-header-layout>div>vaadin-avatar{position:relativ;right:15px;margin-right:5px}.request-header-layout>div{display:flex;flex-direction:row;align-items:center;position:relative;right:65px}.request-header-layout>vaadin-icon{margin-right:10px}.request-header-layout{width:100%;align-items:center;justify-content:space-between}.message-request-main-layout vaadin-tabs[orientation=horizontal],.message-request-header-main vaadin-tabs::part(tabs){justify-content:center;border-top:1px solid var(--nav-borde);width:100%}.message-request-main-layout>vaadin-tabsheet{padding:0;margin:0;overflow-y:hidden}.message-request-header-main vaadin-tab{width:163px}.message-request-header-main vaadin-tab:before{width:160px;height:1px;margin:0;padding:0}.message-request-main-layout>vaadin-tabsheet::part(tabs-container){align-self:center;width:340p}.message-request-main-layout>vaadin-tabsheet::part(content){padding:0;overflow-y:auto}.message-request-main-layout{height:100%;overflow-y:auto}.unread-count{background:var(--lumo-error-color);font-size:10px;border-radius:50%;padding:3px;width:8px;height:8px;text-align:center;display:flex;align-items:center;justify-content:center;border:1px solid var(--button-contrast-color);text-shadow:.5px .5px white;margin-right:5px}.message-request-main-layout::-webkit-scrollbar{display:none}.message-request-child>div>span:nth-child(2){color:var(--secondary)}.message-request-child>vaadin-avatar{width:50px;height:50px;margin-left:10px;margin-right:10px}.message-request-child>div>div{display:flex;flex-direction:row;align-items:center}.message-request-child>div>span{color:#fff}.message-request-child>div{display:flex;flex-direction:column;font-size:15px}.message-request-child{display:flex;flex-direction:row;padding-top:10px;padding-bottom:10px;width:100%}.message-request-empty-div>vaadin-icon{color:var(--secondary);margin-bottom:10px}.message-request-empty-div>span:nth-child(2){text-shadow:.5px .5px var(--block-text-color)}.message-settings-app-layout .message-request-empty-div{height:100%!important}.message-request-empty-div{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;height:100%!important;color:var(--block-text-color);text-align:center!important}.settings-app-layout>div{height:100%!important}.message-request-main-div{height:100%!important}.message-request-header-main>div{font-size:15px}.message-request-header-main>div>p>span{color:var(--primary-text-color)}.message-request-header-main>div>p{color:var(--secondary);margin-right:10px;margin-left:20px}.message-request-app-layout>div::-webkit-scrollbar{display:none}.message-request-app-layout>div{height:100%;overflow-y:auto}.message-request-header-main>vaadin-horizontal-layout{border-bottom:.5px solid var(--nav-border);padding-top:5px;padding-bottom:5px}.active-status-dialog>div>span:nth-child(2){color:#fff;margin-bottom:10px}.active-status-dialog>div>span:nth-child(1){color:#fff;font-weight:700}.active-status-dialog>div{display:flex;flex-direction:column}.active-status-dialog>div>div>vaadin-button:nth-child(1){background:}.active-status-dialog>div>div>vaadin-button:nth-child(2){background:var(--lumo-primary-color)}.active-status-dialog>div>div>vaadin-button{width:130px;color:#fff;font-weight:700;border-radius:7px}.active-status-dialog>div>div{display:flex;justify-content:space-between}.active-status-dialog::part(overlay){border-radius:7px;align-items:center;width:300px}.active-status-dialog::part(content){background:var(--button-contrast-color);align-items:center;padding:10px 15px}.settings-status-main-layout>div:nth-child(2)>span>span{color:#fff;padding-top:5px}.settings-status-main-layout p{margin-top:25px !importan}.settings-status-main-layout>div:nth-child(2)>span{margin-bottom:15px}.settings-status-main-layout>div:nth-child(2)>span,.settings-status-main-layout p{font-size:12px;color:var(--secondary);margin-top:10px;padding-left:10px;padding-right:10px}.settings-status-main-layout>div:nth-child(2){display:flex;flex-direction:column}.settings-status-main-layout>div:first-child>div:nth-child(1){display:flex;justify-content:space-between}.settings-status-main-layout>div:first-child{display:flex;flex-direction:column}.settings-status-main-layout>div:first-child>div:nth-child(2){background:var(--nav-border);height:.5px;margin-top:10px;display:flex}.settings-status-main-layout>div:first-child{color:#fff;padding-left:10px;padding-right:10px;padding-top:10px}.message-settings-main-layout>div>span{margin-right:5px;color:var(--lumo-contrast-60pct)}.message-settings-main-layout>div:active,.settings-status-main-layout>div:first-child:active,.settings-status-main-layout>div:nth-child(2)>span>span:active,.header-back-button:active,.message-request-child:active,.archive-div:active,.message-request-options>div:active,.message-mute-main-layout>span:active{background:var(--hover-color)}.message-settings-main-layout>div>div>vaadin-icon{background:var(--button-contrast-color);font-size:23px;border-radius:50%;padding:8px;margin-right:10px;fill:#fff}.message-settings-main-layout>div:first-child{margin-top:5px}.message-settings-main-layout>div{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.message-settings-main-layout{display:flex;flex-direction:column}.settings-numbers{color:#fff!important;font-size:11px;background:var(--lumo-error-color);border-radius:30px;height:5px;padding:7px;display:flex;align-items:center;text-shadow:.5px .5px white}.message-settings-header-layout>span{position:relative;right:10px}.message-settings-header-layout{align-items:center;color:#fff;text-shadow:.5px .5px white}.settings-app-layout::part(navbar){border-bottom:.5px solid var(--nav-border)}.message-settings-app-layout::part(navbar),.message-request-app-layout::part(navbar){border-bottom:.5px solid var(--nav-border)}.message-settings-app-layout[overlay],.message-settings-app-layout::part(navbar),.settings-app-layout[overlay],.settings-app-layout::part(navbar),.user-request-app-layout[overlay],.user-request-app-layout::part(navbar),.message-request-app-layout::part(navbar),.message-request-app-layout[overlay]{background:var(--primary)}.search-message-main-layout::-webkit-scrollbar{display:none}.search-message-main-layout{height:100%;overflow-x:hidden;overflow-y:auto}.search-message-main-layout>div>div:active{background:var(--hover-color)}.search-message-main-layout>div>div{display:flex;flex-direction:row;align-items:center;padding-top:6px;padding-bottom:6px}.search-message-main-layout>div>div>vaadin-avatar{margin-left:10px;margin-right:8px;border:1px solid var(--lumo-contrast-20pct)}.search-message-main-layout>span{color:#fff;text-shadow:.5px .5px white;margin-left:10px}.search-message-app-layout>vaadin-horizontal-layout>vaadin-text-field>input:placeholder-shown,.search-message-app-layout>vaadin-horizontal-layout>vaadin-text-field>[slot=prefix]{color:var(--secondary)}.search-message-app-layout>vaadin-horizontal-layout>vaadin-text-field::part(input-field){width:295px;background:var(--text-field);border-radius:30px;position:relative;right:10px}.search-message-app-layout::part(navbar),.search-message-app-layout[overlay]{background:var(--primary)}.custom-mute-layout>vaadin-button{width:100%;color:#fff;background:var(--lumo-primary-color)}.custom-mute-layout vaadin-radio-button::part(radio){border:1px solid white;background:none;width:16px;height:16px}.custom-mute-layout vaadin-radio-group>vaadin-radio-button{font-size:14px;margin-top:0}.custom-mute-layout>div{display:flex;flex-direction:column}.custom-mute-layout>div>vaadin-radio-button{background:green;width:100%;font-size:12px}.custom-mute-layout>vaadin-integer-field::part(label),.custom-mute-layout>div>vaadin-radio-group::part(label){font-size:15px;color:#fff}.custom-mute-layout>vaadin-integer-field>input{margin-left:5px}.custom-mute-layout>vaadin-integer-field::part(input-field){background:var(--text-field);height:45px;border-radius:30px}.custom-mute-layout>vaadin-integer-field{width:100%}.custom-mute-layout>span:nth-child(4){width:100;text-align:center;align-self:center}.custom-mute-layout>span:first-child{width:100%;text-align:center;color:#fff;text-shadow:.5px .5px white}.custom-mute-layout{padding-bottom:5px}.message-mute-timer>span:first-child{margin-right:10px}.message-mute-timer{font-size:15px;text-align:center;width:180p;margin-right:15px}.unread-requests-main-div:active{background:var(--hover-color)!important}.unread-requests-main-div>div>span{background:var(--lumo-error-color);position:relative;right:10px;bottom:8px;font-size:12px;border-radius:50%;padding:3px;width:11px;height:11px;text-align:center;display:flex;align-items:center;justify-content:center;border:1px solid var(--button-contrast-color)}.unread-requests-main-div>span{margin-left:5px;text-shadow:.5px .5px white;font-size:15px}.unread-requests-main-div vaadin-icon{margin-left:15px;font-size:20px}.unread-requests-main-div{display:flex;justify-content:unset!important;background:var(--lumo-contrast-5pct)!important;width:340px!important;border-radius:7px!important;color:#fff!important;height:21px!important;align-items:center!important}.message-typing:after{content:"";animation:dots 2s infinite}@keyframes dots{0%{content:""}33%{content:"."}66%{content:".."}to{content:"..."}}.message-sender-not-seen{color:#fff!important}.main-messages-div>div:last-child{margin-right:13px;display:flex;flex-direction:row;align-items:center}.message-delivered-icon,.message-not-delivered-icon,.message-seen-icon{margin-left:10px}.main-messages-div>div:last-child>vaadin-icon:first-child{color:#fff}.message-not-delivered-icon>vaadin-icon,.message-delivered-icon>vaadin-icon,.message-seen-icon>vaadin-avatar,.main-messages-div>div:last-child>vaadin-icon{width:17px;height:17px}.message-not-delivered-icon>vaadin-icon{fill:var(--lumo-primary-color)}.message-delivered-icon>vaadin-icon{color:var(--lumo-primary-color)}.messages-layout>div>div:nth-child(1){display:flex;align-items:center}.messages-layout>div>div:nth-child(1)>div{height:12px;width:12px;background:var(--lumo-success-text-color);border-radius:50%;position:relative;top:15px;right:13px;border:2px solid var(--primary)}.messages-layout>div>div:nth-child(1)>vaadin-avatar{width:50px;height:50px;border:1px solid var(--lumo-contrast-30pct);margin-left:10px}.messages-layout>div>div:nth-child(2)>span:nth-child(1){color:#fff;font-size:15px}.messages-layout>div>div:nth-child(2)>span:nth-child(2){color:var(--secondary)}.messages-layout>div>div:nth-child(2)>div>div{background:var(--lumo-error-color);border-radius:50%;font-size:10px;padding:2px;height:10px;width:10px;display:flex;align-items:center;justify-content:center;color:#fff;text-shadow:.5px .5px white;margin-right:5px}.messages-layout>div>div:nth-child(2)>div{display:flex;flex-direction:row;align-items:center}.messages-layout>div>div:nth-child(2){display:flex;flex-direction:column;width:100%;position:relative;right:6px}.messages-layout{padding:0;display:flex;flex-direction:column;align-items:center;height:100%}.messages-layout>.main-messages-div{align-self:flex-start}.messages-layout>.main-messages-div:active{background:var(--hover-color)}.messages-layout .message-request-empty-div{height:100%!important;display:flex!important;justify-content:center!important;align-items:center!important}.messages-layout>div{all:unset;display:flex;flex-direction:row;justify-content:space-between;width:100%;align-items:center;margin:0;padding-top:10px;padding-bottom:8px}.message-form-layout{height:100%;overflow-y:auto;overflow-x:hidden}.message-form-layout::-webkit-scrollbar{display:none}.message-avatars-layout>vaadin-icon{position:absolute;display:flex;color:#fff;background:var(--lumo-primary-color);width:55px;height:55px;border-radius:50%;padding:13px;bottom:15px;right:15px;z-index:9999}.message-avatars-layout>div>div:nth-child(2){height:12px;width:12px;background:var(--lumo-success-text-color);border-radius:50%;position:relative;bottom:20px;left:26px;border:2px solid var(--primary)}.message-avatars-layout>div>span{width:70px;font-size:12px;text-align:center;color:#fff;position:relative;bottom:10px}.message-avatars-layout>div:active{background:var(--hover-color)}.message-avatars-layout>div{display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:5px;padding-right:5px}.message-avatars-layout>div>div:first-child{width:55px;height:55px;pointer-events:none;border:3px solid var(--lumo-primary-color);border-radius:50%;margin-top:3px;display:flex;align-items:center;justify-content:center}.message-avatars-layout>div>div>vaadin-avatar{width:50px;height:50px;pointer-events:none;border:2px solid var(--primary)}.message-avatars-layout::-webkit-scrollbar{display:none}.message-avatars-layout{display:flex;flex-direction:row;overflow-x:auto;padding-left:10p;background:var(--primary)}.message-header-layout>div vaadin-icon:last-child{margin-right:10px;margin-left:10px}.message-header-layout>div vaadin-icon{background:var(--button-contrast-color);border-radius:50%;padding:3px;font-size:25px}.message-header-layout>div>div>span{position:absolute;background:var(--lumo-error-color);padding:4px;border-radius:10px;height:15px;text-align:center;display:flex;align-items:center;bottom:28px;right:55px;font-size:13px;color:#fff;font-weight:700;border:1px solid var(--primary)}.message-header-layout>div{display:flex;flex-direction:row}.message-header-layout>span:first-child{margin-left:10px;font-weight:700;font-size:25px}.message-header-layout{align-items:center;color:#fff;width:100%;justify-content:space-between}.message-app-layout::part(navbar){background:var(--primary);border-top:.5px solid var(--nav-border);margin-top:57px;height:40px}.message-app-layout[overlay]{background:var(--primary);-webkit-user-select:none;user-select:none}.people-reacted-tabsheet{height:100%;overflow-y:auto}.people-reacted-div>div>div{margin-left:10px;display:flex;align-items:center;padding-top:10p;padding-bottom:10p}.people-reacted-div>div>span{position:relative;right:12px;white-space:pre-wrap;word-wrap:break-word;width:200px}.people-reacted-div>div>div>vaadin-avatar{width:47px;height:47px;border:.5px solid var(--lumo-contrast-20pct)}.people-reacted-div>div>div>vaadin-icon{position:relative;right:12px;top:22px}.people-reacted-div::-webkit-scrollbar{display:none}.people-reacted-div{display:flex;flex-direction:column;height:600px;overflow-y:auto}.people-reacted-div>div:active{background:var(--hover-color)}.people-reacted-div>div{display:flex;flex-direction:row;align-items:center;padding-top:10px;padding-bottom:10px}.people-reacted-tabsheet::part(content)::-webkit-scrollbar{display:non}.people-reacted-tabsheet::part(content){padding:0}.people-reacted-tabsheet vaadin-tabs vaadin-tab>div>span{position:relative;right:5px}.people-reacted-tabsheet vaadin-tabs vaadin-tab>div>vaadin-icon{position:relative;top:5px;font-size:20px}.people-reacted-tabsheet vaadin-tabs vaadin-tab>div{display:flex;align-items:center;width:100%}.people-reacted-tabsheet vaadin-tabs vaadin-tab>div>span:first-child{margin-right:5px}.people-reacted-tabsheet vaadin-tabs vaadin-tab:before{width:100%}.people-reacted-tabsheet vaadin-tabs vaadin-tab{color:var(--secondary)}.people-reacted-app-layout::part(navbar){background:var(--primary)}.copy-div span{font-size:13p;color:#fff}.copy-div>div:first-child{display:flex;height:3px;border-radius:10px;width:40px;background:var(--nav-border);align-self:center;margin-top:13px}.copy-div>div:last-child>vaadin-icon{background:var(--button-contrast-color);border-radius:50%;padding:12px;font-size:28px}.copy-div>div:last-child:active{background:var(--hover-color)}.copy-div>div:last-child{display:flex;flex-direction:row;align-items:center;gap:8px;margin-top:10px;padding-left:10px;padding-bottom:5px;padding-top:5px}.copy-div{display:flex;flex-direction:column;align-items:cente;gap:5px;padding-bottom:5px}.image-row-two>div,.image-row-two>div img{height:auto;width:100%}.image-row-three:first-child{margin-bottom:3px}.image-row-three{display:flex;justify-content:center!important;align-items:center;height:auto;width:100%}.image-row-three:last-child>div img{max-height:150px;width:100%}.image-row-three:last-child>div{object-fit:cover;width:100%}.image-row-three:first-child>div{height:200px}.image-row-four:first-child{margin-bottom:3px}.image-row-four>div img{width:260px}.image-row-four>div{height:180px;width:260px}.image-row-more:first-child>div,.image-row-five:first-child>div{height:190px;width:260px}.image-row-more:first-child,.image-row-five:first-child{margin-bottom:3px}.image-row-more:first-child img,.image-row-five:first-child img{width:260px!important;height:190px}.image-row-more:last-child img,.image-row-five:last-child img{width:200px!important;height:120px}.image-container:active{filter:contrast(50%)}.image-container>img,.image-container{max-height:240p;width:260px !importan}.image-row-one,.image-row-two,.image-row-three,.image-row-four,.image-row-five,.image-row-more{all:unset;display:flex;flex-direction:row;gap:3px;padding:0!important;margin:0;background:var(--primary)}.image-container{position:relative;width:100p;height:100p;overflow:hidden}.image-grid img{pointer-events:none}.image-grid>div:activ{filter:contrast(50%)}.image-container{position:relative;display:fle;justify-content:center;align-items:center;overflow:hidde}.image-container img{width:100;height:140p;max-height:240p;object-fit:cover}.remaining-count{position:absolute;top:0;background:#0006;padding:5px 10p;font-size:15px;width:100%;height:100%;display:flex;justify-content:center;align-items:center;color:#fff;text-shadow:.5px .5px white}.feed-form-layout>span:active{background:var(--hover-color)}.feed-form-layout>span{background:var(--primary);color:#fff;padding-left:10px!important;padding-bottom:5px}.feed-reaction>vaadin-icon{background:green!important}.feed-reaction{background:var(--lumo-contrast-5pct);border-radius:20px}.feed-form-layout::-webkit-scrollbar{display:none}.feed-form-layout{height:100%;overflow-y:auto;behavior:smooth}.feed-only-comment-name-div>span:nth-child(1){color:#fff;font-weight:700;font-size:15px}.feed-only-comment-name-div{display:flex;flex-direction:column;position:relative;right:70px;justify-content:center}.feed-listener-like,.feed-listener-heart,.feed-listener-happy{padding:5px;font-size:16px!important;border-radius:50%;color:#fff;position:relative;margin-right:3px}.feed-listener-like{background:var(--lumo-primary-color)}.feed-listener-heart{background:var(--lumo-error-color)}.feed-listener-happy{background:var(--lumo-warning-color)}.feed-only-reactions-layout>span{font-size:15px}.feed-only-reactions-layout>div>vaadin-icon:nth-child(3){background:var(--lumo-warning-colo);right:7p}.feed-only-reactions-layout>div>vaadin-icon:nth-child(2){background:var(--lumo-error-colo);right:4p}.feed-only-reactions-layout>div>vaadin-icon:nth-child(2),.feed-only-reactions-layout>div>vaadin-icon:nth-child(3),.feed-only-reactions-layout>div>vaadin-icon:nth-child(4),.feed-only-reactions-layout>div>vaadin-icon:nth-child(5),.feed-only-reactions-layout>div>vaadin-icon:nth-child(6),.feed-only-reactions-layout>div>vaadin-icon:nth-child(7){right:5p}.feed-only-reactions-layout>div>vaadin-icon{font-size:18px;position:relative;top:4px}.feed-only-reactions-layout{background:var(--primary);padding-left:10px;padding-right:10px;justify-content:space-between;align-items:center;color:#fff;height:25px}.feed-only-buttons-layout>vaadin-button:nth-child(4)::part(label),.feed-only-buttons-layout>vaadin-button:nth-child(3)::part(label),.feed-only-buttons-layout>vaadin-button:nth-child(1)::part(label){position:relative;right:3px}.feed-only-buttons-layout>vaadin-button:nth-child(4)>vaadin-icon,.feed-only-buttons-layout>vaadin-button:nth-child(3)>vaadin-icon .feed-only-buttons-layout>vaadin-button:nth-child(1)>vaadin-icon{position:relative;left:3px}.feed-only-buttons-layout>vaadin-button:nth-child(1)>vaadin-icon{position:relative;top:7px;font-size:25px;view-box:0}.feed-only-buttons-layout>vaadin-button>vaadin-icon{font-size:22px}.feed-only-buttons-layout>vaadin-button::part(label){font-size:15px}.feed-only-buttons-layout>vaadin-button:nth-child(4){right:30px}.feed-only-buttons-layout>vaadin-button:nth-child(3){right:20px}.feed-only-buttons-layout>vaadin-button:nth-child(2){right:10px}.feed-only-buttons-layout>vaadin-button{background:var(--lumo-contrast-5pct);color:#fff;width:82px;height:35px;border-radius:30px;position:relative;margin-left:3px;justify-content:center;padding:0}.feed-only-buttons-layout{background:var(--primary);margin-bottom:5px}.feed-only-time>vaadin-icon{font-size:8px}.feed-only-avatar{pointer-events:none;border:1px solid gray;width:50px;height:50px}.feed-only-content{width:100;height:300px;display:flex;justify-content:center;align-items:center;color:#fff;font-weight:700;font-size:20px}.feed-only-close-icon{font-size:20px;color:#fff;margin-left:5px}.feed-only-more-icon{font-size:15px;color:#fff}.feed-only-header-layout{width:100%;justify-content:space-between;margin-top:5p;border-top:.5px solid var(--nav-border);padding:10px;background:var(--primary)}.feed-only-name-div>span:nth-child(1){color:#fff;font-weight:700;font-size:15px}.feed-only-time{font-size:11px;color:var(--lumo-contrast-40pct)}.feed-only-name-div{display:flex;flex-direction:column;position:relative;right:50px;justify-content:center}.feed-footer-plus-icon,.feed-footer-search-icon,.feed-footer-menu-icon{color:#fff;width:35px;height:35px;background:var(--lumo-contrast-10pct);border-radius:50%;padding:3px;display:flex;align-items:center;position:relative;top:10px;left:60px}.feed-footer-logo{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:700;font-size:30px;color:#1877f2;display:flex;align-items:center;margin-left:10px;position:relativ;top:5px}.feed-footer-logo span:first-child{font-size:48px;font-family:cursive}.feed-footer-layout{background:var(--primary);width:100%;height:56px;display:fle;color:#fff;border-top:.5px solid black}.main-feed-buttons{background:var(--primary);margin-bottom:4px}.main-feed-photo-div>span{color:#fff;font-size:12px}.main-feed-photo-div>vaadin-icon{color:var(--lumo-success-color);font-size:20px}.main-feed-add-layout{align-items:center;background:var(--primary);margin-bottom:5px;padding:10px;border-bottom:.5px solid var(--lumo-contrast-20pct)}.main-feed-post-avatar{border:.5px solid var(--lumo-contrast-70pct);width:45px;height:45px;position:relative;top:5px;pointer-events:none}.main-feed-post-button{background:var(--lumo-contrast-5pct);width:230px;color:var(--lumo-contrast-90pct);height:45px;border-radius:30px}.main-feed-photo-div{display:flex;flex-direction:column;justify-content:center}.notification-icon{margin-right:15px}.main-reactor-main-layout{position:relative;right:40px}.main-reactor-like-icon{padding:5px;background:var(--lumo-primary-color);border-radius:50%;color:#fff}.main-reactor-heart-icon{padding:5px;background:var(--lumo-error-color);border-radius:50%;color:#fff}.main-reactor-smile-icon{padding:5px;background:var(--lumo-warning-color);border-radius:50%;color:#fff}.main-like-icon{padding:5px;background:var(--lumo-primary-color);border-radius:50%;color:#fff;position:relative;left:60px;top:15px}.main-heart-icon{padding:5px;background:var(--lumo-error-color);border-radius:50%;color:#fff;position:relative;left:60px;top:15px}.main-smile-icon{padding:5px;background:var(--lumo-warning-color);border-radius:50%;color:#fff;position:relative;left:60px;top:15px}.online{display:flex;justify-content:center;border:1px solid gray}vaadin-confirm-dialog-overlay.main-reactor-dialog::part(content){display:flex;justify-content:center;align-items:center;padding:0}vaadin-tabs.main-reactor-tabs vaadin-tab:active{background:var(--lumo-contrast-20pct)}vaadin-tabs.main-reactor-tabs span{font-size:11px;color:#fff}vaadin-tabs.main-reactor-tabs::part(tabs){margin:0;padding:0}.main-tabs-Layout{display:flex;align-items:center;margin:0;padding:0}.comment-reactions-div:active{background:var(--lumo-contrast-30pct)}.main-all-text{margin-right:4px}.main-dialog-content{height:460px;width:300px}.main-reactor-header-text{color:#fff;font-weight:700;-webkit-user-select:none;user-select:none}vaadin-confirm-dialog-overlay.main-reactor-dialog>[slot=confirm-button]{font-weight:700;border-radius:20px}vaadin-confirm-dialog-overlay.main-reactor-dialog::part(content),vaadin-confirm-dialog-overlay.main-reactor-dialog::part(header),vaadin-confirm-dialog-overlay.main-reactor-dialog::part(footer){background:var(--lumo-contrast-10pct);margin:0}vaadin-confirm-dialog-overlay.main-reactor-dialog::part(overlay){background:#000;border:.5px solid gray;border-radius:20px}.main-reactor-main-layout vaadin-avatar{border:1px solid gray;height:45px;width:45px}.main-reactor-main-layout:active{background:var(--lumo-contrast-20pct)}.main-reactor-main-layout{display:flex;align-items:center;width:351px;margin:0}.main-reactor-name{-webkit-user-select:none;user-select:none;font-size:13px}.main-title-time-layout{background:var(--lumo-contrast-10pct)}.main-artwork-total-layout{display:flex;justify-content:center;align-items:center;background:var(--lumo-contrast-10pct);padding-bottom:5px;padding-top:5px}vaadin-icon.main-artwork-icons{height:20px;width:20px}vaadin-button.copy-button{background:var(--lumo-contrast-10pct);color:#fff;font-weight:700}.main-no-search{color:var(--lumo-contrast-30pct);display:flex;justify-content:center;align-items:center;margin-top:30px}vaadin-text-field.main-search-field{width:100%}.username,.drawer-links{-webkit-user-select:none;user-select:none}.online,.avatar,.drawer-links,.uploaded-image{pointer-events:none}vaadin-button.save-artwork{background:var(--lumo-primary-color);color:#fff;border-radius:8px}.main-artwork-image{pointer-events:none}.main-artwork-buttons{border-bottom:1px solid var(--lumo-contrast-30pct)}vaadin-icon.back-icon{color:#fff;padding:8px;margin-left:15px;width:40px;height:40px;top:50px}.horizontal{display:flex;justify-content:center;align-items:center;width:170px;height:50px;margin-left:40px;margin-top:10px;background:var(--lumo-contrast-10pct);border-radius:10px;font-weight:700;color:#fff}.download-anchor{color:#fff;-webkit-user-select:none;user-select:none;font-size:15px}.download-url{text-decoration:underline;color:#fff}.menu-bar vaadin-menu-bar-button>vaadin-menu-bar-item>vaadin-icon{color:var(--lumo-primary-color);margin-right:7px}.menu-bar vaadin-menu-bar-button{background:transparent;color:#fff;margin-top:5px}.text4{font-size:20px}vaadin-text-field.url-field{-webkit-user-select:none;user-select:none}vaadin-text-field.url-field::part(input-field){color:#000;font-size:10px;border:1px solid black;-webkit-user-select:none;user-select:none}vaadin-confirm-dialog-overlay.share-dialog>[slot=confirm-button]{background:transparent;font-size:15px;font-weight:5px;color:var(--lumo-shade-90pct);width:100px;margin-left:90px;border-radius:20px;border-bottom:1px solid #0ef;border-top:1px solid #0ef}vaadin-confirm-dialog-overlay.share-dialog::part(overlay){-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background:var(--lumo-contrast-50pct);color:#000;border-top:2px solid #0ef;border-bottom:2px solid #0ef;border-radius:20px}vaadin-confirm-dialog-overlay.share-dialog::part(header){background:var(--lumo-shade-90pct);font-size:10px}vaadin-confirm-dialog-overlay.share-dialog::part(footer){background:transparent}.current-image{max-width:400px;max-height:270px;justify-content:center;display:flex;align-items:center}.current-text{font-size:14px;color:#fff;font-weight:700}.new-uploaded-image{max-height:440px}.uploaded-image{max-width:400px;justify-content:center;display:flex;align-items:center;max-height:270px}.add-text{margin-left:100px;font-size:14px;color:#fff;font-weight:700}.image-form vaadin-image{width:600px}.artwork-date-time{color:var(--lumo-contrast-60pct);font-size:12px;font-style:italic}.main-artwork-title{font-size:16px;margin-top:20px;-webkit-user-select:none;user-select:none;white-space:pre}.seperator{display:none}vaadin-button.artwork-delete{color:var(--lumo-error-color);background:transparent;border-radius:20px;margin-left:22px}vaadin-button.artwork-share{color:var(--lumo-primary-color);background:transparent;border-radius:20px}vaadin-button.artwork-edit{color:var(--lumo-success-text-color);background:transparent;border-radius:20px}vaadin-button.artwork-delete::part(label),vaadin-button.artwork-edit::part(label),vaadin-button.artwork-share::part(label){color:#fff}vaadin-button.add-artwork-button{background:transparent;margin-left:8px;color:#fff;border-radius:20px;font-weight:700}vaadin-button.add-artwork-button>vaadin-icon{color:#fff}vaadin-icon.search-button{margin-top:10px;color:#fff;margin-left:10px}vaadin-button.close-artwork{border-radius:30px;border:.5px solid skyblue;font-size:15px;background:transparent;color:#fff;border-bottom:1px solid #0ef;border-top:1px solid #0ef}#messageArea{border:1px solid #ccc;padding:10px;height:300px;overflow-y:scroll;background:#f9f9f9}.sheet-main{background:var(--primary)!important}.sheet-layout{padding:0;all:unset;display:flex;flex-direction:column;background:var(--primary);border-top-left-radius:15px;border-top-right-radius:15px}.messenger-link{color:#fff;font-size:20px;font-family:sans-serif;background:var(--lumo-primary-color);padding:10px;border-radius:10px;border:1px solid white}vaadin-confirm-dialog-overlay.view-dialog>[slot=header]{color:#000}vaadin-confirm-dialog-overlay.wait-dialog>[slot=cancel-button]{font-size:15px;font-family:serif;color:#fff;width:100px;margin-left:90px;border-radius:20px;background:red}vaadin-confirm-dialog-overlay.wait-dialog>[slot=confirm-button]{background:transparent;font-size:15px;font-weight:5px;font-family:serif;color:#fff;width:100px;margin-left:90px;border-radius:20px;background:green}vaadin-confirm-dialog-overlay.wait-dialog::part(overlay){background-image:url(../../register_images/images.png);background-size:cover;color:#000;font-family:serif}vaadin-confirm-dialog-overlay.wait-dialog::part(header){font-family:serif;font-size:10px;color:#000;background:red;border-radius:20px}vaadin-confirm-dialog-overlay.view-dialog::part(footer){background:transparent;color:#000}.name-div{display:flex;justify-content:center;align-items:center;color:#0ef;font-size:12px;margin-top:10px}.share-image{max-height:515px}.share-posted{color:var(--lumo-contrast-70pct);font-style:italic;font-size:12px}.share-title{color:#fff;font-size:14px}.share-header-layout{display:flex;justify-content:center;align-items:center}vaadin-button.login-button{border-radius:30px;border:.5px solid lightblue;font-size:15px;background:transparent;color:#fff;border-bottom:1px solid #0ef;border-top:1px solid #0ef;margin-left:20px}.share-header-text{color:#fff;font-size:11px;margin-left:0}.own-profile-bio-text{white-space:pre}.own-profile-total-followers:last-child{color:var(--lumo-contrast-70pct)}.profile-upload-div{padding:0;margin:0;position:absolute;top:-90px;margin-left:5p}.profile-upload-layout2{padding:0;margin:0;position:absolute;bottom:5px;left:80px;right:-40px;top:85px}.name-bio-follower-layout{padding:0;bottom:40px;position:relative;margin-left:20p;height:100%;top:-10px;margin-top:60px}.own-profile-name{font-weight:700;color:#fff;font-size:22px}.profile-layout{position:absolute;padding-top:0;padding-bottom:0;padding-right:0;height:100%}.own-profile-header-layout{width:100%;display:flex;align-items:center;justify-content:space-betwee;padding:0;margin:0}.own-profile-search-icon{display:block;color:#fff;font-size:25px;margin-left:15p}.cover-finish-button{margin-right:20px;color:var(--lumo-primary-text-color)}.cover-crop-button{color:var(--lumo-primary-color)}.cover-back-button,.header-back-button{margin-left:10px;color:#fff}.cover-finish-button,.profile-done-button,.cover-back-button,.header-back-button{font-size:25px}.profile-done-button{margin-right:20px;color:var(--lumo-primary-color)}.cover-uncropped-button{color:var(--lumo-error-color);font-size:14px}vaadin-app-layout.cover-photo-app-layout>vaadin-horizontal-layout>vaadin-button{color:#fff;font-weight:700;width:110px;border-radius:20px}vaadin-app-layout.cover-photo-app-layout>vaadin-horizontal-layout{display:flex;align-items:center;justify-content:space-between;width:100%}.cropped-cover-photo{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}.profile-cover-photo-upload vaadin-upload-file-list::part(list){display:none}.profile-cover-photo-upload vaadin-upload-file[uploading]{display:none}vaadin-upload.profile-cover-photo-upload>vaadin-button>vaadin-icon{font-size:20px}vaadin-upload.profile-cover-photo-upload>vaadin-button{background:#e1e1e1;color:#fff;border:1px solid black;border-radius:50%;height:40px;width:40px;position:relative;left:155px;top:-46px}.profile-cover-photo-image{height:140px;pointer-events:none}.profile-upload-div{padding:0}vaadin-avatar.own-profile-avatar{position:relative;top:-110p;pointer-events:none;border:1px solid gray;width:130px;height:130px;padding:0}.profile-edit-icon vaadin-upload-file[uploading]{display:none}vaadin-upload.profile-edit-icon>vaadin-button>vaadin-icon{font-size:20px}vaadin-upload.profile-edit-icon>vaadin-button{background:#e1e1e1;color:#fff;border:1px solid black;border-radius:50%;height:40px;width:40px;position:relative}.follower-image1,.follower-image2,.follower-image3{object-fit:cover}.own-profile-total-followers{position:relative}.own-profile-total-followers:nth-child(1){color:#fff;font-weight:700;font-size:16px}vaadin-button.profile-more-button,vaadin-button.profile-edit-button,vaadin-button.profile-happening-button{position:relative;top:3px;border-radius:8px;font-weight:700;font-size:14px;margin-bottom:10px;color:#fff}vaadin-button.profile-more-button{background:var(--lumo-contrast-10pct);width:50px;margin-left:5px}vaadin-button.profile-edit-button{background:var(--lumo-primary-color);margin-left:5px}vaadin-button.profile-happening-button{background:var(--lumo-primary-color);margin-left:16px}.second-follow-layout{background:var(--primary)}.own-profile-follow-layout{display:flex;align-items:center;justify-content:center}.own-profile-artworks-layout{display:flex;align-items:center;justify-content:center;margin-left:20px}.profile-upload-layout span:nth-child(1){margin-left:20px}.profile-upload-layout{border-bottom:.5px solid gray;border-top:.5px solid gray;background:var(--lumo-contrast-10pct)}vaadin-button.profile-close-button>vaadin-icon{color:var(--lumo-error-color)}.profile-edit-icon vaadin-upload-file::part(name),.profile-cover-photo-upload vaadin-upload-file::part(name){display:none}.profile-edit-icon vaadin-upload-file::part(done-icon),.profile-cover-photo-upload vaadin-upload-file::part(done-icon){display:none}.profile-edit-icon vaadin-upload-file::part(remove-button){display:none}vaadin-upload.profile-edit-icon{color:#fff;height:50px}.edit-work-header-layout{align-items:center}.edit-education-layout{padding-top:0;padding-bottom:0}.edit-work-layout{margin:0;padding-bottom:0}.edit-header-text{color:#fff;font-weight:700}.about-main-layout{background:var(--lumo-contrast-10pct);height:100%;padding:0;overflow-x:auto}.edit-add-work-experience{margin-left:10px;color:#35abf0}.edit-work-icon{color:#fff;height:40px;width:40px;padding:10px;background:var(--lumo-contrast-10pct);border-radius:50%}.edit-last-line-div{background:var(--lumo-primary-contrast-color);width:100%;height:1px}.edit-info-layout{display:flex;align-items:center;justify-content:center;margin-bottom:5px}.edit-info-button{width:330px;background:var(--lumo-primary-color-10pct);color:#8bc4ff;font-weight:700;border-radius:7px}vaadin-app-layout.view-profile-app-layout[overlay],vaadin-app-layout.view-profile-app-layout::part(navbar),vaadin-app-layout.cover-photo-app-layout[overlay],vaadin-app-layout.cover-photo-app-layout::part(navbar){background:#000}.view-profile-image{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}.edit-profile-discard-text{color:var(--lumo-error-text-color)}.edit-profile-save-text{color:var(--lumo-primary-text-color)}.edit-upload vaadin-upload-file::part(remove-button){position:absolute;bottom:28px;right:30px;color:var(--lumo-error-color);font-size:30px;margin:0}.edit-upload vaadin-upload-file::part(name),.edit-upload vaadin-upload-file::part(done-icon),.edit-upload vaadin-upload-file-list::part(list),.edit-upload vaadin-upload-file[uploading]{display:none}vaadin-button.edit-upload-button::part(label),vaadin-button.edit-discard-button::part(label),vaadin-button.edit-eye-button::part(label){color:#fff;margin-left:10px}vaadin-button.edit-upload-button>vaadin-icon,vaadin-button.edit-discard-button>vaadin-icon,vaadin-button.edit-eye-button>vaadin-icon{color:#fff;width:50px;height:50px;padding:15px;border-radius:50%;background:var(--lumo-contrast-10pct)}vaadin-upload.edit-upload>vaadin-button,vaadin-button.edit-eye-button{background:transparent;height:50px}vaadin-dialog-overlay.edit-profile-dialog::part(content){background:var(--lumo-contrast-10pct);margin:0}vaadin-dialog-overlay.edit-profile-dialog::part(overlay){border-radius:10px 10px 0 0;position:absolute;bottom:0;background:#000;height:160px;width:100%;top:527px}.edit-helper-text{color:var(--lumo-contrast-50pct);font-size:12px}.edit-bio-layout{background:var(--lumo-contrast-10pct);height:100%;width:100%}vaadin-button.edit-bio-button{background:var(--lumo-primary-color);color:#fff;font-weight:700;border-radius:7px;position:relative;top:410px}vaadin-text-area.edit-bio-text-area::part(input-field){background:transparent;color:#fff;border:1px solid var(--lumo-contrast-30pct);border-radius:5px;height:75px}.edit-bio-text{color:var(--lumo-contrast-70pct);text-align:center}.edit-cover-image{height:200px;width:100%;border-radius:10px;object-fit:cover;pointer-events:none}.edit-line-div{width:100%;height:1px;background:var(--lumo-contrast-30pct)}.edit-text{color:#35abf0}vaadin-app-layout.edit-app-layout::part(navbar){background:var(--primary);border-bottom:.5px solid var(--lumo-contrast-40pct);align-items:center}vaadin-app-layout.edit-app-layout[overlay]{background:#000;-webkit-user-select:none;user-select:none}vaadin-app-layout.edit-app-layout>vaadin-form-layout{background:var(--lumo-contrast-10pct);height:100%;overflow-x:auto}.edit-header-text,.edit-first-text,.edit-bio-header-text{color:#fff;font-weight:700}vaadin-avatar.edit-profile-avatar{height:120px;width:120px;pointer-events:none}.edit-profile-layout{width:100%;padding-bottom:0;display:flex;justify-content:space-between}.edit-header-text{display:flex;align-items:center}.edit-profile-parent-layout4{margin-top:0;padding-top:5px;padding-bottom:5px}.edit-profile-parent-layout{display:flex;justify-content:center;align-items:center;width:100%;margin-top:0;padding-top:5px;padding-bottom:5px}.header-followers-layout{align-items:center}.profile-button-layout{display:flex;justify-content:center;align-items:center;background:var(--primary)}.profile-message-button{background:var(--lumo-primary-color);color:#fff;width:130px;margin-left:0;margin-right:0}.profile-fullname{color:#fff;font-size:15px;font-weight:700;position:relative;right:10px;width:234px}.profile-bio-text{position:relative;top:-100px}.profile-name{position:relative;top:-110px}.profile-cover-photo-image{height:140px;pointer-events:none;object-fit:cover}vaadin-avatar.profile-avatar{position:relative;top:-110px}.profile-layout{position:relative;top:-20p;background:var(--primary)}.profile-user-fullname{font-size:12px;color:#fff}.profile-user-avatar{width:45px;height:45px;margin-left:3px;margin-top:4px;pointer-events:none;border:1px solid gray}.profile-following-numbers{color:#fff;font-weight:700}.view-more{margin-left:20vh;font-size:13px;color:var(--lumo-primary-text-color)}.header-total-followers{font-size:14px;font-style:italic;margin:0}.profile-total-followers,.profile-total-artworks{font-size:12px;color:#fff;margin:0;padding:0}.divdiv1,.divdiv2{display:flex;justify-content:center;align-items:center;margin:0;font-size:11px}vaadin-button.profile-image-button{border-radius:10px;color:#fff;width:100%;background:var(--lumo-contrast-10pct);font-weight:700}vaadin-button.follow-button{width:130px;font-size:13px;color:#fff;background:var(--lumo-primary-color);font-weight:700}.no-followers{color:var(--lumo-contrast-40pct)}.div1,.div2,.div3{display:flex;justify-content:center;align-items:center;margin:0;font-size:11px}.follower-span{font-style:italic;color:#fff}.follower-image1,.follower-image2,.follower-image3{pointer-events:none;height:150px;width:100px;border-radius:20px}vaadin-button.unfollow-button{font-size:13px;width:130px;background:var(--button-contrast-color);color:#fff;font-weight:700}.profile-contact{color:#fff}vaadin-confirm-dialog-overlay.profile-more-dialog{-webkit-user-select:none;user-select:none}vaadin-confirm-dialog-overlay.profile-more-dialog::part(content){background:var(--lumo-shade-20pct)}vaadin-confirm-dialog-overlay.profile-more-dialog>[slot=confirm-button]{margin-top:15px;width:100px;border-radius:10px}vaadin-confirm-dialog-overlay.profile-more-dialog::part(footer),vaadin-confirm-dialog-overlay.profile-more-dialog::part(header){display:flex;justify-content:center;align-items:center;background:#00000080}vaadin-confirm-dialog-overlay.profile-more-dialog::part(overlay){border-radius:20px;border-bottom:1px solid gray;border-top:1px solid gray}.profile-contact-text{margin-left:50px;color:var(--lumo-contrast-80pct);font-style:italic;border-bottom:1px solid var(--lumo-contrast-70pct)}.profile-span{margin:0;color:#fff;font-weight:700}vaadin-button.profile-information{color:var(--lumo-contrast-80pct)}.profile-information-layout{margin:0;font-size:14px;background:#000;border-bottom:.5px solid gray;background:var(--primary)}vaadin-app-layout.profile-app-layout::part(navbar){align-items:center;margin:0;background:green;border-bottom:.5px solid var(--nav-border)}vaadin-icon.profile-back-button{color:#fff;margin:0 0 0 20px}.profile-text{font-style:italic;font-size:12px;margin-left:10px}.profile-follow-layout,.profile-artworks-layout{display:flex;justify-content:center;align-items:center}vaadin-app-layout.profile-app-layout[overlay]{background:#000;-webkit-user-select:none;user-select:none}.profile-name{color:#fff;font-weight:700;word-wrap:break-word;display:flex;justify-content:center;align-items:center}.profile-avatar{pointer-events:none;border:1px solid gray;width:130px;height:130px}.view-middle-div{justify-content:space-between;width:100%;margin:0;padding:0;position:relative;bottom:10px}.view-total-following{font-style:italic;font-size:13px;color:var(--lumo-contrast-90pct)}.view-exists-button{display:none}.view-avatar-div{align-items:center}.view-fullname{font-weight:700;color:#fff;font-size:15px;position:relative;right:15px}.view-avatar{pointer-events:none;border:1px solid var(--lumo-contrast-40pct)}vaadin-button.view-unfollow-button{display:flex;justify-content:center;align-items:center;font-size:10px;width:90px;height:30px;margin:0;border-radius:7px;color:#fff;background:var(--lumo-contrast-30pct)}vaadin-grid.view-grid::part(last-column-cell){width:1px;background:#000}vaadin-grid.view-grid::part(first-column-cell){width:135px;border:none}vaadin-grid.view-grid::part(row){margin:0;border:none}vaadin-grid.view-grid::part(cell){font-size:11px;margin:0;background:#000;border:none}vaadin-grid.view-grid{height:506px;background:#000;border:none}vaadin-button.view-follow-button{display:flex;justify-content:center;align-items:center;font-size:13px;width:90px;height:30px;margin:0;border-radius:7px;color:#fff;background:var(--lumo-primary-color)}vaadin-text-field.view-search-field>[slot=prefix]{margin-left:5px}vaadin-text-field.view-search-field>input:placeholder-shown{font-size:13px}vaadin-text-field.view-search-field{width:100%;margin-top:10p;margin-bottom:10p}vaadin-text-field.view-search-field::part(input-field){border-radius:20px;color:#fff;font-size:14px;background:(--text-field)}.view-total-followers{font-weight:700;color:var(--lumo-contrast-90pct);font-size:15px;color:#fff}.view-firstname{color:#fff}.no-posted-artworks{color:var(--lumo-contrast-70pct);font-size:14px}.images-like-icon,.images-heart-icon,.images-happy-icon{position:relative;padding:3px;font-size:13px;bottom:8px;border-radius:50%;color:#fff}.images-like-icon{background:var(--lumo-primary-color)}.images-heart-icon{right:5px;background:var(--lumo-error-color)}.images-happy-icon{right:10px;background:var(--lumo-warning-color)}.total-div{display:flex;align-items:center}.images-total-text{position:relative;font-size:10px;color:#fff;bottom:8px}.total-layout{background:var(--lumo-contrast-20pct);margin:0;padding:0;align-items:center;border-radius:7px}.posted-artworks{margin-top:10px;margim-bottom:10px;margin-left:30px;font-style:italic;font-weight:700;color:#fff}.column-layout{margin:0;width:100%;display:flex;justify-content:center;align-items:center}.images-picture{margin:0;pointer-events:none;width:140px;height:170px;border-radius:7px 7px 0 0;object-fit:cover}vaadin-form-layout.specific-form-layout{display:flex;justify-content:center;align-items:center}.specific-reaction-button>vaadin-icon,.specific-comment-button>vaadin-icon,.specific-share-button>vaadin-icon{width:30px;height:30px}.specific-share-button>vaadin-icon{color:var(--lumo-error-color)}.specific-comment-button::part(label),.specific-share-button::part(label),.specific-reaction-button::part(label){color:#fff;font-size:14px}.specific-comment-button>vaadin-icon{color:var(--lumo-success-text-color)}vaadin-button.specific-reaction-button,vaadin-button.specific-comment-button,.specific-share-button{background:var(--lumo-contrast-10pct);margin-top:5px;border-radius:20px;width:100px}.specific-buttons-layout{display:flex;justify-content:center;align-items:center;margin-left:15px}vaadin-app-layout.specific-app-layout::part(navbar){background:#000;border-top:.5px solid var(--lumo-contrast-60pct);border-bottom:.5px solid var(--lumo-contrast-60pct)}vaadin-app-layout.profile-app-layout,vaadin-app-layout.specific-app-layout[overlay]{background:#000}vaadin-app-layout.profile-app-layout::part(navbar){border-top:.5px solid gray;background:var(--primary)}.specific-image{pointer-events:none}vaadin-dialog-overlay.comment-dialog>div>div:nth-child(1){margin-bottom:10px;position:relative;bottom:10px}vaadin-dialog-overlay.comment-dialog>div{margin-left:45px}vaadin-dialog-overlay.comment-dialog>div>div>div>span{position:absolute;margin-top:50px;margin-right:25px;font-size:12px}vaadin-dialog-overlay.comment-dialog>div>div>div{width:60px;display:flex;justify-content:center;align-items:center}vaadin-dialog-overlay.comment-dialog div>div:nth-child(1){justify-content:center;padding:0}vaadin-dialog-overlay.comment-dialog div>div>div>vaadin-icon{font-size:55px;padding:0;animation:pulse 1s infinite}vaadin-dialog-overlay.comment-dialog div>div:nth-child(2)>div:nth-child(4){margin-right:20px}vaadin-dialog-overlay.comment-dialog div>div:nth-child(1)>div,vaadin-dialog-overlay.comment-dialog div>div:nth-child(2)>div:nth-child(1),vaadin-dialog-overlay.comment-dialog div>div:nth-child(2)>div:nth-child(2),vaadin-dialog-overlay.comment-dialog div>div:nth-child(2)>div:nth-child(3){margin-right:18px}vaadin-dialog-overlay.comment-dialog div>div>div{display:flex;flex-direction:column;padding:0;justify-content:center}vaadin-dialog-overlay.comment-dialog::part(overlay){border-radius:10px;border:1px solid var(--nav-border);width:100%;height:200px;background:#000;-webkit-user-select:none;user-select:none;justify-content:center}vaadin-dialog-overlay.comment-dialog div>div{display:flex;flex-direction:row;justify-content:center}vaadin-dialog-overlay.comment-dialog::part(content){justify-content:center;align-items:center;width:100%;background:var(--primary);overflow:hidden}.comment-dialog::part(content){background:var(--primary)}.comment-app-layout::part(navbar){background:var(--primary)}.comment-app-layout[overlay]{background:var(--primary)}.comment-footer-layout-1{padding:0;position:relative;left:25px}.comment-reacts-div{font-size:13px;width:120px;display:flex;align-items:center;position:relative;padding:0}.comment-view-reply{position:relative;bottom:15px;right:70px}.comment-comments{position:relative;bottom:15px}.comment-layout1{padding:12px 12px 0;position:relativ}.comment-div{position:relative;align-items:center;font-size:14px;padding:0;margin:0;bottom:15px;max-height:45px}.comment-layout2:first-child{padding-bottom:0}.comment-layout-2{padding:0 0 0 5px}.specific-form-layout{height:auto}.comment-virtual-list{padding-top:15px;height:auto}.reply-comments{color:#fff;max-width:320px;word-wrap:break-word}.comment-comments{max-width:245px}.comment-layout1{word-wrap:break-word}.reply-like{background:var(--lumo-primary-color);left:20px}.reply-heart{background:var(--lumo-error-color);left:5px}.reply-happy{background:var(--lumo-warning-color);right:10px}.reply-like,.reply-heart,.reply-happy{font-size:14px;padding:3px;border-radius:50%;color:#fff}.comment-like,.comment-heart,.comment-happy{font-size:12px;padding:3px;border-radius:50%}vaadin-icon.comment-happy{position:relative;right:10px;background:var(--lumo-warning-color)}.comment-like{background:var(--lumo-primary-color)}.comment-heart{position:relative;right:5px;background:var(--lumo-error-color)}.comment-time-ago{color:var(--lumo-contrast-70pct)}.comment-dialog>vaadin-vertical-layout{display:flex;justify-content:center;align-items:center}.comment-dialog>vaadin-vertical-layout>span{font-size:11px;margin-left:}.comment-date-time{color:var(--lumo-contrast-60pct);width:100%;text-align:center;font-size:13px}.comment-avatar{pointer-events:none;border:.5px solid gray;display:flex;justify-content:center}.comment-user-fullname{position:relative;right:30px}.comment-user-avatar{position:relative;right:35px;width:45px;height:45px;top:3px}.comment-user-layout{position:relative;align-items:center;background:var(--lumo-contrast-5pct);padding:5px 10px 5px 5px;border-radius:30px;width:100%;height:60px}.comment-more-icon{position:relative;left:285px;color:var(--lumo-primary-color)}.reacts{position:relative;right:8px}.comment-view-reply{font-style:italic;font-size:13px;color:var(--lumo-primary-text-color);margin-bottom:10p}. .commented{position:relative;left:90px}.reacted{position:relative;right:130px}.specific-reacts{position:relative;right:10px}vaadin-icon.reactions-like{margin-left:10px;font-size:13px;padding:4px;background:var(--lumo-primary-color);border-radius:50%;color:#fff}vaadin-icon.reactions-heart{margin-left:10px;font-size:13px;padding:4px;background:var(--lumo-error-color);border-radius:50%;color:#fff}vaadin-icon.reactions-happy{margin-left:10px;font-size:13px;padding:4px;background:var(--lumo-warning-color);border-radius:50%;color:#fff}.comment-reactions-div{background:var(--primary);width:100%;font-size:12px;color:#fff;align-items:center;height:25px}.reply-buttons:nth-child(2){margin-right:5px}.reply-buttons:nth-child(3){margin-left:5px}.reply-buttons:nth-child(4){margin-left:10px}.reply-buttons:nth-child(1){margin-right:10px}.reply-like,.reply-heart,.reply-happy,.reply-reacts{position:relative;left:20p;margin:5p;font-size:12px}.reply-reacts-div{background:var(--lumo-contrast-10pct);border-top:.5px solid var(--lumo-contrast-10pct)}.reply-buttons-layout{color:#fff;display:flex;justify-content:center;align-items:center;background:var(--lumo-contrast-20pct);height:40px;border-radius:0 0 30px 30px}.reply-user-avatar{width:60px;height:60px;border:.5px solid gray}.reply-fullname{color:var(--lumo-contrast-80pct)}.reply-parent-layout{width:100%;background:var(--lumo-contrast-10pct);display:flex;justify-content:center;align-items:center;border-radius:30px 30px 0 0}.reply-user-avatar{pointer-events:none}vaadin-icon.like-react-icon:active,vaadin-icon.heart-react-icon:active,vaadin-icon.happy-react-icon:active{font-size:30px}vaadin-icon.heart-react-icon{font-size:30px;padding:10px;margin-bottom:10px;margin-top:10px;background:var(--lumo-error-color);border-radius:50%;animation:pulse 1s infinite;color:#fff}vaadin-icon.happy-react-icon{font-size:30px;padding:10px;margin-bottom:10px;margin-top:10px;background:var(--lumo-warning-color);border-radius:50%;animation:pulse 1s infinite;color:#fff}.reacts,.comment-title{color:#fff;white-space:pre-wrap}vaadin-button.comment-reacts::part(label){color:var(--lumo-contrast-80pct);font-family:serif}vaadin-button.comment-reacts{background:none;color:var(--lumo-primary-color)}.no-comments{margin-left:100px;color:var(--lumo-contrast-70pct);font-style:italic}.comment-user-avatar{pointer-events:none;border:.5px solid gray}.comment-user-header-layout{background:var(--primary);display:flex;justify-content:center;border-top:.5px solid var(--nav-border)}.comment-user-fullname{font-size:12px;color:#fff}vaadin-button.feed-comment,vaadin-button.feed-like,vaadin-button.feed-heart{background:var(--lumo-contrast-5pct);margin-top:5px;margin-bottom:5px;border-radius:20px}.comment-buttons{margin-right:15p;color:var(--lumo-contrast-70pct)}.comment-layout1{margin:0;background:var(--lumo-contrast-10pct);border-radius:20px;max-width:270px;word-wrap:break-word}.comment-fullname{font-size:13px;font-weight:700;color:#fff}.comment-comments{color:#fff;word-wrap:break-word}vaadin-text-area.comment-input-field>textarea:placeholder-shown{position:relative;top:10p;height:100%;justify-content:center}vaadin-text-area.comment-input-field::part(input-field){margin-right:10px;width:240p;height:auto;border:.7px solid var(--lumo-contrast-30pct)}.comment-upload{color:var(--lumo-contrast-50pct);margin-left:20px;margin-right:10px}vaadin-button.comment-send-icon>vaadin-icon{font-size:25px}vaadin-button.comment-send-icon{color:var(--lumo-contrast-50pct);background:none;margin-left:40p}.comment-button-layout{display:flex;justify-content:center;align-items:center;background:var(--lumo-contrast-10pct);border-bottom:.5px solid var(--lumo-contrast-30pct)}vaadin-icon.comment-back-icon{color:#fff;margin-left:20px;margin-right:15px}.comment-first-name{color:#fff;font-size:15px}.reply-mentioned-layout{all:unset;display:flex;flex-direction:column;position:relative;top:10px;left:35px}.reply-comma{color:#fff}.reply-remove-icon{color:var(--lumo-error-color);font-size:20px;position:relative;right:7px}.reply-mentioned-layout{width:200px}.reply-upload{all:unset;position:absolute;bottom:0;left:10px;color:var(--lumo-contrast-50pct);margin-bottom:30px}.reply-upload-and-input-layout{width:100%;align-items:center;padding:0;margin:0;text-overflow:auto}vaadin-text-area.comment-input-field>textarea:placeholder-shown{position:relative;top:10px}vaadin-text-area.comment-input-field::part(input-field){margin-right:10px;width:300px;border-radius:30px;overflow:hidden;position:relative;left:45px;align-items:center}.reply-input-layout{padding:0;width:200px;text-overflow:auto}.reply-mentioned-span{color:var(--lumo-primary-color);white-space:pre-wrap;position:relative;top:10p;left:35p;width:300px;font-size:14px}.comment-input-field{margin-bottom:10px}.comment-input-field::part(label){color:var(--lumo-primary-color);position:relative;bottom:5px}.comment-comments{white-space:pre-wrap}.reply-mentioned-user{color:var(--lumo-primary-color)}.reply-footer-div-1{font-size:13px;width:100px;display:flex;align-items:center;position:relative;padding:0;right:15px}.reply-reacts,.reacts{margin-left:10px}.reply-comment-fullname{font-weight:700;color:#fff;font-size:13px}.reply-comment-avatar{pointer-events:none}.reply-main-layout{padding:0;margin-bottom:20px;height:100p;position:relative;height:auto}.reply-layout2:first-child{padding-bottom:0}.reply-layout-2{padding:10px 0 10px 5px;position:relative}.reply-footer-layout-1{padding:0;position:absolute;left:60px;font-size:13px;bottom:-25px}.reply-like1{background:var(--lumo-primary-color);left:20px}.reply-heart1{background:var(--lumo-error-color);left:10px}.reply-happy1{background:var(--lumo-warning-color)}.reply-like1,.reply-heart1,.reply-happy1{font-size:14px;padding:3px;border-radius:50%;color:#fff;position:relative}.reply-footer-like{background:var(--lumo-primary-color);left:20px}.reply-footer-heart{background:var(--lumo-error-color);left:10px}.reply-footer-happy{background:var(--lumo-warning-color)}.reply-footer-like,.reply-footer-heart,.reply-footer-happy{font-size:14px;padding:3px;border-radius:50%;color:#fff;position:relative}.reply-reacts-div{font-size:13px;width:100px;display:flex;align-items:center;position:relative;padding:0}.reply-layout{padding:12px 12px 0;margin:0;background:var(--lumo-contrast-10pct);border-radius:20px;max-width:270px;word-wrap:break-word}.reply-footer-div{position:relative;align-items:center;font-size:14px;padding:0;margin:0;bottom:15px;max-height:45px}.reply-comments{max-width:250p}.all-users-dialog vaadin-text-field>input:placeholder-shown{margin-left:5px}.all-users-dialog vaadin-text-field::part(input-field){border-radius:20px;color:#fff;font-size:14px}.all-users-dialog vaadin-text-field{width:100%}vaadin-grid.all-users-grid::part(last-column-cell){width:20px}vaadin-grid.all-users-grid::part(first-column-cell){width:180px;border:none;margin-top:20px}vaadin-grid.all-users-grid::part(row){margin:0;border:none}vaadin-grid.all-users-grid::part(cell){font-size:12px;margin:0;background:transparent;border:none}vaadin-grid.all-users-grid{background:transparent;margin-top:20px;border:none;-webkit-user-select:none;user-select:none}vaadin-dialog-overlay.all-users-dialog::part(header){background:var(--lumo-contrast-10pct);text-color:green}vaadin-dialog-overlay.all-users-dialog::part(content){background:var(--lumo-contrast-10pct)}vaadin-dialog-overlay.all-users-dialog::part(overlay){border-radius:20px;border:.9px solid gray;background:#000;-webkit-user-select:none;user-select:none;width:100%}.all-users-div span{margin-left:10px}.all-users-div{display:flex;align-items:center;width:100%;height:100%}vaadin-button.post-more-button:active{border-bottom:1px solid var(--lumo-primary-color)}vaadin-button.post-more-button>vaadin-icon{color:var(--lumo-contrast-30pct)}vaadin-button.post-more-button::part(content){width:100%}vaadin-button.post-more-button{color:#fff;background:transparent;border-radius:10px}vaadin-dialog-overlay.post-more-dialog::part(overlay){position:relative;left:40px;bottom:40px;border-radius:30px;border:.9px solid gray;background:#000;margin:none;padding:none}vaadin-dialog-overlay.post-more-dialog{animation:fadeInRight .5s none}vaadin-dialog-overlay.post-more-dialog::part(header),vaadin-dialog-overlay.post-more-dialog::part(content){background:#000;background:var(--lumo-contrast-10pct);color:#fff}.total-replies{position:relative;left:100px;font-size:13px}.main-follower-header-layout>vaadin-button{background:var(--button-contrast-color);border-radius:20px;color:#fff;font-weight:700;margin:0}.main-follower-header-layout>vaadin-button:nth-child(1){margin-left:10px}.main-follower-all-button{justify-content:center}.main-follower-all-button>vaadin-button{color:#fff;font-weight:700;width:330px;height:35px;border-radius:10px;background:var()--button-contrast-color}.notif-search-icon{background:var(--lumo-contrast-10pct);padding:8px;border-radius:50%;font-size:25px}.main-followers-text-1{font-weight:700;font-size:23px;margin-left:10px;color:#fff}.main-follower-header-layout-1{justify-content:space-between;align-items:center;width:100%;position:absolute}.main-follower-middle-layout{all:unset}.main-follower-buttons-layout>vaadin-button{color:#fff;font-weight:700;font-size:14px;width:105px;height:33px;border-radius:7px}.main-follower-buttons-layout>vaadin-button:nth-child(1){background:var(--lumo-primary-color)}.main-follower-buttons-layout>vaadin-button:nth-child(2){background:#393a3c}.main-follower-buttons-layout{width:100%;justify-content:center}.main-follower-request-avatar{width:90px;height:90px;border:.5px solid var(--lumo-contrast-30pct);pointer-events:none}.main-follower-name-layout>span:nth-child(2){color:var(--lumo-contrast-50pct);font-size:11px}.main-follower-name-layout{width:100%;justify-content:space-between;margin:0 0 5px;color:#fff;font-size:14px}.main-follower-middle-layout,.main-follower-buttons-layout,.main-follower-name-layout{padding:0}.main-follower-child-layout{align-items:center;width:100%}.main-follower-parent-layout{height:100%}.main-follower-request-all-text{color:var(--primary-text-color)}.main-follower-request-text{color:#fff;font-weight:700;font-size:14px}.main-follower-request-header{margin-top:10px;align-items:center;justify-content:space-between;width:100%}.main-follower-form-layout{background:var(--primary);height:100%;overflow-y:auto}.main-follower-app-layout::part(navbar){background:var(--primary);margin-top:57px;height:40px}.main-follower-app-layout[overlay]{background:var(--primary);-webkit-user-select:none;user-select:none}.main-follower-header-layout{font-weight:700;margin-top:10px}.follower-dialog-main>vaadin-horizontal-layout:nth-child(3)>vaadin-vertical-layout>span:nth-child(2),.follower-dialog-main>vaadin-horizontal-layout:nth-child(4)>vaadin-vertical-layout>span:nth-child(2){color:#797e81}.follower-dialog-main>vaadin-horizontal-layout>vaadin-icon{color:#fff;font-size:30p;width:50px;height:45px;padding:12px;background:#393a3c;border-radius:50%}.follower-dialog-main>vaadin-horizontal-layout:nth-child(3)>vaadin-vertical-layout,.follower-dialog-main>vaadin-horizontal-layout:nth-child(4)>vaadin-vertical-layout{all:unset;display:flex;flex-direction:column;width:100%}.follower-dialog-main>vaadin-horizontal-layout:nth-child(2),.follower-dialog-main>vaadin-horizontal-layout:nth-child(3),.follower-dialog-main>vaadin-horizontal-layout:nth-child(4){padding:0;align-items:center;width:100%}.follower-dialog-main>vaadin-button>vaadin-icon{font-size:30px;padding:12px;background:var(--lumo-contrast-10pct);border-radius:50%;margin-right:5px}.follower-dialog-main>vaadin-button{background:transparent;color:#fff;height:50px;width:358p;margin:0;position:relative;right:15px;border-radius:0;justify-content:center}.follower-dialog-name-layout>span:nth-child(2){color:#797e81}.follower-dialog-name-layout>span:nth-child(1){color:#fff;font-weight:700}.follower-dialog-avatar{width:50px;height:50px}.follower-dialog-header{align-items:center;padding:0 0 10px;width:100%;border-bottom:.5px solid var(--lumo-contrast-40pct)}.follower-dialog-name-layout{all:unset;display:flex;flex-direction:column}.dialog-click{position:fixed;top:;left:0;right:0;height:100vh}.dialog-overlay{display:flex;position:absolute;bottom:0;left:0;height:100%;background:var(--lumo-shade-50pct)}.custom-bottom-sheet{position:fixed;bottom:0;left:0;right:0;width:100v;height:auto;background:#000;border-top-left-radius:15px;border-top-right-radius:15px;transform:translateY(100%);transition:transform .3s ease-in-out}.follower-dialog-main{background:#242527;border-top-left-radius:15px;border-top-right-radius:15px;justify-content:center}.full-screen-dialog::part(content){width:100%!important;height:100%!important;display:flex;flex-direction:column;padding:0!important;margin:0!important;all:unset}.total-followers-layout{width:100%;justify-content:space-between;color:#6ca7ed}.follower-name-layout>span:nth-child(1){font-size:15px}.follower-name-layout>span:nth-child(2){font-size:12px;color:var(--lumo-contrast-70pct)}.follower-avatar{width:60px;height:60px;pointer-events:none;border:.5px solid var(--lumo-contrast-30pct)}.follower-name-layout{padding:0;all:unset;display:flex;flex-direction:column;color:#fff}.follower-parent-layout{align-items:center;padding:0;width:100%}.total-followers{color:#fff;font-weight:700}.follower-main-layout{background:var(--primary);height:100%;overflow:auto;padding:}.follower-search-icon{color:#fff;position:relative;right:5px;font-size:20px}.follower-nav-header{align-items:center;width:100%;border-bottom:1px solid var(--nav-border);position:relative;top:10px;height:100%;padding-bottom:5px;padding-left:5px}.follower-nav-footer{width:100%;align-items:center;padding-right:10px;padding-left:10px;padding-bottom:5px}.follower-nav-main{width:100%;padding:0}.follower-delete-button{margin-bottom:20px;margin-top:20px}.follower-delete-button,.follower-view-button{align-items:center}.follower-action-icon{background:var(--lumo-contrast-10pct);padding:10px;border-radius:50%;height:44px;width:44px}.follower-action-text{color:#fff;font-weight:700;font-size:15px}.follower-more-dialog::part(content){width:328px}.follower-more-dialog::part(content),.follower-more-dialog::part(header){background:var(--lumo-contrast-20pct)}.follower-more-dialog::part(overlay){color:#fff;font-weight:700;background:#000;position:absolute;top:484px;border-radius:25px 25px 0 0;-webkit-user-select:none;user-select:none}.view-search-layout{height:100%;background:var(--lumo-contrast-10pct);overflow-x:auto;-webkit-user-select:none;user-select:none}.follower-back-button{font-size:25px;color:#fff}.follower-app-layout::part(navbar){background:var(--primary)}.follower-app-layout[overlay]{background:#000}.follower-header-layout{width:100%;align-items:center;justify-content:space-between;padding:0;margin:0;height:22px}.follower-main-layout{height:100%}.follower-middle-layout{padding-bottom:0;position:relative;border-bottom:.5px solid var(--lumo-contrast-30pct);-webkit-user-select:none;user-select:none}.follower-full-name{color:#fff;font-size:12px;width:148px}.follower-child-layout{width:100%;height:100%;align-items:center;justify-content:space-between;position:relative}.follower-offline{border-radius:50%;width:10px;height:10px;background:var(--lumo-error-text-color)}.follower-online{border-radius:50%;width:10px;height:10px;background:var(--lumo-success-text-color)}vaadin-button.post-more-button>vaadin-icon{color:var(--lumo-error-color)}vaadin-confirm-dialog-overlay.delete-follower-dialog::part(header){display:flex;justify-content:center}vaadin-confirm-dialog-overlay.delete-follower-dialog::part(header),vaadin-confirm-dialog-overlay.delete-follower-dialog::part(footer),vaadin-confirm-dialog-overlay.delete-follower-dialog::part(content){background:#000;background:var(--lumo-contrast-10pct);-webkit-user-select:none;user-select:none;color:#fff}vaadin-confirm-dialog-overlay.delete-follower-dialog vaadin-text-field>[slot=prefix]{margin-left:5px}vaadin-confirm-dialog-overlay.delete-follower-dialog vaadin-text-field>input:placeholder-shown{font-size:13px}vaadin-confirm-dialog-overlay.delete-follower-dialog vaadin-text-field::part(input-field){border-radius:20px;color:#fff;font-size:13px;background:#000;background:var(--lumo-contrast-10pct)}vaadin-confirm-dialog-overlay.delete-follower-dialog vaadin-text-field{width:100%}vaadin-confirm-dialog-overlay.delete-follower-dialog>[slot=confirm-button]{border-radius:20px;color:#fff;font-weight:700}vaadin-confirm-dialog-overlay.delete-follower-dialog>[slot=cancel-button]{border-radius:20px;color:#fff;background:var(--lumo-primary-color);font-weight:700}vaadin-confirm-dialog-overlay.delete-follower-dialog::part(overlay){background:#000;border:.5px solid gray;border-radius:20px;-webkit-user-select:none;user-select:none}.follower-confirm-text{font-size:15px;font-style:italic}vaadin-confirm-dialog-overlay.follower-dialog::part(header),vaadin-confirm-dialog-overlay.follower-dialog::part(content),vaadin-confirm-dialog-overlay.follower-dialog::part(footer){background:#000;background:var(--lumo-contrast-10pct)}vaadin-confirm-dialog-overlay.follower-dialog::part(overlay){background:#000;border:.5px solid gray;border-radius:20px;-webkit-user-select:none;user-select:none}vaadin-confirm-dialog-overlay.follower-dialog>[slot=cancel-button]{background:var(--lumo-primary-color);color:#fff;border-radius:20px;font-weight:700}vaadin-confirm-dialog-overlay.follower-dialog>[slot=confirm-button]{background:var(--lumo-error-color);color:#fff;border-radius:20px;font-weight:700}.view-avatar-div{width:100%}.follower-delete-icon{color:var(--lumo-error-color);margin-left:5px}.follower-more-icon{margin-left:120px}.saved-post-buttons vaadin-icon{background:var(--lumo-contrast-20pct);width:50px;height:50px;padding:15px;border-radius:50%}.saved-post-buttons:active{background:var(--lumo-contrast-10pct)}.saved-post-buttons{-webkit-user-select:none;user-select:none;width:100%;background:none;border-radius:0;color:#fff;align-items:center;margin:0}.total-saved-posts{font-size:14px;color:var(--lumo-contrast-50pct);margin-left:15px}vaadin-dialog-overlay.unsave-dialog::part(content){width:100%;background:var(--lumo-contrast-10pct)}vaadin-dialog-overlay.unsave-dialog::part(overlay){position:absolute;top:16px;height:650px;width:100%;background:#000;border-radius:20px 20px 0 0}vaadin-dialog-overlay.unsave-dialog{position:absolute;top:430px}.saved-parent-layout vaadin-icon{color:var(--lumo-primary-color);margin-right:30px}.saved-name{font-size:12px}.saved-date-time{font-style:italic;font-size:10px;color:var(--lumo-contrast-60pct)}.saved-parent-layout{align-items:center;background:var(--lumo-contrast-10pct)}.saved-image{max-width:57px;height:80px;border-radius:10px;pointer-events:none;margin-left:20px;object-fit:cover}vaadin-app-layout.reacted-app-layout{background:#000}vaadin-app-layout.reacted-app-layout::part(navbar){background:#000;display:flex;align-items:center}vaadin-app-layout.reacted-app-layout span{display:flex;align-items:center}vaadin-app-layout.reacted-app-layout vaadin-icon{font-size:25px;color:#fff}.notification-text{position:absolute;left:28px;background:var(--lumo-error-color);font-size:12px;padding:5px;border-radius:20px;height:10px;display:flex;align-items:center;bottom:20px;font-weight:700;color:#fff}.notif-reply-icon{background:var(--lumo-success-text-color)}.notif-follow-icon,.notif-touch-icon{background:var(--lumo-base-color)}.notif-haha-icon{background:var(--lumo-warning-color)}.notif-love-icon{background:var(--lumo-error-color)}.notif-like-icon{background:var(--lumo-primary-color)}.notif-comment-icon{background:var(--lumo-success-color)}.notif-comment-icon,.notif-like-icon,.notif-love-icon,.notif-haha-icon,.notif-touch-icon,.notif-follow-icon,.notif-reply-icon{position:absolute;left:55px;top:250p;margin-top:35px;padding:5px;border-radius:50%;color:#fff}.notif-dialog-header-layout>vaadin-avatar{height:45px;width:45px;border:1px solid var(--lumo-contrast-70pct);pointer-events:none}.notif-line-div{background:var(--lumo-contrast-30pct);height:1px;margin:10px 15px 15px}.notif-dialog-header-layout{width:100%;align-items:center;text-align:center;margin-top:20px;padding:0 5px}.notif-dialog-layout:last-child{position:relative;top:12px;margin-bottom:25px}.notif-dialog-layout>vaadin-icon{background:var(--button-contrast-color);padding:12px;border-radius:50%;height:45px;width:45px}.notif-dialog-layout{width:100%;align-items:center;padding:0;margin-left:15px;margin-right:15px}.notif-dialog::part(content){width:328px}.notif-dialog::part(content),.notif-dialog::part(header){background:var(--lumo-contrast-20pct);height:100%}.notif-dialog::part(overlay){color:#fff;background:#000;position:absolute;bottom:-16px;border-radius:25px 25px 0 0;-webkit-user-select:none;user-select:none;width:100vh}.notif-user-names{font-weight:700;color:#fff}.notif-message{font-size:14px;color:whit;white-space:pre-wrap}.notif-more-icon{font-size:11px;color:var(--lumo-contrast-60pct);margin-right:10px}.notif-avatar:first-child{margin-top:5px}.notif-avatar{width:65px;height:65px;border:1px solid var(--lumo-contrast-40pct);pointer-events:none;margin-left:5px}.notif-main-layout{background:var(--primary);height:100%;overflow-y:auto}.notif-middle-layout{position:relative;align-items:center;width:100%;padding:5px}.notif-message-layout{all:unset;display:flex;flex-direction:column}.notif-time-ago{color:var(--lumo-contrast-40pct);font-size:14px}.notif-header-layout{width:100%;justify-content:space-between;align-items:center;color:#fff}.notif-search-icon{margin-right:15px}.notif-text{font-weight:700;font-size:20px;position:relative;right:75px}vaadin-form-layout::-webkit-scrollbar{display:none}vaadin-form-layout{height:100%;overflow-y:auto;overflow-x:hidden}vaadin-avatar{pointer-events:none}.lazy-component-loader{position:relative;border:.5em solid rgba(37,37,37,.2);border-left:.5em solid #252525;border-radius:50%;width:100%;height:100%;max-width:35px;max-height:35px;margin:auto;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.lazy-component-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:#ccc;opacity:.8;display:flex}.lazy-component-container{position:relative}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:root{--primary: #242527;--secondary: #797E81;--nav-border: #666769;--primary-text-color: #6CA7ED;--button-contrast-color: #393A3C;--text-field: #393A3C;--hover-color: #656668;--sheet-error-color: #FC5777;--block-error-color: #DF484F;--block-text-color: #B0B4B7;--block-button-error-color: #FB3C44;--text-area-color: #333436}.main-layout-tabs vaadin-tab:before{width:100px;background:transparent}.main-layout-tabs[orientation=horizontal]{all:unset}.main-layout-tabs vaadin-tab[selected]>vaadin-icon:nth-child(1){stroke-width:10px;fill:var(--lumo-primary-color)}.main-layout-tabs vaadin-tab[selected]>vaadin-icon{color:var(--lumo-primary-color)}.main-layout-tabs vaadin-tab>vaadin-icon{font-size:20px;color:#fff}.main-layout-tabs::part(tabs){justify-content:space-between;bax-shadow:none}.main-layout-tabs{width:359px;bax-shadow:none}.main-layout-tabs vaadin-tab{bax-shadow:none;margin-right:15px}.main-layout-header{width:100%;justify-content:space-between}body{-webkit-user-select:none;user-select:none}.main-group-icon{color:var(--lumo-primary-color);margin-right:160px;position:relative;left:10px}.logout-button::part(label){position:relative;right:78px}.logout-button>vaadin-icon{padding:15px;width:50px;margin-right:15px;height:50px;background:var(--lumo-contrast-20pct);border-radius:50%;position:relative;right:78px}.logout-button{background:transparent;width:100%;height:50px;display:flex;color:#fff;border-radius:30px}.drawer-linkss{color:#fff;width:100%}.nav-icons{width:30px;height:30px}.nav-icon{padding:15px;width:50px;margin-right:20px;height:50px;background:var(--lumo-contrast-20pct);border-radius:50%}image{pointer-events:none}vaadin-app-layout.app-layout::part(navbar){border-bottom:1px solid black}.emcview-layout{border-radius:10px;border-top:1px solid white;border-bottom:1px solid white;background:linear-gradient(to left,#1fd7e8df,#021d4eae 40%)}.main-emc{animation:fadeInDown .9s none;padding:0;background:#000;background-size:cover;overflow-y:scroll}.display{font-size:24px;text-align:right;padding:0;border:1px solid #ccc;margin-bottom:10px}.buttonlayout{display:grid;grid-template-columns:repeat(4,1fr)}vaadin-button.btn{margin:var(--lumo-space-xs);width:40px;height:60px}.image-icon{fill:#0ef}vaadin-app-layout.app-layout[overlay]{background:#000}vaadin-app-layout.app-layout::part(navbar){background:#000;background:var(--primary)}.toggle{width:30px;height:30px;color:#0ef;border-radius:20px}.nav-details vaadin-details-summary:active{color:#0ef}.drawer-links{color:#fff}vaadin-icon.nav-icons{color:#0ef;margin-right:10px;width:17px;height:17px;margin-left:20px}.nav-details vaadin-details-summary::part(toggle){color:#0ef;margin-right:20px;margin-left:5px}.nav-details vaadin-details-summary{color:#fff;font-size:}.anchor{margin-bottom:15px;margin-left:60px}.nav-line{height:.9px;width:100%;background:#0ef}.username{font-size:13px;color:#fff}.drawer-link{width:100%;color:#fff}.user-name{font-size:15px;font-family:fantasy}.settings-icon{background:transparent;color:#fff}.avatar{position:relative;display:inline-block;width:42px;height:42px;border:1px solid gray;background-size:cover}.header-content{border-radius:40px;padding:5px;margin-bottom:10px;position:top}.header-layout{margin-left:50px;margin-bottom:100px}.nav-header-layout{max-height:700px;margin-bottom:}.update-button{margin-left:120px;margin-top:300px;border:1px solid #0ef;color:#fff;background:transparent;width:100px;height:50px;border-radius:40px}.update-button:hover{scale:.91;color:#000;background:#0ef;border:1px solid white}.word{color:#fff}.logo{font-size:15px;font-family:monospace;color:#fff}.settings-avatar{border:1px solid #0ef;border-top:1px solid #0ef}vaadin-message-list.message-list vaadin-message::part(icon){border:1px solid rgb(0,255,255);color:green}.send-icon{border:1px solid rgb(0,255,255);margin-top:13px;size:15px;border-radius:40px;padding:15px 10px;margin-left:80px;background:;width:70px;height:60px;color:#0ff}vaadin-icon.send-icon:active{scale:.92;color:#000;border:1px solid white;background:#0ff;outline-color:#0ff;box-shadow:-3px -3px 15px #0ff;transition:.1s;transition-property:box-shadow}vaadin-text-field.input::part(input-field){background-color:#212121;height:60px;padding:10px;border:1px solid rgb(0,255,255);border-radius:40px;margin:30px 10px 11px 5px;width:257px}vaadin-text-field.input[focused]>[slot=suffix]{color:#0ff}vaadin-text-field.input>[slot=suffix]{color:#fff}vaadin-text-field.input[focused]::part(input-field){color:#0ff;background-color:#212121;outline-color:#0ff;box-shadow:-3px -3px 15px #0ff;transition:.1s;border:1px solid white;transition-property:box-shadow}vaadin-button.close{border-radius:30px;border:.5px solid skyblue;font-size:15px;background:transparent;color:#fff;border-bottom:1px solid #0ef;border-top:1px solid #0ef}vaadin-button.save{border-radius:30px;border:.5px solid lightblue;font-size:15px;background:transparent;color:#fff;border-bottom:1px solid #0ef;border-top:1px solid #0ef}vaadin-confirm-dialog-overlay.view-dialog>[slot=cancel-button]{font-size:15px;color:#fff;width:100px;margin-left:90px;border-radius:20px;border-bottom:1px solid #0ef;border-top:1px solid #0ef}vaadin-confirm-dialog-overlay.view-dialog>[slot=confirm-button]{background:transparent;font-size:15px;font-weight:5px;color:#fff;width:100px;margin-left:90px;border-radius:20px;border-bottom:1px solid #0ef;border-top:1px solid #0ef}vaadin-confirm-dialog-overlay.view-dialog::part(overlay){-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background:var(--lumo-contrast-50pct);color:#000;border-top:1px solid #0ef;border-bottom:1px solid #0ef}vaadin-confirm-dialog-overlay.view-dialog::part(header){background:transparent;color:#000;font-size:10px}vaadin-confirm-dialog-overlay.view-dialog::part(footer){background:transparent}vaadin-app-layout.comments-main[overlay]{background:var(--lumo-shade-30pct)}vaadin-app-layout.comments-main::part(navbar){background:#000;border-radius:20px;border-top:.5px solid rgb(0,255,255);border-bottom:.5px solid rgb(0,255,255)}.nav-header-layout{border-radius:0 20px 20px 0;justify-content:center;margin-bottom:;background:#000;border-right:1px solid #0ef}vaadin-app-layout.app-layout::part(drawer){border-radius:0 20px 20px 0;background:#000;border-right:1px solid gray}vaadin-dialog-overlay.dialog::part(header){background:transparent}vaadin-dialog-overlay.dialog::part(footer){background:transparent}.image{border-radius:10px;border-bottom:2px solid #0ef;border-top:2px solid #0ef}vaadin-dialog-overlay.dialog::part(overlay){border-radius:50px;padding:20px;border-bottom:2px solid #0ef;border-top:2px solid #0ef;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background:var(--lumo-contrast-50pct)}.settings-avatar{width:100px;height:100px}vaadin-message-list.message-list::part(list){background:;overflow-x:hidden;padding:0;width:343px}vaadin-message[theme~=message]>vaadin-avatar{border-top:1px solid #0ef;border-bottom:1px solid #0ef}vaadin-message[theme~=message]::part(content){background:var(--lumo-contrast-10pct);border-radius:20px;border-top:1px solid #0ef;border-bottom:1px solid #0ef;padding:10px;max-width:300px;margin-right:85px}.back-icon{color:#0ff}.comments-main{animation:fadeInDown .9s none;background:var(--lumo-shade-90pct)}.pen-name{font-style:italic}.comments-dialog{justify-content:center;align-items:center}.cancel{border-radius:30px;border:.5px solid lightblue;font-size:18px;background:transparent;color:#fff;border-bottom:1px solid #0ef;border-top:1px solid #0ef;padding-left:13px;padding-right:13px}.okay-button{border-bottom:1px solid #0ef;border-top:1px solid #0ef;color:#fff;background:#0c6ce9}.view-icon{width:30px;height:30px;color:#0ef}.more-icon{width:30px;height:30px;color:#fff;margin-left:20px}.heart-icon{width:30px;height:30px;color:#0ef;margin-left:10px}.view-button{margin-left:20px;margin-right:20px;color:#fff;width:30px;height:30px}.comment-button{width:30px;height:30px;color:#0ef}.dialog-header{color:#fff;font-style:italic;font-size:15px}.register-button{color:#fff;background:#0c6ce9}.icon{color:#fff;margin-right:110px;background-color:gray}.add-artwork-main{font-size:15px;color:var(--lumo-contrast-70pct);padding-left:10px;padding-right:10px}:root{background:var(--lumo-shade-90pct);padding-bottom:0;border:none;margin:0;animation:animate_fadeInLeft;--animate-duration: .8s;--animate-delay: 2s}.scroller{color:#fff}.nav-username{font-style:italic;font-weight:700;color:#fff;display:none}.nav-header-avatar{border-top:1px solid #0ef;border-bottom:1px solid #0ef;width:170px;height:170px}.emc-header{background-color:red;color:#fff;margin-top:0}.student-name{animation-name:zoomIn;font-weight:700;color:#fff}.course{font-size:20px;font-weight:none;font-family:cursive;color:#fff}a[highlight]{font-weight:700;text-decoration:underline}.settings-layout{margin-top:0;justify-content:center;align-items:center;text-color:white;border-radius:0;background:radial-gradient(circle,#a9a9a9,#a9a9a9)}.register-form{width:100%;max-width:700px;color:#fff}`,mi=a=>{const t=[];a!==document&&(t.push(J(ae.cssText,"",a,!0)),t.push(J(oe.cssText,"",a,!0)),t.push(J(pa.cssText,"",a,!0)),t.push(J(ie.cssText,"",a,!0)),t.push(J(re.cssText,"",a,!0)),t.push(J(pi.toString(),"",a)))},fi=mi;fi(document);export{vi as T,Vt as _,x as a,Xo as b,ea as c,Bo as d,P as e,oe as f,ae as g,So as h,J as i,yo as j,y as k,_o as l,zo as m,bi as n,Ct as r,la as t,q as w,fo as x};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
