import{o as z,ak as D,h as $,p as I,x as B,P as C,H as ie,V as se,W as oe,af as ne,al as re,$ as le,C as ae,am as de,ah as he,an as ue,I as ce,a as pe,s as M,B as me,X as L,n as q,ao as R,l as N,L as W,T as U,E as j,u as _e,v as fe,j as ge,ap as ve,aq as be,a3 as ye,ae as Ie}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import{a as _,r as f,d as v,T as S}from"./indexhtml-DPuqjys-.js";import{i as H,a as G}from"./menu-overlay-B0O3oH7b.js";import{g as P}from"./path-utils-Duu_04h-.js";import{V as Ce}from"./virtualizer-lFF5HpzV.js";import{a as O}from"./announce-BfzTNhcm.js";const K=_`
  :host {
    transition: background-color 100ms;
    overflow: hidden;
    --_lumo-item-selected-icon-display: block;
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
  }

  :host([focused]:not([disabled])) {
    box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }
`;f("vaadin-combo-box-item",[H,K],{moduleId:"lumo-combo-box-item"});const Y=_`
  [part='content'] {
    padding: 0;
  }

  /* When items are empty, the spinner needs some room */
  :host(:not([closing])) [part~='content'] {
    min-height: calc(2 * var(--lumo-space-s) + var(--lumo-icon-size-s));
  }

  [part~='overlay'] {
    position: relative;
  }

  :host([top-aligned]) [part~='overlay'] {
    margin-top: var(--lumo-space-xs);
  }

  :host([bottom-aligned]) [part~='overlay'] {
    margin-bottom: var(--lumo-space-xs);
  }
`,X=_`
  [part~='loader'] {
    position: absolute;
    z-index: 1;
    left: var(--lumo-space-s);
    right: var(--lumo-space-s);
    top: var(--lumo-space-s);
    margin-left: auto;
    margin-inline-start: auto;
    margin-inline-end: 0;
  }

  :host([dir='rtl']) [part~='loader'] {
    left: auto;
    margin-left: 0;
    margin-right: auto;
    margin-inline-start: 0;
    margin-inline-end: auto;
  }
`;f("vaadin-combo-box-overlay",[z,G,Y,D,X,_`
      :host {
        --_vaadin-combo-box-items-container-border-width: var(--lumo-space-xs);
        --_vaadin-combo-box-items-container-border-style: solid;
      }
    `],{moduleId:"lumo-combo-box-overlay"});const xe=_`
  :host {
    outline: none;
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }
`;f("vaadin-combo-box",[$,xe],{moduleId:"lumo-combo-box"});/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const J=r=>class extends r{static get properties(){return{index:{type:Number},item:{type:Object},label:{type:String},selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Function}}}static get observers(){return["__rendererOrItemChanged(renderer, index, item.*, selected, focused)","__updateLabel(label, renderer)"]}static get observedAttributes(){return[...super.observedAttributes,"hidden"]}attributeChangedCallback(e,t,s){e==="hidden"&&s!==null?this.index=void 0:super.attributeChangedCallback(e,t,s)}connectedCallback(){super.connectedCallback(),this._owner=this.parentNode.owner;const e=this._owner.getAttribute("dir");e&&this.setAttribute("dir",e)}requestContentUpdate(){if(!this.renderer)return;const e={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this,this._owner,e)}__rendererOrItemChanged(e,t,s){s===void 0||t===void 0||(this._oldRenderer!==e&&(this.innerHTML="",delete this._$litPart$),e&&(this._oldRenderer=e,this.requestContentUpdate()))}__updateLabel(e,t){t||(this.textContent=e)}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class we extends J(S(B(C))){static get template(){return I`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}static get is(){return"vaadin-combo-box-item"}}v(we);/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Q=r=>class extends ie(r){static get observers(){return["_setOverlayWidth(positionTarget, opened)"]}constructor(){super(),this.requiredVerticalSpace=200}connectedCallback(){super.connectedCallback();const e=this._comboBox,t=e&&e.getAttribute("dir");t&&this.setAttribute("dir",t)}_shouldCloseOnOutsideClick(e){const t=e.composedPath();return!t.includes(this.positionTarget)&&!t.includes(this)}_updateOverlayWidth(){const e=this.localName;this.style.setProperty(`--_${e}-default-width`,`${this.positionTarget.clientWidth}px`);const t=getComputedStyle(this._comboBox).getPropertyValue(`--${e}-width`);t===""?this.style.removeProperty(`--${e}-width`):this.style.setProperty(`--${e}-width`,t)}_setOverlayWidth(e,t){e&&t&&(this._updateOverlayWidth(),this._updatePosition())}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Se=_`
  #overlay {
    width: var(--vaadin-combo-box-overlay-width, var(--_vaadin-combo-box-overlay-default-width, auto));
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;f("vaadin-combo-box-overlay",[se,Se],{moduleId:"vaadin-combo-box-overlay-styles"});class Ee extends Q(oe(B(S(C)))){static get is(){return"vaadin-combo-box-overlay"}static get template(){return I`
      <div id="backdrop" part="backdrop" hidden></div>
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}}v(Ee);/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const y=class{toString(){return""}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Z=r=>class extends r{static get properties(){return{items:{type:Array,observer:"__itemsChanged"},focusedIndex:{type:Number,observer:"__focusedIndexChanged"},loading:{type:Boolean,observer:"__loadingChanged"},opened:{type:Boolean,observer:"__openedChanged"},selectedItem:{type:Object,observer:"__selectedItemChanged"},itemIdPath:{type:String},owner:{type:Object},getItemLabel:{type:Object},renderer:{type:Object,observer:"__rendererChanged"},theme:{type:String}}}constructor(){super(),this.__boundOnItemClick=this.__onItemClick.bind(this)}get _viewportTotalPaddingBottom(){if(this._cachedViewportTotalPaddingBottom===void 0){const e=window.getComputedStyle(this.$.selector);this._cachedViewportTotalPaddingBottom=[e.paddingBottom,e.borderBottomWidth].map(t=>parseInt(t,10)).reduce((t,s)=>t+s)}return this._cachedViewportTotalPaddingBottom}ready(){super.ready(),this.setAttribute("role","listbox"),this.id=`${this.localName}-${ne()}`,this.__hostTagName=this.constructor.is.replace("-scroller",""),this.addEventListener("click",e=>e.stopPropagation()),this.__patchWheelOverScrolling(),this.__virtualizer=new Ce({createElements:this.__createElements.bind(this),updateElement:this._updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.$.selector})}requestContentUpdate(){this.__virtualizer&&this.__virtualizer.update()}scrollIntoView(e){if(!(this.opened&&e>=0))return;const t=this._visibleItemsCount();let s=e;e>this.__virtualizer.lastVisibleIndex-1?(this.__virtualizer.scrollToIndex(e),s=e-t+1):e>this.__virtualizer.firstVisibleIndex&&(s=this.__virtualizer.firstVisibleIndex),this.__virtualizer.scrollToIndex(Math.max(0,s));const n=[...this.children].find(g=>!g.hidden&&g.index===this.__virtualizer.lastVisibleIndex);if(!n||e!==n.index)return;const l=n.getBoundingClientRect(),h=this.getBoundingClientRect(),c=l.bottom-h.bottom+this._viewportTotalPaddingBottom;c>0&&(this.scrollTop+=c)}_isItemSelected(e,t,s){return e instanceof y?!1:s&&e!==void 0&&t!==void 0?P(s,e)===P(s,t):e===t}__itemsChanged(e){this.__virtualizer&&e&&(this.__virtualizer.size=e.length,this.__virtualizer.flush(),this.requestContentUpdate())}__loadingChanged(){this.requestContentUpdate()}__openedChanged(e){e&&this.requestContentUpdate()}__selectedItemChanged(){this.requestContentUpdate()}__focusedIndexChanged(e,t){e!==t&&this.requestContentUpdate(),e>=0&&!this.loading&&this.scrollIntoView(e)}__rendererChanged(e,t){(e||t)&&this.requestContentUpdate()}__createElements(e){return[...Array(e)].map(()=>{const t=document.createElement(`${this.__hostTagName}-item`);return t.addEventListener("click",this.__boundOnItemClick),t.tabIndex="-1",t.style.width="100%",t})}_updateElement(e,t){const s=this.items[t],n=this.focusedIndex,l=this._isItemSelected(s,this.selectedItem,this.itemIdPath);e.setProperties({item:s,index:t,label:this.getItemLabel(s),selected:l,renderer:this.renderer,focused:!this.loading&&n===t}),e.id=`${this.__hostTagName}-item-${t}`,e.setAttribute("role",t!==void 0?"option":!1),e.setAttribute("aria-selected",l.toString()),e.setAttribute("aria-posinset",t+1),e.setAttribute("aria-setsize",this.items.length),this.theme?e.setAttribute("theme",this.theme):e.removeAttribute("theme"),s instanceof y&&this.__requestItemByIndex(t)}__onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.currentTarget.item}}))}__patchWheelOverScrolling(){this.$.selector.addEventListener("wheel",e=>{const t=this.scrollTop===0,s=this.scrollHeight-this.scrollTop-this.clientHeight<=1;(t&&e.deltaY<0||s&&e.deltaY>0)&&e.preventDefault()})}__requestItemByIndex(e){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("index-requested",{detail:{index:e,currentScrollerPos:this._oldScrollerPosition}}))})}_visibleItemsCount(){return this.__virtualizer.scrollToIndex(this.__virtualizer.firstVisibleIndex),this.__virtualizer.size>0?this.__virtualizer.lastVisibleIndex-this.__virtualizer.firstVisibleIndex+1:0}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ve extends Z(C){static get is(){return"vaadin-combo-box-scroller"}static get template(){return I`
      <style>
        :host {
          display: block;
          min-height: 1px;
          overflow: auto;

          /* Fixes item background from getting on top of scrollbars on Safari */
          transform: translate3d(0, 0, 0);

          /* Enable momentum scrolling on iOS */
          -webkit-overflow-scrolling: touch;

          /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
          box-shadow: 0 0 0 white;
        }

        #selector {
          border-width: var(--_vaadin-combo-box-items-container-border-width);
          border-style: var(--_vaadin-combo-box-items-container-border-style);
          border-color: var(--_vaadin-combo-box-items-container-border-color, transparent);
          position: relative;
        }
      </style>
      <div id="selector">
        <slot></slot>
      </div>
    `}}v(Ve);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pe=r=>class extends re(r){static get properties(){return{pattern:{type:String}}}static get delegateAttrs(){return[...super.delegateAttrs,"pattern"]}static get constraints(){return[...super.constraints,"pattern"]}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ee=r=>class extends r{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},size:{type:Number,observer:"_sizeChanged"},dataProvider:{type:Object,observer:"_dataProviderChanged"},_pendingRequests:{value:()=>({})},__placeHolder:{value:new y},__previousDataProviderFilter:{type:String}}}static get observers(){return["_dataProviderFilterChanged(filter)","_warnDataProviderValue(dataProvider, value)","_ensureFirstPage(opened)"]}ready(){super.ready(),this._scroller.addEventListener("index-requested",e=>{const t=e.detail.index,s=e.detail.currentScrollerPos,n=Math.floor(this.pageSize*1.5);if(!this._shouldSkipIndex(t,n,s)&&t!==void 0){const l=this._getPageForIndex(t);this._shouldLoadPage(l)&&this._loadPage(l)}})}_dataProviderFilterChanged(e){if(this.__previousDataProviderFilter===void 0&&e===""){this.__previousDataProviderFilter=e;return}this.__previousDataProviderFilter!==e&&(this.__previousDataProviderFilter=e,this._pendingRequests={},this.loading=this._shouldFetchData(),this.size=void 0,this.clearCache())}_shouldFetchData(){return this.dataProvider?this.opened||this.filter&&this.filter.length:!1}_ensureFirstPage(e){e&&this._shouldLoadPage(0)&&this._loadPage(0)}_shouldSkipIndex(e,t,s){return s!==0&&e>=s-t&&e<=s+t}_shouldLoadPage(e){if(!this.filteredItems||this._forceNextRequest)return this._forceNextRequest=!1,!0;const t=this.filteredItems[e*this.pageSize];return t!==void 0?t instanceof y:this.size===void 0}_loadPage(e){if(this._pendingRequests[e]||!this.dataProvider)return;const t={page:e,pageSize:this.pageSize,filter:this.filter},s=(n,l)=>{if(this._pendingRequests[e]!==s)return;const h=this.filteredItems?[...this.filteredItems]:[];h.splice(t.page*t.pageSize,n.length,...n),this.filteredItems=h,!this.opened&&!this._isInputFocused()&&this._commitValue(),l!==void 0&&(this.size=l),delete this._pendingRequests[e],Object.keys(this._pendingRequests).length===0&&(this.loading=!1)};this._pendingRequests[e]=s,this.loading=!0,this.dataProvider(t,s)}_getPageForIndex(e){return Math.floor(e/this.pageSize)}clearCache(){if(!this.dataProvider)return;this._pendingRequests={};const e=[];for(let t=0;t<(this.size||0);t++)e.push(this.__placeHolder);this.filteredItems=e,this._shouldFetchData()?(this._forceNextRequest=!1,this._loadPage(0)):this._forceNextRequest=!0}_sizeChanged(e=0){const t=(this.filteredItems||[]).slice(0,e);for(let s=0;s<e;s++)t[s]=t[s]!==void 0?t[s]:this.__placeHolder;this.filteredItems=t,this._flushPendingRequests(e)}_pageSizeChanged(e,t){if(Math.floor(e)!==e||e<1)throw this.pageSize=t,new Error("`pageSize` value must be an integer > 0");this.clearCache()}_dataProviderChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.dataProvider=t}),this.clearCache()}_ensureItemsOrDataProvider(e){if(this.items!==void 0&&this.dataProvider!==void 0)throw e(),new Error("Using `items` and `dataProvider` together is not supported");this.dataProvider&&!this.filteredItems&&(this.filteredItems=[])}_warnDataProviderValue(e,t){if(e&&t!==""&&(this.selectedItem===void 0||this.selectedItem===null)){const s=this.__getItemIndexByValue(this.filteredItems,t);(s<0||!this._getItemLabel(this.filteredItems[s]))&&console.warn("Warning: unable to determine the label for the provided `value`. Nothing to display in the text field. This usually happens when setting an initial `value` before any items are returned from the `dataProvider` callback. Consider setting `selectedItem` instead of `value`")}}_flushPendingRequests(e){if(this._pendingRequests){const t=Math.ceil(e/this.pageSize);Object.entries(this._pendingRequests).forEach(([s,n])=>{parseInt(s)>=t&&n([],e)})}}};/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ae{constructor(i){this.host=i,i.addEventListener("opened-changed",()=>{i.opened||this.__setVirtualKeyboardEnabled(!1)}),i.addEventListener("blur",()=>this.__setVirtualKeyboardEnabled(!0)),i.addEventListener("touchstart",()=>this.__setVirtualKeyboardEnabled(!0))}__setVirtualKeyboardEnabled(i){this.host.inputElement&&(this.host.inputElement.inputMode=i?"":"none")}}/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function k(r){return r!=null}function F(r,i){return r.findIndex(e=>e instanceof y?!1:i(e))}const te=r=>class extends le(ae(de(he(ue(ce(pe(r))))))){static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,observer:"_openedChanged"},autoOpenDisabled:{type:Boolean},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:Function,items:{type:Array,observer:"_itemsChanged"},allowCustomValue:{type:Boolean,value:!1},filteredItems:{type:Array,observer:"_filteredItemsChanged"},_lastCommittedValue:String,loading:{type:Boolean,value:!1,reflectToAttribute:!0},_focusedIndex:{type:Number,observer:"_focusedIndexChanged",value:-1},filter:{type:String,value:"",notify:!0},selectedItem:{type:Object,notify:!0},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged"},itemValuePath:{type:String,value:"value"},itemIdPath:String,_toggleElement:{type:Object,observer:"_toggleElementChanged"},_dropdownItems:{type:Array},_closeOnBlurIsPrevented:Boolean,_scroller:Object,_overlayOpened:{type:Boolean,observer:"_overlayOpenedChanged"}}}static get observers(){return["_selectedItemChanged(selectedItem, itemValuePath, itemLabelPath)","_openedOrItemsChanged(opened, _dropdownItems, loading)","_updateScroller(_scroller, _dropdownItems, opened, loading, selectedItem, itemIdPath, _focusedIndex, renderer, theme)"]}constructor(){super(),this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundOnClearButtonMouseDown=this.__onClearButtonMouseDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}get _tagNamePrefix(){return"vaadin-combo-box"}get _nativeInput(){return this.inputElement}_inputElementChanged(e){super._inputElementChanged(e);const t=this._nativeInput;t&&(t.autocomplete="off",t.autocapitalize="off",t.setAttribute("role","combobox"),t.setAttribute("aria-autocomplete","list"),t.setAttribute("aria-expanded",!!this.opened),t.setAttribute("spellcheck","false"),t.setAttribute("autocorrect","off"),this._revertInputValueToValue(),this.clearElement&&this.clearElement.addEventListener("mousedown",this._boundOnClearButtonMouseDown))}ready(){super.ready(),this._initOverlay(),this._initScroller(),this._lastCommittedValue=this.value,this.addEventListener("click",this._boundOnClick),this.addEventListener("touchend",this._boundOnTouchend);const e=()=>{requestAnimationFrame(()=>{this._overlayElement.bringToFront()})};this.addEventListener("mousedown",e),this.addEventListener("touchstart",e),M(this),this.addController(new Ae(this))}disconnectedCallback(){super.disconnectedCallback(),this.close()}requestContentUpdate(){this._scroller&&(this._scroller.requestContentUpdate(),this._getItemElements().forEach(e=>{e.requestContentUpdate()}))}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.opened=!1}_propertiesChanged(e,t,s){super._propertiesChanged(e,t,s),t.filter!==void 0&&this._filterChanged(t.filter)}_initOverlay(){const e=this.$.overlay;e._comboBox=this,e.addEventListener("touchend",this._boundOnOverlayTouchAction),e.addEventListener("touchmove",this._boundOnOverlayTouchAction),e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("opened-changed",t=>{this._overlayOpened=t.detail.value}),this._overlayElement=e}_initScroller(e){const t=`${this._tagNamePrefix}-scroller`,s=this._overlayElement;s.renderer=l=>{l.firstChild||l.appendChild(document.createElement(t))},s.requestContentUpdate();const n=s.querySelector(t);n.owner=e||this,n.getItemLabel=this._getItemLabel.bind(this),n.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged),this._scroller=n}_updateScroller(e,t,s,n,l,h,c,g,b){e&&(s&&(e.style.maxHeight=getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`)||"65vh"),e.setProperties({items:s?t:[],opened:s,loading:n,selectedItem:l,itemIdPath:h,focusedIndex:c,renderer:g,theme:b}))}_openedOrItemsChanged(e,t,s){this._overlayOpened=!!(e&&(s||t&&t.length))}_overlayOpenedChanged(e,t){e?(this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-opened",{bubbles:!0,composed:!0})),this._onOpened()):t&&this._dropdownItems&&this._dropdownItems.length&&(this.close(),this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-closed",{bubbles:!0,composed:!0})))}_focusedIndexChanged(e,t){t!==void 0&&this._updateActiveDescendant(e)}_isInputFocused(){return this.inputElement&&me(this.inputElement)}_updateActiveDescendant(e){const t=this._nativeInput;if(!t)return;const s=this._getItemElements().find(n=>n.index===e);s?t.setAttribute("aria-activedescendant",s.id):t.removeAttribute("aria-activedescendant")}_openedChanged(e,t){if(t===void 0)return;e?(this._openedWithFocusRing=this.hasAttribute("focus-ring"),!this._isInputFocused()&&!L&&this.inputElement&&this.inputElement.focus(),this._overlayElement.restoreFocusOnClose=!0):(this._onClosed(),this._openedWithFocusRing&&this._isInputFocused()&&this.setAttribute("focus-ring",""));const s=this._nativeInput;s&&(s.setAttribute("aria-expanded",!!e),e?s.setAttribute("aria-controls",this._scroller.id):s.removeAttribute("aria-controls"))}_onOverlayTouchAction(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_isClearButton(e){return e.composedPath()[0]===this.clearElement}__onClearButtonMouseDown(e){e.preventDefault(),this.inputElement.focus()}_onClearButtonClick(e){e.preventDefault(),this._onClearAction(),this.opened&&this.requestContentUpdate()}_onToggleButtonClick(e){e.preventDefault(),this.opened?this.close():this.open()}_onHostClick(e){this.autoOpenDisabled||(e.preventDefault(),this.open())}_onClick(e){this._isClearButton(e)?this._onClearButtonClick(e):e.composedPath().includes(this._toggleElement)?this._onToggleButtonClick(e):this._onHostClick(e)}_onKeyDown(e){super._onKeyDown(e),e.key==="Tab"?this._overlayElement.restoreFocusOnClose=!1:e.key==="ArrowDown"?(this._onArrowDown(),e.preventDefault()):e.key==="ArrowUp"&&(this._onArrowUp(),e.preventDefault())}_getItemLabel(e){let t=e&&this.itemLabelPath?P(this.itemLabelPath,e):void 0;return t==null&&(t=e?e.toString():""),t}_getItemValue(e){let t=e&&this.itemValuePath?P(this.itemValuePath,e):void 0;return t===void 0&&(t=e?e.toString():""),t}_onArrowDown(){if(this.opened){const e=this._dropdownItems;e&&(this._focusedIndex=Math.min(e.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel())}else this.open()}_onArrowUp(){if(this.opened){if(this._focusedIndex>-1)this._focusedIndex=Math.max(0,this._focusedIndex-1);else{const e=this._dropdownItems;e&&(this._focusedIndex=e.length-1)}this._prefillFocusedItemLabel()}else this.open()}_prefillFocusedItemLabel(){if(this._focusedIndex>-1){const e=this._dropdownItems[this._focusedIndex];this._inputElementValue=this._getItemLabel(e),this._markAllSelectionRange()}}_setSelectionRange(e,t){this._isInputFocused()&&this.inputElement.setSelectionRange&&this.inputElement.setSelectionRange(e,t)}_markAllSelectionRange(){this._inputElementValue!==void 0&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(this._inputElementValue!==void 0){const e=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(e,e)}}_closeOrCommit(){!this.opened&&!this.loading?this._commitValue():this.close()}_onEnter(e){if(!this._hasValidInputValue()){e.preventDefault(),e.stopPropagation();return}this.opened&&(e.preventDefault(),e.stopPropagation()),this._closeOrCommit()}_hasValidInputValue(){const e=this._focusedIndex<0&&this._inputElementValue!==""&&this._getItemLabel(this.selectedItem)!==this._inputElementValue;return this.allowCustomValue||!e}_onEscape(e){this.autoOpenDisabled?this.opened||this.value!==this._inputElementValue&&this._inputElementValue.length>0?(e.stopPropagation(),this._focusedIndex=-1,this.cancel()):this.clearButtonVisible&&!this.opened&&this.value&&(e.stopPropagation(),this._onClearAction()):this.opened?(e.stopPropagation(),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this.cancel()):this.clearButtonVisible&&this.value&&(e.stopPropagation(),this._onClearAction())}_toggleElementChanged(e){e&&(e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("click",()=>{L&&!this._isInputFocused()&&document.activeElement.blur()}))}_onClearAction(){this.selectedItem=null,this.allowCustomValue&&(this.value=""),this._detectAndDispatchChange()}cancel(){this._revertInputValueToValue(),this._lastCommittedValue=this.value,this._closeOrCommit()}_onOpened(){this._lastCommittedValue=this.value}_onClosed(){(!this.loading||this.allowCustomValue)&&this._commitValue()}_commitValue(){if(this._focusedIndex>-1){const e=this._dropdownItems[this._focusedIndex];this.selectedItem!==e&&(this.selectedItem=e),this._inputElementValue=this._getItemLabel(this.selectedItem),this._focusedIndex=-1}else if(this._inputElementValue===""||this._inputElementValue===void 0)this.selectedItem=null,this.allowCustomValue&&(this.value="");else{const e=[this.selectedItem,...this._dropdownItems||[]],t=e[this.__getItemIndexByLabel(e,this._inputElementValue)];if(this.allowCustomValue&&!t){const s=this._inputElementValue;this._lastCustomValue=s;const n=new CustomEvent("custom-value-set",{detail:s,composed:!0,cancelable:!0,bubbles:!0});this.dispatchEvent(n),n.defaultPrevented||(this.value=s)}else!this.allowCustomValue&&!this.opened&&t?this.value=this._getItemValue(t):this._inputElementValue=this.selectedItem?this._getItemLabel(this.selectedItem):this.value||""}this._detectAndDispatchChange(),this._clearSelectionRange(),this.filter=""}_onInput(e){const t=this._inputElementValue,s={};this.filter===t?this._filterChanged(this.filter):s.filter=t,!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(s.opened=!0),this.setProperties(s)}_onChange(e){e.stopPropagation()}_itemLabelPathChanged(e){typeof e!="string"&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(e){this._scrollIntoView(0),this._focusedIndex=-1,this.items?this.filteredItems=this._filterItems(this.items,e):this._filteredItemsChanged(this.filteredItems)}_revertInputValue(){this.filter!==""?this._inputElementValue=this.filter:this._revertInputValueToValue(),this._clearSelectionRange()}_revertInputValueToValue(){this.allowCustomValue&&!this.selectedItem?this._inputElementValue=this.value:this._inputElementValue=this._getItemLabel(this.selectedItem)}_selectedItemChanged(e){if(e==null)this.filteredItems&&(this.allowCustomValue||(this.value=""),this._toggleHasValue(this._hasValue),this._inputElementValue=this.value);else{const t=this._getItemValue(e);if(this.value!==t&&(this.value=t,this.value!==t))return;this._toggleHasValue(!0),this._inputElementValue=this._getItemLabel(e)}}_valueChanged(e,t){e===""&&t===void 0||(k(e)?(this._getItemValue(this.selectedItem)!==e&&this._selectItemForValue(e),!this.selectedItem&&this.allowCustomValue&&(this._inputElementValue=e),this._toggleHasValue(this._hasValue)):this.selectedItem=null,this.filter="",this._lastCommittedValue=void 0)}_detectAndDispatchChange(){document.hasFocus()&&this.validate(),this.value!==this._lastCommittedValue&&(this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this._lastCommittedValue=this.value)}_itemsChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.items=t}),e?this.filteredItems=e.slice(0):t&&(this.filteredItems=null)}_filteredItemsChanged(e,t){this._setDropdownItems(e);const s=t?t[this._focusedIndex]:null,n=this.__getItemIndexByValue(e,this.value);(this.selectedItem===null||this.selectedItem===void 0)&&n>=0&&(this.selectedItem=e[n]);const l=this.__getItemIndexByValue(e,this._getItemValue(s));l>-1?this._focusedIndex=l:this._focusedIndex=this.__getItemIndexByLabel(this.filteredItems,this.filter)}_filterItems(e,t){return e&&e.filter(n=>(t=t?t.toString().toLowerCase():"",this._getItemLabel(n).toString().toLowerCase().indexOf(t)>-1))}_selectItemForValue(e){const t=this.__getItemIndexByValue(this.filteredItems,e),s=this.selectedItem;t>=0?this.selectedItem=this.filteredItems[t]:this.dataProvider&&this.selectedItem===void 0?this.selectedItem=void 0:this.selectedItem=null,this.selectedItem===null&&s===null&&this._selectedItemChanged(this.selectedItem)}_setDropdownItems(e){this._dropdownItems=e}_getItemElements(){return Array.from(this._scroller.querySelectorAll(`${this._tagNamePrefix}-item`))}_scrollIntoView(e){this._scroller&&this._scroller.scrollIntoView(e)}__getItemIndexByValue(e,t){return!e||!k(t)?-1:F(e,s=>this._getItemValue(s)===t)}__getItemIndexByLabel(e,t){return!e||!t?-1:F(e,s=>this._getItemLabel(s).toString().toLowerCase()===t.toString().toLowerCase())}_overlaySelectedItemChanged(e){e.stopPropagation(),!(e.detail.item instanceof y)&&this.opened&&(this._focusedIndex=this.filteredItems.indexOf(e.detail.item),this.close())}_setFocused(e){if(super._setFocused(e),!e&&!this.readonly&&!this._closeOnBlurIsPrevented){if(!this.opened&&this.allowCustomValue&&this._inputElementValue===this._lastCustomValue){delete this._lastCustomValue;return}this._closeOrCommit()}}_shouldRemoveFocus(e){return e.relatedTarget&&e.relatedTarget.localName===`${this._tagNamePrefix}-item`?!1:e.relatedTarget===this._overlayElement?(e.composedPath()[0].focus(),!1):!0}_onTouchend(e){!this.clearElement||e.composedPath()[0]!==this.clearElement||(e.preventDefault(),this._onClearAction())}};/**
 * @license
 * Copyright (c) 2015 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */f("vaadin-combo-box",q,{moduleId:"vaadin-combo-box-styles"});class Oe extends ee(te(Pe(R(S(j(C)))))){static get is(){return"vaadin-combo-box"}static get template(){return I`
      <style>
        :host([opened]) {
          pointer-events: auto;
        }
      </style>

      <div class="vaadin-combo-box-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
          <div id="toggleButton" part="toggle-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <vaadin-combo-box-overlay
        id="overlay"
        opened="[[_overlayOpened]]"
        loading$="[[loading]]"
        theme$="[[_theme]]"
        position-target="[[_positionTarget]]"
        no-vertical-overlap
        restore-focus-node="[[inputElement]]"
      ></vaadin-combo-box-overlay>

      <slot name="tooltip"></slot>
    `}static get properties(){return{_positionTarget:{type:Object}}}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new N(this,i=>{this._setInputElement(i),this._setFocusElement(i),this.stateTarget=i,this.ariaTarget=i})),this.addController(new W(this.inputElement,this._labelController)),this._tooltipController=new U(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(i=>!i.opened),this._positionTarget=this.shadowRoot.querySelector('[part="input-field"]'),this._toggleElement=this.$.toggleButton}_onClearButtonClick(i){i.stopPropagation(),super._onClearButtonClick(i)}_onHostClick(i){const e=i.composedPath();(e.includes(this._labelNode)||e.includes(this._positionTarget))&&super._onHostClick(i)}}v(Oe);(function(){const r=function(i){return window.Vaadin.Flow.tryCatchWrapper(i,"Vaadin Combo Box")};window.Vaadin.Flow.comboBoxConnector={initLazy:i=>r(function(e){if(e.$connector)return;e.$connector={};const t={};let s={},n="";const l=new window.Vaadin.ComboBoxPlaceholder,h=(()=>{let o="",a=!1;return{needsDataCommunicatorReset:()=>a=!0,getLastFilterSentToServer:()=>o,requestData:(p,x,w)=>{const A=x-p,T=w.filter;e.$server.setRequestedRange(p,A,T),o=T,a&&(e.$server.resetDataCommunicator(),a=!1)}}})(),c=(o=Object.keys(t))=>{o.forEach(a=>{t[a]([],e.size),delete t[a];const d=parseInt(a)*e.pageSize,m=d+e.pageSize,u=Math.min(m,e.filteredItems.length);for(let p=d;p<u;p++)e.filteredItems[p]=l})};e.dataProvider=function(o,a){if(o.pageSize!=e.pageSize)throw"Invalid pageSize";if(e._clientSideFilter)if(s[0]){b(s[0],o.filter,a);return}else o.filter="";if(o.filter!==n){s={},n=o.filter,this._filterDebouncer=_e.debounce(this._filterDebouncer,fe.after(500),()=>{if(h.getLastFilterSentToServer()===o.filter&&h.needsDataCommunicatorReset(),o.filter!==n)throw new Error("Expected params.filter to be '"+n+"' but was '"+o.filter+"'");this._filterDebouncer=void 0,c(),e.dataProvider(o,a)});return}if(this._filterDebouncer){t[o.page]=a;return}if(s[o.page])g(o.page,a);else{t[o.page]=a;const m=Math.max(o.pageSize*2,500),u=Object.keys(t).map(w=>parseInt(w)),p=Math.min(...u),x=Math.max(...u);if(u.length*o.pageSize>m)o.page===p?c([String(x)]):c([String(p)]),e.dataProvider(o,a);else if(x-p+1!==u.length)c();else{const w=o.pageSize*p,A=o.pageSize*(x+1);h.requestData(w,A,o)}}},e.$connector.clear=r((o,a)=>{const d=Math.floor(o/e.pageSize),m=Math.ceil(a/e.pageSize);for(let u=d;u<d+m;u++)delete s[u]}),e.$connector.filter=r(function(o,a){return a=a?a.toString().toLowerCase():"",e._getItemLabel(o,e.itemLabelPath).toString().toLowerCase().indexOf(a)>-1}),e.$connector.set=r(function(o,a,d){if(d!=h.getLastFilterSentToServer())return;if(o%e.pageSize!=0)throw"Got new data to index "+o+" which is not aligned with the page size of "+e.pageSize;if(o===0&&a.length===0&&t[0]){s[0]=[];return}const m=o/e.pageSize,u=Math.ceil(a.length/e.pageSize);for(let p=0;p<u;p++){let x=m+p,w=a.slice(p*e.pageSize,(p+1)*e.pageSize);s[x]=w}}),e.$connector.updateData=r(function(o){const a=new Map(o.map(d=>[d.key,d]));e.filteredItems=e.filteredItems.map(d=>a.get(d.key)||d)}),e.$connector.updateSize=r(function(o){e._clientSideFilter||(e.size=o)}),e.$connector.reset=r(function(){c(),s={},e.clearCache()}),e.$connector.confirm=r(function(o,a){if(a!=h.getLastFilterSentToServer())return;let d=Object.getOwnPropertyNames(t);for(let m=0;m<d.length;m++){let u=d[m];s[u]&&g(u,t[u])}e.$server.confirmUpdate(o)});const g=r(function(o,a){let d=s[o];e._clientSideFilter?b(d,e.filter,a):(delete s[o],a(d,e.size))}),b=r(function(o,a,d){let m=o;a&&(m=o.filter(u=>e.$connector.filter(u,a))),d(m,m.length)});e.addEventListener("custom-value-set",r(o=>o.preventDefault()))})(i)}})();window.Vaadin.ComboBoxPlaceholder=y;/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Be=_`
  :host {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
    color: var(--lumo-body-text-color);
    border-radius: var(--lumo-border-radius-s);
    background-color: var(--lumo-contrast-20pct);
    cursor: var(--lumo-clickable-cursor);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([focused]) [part='remove-button'] {
    color: inherit;
  }

  :host([slot='overflow']) {
    position: relative;
    min-width: var(--lumo-size-xxs);
    margin-inline-start: var(--lumo-space-s);
  }

  :host([slot='overflow'])::before,
  :host([slot='overflow'])::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-left: calc(var(--lumo-space-s) / 4) solid;
    border-radius: var(--lumo-border-radius-s);
    border-color: var(--lumo-contrast-30pct);
  }

  :host([slot='overflow'])::before {
    left: calc(-1 * var(--lumo-space-s) / 2);
  }

  :host([slot='overflow'])::after {
    left: calc(-1 * var(--lumo-space-s));
  }

  :host([count='2']) {
    margin-inline-start: calc(var(--lumo-space-s) / 2);
  }

  :host([count='2'])::after {
    display: none;
  }

  :host([count='1']) {
    margin-inline-start: 0;
  }

  :host([count='1'])::before,
  :host([count='1'])::after {
    display: none;
  }

  [part='label'] {
    font-weight: 500;
    line-height: 1.25;
  }

  [part='remove-button'] {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -0.3125em;
    margin-bottom: -0.3125em;
    margin-inline-start: auto;
    width: 1.25em;
    height: 1.25em;
    font-size: 1.5em;
    transition: none;
  }

  [part='remove-button']::before {
    content: var(--lumo-icons-cross);
  }

  :host([disabled]) [part='label'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
    pointer-events: none;
  }
`;f("vaadin-multi-select-combo-box-chip",[ge,Be],{moduleId:"lumo-multi-select-combo-box-chip"});/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Te=_`
  @media (any-hover: hover) {
    :host(:hover[readonly]) {
      background-color: transparent;
      cursor: default;
    }
  }
`;f("vaadin-multi-select-combo-box-item",[H,K,Te],{moduleId:"lumo-multi-select-combo-box-item"});f("vaadin-multi-select-combo-box-overlay",[z,G,Y,D,X,_`
      :host {
        --_vaadin-multi-select-combo-box-items-container-border-width: var(--lumo-space-xs);
        --_vaadin-multi-select-combo-box-items-container-border-style: solid;
      }
    `],{moduleId:"lumo-multi-select-combo-box-overlay"});f("vaadin-multi-select-combo-box-container",_`
    :host([auto-expand-vertically]) {
      padding-block: var(--lumo-space-xs);
    }
  `,{moduleId:"lumo-multi-select-combo-box-container"});const Le=_`
  :host([has-value]) {
    padding-inline-start: 0;
  }

  :host([has-value]) ::slotted(input:placeholder-shown) {
    caret-color: var(--lumo-body-text-color) !important;
  }

  [part='label'] {
    flex-shrink: 0;
  }

  /* Override input-container styles */
  ::slotted([slot='chip']),
  ::slotted([slot='overflow']) {
    min-height: auto;
    padding: 0.3125em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-body-text-color);
    -webkit-mask-image: none;
    mask-image: none;
  }

  :host([auto-expand-vertically]) ::slotted([slot='chip']) {
    margin-block: calc(var(--lumo-space-xs) / 2);
  }

  ::slotted([slot='chip']:not([readonly]):not([disabled])) {
    padding-inline-end: 0;
  }

  :host([auto-expand-vertically]) ::slotted([slot='input']) {
    min-height: calc(var(--lumo-text-field-size, var(--lumo-size-m)) - 2 * var(--lumo-space-xs));
  }

  ::slotted([slot='chip']:not(:last-of-type)),
  ::slotted([slot='overflow']:not(:last-of-type)) {
    margin-inline-end: var(--lumo-space-xs);
  }

  ::slotted([slot='chip'][focused]) {
    background-color: var(--vaadin-selection-color, var(--lumo-primary-color));
    color: var(--lumo-primary-contrast-color);
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }

  :host([readonly][has-value]) [part='toggle-button'] {
    color: var(--lumo-contrast-60pct);
    cursor: var(--lumo-clickable-cursor);
  }
`;f("vaadin-multi-select-combo-box",[$,Le],{moduleId:"lumo-multi-select-combo-box"});/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ke extends S(C){static get is(){return"vaadin-multi-select-combo-box-chip"}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},label:{type:String},item:{type:Object}}}static get template(){return I`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          align-self: center;
          white-space: nowrap;
          box-sizing: border-box;
        }

        [part='label'] {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :host([hidden]),
        :host(:is([readonly], [disabled], [slot='overflow'])) [part='remove-button'] {
          display: none !important;
        }

        @media (forced-colors: active) {
          :host {
            outline: 1px solid;
            outline-offset: -1px;
          }
        }
      </style>
      <div part="label">[[label]]</div>
      <div part="remove-button" on-click="_onRemoveClick"></div>
    `}_onRemoveClick(i){i.stopPropagation(),this.dispatchEvent(new CustomEvent("item-removed",{detail:{item:this.item},bubbles:!0,composed:!0}))}}v(ke);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */f("vaadin-multi-select-combo-box-container",_`
    #wrapper {
      display: flex;
      width: 100%;
      min-width: 0;
    }

    :host([auto-expand-vertically]) #wrapper {
      flex-wrap: wrap;
    }
  `,{moduleId:"vaadin-multi-select-combo-box-container-styles"});let E;class Fe extends ve{static get is(){return"vaadin-multi-select-combo-box-container"}static get template(){if(!E){E=super.template.cloneNode(!0);const i=E.content,e=i.querySelectorAll("slot"),t=document.createElement("div");t.setAttribute("id","wrapper"),i.insertBefore(t,e[2]),t.appendChild(e[0]),t.appendChild(e[1])}return E}static get properties(){return{autoExpandVertically:{type:Boolean,reflectToAttribute:!0}}}}v(Fe);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ze extends J(S(B(C))){static get is(){return"vaadin-multi-select-combo-box-item"}static get template(){return I`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}}v(ze);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */f("vaadin-multi-select-combo-box-overlay",_`
    #overlay {
      width: var(
        --vaadin-multi-select-combo-box-overlay-width,
        var(--_vaadin-multi-select-combo-box-overlay-default-width, auto)
      );
    }

    [part='content'] {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,{moduleId:"vaadin-multi-select-combo-box-overlay-styles"});let V;class De extends Q(be){static get is(){return"vaadin-multi-select-combo-box-overlay"}static get template(){if(!V){V=super.template.cloneNode(!0);const i=V.content.querySelector('[part~="overlay"]');i.removeAttribute("tabindex");const e=document.createElement("div");e.setAttribute("part","loader"),i.insertBefore(e,i.firstElementChild)}return V}}v(De);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class $e extends Z(C){static get is(){return"vaadin-multi-select-combo-box-scroller"}static get template(){return I`
      <style>
        :host {
          display: block;
          min-height: 1px;
          overflow: auto;

          /* Fixes item background from getting on top of scrollbars on Safari */
          transform: translate3d(0, 0, 0);

          /* Enable momentum scrolling on iOS */
          -webkit-overflow-scrolling: touch;

          /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
          box-shadow: 0 0 0 white;
        }

        #selector {
          border-width: var(--_vaadin-multi-select-combo-box-items-container-border-width);
          border-style: var(--_vaadin-multi-select-combo-box-items-container-border-style);
          border-color: var(--_vaadin-multi-select-combo-box-items-container-border-color, transparent);
          position: relative;
        }
      </style>
      <div id="selector">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("aria-multiselectable","true")}_isItemSelected(i,e,t){return i instanceof y||this.owner.readonly?!1:this.owner._findIndex(i,this.owner.selectedItems,t)>-1}_updateElement(i,e){super._updateElement(i,e),i.toggleAttribute("readonly",this.owner.readonly)}}v($e);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Me extends ee(te(S(C))){static get is(){return"vaadin-multi-select-combo-box-internal"}static get template(){return I`
      <style>
        :host([opened]) {
          pointer-events: auto;
        }
      </style>

      <slot></slot>

      <vaadin-multi-select-combo-box-overlay
        id="overlay"
        opened="[[_overlayOpened]]"
        loading$="[[loading]]"
        theme$="[[_theme]]"
        position-target="[[_target]]"
        no-vertical-overlap
        restore-focus-node="[[inputElement]]"
      ></vaadin-multi-select-combo-box-overlay>
    `}static get properties(){return{filteredItems:{type:Array,notify:!0},loading:{type:Boolean,notify:!0},size:{type:Number,notify:!0},selectedItems:{type:Array,value:()=>[]},selectedItemsOnTop:{type:Boolean,value:!1},lastFilter:{type:String,notify:!0},topGroup:{type:Array,observer:"_topGroupChanged"},_target:{type:Object}}}get clearElement(){return this.querySelector('[part="clear-button"]')}get _tagNamePrefix(){return"vaadin-multi-select-combo-box"}open(){!this.disabled&&!(this.readonly&&this.selectedItems.length===0)&&(this.opened=!0)}ready(){super.ready(),this._target=this,this._toggleElement=this.querySelector(".toggle-button")}_setDropdownItems(i){if(this.readonly){this._dropdownItems=this.selectedItems;return}if(this.filter||!this.selectedItemsOnTop){this._dropdownItems=i;return}if(i&&i.length&&this.topGroup&&this.topGroup.length){const e=i.filter(t=>this._comboBox._findIndex(t,this.topGroup,this.itemIdPath)===-1);this._dropdownItems=this.topGroup.concat(e);return}this._dropdownItems=i}_topGroupChanged(i){i&&this._setDropdownItems(this.filteredItems)}_initScroller(){const i=this.getRootNode().host;this._comboBox=i,super._initScroller(i)}_onEnter(i){if(this.opened){if(i.preventDefault(),i.stopPropagation(),this.readonly)this.close();else if(this._hasValidInputValue()){const e=this._dropdownItems[this._focusedIndex];this._commitValue(),this._focusedIndex=this._dropdownItems.indexOf(e)}return}super._onEnter(i)}_onEscape(i){if(this.readonly){i.stopPropagation(),this.opened&&this.close();return}super._onEscape(i)}_commitValue(){this.lastFilter=this.filter,super._commitValue()}_onArrowDown(){this.readonly?this.opened||this.open():super._onArrowDown()}_onArrowUp(){this.readonly?this.opened||this.open():super._onArrowUp()}_setFocused(i){i||(this._ignoreCommitValue=!0),super._setFocused(i),!i&&this.readonly&&!this._closeOnBlurIsPrevented&&this.close()}_detectAndDispatchChange(){if(this._ignoreCommitValue){this._ignoreCommitValue=!1,this.selectedItem=null,this._inputElementValue="";return}super._detectAndDispatchChange()}_overlaySelectedItemChanged(i){i.stopPropagation(),!this.readonly&&(i.detail.item instanceof y||this.opened&&this.dispatchEvent(new CustomEvent("combo-box-item-selected",{detail:{item:i.detail.item}})))}_shouldLoadPage(i){return this.readonly?!1:super._shouldLoadPage(i)}clearCache(){this.readonly||super.clearCache()}}v(Me);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const qe=_`
  :host {
    --input-min-width: var(--vaadin-multi-select-combo-box-input-min-width, 4em);
    --_chip-min-width: var(--vaadin-multi-select-combo-box-chip-min-width, 50px);
  }

  #chips {
    display: flex;
    align-items: center;
  }

  ::slotted(input) {
    box-sizing: border-box;
    flex: 1 0 var(--input-min-width);
  }

  ::slotted([slot='chip']),
  ::slotted([slot='overflow']) {
    flex: 0 1 auto;
  }

  ::slotted([slot='chip']) {
    overflow: hidden;
  }

  :host(:is([readonly], [disabled])) ::slotted(input) {
    flex-grow: 0;
    flex-basis: 0;
    padding: 0;
  }

  :host([auto-expand-vertically]) #chips {
    display: contents;
  }

  :host([auto-expand-horizontally]) [class$='container'] {
    width: auto;
  }
`;f("vaadin-multi-select-combo-box",[q,qe],{moduleId:"vaadin-multi-select-combo-box-styles"});class Re extends ye(R(S(j(C)))){static get is(){return"vaadin-multi-select-combo-box"}static get template(){return I`
      <div class="vaadin-multi-select-combo-box-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-multi-select-combo-box-internal
          id="comboBox"
          items="[[__effectiveItems]]"
          item-id-path="[[itemIdPath]]"
          item-label-path="[[itemLabelPath]]"
          item-value-path="[[itemValuePath]]"
          disabled="[[disabled]]"
          readonly="[[readonly]]"
          auto-open-disabled="[[autoOpenDisabled]]"
          allow-custom-value="[[allowCustomValue]]"
          overlay-class="[[overlayClass]]"
          data-provider="[[dataProvider]]"
          filter="{{filter}}"
          last-filter="{{_lastFilter}}"
          loading="{{loading}}"
          size="{{size}}"
          filtered-items="[[__effectiveFilteredItems]]"
          selected-items="[[selectedItems]]"
          selected-items-on-top="[[selectedItemsOnTop]]"
          top-group="[[_topGroup]]"
          opened="{{opened}}"
          renderer="[[renderer]]"
          theme$="[[_theme]]"
          on-combo-box-item-selected="_onComboBoxItemSelected"
          on-change="_onComboBoxChange"
          on-custom-value-set="_onCustomValueSet"
          on-filtered-items-changed="_onFilteredItemsChanged"
        >
          <vaadin-multi-select-combo-box-container
            part="input-field"
            auto-expand-vertically="[[autoExpandVertically]]"
            readonly="[[readonly]]"
            disabled="[[disabled]]"
            invalid="[[invalid]]"
            theme$="[[_theme]]"
          >
            <slot name="overflow" slot="prefix"></slot>
            <div id="chips" part="chips" slot="prefix">
              <slot name="chip"></slot>
            </div>
            <slot name="input"></slot>
            <div
              id="clearButton"
              part="clear-button"
              slot="suffix"
              on-touchend="_onClearButtonTouchend"
              aria-hidden="true"
            ></div>
            <div id="toggleButton" class="toggle-button" part="toggle-button" slot="suffix" aria-hidden="true"></div>
          </vaadin-multi-select-combo-box-container>
        </vaadin-multi-select-combo-box-internal>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}static get properties(){return{autoExpandHorizontally:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_autoExpandHorizontallyChanged"},autoExpandVertically:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_autoExpandVerticallyChanged"},autoOpenDisabled:Boolean,clearButtonVisible:{type:Boolean,reflectToAttribute:!0,observer:"_clearButtonVisibleChanged",value:!1},items:{type:Array},itemLabelPath:{type:String,value:"label"},itemValuePath:{type:String,value:"value"},itemIdPath:{type:String},i18n:{type:Object,value:()=>({cleared:"Selection cleared",focused:"focused. Press Backspace to remove",selected:"added to selection",deselected:"removed from selection",total:"{count} items selected"})},loading:{type:Boolean,value:!1,reflectToAttribute:!0},overlayClass:{type:String},readonly:{type:Boolean,value:!1,observer:"_readonlyChanged",reflectToAttribute:!0},selectedItems:{type:Array,value:()=>[],notify:!0},opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},size:{type:Number},pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},dataProvider:{type:Object},allowCustomValue:{type:Boolean,value:!1},placeholder:{type:String,value:"",observer:"_placeholderChanged"},renderer:Function,filter:{type:String,value:"",notify:!0},filteredItems:Array,selectedItemsOnTop:{type:Boolean,value:!1},value:{type:String},__effectiveItems:{type:Array,computed:"__computeEffectiveItems(items, selectedItems, readonly)"},__effectiveFilteredItems:{type:Array,computed:"__computeEffectiveFilteredItems(items, filteredItems, selectedItems, readonly)"},_overflowItems:{type:Array,value:()=>[]},_focusedChipIndex:{type:Number,value:-1,observer:"_focusedChipIndexChanged"},_lastFilter:{type:String},_topGroup:{type:Array}}}static get observers(){return["_selectedItemsChanged(selectedItems, selectedItems.*)","__updateOverflowChip(_overflow, _overflowItems, disabled, readonly)","__updateTopGroup(selectedItemsOnTop, selectedItems, opened)"]}get slotStyles(){const i=this.localName;return[...super.slotStyles,`
        ${i}[has-value] input::placeholder {
          color: transparent !important;
          forced-color-adjust: none;
        }
      `]}get clearElement(){return this.$.clearButton}get _chips(){return[...this.querySelectorAll('[slot="chip"]')]}get _hasValue(){return this.selectedItems&&this.selectedItems.length>0}ready(){super.ready(),this.addController(new N(this,i=>{this._setInputElement(i),this._setFocusElement(i),this.stateTarget=i,this.ariaTarget=i})),this.addController(new W(this.inputElement,this._labelController)),this._tooltipController=new U(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(i=>!i.opened),this._inputField=this.shadowRoot.querySelector('[part="input-field"]'),this._overflowController=new Ie(this,"overflow","vaadin-multi-select-combo-box-chip",{initializer:i=>{i.addEventListener("mousedown",e=>this._preventBlur(e)),this._overflow=i}}),this.addController(this._overflowController),this.__updateChips(),M(this)}checkValidity(){return this.required&&!this.readonly?this._hasValue:!0}clear(){this.__updateSelection([]),O(this.i18n.cleared)}clearCache(){this.$&&this.$.comboBox&&this.$.comboBox.clearCache()}requestContentUpdate(){this.$&&this.$.comboBox&&this.$.comboBox.requestContentUpdate()}_disabledChanged(i,e){super._disabledChanged(i,e),(i||e)&&this.__updateChips()}_inputElementChanged(i){super._inputElementChanged(i),i&&this.$.comboBox._setInputElement(i)}_setFocused(i){super._setFocused(i),!i&&document.hasFocus()&&(this._focusedChipIndex=-1,this.validate())}_onResize(){this.__updateChips()}_delegateAttribute(i,e){if(this.stateTarget){if(i==="required"){this._delegateAttribute("aria-required",e?"true":!1);return}super._delegateAttribute(i,e)}}_autoExpandHorizontallyChanged(i,e){(i||e)&&this.__updateChips()}_autoExpandVerticallyChanged(i,e){(i||e)&&this.__updateChips()}_clearButtonVisibleChanged(i,e){(i||e)&&this.__updateChips()}_onFilteredItemsChanged(i){const{value:e}=i.detail;(Array.isArray(e)||e==null)&&(this.filteredItems=e)}_readonlyChanged(i,e){(i||e)&&this.__updateChips(),this.dataProvider&&this.clearCache()}_pageSizeChanged(i,e){(Math.floor(i)!==i||i<=0)&&(this.pageSize=e,console.error('"pageSize" value must be an integer > 0')),this.$.comboBox.pageSize=this.pageSize}_placeholderChanged(i){const e=this.__tmpA11yPlaceholder;e!==i&&(this.__savedPlaceholder=i,e&&(this.placeholder=e))}_selectedItemsChanged(i){if(this._toggleHasValue(this._hasValue),this._hasValue){const e=this._mergeItemLabels(i);this.__tmpA11yPlaceholder=e,this.placeholder=e}else delete this.__tmpA11yPlaceholder,this.placeholder=this.__savedPlaceholder;this.__updateChips(),this.requestContentUpdate(),this.opened&&this.$.comboBox.$.overlay._updateOverlayWidth()}_getItemLabel(i){return this.$.comboBox._getItemLabel(i)}_mergeItemLabels(i){return i.map(e=>this._getItemLabel(e)).join(", ")}_findIndex(i,e,t){if(t&&i){for(let s=0;s<e.length;s++)if(e[s]&&e[s][t]===i[t])return s;return-1}return e.indexOf(i)}__clearFilter(){this.filter="",this.$.comboBox.clear()}__announceItem(i,e,t){const s=e?"selected":"deselected",n=this.i18n.total.replace("{count}",t||0);O(`${i} ${this.i18n[s]} ${n}`)}__removeItem(i){const e=[...this.selectedItems];e.splice(e.indexOf(i),1),this.__updateSelection(e);const t=this._getItemLabel(i);this.__announceItem(t,!1,e.length)}__selectItem(i){const e=[...this.selectedItems],t=this._findIndex(i,e,this.itemIdPath),s=this._getItemLabel(i);let n=!1;if(t!==-1){const l=this._lastFilter;if(l&&l.toLowerCase()===s.toLowerCase()){this.__clearFilter();return}e.splice(t,1)}else e.push(i),n=!0;this.__updateSelection(e),this.__clearFilter(),this.__announceItem(s,n,e.length)}__updateSelection(i){this.selectedItems=i,this.validate(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__updateTopGroup(i,e,t){i?t||(this._topGroup=[...e]):this._topGroup=[]}__createChip(i){const e=document.createElement("vaadin-multi-select-combo-box-chip");e.setAttribute("slot","chip"),e.item=i,e.disabled=this.disabled,e.readonly=this.readonly;const t=this._getItemLabel(i);return e.label=t,e.setAttribute("title",t),e.addEventListener("item-removed",s=>this._onItemRemoved(s)),e.addEventListener("mousedown",s=>this._preventBlur(s)),e}__getOverflowWidth(){const i=this._overflow;i.style.visibility="hidden",i.removeAttribute("hidden");const e=i.getAttribute("count");i.setAttribute("count","99");const t=getComputedStyle(i),s=i.clientWidth+parseInt(t.marginInlineStart);return i.setAttribute("count",e),i.setAttribute("hidden",""),i.style.visibility="",s}__updateChips(){if(!this._inputField||!this.inputElement)return;this._chips.forEach(l=>{l.remove()});const i=[...this.selectedItems],e=this._inputField.$.wrapper.clientWidth,t=parseInt(getComputedStyle(this.inputElement).flexBasis);let s=e-t;i.length>1&&(s-=this.__getOverflowWidth());const n=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width"));if(this.autoExpandHorizontally){const l=[];for(let g=i.length-1,b=null;g>=0;g--){const o=this.__createChip(i[g]);this.insertBefore(o,b),b=o,l.unshift(o)}const h=[],c=this._inputField.$.wrapper.clientWidth-this.$.chips.clientWidth;if(!this.autoExpandVertically&&c<t){for(;l.length>1;){l.pop().remove(),h.unshift(i.pop());const b=h.length>0?t+this.__getOverflowWidth():t;if(this._inputField.$.wrapper.clientWidth-this.$.chips.clientWidth>=b)break}l.length===1&&(l[0].style.maxWidth=`${Math.max(n,s)}px`)}this._overflowItems=h;return}for(let l=i.length-1,h=null;l>=0;l--){const c=this.__createChip(i[l]);if(this.insertBefore(c,h),!this.autoExpandVertically&&this.$.chips.clientWidth>s)if(h===null)c.style.maxWidth=`${Math.max(n,s)}px`;else{c.remove();break}i.pop(),h=c}this._overflowItems=i}__updateOverflowChip(i,e,t,s){if(i){const n=e.length;i.label=`${n}`,i.setAttribute("count",`${n}`),i.setAttribute("title",this._mergeItemLabels(e)),i.toggleAttribute("hidden",n===0),i.disabled=t,i.readonly=s}}_onClearButtonTouchend(i){i.preventDefault(),i.stopPropagation(),this.clear()}_onClearButtonClick(i){i.stopPropagation(),this.clear()}_onChange(i){i.stopPropagation()}_onEscape(i){this.clearButtonVisible&&this.selectedItems&&this.selectedItems.length&&(i.stopPropagation(),this.selectedItems=[])}_onKeyDown(i){super._onKeyDown(i);const e=this._chips;if(!this.readonly&&e.length>0)switch(i.key){case"Backspace":this._onBackSpace(e);break;case"ArrowLeft":this._onArrowLeft(e,i);break;case"ArrowRight":this._onArrowRight(e,i);break;default:this._focusedChipIndex=-1;break}}_onArrowLeft(i,e){if(this.inputElement.selectionStart!==0)return;const t=this._focusedChipIndex;t!==-1&&e.preventDefault();let s;this.__isRTL?t===i.length-1?s=-1:t>-1&&(s=t+1):t===-1?s=i.length-1:t>0&&(s=t-1),s!==void 0&&(this._focusedChipIndex=s)}_onArrowRight(i,e){if(this.inputElement.selectionStart!==0)return;const t=this._focusedChipIndex;t!==-1&&e.preventDefault();let s;this.__isRTL?t===-1?s=i.length-1:t>0&&(s=t-1):t===i.length-1?s=-1:t>-1&&(s=t+1),s!==void 0&&(this._focusedChipIndex=s)}_onBackSpace(i){if(this.inputElement.selectionStart!==0)return;const e=this._focusedChipIndex;e===-1?this._focusedChipIndex=i.length-1:(this.__removeItem(i[e].item),this._focusedChipIndex=-1)}_focusedChipIndexChanged(i,e){if(i>-1||e>-1){const t=this._chips;if(t.forEach((s,n)=>{s.toggleAttribute("focused",n===i)}),i>-1){const s=t[i].item,n=this._getItemLabel(s);O(`${n} ${this.i18n.focused}`)}}}_onComboBoxChange(){const i=this.$.comboBox.selectedItem;i&&this.__selectItem(i)}_onComboBoxItemSelected(i){this.__selectItem(i.detail.item)}_onCustomValueSet(i){i.preventDefault(),i.stopPropagation(),this.__clearFilter(),this.dispatchEvent(new CustomEvent("custom-value-set",{detail:i.detail,composed:!0,bubbles:!0}))}_onItemRemoved(i){this.__removeItem(i.detail.item)}_preventBlur(i){i.preventDefault()}__computeEffectiveItems(i,e,t){return i&&t?e:i}__computeEffectiveFilteredItems(i,e,t,s){return!i&&s?t:e}}v(Re);
