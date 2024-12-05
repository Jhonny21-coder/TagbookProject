import{C as u,O as h,s as _,E as m,p,P as f,u as v,v as C}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import{a as g,r as I,T as y,d as x}from"./indexhtml-DPuqjys-.js";import{V as R}from"./virtualizer-lFF5HpzV.js";/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const $=e=>class extends u(e){static get properties(){return{items:{type:Array,sync:!0},renderer:{type:Function,sync:!0},__virtualizer:Object}}static get observers(){return["__itemsOrRendererChanged(items, renderer, __virtualizer)"]}get firstVisibleIndex(){return this.__virtualizer.firstVisibleIndex}get lastVisibleIndex(){return this.__virtualizer.lastVisibleIndex}ready(){super.ready(),this.__virtualizer=new R({createElements:this.__createElements,updateElement:this.__updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.shadowRoot.querySelector("#items")}),this.__overflowController=new h(this),this.addController(this.__overflowController),_(this)}scrollToIndex(i){this.__virtualizer.scrollToIndex(i)}__createElements(i){return[...Array(i)].map(()=>document.createElement("div"))}__updateElement(i,o){i.__renderer!==this.renderer&&(i.__renderer=this.renderer,this.__clearRenderTargetContent(i)),this.renderer&&this.renderer(i,this,{item:this.items[o],index:o})}__clearRenderTargetContent(i){i.innerHTML="",delete i._$litPart$}__itemsOrRendererChanged(i,o,d){const r=this.childElementCount>0;(o||r)&&d&&(d.size=(i||[]).length,d.update())}requestContentUpdate(){this.__virtualizer&&this.__virtualizer.update()}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const L=g`
  :host {
    display: block;
    height: 400px;
    overflow: auto;
    flex: auto;
    align-self: stretch;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([grid])) #items > ::slotted(*) {
    width: 100%;
  }

  #items {
    position: relative;
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */I("vaadin-virtual-list",L,{moduleId:"vaadin-virtual-list-styles"});class b extends m(y($(f))){static get template(){return p`
      <div id="items">
        <slot></slot>
      </div>
    `}static get is(){return"vaadin-virtual-list"}}x(b);window.Vaadin.Flow.virtualListConnector={initLazy:function(e){if(e.$connector)return;const l=20;let i=[0,0];e.$connector={},e.$connector.placeholderItem={__placeholder:!0};const o=function(){const r=[...e.children].filter(c=>"__virtualListIndex"in c).map(c=>c.__virtualListIndex),n=Math.min(...r),t=Math.max(...r);let a=Math.max(0,n-l),s=Math.min(t+l,e.items.length);if(i[0]!=a||i[1]!=s){i=[a,s];const c=1+s-a;e.$server.setRequestedRange(a,c)}},d=function(){e.__requestDebounce=v.debounce(e.__requestDebounce,C.after(50),o)};requestAnimationFrame(()=>o),e.patchVirtualListRenderer=function(){if(!e.renderer||e.renderer.__virtualListConnectorPatched)return;const r=e.renderer,n=(t,a,s)=>{t.__virtualListIndex=s.index,s.item===void 0?a.$connector.placeholderElement?t.__hasComponentRendererPlaceholder||(t.innerHTML="",delete t._$litPart$,t.appendChild(a.$connector.placeholderElement.cloneNode(!0)),t.__hasComponentRendererPlaceholder=!0):r.call(a,t,a,{...s,item:a.$connector.placeholderItem}):(t.__hasComponentRendererPlaceholder&&(t.innerHTML="",t.__hasComponentRendererPlaceholder=!1),r.call(a,t,a,s)),d()};n.__virtualListConnectorPatched=!0,n.__rendererId=r.__rendererId,e.renderer=n},e._createPropertyObserver("renderer","patchVirtualListRenderer",!0),e.patchVirtualListRenderer(),e.items=[],e.$connector.set=function(r,n){e.items.splice(r,n.length,...n),e.items=[...e.items]},e.$connector.clear=function(r,n){const t=Math.min(n,e.items.length-r);e.$connector.set(r,[...Array(t)])},e.$connector.updateData=function(r){const n=r.reduce((t,a)=>(t[a.key]=a,t),{});e.items=e.items.map(t=>t&&(n[t.key]||t))},e.$connector.updateSize=function(r){const n=r-e.items.length;n>0?e.items=[...e.items,...Array(n)]:n<0&&(e.items=e.items.slice(0,r))},e.$connector.setPlaceholderItem=function(r={},n){r.__placeholder=!0,e.$connector.placeholderItem=r;const t=Object.entries(r).find(([a])=>a.endsWith("_nodeid"));e.$connector.placeholderElement=t?Vaadin.Flow.clients[n].getByNodeId(t[1]):null}}};
