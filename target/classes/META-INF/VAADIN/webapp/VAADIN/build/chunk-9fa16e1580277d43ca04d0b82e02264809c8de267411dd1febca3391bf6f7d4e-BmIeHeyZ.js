import{w as u,A as h,p as n,x as m,P as a,y as g,z as b,r as y,D as f,C as _,S as v,T as A,K as x,B as C,F as I,E as w}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import"./chunk-7af66c5fdf5e35ae7f2216718f9cf5858a03989162599495423eb32a5f87d0e1-DPPsNdgP.js";import{a as r,r as s,d,T as l}from"./indexhtml-DPuqjys-.js";import"./chunk-bfe6b08e2a67901f655e1bf22e2ec43d80bf074d0577830faf9d1aafd22aaa27-B5J210Uc.js";import"./announce-BfzTNhcm.js";const E=r`
  :host {
    padding: 0;
  }

  [part='content'] {
    padding: var(--lumo-space-s) 0;
  }

  :host([theme~='filled']) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;s("vaadin-accordion-heading",[u,E],{moduleId:"lumo-accordion-heading"});/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const S=r`
  :host {
    display: block;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  :host([hidden]) {
    display: none !important;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: inherit;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: initial;
    color: inherit;
    border: initial;
    outline: none;
    font: inherit;
    text-align: inherit;
  }
`;/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */s("vaadin-accordion-heading",S,{moduleId:"vaadin-accordion-heading-styles"});class D extends h(m(l(a))){static get is(){return"vaadin-accordion-heading"}static get template(){return n`
      <button id="button" part="content" disabled$="[[disabled]]" aria-expanded$="[[__updateAriaExpanded(opened)]]">
        <span part="toggle" aria-hidden="true"></span>
        <slot></slot>
      </button>
    `}static get properties(){return{opened:{type:Boolean,reflectToAttribute:!0}}}_attachDom(t){const e=this.attachShadow({mode:"open",delegatesFocus:!0});return e.appendChild(t),e}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","heading")}__updateAriaExpanded(t){return t?"true":"false"}}d(D);const M=r`
  :host {
    margin: 0;
    border-bottom: solid 1px var(--lumo-contrast-10pct);
  }

  :host(:last-child) {
    border-bottom: none;
  }

  :host([theme~='filled']) {
    border-bottom: none;
  }

  :host([theme~='filled']:not(:last-child)) {
    margin-bottom: 2px;
  }
`;s("vaadin-accordion-panel",[g,M],{moduleId:"lumo-accordion-panel"});/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const T=r`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='content'] {
    display: none;
    overflow: hidden;
  }

  :host([opened]) [part='content'] {
    display: block;
    overflow: visible;
  }
`;/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */s("vaadin-accordion-panel",T,{moduleId:"vaadin-accordion-panel-styles"});class p extends b(y(f(l(_(a))))){static get is(){return"vaadin-accordion-panel"}static get template(){return n`
      <slot name="summary"></slot>

      <div part="content">
        <slot></slot>
      </div>

      <slot name="tooltip"></slot>
    `}static get properties(){return{summary:{type:String,observer:"_summaryChanged"}}}static get observers(){return["__updateAriaAttributes(focusElement, _contentElements)"]}static get delegateAttrs(){return["theme"]}static get delegateProps(){return["disabled","opened"]}constructor(){super(),this._summaryController=new v(this,"vaadin-accordion-heading"),this._summaryController.addEventListener("slot-content-changed",t=>{const{node:e}=t.target;this._setFocusElement(e),this.stateTarget=e,this._tooltipController.setTarget(e)}),this._tooltipController=new A(this),this._tooltipController.setPosition("bottom-start")}ready(){super.ready(),this.addController(this._summaryController),this.addController(this._tooltipController)}_setAriaDisabled(){}_summaryChanged(t){this._summaryController.setSummary(t)}__updateAriaAttributes(t,e){if(t&&e){const o=e[0];o&&(o.setAttribute("role","region"),o.setAttribute("aria-labelledby",t.id)),o&&o.id?t.setAttribute("aria-controls",o.id):t.removeAttribute("aria-controls")}}}d(p);/**
 * @license
 * Copyright (c) 2019 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class O extends x(l(w(a))){static get template(){return n`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <slot></slot>
    `}static get is(){return"vaadin-accordion"}static get properties(){return{opened:{type:Number,value:0,notify:!0,reflectToAttribute:!0},items:{type:Array,readOnly:!0,notify:!0}}}static get observers(){return["_updateItems(items, opened)"]}constructor(){super(),this._boundUpdateOpened=this._updateOpened.bind(this)}get focused(){return(this._getItems()||[]).find(t=>C(t.focusElement))}focus(){this._observer&&this._observer.flush(),super.focus()}ready(){super.ready();const t=this.shadowRoot.querySelector("slot");this._observer=new I(t,e=>{this._setItems(this._filterItems(Array.from(this.children))),this._filterItems(e.addedNodes).forEach(o=>{o.addEventListener("opened-changed",this._boundUpdateOpened)})})}_getItems(){return this.items}_filterItems(t){return t.filter(e=>e instanceof p)}_updateItems(t,e){if(t){const o=t[e];t.forEach(i=>{i.opened=i===o})}}_onKeyDown(t){this.items.some(e=>e.focusElement===t.target)&&super._onKeyDown(t)}_updateOpened(t){const e=this._filterItems(t.composedPath())[0],o=this.items.indexOf(e);if(t.detail.value){if(e.disabled||o===-1)return;this.opened=o}else this.items.some(i=>i.opened)||(this.opened=null)}}d(O);
