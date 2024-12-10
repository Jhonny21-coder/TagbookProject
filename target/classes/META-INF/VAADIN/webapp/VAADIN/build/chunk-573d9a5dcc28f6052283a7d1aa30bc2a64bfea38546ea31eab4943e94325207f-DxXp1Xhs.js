import{o as p,ab as u,V as g,ac as f,W as v,p as r,x as y,P as s,ad as C,$ as b,ae as n,af as x,ag as d,E as B,C as j}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import{r as c,a as h,d as l,T as E,b as m}from"./indexhtml-DPuqjys-.js";c("vaadin-confirm-dialog-overlay",[p,u,h`
      [part='header'] ::slotted(h3) {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-inline-start: calc(var(--lumo-space-l) - var(--lumo-space-m));
      }

      [part='message'] {
        width: 25em;
        min-width: 100%;
        max-width: 100%;
      }

      ::slotted([slot$='button'][theme~='tertiary']) {
        padding-left: var(--lumo-space-s);
        padding-right: var(--lumo-space-s);
      }

      [part='cancel-button'] {
        flex-grow: 1;
      }

      @media (max-width: 360px) {
        [part='footer'] {
          flex-direction: column-reverse;
          align-items: stretch;
          padding: var(--lumo-space-s) var(--lumo-space-l);
          gap: var(--lumo-space-s);
        }

        ::slotted([slot$='button']) {
          width: 100%;
          margin: 0;
        }
      }
    `],{moduleId:"lumo-confirm-dialog-overlay"});/**
 * @license
 * Copyright (c) 2018 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const w=a=>class extends a{static get properties(){return{ariaLabel:{type:String,value:""},contentHeight:{type:String},contentWidth:{type:String}}}static get observers(){return["__updateContentHeight(contentHeight, _overlayElement)","__updateContentWidth(contentWidth, _overlayElement)"]}__updateDimension(e,t,i){const o=`--_vaadin-confirm-dialog-content-${t}`;i?e.style.setProperty(o,i):e.style.removeProperty(o)}__updateContentHeight(e,t){t&&this.__updateDimension(t,"height",e)}__updateContentWidth(e,t){t&&this.__updateDimension(t,"width",e)}};/**
 * @license
 * Copyright (c) 2018 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const D=h`
  :host {
    --_vaadin-confirm-dialog-content-width: auto;
    --_vaadin-confirm-dialog-content-height: auto;
  }

  [part='overlay'] {
    width: var(--_vaadin-confirm-dialog-content-width);
    height: var(--_vaadin-confirm-dialog-content-height);
  }

  ::slotted([slot='header']) {
    pointer-events: auto;
  }

  /* Make buttons clickable */
  [part='footer'] > * {
    pointer-events: all;
  }
`;/**
 * @license
 * Copyright (c) 2018 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */c("vaadin-confirm-dialog-overlay",[g,f,D],{moduleId:"vaadin-confirm-dialog-overlay-styles"});class S extends v(y(E(s))){static get is(){return"vaadin-confirm-dialog-overlay"}static get template(){return r`
      <div part="backdrop" id="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <section id="resizerContainer" class="resizer-container">
          <header part="header"><slot name="header"></slot></header>
          <div part="content" id="content">
            <div part="message"><slot></slot></div>
          </div>
          <footer part="footer" role="toolbar">
            <div part="cancel-button">
              <slot name="cancel-button"></slot>
            </div>
            <div part="reject-button">
              <slot name="reject-button"></slot>
            </div>
            <div part="confirm-button">
              <slot name="confirm-button"></slot>
            </div>
          </footer>
        </section>
      </div>
    `}ready(){super.ready(),this.setAttribute("has-header",""),this.setAttribute("has-footer","")}}l(S);class N extends w(C(b(m(s)))){static get is(){return"vaadin-confirm-dialog-dialog"}static get template(){return r`
      <style>
        :host {
          display: none;
        }
      </style>

      <vaadin-confirm-dialog-overlay
        id="overlay"
        opened="[[opened]]"
        on-opened-changed="_onOverlayOpened"
        on-mousedown="_bringOverlayToFront"
        on-touchstart="_bringOverlayToFront"
        theme$="[[_theme]]"
        modeless="[[modeless]]"
        with-backdrop="[[!modeless]]"
        resizable$="[[resizable]]"
        aria-label$="[[ariaLabel]]"
        restore-focus-on-close
        focus-trap
      ></vaadin-confirm-dialog-overlay>
    `}}l(N);/**
 * @license
 * Copyright (c) 2018 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const O=a=>class extends a{static get properties(){return{accessibleDescriptionRef:{type:String},opened:{type:Boolean,value:!1,notify:!0},header:{type:String,value:""},message:{type:String,value:""},confirmText:{type:String,value:"Confirm"},confirmTheme:{type:String,value:"primary"},noCloseOnEsc:{type:Boolean,value:!1},rejectButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},rejectText:{type:String,value:"Reject"},rejectTheme:{type:String,value:"error tertiary"},cancelButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},cancelText:{type:String,value:"Cancel"},cancelTheme:{type:String,value:"tertiary"},overlayClass:{type:String},_cancelButton:{type:Object},_confirmButton:{type:Object},_headerNode:{type:Object},_messageNodes:{type:Array,value:()=>[]},_overlayElement:{type:Object,sync:!0},_rejectButton:{type:Object},_contentHeight:{type:String},_contentWidth:{type:String}}}static get observers(){return["__updateConfirmButton(_confirmButton, confirmText, confirmTheme)","__updateCancelButton(_cancelButton, cancelText, cancelTheme, cancelButtonVisible)","__updateHeaderNode(_headerNode, header)","__updateMessageNodes(_messageNodes, message)","__updateRejectButton(_rejectButton, rejectText, rejectTheme, rejectButtonVisible)","__accessibleDescriptionRefChanged(_overlayElement, _messageNodes, accessibleDescriptionRef)"]}constructor(){super(),this.__cancel=this.__cancel.bind(this),this.__confirm=this.__confirm.bind(this),this.__reject=this.__reject.bind(this)}get __slottedNodes(){return[this._headerNode,...this._messageNodes,this._cancelButton,this._confirmButton,this._rejectButton]}ready(){super.ready(),this._headerController=new n(this,"header","h3",{initializer:e=>{this._headerNode=e}}),this.addController(this._headerController),this._messageController=new n(this,"","div",{multiple:!0,observe:!1,initializer:e=>{const t=document.createElement("div");t.style.display="contents";const i=`confirm-dialog-message-${x()}`;t.id=i,this.appendChild(t),t.appendChild(e),this._messageNodes=[...this._messageNodes,t]}}),this.addController(this._messageController),this._cancelController=new n(this,"cancel-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("cancel",e)}}),this.addController(this._cancelController),this._rejectController=new n(this,"reject-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("reject",e)}}),this.addController(this._rejectController),this._confirmController=new n(this,"confirm-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("confirm",e)}}),this.addController(this._confirmController)}_initOverlay(e){e.addEventListener("vaadin-overlay-escape-press",this._escPressed.bind(this)),e.addEventListener("vaadin-overlay-open",()=>this.__onDialogOpened()),e.addEventListener("vaadin-overlay-closed",()=>this.__onDialogClosed()),e.setAttribute("role","alertdialog")}__onDialogOpened(){const e=this._overlayElement;this.__slottedNodes.forEach(i=>{e.appendChild(i)});const t=e.querySelector('[slot="confirm-button"]');t&&t.focus()}__onDialogClosed(){this.__slottedNodes.forEach(e=>{this.appendChild(e)})}__accessibleDescriptionRefChanged(e,t,i){!e||!t||(i!==void 0?d(e,"aria-describedby",{newId:i,oldId:this.__oldAccessibleDescriptionRef,fromUser:!0}):t.forEach(o=>{d(e,"aria-describedby",{newId:o.id})}),this.__oldAccessibleDescriptionRef=i)}__setupSlottedButton(e,t){const i=`_${e}Button`,o=`__${e}`;this[i]&&this[i]!==t&&this[i].remove(),t.addEventListener("click",this[o]),this[i]=t}__updateCancelButton(e,t,i,o){e&&(e===this._cancelController.defaultNode&&(e.textContent=t,e.setAttribute("theme",i)),e.toggleAttribute("hidden",!o))}__updateConfirmButton(e,t,i){e&&e===this._confirmController.defaultNode&&(e.textContent=t,e.setAttribute("theme",i))}__updateHeaderNode(e,t){e&&e===this._headerController.defaultNode&&(e.textContent=t)}__updateMessageNodes(e,t){if(e&&e.length>0){const i=e.find(o=>this._messageController.defaultNode&&o===this._messageController.defaultNode.parentElement);i&&(i.firstChild.textContent=t)}}__updateRejectButton(e,t,i,o){e&&(e===this._rejectController.defaultNode&&(e.textContent=t,e.setAttribute("theme",i)),e.toggleAttribute("hidden",!o))}_escPressed(e){e.defaultPrevented||this.__cancel()}__confirm(){this.dispatchEvent(new CustomEvent("confirm")),this.opened=!1}__cancel(){this.dispatchEvent(new CustomEvent("cancel")),this.opened=!1}__reject(){this.dispatchEvent(new CustomEvent("reject")),this.opened=!1}_getAriaLabel(e){return e||"confirmation"}};/**
 * @license
 * Copyright (c) 2018 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class T extends O(B(m(j(s)))){static get template(){return r`
      <style>
        :host,
        [hidden] {
          display: none !important;
        }
      </style>

      <vaadin-confirm-dialog-dialog
        id="dialog"
        opened="{{opened}}"
        overlay-class="[[overlayClass]]"
        aria-label="[[_getAriaLabel(header)]]"
        theme$="[[_theme]]"
        no-close-on-outside-click
        no-close-on-esc="[[noCloseOnEsc]]"
        content-height="[[_contentHeight]]"
        content-width="[[_contentWidth]]"
      ></vaadin-confirm-dialog-dialog>

      <div hidden>
        <slot name="header"></slot>
        <slot></slot>
        <slot name="cancel-button"></slot>
        <slot name="reject-button"></slot>
        <slot name="confirm-button"></slot>
      </div>
    `}static get is(){return"vaadin-confirm-dialog"}ready(){super.ready(),this._overlayElement=this.$.dialog.$.overlay,this._initOverlay(this._overlayElement)}}l(T);
