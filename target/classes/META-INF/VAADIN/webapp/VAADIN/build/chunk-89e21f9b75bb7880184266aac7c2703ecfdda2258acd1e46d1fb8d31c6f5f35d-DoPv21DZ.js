import{ai as w,aj as x,R as C,p as c,x as b,P as p,U as M,C as y,V as B,W as E,K as A,a3 as O,ah as I,a as T,B as k,ae as L,a2 as z,T as S,E as D}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import"./chunk-7af66c5fdf5e35ae7f2216718f9cf5858a03989162599495423eb32a5f87d0e1-DPPsNdgP.js";import{c as F,l as K,a as N,b as P,s as R,M as W,C as j}from"./contextMenuTargetConnector--eMCjzD1.js";import{a as _,r as h,d as m,T as f}from"./indexhtml-DPuqjys-.js";import{i as V,m as q}from"./menu-overlay-B0O3oH7b.js";import"./chunk-573d9a5dcc28f6052283a7d1aa30bc2a64bfea38546ea31eab4943e94325207f-DxXp1Xhs.js";import"./chunk-e1bca8d53443e3cd4fa84413bb2e3f9ab47c80e046c6780b1677c2b13ac6f1a0-BOas1fNw.js";import"./announce-BfzTNhcm.js";(function(){const l=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Menu Bar")};function d(e,i){if(e.$connector)return;const o=new MutationObserver(r=>{r.some(s=>{const u=s.oldValue,a=s.target.getAttribute(s.attributeName);return u!==a})&&e.$connector.generateItems()});e.$connector={generateItems:l(r=>{if(!e.shadowRoot){setTimeout(()=>e.$connector.generateItems(r));return}r&&(e.__generatedItems=window.Vaadin.Flow.contextMenuConnector.generateItemsTree(i,r));let n=e.__generatedItems||[];n.forEach(s=>s.disabled=s.component.disabled),n.forEach(s=>{o.observe(s.component,{attributeFilter:["hidden","disabled"],attributeOldValue:!0})}),n=n.filter(s=>!s.component.hidden),e.items=n,e._buttons.forEach(s=>{s.item&&s.item.component&&s.addEventListener("click",u=>{u.composedPath().indexOf(s.item.component)===-1&&(s.item.component.click(),u.stopPropagation())})})})}}function t(e){e._item&&(e._item.className=e.className)}window.Vaadin.Flow.menubarConnector={initLazy(...e){return l(d)(...e)},setClassName(...e){return l(t)(...e)}}})();const $=_`
  :host {
    margin: calc(var(--lumo-space-xs) / 2);
    margin-left: 0;
    border-radius: 0;
  }

  [part='label'] {
    width: 100%;
  }

  /* NOTE(web-padawan): avoid using shorthand padding property for IE11 */
  [part='label'] ::slotted(vaadin-menu-bar-item) {
    justify-content: center;
    background-color: transparent;
    height: var(--lumo-button-size);
    margin: 0 calc((var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2) * -1);
    padding-left: calc(var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2);
    padding-right: calc(var(--lumo-size-m) / 3 + var(--lumo-border-radius-m) / 2);
  }

  :host([theme~='small']) [part='label'] ::slotted(vaadin-menu-bar-item) {
    min-height: var(--lumo-size-s);
    margin: 0 calc((var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2) * -1);
    padding-left: calc(var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2);
    padding-right: calc(var(--lumo-size-s) / 3 + var(--lumo-border-radius-m) / 2);
  }

  :host([theme~='tertiary']) [part='label'] ::slotted(vaadin-menu-bar-item) {
    margin: 0 calc((var(--lumo-button-size) / 6) * -1);
    padding-left: calc(var(--lumo-button-size) / 6);
    padding-right: calc(var(--lumo-button-size) / 6);
  }

  :host([theme~='tertiary-inline']) {
    margin-top: calc(var(--lumo-space-xs) / 2);
    margin-bottom: calc(var(--lumo-space-xs) / 2);
    margin-right: calc(var(--lumo-space-xs) / 2);
  }

  :host([theme~='tertiary-inline']) [part='label'] ::slotted(vaadin-menu-bar-item) {
    margin: 0;
    padding: 0;
  }

  :host(:first-of-type) {
    border-radius: var(--lumo-border-radius-m) 0 0 var(--lumo-border-radius-m);

    /* Needed to retain the focus-ring with border-radius */
    margin-left: calc(var(--lumo-space-xs) / 2);
  }

  :host(:nth-last-of-type(2)),
  :host([slot='overflow']) {
    border-radius: 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m) 0;
  }

  :host([theme~='tertiary']),
  :host([theme~='tertiary-inline']) {
    border-radius: var(--lumo-border-radius-m);
  }

  :host([slot='overflow']) {
    min-width: var(--lumo-button-size);
    padding-left: calc(var(--lumo-button-size) / 4);
    padding-right: calc(var(--lumo-button-size) / 4);
  }

  :host([slot='overflow']) ::slotted(*) {
    font-size: var(--lumo-font-size-xl);
  }

  :host([slot='overflow']) [part='prefix'],
  :host([slot='overflow']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }

  /* RTL styles */
  :host([dir='rtl']) {
    margin-left: calc(var(--lumo-space-xs) / 2);
    margin-right: 0;
    border-radius: 0;
  }

  :host([dir='rtl']:first-of-type) {
    border-radius: 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m) 0;
    margin-right: calc(var(--lumo-space-xs) / 2);
  }

  :host([dir='rtl']:nth-last-of-type(2)),
  :host([dir='rtl'][slot='overflow']) {
    border-radius: var(--lumo-border-radius-m) 0 0 var(--lumo-border-radius-m);
  }
`;h("vaadin-menu-bar-button",[w,$],{moduleId:"lumo-menu-bar-button"});/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */h("vaadin-menu-bar-button",_`
    :host {
      flex-shrink: 0;
    }

    :host([slot='overflow']) {
      margin-inline-end: 0;
    }

    [part='label'] ::slotted(vaadin-menu-bar-item) {
      position: relative;
      z-index: 1;
    }
  `,{moduleId:"vaadin-menu-bar-button-styles"});class H extends x{static get is(){return"vaadin-menu-bar-button"}_onKeyDown(d){this.__triggeredWithActiveKeys=this._activeKeys.includes(d.key),super._onKeyDown(d),this.__triggeredWithActiveKeys=null}}m(H);const U=_`
  [part='content'] {
    display: flex;
    /* tweak to inherit centering from menu bar button */
    align-items: inherit;
    justify-content: inherit;
  }

  [part='content'] ::slotted(vaadin-icon) {
    display: inline-block;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  [part='content'] ::slotted(vaadin-icon[icon^='vaadin:']) {
    padding: var(--lumo-space-xs);
    box-sizing: border-box !important;
  }
`;h("vaadin-menu-bar-item",[V,F,U],{moduleId:"lumo-menu-bar-item"});h("vaadin-menu-bar-list-box",[K,N],{moduleId:"lumo-menu-bar-list-box"});const G=_`
  :host(:first-of-type) {
    padding-top: var(--lumo-space-xs);
  }
`;h("vaadin-menu-bar-overlay",[q,P,G],{moduleId:"lumo-menu-bar-overlay"});h("vaadin-menu-bar",_`
    :host([has-single-button]) ::slotted(vaadin-menu-bar-button) {
      border-radius: var(--lumo-border-radius-m);
    }

    :host([theme~='end-aligned']) ::slotted(vaadin-menu-bar-button:first-of-type),
    :host([theme~='end-aligned'][has-single-button]) ::slotted(vaadin-menu-bar-button) {
      margin-inline-start: auto;
    }
  `,{moduleId:"lumo-menu-bar"});/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class J extends C(f(b(p))){static get is(){return"vaadin-menu-bar-item"}static get template(){return c`
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
    `}connectedCallback(){super.connectedCallback(),this.setAttribute("role","menuitem")}}m(J);/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Q extends M(f(b(y(p)))){static get is(){return"vaadin-menu-bar-list-box"}static get template(){return c`
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
    `}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}ready(){super.ready(),this.setAttribute("role","menu")}}m(Q);/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */h("vaadin-menu-bar-overlay",[B,R],{moduleId:"vaadin-menu-bar-overlay-styles"});class X extends W(E(b(f(p)))){static get is(){return"vaadin-menu-bar-overlay"}static get template(){return c`
      <div id="backdrop" part="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}}m(X);/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Y extends j{static get is(){return"vaadin-menu-bar-submenu"}static get template(){return c`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>

      <slot id="slot"></slot>
    `}constructor(){super(),this.openOn="opensubmenu"}get _tagNamePrefix(){return"vaadin-menu-bar"}_openedChanged(d){this._overlayElement.opened=d}close(){super.close(),this.hasAttribute("is-root")&&this.getRootNode().host._close()}}m(Y);/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Z=l=>class extends A(O(I(T(y(l))))){static get properties(){return{items:{type:Array,value:()=>[]},i18n:{type:Object,value:()=>({moreOptions:"More options"})},overlayClass:{type:String},openOnHover:{type:Boolean},_hasOverflow:{type:Boolean,value:!1},_overflow:{type:Object},_container:{type:Object}}}static get observers(){return["_themeChanged(_theme, _overflow, _container)","__hasOverflowChanged(_hasOverflow, _overflow)","__i18nChanged(i18n, _overflow)","_menuItemsChanged(items, _overflow, _container)"]}constructor(){super(),this.__boundOnContextMenuKeydown=this.__onContextMenuKeydown.bind(this)}get focused(){return(this._getItems()||[]).find(k)||this._expandedButton}get _vertical(){return!1}get _observeParent(){return!0}get _buttons(){return Array.from(this.querySelectorAll("vaadin-menu-bar-button"))}get _subMenu(){return this.shadowRoot.querySelector("vaadin-menu-bar-submenu")}ready(){super.ready(),this.setAttribute("role","menubar"),this._overflowController=new L(this,"overflow","vaadin-menu-bar-button",{initializer:i=>{i.setAttribute("hidden","");const o=document.createElement("div");o.setAttribute("aria-hidden","true"),o.innerHTML="&centerdot;".repeat(3),i.appendChild(o),this._overflow=i,this._initButtonAttrs(i)}}),this.addController(this._overflowController),this.addEventListener("mousedown",()=>this._hideTooltip()),this.addEventListener("mouseleave",()=>this._hideTooltip()),this._subMenu.addEventListener("item-selected",this.__onItemSelected.bind(this)),this._subMenu.addEventListener("close-all-menus",this.__onEscapeClose.bind(this)),this._subMenu._overlayElement.addEventListener("keydown",this.__boundOnContextMenuKeydown);const e=this.shadowRoot.querySelector('[part="container"]');e.addEventListener("click",this.__onButtonClick.bind(this)),e.addEventListener("mouseover",i=>this._onMouseOver(i)),this._container=e}_getItems(){return this._buttons}disconnectedCallback(){super.disconnectedCallback(),this._hideTooltip(!0)}_onResize(){this.__detectOverflow()}_disabledChanged(t,e){super._disabledChanged(t,e),e!==t&&this.__updateButtonsDisabled(t)}_themeChanged(t,e,i){e&&i&&(this._buttons.forEach(o=>this._setButtonTheme(o,t)),this.__detectOverflow()),t?this._subMenu.setAttribute("theme",t):this._subMenu.removeAttribute("theme")}__hasOverflowChanged(t,e){e&&e.toggleAttribute("hidden",!t)}_menuItemsChanged(t,e,i){if(!e||!i)return;t!==this._oldItems&&(this._oldItems=t,this.__renderButtons(t));const o=this._subMenu;o&&o.opened&&o.close()}__i18nChanged(t,e){e&&t&&t.moreOptions!==void 0&&(t.moreOptions?e.setAttribute("aria-label",t.moreOptions):e.removeAttribute("aria-label"))}__getOverflowCount(t){return t.item&&t.item.children&&t.item.children.length||0}__restoreButtons(t){t.forEach(e=>{e.disabled=e.item&&e.item.disabled||this.disabled,e.style.visibility="",e.style.position="";const i=e.item&&e.item.component;i instanceof HTMLElement&&i.getAttribute("role")==="menuitem"&&this.__restoreItem(e,i)}),this.__updateOverflow([])}__restoreItem(t,e){t.appendChild(e),e.removeAttribute("role"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-haspopup"),e.removeAttribute("tabindex")}__updateButtonsDisabled(t){this._buttons.forEach(e=>{e.disabled=t||e.item&&e.item.disabled})}__updateOverflow(t){this._overflow.item={children:t},this._hasOverflow=t.length>0}__setOverflowItems(t,e){const i=this._container;if(i.offsetWidth<i.scrollWidth){this._hasOverflow=!0;const o=this.__isRTL,r=i.getBoundingClientRect().left;let n;for(n=t.length;n>0;n--){const a=t[n-1],v=getComputedStyle(a),g=a.getBoundingClientRect().left-r;if(!o&&g+a.offsetWidth<i.offsetWidth-e.offsetWidth||o&&g>=e.offsetWidth)break;a.disabled=!0,a.style.visibility="hidden",a.style.position="absolute",a.style.width=v.width}const s=t.filter((a,v)=>v>=n).map(a=>a.item);this.__updateOverflow(s);const u=t.slice(0,n);n>0&&!u.some(a=>a.getAttribute("tabindex")==="0")&&this._setTabindex(u[n-1],!0)}}__detectOverflow(){const t=this._overflow,e=this._buttons.filter(n=>n!==t),i=this.__getOverflowCount(t);this.__restoreButtons(e),this.__setOverflowItems(e,t);const o=this.__getOverflowCount(t);i!==o&&this._subMenu.opened&&this._subMenu.close();const r=o===e.length||o===0&&e.length===1;this.toggleAttribute("has-single-button",r)}_removeButtons(){this._buttons.forEach(t=>{t!==this._overflow&&this.removeChild(t)})}_initButton(t){const e=document.createElement("vaadin-menu-bar-button"),i={...t};if(e.item=i,t.component){const o=this.__getComponent(i);i.component=o,o.item=i,e.appendChild(o)}else t.text&&(e.textContent=t.text);return t.className&&(e.className=t.className),e}_initButtonAttrs(t){t.setAttribute("role","menuitem"),(t===this._overflow||t.item&&t.item.children)&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded","false"))}_setButtonDisabled(t,e){t.disabled=e,t.setAttribute("tabindex",e?"-1":"0")}_setButtonTheme(t,e){let i=e;const o=t.item&&t.item.theme;o!=null&&(i=Array.isArray(o)?o.join(" "):o),i?t.setAttribute("theme",i):t.removeAttribute("theme")}__getComponent(t){const e=t.component;let i;const o=e instanceof HTMLElement;if(o&&e.localName==="vaadin-menu-bar-item"?i=e:(i=document.createElement("vaadin-menu-bar-item"),i.appendChild(o?e:document.createElement(e))),t.text){const r=i.firstChild||i;r.textContent=t.text}return i}__renderButtons(t=[]){this._removeButtons(),t.length!==0&&(t.forEach(e=>{const i=this._initButton(e);this.insertBefore(i,this._overflow),this._setButtonDisabled(i,e.disabled),this._initButtonAttrs(i),this._setButtonTheme(i,this._theme)}),this.__detectOverflow())}_showTooltip(t,e){const i=this._tooltipController.node;i&&i.isConnected&&(i.generator===void 0&&(i.generator=({item:o})=>o&&o.tooltip),this._subMenu.opened||(this._tooltipController.setTarget(t),this._tooltipController.setContext({item:t.item}),i._stateController.open({hover:e,focus:!e})))}_hideTooltip(t){const e=this._tooltipController&&this._tooltipController.node;e&&e._stateController.close(t)}_setExpanded(t,e){t.toggleAttribute("expanded",e),t.toggleAttribute("active",e),t.setAttribute("aria-expanded",e?"true":"false")}_setTabindex(t,e){t.setAttribute("tabindex",e?"0":"-1")}_focusItem(t,e){const i=e&&this.focused===this._expandedButton;i&&this._close(),super._focusItem(t,e),this._buttons.forEach(o=>{this._setTabindex(o,o===t)}),i&&t.item&&t.item.children?this.__openSubMenu(t,!0,{keepFocus:!0}):t===this._overflow?this._hideTooltip():this._showTooltip(t)}_getButtonFromEvent(t){return Array.from(t.composedPath()).find(e=>e.localName==="vaadin-menu-bar-button")}_setFocused(t){if(t){const e=this.querySelector('[tabindex="0"]');e&&this._buttons.forEach(i=>{this._setTabindex(i,i===e),i===e&&i!==this._overflow&&z()&&this._showTooltip(i)})}else this._hideTooltip()}_onArrowDown(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusFirstItem():this.__openSubMenu(e,!0)}_onArrowUp(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusLastItem():this.__openSubMenu(e,!0,{focusLast:!0})}_onEscape(t){t.composedPath().includes(this._expandedButton)&&this._close(!0),this._hideTooltip(!0)}_onKeyDown(t){switch(t.key){case"ArrowDown":this._onArrowDown(t);break;case"ArrowUp":this._onArrowUp(t);break;default:super._onKeyDown(t);break}}_onMouseOver(t){const e=this._getButtonFromEvent(t);if(!e)this._hideTooltip();else if(e!==this._expandedButton){const i=this._subMenu.opened;e.item.children&&(this.openOnHover||i)?this.__openSubMenu(e,!1):i&&this._close(),e===this._overflow||this.openOnHover&&e.item.children?this._hideTooltip():this._showTooltip(e,!0)}}__onContextMenuKeydown(t){const e=Array.from(t.composedPath()).find(i=>i._item);if(e){const i=e.parentNode;t.keyCode===38&&e===i.items[0]&&this._close(!0),(t.keyCode===37||t.keyCode===39&&!e._item.children)&&(t.stopImmediatePropagation(),this._onKeyDown(t))}}__fireItemSelected(t){this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:t}}))}__onButtonClick(t){t.stopPropagation();const e=this._getButtonFromEvent(t);e&&this.__openSubMenu(e,e.__triggeredWithActiveKeys)}__openSubMenu(t,e,i={}){const o=this._subMenu,r=t.item;if(o.opened&&(this._close(),o.listenOn===t))return;const n=r&&r.children;if(!n||n.length===0){this.__fireItemSelected(r);return}o.items=n,o.listenOn=t;const s=o._overlayElement;s.positionTarget=t,s.noVerticalOverlap=!0,this._expandedButton=t,requestAnimationFrame(()=>{t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:n}})),this._hideTooltip(!0),this._setExpanded(t,!0)}),this.style.pointerEvents="auto",s.addEventListener("vaadin-overlay-open",()=>{i.focusLast&&this._focusLastItem(),i.keepFocus&&this._focusItem(this._expandedButton,!1),e||s.$.overlay.focus(),s._updatePosition()},{once:!0})}_focusFirstItem(){this._subMenu._overlayElement.firstElementChild.focus()}_focusLastItem(){const t=this._subMenu._overlayElement.firstElementChild,e=t.items[t.items.length-1];e&&e.focus()}__onItemSelected(t){t.stopPropagation(),this.__fireItemSelected(t.detail.value)}__onEscapeClose(){this.__deactivateButton(!0)}__deactivateButton(t){const e=this._expandedButton;e&&e.hasAttribute("expanded")&&(this._setExpanded(e,!1),t&&this._focusItem(e,!1),this._expandedButton=null)}_close(t){this.style.pointerEvents="",this.__deactivateButton(t),this._subMenu.opened&&this._subMenu.close()}};/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class tt extends Z(D(f(p))){static get template(){return c`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='container'] {
          position: relative;
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          overflow: hidden;
        }
      </style>

      <div part="container">
        <slot></slot>
        <slot name="overflow"></slot>
      </div>
      <vaadin-menu-bar-submenu is-root overlay-class="[[overlayClass]]"></vaadin-menu-bar-submenu>

      <slot name="tooltip"></slot>
    `}static get is(){return"vaadin-menu-bar"}ready(){super.ready(),this._tooltipController=new S(this),this._tooltipController.setManual(!0),this.addController(this._tooltipController)}}m(tt);
