import{a as u,r as m,d as _,T as y,b as M}from"./indexhtml-DPuqjys-.js";import{G as L,H as k,J as A,M as T,N as S,Q as x,R as P,p as f,x as g,P as v,U as $,C as b,V as B,W as F,X as O,Y as p,Z as C,_ as E,$ as I,E as D,s as R}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import{i as N,m as q}from"./menu-overlay-B0O3oH7b.js";(function(){function i(s){return window.Vaadin.Flow.tryCatchWrapper(s,"Vaadin Context Menu")}function l(s,a){try{return window.Vaadin.Flow.clients[s].getByNodeId(a)}catch(c){console.error("Could not get node %s from app %s",a,s),console.error(c)}}function e(s,a){s.$connector||(s.$connector={generateItems:i(c=>{const d=t(a,c);s.items=d})})}function t(s,a){const c=l(s,a);if(c)return Array.from(c.children).map(d=>{const h={component:d,checked:d._checked,keepOpen:d._keepOpen,className:d.className,theme:d.__theme};return d._hasVaadinItemMixin&&d._containerNodeId&&(h.children=t(s,d._containerNodeId)),d._item=h,h})}function n(s,a){s._item&&(s._item.checked=a,s._item.keepOpen&&s.toggleAttribute("menu-item-checked",a))}function o(s,a){s._item&&(s._item.keepOpen=a)}function r(s,a){s._item&&(s._item.theme=a)}window.Vaadin.Flow.contextMenuConnector={initLazy(...s){return i(e)(...s)},generateItemsTree(...s){return i(t)(...s)},setChecked(...s){return i(n)(...s)},setKeepOpen(...s){return i(o)(...s)},setTheme(...s){return i(r)(...s)}}})();const H=u`
  /* :hover needed to workaround https://github.com/vaadin/web-components/issues/3133 */
  :host(:hover) {
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  :host([role='menuitem'][menu-item-checked]) [part='checkmark']::before {
    opacity: 1;
  }

  :host([aria-haspopup='true'])::after {
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-xs);
    content: var(--lumo-icons-angle-right);
    color: var(--lumo-tertiary-text-color);
  }

  :host(:not([dir='rtl'])[aria-haspopup='true'])::after {
    margin-right: calc(var(--lumo-space-m) * -1);
    padding-left: var(--lumo-space-m);
  }

  :host([expanded]) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl'][aria-haspopup='true'])::after {
    content: var(--lumo-icons-angle-left);
    margin-left: calc(var(--lumo-space-m) * -1);
    padding-right: var(--lumo-space-m);
  }
`;m("vaadin-context-menu-item",[N,H],{moduleId:"lumo-context-menu-item"});const w=u`
  :host {
    -webkit-tap-highlight-color: transparent;
    --_lumo-item-selected-icon-display: var(--_lumo-list-box-item-selected-icon-display, block);
  }

  /* Dividers */
  [part='items'] ::slotted(hr) {
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) var(--lumo-border-radius-m);
    background-color: var(--lumo-contrast-10pct);
  }
`;m("vaadin-list-box",w,{moduleId:"lumo-list-box"});const Q=u`
  :host {
    --_lumo-list-box-item-selected-icon-display: block;
  }

  /* Normal item */
  [part='items'] ::slotted([role='menuitem']) {
    -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
    cursor: default;
    outline: none;
    border-radius: var(--lumo-border-radius-m);
    padding-left: calc(var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
  }

  /* Hovered item */
  /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
  [part='items'] ::slotted([role='menuitem']:hover:not([disabled])),
  [part='items'] ::slotted([role='menuitem'][expanded]:not([disabled])) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl']) [part='items'] ::slotted([role='menuitem']) {
    padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-border-radius-m) / 4);
  }

  /* Focused item */
  @media (pointer: coarse) {
    [part='items'] ::slotted([role='menuitem']:hover:not([expanded]):not([disabled])) {
      background-color: transparent;
    }
  }
`;m("vaadin-context-menu-list-box",[w,Q],{moduleId:"lumo-context-menu-list-box"});const V=u`
  :host([phone]) {
    /* stylelint-disable declaration-block-no-redundant-longhand-properties */
    top: 0 !important;
    right: 0 !important;
    bottom: var(--vaadin-overlay-viewport-bottom) !important;
    left: 0 !important;
    /* stylelint-enable declaration-block-no-redundant-longhand-properties */
    align-items: stretch;
    justify-content: flex-end;
  }

  /* TODO These style overrides should not be needed.
   We should instead offer a way to have non-selectable items inside the context menu. */

  :host {
    --_lumo-list-box-item-selected-icon-display: none;
    --_lumo-list-box-item-padding-left: calc(var(--lumo-space-m) + var(--lumo-border-radius-m) / 4);
  }

  [part='overlay'] {
    outline: none;
  }
`;m("vaadin-context-menu-overlay",[q,V],{moduleId:"lumo-context-menu-overlay"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const j=i=>class extends L(k(i)){static get properties(){return{parentOverlay:{type:Object,readOnly:!0},_theme:{type:String,readOnly:!0,sync:!0}}}static get observers(){return["_themeChanged(_theme)"]}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&e.composedPath()[0]===this.$.overlay&&[38,40].indexOf(e.keyCode)>-1){const t=this.getFirstChild();t&&Array.isArray(t.items)&&t.items.length&&(e.preventDefault(),e.keyCode===38?t.items[t.items.length-1].focus():t.focus())}})}getFirstChild(){return this.querySelector(":not(style):not(slot)")}_themeChanged(){this.close()}getBoundaries(){const e=this.getBoundingClientRect(),t=this.$.overlay.getBoundingClientRect();let n=e.bottom-t.height;const o=this.parentOverlay;if(o&&o.hasAttribute("bottom-aligned")){const r=getComputedStyle(o);n=n-parseFloat(r.bottom)-parseFloat(r.height)}return{xMax:e.right-t.width,xMin:e.left+t.width,yMax:n}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay){const e=this.$.content,t=getComputedStyle(e);!!this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(t.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(t.paddingRight)}px`,!!this.style.bottom?this.style.bottom=`${parseFloat(this.style.bottom)-parseFloat(t.paddingBottom)}px`:this.style.top=`${parseFloat(this.style.top)-parseFloat(t.paddingTop)}px`}}_shouldRestoreFocus(){return this.parentOverlay?!1:super._shouldRestoreFocus()}_deepContains(e){let t=A(this.localName,e);for(;t;){if(t===this)return!0;t=t.parentOverlay}return!1}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const U=u`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host([right-aligned]),
  :host([end-aligned]) {
    align-items: flex-end;
  }

  :host([bottom-aligned]) {
    justify-content: flex-end;
  }

  [part='overlay'] {
    background-color: #fff;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid !important;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T({name:"vaadin-contextmenu",deps:["touchstart","touchmove","touchend","contextmenu"],flow:{start:["touchstart","contextmenu"],end:["contextmenu"]},emits:["vaadin-contextmenu"],info:{sourceEvent:null},reset(){this.info.sourceEvent=null,this._cancelTimer(),this.info.touchJob=null,this.info.touchStartCoords=null},_cancelTimer(){this._timerId&&(clearTimeout(this._timerId),delete this._fired)},_setSourceEvent(i){this.info.sourceEvent=i;const l=i.composedPath();this.info.sourceEvent.__composedPath=l},touchstart(i){this._setSourceEvent(i),this.info.touchStartCoords={x:i.changedTouches[0].clientX,y:i.changedTouches[0].clientY};const l=i.composedPath()[0]||i.target;this._timerId=setTimeout(()=>{const e=i.changedTouches[0];i.shiftKey||(S&&(this._fired=!0,this.fire(l,e.clientX,e.clientY)),x("tap"))},500)},touchmove(i){const e=this.info.touchStartCoords;(Math.abs(e.x-i.changedTouches[0].clientX)>15||Math.abs(e.y-i.changedTouches[0].clientY)>15)&&this._cancelTimer()},touchend(i){this._fired&&i.preventDefault(),this._cancelTimer()},contextmenu(i){i.shiftKey||(this._setSourceEvent(i),this.fire(i.target,i.clientX,i.clientY),x("tap"))},fire(i,l,e){const t=this.info.sourceEvent,n=new Event("vaadin-contextmenu",{bubbles:!0,cancelable:!0,composed:!0});n.detail={x:l,y:e,sourceEvent:t},i.dispatchEvent(n),n.defaultPrevented&&t&&t.preventDefault&&t.preventDefault()}});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class W extends P(y(g(v))){static get is(){return"vaadin-context-menu-item"}static get template(){return f`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menuitem")}}_(W);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class X extends $(y(g(b(v)))){static get is(){return"vaadin-context-menu-list-box"}static get template(){return f`
      <style>
        :host {
          display: flex;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='items'] {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      </style>
      <div part="items">
        <slot></slot>
      </div>
    `}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}ready(){super.ready(),this.setAttribute("role","menu")}}_(X);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */m("vaadin-context-menu-overlay",[B,U],{moduleId:"vaadin-context-menu-overlay-styles"});class Y extends j(F(g(y(v)))){static get is(){return"vaadin-context-menu-overlay"}static get template(){return f`
      <div id="backdrop" part="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}}_(Y);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class G{constructor(l,e){this.query=l,this.callback=e,this._boundQueryHandler=this._queryHandler.bind(this)}hostConnected(){this._removeListener(),this._mediaQuery=window.matchMedia(this.query),this._addListener(),this._queryHandler(this._mediaQuery)}hostDisconnected(){this._removeListener()}_addListener(){this._mediaQuery&&this._mediaQuery.addListener(this._boundQueryHandler)}_removeListener(){this._mediaQuery&&this._mediaQuery.removeListener(this._boundQueryHandler),this._mediaQuery=null}_queryHandler(l){typeof this.callback=="function"&&this.callback(l.matches)}}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const z=i=>class extends i{static get properties(){return{items:{type:Array,sync:!0}}}constructor(){super(),this.__itemsOutsideClickListener=e=>{e.composedPath().some(t=>t.localName===`${this._tagNamePrefix}-overlay`)||this.dispatchEvent(new CustomEvent("items-outside-click"))},this.addEventListener("items-outside-click",()=>{this.items&&this.close()})}get _tagNamePrefix(){return"vaadin-context-menu"}connectedCallback(){super.connectedCallback(),document.documentElement.addEventListener("click",this.__itemsOutsideClickListener)}disconnectedCallback(){super.disconnectedCallback(),document.documentElement.removeEventListener("click",this.__itemsOutsideClickListener)}__forwardFocus(){const e=this._overlayElement,t=e.getFirstChild();if(e.parentOverlay){const n=e.parentOverlay.querySelector("[expanded]");n&&n.hasAttribute("focused")&&t?t.focus():e.$.overlay.focus()}else t&&t.focus()}__openSubMenu(e,t,n){e.items=t._item.children,e.listenOn=t,e.overlayClass=n;const o=this._overlayElement,r=e._overlayElement;r.positionTarget=t,r.noHorizontalOverlap=!0,r._setParentOverlay(o),o.hasAttribute("theme")?e.setAttribute("theme",o.getAttribute("theme")):e.removeAttribute("theme");const s=r.$.content;s.style.minWidth="",t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:t._item.children}}))}__createComponent(e){let t;return e.component instanceof HTMLElement?t=e.component:t=document.createElement(e.component||`${this._tagNamePrefix}-item`),t._hasVaadinItemMixin&&t.setAttribute("role","menuitem"),t.localName==="hr"?t.setAttribute("role","separator"):t.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(t,e,this._theme),t._item=e,e.text&&(t.textContent=e.text),e.className&&t.setAttribute("class",e.className),this.__toggleMenuComponentAttribute(t,"menu-item-checked",e.checked),this.__toggleMenuComponentAttribute(t,"disabled",e.disabled),e.children&&e.children.length&&(this.__updateExpanded(t,!1),t.setAttribute("aria-haspopup","true")),t}__initListBox(){const e=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&e.setAttribute("theme",this._theme),e.addEventListener("selected-changed",t=>{const{value:n}=t.detail;if(typeof n=="number"){const o=e.items[n]._item;e.selected=null,o.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:o}}))}}),e}__initOverlay(){const e=this._overlayElement;e.$.backdrop.addEventListener("click",()=>{this.close()}),e.addEventListener(O?"click":"mouseover",t=>{this.__showSubMenu(t)}),e.addEventListener("keydown",t=>{const{key:n}=t,o=this.__isRTL,r=n==="ArrowRight",s=n==="ArrowLeft";!o&&r||o&&s||n==="Enter"||n===" "?this.__showSubMenu(t):!o&&s||o&&r||n==="Escape"?(n==="Escape"&&t.stopPropagation(),this.close(),this.listenOn.focus()):n==="Tab"&&this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){const e=document.createElement(this.constructor.is);return e._modeless=!0,e.openOn="opensubmenu",e.setAttribute("hidden",""),this.addEventListener("opened-changed",t=>{t.detail.value||this._subMenu.close()}),e.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("item-selected",t=>{const{detail:n}=t;this.dispatchEvent(new CustomEvent("item-selected",{detail:n}))}),this.addEventListener("close-all-menus",()=>{this._overlayElement.close()}),this.addEventListener("item-selected",t=>{const n=t.target,o=t.detail.value,r=n.items.indexOf(o);o.keepOpen&&r>-1?(n._overlayElement.requestContentUpdate(),n._listBox._observer.flush(),n._listBox.children[r].focus()):o.keepOpen||this.close()}),e.addEventListener("opened-changed",t=>{if(!t.detail.value){const n=this._listBox.querySelector("[expanded]");n&&this.__updateExpanded(n,!1)}}),e}__showSubMenu(e,t=e.composedPath().find(n=>n.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this._overlayElement.hasAttribute("opening")){requestAnimationFrame(()=>{this.__showSubMenu(e,t)});return}const n=this._subMenu;if(t){const{children:o}=t._item;if(n.items!==o&&n.close(),!this.opened)return;if(o&&o.length){this.__updateExpanded(t,!0);const{overlayClass:r}=this;this.__openSubMenu(n,t,r)}else n.listenOn.focus()}}__itemsRenderer(e,t,{detail:n}){this.__initMenu(e,t);const o=e.querySelector(this.constructor.is);o.closeOn=t.closeOn;const r=e.querySelector(`${this._tagNamePrefix}-list-box`);r.innerHTML="",[...n.children||t.items].forEach(s=>{const a=this.__createComponent(s);r.appendChild(a)})}_setMenuItemTheme(e,t,n){let o=e.getAttribute("theme")||n;t.theme!=null&&(o=Array.isArray(t.theme)?t.theme.join(" "):t.theme),this.__updateTheme(e,o)}__toggleMenuComponentAttribute(e,t,n){n?(e.setAttribute(t,""),e[`__has-${t}`]=!0):e[`__has-${t}`]&&(e.removeAttribute(t),e[`__has-${t}`]=!1)}__initMenu(e,t){if(e.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();const n=this.__initListBox();this._listBox=n,e.appendChild(n);const o=this.__initSubMenu();this._subMenu=o,e.appendChild(o),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(e,t){e.setAttribute("aria-expanded",t.toString()),e.toggleAttribute("expanded",t)}__updateTheme(e,t){t?e.setAttribute("theme",t):e.removeAttribute("theme")}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const K=i=>class extends z(i){static get properties(){return{selector:{type:String},opened:{type:Boolean,value:!1,notify:!0,readOnly:!0},openOn:{type:String,value:"vaadin-contextmenu",sync:!0},listenOn:{type:Object,sync:!0,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged",sync:!0},renderer:{type:Function,sync:!0},_modeless:{type:Boolean,sync:!0},_context:{type:Object,sync:!0},_phone:{type:Boolean},_touch:{type:Boolean,value:O},_wide:{type:Boolean},_wideMediaQuery:{type:String,value:"(min-device-width: 750px)"}}}static get observers(){return["_openedChanged(opened)","_targetOrOpenOnChanged(listenOn, openOn)","_rendererChanged(renderer, items)","_touchOrWideChanged(_touch, _wide)","_overlayContextChanged(_overlayElement, _context)","_overlayModelessChanged(_overlayElement, _modeless)","_overlayPhoneChanged(_overlayElement, _phone)","_overlayThemeChanged(_overlayElement, _theme)"]}constructor(){super(),this._createOverlay(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this._boundOnGlobalContextMenu=this._onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened=this.opened,this.close()}ready(){super.ready(),this.addController(new G(this._wideMediaQuery,e=>{this._wide=e}))}_createOverlay(){const e=document.createElement(`${this._tagNamePrefix}-overlay`);e.owner=this,e.addEventListener("opened-changed",t=>{this._onOverlayOpened(t)}),e.addEventListener("vaadin-overlay-open",t=>{this._onVaadinOverlayOpen(t)}),this._overlayElement=e}_onOverlayOpened(e){this._setOpened(e.detail.value),this.__alignOverlayPosition()}_onVaadinOverlayOpen(){this.__alignOverlayPosition(),this._overlayElement.style.opacity="",this.__forwardFocus()}_overlayContextChanged(e,t){e&&(e.model=t)}_overlayModelessChanged(e,t){e&&(e.modeless=t)}_overlayPhoneChanged(e,t){e&&(e.toggleAttribute("phone",t),e.withBackdrop=t)}_overlayThemeChanged(e,t){e&&(t?e.setAttribute("theme",t):e.removeAttribute("theme"))}_targetOrOpenOnChanged(e,t){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),e&&t&&(this._listen(e,t,this._boundOpen),this._oldListenOn=e,this._oldOpenOn=t)}_touchOrWideChanged(e,t){this._phone=!t&&e}_setListenOnUserSelect(e){this.listenOn.style.webkitTouchCallout=e,this.listenOn.style.webkitUserSelect=e,this.listenOn.style.userSelect=e,document.getSelection().removeAllRanges()}_closeOnChanged(e,t){const n="vaadin-overlay-outside-click",o=this._overlayElement;t&&this._unlisten(o,t,this._boundClose),e?(this._listen(o,e,this._boundClose),o.removeEventListener(n,this._boundPreventDefault)):o.addEventListener(n,this._boundPreventDefault)}_preventDefault(e){e.preventDefault()}_openedChanged(e){e?(document.documentElement.addEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("none")):(document.documentElement.removeEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("")),this._overlayElement.opened=e}requestContentUpdate(){!this._overlayElement||!this.renderer||this._overlayElement.requestContentUpdate()}_rendererChanged(e,t){if(t){if(e)throw new Error("The items API cannot be used together with a renderer");this.closeOn==="click"&&(this.closeOn=""),e=this.__itemsRenderer}this._overlayElement.renderer=e}close(){this._setOpened(!1)}_contextTarget(e){if(this.selector){const t=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(t,n=>e.composedPath().indexOf(n)>-1)[0]}return e.target}open(e){e&&!this.opened&&(this._context={detail:e.detail,target:this._contextTarget(e)},this._context.target&&(e.preventDefault(),e.stopPropagation(),this.__x=this._getEventCoordinate(e,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(e,"y"),this.__pageYOffset=window.pageYOffset,this._overlayElement.style.opacity="0",this._setOpened(!0)))}__onScroll(){if(!this.opened)return;const e=window.pageYOffset-this.__pageYOffset,t=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-t),this.__adjustPosition("right",t),this.__adjustPosition("top",-e),this.__adjustPosition("bottom",e),this.__pageYOffset+=e,this.__pageXOffset+=t}__adjustPosition(e,t){const o=this._overlayElement.style;o[e]=`${(parseInt(o[e])||0)+t}px`}__alignOverlayPosition(){const e=this._overlayElement;if(e.positionTarget)return;const t=e.style;["top","right","bottom","left"].forEach(h=>t.removeProperty(h)),["right-aligned","end-aligned","bottom-aligned"].forEach(h=>e.removeAttribute(h));const{xMax:n,xMin:o,yMax:r}=e.getBoundaries(),s=this.__x,a=this.__y,c=document.documentElement.clientWidth,d=document.documentElement.clientHeight;this.__isRTL?s>c/2||s>o?t.right=`${Math.max(0,c-s)}px`:(t.left=`${s}px`,this._setEndAligned(e)):s<c/2||s<n?t.left=`${s}px`:(t.right=`${Math.max(0,c-s)}px`,this._setEndAligned(e)),a<d/2||a<r?t.top=`${a}px`:(t.bottom=`${Math.max(0,d-a)}px`,e.setAttribute("bottom-aligned",""))}_setEndAligned(e){e.setAttribute("end-aligned",""),this.__isRTL||e.setAttribute("right-aligned","")}_getEventCoordinate(e,t){if(e.detail instanceof Object){if(e.detail[t])return e.detail[t];if(e.detail.sourceEvent)return this._getEventCoordinate(e.detail.sourceEvent,t)}else{const n=`client${t.toUpperCase()}`,o=e.changedTouches?e.changedTouches[0][n]:e[n];if(o===0){const r=e.target.getBoundingClientRect();return t==="x"?r.left:r.top+r.height}return o}}_listen(e,t,n){p[t]?C(e,t,n):e.addEventListener(t,n)}_unlisten(e,t,n){p[t]?E(e,t,n):e.removeEventListener(t,n)}_onGlobalContextMenu(e){e.shiftKey||(e.preventDefault(),this.close())}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class J extends K(I(b(D(M(v))))){static get template(){return f`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>

      <slot id="slot"></slot>
    `}static get is(){return"vaadin-context-menu"}ready(){super.ready(),R(this)}_attachDom(l){const e=this.attachShadow({mode:"open"});return e.appendChild(l),e.appendChild(this._overlayElement),e}}_(J);(function(){function i(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Context Menu Target")}function l(e){e.$contextMenuTargetConnector||(e.$contextMenuTargetConnector={openOnHandler:i(function(t){if(e.preventContextMenu&&e.preventContextMenu(t))return;t.preventDefault(),t.stopPropagation(),this.$contextMenuTargetConnector.openEvent=t;let n={};e.getContextMenuBeforeOpenDetail&&(n=e.getContextMenuBeforeOpenDetail(t)),e.dispatchEvent(new CustomEvent("vaadin-context-menu-before-open",{detail:n}))}),updateOpenOn:i(function(t){this.removeListener(),this.openOnEventType=t,customElements.whenDefined("vaadin-context-menu").then(i(()=>{p[t]?C(e,t,this.openOnHandler):e.addEventListener(t,this.openOnHandler)}))}),removeListener:i(function(){this.openOnEventType&&(p[this.openOnEventType]?E(e,this.openOnEventType,this.openOnHandler):e.removeEventListener(this.openOnEventType,this.openOnHandler))}),openMenu:i(function(t){t.open(this.openEvent)}),removeConnector:i(function(){this.removeListener(),e.$contextMenuTargetConnector=void 0})})}window.Vaadin.Flow.contextMenuTargetConnector={init(...e){return i(l)(...e)}}})();export{J as C,j as M,Q as a,V as b,H as c,w as l,U as s};
