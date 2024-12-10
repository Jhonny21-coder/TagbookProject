(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.webPush=!1;window.Vaadin.featureFlags.formFillerAddon=!1;window.Vaadin.featureFlags.reactRouter=!1;const Vn="modulepreload",Dn=function(t,e){return new URL(t,e).href},qo={},f=function(e,o,i){let n=Promise.resolve();if(o&&o.length>0){const r=document.getElementsByTagName("link");n=Promise.all(o.map(s=>{if(s=Dn(s,i),s in qo)return;qo[s]=!0;const l=s.endsWith(".css"),a=l?'[rel="stylesheet"]':"";if(!!i)for(let h=r.length-1;h>=0;h--){const u=r[h];if(u.href===s&&(!l||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${a}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":Vn,l||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),l)return new Promise((h,u)=>{d.addEventListener("load",h),d.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${s}`)))})}))}return n.then(()=>e()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};function wt(t){return t=t||[],Array.isArray(t)?t:[t]}function te(t){return`[Vaadin.Router] ${t}`}function jn(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const _t="module",Et="nomodule",uo=[_t,Et];function Go(t){if(!t.match(/.+\.[m]?js$/))throw new Error(te(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Zi(t){if(!t||!Z(t.path))throw new Error(te('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!_e(t.action)&&!Array.isArray(t.children)&&!_e(t.children)&&!St(e)&&!o.some(i=>Z(t[i])))throw new Error(te(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(Z(e))Go(e);else if(uo.some(i=>i in e))uo.forEach(i=>i in e&&Go(e[i]));else throw new Error(te('Expected route bundle to include either "'+Et+'" or "'+_t+'" keys, or both'));t.redirect&&["bundle","component"].forEach(i=>{i in t&&console.warn(te(`Route config "${t.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function Ko(t){wt(t).forEach(e=>Zi(e))}function Jo(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===_t?o.setAttribute("type",_t):e===Et&&o.setAttribute(Et,""),o.async=!0),new Promise((i,n)=>{o.onreadystatechange=o.onload=r=>{o.__dynamicImportLoaded=!0,i(r)},o.onerror=r=>{o.parentNode&&o.parentNode.removeChild(o),n(r)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&i()})}function Un(t){return Z(t)?Jo(t):Promise.race(uo.filter(e=>e in t).map(e=>Jo(t[e],e)))}function We(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function St(t){return typeof t=="object"&&!!t}function _e(t){return typeof t=="function"}function Z(t){return typeof t=="string"}function en(t){const e=new Error(te(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Ne=new class{};function Fn(t){const e=t.port,o=t.protocol,r=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${r}`}function Yo(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const a=o[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Fn(e))!==window.location.origin)return;const{pathname:n,search:r,hash:s}=e;We("go",{pathname:n,search:r,hash:s})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const Bn={activate(){window.document.addEventListener("click",Yo)},inactivate(){window.document.removeEventListener("click",Yo)}},Hn=/Trident/.test(navigator.userAgent);Hn&&!_e(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function Xo(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:i}=window.location;We("go",{pathname:e,search:o,hash:i})}const Wn={activate(){window.addEventListener("popstate",Xo)},inactivate(){window.removeEventListener("popstate",Xo)}};var Ue=an,qn=wo,Gn=Xn,Kn=nn,Jn=sn,tn="/",on="./",Yn=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function wo(t,e){for(var o=[],i=0,n=0,r="",s=e&&e.delimiter||tn,l=e&&e.delimiters||on,a=!1,c;(c=Yn.exec(t))!==null;){var d=c[0],h=c[1],u=c.index;if(r+=t.slice(n,u),n=u+d.length,h){r+=h[1],a=!0;continue}var y="",re=t[n],G=c[2],nt=c[3],Bt=c[4],W=c[5];if(!a&&r.length){var ie=r.length-1;l.indexOf(r[ie])>-1&&(y=r[ie],r=r.slice(0,ie))}r&&(o.push(r),r="",a=!1);var Ce=y!==""&&re!==void 0&&re!==y,Te=W==="+"||W==="*",Ht=W==="?"||W==="*",se=y||s,rt=nt||Bt;o.push({name:G||i++,prefix:y,delimiter:se,optional:Ht,repeat:Te,partial:Ce,pattern:rt?Qn(rt):"[^"+pe(se)+"]+?"})}return(r||n<t.length)&&o.push(r+t.substr(n)),o}function Xn(t,e){return nn(wo(t,e))}function nn(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(i,n){for(var r="",s=n&&n.encode||encodeURIComponent,l=0;l<t.length;l++){var a=t[l];if(typeof a=="string"){r+=a;continue}var c=i?i[a.name]:void 0,d;if(Array.isArray(c)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(c.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var h=0;h<c.length;h++){if(d=s(c[h],a),!e[l].test(d))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');r+=(h===0?a.prefix:a.delimiter)+d}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(d=s(String(c),a),!e[l].test(d))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+d+'"');r+=a.prefix+d;continue}if(a.optional){a.partial&&(r+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return r}}function pe(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Qn(t){return t.replace(/([=!:$/()])/g,"\\$1")}function rn(t){return t&&t.sensitive?"":"i"}function Zn(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var i=0;i<o.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function er(t,e,o){for(var i=[],n=0;n<t.length;n++)i.push(an(t[n],e,o).source);return new RegExp("(?:"+i.join("|")+")",rn(o))}function tr(t,e,o){return sn(wo(t,o),e,o)}function sn(t,e,o){o=o||{};for(var i=o.strict,n=o.start!==!1,r=o.end!==!1,s=pe(o.delimiter||tn),l=o.delimiters||on,a=[].concat(o.endsWith||[]).map(pe).concat("$").join("|"),c=n?"^":"",d=t.length===0,h=0;h<t.length;h++){var u=t[h];if(typeof u=="string")c+=pe(u),d=h===t.length-1&&l.indexOf(u[u.length-1])>-1;else{var y=u.repeat?"(?:"+u.pattern+")(?:"+pe(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?c+=pe(u.prefix)+"("+y+")?":c+="(?:"+pe(u.prefix)+"("+y+"))?":c+=pe(u.prefix)+"("+y+")"}}return r?(i||(c+="(?:"+s+")?"),c+=a==="$"?"$":"(?="+a+")"):(i||(c+="(?:"+s+"(?="+a+"))?"),d||(c+="(?="+s+"|"+a+")")),new RegExp(c,rn(o))}function an(t,e,o){return t instanceof RegExp?Zn(t,e):Array.isArray(t)?er(t,e,o):tr(t,e,o)}Ue.parse=qn;Ue.compile=Gn;Ue.tokensToFunction=Kn;Ue.tokensToRegExp=Jn;const{hasOwnProperty:or}=Object.prototype,po=new Map;po.set("|false",{keys:[],pattern:/(?:)/});function Qo(t){try{return decodeURIComponent(t)}catch{return t}}function ir(t,e,o,i,n){o=!!o;const r=`${t}|${o}`;let s=po.get(r);if(!s){const c=[];s={keys:c,pattern:Ue(t,c,{end:o,strict:t===""})},po.set(r,s)}const l=s.pattern.exec(e);if(!l)return null;const a=Object.assign({},n);for(let c=1;c<l.length;c++){const d=s.keys[c-1],h=d.name,u=l[c];(u!==void 0||!or.call(a,h))&&(d.repeat?a[h]=u?u.split(d.delimiter).map(Qo):[]:a[h]=u&&Qo(u))}return{path:l[0],keys:(i||[]).concat(s.keys),params:a}}function ln(t,e,o,i,n){let r,s,l=0,a=t.path||"";return a.charAt(0)==="/"&&(o&&(a=a.substr(1)),o=!0),{next(c){if(t===c)return{done:!0};const d=t.__children=t.__children||t.children;if(!r&&(r=ir(a,e,!d,i,n),r))return{done:!1,value:{route:t,keys:r.keys,params:r.params,path:r.path}};if(r&&d)for(;l<d.length;){if(!s){const u=d[l];u.parent=t;let y=r.path.length;y>0&&e.charAt(y)==="/"&&(y+=1),s=ln(u,e.substr(y),o,r.keys,r.params)}const h=s.next(c);if(!h.done)return{done:!1,value:h.value};s=null,l++}return{done:!0}}}}function nr(t){if(_e(t.route.action))return t.route.action(t)}function rr(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function sr(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function ar(t,e){const{route:o,path:i}=e;if(o&&!o.__synthetic){const n={path:i,route:o};if(!t.chain)t.chain=[];else if(o.parent){let r=t.chain.length;for(;r--&&t.chain[r].route&&t.chain[r].route!==o.parent;)t.chain.pop()}t.chain.push(n)}}class Ge{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||nr,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){Ko(e);const o=[...wt(e)];this.root.__children=o}addRoutes(e){return Ko(e),this.root.__children.push(...wt(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,Z(e)?{pathname:e}:e),i=ln(this.root,this.__normalizePathname(o.pathname),this.baseUrl),n=this.resolveRoute;let r=null,s=null,l=o;function a(c,d=r.value.route,h){const u=h===null&&r.value.route;return r=s||i.next(u),s=null,!c&&(r.done||!rr(d,r.value.route))?(s=r,Promise.resolve(Ne)):r.done?Promise.reject(en(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,r.value),ar(l,r.value),Promise.resolve(n(l)).then(y=>y!=null&&y!==Ne?(l.result=y.result||y,l):a(c,d,y)))}return o.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(c=>{const d=sr(l);if(c?console.warn(d):c=new Error(d),c.context=c.context||l,c instanceof DOMException||(c.code=c.code||500),this.errorHandler)return l.result=this.errorHandler(c),l;throw c})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,o).href;if(i.slice(0,o.length)===o)return i.slice(o.length)}}Ge.pathToRegexp=Ue;const{pathToRegexp:Zo}=Ge,ei=new Map;function cn(t,e,o){const i=e.name||e.component;if(i&&(t.has(i)?t.get(i).push(e):t.set(i,[e])),Array.isArray(o))for(let n=0;n<o.length;n++){const r=o[n];r.parent=e,cn(t,r,r.__children||r.children)}}function ti(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function oi(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function lr(t,e={}){if(!(t instanceof Ge))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(i,n)=>{let r=ti(o,i);if(!r&&(o.clear(),cn(o,t.root,t.root.__children),r=ti(o,i),!r))throw new Error(`Route "${i}" not found`);let s=ei.get(r.fullPath);if(!s){let a=oi(r),c=r.parent;for(;c;){const y=oi(c);y&&(a=y.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),c=c.parent}const d=Zo.parse(a),h=Zo.tokensToFunction(d),u=Object.create(null);for(let y=0;y<d.length;y++)Z(d[y])||(u[d[y].name]=!0);s={toPath:h,keys:u},ei.set(a,s),r.fullPath=a}let l=s.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},c=Object.keys(n);for(let h=0;h<c.length;h++){const u=c[h];s.keys[u]||(a[u]=n[u])}const d=e.stringifyQueryParams(a);d&&(l+=d.charAt(0)==="?"?d:`?${d}`)}return l}}let ii=[];function cr(t){ii.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),ii=t}const dr=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},ur=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function ni(t,e){return t.classList.add(e),new Promise(o=>{if(dr(t)){const i=t.getBoundingClientRect(),n=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;t.setAttribute("style",`position: absolute; ${n}`),ur(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const pr=256;function Kt(t){return t!=null}function hr(t){const e=Object.assign({},t);return delete e.next,e}function K({pathname:t="",search:e="",hash:o="",chain:i=[],params:n={},redirectFrom:r,resolver:s},l){const a=i.map(c=>c.route);return{baseUrl:s&&s.baseUrl||"",pathname:t,search:e,hash:o,routes:a,route:l||a.length&&a[a.length-1]||null,params:n,redirectFrom:r,getUrl:(c={})=>gt(he.pathToRegexp.compile(dn(a))(Object.assign({},n,c)),s)}}function ri(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function mr(t,e){e.location=K(t);const o=t.chain.map(i=>i.route).indexOf(t.route);return t.chain[o].element=e,e}function vt(t,e,o){if(_e(t))return t.apply(o,e)}function si(t,e,o){return i=>{if(i&&(i.cancel||i.redirect))return i;if(o)return vt(o[t],e,o)}}function vr(t,e){if(!Array.isArray(t)&&!St(t))throw new Error(te(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=wt(t);for(let i=0;i<o.length;i++)Zi(o[i]),e.__children.push(o[i])}function dt(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function gt(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function dn(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class he extends Ge{constructor(e,o){const i=document.head.querySelector("base"),n=i&&i.getAttribute("href");super([],Object.assign({baseUrl:n&&Ge.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=s=>this.__resolveRoute(s);const r=he.NavigationTrigger;he.setTriggers.apply(he,Object.keys(r).map(s=>r[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=K({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let i=Promise.resolve();_e(o.children)&&(i=i.then(()=>o.children(hr(e))).then(r=>{!Kt(r)&&!_e(o.children)&&(r=o.children),vr(r,o)}));const n={redirect:r=>ri(e,r),component:r=>{const s=document.createElement(r);return this.__createdByRouter.set(s,!0),s}};return i.then(()=>{if(this.__isLatestRender(e))return vt(o.action,[e,n],o)}).then(r=>{if(Kt(r)&&(r instanceof HTMLElement||r.redirect||r===Ne))return r;if(Z(o.redirect))return n.redirect(o.redirect);if(o.bundle)return Un(o.bundle).then(()=>{},()=>{throw new Error(te(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(r=>{if(Kt(r))return r;if(Z(o.component))return n.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const i=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},Z(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(n).then(r=>this.__fullyResolveChain(r)).then(r=>{if(this.__isLatestRender(r)){const s=this.__previousContext;if(r===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=K(r),o&&this.__updateBrowserHistory(r,i===1),We("location-changed",{router:this,location:this.location}),r.__skipAttach)return this.__copyUnchangedElements(r,s),this.__previousContext=r,this.location;this.__addAppearingContent(r,s);const l=this.__animateIfNeeded(r);return this.__runOnAfterEnterCallbacks(r),this.__runOnAfterLeaveCallbacks(r,s),l.then(()=>{if(this.__isLatestRender(r))return this.__removeDisappearingContent(),this.__previousContext=r,this.location})}}).catch(r=>{if(i===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(n),dt(this.__outlet&&this.__outlet.children),this.location=K(Object.assign(n,{resolver:this})),We("error",Object.assign({router:this,error:r},n)),r}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(i=>{const r=i!==o?i:e,l=gt(dn(i.chain),i.resolver)===i.pathname,a=(c,d=c.route,h)=>c.next(void 0,d,h).then(u=>u===null||u===Ne?l?c:d.parent!==null?a(c,d.parent,u):u:u);return a(i).then(c=>{if(c===null||c===Ne)throw en(r);return c&&c!==Ne&&c!==i?this.__fullyResolveChain(r,c):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(mr(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(te(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${jn(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},i=o.chain||[],n=e.chain;let r=Promise.resolve();const s=()=>({cancel:!0}),l=a=>ri(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,n.length)&&!(i[a].route!==n[a].route||i[a].path!==n[a].path&&i[a].element!==n[a].element||!this.__isReusableElement(i[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},i[a]);for(let a=0;a<n.length;a++)r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},n[a]),i[a].element.location=K(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)r=this.__runOnBeforeLeaveCallbacks(r,e,{prevent:s},i[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=K(e,i[a].route)):(r=this.__runOnBeforeEnterCallbacks(r,e,{prevent:s,redirect:l},n[a]),n[a].element&&(n[a].element.location=K(e,n[a].route)));return r.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,i,n){const r=K(o);return e.then(s=>{if(this.__isLatestRender(o))return si("onBeforeLeave",[r,i,this],n.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,o,i,n){const r=K(o,n.route);return e.then(s=>{if(this.__isLatestRender(o))return si("onBeforeEnter",[r,i,this],n.element)(s)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,i){if(o>pr)throw new Error(te(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(te(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==i){const r=n?"replaceState":"pushState";window.history[r](null,document.title,e+o+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let i=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const r=o&&o.chain[n].element;if(r)if(r.parentNode===i)e.chain[n].element=r,i=r;else break}return i}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(r=>this.__addedByRouter.get(r)&&r!==e.result);let n=i;for(let r=e.__divergedChainIndex;r<e.chain.length;r++){const s=e.chain[r].element;s&&(n.appendChild(s),this.__addedByRouter.set(s,!0),n===i&&this.__appearingContent.push(s),n=s)}}__removeDisappearingContent(){this.__disappearingContent&&dt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(dt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let i=o.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const n=o.chain[i].element;if(n)try{const r=K(e);vt(n.onAfterLeave,[r,{},o.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&dt(n.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const i=e.chain[o].element||{},n=K(e,e.chain[o].route);vt(i.onAfterEnter,[n,{},e.resolver],i)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],n=[],r=e.chain;let s;for(let l=r.length;l>0;l--)if(r[l-1].route.animate){s=r[l-1].route.animate;break}if(o&&i&&s){const l=St(s)&&s.leave||"leaving",a=St(s)&&s.enter||"entering";n.push(ni(o,l)),n.push(ni(i,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:i,hash:n}=e?e.detail:window.location;Z(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:i,hash:n},!0))}static setTriggers(...e){cr(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=lr(this)),gt(this.__urlForName(e,o),this)}urlForPath(e,o){return gt(he.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:i,hash:n}=Z(e)?this.__createUrl(e,"http://a"):e;return We("go",{pathname:o,search:i,hash:n})}}const gr=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ft=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function fr(){function t(){return!0}return un(t)}function br(){try{return yr()?!0:xr()?ft?!wr():!fr():!1}catch{return!1}}function yr(){return localStorage.getItem("vaadin.developmentmode.force")}function xr(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function wr(){return!!(ft&&Object.keys(ft).map(e=>ft[e]).filter(e=>e.productionMode).length>0)}function un(t,e){if(typeof t!="function")return;const o=gr.exec(t.toString());if(o)try{t=new Function(o[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return t(e)}window.Vaadin=window.Vaadin||{};const ai=function(t,e){if(window.Vaadin.developmentMode)return un(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=br());function _r(){}const Er=function(){if(typeof ai=="function")return ai(_r)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});Er();he.NavigationTrigger={POPSTATE:Wn,CLICK:Bn};var Jt,A;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})(A||(A={}));class Sr{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var i;(i=o.active)===null||i===void 0||i.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=A.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(A.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(A.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const i of this.stateChangeListeners)i(o,this.connectionState)}}get online(){return this.connectionState===A.CONNECTED||this.connectionState===A.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=A.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const kr=t=>!!(t==="localhost"||t==="[::1]"||/^127\.\d+\.\d+\.\d+$/u.exec(t)),ut=window;if(!(!((Jt=ut.Vaadin)===null||Jt===void 0)&&Jt.connectionState)){let t;kr(window.location.hostname)?t=!0:t=navigator.onLine,ut.Vaadin||(ut.Vaadin={}),ut.Vaadin.connectionState=new Sr(t?A.CONNECTED:A.CONNECTION_LOST)}function H(t,e,o,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cr=!1,bt=globalThis,_o=bt.ShadowRoot&&(bt.ShadyCSS===void 0||bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Eo=Symbol(),li=new WeakMap;class So{constructor(e,o,i){if(this._$cssResult$=!0,i!==Eo)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(_o&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=li.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i&&li.set(o,e))}return e}toString(){return this.cssText}}const Tr=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},pn=t=>new So(typeof t=="string"?t:String(t),void 0,Eo),x=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,n,r)=>i+Tr(n)+t[r+1],t[0]);return new So(o,t,Eo)},$r=(t,e)=>{if(_o)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),n=bt.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}},Ar=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return pn(e)},ci=_o||Cr?t=>t:t=>t instanceof CSSStyleSheet?Ar(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Rr,defineProperty:Pr,getOwnPropertyDescriptor:di,getOwnPropertyNames:Ir,getOwnPropertySymbols:Nr,getPrototypeOf:ui}=Object,U=globalThis;let Q;const pi=U.trustedTypes,Or=pi?pi.emptyScript:"",yt=U.reactiveElementPolyfillSupportDevMode;var Ji;{const t=U.litIssuedWarnings??(U.litIssuedWarnings=new Set);Q=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},Q("dev-mode","Lit is in dev mode. Not recommended for production!"),(Ji=U.ShadyDOM)!=null&&Ji.inUse&&yt===void 0&&Q("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")}const Yt=t=>{U.emitLitDebugLogEvents&&U.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},Oe=(t,e)=>t,kt={toAttribute(t,e){switch(e){case Boolean:t=t?Or:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},ko=(t,e)=>!Rr(t,e),hi={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:ko};Symbol.metadata??(Symbol.metadata=Symbol("metadata"));U.litPropertyMetadata??(U.litPropertyMetadata=new WeakMap);class ce extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??(this._initializers=[])).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,o=hi){if(o.state&&(o.attribute=!1),this.__prepare(),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol.for(`${String(e)} (@property() cache)`),n=this.getPropertyDescriptor(e,i,o);n!==void 0&&Pr(this.prototype,e,n)}}static getPropertyDescriptor(e,o,i){const{get:n,set:r}=di(this.prototype,e)??{get(){return this[o]},set(s){this[o]=s}};if(n==null){if("value"in(di(this.prototype,e)??{}))throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);Q("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get(){return n==null?void 0:n.call(this)},set(s){const l=n==null?void 0:n.call(this);r.call(this,s),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??hi}static __prepare(){if(this.hasOwnProperty(Oe("elementProperties")))return;const e=ui(this);e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Oe("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Oe("properties"))){const o=this.properties,i=[...Ir(o),...Nr(o)];for(const n of i)this.createProperty(n,o[n])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,n]of o)this.elementProperties.set(i,n)}this.__attributeToPropertyMap=new Map;for(const[o,i]of this.elementProperties){const n=this.__attributeNameForProperty(o,i);n!==void 0&&this.__attributeToPropertyMap.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&Q("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&Q("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)o.unshift(ci(n))}else e!==void 0&&o.push(ci(e));return o}static __attributeNameForProperty(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)==null||e.forEach(o=>o(this))}addController(e){var o;(this.__controllers??(this.__controllers=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)==null||o.call(e))}removeController(e){var o;(o=this.__controllers)==null||o.delete(e)}__saveInstanceProperties(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this.__instanceProperties=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $r(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostConnected)==null?void 0:i.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostDisconnected)==null?void 0:i.call(o)})}attributeChangedCallback(e,o,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,o){var s;const n=this.constructor.elementProperties.get(e),r=this.constructor.__attributeNameForProperty(e,n);if(r!==void 0&&n.reflect===!0){const a=(((s=n.converter)==null?void 0:s.toAttribute)!==void 0?n.converter:kt).toAttribute(o,n.type);this.constructor.enabledWarnings.includes("migration")&&a===void 0&&Q("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var r;const i=this.constructor,n=i.__attributeToPropertyMap.get(e);if(n!==void 0&&this.__reflectingProperty!==n){const s=i.getPropertyOptions(n),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((r=s.converter)==null?void 0:r.fromAttribute)!==void 0?s.converter:kt;this.__reflectingProperty=n,this[n]=l.fromAttribute(o,s.type),this.__reflectingProperty=null}}requestUpdate(e,o,i){if(e!==void 0){e instanceof Event&&Q("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()"),i??(i=this.constructor.getPropertyOptions(e));const n=i.hasChanged??ko,r=this[e];if(n(r,o))this._$changeProperty(e,o,i);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(e,o,i){this._$changedProperties.has(e)||this._$changedProperties.set(e,o),i.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties??(this.__reflectingProperties=new Set)).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){const e=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof(e==null?void 0:e.then)=="function"&&Q("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),e}performUpdate(){var i;if(!this.isUpdatePending)return;if(Yt==null||Yt({kind:"update"}),!this.hasUpdated){this.renderRoot??(this.renderRoot=this.createRenderRoot());{const s=[...this.constructor.elementProperties.keys()].filter(l=>this.hasOwnProperty(l)&&l in ui(this));if(s.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${s.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[r,s]of this.__instanceProperties)this[r]=s;this.__instanceProperties=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[r,s]of n)s.wrapped===!0&&!this._$changedProperties.has(r)&&this[r]!==void 0&&this._$changeProperty(r,this[r],s)}let e=!1;const o=this._$changedProperties;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(i=this.__controllers)==null||i.forEach(n=>{var r;return(r=n.hostUpdate)==null?void 0:r.call(n)}),this.update(o)):this.__markUpdated()}catch(n){throw e=!1,this.__markUpdated(),n}e&&this._$didUpdate(o)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)==null||o.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&Q("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&(this.__reflectingProperties=this.__reflectingProperties.forEach(o=>this.__propertyToAttribute(o,this[o]))),this.__markUpdated()}updated(e){}firstUpdated(e){}}ce.elementStyles=[];ce.shadowRootOptions={mode:"open"};ce[Oe("elementProperties")]=new Map;ce[Oe("finalized")]=new Map;yt==null||yt({ReactiveElement:ce});{ce.enabledWarnings=["change-in-update","async-perform-update"];const t=function(e){e.hasOwnProperty(Oe("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ce.enableWarning=function(e){t(this),this.enabledWarnings.includes(e)||this.enabledWarnings.push(e)},ce.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}(U.reactiveElementVersions??(U.reactiveElementVersions=[])).push("2.0.4");U.reactiveElementVersions.length>1&&Q("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,E=t=>{M.emitLitDebugLogEvents&&M.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let Lr=0,Ke;M.litIssuedWarnings??(M.litIssuedWarnings=new Set),Ke=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",M.litIssuedWarnings.has(e)||(console.warn(e),M.litIssuedWarnings.add(e))},Ke("dev-mode","Lit is in dev mode. Not recommended for production!");var Yi,Xi;const X=(Yi=M.ShadyDOM)!=null&&Yi.inUse&&((Xi=M.ShadyDOM)==null?void 0:Xi.noPatch)===!0?M.ShadyDOM.wrap:t=>t,Ct=M.trustedTypes,mi=Ct?Ct.createPolicy("lit-html",{createHTML:t=>t}):void 0,zr=t=>t,jt=(t,e,o)=>zr,Mr=t=>{if(ke!==jt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ke=t},Vr=()=>{ke=jt},ho=(t,e,o)=>ke(t,e,o),hn="$lit$",ae=`lit$${String(Math.random()).slice(9)}$`,mn="?"+ae,Dr=`<${mn}>`,Ee=document,Je=()=>Ee.createComment(""),Ye=t=>t===null||typeof t!="object"&&typeof t!="function",vn=Array.isArray,jr=t=>vn(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,Ur=`[^ 	
\f\r"'\`<>=]`,Fr=`[^\\s"'>=/]`,Fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vi=1,Qt=2,Br=3,gi=/-->/g,fi=/>/g,fe=new RegExp(`>|${Xt}(?:(${Fr}+)(${Xt}*=${Xt}*(?:${Ur}|("|')|))|$)`,"g"),Hr=0,bi=1,Wr=2,yi=3,Zt=/'/g,eo=/"/g,gn=/^(?:script|style|textarea|title)$/i,qr=1,Tt=2,Co=1,$t=2,Gr=3,Kr=4,Jr=5,To=6,Yr=7,fn=t=>(e,...o)=>(e.some(i=>i===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),o.some(i=>i==null?void 0:i._$litStatic$)&&Ke("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:t,strings:e,values:o}),b=fn(qr),Ie=fn(Tt),Se=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),xi=new WeakMap,xe=Ee.createTreeWalker(Ee,129);let ke=jt;function bn(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let o="invalid template strings array";throw o=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(o)}return mi!==void 0?mi.createHTML(e):e}const Xr=(t,e)=>{const o=t.length-1,i=[];let n=e===Tt?"<svg>":"",r,s=Fe;for(let a=0;a<o;a++){const c=t[a];let d=-1,h,u=0,y;for(;u<c.length&&(s.lastIndex=u,y=s.exec(c),y!==null);)if(u=s.lastIndex,s===Fe){if(y[vi]==="!--")s=gi;else if(y[vi]!==void 0)s=fi;else if(y[Qt]!==void 0)gn.test(y[Qt])&&(r=new RegExp(`</${y[Qt]}`,"g")),s=fe;else if(y[Br]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else s===fe?y[Hr]===">"?(s=r??Fe,d=-1):y[bi]===void 0?d=-2:(d=s.lastIndex-y[Wr].length,h=y[bi],s=y[yi]===void 0?fe:y[yi]==='"'?eo:Zt):s===eo||s===Zt?s=fe:s===gi||s===fi?s=Fe:(s=fe,r=void 0);console.assert(d===-1||s===fe||s===Zt||s===eo,"unexpected parse state B");const re=s===fe&&t[a+1].startsWith("/>")?" ":"";n+=s===Fe?c+Dr:d>=0?(i.push(h),c.slice(0,d)+hn+c.slice(d)+ae+re):c+ae+(d===-2?a:re)}const l=n+(t[o]||"<?>")+(e===Tt?"</svg>":"");return[bn(t,l),i]};class Xe{constructor({strings:e,["_$litType$"]:o},i){this.parts=[];let n,r=0,s=0;const l=e.length-1,a=this.parts,[c,d]=Xr(e,o);if(this.el=Xe.createElement(c,i),xe.currentNode=this.el.content,o===Tt){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=xe.nextNode())!==null&&a.length<l;){if(n.nodeType===1){{const h=n.localName;if(/^(?:textarea|template)$/i.test(h)&&n.innerHTML.includes(ae)){const u=`Expressions are not supported inside \`${h}\` elements. See https://lit.dev/msg/expression-in-${h} for more information.`;if(h==="template")throw new Error(u);Ke("",u)}}if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(hn)){const u=d[s++],re=n.getAttribute(h).split(ae),G=/([.?@])?(.*)/.exec(u);a.push({type:Co,index:r,name:G[2],strings:re,ctor:G[1]==="."?Zr:G[1]==="?"?es:G[1]==="@"?ts:Ut}),n.removeAttribute(h)}else h.startsWith(ae)&&(a.push({type:To,index:r}),n.removeAttribute(h));if(gn.test(n.tagName)){const h=n.textContent.split(ae),u=h.length-1;if(u>0){n.textContent=Ct?Ct.emptyScript:"";for(let y=0;y<u;y++)n.append(h[y],Je()),xe.nextNode(),a.push({type:$t,index:++r});n.append(h[u],Je())}}}else if(n.nodeType===8)if(n.data===mn)a.push({type:$t,index:r});else{let u=-1;for(;(u=n.data.indexOf(ae,u+1))!==-1;)a.push({type:Yr,index:r}),u+=ae.length-1}r++}if(d.length!==s)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");E&&E({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const i=Ee.createElement("template");return i.innerHTML=e,i}}function ze(t,e,o=t,i){var s,l;if(e===Se)return e;let n=i!==void 0?(s=o.__directives)==null?void 0:s[i]:o.__directive;const r=Ye(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==r&&((l=n==null?void 0:n._$notifyDirectiveConnectionChanged)==null||l.call(n,!1),r===void 0?n=void 0:(n=new r(t),n._$initialize(t,o,i)),i!==void 0?(o.__directives??(o.__directives=[]))[i]=n:o.__directive=n),n!==void 0&&(e=ze(t,n._$resolve(t,e.values),n,i)),e}class Qr{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){const{el:{content:o},parts:i}=this._$template,n=((e==null?void 0:e.creationScope)??Ee).importNode(o,!0);xe.currentNode=n;let r=xe.nextNode(),s=0,l=0,a=i[0];for(;a!==void 0;){if(s===a.index){let c;a.type===$t?c=new ot(r,r.nextSibling,this,e):a.type===Co?c=new a.ctor(r,a.name,a.strings,this,e):a.type===To&&(c=new os(r,this,e)),this._$parts.push(c),a=i[++l]}s!==(a==null?void 0:a.index)&&(r=xe.nextNode(),s++)}return xe.currentNode=Ee,n}_update(e){let o=0;for(const i of this._$parts)i!==void 0&&(E&&E({kind:"set part",part:i,value:e[o],valueIndex:o,values:e,templateInstance:this}),i.strings!==void 0?(i._$setValue(e,i,o),o+=i.strings.length-2):i._$setValue(e[o])),o++}}class ot{get _$isConnected(){var e;return((e=this._$parent)==null?void 0:e._$isConnected)??this.__isConnected}constructor(e,o,i,n){this.type=$t,this._$committedValue=$,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=i,this.options=n,this.__isConnected=(n==null?void 0:n.isConnected)??!0,this._textSanitizer=void 0}get parentNode(){let e=X(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var i;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=ze(this,e,o),Ye(e))e===$||e==null||e===""?(this._$committedValue!==$&&(E&&E({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=$):e!==this._$committedValue&&e!==Se&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((i=this.options)==null?void 0:i.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else jr(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return X(X(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),ke!==jt){const i=(o=this._$startNode.parentNode)==null?void 0:o.nodeName;if(i==="STYLE"||i==="SCRIPT"){let n="Forbidden";throw i==="STYLE"?n="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":n="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(n)}}E&&E({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==$&&Ye(this._$committedValue)){const o=X(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=ho(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=Ee.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=ho(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var r;const{values:o,["_$litType$"]:i}=e,n=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Xe.createElement(bn(i.h,i.h[0]),this.options)),i);if(((r=this._$committedValue)==null?void 0:r._$template)===n)E&&E({kind:"template updating",template:n,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:o}),this._$committedValue._update(o);else{const s=new Qr(n,this),l=s._clone(this.options);E&&E({kind:"template instantiated",template:n,instance:s,parts:s._$parts,options:this.options,fragment:l,values:o}),s._update(o),E&&E({kind:"template instantiated and updated",template:n,instance:s,parts:s._$parts,options:this.options,fragment:l,values:o}),this._commitNode(l),this._$committedValue=s}}_$getTemplate(e){let o=xi.get(e.strings);return o===void 0&&xi.set(e.strings,o=new Xe(e)),o}_commitIterable(e){vn(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let i=0,n;for(const r of e)i===o.length?o.push(n=new ot(this._insert(Je()),this._insert(Je()),this,this.options)):n=o[i],n._$setValue(r),i++;i<o.length&&(this._$clear(n&&X(n._$endNode).nextSibling,i),o.length=i)}_$clear(e=X(this._$startNode).nextSibling,o){var i;for((i=this._$notifyConnectionChanged)==null||i.call(this,!1,!0,o);e&&e!==this._$endNode;){const n=X(e).nextSibling;X(e).remove(),e=n}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)==null||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ut{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,o,i,n,r){this.type=Co,this._$committedValue=$,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$committedValue=new Array(i.length-1).fill(new String),this.strings=i):this._$committedValue=$,this._sanitizer=void 0}_$setValue(e,o=this,i,n){const r=this.strings;let s=!1;if(r===void 0)e=ze(this,e,o,0),s=!Ye(e)||e!==this._$committedValue&&e!==Se,s&&(this._$committedValue=e);else{const l=e;e=r[0];let a,c;for(a=0;a<r.length-1;a++)c=ze(this,l[i+a],o,a),c===Se&&(c=this._$committedValue[a]),s||(s=!Ye(c)||c!==this._$committedValue[a]),c===$?e=$:e!==$&&(e+=(c??"")+r[a+1]),this._$committedValue[a]=c}s&&!n&&this._commitValue(e)}_commitValue(e){e===$?X(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=ke(this.element,this.name,"attribute")),e=this._sanitizer(e??""),E&&E({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),X(this.element).setAttribute(this.name,e??""))}}class Zr extends Ut{constructor(){super(...arguments),this.type=Gr}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=ke(this.element,this.name,"property")),e=this._sanitizer(e),E&&E({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===$?void 0:e}}class es extends Ut{constructor(){super(...arguments),this.type=Kr}_commitValue(e){E&&E({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==$),options:this.options}),X(this.element).toggleAttribute(this.name,!!e&&e!==$)}}class ts extends Ut{constructor(e,o,i,n,r){if(super(e,o,i,n,r),this.type=Jr,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){if(e=ze(this,e,o,0)??$,e===Se)return;const i=this._$committedValue,n=e===$&&i!==$||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==$&&(i===$||n);E&&E({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:n,addListener:r,oldListener:i}),n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o;typeof this._$committedValue=="function"?this._$committedValue.call(((o=this.options)==null?void 0:o.host)??this.element,e):this._$committedValue.handleEvent(e)}}class os{constructor(e,o,i){this.element=e,this.type=To,this._$disconnectableChildren=void 0,this._$parent=o,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){E&&E({kind:"commit to element binding",element:this.element,value:e,options:this.options}),ze(this,e)}}const to=M.litHtmlPolyfillSupportDevMode;to==null||to(Xe,ot);(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.1.2");M.litHtmlVersions.length>1&&Ke("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const we=(t,e,o)=>{if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const i=Lr++,n=(o==null?void 0:o.renderBefore)??e;let r=n._$litPart$;if(E&&E({kind:"begin render",id:i,value:t,container:e,options:o,part:r}),r===void 0){const s=(o==null?void 0:o.renderBefore)??null;n._$litPart$=r=new ot(e.insertBefore(Je(),s),s,void 0,o??{})}return r._$setValue(t),E&&E({kind:"end render",id:i,value:t,container:e,options:o,part:r}),r};we.setSanitizer=Mr,we.createSanitizer=ho,we._testOnlyClearSanitizerFactoryDoNotCallOrElse=Vr;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const is=(t,e)=>t;let yn;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);yn=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class P extends ce{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=we(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)==null||e.setConnected(!1)}render(){return Se}}P._$litElement$=!0;P[is("finalized")]=!0;var Qi;(Qi=globalThis.litElementHydrateSupport)==null||Qi.call(globalThis,{LitElement:P});const oo=globalThis.litElementPolyfillSupportDevMode;oo==null||oo({LitElement:P});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");globalThis.litElementVersions.length>1&&yn("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let xn;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);xn=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}const ns=(t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0},rs={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:ko},ss=(t=rs,e,o)=>{const{kind:i,metadata:n}=o;n==null&&xn("missing-class-metadata",`The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),r.set(o.name,t),i==="accessor"){const{name:s}=o;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,a,t)},init(l){return l!==void 0&&this._$changeProperty(s,void 0,t),l}}}else if(i==="setter"){const{name:s}=o;return function(l){const a=this[s];e.call(this,l),this.requestUpdate(s,a,t)}}throw new Error(`Unsupported decorator location: ${i}`)};function w(t){return(e,o)=>typeof o=="object"?ss(t,e,o):ns(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(t){return w({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wi=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let wn;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);wn=(e,o)=>{o+=e?` See https://lit.dev/msg/${e} for more information.`:"",t.has(o)||(console.warn(o),t.add(o))}}function it(t,e){return(o,i,n)=>{const r=s=>{var a;const l=((a=s.renderRoot)==null?void 0:a.querySelector(t))??null;if(l===null&&e&&!s.hasUpdated){const c=typeof i=="object"?i.name:i;wn("",`@query'd field ${JSON.stringify(String(c))} with the 'cache' flag set for selector '${t}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`)}return l};if(e){const{get:s,set:l}=typeof i=="object"?o:n??(()=>{const a=Symbol(`${String(i)} (@query() cache)`);return{get(){return this[a]},set(c){this[a]=c}}})();return wi(o,i,{get(){let a=s.call(this);return a===void 0&&(a=r(this),(a!==null||this.hasUpdated)&&l.call(this,a)),a}})}else return wi(o,i,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const as={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ls=t=>(...e)=>({_$litDirective$:t,values:e});class cs{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,i){this.__part=e,this._$parent=o,this.__attributeIndex=i}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ds extends cs{constructor(e){var o;if(super(e),e.type!==as.ATTRIBUTE||e.name!=="class"||((o=e.strings)==null?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var n,r;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in o)o[s]&&!((n=this._staticClasses)!=null&&n.has(s))&&this._previousClasses.add(s);return this.render(o)}const i=e.element.classList;for(const s of this._previousClasses)s in o||(i.remove(s),this._previousClasses.delete(s));for(const s in o){const l=!!o[s];l!==this._previousClasses.has(s)&&!((r=this._staticClasses)!=null&&r.has(s))&&(l?(i.add(s),this._previousClasses.add(s)):(i.remove(s),this._previousClasses.delete(s)))}return Se}}const $o=ls(ds),io="css-loading-indicator";var J;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(J||(J={}));class O extends P{static create(){var e,o;const i=window;return!((e=i.Vaadin)===null||e===void 0)&&e.connectionIndicator||(i.Vaadin||(i.Vaadin={}),i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),(o=i.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=J.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=A.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}render(){return b`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${$o({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===A.CONNECTION_LOST,this.reconnecting=o===A.RECONNECTING,this.updateLoading(o===A.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=J.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=J.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=J.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=J.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(io)){const e=document.createElement("style");e.id=io,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(io);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
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
    `}getLoadingBarStyle(){switch(this.loadingBarState){case J.IDLE:return"display: none";case J.FIRST:case J.SECOND:case J.THIRD:return"display: block";default:return""}}timeoutFor(e,o,i,n){return e!==0&&window.clearTimeout(e),o?window.setTimeout(i,n):0}static get instance(){return O.create()}}H([w({type:Number})],O.prototype,"firstDelay",void 0);H([w({type:Number})],O.prototype,"secondDelay",void 0);H([w({type:Number})],O.prototype,"thirdDelay",void 0);H([w({type:Number})],O.prototype,"expandedDuration",void 0);H([w({type:String})],O.prototype,"onlineText",void 0);H([w({type:String})],O.prototype,"offlineText",void 0);H([w({type:String})],O.prototype,"reconnectingText",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"offline",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"reconnecting",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"expanded",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"loading",void 0);H([w({type:String})],O.prototype,"loadingBarState",void 0);H([w({type:Boolean})],O.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",O);O.instance;var _i;const At=window;At.Vaadin||(At.Vaadin={});(_i=At.Vaadin).registrations||(_i.registrations=[]);At.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Ei extends Error{}const Be=window.document.body,k=window;class us{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Be.$=Be.$||[],this.config=e||{},k.Vaadin=k.Vaadin||{},k.Vaadin.Flow=k.Vaadin.Flow||{},k.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,k.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,k.Vaadin.connectionState.loadingFinished(),!k.Vaadin.listener&&(k.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,k.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof Ei)return k.Vaadin.connectionState.state=A.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,i)=>this.flowNavigate(o,i),this.container.onBeforeLeave=(o,i)=>this.flowLeave(o,i),this.container}}async flowLeave(e,o){const{connectionState:i}=k.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||i.offline?Promise.resolve({}):new Promise(n=>{this.loadingStarted(),this.container.serverConnected=r=>{n(o&&r?o.prevent():{}),this.loadingFinished()},Be.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(i=>{this.loadingStarted(),this.container.serverConnected=(n,r)=>{o&&n?i(o.prevent()):o&&o.redirect&&r?i(o.redirect(r.pathname)):(this.container.style.display="",i(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},Be.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:i}=o;await(await f(()=>import("./FlowBootstrap-CHUuW4WK.js"),__vite__mapDeps([]),import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(i),await this.config.imports());const r=`flow-container-${i.toLowerCase()}`,s=document.querySelector(r);s?this.container=s:(this.container=document.createElement(r),this.container.id=i),Be.$[i]=this.container;const l=await f(()=>import("./FlowClient-BZ2ixoyw.js"),__vite__mapDeps([]),import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,i)=>{const n=document.createElement("script");n.onload=()=>o(),n.onerror=i,n.src=e,document.body.appendChild(n)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),i=document.createElement("script");i.type="module",i.setAttribute("data-app-id",o),document.body.append(i)}async flowInitClient(e){return e.init(),new Promise(o=>{const i=setInterval(()=>{Object.keys(k.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").reduce((r,s)=>r||k.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(i),o())},5)})}async flowInitUi(){const e=k.Vaadin&&k.Vaadin.TypeScript&&k.Vaadin.TypeScript.initial;return e?(k.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,i)=>{const r=new XMLHttpRequest,s=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;r.open("GET",s),r.onerror=()=>i(new Ei(`Invalid server response when initializing Flow UI.
        ${r.status}
        ${r.responseText}`)),r.onload=()=>{const l=r.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(r.responseText)):r.onerror()},r.send()})}addConnectionIndicator(){O.create(),k.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){k.Vaadin.connectionState.state=A.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{k.Vaadin.connectionState.state=A.CONNECTED},e.onerror=()=>{k.Vaadin.connectionState.state=A.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),k.addEventListener("offline",()=>{this.isFlowClientLoaded()||(k.Vaadin.connectionState.state=A.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe");e.setAttribute("src","./offline-stub.html"),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let i;const n=()=>{i!==void 0&&(k.Vaadin.connectionState.removeStateChangeListener(i),i=void 0)};return e.onBeforeEnter=(r,s,l)=>{i=()=>{k.Vaadin.connectionState.online&&(n(),l.render(r,!1))},k.Vaadin.connectionState.addStateChangeListener(i)},e.onBeforeLeave=(r,s,l)=>{n()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:ps}=new us({imports:()=>f(()=>import("./generated-flow-imports-DSJIDO3H.js"),__vite__mapDeps([]),import.meta.url)}),hs=[...ps],ms=new he(document.querySelector("#outlet"));ms.setRoutes(hs);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,i=typeof DOMException=="object"?Error:DOMException,n=Object.defineProperty,r=Array.prototype.forEach,s=/@import.+?;?$/gm;function l(p){var m=p.replace(s,"");return m!==p&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),m.trim()}function a(p){return"isConnected"in p?p.isConnected:document.contains(p)}function c(p){return p.filter(function(m,_){return p.indexOf(m)===_})}function d(p,m){return p.filter(function(_){return m.indexOf(_)===-1})}function h(p){p.parentNode.removeChild(p)}function u(p){return p.shadowRoot||o.get(p)}var y=["addRule","deleteRule","insertRule","removeRule"],re=CSSStyleSheet,G=re.prototype;G.replace=function(){return Promise.reject(new i("Can't call replace on non-constructed CSSStyleSheets."))},G.replaceSync=function(){throw new i("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function nt(p){return typeof p=="object"?$e.isPrototypeOf(p)||G.isPrototypeOf(p):!1}function Bt(p){return typeof p=="object"?G.isPrototypeOf(p):!1}var W=new WeakMap,ie=new WeakMap,Ce=new WeakMap,Te=new WeakMap;function Ht(p,m){var _=document.createElement("style");return Ce.get(p).set(m,_),ie.get(p).push(m),_}function se(p,m){return Ce.get(p).get(m)}function rt(p,m){Ce.get(p).delete(m),ie.set(p,ie.get(p).filter(function(_){return _!==m}))}function Do(p,m){requestAnimationFrame(function(){m.textContent=W.get(p).textContent,Te.get(p).forEach(function(_){return m.sheet[_.method].apply(m.sheet,_.args)})})}function st(p){if(!W.has(p))throw new TypeError("Illegal invocation")}function Wt(){var p=this,m=document.createElement("style");e.body.appendChild(m),W.set(p,m),ie.set(p,[]),Ce.set(p,new WeakMap),Te.set(p,[])}var $e=Wt.prototype;$e.replace=function(m){try{return this.replaceSync(m),Promise.resolve(this)}catch(_){return Promise.reject(_)}},$e.replaceSync=function(m){if(st(this),typeof m=="string"){var _=this;W.get(_).textContent=l(m),Te.set(_,[]),ie.get(_).forEach(function(D){D.isConnected()&&Do(_,se(_,D))})}},n($e,"cssRules",{configurable:!0,enumerable:!0,get:function(){return st(this),W.get(this).sheet.cssRules}}),n($e,"media",{configurable:!0,enumerable:!0,get:function(){return st(this),W.get(this).sheet.media}}),y.forEach(function(p){$e[p]=function(){var m=this;st(m);var _=arguments;Te.get(m).push({method:p,args:_}),ie.get(m).forEach(function(B){if(B.isConnected()){var L=se(m,B).sheet;L[p].apply(L,_)}});var D=W.get(m).sheet;return D[p].apply(D,_)}}),n(Wt,Symbol.hasInstance,{configurable:!0,value:nt});var jo={childList:!0,subtree:!0},Uo=new WeakMap;function Ae(p){var m=Uo.get(p);return m||(m=new Ho(p),Uo.set(p,m)),m}function Fo(p){n(p.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Ae(this).sheets},set:function(m){Ae(this).update(m)}})}function qt(p,m){for(var _=document.createNodeIterator(p,NodeFilter.SHOW_ELEMENT,function(B){return u(B)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),D=void 0;D=_.nextNode();)m(u(D))}var at=new WeakMap,Re=new WeakMap,lt=new WeakMap;function zn(p,m){return m instanceof HTMLStyleElement&&Re.get(p).some(function(_){return se(_,p)})}function Bo(p){var m=at.get(p);return m instanceof Document?m.body:m}function Gt(p){var m=document.createDocumentFragment(),_=Re.get(p),D=lt.get(p),B=Bo(p);D.disconnect(),_.forEach(function(L){m.appendChild(se(L,p)||Ht(L,p))}),B.insertBefore(m,null),D.observe(B,jo),_.forEach(function(L){Do(L,se(L,p))})}function Ho(p){var m=this;m.sheets=[],at.set(m,p),Re.set(m,[]),lt.set(m,new MutationObserver(function(_,D){if(!document){D.disconnect();return}_.forEach(function(B){t||r.call(B.addedNodes,function(L){L instanceof Element&&qt(L,function(Pe){Ae(Pe).connect()})}),r.call(B.removedNodes,function(L){L instanceof Element&&(zn(m,L)&&Gt(m),t||qt(L,function(Pe){Ae(Pe).disconnect()}))})})}))}if(Ho.prototype={isConnected:function(){var p=at.get(this);return p instanceof Document?p.readyState!=="loading":a(p.host)},connect:function(){var p=Bo(this);lt.get(this).observe(p,jo),Re.get(this).length>0&&Gt(this),qt(p,function(m){Ae(m).connect()})},disconnect:function(){lt.get(this).disconnect()},update:function(p){var m=this,_=at.get(m)===document?"Document":"ShadowRoot";if(!Array.isArray(p))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Iterator getter is not callable.");if(!p.every(nt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Failed to convert value to 'CSSStyleSheet'");if(p.some(Bt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Can't adopt non-constructed stylesheets");m.sheets=p;var D=Re.get(m),B=c(p),L=d(D,B);L.forEach(function(Pe){h(se(Pe,m)),rt(Pe,m)}),Re.set(m,B),m.isConnected()&&B.length>0&&Gt(m)}},window.CSSStyleSheet=Wt,Fo(Document),"ShadowRoot"in window){Fo(ShadowRoot);var Wo=Element.prototype,Mn=Wo.attachShadow;Wo.attachShadow=function(m){var _=Mn.call(this,m);return m.mode==="closed"&&o.set(this,_),_}}var ct=Ae(document);ct.isConnected()?ct.connect():document.addEventListener("DOMContentLoaded",ct.connect.bind(ct))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _n=Symbol.for(""),vs=t=>{if((t==null?void 0:t.r)===_n)return t==null?void 0:t._$litStatic$},gs=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},pt=(t,...e)=>({_$litStatic$:e.reduce((o,i,n)=>o+gs(i)+t[n+1],t[0]),r:_n}),Si=new Map,fs=t=>(e,...o)=>{const i=o.length;let n,r;const s=[],l=[];let a=0,c=!1,d;for(;a<i;){for(d=e[a];a<i&&(r=o[a],(n=vs(r))!==void 0);)d+=n+e[++a],c=!0;a!==i&&l.push(r),s.push(d),a++}if(a===i&&s.push(e[i]),c){const h=s.join("$$lit$$");e=Si.get(h),e===void 0&&(s.raw=s,Si.set(h,e=s)),o=l}return t(e,...o)},bs=fs(b),ys="modulepreload",xs=function(t){return"/"+t},ki={},g=function(t,e,o){if(!e||e.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(e.map(n=>{if(n=xs(n),n in ki)return;ki[n]=!0;const r=n.endsWith(".css"),s=r?'[rel="stylesheet"]':"";if(o)for(let a=i.length-1;a>=0;a--){const c=i[a];if(c.href===n&&(!r||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${s}`))return;const l=document.createElement("link");if(l.rel=r?"stylesheet":ys,r||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),r)return new Promise((a,c)=>{l.addEventListener("load",a),l.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t()).catch(n=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n})};function v(t,e,o,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r}const Ao=1e3,Ro=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),i=Array.from(t.querySelectorAll("*")).filter(n=>n.shadowRoot).flatMap(n=>Ro(n.shadowRoot,e));return[...o,...i]};let Ci=!1;const Qe=(t,e)=>{Ci||(window.addEventListener("message",n=>{n.data==="validate-license"&&window.location.reload()},!1),Ci=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const n=o.shadowRoot.querySelector("slot:not([name])");if(n&&n.assignedElements().length>0){Qe(n.assignedElements()[0],e);return}}Qe(o,e);return}const i=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${i}</div></no-license>`)},qe={},Ti={},Me={},En={},ne=t=>`${t.name}_${t.version}`,$i=t=>{const{cvdlName:e,version:o}=t.constructor,i={name:e,version:o},n=t.tagName.toLowerCase();qe[e]=qe[e]??[],qe[e].push(n);const r=Me[ne(i)];r&&setTimeout(()=>Qe(t,r),Ao),Me[ne(i)]||En[ne(i)]||Ti[ne(i)]||(Ti[ne(i)]=!0,window.Vaadin.devTools.checkLicense(i))},ws=t=>{En[ne(t)]=!0,console.debug("License check ok for",t)},Sn=t=>{const e=t.product.name;Me[ne(t.product)]=t,console.error("License check failed for",e);const o=qe[e];(o==null?void 0:o.length)>0&&Ro(document,o).forEach(i=>{setTimeout(()=>Qe(i,Me[ne(t.product)]),Ao)})},_s=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Me[ne(t.product)]=t,console.error("No license found when checking",o);const i=qe[o];(i==null?void 0:i.length)>0&&Ro(document,i).forEach(n=>{setTimeout(()=>Qe(n,Me[ne(t.product)]),Ao)})},Es=t=>t.command==="license-check-ok"?(ws(t.data),!0):t.command==="license-check-failed"?(Sn(t.data),!0):t.command==="license-check-nokey"?(_s(t.data),!0):!1,Ss=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{$i(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{$i(t)}}};function ks(t){var e;const o=[];for(;t&&t.parentNode;){const i=mo(t);if(i.nodeId!==-1){if((e=i.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(i)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function mo(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const n of i){const r=o[n];if(r.getNodeId){const s=r.getNodeId(t);if(s>=0)return{nodeId:s,uiId:r.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function Cs(t,e){if(t.contains(e))return!0;let o=e;const i=e.ownerDocument;for(;o&&o!==i&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}var S;(function(t){t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error"})(S||(S={}));class Rt{constructor(){this.status=S.UNAVAILABLE}onHandshake(){}onConnectionError(e){}onStatusChange(e){}setActive(e){!e&&this.status===S.ACTIVE?this.setStatus(S.INACTIVE):e&&this.status===S.INACTIVE&&this.setStatus(S.ACTIVE)}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}}Rt.HEARTBEAT_INTERVAL=18e4;class Ts extends Rt{constructor(e){super(),this.webSocket=new WebSocket(e),this.webSocket.onmessage=o=>this.handleMessage(o),this.webSocket.onerror=o=>this.handleError(o),this.webSocket.onclose=o=>{this.status!==S.ERROR&&this.setStatus(S.UNAVAILABLE),this.webSocket=void 0},setInterval(()=>{this.webSocket&&self.status!==S.ERROR&&this.status!==S.UNAVAILABLE&&this.webSocket.send("")},Rt.HEARTBEAT_INTERVAL)}onReload(){}handleMessage(e){let o;try{o=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}o.command==="hello"?(this.setStatus(S.ACTIVE),this.onHandshake()):o.command==="reload"?this.status===S.ACTIVE&&this.onReload():this.handleError(`Unknown message from the livereload server: ${e}`)}handleError(e){console.error(e),this.setStatus(S.ERROR),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}}const kn=x`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`,$s=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((i,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var R;(function(t){t.text="text",t.checkbox="checkbox",t.range="range",t.color="color"})(R||(R={}));const oe={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},As=Object.freeze(Object.defineProperty({__proto__:null,presets:oe},Symbol.toStringTag,{value:"Module"})),le={textColor:{propertyName:"color",displayName:"Text color",editorType:R.color,presets:oe.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:R.range,presets:oe.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:R.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:R.checkbox,checkedValue:"italic"}},ee={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:R.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:R.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:R.range,presets:oe.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:R.range,presets:oe.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:R.range,presets:oe.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:R.range,presets:oe.lumoSpace,icon:"square"}},Rs={height:{propertyName:"height",displayName:"Size",editorType:R.range,presets:oe.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:R.range,presets:oe.lumoSpace,icon:"square"}},vo={iconColor:{propertyName:"color",displayName:"Icon color",editorType:R.color,presets:oe.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:R.range,presets:oe.lumoFontSize,icon:"font"}},Ps=[ee.backgroundColor,ee.borderColor,ee.borderWidth,ee.borderRadius,ee.padding],Is=[le.textColor,le.fontSize,le.fontWeight,le.fontStyle],Ns=[vo.iconColor,vo.iconSize],Os=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:Rs,iconProperties:vo,shapeProperties:ee,standardIconProperties:Ns,standardShapeProperties:Ps,standardTextProperties:Is,textProperties:le},Symbol.toStringTag,{value:"Module"}));function Cn(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[ee.backgroundColor,ee.borderColor,ee.borderWidth,ee.borderRadius,ee.padding,le.textColor,le.fontSize,le.fontWeight,le.fontStyle]}]}}const Ls=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:Cn},Symbol.toStringTag,{value:"Module"})),zs=t=>$s(Object.assign({"./components/defaults.ts":()=>g(()=>Promise.resolve().then(()=>Os),void 0),"./components/generic.ts":()=>g(()=>Promise.resolve().then(()=>Ls),void 0),"./components/presets.ts":()=>g(()=>Promise.resolve().then(()=>As),void 0),"./components/vaadin-accordion-heading.ts":()=>g(()=>f(()=>import("./vaadin-accordion-heading-c0acdd6d-CEKy92xJ.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion-panel.ts":()=>g(()=>f(()=>import("./vaadin-accordion-panel-616e55d6-CajM9_SA.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion.ts":()=>g(()=>f(()=>import("./vaadin-accordion-eed3b794-B6oEo6xx.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-app-layout.ts":()=>g(()=>f(()=>import("./vaadin-app-layout-e56de2e9-egJdX56u.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-avatar.ts":()=>g(()=>f(()=>import("./vaadin-avatar-7599297d-CdXqR-31.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>g(()=>f(()=>import("./vaadin-big-decimal-field-e51def24-DvRYdmq1.js"),__vite__mapDeps([0,1,2]),import.meta.url),["assets/vaadin-big-decimal-field-e51def24.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-board-row.ts":()=>g(()=>f(()=>import("./vaadin-board-row-c70d0c55-DwKrjRDR.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-board.ts":()=>g(()=>f(()=>import("./vaadin-board-828ebdea-CqFf5VJi.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-button.ts":()=>g(()=>f(()=>import("./vaadin-button-2511ad84-DV63IXOq.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-chart.ts":()=>g(()=>f(()=>import("./vaadin-chart-5192dc15-DQHbSWaN.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>g(()=>f(()=>import("./vaadin-checkbox-group-a7c65bf2-BX4L325t.js"),__vite__mapDeps([3,1,4]),import.meta.url),["assets/vaadin-checkbox-group-a7c65bf2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-checkbox.ts":()=>g(()=>f(()=>import("./vaadin-checkbox-4e68df64-CjiOpJff.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>g(()=>f(()=>import("./vaadin-combo-box-96451ddd-BkXHDwwm.js"),__vite__mapDeps([5,1]),import.meta.url),["assets/vaadin-combo-box-96451ddd.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-confirm-dialog.ts":()=>g(()=>f(()=>import("./vaadin-confirm-dialog-4d718829-BJEpa_57.js"),__vite__mapDeps([6,2]),import.meta.url),["assets/vaadin-confirm-dialog-4d718829.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-cookie-consent.ts":()=>g(()=>f(()=>import("./vaadin-cookie-consent-46c09f8b-BZwjOHV5.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-crud.ts":()=>g(()=>f(()=>import("./vaadin-crud-8d161a22-DC5sT-98.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-custom-field.ts":()=>g(()=>f(()=>import("./vaadin-custom-field-42c85b9e-md981e0Q.js"),__vite__mapDeps([7,1]),import.meta.url),["assets/vaadin-custom-field-42c85b9e.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-picker.ts":()=>g(()=>f(()=>import("./vaadin-date-picker-f2001167-DUZ-duuK.js"),__vite__mapDeps([8,1]),import.meta.url),["assets/vaadin-date-picker-f2001167.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-time-picker.ts":()=>g(()=>f(()=>import("./vaadin-date-time-picker-c8c047a7-CqW8Woy0.js"),__vite__mapDeps([9,1]),import.meta.url),["assets/vaadin-date-time-picker-c8c047a7.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-details-summary.ts":()=>g(()=>f(()=>import("./vaadin-details-summary-351a1448-CM8LoOJy.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-details.ts":()=>g(()=>f(()=>import("./vaadin-details-bf336660-CafcDBGD.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-dialog.ts":()=>g(()=>f(()=>import("./vaadin-dialog-53253a08-DAUXBMMO.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-email-field.ts":()=>g(()=>f(()=>import("./vaadin-email-field-d7a35f04-BeH1DIBw.js"),__vite__mapDeps([10,1,2]),import.meta.url),["assets/vaadin-email-field-d7a35f04.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-form-layout.ts":()=>g(()=>f(()=>import("./vaadin-form-layout-47744b1d-D8-CQQgg.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-grid-pro.ts":()=>g(()=>f(()=>import("./vaadin-grid-pro-ff415555-CWGUrc_9.js"),__vite__mapDeps([11,4,12,1]),import.meta.url),["assets/vaadin-grid-pro-ff415555.js","assets/vaadin-checkbox-4e68df64.js","assets/vaadin-grid-0a4791c2.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-grid.ts":()=>g(()=>f(()=>import("./vaadin-grid-0a4791c2-nmq2geUK.js"),__vite__mapDeps([12,4]),import.meta.url),["assets/vaadin-grid-0a4791c2.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-horizontal-layout.ts":()=>g(()=>f(()=>import("./vaadin-horizontal-layout-3193943f-DmM4ZygT.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-icon.ts":()=>g(()=>f(()=>import("./vaadin-icon-601f36ed-pVv9fL16.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>g(()=>f(()=>import("./vaadin-integer-field-85078932-UYK1TK-9.js"),__vite__mapDeps([13,1,2]),import.meta.url),["assets/vaadin-integer-field-85078932.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-list-box.ts":()=>g(()=>f(()=>import("./vaadin-list-box-d7a8433b-BhhxeEom.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-login-form.ts":()=>g(()=>f(()=>import("./vaadin-login-form-638996c6-BG3ayNlh.js"),__vite__mapDeps([14,1,2]),import.meta.url),["assets/vaadin-login-form-638996c6.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-login-overlay.ts":()=>g(()=>f(()=>import("./vaadin-login-overlay-f8a5db8a-CiHhigeX.js"),__vite__mapDeps([15,1,2]),import.meta.url),["assets/vaadin-login-overlay-f8a5db8a.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-map.ts":()=>g(()=>f(()=>import("./vaadin-map-d40a0116-Do4krUHG.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-menu-bar.ts":()=>g(()=>f(()=>import("./vaadin-menu-bar-3f5ab096-BhDBFyeE.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-message-input.ts":()=>g(()=>f(()=>import("./vaadin-message-input-996ac37c-DES8Simu.js"),__vite__mapDeps([16,1]),import.meta.url),["assets/vaadin-message-input-996ac37c.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-message-list.ts":()=>g(()=>f(()=>import("./vaadin-message-list-70a435ba-BLJHbdU_.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-multi-select-combo-box.ts":()=>g(()=>f(()=>import("./vaadin-multi-select-combo-box-a3373557-m_9wQLP5.js"),__vite__mapDeps([17,1]),import.meta.url),["assets/vaadin-multi-select-combo-box-a3373557.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-notification.ts":()=>g(()=>f(()=>import("./vaadin-notification-bd6eb776-B9Jh6Em8.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-number-field.ts":()=>g(()=>f(()=>import("./vaadin-number-field-cb3ee8b2-ByYtpDcD.js"),__vite__mapDeps([18,1,2]),import.meta.url),["assets/vaadin-number-field-cb3ee8b2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-password-field.ts":()=>g(()=>f(()=>import("./vaadin-password-field-d289cb18-DDruIxfI.js"),__vite__mapDeps([19,1,2]),import.meta.url),["assets/vaadin-password-field-d289cb18.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-progress-bar.ts":()=>g(()=>f(()=>import("./vaadin-progress-bar-309ecf1f-C67yxKGN.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>g(()=>f(()=>import("./vaadin-radio-group-88b5afd8-CQG6NopJ.js"),__vite__mapDeps([20,1]),import.meta.url),["assets/vaadin-radio-group-88b5afd8.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-rich-text-editor.ts":()=>g(()=>f(()=>import("./vaadin-rich-text-editor-8cd892f2-08iP6qqc.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-scroller.ts":()=>g(()=>f(()=>import("./vaadin-scroller-35e68818-BJ8xKy5X.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-select.ts":()=>g(()=>f(()=>import("./vaadin-select-df6e9947-879P0x7G.js"),__vite__mapDeps([21,1]),import.meta.url),["assets/vaadin-select-df6e9947.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-side-nav-item.ts":()=>g(()=>f(()=>import("./vaadin-side-nav-item-34918f92-8K4EbNi0.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-side-nav.ts":()=>g(()=>f(()=>import("./vaadin-side-nav-ba80d91d-Mjm-oikI.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-split-layout.ts":()=>g(()=>f(()=>import("./vaadin-split-layout-80c92131-vDB_AmLm.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-spreadsheet.ts":()=>g(()=>f(()=>import("./vaadin-spreadsheet-59d8c5ef-BtupcgEv.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tab.ts":()=>g(()=>f(()=>import("./vaadin-tab-aaf32809-TX5UqFrp.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabs.ts":()=>g(()=>f(()=>import("./vaadin-tabs-d9a5e24e-DI34RrAg.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabsheet.ts":()=>g(()=>f(()=>import("./vaadin-tabsheet-dd99ed9a-DVqtxox0.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-text-area.ts":()=>g(()=>f(()=>import("./vaadin-text-area-83627ebc-BVDETFlL.js"),__vite__mapDeps([22,1,2]),import.meta.url),["assets/vaadin-text-area-83627ebc.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-text-field.ts":()=>g(()=>f(()=>import("./vaadin-text-field-0b3db014-D-aBqczF.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>g(()=>f(()=>import("./vaadin-time-picker-715ec415-BU73jkwf.js"),__vite__mapDeps([23,1]),import.meta.url),["assets/vaadin-time-picker-715ec415.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-upload.ts":()=>g(()=>f(()=>import("./vaadin-upload-d3c162ed-C7VmR0kL.js"),__vite__mapDeps([24,2]),import.meta.url),["assets/vaadin-upload-d3c162ed.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-vertical-layout.ts":()=>g(()=>f(()=>import("./vaadin-vertical-layout-ad4174c4-CbVdGoWG.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>g(()=>f(()=>import("./vaadin-virtual-list-96896203-CAoJ8l3t.js"),__vite__mapDeps([]),import.meta.url),[])}),`./components/${t}.ts`);class Ms{constructor(e=zs){this.loader=e,this.metadata={}}async getMetadata(e){var o;const i=(o=e.element)==null?void 0:o.localName;if(!i)return null;if(!i.startsWith("vaadin-"))return Cn(i);let n=this.metadata[i];if(n)return n;try{n=(await this.loader(i)).default,this.metadata[i]=n}catch{console.warn(`Failed to load metadata for component: ${i}`)}return n||null}}const Vs=new Ms,xt={crosshair:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Ie`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Ve;(function(t){t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme"})(Ve||(Ve={}));var N;(function(t){t.local="local",t.global="global"})(N||(N={}));function no(t,e){return`${t}|${e}`}class me{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[no(e,o)]||null}updatePropertyValue(e,o,i,n){if(!i){delete this._properties[no(e,o)];return}let r=this.getPropertyValue(e,o);r?(r.value=i,r.modified=n||!1):(r={elementSelector:e,propertyName:o,value:i,modified:n||!1},this._properties[no(e,o)]=r)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new me(e[0].metadata);return e.forEach(i=>o.addPropertyValues(i.properties)),o}static fromServerRules(e,o,i){const n=new me(e);return e.elements.forEach(r=>{const s=De(r,o),l=i.find(a=>a.selector===s.replace(/ > /g,">"));l&&r.properties.forEach(a=>{const c=l.properties[a.propertyName];c&&n.updatePropertyValue(r.selector,a.propertyName,c,!0)})}),n}}function De(t,e){const o=t.selector;if(e.themeScope===N.global)return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const i=o.match(/^[\w\d-_]+/),n=i&&i[0];if(!n)throw new Error(`Selector does not start with a tag name: ${o}`);return`${n}.${e.localClassName}${o.substring(n.length,o.length)}`}function Ds(t,e,o,i){const n=De(t,e),r={[o]:i};return o==="border-width"&&(parseInt(i)>0?r["border-style"]="solid":r["border-style"]=""),{selector:n,properties:r}}function js(t){const e=Object.entries(t.properties).map(([o,i])=>`${o}: ${i};`).join(" ");return`${t.selector} { ${e} }`}let ht,Ai="";function Po(t){ht||(ht=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ht]),Ai+=t.cssText,ht.replaceSync(Ai)}const Tn=x`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,Ri="__vaadin-theme-editor-measure-element",Pi=/((::before)|(::after))$/,Ii=/::part\(([\w\d_-]+)\)$/;Po(x`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Us(t){const e=new me(t),o=document.createElement(t.tagName);o.classList.add(Ri),document.body.append(o),t.setupElement&&await t.setupElement(o);const i={themeScope:N.local,localClassName:Ri};try{t.elements.forEach(n=>{Ni(o,n,i,!0);let r=De(n,i);const s=r.match(Pi);r=r.replace(Pi,"");const l=r.match(Ii),a=r.replace(Ii,"");let c=document.querySelector(a);if(c&&l){const u=`[part~="${l[1]}"]`;c=c.shadowRoot.querySelector(u)}if(!c)return;c.style.transition="none";const d=s?s[1]:null,h=getComputedStyle(c,d);n.properties.forEach(u=>{const y=h.getPropertyValue(u.propertyName)||u.defaultValue||"";e.updatePropertyValue(n.selector,u.propertyName,y)}),Ni(o,n,i,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Ni(t,e,o,i){if(e.stateAttribute){if(e.stateElementSelector){const n=De({...e,selector:e.stateElementSelector},o);t=document.querySelector(n)}t&&(i?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function Oi(t){return t.trim()}function Fs(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return Oi(o.textContent);const i=e.textContent;return i?Oi(i):null}class Bs{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const i=this._localClassNameMap.get(e);i&&(e.classList.remove(i),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const be=new Bs;var Y;(function(t){t.response="themeEditorResponse",t.loadComponentMetadata="themeEditorComponentMetadata",t.setLocalClassName="themeEditorLocalClassName",t.setCssRules="themeEditorRules",t.loadRules="themeEditorLoadRules",t.history="themeEditorHistory",t.openCss="themeEditorOpenCss",t.markAsUsed="themeEditorMarkAsUsed"})(Y||(Y={}));var go;(function(t){t.ok="ok",t.error="error"})(go||(go={}));class Hs{constructor(e){this.pendingRequests={},this.requestCounter=0,this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=i=>{i.command===Y.response?this.handleResponse(i.data):o.call(this.wrappedConnection,i)}}sendRequest(e,o){const i=(this.requestCounter++).toString(),n=o.uiId??this.getGlobalUiId();return new Promise((r,s)=>{this.wrappedConnection.send(e,{...o,requestId:i,uiId:n}),this.pendingRequests[i]={resolve:r,reject:s}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code===go.ok?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest(Y.loadComponentMetadata,{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest(Y.setLocalClassName,{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest(Y.setCssRules,{rules:e})}loadRules(e){return this.sendRequest(Y.loadRules,{selectors:e})}markAsUsed(){return this.sendRequest(Y.markAsUsed,{})}undo(e){return this.sendRequest(Y.history,{undo:e})}redo(e){return this.sendRequest(Y.history,{redo:e})}openCss(e){return this.sendRequest(Y.openCss,{selector:e})}getGlobalUiId(){if(this.globalUiId===void 0){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const n of i){const r=o[n];if(r.getNodeId){this.globalUiId=r.getUIId();break}}}}return this.globalUiId??-1}}const z={index:-1,entries:[]};class Ws{constructor(e){this.api=e}get allowUndo(){return z.index>=0}get allowRedo(){return z.index<z.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,i){const n={requestId:e,execute:o,rollback:i};if(z.index++,z.entries=z.entries.slice(0,z.index),z.entries.push(n),o)try{o()}catch(r){console.error("Execute history entry failed",r)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=z.entries[z.index];z.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;z.index++;const e=z.entries[z.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){z.entries=[],z.index=-1}}class qs extends CustomEvent{constructor(e,o,i){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:i}})}}class q extends P{constructor(){super(...arguments),this.value=""}static get styles(){return[Tn,x`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return b`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?b`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new qs(this.elementMetadata,this.propertyMetadata,e))}}v([w({})],q.prototype,"elementMetadata",void 0);v([w({})],q.prototype,"propertyMetadata",void 0);v([w({})],q.prototype,"theme",void 0);v([I()],q.prototype,"propertyValue",void 0);v([I()],q.prototype,"value",void 0);class Pt{get values(){return this._values}get rawValues(){return this._rawValues}constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,i=e.presets??[];this._values=(i||[]).map(r=>r.startsWith("--")?`var(${r})`:r);const n=document.createElement("div");n.style.borderStyle="solid",n.style.visibility="hidden",document.body.append(n);try{this._values.forEach(r=>{n.style.setProperty(o,r);const s=getComputedStyle(n);this._rawValues[r]=s.getPropertyValue(o).trim()})}finally{n.remove()}}}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(i=>this._rawValues[i]===o)}}class Li extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let It=class extends P{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return x`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return b`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${xt.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new Li(e.value))}handleClearClick(){this.dispatchEvent(new Li(""))}};v([w({})],It.prototype,"value",void 0);v([w({})],It.prototype,"showClearButton",void 0);It=v([V("vaadin-dev-tools-theme-text-input")],It);class Gs extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Ze=class extends P{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[Tn,x`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return b` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?b`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Gs(this.editedClassName))}};v([w({})],Ze.prototype,"className",void 0);v([I()],Ze.prototype,"editedClassName",void 0);v([I()],Ze.prototype,"invalid",void 0);Ze=v([V("vaadin-dev-tools-theme-class-name-editor")],Ze);class Ks extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Po(x`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let et=class extends P{constructor(){super(...arguments),this.value=N.local}static get styles(){return x`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return b` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",i=`${o}s`;we(b`
        <vaadin-list-box>
          <vaadin-item value=${N.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${N.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${i}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Ks(e))}};v([w({})],et.prototype,"value",void 0);v([w({})],et.prototype,"metadata",void 0);v([it("vaadin-select")],et.prototype,"select",void 0);et=v([V("vaadin-dev-tools-theme-scope-selector")],et);let zi=class extends q{static get styles(){return[q.styles,x`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return b` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};zi=v([V("vaadin-dev-tools-theme-checkbox-property-editor")],zi);let Mi=class extends q{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return b`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};Mi=v([V("vaadin-dev-tools-theme-text-property-editor")],Mi);let Nt=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Pt}static get styles(){return[q.styles,x`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Pt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return b`
      <div class=${$o(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),i=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[i]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};v([I()],Nt.prototype,"selectedPresetIndex",void 0);v([I()],Nt.prototype,"presets",void 0);Nt=v([V("vaadin-dev-tools-theme-range-property-editor")],Nt);const je=(t,e=0,o=1)=>t>o?o:t<e?e:t,F=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,$n=({h:t,s:e,v:o,a:i})=>{const n=(200-e)*o/100;return{h:F(t),s:F(n>0&&n<200?e*o/100/(n<=100?n:200-n)*100:0),l:F(n/2),a:F(i,2)}},fo=t=>{const{h:e,s:o,l:i}=$n(t);return`hsl(${e}, ${o}%, ${i}%)`},ro=t=>{const{h:e,s:o,l:i,a:n}=$n(t);return`hsla(${e}, ${o}%, ${i}%, ${n})`},Js=({h:t,s:e,v:o,a:i})=>{t=t/360*6,e=e/100,o=o/100;const n=Math.floor(t),r=o*(1-e),s=o*(1-(t-n)*e),l=o*(1-(1-t+n)*e),a=n%6;return{r:F([o,s,r,r,l,o][a]*255),g:F([l,o,o,s,r,r][a]*255),b:F([r,r,l,o,o,s][a]*255),a:F(i,2)}},Ys=t=>{const{r:e,g:o,b:i,a:n}=Js(t);return`rgba(${e}, ${o}, ${i}, ${n})`},Xs=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?Qs({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},Qs=({r:t,g:e,b:o,a:i})=>{const n=Math.max(t,e,o),r=n-Math.min(t,e,o),s=r?n===t?(e-o)/r:n===e?2+(o-t)/r:4+(t-e)/r:0;return{h:F(60*(s<0?s+6:s)),s:F(n?r/n*100:0),v:F(n/255*100),a:i}},Zs=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},ea=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),Vi={},An=t=>{let e=Vi[t];return e||(e=document.createElement("template"),e.innerHTML=t,Vi[t]=e),e},Io=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Le=!1;const bo=t=>"touches"in t,ta=t=>Le&&!bo(t)?!1:(Le||(Le=bo(t)),!0),Di=(t,e)=>{const o=bo(e)?e.touches[0]:e,i=t.el.getBoundingClientRect();Io(t.el,"move",t.getMove({x:je((o.pageX-(i.left+window.pageXOffset))/i.width),y:je((o.pageY-(i.top+window.pageYOffset))/i.height)}))},oa=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),Io(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class No{constructor(e,o,i,n){const r=An(`<div role="slider" tabindex="0" part="${o}" ${i}><div part="${o}-pointer"></div></div>`);e.appendChild(r.content.cloneNode(!0));const s=e.querySelector(`[part=${o}]`);s.addEventListener("mousedown",this),s.addEventListener("touchstart",this),s.addEventListener("keydown",this),this.el=s,this.xy=n,this.nodes=[s.firstChild,s]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Le?"touchmove":"mousemove",this),o(Le?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!ta(e)||!Le&&e.button!=0)return;this.el.focus(),Di(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Di(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":oa(this,e);break}}style(e){e.forEach((o,i)=>{for(const n in o)this.nodes[i].style.setProperty(n,o[n])})}}class ia extends No{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:fo({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${F(e)}`)}getMove(e,o){return{h:o?je(this.h+e.x*360,0,360):360*e.x}}}class na extends No{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:fo(e)},{"background-color":fo({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${F(e.s)}%, Brightness ${F(e.v)}%`)}getMove(e,o){return{s:o?je(this.hsva.s+e.x*100,0,100):e.x*100,v:o?je(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const ra=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',sa="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",aa="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",mt=Symbol("same"),so=Symbol("color"),ji=Symbol("hsva"),ao=Symbol("update"),Ui=Symbol("parts"),Ot=Symbol("css"),Lt=Symbol("sliders");let la=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Ot](){return[ra,sa,aa]}get[Lt](){return[na,ia]}get color(){return this[so]}set color(t){if(!this[mt](t)){const e=this.colorModel.toHsva(t);this[ao](e),this[so]=t}}constructor(){super();const t=An(`<style>${this[Ot].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[Ui]=this[Lt].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const i=this.colorModel.fromAttr(o);this[mt](i)||(this.color=i)}handleEvent(t){const e=this[ji],o={...e,...t.detail};this[ao](o);let i;!Zs(o,e)&&!this[mt](i=this.colorModel.fromHsva(o))&&(this[so]=i,Io(this,"color-changed",{value:i}))}[mt](t){return this.color&&this.colorModel.equal(t,this.color)}[ao](t){this[ji]=t,this[Ui].forEach(e=>e.update(t))}};class ca extends No{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=ro({...e,a:0}),i=ro({...e,a:1}),n=e.a*100;this.style([{left:`${n}%`,color:ro(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${i}`}]);const r=F(n);this.el.setAttribute("aria-valuenow",`${r}`),this.el.setAttribute("aria-valuetext",`${r}%`)}getMove(e,o){return{a:o?je(this.hsva.a+e.x):e.x}}}const da=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class ua extends la{get[Ot](){return[...super[Ot],da]}get[Lt](){return[...super[Lt],ca]}}const pa={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Xs,fromHsva:Ys,equal:ea,fromAttr:t=>t};class ha extends ua{get colorModel(){return pa}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ma(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const lo={start:"top",end:"bottom"},co={start:"left",end:"right"},Fi=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),va=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ma(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Fi.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Fi.observe(o))),e){const i=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(n=>{this.__margins[n]=parseInt(i[n],10)})),this.setAttribute("dir",i.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const i=this.__isRTL,n=this.__shouldAlignStartHorizontally(e,i),r=!i&&n||i&&!n;this.style.alignItems=r?"flex-start":"flex-end";const s=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,s,this.noVerticalOverlap,lo,this,o),a=this.__calculatePositionInOneDimension(e,s,this.noHorizontalOverlap,co,this,n);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!r),this.toggleAttribute("start-aligned",r)}__shouldAlignStartHorizontally(e,o){const i=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const n=Math.min(window.innerWidth,document.documentElement.clientWidth),r=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,i,n,this.__margins,r,this.noHorizontalOverlap,co)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const i=Math.min(window.innerHeight,document.documentElement.clientHeight),n=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,i,this.__margins,n,this.noVerticalOverlap,lo)}__shouldAlignStart(e,o,i,n,r,s,l){const a=i-e[s?l.end:l.start]-n[l.end],c=e[s?l.start:l.end]-n[l.start],d=r?a:c,h=d>(r?c:a)||d>o;return r===h}__adjustBottomProperty(e,o,i){let n;if(e===o.end){if(o.end===lo.end){const r=Math.min(window.innerHeight,document.documentElement.clientHeight);if(i>r&&this.__oldViewportHeight){const s=this.__oldViewportHeight-r;n=i-s}this.__oldViewportHeight=r}if(o.end===co.end){const r=Math.min(window.innerWidth,document.documentElement.clientWidth);if(i>r&&this.__oldViewportWidth){const s=this.__oldViewportWidth-r;n=i-s}this.__oldViewportWidth=r}}return n}__calculatePositionInOneDimension(e,o,i,n,r,s){const l=s?n.start:n.end,a=s?n.end:n.start,c=parseFloat(r.style[l]||getComputedStyle(r)[l]),d=this.__adjustBottomProperty(l,n,c),h=o[s?n.start:n.end]-e[i===s?n.end:n.start],u=d?`${d}px`:`${c+h*(s?-1:1)}px`;return{[l]:u,[a]:""}}};class ga extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const Rn=x`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let tt=class extends P{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[Rn,x`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return b` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");we(b` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new ga(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};v([w({})],tt.prototype,"value",void 0);v([w({})],tt.prototype,"presets",void 0);v([it("#toggle")],tt.prototype,"toggle",void 0);tt=v([V("vaadin-dev-tools-color-picker")],tt);let zt=class extends P{static get styles(){return[Rn,x`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return b` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>b` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return b` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};v([w({})],zt.prototype,"value",void 0);v([w({})],zt.prototype,"presets",void 0);zt=v([V("vaadin-dev-tools-color-picker-overlay-content")],zt);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends va(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",ha);let Bi=class extends q{constructor(){super(...arguments),this.presets=new Pt}static get styles(){return[q.styles,x`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Pt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return b`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Bi=v([V("vaadin-dev-tools-theme-color-property-editor")],Bi);class fa extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Mt=class extends P{static get styles(){return x`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return b` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return b`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new fa(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case R.checkbox:o=pt`vaadin-dev-tools-theme-checkbox-property-editor`;break;case R.range:o=pt`vaadin-dev-tools-theme-range-property-editor`;break;case R.color:o=pt`vaadin-dev-tools-theme-color-property-editor`;break;default:o=pt`vaadin-dev-tools-theme-text-property-editor`}return bs` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};v([w({})],Mt.prototype,"metadata",void 0);v([w({})],Mt.prototype,"theme",void 0);Mt=v([V("vaadin-dev-tools-theme-property-list")],Mt);let Vt=class extends P{render(){return b`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Vt.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0};Vt.styles=[x`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Vt=v([V("vaadin-dev-tools-shim")],Vt);const ba={resolve:t=>ue(e=>e.classList.contains("cc-banner"),t)?document.querySelector("vaadin-cookie-consent"):void 0},ya={resolve:t=>{const e=ue(o=>o.localName==="vaadin-login-overlay-wrapper",t);return e?e.__dataHost:void 0}},xa={resolve:t=>t.localName==="vaadin-dialog-overlay"?t.__dataHost:void 0},wa={resolve:t=>{const e=ue(o=>o.localName==="vaadin-confirm-dialog-overlay",t);return e?e.__dataHost:void 0}},_a={resolve:t=>{const e=ue(o=>o.localName==="vaadin-notification-card",t);return e?e.__dataHost:void 0}},Ea={resolve:t=>t.localName!=="vaadin-menu-bar-item"?void 0:ue(e=>e.localName==="vaadin-menu-bar",t)},Hi=[ba,ya,xa,wa,_a,Ea],Sa={resolve:t=>ue(e=>e.classList.contains("cc-banner"),t)},ka={resolve:t=>{var e;const o=ue(i=>{var n;return((n=i.shadowRoot)==null?void 0:n.querySelector("[part=overlay]"))!=null},t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=overlay]")}},Ca={resolve:t=>{var e;const o=ue(i=>i.localName==="vaadin-login-overlay-wrapper",t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=card]")}},Wi=[Ca,Sa,ka],ue=function(t,e){return t(e)?e:e.parentNode&&e.parentNode instanceof HTMLElement?ue(t,e.parentNode):void 0};class Ta{resolveElement(e){for(const o in Hi){let i=e;if((i=Hi[o].resolve(e))!==void 0)return i}return e}}class $a{resolveElement(e){for(const o in Wi){let i=e;if((i=Wi[o].resolve(e))!==void 0)return i}return e}}const Aa=new Ta,Ra=new $a;let ve=class extends P{constructor(){super(),this.active=!1,this.components=[],this.selected=0,this.mouseMoveEvent=this.mouseMoveEvent.bind(this)}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay"),this.addEventListener("mousemove",this.mouseMoveEvent)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousemove",this.mouseMoveEvent)}render(){var t;return this.active?(this.style.display="block",b`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>b`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight(this.components[this.selected]),t.has("active")){const e=t.get("active"),o=this.active;!e&&o?requestAnimationFrame(()=>this.shim.focus()):e&&!o&&this.highlight(void 0)}}mouseMoveEvent(t){var e;if(!this.active){this.style.display="none";return}const o=(e=this.shadowRoot)==null?void 0:e.querySelector(".component-picker-info");if(o){const i=o.getBoundingClientRect();t.x>i.x&&t.x<i.x+i.width&&t.y>i.y&&t.y<=i.y+i.height?o.style.opacity="0.05":o.style.opacity="1.0"}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=Aa.resolveElement(t.detail.target);this.components=ks(e),this.selected=this.components.length-1,this.components[this.selected].highlightElement=Ra.resolveElement(t.detail.target)}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){let e=(t==null?void 0:t.highlightElement)??(t==null?void 0:t.element);if(this.highlighted!==e)if(e){const o=e.getBoundingClientRect(),i=getComputedStyle(e);this.overlayElement.style.top=`${o.top}px`,this.overlayElement.style.left=`${o.left}px`,this.overlayElement.style.width=`${o.width}px`,this.overlayElement.style.height=`${o.height}px`,this.overlayElement.style.borderRadius=i.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=e}};ve.styles=[kn,x`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];v([I()],ve.prototype,"active",void 0);v([I()],ve.prototype,"components",void 0);v([I()],ve.prototype,"selected",void 0);v([it("vaadin-dev-tools-shim")],ve.prototype,"shim",void 0);ve=v([V("vaadin-dev-tools-component-picker")],ve);const Pa=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return ve}},Symbol.toStringTag,{value:"Module"}));class Ia{constructor(){this.currentActiveComponent=null,this.currentActiveComponentMetaData=null,this.componentPicked=async(e,o)=>{await this.hideOverlay(),this.currentActiveComponent=e,this.currentActiveComponentMetaData=o},this.showOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.openOverlay&&this.currentActiveComponentMetaData.openOverlay(this.currentActiveComponent)},this.hideOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.hideOverlay&&this.currentActiveComponentMetaData.hideOverlay(this.currentActiveComponent)},this.reset=()=>{this.currentActiveComponent=null,this.currentActiveComponentMetaData=null}}}const ye=new Ia,kl=t=>{const e=t.element.$.comboBox,o=e.$.overlay;Na(t.element,e,o)},Cl=t=>{const e=t.element,o=e.$.comboBox,i=o.$.overlay;Oa(e,o,i)},Na=(t,e,o)=>{t.opened=!0,o._storedModeless=o.modeless,o.modeless=!0,document._themeEditorDocClickListener=La(t,e),document.addEventListener("click",document._themeEditorDocClickListener),e.removeEventListener("focusout",e._boundOnFocusout)},Oa=(t,e,o)=>{t.opened=!1,!(!e||!o)&&(o.modeless=o._storedModeless,delete o._storedModeless,e.addEventListener("focusout",e._boundOnFocusout),document.removeEventListener("click",document._themeEditorDocClickListener),delete document._themeEditorDocClickListener)},La=(t,e)=>o=>{const i=o.target;i!=null&&(e.opened=!za(i,t))};function za(t,e){if(!t||!t.tagName)return!0;if(t.tagName.startsWith("VAADIN-DEV"))return!1;let o=t,i={nodeId:-1,uiId:-1,element:void 0};for(;o&&o.parentNode&&(i=mo(o),i.nodeId===-1);)o=o.parentElement?o.parentElement:o.parentNode.host;const n=mo(e);return!(i.nodeId!==-1&&n.nodeId===i.nodeId)}Po(x`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let de=class extends P{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ve.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null,this.markedAsUsed=!1}static get styles(){return x`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .hint vaadin-icon {
        color: var(--dev-tools-green-color);
        font-size: var(--lumo-icon-size-m);
      }

      .hint {
        display: flex;
        align-items: center;
        gap: var(--theme-editor-section-horizontal-padding);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Hs(this.connection),this.history=new Ws(this.api),this.historyActions=this.history.allowedActions,this.undoRedoListener=t=>{var e,o;const i=t.key==="Z"||t.key==="z";i&&(t.ctrlKey||t.metaKey)&&t.shiftKey?(e=this.historyActions)!=null&&e.allowRedo&&this.handleRedo():i&&(t.ctrlKey||t.metaKey)&&(o=this.historyActions)!=null&&o.allowUndo&&this.handleUndo()},document.addEventListener("vaadin-theme-updated",()=>{be.clear(),this.refreshTheme()}),document.addEventListener("keydown",this.undoRedoListener)}activate(){this.dispatchEvent(new CustomEvent("before-open"))}deactivate(){this.dispatchEvent(new CustomEvent("after-close"))}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?(this.highlightElement((e=this.context)==null?void 0:e.component.element),ye.showOverlay()):(ye.hideOverlay(),this.removeElementHighlight((o=this.context)==null?void 0:o.component.element)))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),ye.hideOverlay(),ye.reset(),document.removeEventListener("keydown",this.undoRedoListener)}render(){var t,e,o;return this.themeEditorState===Ve.missing_theme?this.renderMissingThemeNotice():b`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?b` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${xt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${xt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return b`
      <div class="notice">
        It looks like you have not set up an application theme yet. Theme editor requires an existing theme to work
        with. Please check our
        <a href="https://vaadin.com/docs/latest/styling/application-theme" target="_blank">documentation</a>
        on how to set up an application theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return b`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===N.local&&!this.context.accessible){const t=this.context.metadata.displayName;return b`
        ${this.context.metadata.notAccessibleDescription&&this.context.scope===N.local?b`<div class="notice hint" style="padding-bottom: 0;">
              <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
              <div>${this.context.metadata.notAccessibleDescription}</div>
            </div>`:""}
        <div class="notice">
          The selected ${t} cannot be styled locally. Currently, Theme Editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return b` ${this.context.metadata.description&&this.context.scope===N.local?b`<div class="notice hint">
            <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
            <div>${this.context.metadata.description}</div>
          </div>`:""}
      <vaadin-dev-tools-theme-property-list
        class="property-list"
        .metadata=${this.context.metadata}
        .theme=${this.effectiveTheme}
        @theme-property-value-change=${this.handlePropertyChange}
        @open-css=${this.handleOpenCss}
      ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=De(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===N.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,i=b`<span class="component-type">${o}</span>`,n=this.context.scope===N.local?Fs(this.context.component):null,r=n?b` <span class="instance-name-quote">"</span><span class="instance-name">${n}</span
            ><span class="instance-name-quote">"</span>`:null;e=b`${i} ${r}`}else e=b`<span class="no-selection">Pick an element to get started</span>`;return b`
      <div class="picker">
        <button @click=${this.pickComponent}>${xt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===N.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return b` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const i=this.context.component.element;this.context.localClassName=o;const n=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(n.requestId,()=>be.previewLocalClassName(i,o),()=>be.previewLocalClassName(i,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;ye.hideOverlay(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:b`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const i=await Vs.getMetadata(e);if(!i){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||N.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}await ye.componentPicked(e,i),this.highlightElement(e.element),this.refreshComponentAndTheme(e,i),ye.showOverlay()}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:i}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,i,!0),this.effectiveTheme=me.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const n={themeScope:this.context.scope,localClassName:this.context.localClassName},r=Ds(e,n,o.propertyName,i);try{const s=await this.api.setCssRules([r]);this.historyActions=this.history.push(s.requestId);const l=js(r);be.add(l)}catch(s){console.error("Failed to update property value",s)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===N.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>be.previewLocalClassName(t,e),()=>be.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,i,n;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((i=this.context)==null?void 0:i.metadata),!t||!e)return;const r=await this.api.loadComponentMetadata(t);this.markedAsUsed||this.api.markAsUsed().then(()=>{this.markedAsUsed=!0}),be.previewLocalClassName(t.element,r.className),await this.refreshTheme({scope:((n=this.context)==null?void 0:n.scope)||N.local,metadata:e,component:t,localClassName:r.className,suggestedClassName:r.suggestedClassName,accessible:r.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===N.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new me(e.metadata);if(!(e.scope===N.local&&!e.localClassName)){const n={themeScope:e.scope,localClassName:e.localClassName},r=e.metadata.elements.map(l=>De(l,n)),s=await this.api.loadRules(r);o=me.fromServerRules(e.metadata,n,s.rules)}const i=await Us(e.metadata);this.context=e,this.baseTheme=i,this.editedTheme=o,this.effectiveTheme=me.combine(i,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};v([w({})],de.prototype,"expanded",void 0);v([w({})],de.prototype,"themeEditorState",void 0);v([w({})],de.prototype,"pickerProvider",void 0);v([w({})],de.prototype,"connection",void 0);v([I()],de.prototype,"historyActions",void 0);v([I()],de.prototype,"context",void 0);v([I()],de.prototype,"effectiveTheme",void 0);de=v([V("vaadin-dev-tools-theme-editor")],de);var Ma=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],i=0;i<t.rangeCount;i++)o.push(t.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(n){t.addRange(n)}),e&&e.focus()}},qi={"text/plain":"Text","text/html":"Url",default:"Text"},Va="Copy to clipboard: #{key}, Enter";function Da(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function ja(t,e){var o,i,n,r,s,l,a=!1;e||(e={}),o=e.debug||!1;try{n=Ma(),r=document.createRange(),s=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var h=qi[e.format]||qi.default;window.clipboardData.setData(h,t)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,t);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(l),r.selectNodeContents(l),s.addRange(r);var c=document.execCommand("copy");if(!c)throw new Error("copy command was unsuccessful");a=!0}catch(d){o&&console.error("unable to copy using execCommand: ",d),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(h){o&&console.error("unable to copy using clipboardData: ",h),o&&console.error("falling back to prompt"),i=Da("message"in e?e.message:Va),window.prompt(i,t)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(r):s.removeAllRanges()),l&&document.body.removeChild(l),n()}return a}let Dt=class extends P{constructor(){super(...arguments),this.serverInfo={versions:[]}}createRenderRoot(){return this}render(){return b` <div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        ${this.serverInfo.versions.map(t=>b`
            <dt>${t.name}</dt>
            <dd>${t.version}</dd>
          `)}
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${!this._devTools.conf.enable||(this._devTools.frontendStatus===S.UNAVAILABLE||this._devTools.frontendStatus===S.ERROR)&&(this._devTools.javaStatus===S.UNAVAILABLE||this._devTools.javaStatus===S.ERROR)}
              ?checked="${this._devTools.frontendStatus===S.ACTIVE||this._devTools.javaStatus===S.ACTIVE}"
              @change=${t=>this._devTools.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.javaStatus)}"
        >
          Java ${this._devTools.javaStatus}
          ${this._devTools.conf.backend?`(${C.BACKEND_DISPLAY_NAME[this._devTools.conf.backend]})`:""}
        </dd>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.frontendStatus)}"
        >
          Front end ${this._devTools.frontendStatus}
        </dd>
      </dl>
    </div>`}handleMessage(t){return(t==null?void 0:t.command)==="serverInfo"?(this.serverInfo=t.data,!0):!1}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");ja(e),this._devTools.showNotification(j.INFORMATION,"Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}};v([w({type:Object})],Dt.prototype,"_devTools",void 0);v([I()],Dt.prototype,"serverInfo",void 0);Dt=v([V("vaadin-dev-tools-info")],Dt);let yo=class extends P{createRenderRoot(){return this}activate(){this._devTools.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}render(){return b`<div class="message-tray">
      ${this._devTools.messages.map(t=>this._devTools.renderMessage(t))}
    </div>`}};v([w({type:Object})],yo.prototype,"_devTools",void 0);yo=v([V("vaadin-dev-tools-log")],yo);const Gi=16384;class Pn extends Rt{constructor(e){if(super(),!e)return;const o={transport:"websocket",fallbackTransport:"websocket",url:e,contentType:"application/json; charset=UTF-8",reconnectInterval:5e3,timeout:-1,maxReconnectOnClose:1e7,trackMessageLength:!0,enableProtocol:!0,handleOnlineOffline:!1,executeCallbackBeforeReconnect:!0,messageDelimiter:"|",onMessage:i=>{const n={data:i.responseBody};this.handleMessage(n)},onError:i=>{this.handleError(i)}};Ua().then(i=>{this.socket=i.subscribe(o)})}onReload(){}onUpdate(e,o){}onMessage(e){}handleMessage(e){let o;try{o=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}o.command==="hello"?(this.setStatus(S.ACTIVE),this.onHandshake()):o.command==="reload"?this.status===S.ACTIVE&&this.onReload():o.command==="update"?this.status===S.ACTIVE&&this.onUpdate(o.path,o.content):this.onMessage(o)}handleError(e){console.error(e),this.setStatus(S.ERROR),this.onConnectionError(e)}send(e,o){if(!this.socket){Oo(()=>this.socket,r=>this.send(e,o));return}const i=JSON.stringify({command:e,data:o});let n=i.length+"|"+i;for(;n.length;)this.socket.push(n.substring(0,Gi)),n=n.substring(Gi)}}Pn.HEARTBEAT_INTERVAL=18e4;function Oo(t,e){const o=t();o?e(o):setTimeout(()=>Oo(t,e),50)}function Ua(){return new Promise((t,e)=>{Oo(()=>{var o;return(o=window==null?void 0:window.vaadinPush)==null?void 0:o.atmosphere},t)})}var T,j;(function(t){t.LOG="log",t.INFORMATION="information",t.WARNING="warning",t.ERROR="error"})(j||(j={}));let C=T=class extends P{static get styles(){return[x`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,kn]}static get isActive(){const t=window.sessionStorage.getItem(T.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.send("reportTelemetry",{browserData:t})}openWebSocketConnection(){if(this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,!this.conf.token){console.error("Dev tools functionality denied for this host."),this.log(j.LOG,"See Vaadin documentation on how to configure devmode.hostsAllowed property.",void 0,"https://vaadin.com/docs/latest/configuration/properties#properties",void 0);return}const t=n=>this.log(j.ERROR,n),e=()=>{this.showSplashMessage("Reloading…");const n=window.sessionStorage.getItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),r=n?parseInt(n,10)+1:1;window.sessionStorage.setItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,r.toString()),window.sessionStorage.setItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(n,r)=>{let s=document.head.querySelector(`style[data-file-path='${n}']`);s?(this.log(j.INFORMATION,"Hot update of "+n),s.textContent=r,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},i=new Pn(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log(j.LOG,"Vaadin development mode initialized"),T.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=t,i.onReload=e,i.onUpdate=o,i.onStatusChange=n=>{this.frontendStatus=n},i.onMessage=n=>this.handleFrontendMessage(n),this.frontendConnection=i,this.conf.backend===T.SPRING_BOOT_DEVTOOLS&&(this.javaConnection=new Ts(this.getSpringBootWebSocketUrl(window.location)),this.javaConnection.onHandshake=()=>{T.isActive||this.javaConnection.setActive(!1)},this.javaConnection.onReload=e,this.javaConnection.onConnectionError=t,this.javaConnection.onStatusChange=n=>{this.javaStatus=n},this.javaConnection.onHandshake=()=>{this.conf.backend&&this.log(j.INFORMATION,`Java live reload available: ${T.BACKEND_DISPLAY_NAME[this.conf.backend]}`)}),this.conf.backend||this.showNotification(j.WARNING,"Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}tabHandleMessage(t,e){const o=t;return o.handleMessage&&o.handleMessage.call(t,e)}handleFrontendMessage(t){for(const e of this.tabs)if(e.element&&this.tabHandleMessage(e.element,t))return;if(t.command==="featureFlags")this.features=t.data.features;else if(t.command==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Ve.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else Es(t)||this.unhandledMessages.push(t)}getDedicatedWebSocketUrl(){function t(o){const i=document.createElement("div");return i.innerHTML=`<a href="${o}"/>`,i.firstChild.href}if(this.conf.url===void 0)return;const e=t(this.conf.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e}?v-r=push&debug_window&token=${this.conf.token}`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const i=e.replace(/.*?-/,"");return`${o}://${this.conf.liveReloadPort}-${i}`}else return`${o}://${e}:${this.conf.liveReloadPort}`}constructor(){super(),this.unhandledMessages=[],this.conf={enable:!1,url:"",liveReloadPort:-1},this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:"vaadin-dev-tools-log"},{id:"info",title:"Info",render:"vaadin-dev-tools-info"},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ve.disabled,this.nextMessageId=1,this.transitionDuration=0,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.conf=window.Vaadin.devToolsConf||this.conf,this.disableEventListener=o=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),window.sessionStorage.getItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)){const o=new Date,i=`${`0${o.getHours()}`.slice(-2)}:${`0${o.getMinutes()}`.slice(-2)}:${`0${o.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${i}`),window.sessionStorage.removeItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),document.documentElement.addEventListener("vaadin-overlay-outside-click",o=>{const i=o,n=i.target.owner;n&&Cs(this,n)||i.detail.sourceEvent.composedPath().includes(this)&&o.preventDefault()});const e=window.Vaadin;e.devToolsPlugins&&(Array.from(e.devToolsPlugins).forEach(o=>this.initPlugin(o)),e.devToolsPlugins={push:o=>this.initPlugin(o)}),this.openWebSocketConnection(),Ss()}async initPlugin(t){const e=this;t.init({addTab:(o,i)=>{e.tabs.push({id:o,title:o,render:i})},send:function(o,i){e.frontendConnection.send(o,i)}})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log(j.ERROR,e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log(j.ERROR,e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},T.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log(j.LOG,this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.send("checkLicense",t):Sn({message:"Internal error: no connection",product:t})}log(t,e,o,i,n){const r=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:r,type:t,message:e,details:o,link:i,dontShowAgain:!1,dontShowAgainMessage:n,deleted:!1});this.messages.length>T.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const s=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&s?(setTimeout(()=>s.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t===j.ERROR&&(this.unreadErrors=!0)})}showNotification(t,e,o,i,n,r){if(n===void 0||!T.notificationDismissed(n)){if(this.notifications.filter(l=>l.persistentId===n).filter(l=>!l.deleted).length>0)return;const s=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:s,type:t,message:e,details:o,link:i,persistentId:n,dontShowAgain:!1,dontShowAgainMessage:r,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(s)},T.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,i)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!T.notificationDismissed(o.persistentId)){let i=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?o.persistentId:`${i},${o.persistentId}`,window.localStorage.setItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const i=this.findNotificationIndex(t);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,i)=>o.id===t?(e=i,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(T.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===S.ACTIVE?"var(--dev-tools-green-color)":t===S.INACTIVE?"var(--dev-tools-grey-color)":t===S.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===S.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return b`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?b`<p>${t.details}</p>`:""}
            ${t.link?b`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?b`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                ${t.dontShowAgainMessage||"Don’t show again"}
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return b` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>b`<button
                class=${$o({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{const e=this.tabs.find(n=>n.id===this.activeTab);if(e&&e.element){const n=typeof e.render=="function"?e.element.firstElementChild:e.element,r=n==null?void 0:n.deactivate;r&&r.call(n)}this.activeTab=t.id;const o=typeof t.render=="function"?t.element.firstElementChild:t.element,i=o.activate;i&&i.call(o)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        <div id="tabContainer"></div>
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        style="display: var(--dev-tools-button-display, 'block')"
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?b`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:b`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?b`<span class="status-description">${this.splashMessage}</span></div>`:$}
      </div>`}updated(t){var e;super.updated(t);const o=this.renderRoot.querySelector("#tabContainer"),i=[];if(this.tabs.forEach(r=>{r.element||(typeof r.render=="function"?r.element=document.createElement("div"):(r.element=document.createElement(r.render),r.element._devTools=this),i.push(r.element))}),(o==null?void 0:o.childElementCount)!==this.tabs.length){for(let r=0;r<this.tabs.length;r++){const s=this.tabs[r];o.childElementCount>r&&o.children[r]===s.element||o.insertBefore(s.element,o.children[r])}for(;(o==null?void 0:o.childElementCount)>this.tabs.length;)(e=o.lastElementChild)==null||e.remove()}for(const r of this.tabs){typeof r.render=="function"?we(r.render(),r.element):r.element.requestUpdate&&r.element.requestUpdate();const s=r.id===this.activeTab;r.element.hidden=!s}for(const r of i)for(var n=0;n<this.unhandledMessages.length;n++)this.tabHandleMessage(r,this.unhandledMessages[n])&&(this.unhandledMessages.splice(n,1),n--)}renderCode(){return b`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await g(()=>Promise.resolve().then(()=>Pa),void 0),this.componentPicker.open({infoTemplate:b`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.send("showComponentCreateLocation",e):this.frontendConnection.send("showComponentAttachLocation",e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderFeatures(){return b`<div class="features-tray">
      ${this.features.map(t=>b`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}setJavaLiveReloadActive(t){var e;this.javaConnection?this.javaConnection.setActive(t):(e=this.frontendConnection)==null||e.setActive(t)}renderThemeEditor(){return b` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
      @before-open=${()=>this.setJavaLiveReloadActive(!1)}
      @after-close=${()=>this.setJavaLiveReloadActive(!0)}
    ></vaadin-dev-tools-theme-editor>`}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.send("setFeature",{featureId:e.id,enabled:o}),this.showNotification(j.INFORMATION,`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log(j.ERROR,`Unable to toggle feature ${e.title}: No server connection available`)}};C.MAX_LOG_ROWS=1e3;C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";C.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";C.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";C.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;C.HOTSWAP_AGENT="HOTSWAP_AGENT";C.JREBEL="JREBEL";C.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";C.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};v([w({type:Boolean,attribute:!1})],C.prototype,"expanded",void 0);v([w({type:Array,attribute:!1})],C.prototype,"messages",void 0);v([w({type:String,attribute:!1})],C.prototype,"splashMessage",void 0);v([w({type:Array,attribute:!1})],C.prototype,"notifications",void 0);v([w({type:String,attribute:!1})],C.prototype,"frontendStatus",void 0);v([w({type:String,attribute:!1})],C.prototype,"javaStatus",void 0);v([I()],C.prototype,"tabs",void 0);v([I()],C.prototype,"activeTab",void 0);v([I()],C.prototype,"features",void 0);v([I()],C.prototype,"unreadErrors",void 0);v([it(".window")],C.prototype,"root",void 0);v([it("vaadin-dev-tools-component-picker")],C.prototype,"componentPicker",void 0);v([I()],C.prototype,"componentPickActive",void 0);v([I()],C.prototype,"themeEditorState",void 0);C=T=v([V("vaadin-dev-tools")],C);const{toString:Fa}=Object.prototype;function Ba(t){return Fa.call(t)==="[object RegExp]"}function Ha(t,{preserve:e=!0,whitespace:o=!0,all:i}={}){if(i)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let n=e,r;typeof e=="function"?(n=!1,r=e):Ba(e)&&(n=!1,r=d=>e.test(d));let s=!1,l="",a="",c="";for(let d=0;d<t.length;d++){if(l=t[d],t[d-1]!=="\\"&&(l==='"'||l==="'")&&(s===l?s=!1:s||(s=l)),!s&&l==="/"&&t[d+1]==="*"){const h=t[d+2]==="!";let u=d+2;for(;u<t.length;u++){if(t[u]==="*"&&t[u+1]==="/"){n&&h||r&&r(a)?c+=`/*${a}*/`:o||(t[u+2]===`
`?u++:t[u+2]+t[u+3]===`\r
`&&(u+=2)),a="";break}a+=t[u]}d=u+1;continue}c+=l}return c}const Wa=CSSStyleSheet.toString().includes("document.createElement"),qa=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Ha(t));for(var i,n=t;(i=o.exec(t))!==null;){n=n.replace(i[0],"");const r=document.createElement("link");r.rel="stylesheet",r.href=i[2]||i[4];const s=i[1]||i[5];s&&(r.media=s),e===document?document.head.appendChild(r):e.appendChild(r)}return n},Ga=(t,e,o)=>(o?e.adoptedStyleSheets=[t,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>i!==t)}),Ka=(t,e,o)=>{const i=new CSSStyleSheet;return i.replaceSync(t),Wa?Ga(i,e,o):(o?e.adoptedStyleSheets.splice(0,0,i):e.adoptedStyleSheets.push(i),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(i),1)})},Ja=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let i;if(e){const r=Array.from(document.head.childNodes).filter(s=>s.nodeType===Node.COMMENT_NODE).find(s=>s.data.trim()===e);r&&(i=r)}return document.head.insertBefore(o,i),()=>{o.remove()}},He=(t,e,o,i)=>{if(o===document){const r=Ya(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(r)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(r)}const n=qa(t,o);return o===document?Ja(n,e):Ka(n,o,i)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Ki(t){let e,o,i=2166136261;for(e=0,o=t.length;e<o;e++)i^=t.charCodeAt(e),i+=(i<<1)+(i<<4)+(i<<7)+(i<<8)+(i<<24);return("0000000"+(i>>>0).toString(16)).substr(-8)}function Ya(t){let e=Ki(t);return e+Ki(e+t)}document._vaadintheme_flowcrmtutorial_componentCss||(document._vaadintheme_flowcrmtutorial_componentCss=!0);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Xa(t){const e=customElements.get(t.is);if(!e)Object.defineProperty(t,"version",{get(){return"24.3.6"}}),customElements.define(t.is,t);else{const o=e.version;o&&t.version&&o===t.version?console.warn(`The component ${t.is} has been loaded twice`):console.error(`Tried to define ${t.is} version ${t.version} when version ${e.version} is already in use. Something will probably break.`)}}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Qa extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}Xa(Qa);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Za=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,i,n){super.attributeChangedCallback(o,i,n),o==="theme"&&this._set_theme(n)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const In=[];function Nn(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function el(t){return Nn(customElements.get(t))}function tl(t=[]){return[t].flat(1/0).filter(e=>e instanceof So?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ft(t,e,o={}){t&&el(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=tl(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):In.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function xo(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():In}function ol(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function il(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function On(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const i=xo().find(n=>n.moduleId===o);i?e.push(...On(i),...i.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function nl(t,e){const o=document.createElement("style");o.innerHTML=t.map(i=>i.cssText).join(`
`),e.content.appendChild(o)}function rl(t){const e=`${t}-default-theme`,o=xo().filter(i=>i.moduleId!==e&&ol(i.themeFor,t)).map(i=>({...i,styles:[...On(i),...i.styles],includePriority:il(i.moduleId)})).sort((i,n)=>n.includePriority-i.includePriority);return o.length>0?o:xo().filter(i=>i.moduleId===e)}const $l=t=>class extends Za(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||Nn(this)||nl(this.getStylesForThis(),o)}static finalizeStyles(o){const i=this.getStylesForThis();return o?[...super.finalizeStyles(o),...i]:i}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),i=(o?o.constructor.__themes:[])||[];this.__themes=[...i,...rl(this.is)];const n=this.__themes.flatMap(r=>r.styles);return n.filter((r,s)=>s===n.lastIndexOf(r))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sl=(t,...e)=>{const o=document.createElement("style");o.id=t,o.textContent=e.map(i=>i.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)},ge=(t,...e)=>{sl(`lumo-${t}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const al=x`
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
`,Lo=x`
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
`;Ft("",Lo,{moduleId:"lumo-typography"});ge("typography-props",al);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ll=x`
  ${pn(Lo.cssText.replace(/,\s*:host/su,""))}
`;ge("typography",ll);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cl=x`
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
`;ge("color-props",cl);const zo=x`
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
`;Ft("",zo,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("color",zo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ln=x`
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
`;ge("spacing-props",Ln);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dl=x`
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
`;ge("style-props",dl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Mo=x`
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
`;Ft("",Mo,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("badge",Mo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ul=x`
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
 */const pl=x`
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
 */const hl=x`
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
 */const ml=x`
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
 */const vl=x`
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
 */const gl=x`
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
 */const fl=x`
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
 */const bl=x`
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
 */const yl=x`
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
 */const xl=x`
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
 */const wl=x`
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
 */const Vo=x`
${ul}
${pl}
${hl}
${ml}
${vl}
${gl}
${fl}
${bl}
${yl}
${xl}
${wl}
`;Ft("",Vo,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("utility",Vo);const _l=t=>{const e=[];t!==document&&(e.push(He(Lo.cssText,"",t,!0)),e.push(He(zo.cssText,"",t,!0)),e.push(He(Ln.cssText,"",t,!0)),e.push(He(Mo.cssText,"",t,!0)),e.push(He(Vo.cssText,"",t,!0)))},El=_l;El(document);export{Ns as A,Rs as C,cs as D,ee as I,P as L,oe as N,le as O,as as P,Na as R,Ps as S,$l as T,vo as _,ge as a,Za as b,x as c,Xa as d,we as e,ls as f,Se as g,b as h,zo as i,Lo as j,He as k,R as l,Oa as m,$ as n,Is as o,La as p,kl as q,Ft as r,Ie as s,In as t,pn as u,Cl as v};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./vaadin-big-decimal-field-e51def24-DvRYdmq1.js","./vaadin-text-field-0b3db014-D-aBqczF.js","./vaadin-button-2511ad84-DV63IXOq.js","./vaadin-checkbox-group-a7c65bf2-BX4L325t.js","./vaadin-checkbox-4e68df64-CjiOpJff.js","./vaadin-combo-box-96451ddd-BkXHDwwm.js","./vaadin-confirm-dialog-4d718829-BJEpa_57.js","./vaadin-custom-field-42c85b9e-md981e0Q.js","./vaadin-date-picker-f2001167-DUZ-duuK.js","./vaadin-date-time-picker-c8c047a7-CqW8Woy0.js","./vaadin-email-field-d7a35f04-BeH1DIBw.js","./vaadin-grid-pro-ff415555-CWGUrc_9.js","./vaadin-grid-0a4791c2-nmq2geUK.js","./vaadin-integer-field-85078932-UYK1TK-9.js","./vaadin-login-form-638996c6-BG3ayNlh.js","./vaadin-login-overlay-f8a5db8a-CiHhigeX.js","./vaadin-message-input-996ac37c-DES8Simu.js","./vaadin-multi-select-combo-box-a3373557-m_9wQLP5.js","./vaadin-number-field-cb3ee8b2-ByYtpDcD.js","./vaadin-password-field-d289cb18-DDruIxfI.js","./vaadin-radio-group-88b5afd8-CQG6NopJ.js","./vaadin-select-df6e9947-879P0x7G.js","./vaadin-text-area-83627ebc-BVDETFlL.js","./vaadin-time-picker-715ec415-BU73jkwf.js","./vaadin-upload-d3c162ed-C7VmR0kL.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
