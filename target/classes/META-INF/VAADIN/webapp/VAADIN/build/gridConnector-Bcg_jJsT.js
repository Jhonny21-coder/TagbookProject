var Ke=Object.defineProperty;var Qe=(a,r,e)=>r in a?Ke(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var R=(a,r,e)=>(Qe(a,typeof r!="symbol"?r+"":r,e),e);import{a0 as De,a1 as $e,b as F,m as U,s as Oe,c as oe,x as ke,P as ae,Z as pe,X as Le,t as J,a2 as Ze,a3 as Xe,a4 as re,a5 as xe,a6 as Je,g as et,N as we,a7 as tt,a8 as Ie,J as it,T as rt,a9 as nt,E as st,C as ot,p as Me,u as ie,aa as Ee,v as Se}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";import{d as le,r as de,a as ce,T as Ne}from"./indexhtml-DPuqjys-.js";import"./vaadin-checkbox-CNDB4VA5.js";import{g as ge}from"./path-utils-Duu_04h-.js";import{V as at}from"./virtualizer-lFF5HpzV.js";import"./announce-BfzTNhcm.js";/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function q(a){return a.__cells||Array.from(a.querySelectorAll('[part~="cell"]:not([part~="details-cell"])'))}function P(a,r){[...a.children].forEach(r)}function j(a,r){q(a).forEach(r),a.__detailsCell&&r(a.__detailsCell)}function Be(a,r,e){let t=1;a.forEach(i=>{t%10===0&&(t+=1),i._order=e+t*r,t+=1})}function he(a,r,e){switch(typeof e){case"boolean":a.toggleAttribute(r,e);break;case"string":a.setAttribute(r,e);break;default:a.removeAttribute(r);break}}function H(a,r,e){r||r===""?De(a,"part",e):$e(a,"part",e)}function N(a,r,e){a.forEach(t=>{H(t,e,r)})}function X(a,r){const e=q(a);Object.entries(r).forEach(([t,i])=>{he(a,t,i);const n=`${t}-row`;H(a,i,n),N(e,`${n}-cell`,i)})}function ze(a,r){const e=q(a);Object.entries(r).forEach(([t,i])=>{const n=a.getAttribute(t);if(he(a,t,i),n){const s=`${t}-${n}-row`;H(a,!1,s),N(e,`${s}-cell`,!1)}if(i){const s=`${t}-${i}-row`;H(a,i,s),N(e,`${s}-cell`,i)}})}function G(a,r,e,t,i){he(a,r,e),i&&H(a,!1,i),H(a,e,t||`${r}-cell`)}class B{constructor(r,e){this.__host=r,this.__callback=e,this.__currentSlots=[],this.__onMutation=this.__onMutation.bind(this),this.__observer=new MutationObserver(this.__onMutation),this.__observer.observe(r,{childList:!0}),this.__initialCallDebouncer=F.debounce(this.__initialCallDebouncer,U,()=>this.__onMutation())}disconnect(){this.__observer.disconnect(),this.__initialCallDebouncer.cancel(),this.__toggleSlotChangeListeners(!1)}flush(){this.__onMutation()}__toggleSlotChangeListeners(r){this.__currentSlots.forEach(e=>{r?e.addEventListener("slotchange",this.__onMutation):e.removeEventListener("slotchange",this.__onMutation)})}__onMutation(){const r=!this.__currentColumns;this.__currentColumns||(this.__currentColumns=[]);const e=B.getColumns(this.__host),t=e.filter(c=>!this.__currentColumns.includes(c)),i=this.__currentColumns.filter(c=>!e.includes(c)),n=this.__currentColumns.some((c,u)=>c!==e[u]);this.__currentColumns=e,this.__toggleSlotChangeListeners(!1),this.__currentSlots=[...this.__host.children].filter(c=>c instanceof HTMLSlotElement),this.__toggleSlotChangeListeners(!0),(r||t.length||i.length||n)&&this.__callback(t,i)}static __isColumnElement(r){return r.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(r.localName)}static getColumns(r){const e=[],t=r._isColumnElement||B.__isColumnElement;return[...r.children].forEach(i=>{t(i)?e.push(i):i instanceof HTMLSlotElement&&[...i.assignedElements({flatten:!0})].filter(n=>t(n)).forEach(n=>e.push(n))}),e}}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const He=a=>class extends a{static get properties(){return{resizable:{type:Boolean,sync:!0,value(){if(this.localName==="vaadin-grid-column-group")return;const e=this.parentNode;return e&&e.localName==="vaadin-grid-column-group"&&e.resizable||!1}},frozen:{type:Boolean,value:!1,sync:!0},frozenToEnd:{type:Boolean,value:!1,sync:!0},rowHeader:{type:Boolean,value:!1,sync:!0},hidden:{type:Boolean,value:!1,sync:!0},header:{type:String,sync:!0},textAlign:{type:String,sync:!0},headerPartName:{type:String,sync:!0},footerPartName:{type:String,sync:!0},_lastFrozen:{type:Boolean,value:!1,sync:!0},_bodyContentHidden:{type:Boolean,value:!1,sync:!0},_firstFrozenToEnd:{type:Boolean,value:!1,sync:!0},_order:{type:Number,sync:!0},_reorderStatus:{type:Boolean,sync:!0},_emptyCells:Array,_headerCell:Object,_footerCell:Object,_grid:Object,__initialized:{type:Boolean,value:!0},headerRenderer:{type:Function,sync:!0},_headerRenderer:{type:Function,computed:"_computeHeaderRenderer(headerRenderer, header, __initialized)",sync:!0},footerRenderer:{type:Function,sync:!0},_footerRenderer:{type:Function,computed:"_computeFooterRenderer(footerRenderer, __initialized)",sync:!0},__gridColumnElement:{type:Boolean,value:!0}}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells)","_frozenChanged(frozen, _headerCell, _footerCell, _cells)","_frozenToEndChanged(frozenToEnd, _headerCell, _footerCell, _cells)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells)","_textAlignChanged(textAlign, _cells, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells)","_lastFrozenChanged(_lastFrozen)","_firstFrozenToEndChanged(_firstFrozenToEnd)","_onRendererOrBindingChanged(_renderer, _cells, _bodyContentHidden, path)","_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header)","_onFooterRendererOrBindingChanged(_footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells)","_rowHeaderChanged(rowHeader, _cells)","__headerFooterPartNameChanged(_headerCell, _footerCell, headerPartName, footerPartName)"]}get _grid(){return this._gridValue||(this._gridValue=this._findHostGrid()),this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter(e=>e)}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this._grid&&this._allCells.forEach(e=>{e._content.parentNode||this._grid.appendChild(e._content)})})}disconnectedCallback(){super.disconnectedCallback(),requestAnimationFrame(()=>{this._grid||this._allCells.forEach(e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)})}),this._gridValue=void 0}ready(){super.ready(),Oe(this)}_findHostGrid(){let e=this;for(;e&&!/^vaadin.*grid(-pro)?$/u.test(e.localName);)e=e.assignedSlot?e.assignedSlot.parentNode:e.parentNode;return e||void 0}_renderHeaderAndFooter(){this._renderHeaderCellContent(this._headerRenderer,this._headerCell),this._renderFooterCellContent(this._footerRenderer,this._footerCell)}_flexGrowChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("flexGrow"),this._allCells.forEach(t=>{t.style.flexGrow=e})}_orderChanged(e){this._allCells.forEach(t=>{t.style.order=e})}_widthChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("width"),this._allCells.forEach(t=>{t.style.width=e})}_frozenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozen",e),this._allCells.forEach(t=>{G(t,"frozen",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_frozenToEndChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozenToEnd",e),this._allCells.forEach(t=>{this._grid&&t.parentElement===this._grid.$.sizer||G(t,"frozen-to-end",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(e){this._allCells.forEach(t=>{G(t,"last-frozen",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._lastFrozen=e)}_firstFrozenToEndChanged(e){this._allCells.forEach(t=>{this._grid&&t.parentElement===this._grid.$.sizer||G(t,"first-frozen-to-end",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._firstFrozenToEnd=e)}_rowHeaderChanged(e,t){t&&t.forEach(i=>{i.setAttribute("role",e?"rowheader":"gridcell")})}_generateHeader(e){return e.substr(e.lastIndexOf(".")+1).replace(/([A-Z])/gu,"-$1").toLowerCase().replace(/-/gu," ").replace(/^./u,t=>t.toUpperCase())}_reorderStatusChanged(e){const t=this.__previousReorderStatus,i=t?`reorder-${t}-cell`:"",n=`reorder-${e}-cell`;this._allCells.forEach(s=>{G(s,"reorder-status",e,n,i)}),this.__previousReorderStatus=e}_resizableChanged(e,t){e===void 0||t===void 0||t&&[t].concat(this._emptyCells).forEach(i=>{if(i){const n=i.querySelector('[part~="resize-handle"]');if(n&&i.removeChild(n),e){const s=document.createElement("div");s.setAttribute("part","resize-handle"),i.appendChild(s)}}})}_textAlignChanged(e){if(e===void 0||this._grid===void 0)return;if(["start","end","center"].indexOf(e)===-1){console.warn('textAlign can only be set as "start", "end" or "center"');return}let t;getComputedStyle(this._grid).direction==="ltr"?e==="start"?t="left":e==="end"&&(t="right"):e==="start"?t="right":e==="end"&&(t="left"),this._allCells.forEach(i=>{i._content.style.textAlign=e,getComputedStyle(i._content).textAlign!==e&&(i._content.style.textAlign=t)})}_hiddenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("hidden",e),!!e!=!!this._previousHidden&&this._grid&&(e===!0&&this._allCells.forEach(t=>{t._content.parentNode&&t._content.parentNode.removeChild(t._content)}),this._grid._debouncerHiddenChanged=F.debounce(this._grid._debouncerHiddenChanged,oe,()=>{this._grid&&this._grid._renderColumnTree&&this._grid._renderColumnTree(this._grid._columnTree)}),this._grid._debounceUpdateFrozenColumn&&this._grid._debounceUpdateFrozenColumn(),this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()),this._previousHidden=e}_runRenderer(e,t,i){const n=i&&i.item&&!t.parentElement.hidden;if(!(n||e===this._headerRenderer||e===this._footerRenderer))return;const c=[t._content,this];n&&c.push(i),e.apply(this,c)}__renderCellsContent(e,t){this.hidden||!this._grid||t.forEach(i=>{if(!i.parentElement)return;const n=this._grid.__getRowModel(i.parentElement);e&&(i._renderer!==e&&this._clearCellContent(i),i._renderer=e,this._runRenderer(e,i,n))})}_clearCellContent(e){e._content.innerHTML="",delete e._content._$litPart$}_renderHeaderCellContent(e,t){!t||!e||(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onHeaderRendererOrBindingChanged(e,t,...i){this._renderHeaderCellContent(e,t)}__headerFooterPartNameChanged(e,t,i,n){[{cell:e,partName:i},{cell:t,partName:n}].forEach(({cell:s,partName:c})=>{if(s){const u=s.__customParts||[];s.part.remove(...u),s.__customParts=c?c.trim().split(" "):[],s.part.add(...s.__customParts)}})}_renderBodyCellsContent(e,t){!t||!e||this.__renderCellsContent(e,t)}_onRendererOrBindingChanged(e,t,...i){this._renderBodyCellsContent(e,t)}_renderFooterCellContent(e,t){!t||!e||(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onFooterRendererOrBindingChanged(e,t){this._renderFooterCellContent(e,t)}__setTextContent(e,t){e.textContent!==t&&(e.textContent=t)}__textHeaderRenderer(){this.__setTextContent(this._headerCell._content,this.header)}_defaultHeaderRenderer(){this.path&&this.__setTextContent(this._headerCell._content,this._generateHeader(this.path))}_defaultRenderer(e,t,{item:i}){this.path&&this.__setTextContent(e,ge(this.path,i))}_defaultFooterRenderer(){}_computeHeaderRenderer(e,t){return e||(t!=null?this.__textHeaderRenderer:this._defaultHeaderRenderer)}_computeRenderer(e){return e||this._defaultRenderer}_computeFooterRenderer(e){return e||this._defaultFooterRenderer}},lt=a=>class extends He(ke(a)){static get properties(){return{width:{type:String,value:"100px",sync:!0},flexGrow:{type:Number,value:1,sync:!0},renderer:{type:Function,sync:!0},_renderer:{type:Function,computed:"_computeRenderer(renderer, __initialized)",sync:!0},path:{type:String,sync:!0},autoWidth:{type:Boolean,value:!1},_focusButtonMode:{type:Boolean,value:!1},_cells:{type:Array,sync:!0}}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dt=a=>class extends He(a){static get properties(){return{_childColumns:{value(){return this._getChildColumns(this)}},flexGrow:{type:Number,readOnly:!0,sync:!0},width:{type:String,readOnly:!0},_visibleChildColumns:Array,_colSpan:Number,_rootColumns:Array}}static get observers(){return["_groupFrozenChanged(frozen, _rootColumns)","_groupFrozenToEndChanged(frozenToEnd, _rootColumns)","_groupHiddenChanged(hidden)","_colSpanChanged(_colSpan, _headerCell, _footerCell)","_groupOrderChanged(_order, _rootColumns)","_groupReorderStatusChanged(_reorderStatus, _rootColumns)","_groupResizableChanged(resizable, _rootColumns)"]}connectedCallback(){super.connectedCallback(),this._addNodeObserver(),this._updateFlexAndWidth()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_columnPropChanged(r,e){r==="hidden"&&(this._preventHiddenSynchronization=!0,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1),/flexGrow|width|hidden|_childColumns/u.test(r)&&this._updateFlexAndWidth(),r==="frozen"&&!this.frozen&&(this.frozen=e),r==="lastFrozen"&&!this._lastFrozen&&(this._lastFrozen=e),r==="frozenToEnd"&&!this.frozenToEnd&&(this.frozenToEnd=e),r==="firstFrozenToEnd"&&!this._firstFrozenToEnd&&(this._firstFrozenToEnd=e)}_groupOrderChanged(r,e){if(e){const t=e.slice(0);if(!r){t.forEach(c=>{c._order=0});return}const i=/(0+)$/u.exec(r).pop().length,n=~~(Math.log(e.length)/Math.LN10)+1,s=10**(i-n);t[0]&&t[0]._order&&t.sort((c,u)=>c._order-u._order),Be(t,s,r)}}_groupReorderStatusChanged(r,e){r===void 0||e===void 0||e.forEach(t=>{t._reorderStatus=r})}_groupResizableChanged(r,e){r===void 0||e===void 0||e.forEach(t=>{t.resizable=r})}_updateVisibleChildColumns(r){this._visibleChildColumns=Array.prototype.filter.call(r,e=>!e.hidden),this._colSpan=this._visibleChildColumns.length,this._updateAutoHidden()}_updateFlexAndWidth(){if(this._visibleChildColumns){if(this._visibleChildColumns.length>0){const r=this._visibleChildColumns.reduce((e,t)=>(e+=` + ${(t.width||"0px").replace("calc","")}`,e),"").substring(3);this._setWidth(`calc(${r})`)}else this._setWidth("0px");this._setFlexGrow(Array.prototype.reduce.call(this._visibleChildColumns,(r,e)=>r+e.flexGrow,0))}}__scheduleAutoFreezeWarning(r,e){if(this._grid){const t=e.replace(/([A-Z])/gu,"-$1").toLowerCase(),i=r[0][e]||r[0].hasAttribute(t);r.every(s=>(s[e]||s.hasAttribute(t))===i)||(this._grid.__autoFreezeWarningDebouncer=F.debounce(this._grid.__autoFreezeWarningDebouncer,oe,()=>{console.warn(`WARNING: Joining ${e} and non-${e} Grid columns inside the same column group! This will automatically freeze all the joined columns to avoid rendering issues. If this was intentional, consider marking each joined column explicitly as ${e}. Otherwise, exclude the ${e} columns from the joined group.`)}))}}_groupFrozenChanged(r,e){e===void 0||r===void 0||r!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozen"),Array.from(e).forEach(t=>{t.frozen=r}))}_groupFrozenToEndChanged(r,e){e===void 0||r===void 0||r!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozenToEnd"),Array.from(e).forEach(t=>{t.frozenToEnd=r}))}_groupHiddenChanged(r){(r||this.__groupHiddenInitialized)&&this._synchronizeHidden(),this.__groupHiddenInitialized=!0}_updateAutoHidden(){const r=this._autoHidden;this._autoHidden=(this._visibleChildColumns||[]).length===0,(r||this._autoHidden)&&(this.hidden=this._autoHidden)}_synchronizeHidden(){this._childColumns&&!this._preventHiddenSynchronization&&this._childColumns.forEach(r=>{r.hidden=this.hidden})}_colSpanChanged(r,e,t){e&&(e.setAttribute("colspan",r),this._grid&&this._grid._a11yUpdateCellColspan(e,r)),t&&(t.setAttribute("colspan",r),this._grid&&this._grid._a11yUpdateCellColspan(t,r))}_getChildColumns(r){return B.getColumns(r)}_addNodeObserver(){this._observer=new B(this,()=>{this._preventHiddenSynchronization=!0,this._rootColumns=this._getChildColumns(this),this._childColumns=this._rootColumns,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1,this._grid&&this._grid._debounceUpdateColumnTree&&this._grid._debounceUpdateColumnTree()}),this._observer.flush()}_isColumnElement(r){return r.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(r.localName)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ct extends dt(ae){static get is(){return"vaadin-grid-column-group"}}le(ct);de("vaadin-grid",ce`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      line-height: var(--lumo-line-height-s);
      color: var(--lumo-body-text-color);
      background-color: var(--lumo-base-color);
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      /* For internal use only */
      --_lumo-grid-border-color: var(--lumo-contrast-20pct);
      --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
      --_lumo-grid-border-width: 1px;
      --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
    }

    /* No (outer) border */

    :host(:not([theme~='no-border'])) {
      border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    /* Cell styles */

    [part~='cell'] {
      min-height: var(--lumo-size-m);
      background-color: var(--vaadin-grid-cell-background, var(--lumo-base-color));
      cursor: default;
      --_cell-padding: var(--vaadin-grid-cell-padding, var(--_cell-default-padding));
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-m);
    }

    [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      cursor: inherit;
      padding: var(--_cell-padding);
    }

    /* Apply row borders by default and introduce the "no-row-borders" variant */
    :host(:not([theme~='no-row-borders'])) [part~='cell']:not([part~='details-cell']) {
      border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Hide first body row top border */
    :host(:not([theme~='no-row-borders'])) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      border-top: 0;
      min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
    }

    /* Focus-ring */

    [part~='row'] {
      position: relative;
    }

    [part~='row']:focus,
    [part~='focused-cell']:focus {
      outline: none;
    }

    :host([navigating]) [part~='row']:focus::before,
    :host([navigating]) [part~='focused-cell']:focus::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    :host([navigating]) [part~='row']:focus::before {
      transform: translateX(calc(-1 * var(--_grid-horizontal-scroll-position)));
      z-index: 3;
    }

    /* Drag and Drop styles */
    :host([dragover])::after {
      content: '';
      position: absolute;
      z-index: 100;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    [part~='row'][dragover] {
      z-index: 100 !important;
    }

    [part~='row'][dragover] [part~='cell'] {
      overflow: visible;
    }

    [part~='row'][dragover] [part~='cell']::after {
      content: '';
      position: absolute;
      inset: 0;
      height: calc(var(--_lumo-grid-border-width) + 2px);
      pointer-events: none;
      background: var(--lumo-primary-color-50pct);
    }

    [part~='row'][dragover] [part~='cell'][last-frozen]::after {
      right: -1px;
    }

    :host([theme~='no-row-borders']) [dragover] [part~='cell']::after {
      height: 2px;
    }

    [part~='row'][dragover='below'] [part~='cell']::after {
      top: 100%;
      bottom: auto;
      margin-top: -1px;
    }

    :host([all-rows-visible]) [part~='last-row'][dragover='below'] [part~='cell']::after {
      height: 1px;
    }

    [part~='row'][dragover='above'] [part~='cell']::after {
      top: auto;
      bottom: 100%;
      margin-bottom: -1px;
    }

    [part~='row'][details-opened][dragover='below'] [part~='cell']:not([part~='details-cell'])::after,
    [part~='row'][details-opened][dragover='above'] [part~='details-cell']::after {
      display: none;
    }

    [part~='row'][dragover][dragover='on-top'] [part~='cell']::after {
      height: 100%;
      opacity: 0.5;
    }

    [part~='row'][dragstart] [part~='cell'] {
      border: none !important;
      box-shadow: none !important;
    }

    [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    #scroller [part~='row'][dragstart]:not([dragstart=''])::after {
      display: block;
      position: absolute;
      left: var(--_grid-drag-start-x);
      top: var(--_grid-drag-start-y);
      z-index: 100;
      content: attr(dragstart);
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: calc(var(--lumo-space-xs) * 0.8);
      color: var(--lumo-error-contrast-color);
      background-color: var(--lumo-error-color);
      border-radius: var(--lumo-border-radius-m);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      font-weight: 500;
      text-transform: initial;
      letter-spacing: initial;
      min-width: calc(var(--lumo-size-s) * 0.7);
      text-align: center;
    }

    /* Headers and footers */

    [part~='header-cell'],
    [part~='footer-cell'],
    [part~='reorder-ghost'] {
      font-size: var(--lumo-font-size-s);
      font-weight: 500;
    }

    [part~='footer-cell'] {
      font-weight: 400;
    }

    [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-xl);
    }

    /* Header borders */

    /* Hide first header row top border */
    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='header-cell'] {
      border-top: 0;
    }

    /* Hide header row top border if previous row is hidden */
    [part~='row'][hidden] + [part~='row'] [part~='header-cell'] {
      border-top: 0;
    }

    [part~='row']:last-child [part~='header-cell'] {
      border-bottom: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='top']) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-border-color);
    }

    /* Footer borders */

    [part~='row']:first-child [part~='footer-cell'] {
      border-top: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='bottom']) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-border-color);
    }

    /* Column reordering */

    :host([reordering]) [part~='cell'] {
      background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='allowed'] {
      background: var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='dragging'] {
      background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
    }

    [part~='reorder-ghost'] {
      opacity: 0.85;
      box-shadow: var(--lumo-box-shadow-s);
      /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
      padding: var(--lumo-space-s) var(--lumo-space-m) !important;
    }

    /* Column resizing */

    [part='resize-handle'] {
      width: 3px;
      background-color: var(--lumo-primary-color-50pct);
      opacity: 0;
      transition: opacity 0.2s;
    }

    :host(:not([reordering])) *:not([column-resizing]) [part~='cell']:hover [part='resize-handle'],
    [part='resize-handle']:active {
      opacity: 1;
      transition-delay: 0.15s;
    }

    /* Column borders */

    :host([theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Frozen columns */

    [last-frozen] {
      border-right: var(--_lumo-grid-border-width) solid transparent;
      overflow: hidden;
    }

    :host([overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }

    [first-frozen-to-end] {
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    /* Row stripes */

    :host([theme~='row-stripes']) [part~='even-row'] [part~='body-cell'],
    :host([theme~='row-stripes']) [part~='even-row'] [part~='details-cell'] {
      background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      background-repeat: repeat-x;
    }

    /* Selected row */

    /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
    :host(:not([reordering])) [part~='row'][selected] {
      z-index: 1;
    }

    :host(:not([reordering])) [part~='row'][selected] [part~='body-cell']:not([part~='details-cell']) {
      background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
      background-repeat: repeat;
    }

    /* Cover the border of an unselected row */
    :host(:not([theme~='no-row-borders'])) [part~='row'][selected] [part~='cell']:not([part~='details-cell']) {
      box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
    }

    /* Compact */

    :host([theme~='compact']) [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-m);
    }

    :host([theme~='compact']) [part~='cell'] {
      min-height: var(--lumo-size-s);
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([theme~='compact']) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
    }

    /* Wrap cell contents */

    :host([theme~='wrap-cell-content']) [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      white-space: normal;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    :host([dir='rtl'][theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    :host([dir='rtl']) [last-frozen] {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl']) [first-frozen-to-end] {
      border-left: none;
      border-right: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl'][overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    :host([dir='rtl'][overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }
  `,{moduleId:"lumo-grid"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ge extends lt(ae){static get is(){return"vaadin-grid-column"}}le(Ge);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ht=a=>class extends a{static get observers(){return["_a11yUpdateGridSize(size, _columnTree)"]}_a11yGetHeaderRowCount(e){return e.filter(t=>t.some(i=>i.headerRenderer||i.path||i.header)).length}_a11yGetFooterRowCount(e){return e.filter(t=>t.some(i=>i.headerRenderer)).length}_a11yUpdateGridSize(e,t){if(e===void 0||t===void 0)return;const i=t[t.length-1];this.$.table.setAttribute("aria-rowcount",e+this._a11yGetHeaderRowCount(t)+this._a11yGetFooterRowCount(t)),this.$.table.setAttribute("aria-colcount",i&&i.length||0),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){P(this.$.header,(e,t)=>{e.setAttribute("aria-rowindex",t+1)})}_a11yUpdateFooterRows(){P(this.$.footer,(e,t)=>{e.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+t+1)})}_a11yUpdateRowRowindex(e,t){e.setAttribute("aria-rowindex",t+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(e,t){e.setAttribute("aria-selected",!!t),j(e,i=>{i.setAttribute("aria-selected",!!t)})}_a11yUpdateRowExpanded(e){this.__isRowExpandable(e)?e.setAttribute("aria-expanded","false"):this.__isRowCollapsible(e)?e.setAttribute("aria-expanded","true"):e.removeAttribute("aria-expanded")}_a11yUpdateRowLevel(e,t){t>0||this.__isRowCollapsible(e)||this.__isRowExpandable(e)?e.setAttribute("aria-level",t+1):e.removeAttribute("aria-level")}_a11ySetRowDetailsCell(e,t){j(e,i=>{i!==t&&i.setAttribute("aria-controls",t.id)})}_a11yUpdateCellColspan(e,t){e.setAttribute("aria-colspan",Number(t))}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach(e=>{let t=e.parentNode;for(;t&&t.localName!=="vaadin-grid-cell-content";)t=t.parentNode;t&&t.assignedSlot&&t.assignedSlot.parentNode.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[String(e.direction)]||"none")})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const We=a=>{if(!a.parentNode)return!1;const e=Array.from(a.parentNode.querySelectorAll("[tabindex], button, input, select, textarea, object, iframe, a[href], area[href]")).filter(t=>{const i=t.getAttribute("part");return!(i&&i.includes("body-cell"))}).includes(a);return!a.disabled&&e&&a.offsetParent&&getComputedStyle(a).visibility!=="hidden"},ut=a=>class extends a{static get properties(){return{activeItem:{type:Object,notify:!0,value:null,sync:!0}}}ready(){super.ready(),this.$.scroller.addEventListener("click",this._onClick.bind(this)),this.addEventListener("cell-activate",this._activateItem.bind(this)),this.addEventListener("row-activate",this._activateItem.bind(this))}_activateItem(e){const t=e.detail.model,i=t?t.item:null;i&&(this.activeItem=this._itemsEqual(this.activeItem,i)?null:i)}_onClick(e){if(e.defaultPrevented)return;const t=e.composedPath(),i=t[t.indexOf(this.$.table)-3];if(!i||i.getAttribute("part").indexOf("details-cell")>-1)return;const n=i._content,s=this.getRootNode().activeElement;!n.contains(s)&&!this._isFocusable(e.target)&&!(e.target instanceof HTMLLabelElement)&&this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(i.parentElement)}}))}_isFocusable(e){return We(e)}};function V(a,r){return a.split(".").reduce((e,t)=>e[t],r)}function Re(a,r,e){if(e.length===0)return!1;let t=!0;return a.forEach(({path:i})=>{if(!i||i.indexOf(".")===-1)return;const n=i.replace(/\.[^.]*$/u,"");V(n,e[0])===void 0&&(console.warn(`Path "${i}" used for ${r} does not exist in all of the items, ${r} is disabled.`),t=!1)}),t}function ne(a){return[void 0,null].indexOf(a)>=0?"":isNaN(a)?a.toString():a}function Fe(a,r){return a=ne(a),r=ne(r),a<r?-1:a>r?1:0}function _t(a,r){return a.sort((e,t)=>r.map(i=>i.direction==="asc"?Fe(V(i.path,e),V(i.path,t)):i.direction==="desc"?Fe(V(i.path,t),V(i.path,e)):0).reduce((i,n)=>i!==0?i:n,0))}function ft(a,r){return a.filter(e=>r.every(t=>{const i=ne(V(t.path,e)),n=ne(t.value).toString().toLowerCase();return i.toString().toLowerCase().includes(n)}))}const pt=a=>(r,e)=>{let t=a?[...a]:[];r.filters&&Re(r.filters,"filtering",t)&&(t=ft(t,r.filters)),Array.isArray(r.sortOrders)&&r.sortOrders.length&&Re(r.sortOrders,"sorting",t)&&(t=_t(t,r.sortOrders));const i=Math.min(t.length,r.pageSize),n=r.page*i,s=n+i,c=t.slice(n,s);e(c,t.length)};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const gt=a=>class extends a{static get properties(){return{items:{type:Array,sync:!0}}}static get observers(){return["__dataProviderOrItemsChanged(dataProvider, items, isAttached, _filters, _sorters, items.*)"]}__setArrayDataProvider(e){const t=pt(this.items);t.__items=e,this._arrayDataProvider=t,this.size=e.length,this.dataProvider=t}__dataProviderOrItemsChanged(e,t,i){i&&(this._arrayDataProvider?e!==this._arrayDataProvider?(this._arrayDataProvider=void 0,this.items=void 0):t?this._arrayDataProvider.__items===t?(this.clearCache(),this.size=this._flatSize):this.__setArrayDataProvider(t):(this._arrayDataProvider=void 0,this.dataProvider=void 0,this.size=0,this.clearCache()):t&&this.__setArrayDataProvider(t))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const mt=a=>class extends a{static get properties(){return{columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree)"]}ready(){super.ready(),pe(this,"track",this._onTrackEvent),this._reorderGhost=this.shadowRoot.querySelector('[part="reorder-ghost"]'),this.addEventListener("touchstart",this._onTouchStart.bind(this)),this.addEventListener("touchmove",this._onTouchMove.bind(this)),this.addEventListener("touchend",this._onTouchEnd.bind(this)),this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){this.hasAttribute("reordering")&&(e.preventDefault(),Le||this._onTrackEnd())}_onTouchStart(e){this._startTouchReorderTimeout=setTimeout(()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})},100)}_onTouchMove(e){this._draggedColumn&&e.preventDefault(),clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout),this._onTrackEnd()}_onTrackEvent(e){if(e.detail.state==="start"){const t=e.composedPath(),i=t[t.indexOf(this.$.header)-2];if(!i||!i._content||i._content.contains(this.getRootNode().activeElement)||this.$.scroller.hasAttribute("column-resizing"))return;this._touchDevice||this._onTrackStart(e)}else e.detail.state==="track"?this._onTrack(e):e.detail.state==="end"&&this._onTrackEnd(e)}_onTrackStart(e){if(!this.columnReorderingAllowed)return;const t=e.composedPath&&e.composedPath();if(t&&t.some(n=>n.hasAttribute&&n.hasAttribute("draggable")))return;const i=this._cellFromPoint(e.detail.x,e.detail.y);if(!(!i||!i.getAttribute("part").includes("header-cell"))){for(this.toggleAttribute("reordering",!0),this._draggedColumn=i._column;this._draggedColumn.parentElement.childElementCount===1;)this._draggedColumn=this._draggedColumn.parentElement;this._setSiblingsReorderStatus(this._draggedColumn,"allowed"),this._draggedColumn._reorderStatus="dragging",this._updateGhost(i),this._reorderGhost.style.visibility="visible",this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._autoScroller()}}_onTrack(e){if(!this._draggedColumn)return;const t=this._cellFromPoint(e.detail.x,e.detail.y);if(!t)return;const i=this._getTargetColumn(t,this._draggedColumn);if(this._isSwapAllowed(this._draggedColumn,i)&&this._isSwappableByPosition(i,e.detail.x)){const n=this._columnTree.findIndex(f=>f.includes(i)),s=this._getColumnsInOrder(n),c=s.indexOf(this._draggedColumn),u=s.indexOf(i),p=c<u?1:-1;for(let f=c;f!==u;f+=p)this._swapColumnOrders(this._draggedColumn,s[f+p])}this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._lastDragClientX=e.detail.x}_onTrackEnd(){this._draggedColumn&&(this.toggleAttribute("reordering",!1),this._draggedColumn._reorderStatus="",this._setSiblingsReorderStatus(this._draggedColumn,""),this._draggedColumn=null,this._lastDragClientX=null,this._reorderGhost.style.visibility="hidden",this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}})))}_getColumnsInOrder(e=this._columnTree.length-1){return this._columnTree[e].filter(t=>!t.hidden).sort((t,i)=>t._order-i._order)}_cellFromPoint(e=0,t=0){this._draggedColumn||this.$.scroller.toggleAttribute("no-content-pointer-events",!0);const i=this.shadowRoot.elementFromPoint(e,t);if(this.$.scroller.toggleAttribute("no-content-pointer-events",!1),i&&i._column)return i}_updateGhostPosition(e,t){const i=this._reorderGhost.getBoundingClientRect(),n=e-i.width/2,s=t-i.height/2,c=parseInt(this._reorderGhost._left||0),u=parseInt(this._reorderGhost._top||0);this._reorderGhost._left=c-(i.left-n),this._reorderGhost._top=u-(i.top-s),this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_updateGhost(e){const t=this._reorderGhost;t.textContent=e._content.innerText;const i=window.getComputedStyle(e);return["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach(n=>{t.style[n]=i[n]}),t}_updateOrders(e){e!==void 0&&(e[0].forEach(t=>{t._order=0}),Be(e[0],this._orderBaseScope,0))}_setSiblingsReorderStatus(e,t){P(e.parentNode,i=>{/column/u.test(i.localName)&&this._isSwapAllowed(i,e)&&(i._reorderStatus=t)})}_autoScroller(){if(this._lastDragClientX){const e=this._lastDragClientX-this.getBoundingClientRect().right+50,t=this.getBoundingClientRect().left-this._lastDragClientX+50;e>0?this.$.table.scrollLeft+=e/10:t>0&&(this.$.table.scrollLeft-=t/10)}this._draggedColumn&&setTimeout(()=>this._autoScroller(),10)}_isSwapAllowed(e,t){if(e&&t){const i=e!==t,n=e.parentElement===t.parentElement,s=e.frozen&&t.frozen||e.frozenToEnd&&t.frozenToEnd||!e.frozen&&!e.frozenToEnd&&!t.frozen&&!t.frozenToEnd;return i&&n&&s}}_isSwappableByPosition(e,t){const i=Array.from(this.$.header.querySelectorAll('tr:not([hidden]) [part~="cell"]')).find(c=>e.contains(c._column)),n=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),s=i.getBoundingClientRect();return s.left>n.left?t>s.right-n.width:t<s.left+n.width}_swapColumnOrders(e,t){[e._order,t._order]=[t._order,e._order],this._debounceUpdateFrozenColumn(),this._updateFirstAndLastColumn()}_getTargetColumn(e,t){if(e&&t){let i=e._column;for(;i.parentElement!==t.parentElement&&i!==this;)i=i.parentElement;return i.parentElement===t.parentElement?i:e._column}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ct=a=>class extends a{ready(){super.ready();const e=this.$.scroller;pe(e,"track",this._onHeaderTrack.bind(this)),e.addEventListener("touchmove",t=>e.hasAttribute("column-resizing")&&t.preventDefault()),e.addEventListener("contextmenu",t=>t.target.getAttribute("part")==="resize-handle"&&t.preventDefault()),e.addEventListener("mousedown",t=>t.target.getAttribute("part")==="resize-handle"&&t.preventDefault())}_onHeaderTrack(e){const t=e.target;if(t.getAttribute("part")==="resize-handle"){let n=t.parentElement._column;for(this.$.scroller.toggleAttribute("column-resizing",!0);n.localName==="vaadin-grid-column-group";)n=n._childColumns.slice(0).sort((g,C)=>g._order-C._order).filter(g=>!g.hidden).pop();const s=this.__isRTL,c=e.detail.x,u=Array.from(this.$.header.querySelectorAll('[part~="row"]:last-child [part~="cell"]')),p=u.find(g=>g._column===n);if(p.offsetWidth){const g=getComputedStyle(p._content),C=10+parseInt(g.paddingLeft)+parseInt(g.paddingRight)+parseInt(g.borderLeftWidth)+parseInt(g.borderRightWidth)+parseInt(g.marginLeft)+parseInt(g.marginRight);let x;const E=p.offsetWidth,S=p.getBoundingClientRect();p.hasAttribute("frozen-to-end")?x=E+(s?c-S.right:S.left-c):x=E+(s?S.left-c:c-S.right),n.width=`${Math.max(C,x)}px`,n.flexGrow=0}u.sort((g,C)=>g._column._order-C._column._order).forEach((g,C,x)=>{C<x.indexOf(p)&&(g._column.width=`${g.offsetWidth}px`,g._column.flexGrow=0)});const f=this._frozenToEndCells[0];if(f&&this.$.table.scrollWidth>this.$.table.offsetWidth){const g=f.getBoundingClientRect(),C=c-(s?g.right:g.left);(s&&C<=0||!s&&C>=0)&&(this.$.table.scrollLeft+=C)}e.detail.state==="end"&&(this.$.scroller.toggleAttribute("column-resizing",!1),this.dispatchEvent(new CustomEvent("column-resize",{detail:{resizedColumn:n}}))),this._resizeHandler()}}};/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function se(a,r,e=0){let t=r;for(const i of a.subCaches){const n=i.parentCacheIndex;if(t<=n)break;if(t<=n+i.flatSize)return se(i,t-n-1,e+1);t-=i.flatSize}return{cache:a,item:a.items[t],index:t,page:Math.floor(t/a.pageSize),level:e}}function Ve({getItemId:a},r,e,t=0,i=0){for(let n=0;n<r.items.length;n++){const s=r.items[n];if(s&&a(s)===a(e))return{cache:r,level:t,item:s,index:n,page:Math.floor(n/r.pageSize),subCache:r.getSubCache(n),flatIndex:i+r.getFlatIndex(n)}}for(const n of r.subCaches){const s=i+r.getFlatIndex(n.parentCacheIndex),c=Ve({getItemId:a},n,e,t+1,s+1);if(c)return c}}function Ue(a,[r,...e],t=0){r===1/0&&(r=a.size-1);const i=a.getFlatIndex(r),n=a.getSubCache(r);return n&&n.flatSize>0&&e.length?Ue(n,e,t+i+1):t+i}/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class me{constructor(r,e,t,i,n){R(this,"context");R(this,"size",0);R(this,"pageSize");R(this,"items",[]);R(this,"pendingRequests",{});R(this,"__subCacheByIndex",{});R(this,"__flatSize",0);this.context=r,this.pageSize=e,this.size=t||0,this.parentCache=i,this.parentCacheIndex=n,this.__flatSize=t||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.__subCacheByIndex)}get isLoading(){return Object.keys(this.pendingRequests).length>0?!0:this.subCaches.some(r=>r.isLoading)}get flatSize(){return this.__flatSize}get effectiveSize(){return console.warn("<vaadin-grid> The `effectiveSize` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.flatSize}recalculateFlatSize(){this.__flatSize=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce((r,e)=>(e.recalculateFlatSize(),r+e.flatSize),0):0}setPage(r,e){const t=r*this.pageSize;e.forEach((i,n)=>{this.items[t+n]=i})}getSubCache(r){return this.__subCacheByIndex[r]}removeSubCache(r){delete this.__subCacheByIndex[r]}removeSubCaches(){this.__subCacheByIndex={}}createSubCache(r){const e=new me(this.context,this.pageSize,0,this,r);return this.__subCacheByIndex[r]=e,e}getFlatIndex(r){const e=Math.max(0,Math.min(this.size-1,r));return this.subCaches.reduce((t,i)=>{const n=i.parentCacheIndex;return e>n?t+i.flatSize:t},e)}getItemForIndex(r){console.warn("<vaadin-grid> The `getItemForIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{item:e}=se(this,r);return e}getCacheAndIndex(r){console.warn("<vaadin-grid> The `getCacheAndIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{cache:e,index:t}=se(this,r);return{cache:e,scaledIndex:t}}updateSize(){console.warn("<vaadin-grid> The `updateSize` method of ItemCache is deprecated and will be removed in Vaadin 25."),this.recalculateFlatSize()}ensureSubCacheForScaledIndex(r){if(console.warn("<vaadin-grid> The `ensureSubCacheForScaledIndex` method of ItemCache is deprecated and will be removed in Vaadin 25."),!this.getSubCache(r)){const e=this.createSubCache(r);this.context.__controller.__loadCachePage(e,0)}}get grid(){return console.warn("<vaadin-grid> The `grid` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.context.__controller.host}get itemCaches(){return console.warn("<vaadin-grid> The `itemCaches` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.__subCacheByIndex}}/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class bt extends EventTarget{constructor(e,{size:t,pageSize:i,isExpanded:n,getItemId:s,dataProvider:c,dataProviderParams:u}){super();R(this,"host");R(this,"dataProvider");R(this,"dataProviderParams");R(this,"size");R(this,"pageSize");R(this,"isExpanded");R(this,"getItemId");R(this,"rootCache");this.host=e,this.pageSize=i,this.getItemId=s,this.isExpanded=n,this.dataProvider=c,this.dataProviderParams=u,this.rootCache=this.__createRootCache(t)}get flatSize(){return this.rootCache.flatSize}get __cacheContext(){return{isExpanded:this.isExpanded,__controller:this}}isLoading(){return this.rootCache.isLoading}setPageSize(e){this.pageSize=e,this.clearCache()}setDataProvider(e){this.dataProvider=e,this.clearCache()}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.__createRootCache(this.rootCache.size)}getFlatIndexContext(e){return se(this.rootCache,e)}getItemContext(e){return Ve({getItemId:this.getItemId},this.rootCache,e)}getFlatIndexByPath(e){return Ue(this.rootCache,e)}ensureFlatIndexLoaded(e){const{cache:t,page:i,item:n}=this.getFlatIndexContext(e);n||this.__loadCachePage(t,i)}ensureFlatIndexHierarchy(e){const{cache:t,item:i,index:n}=this.getFlatIndexContext(e);if(i&&this.isExpanded(i)&&!t.getSubCache(n)){const s=t.createSubCache(n);this.__loadCachePage(s,0)}}loadFirstPage(){this.__loadCachePage(this.rootCache,0)}__createRootCache(e){return new me(this.__cacheContext,this.pageSize,e)}__loadCachePage(e,t){if(!this.dataProvider||e.pendingRequests[t])return;let i={page:t,pageSize:this.pageSize,parentItem:e.parentItem};this.dataProviderParams&&(i={...i,...this.dataProviderParams()});const n=(s,c)=>{c!==void 0?e.size=c:i.parentItem&&(e.size=s.length),e.setPage(t,s),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete e.pendingRequests[t],this.dispatchEvent(new CustomEvent("page-loaded"))};e.pendingRequests[t]=n,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(i,n)}}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const vt=a=>class extends a{static get properties(){return{size:{type:Number,notify:!0,sync:!0},_flatSize:{type:Number,sync:!0},pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged",sync:!0},loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_hasData:{type:Boolean,value:!1,sync:!0},itemHasChildrenPath:{type:String,value:"children",observer:"__itemHasChildrenPathChanged",sync:!0},itemIdPath:{type:String,value:null,sync:!0},expandedItems:{type:Object,notify:!0,value:()=>[],sync:!0},__expandedKeys:{type:Object,computed:"__computeExpandedKeys(itemIdPath, expandedItems)"}}}static get observers(){return["_sizeChanged(size)","_expandedItemsChanged(expandedItems)"]}constructor(){super(),this._dataProviderController=new bt(this,{size:this.size,pageSize:this.pageSize,getItemId:this.getItemId.bind(this),isExpanded:this._isExpanded.bind(this),dataProvider:this.dataProvider?this.dataProvider.bind(this):null,dataProviderParams:()=>({sortOrders:this._mapSorters(),filters:this._mapFilters()})}),this._dataProviderController.addEventListener("page-requested",this._onDataProviderPageRequested.bind(this)),this._dataProviderController.addEventListener("page-received",this._onDataProviderPageReceived.bind(this)),this._dataProviderController.addEventListener("page-loaded",this._onDataProviderPageLoaded.bind(this))}get _cache(){return console.warn("<vaadin-grid> The `_cache` property is deprecated and will be removed in Vaadin 25."),this._dataProviderController.rootCache}get _effectiveSize(){return console.warn("<vaadin-grid> The `_effectiveSize` property is deprecated and will be removed in Vaadin 25."),this._flatSize}_sizeChanged(e){this._dataProviderController.rootCache.size=e,this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize}__itemHasChildrenPathChanged(e,t){!t&&e==="children"||this.requestContentUpdate()}_getItem(e,t){if(e>=this._flatSize)return;t.index=e;const{item:i}=this._dataProviderController.getFlatIndexContext(e);i?(this.__updateLoading(t,!1),this._updateItem(t,i),this._isExpanded(i)&&this._dataProviderController.ensureFlatIndexHierarchy(e)):(this.__updateLoading(t,!0),this._dataProviderController.ensureFlatIndexLoaded(e))}__updateLoading(e,t){const i=q(e);he(e,"loading",t),N(i,"loading-row-cell",t)}getItemId(e){return this.itemIdPath?ge(this.itemIdPath,e):e}_isExpanded(e){return this.__expandedKeys&&this.__expandedKeys.has(this.getItemId(e))}_expandedItemsChanged(){this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize,this.__updateVisibleRows()}__computeExpandedKeys(e,t){const i=t||[],n=new Set;return i.forEach(s=>{n.add(this.getItemId(s))}),n}expandItem(e){this._isExpanded(e)||(this.expandedItems=[...this.expandedItems,e])}collapseItem(e){this._isExpanded(e)&&(this.expandedItems=this.expandedItems.filter(t=>!this._itemsEqual(t,e)))}_getIndexLevel(e=0){const{level:t}=this._dataProviderController.getFlatIndexContext(e);return t}_loadPage(e,t){console.warn("<vaadin-grid> The `_loadPage` method is deprecated and will be removed in Vaadin 25."),this._dataProviderController.__loadCachePage(t,e)}_onDataProviderPageRequested(){this._setLoading(!0)}_onDataProviderPageReceived(){this._flatSize=this._dataProviderController.flatSize,this._getRenderedRows().forEach(e=>{this._dataProviderController.ensureFlatIndexHierarchy(e.index)}),this._hasData=!0}_onDataProviderPageLoaded(){this._debouncerApplyCachedData=F.debounce(this._debouncerApplyCachedData,J.after(0),()=>{this._setLoading(!1),this._getRenderedRows().forEach(e=>{const{item:t}=this._dataProviderController.getFlatIndexContext(e.index);t&&this._getItem(e.index,e)}),this.__scrollToPendingIndexes(),this.__dispatchPendingBodyCellFocus()}),this._dataProviderController.isLoading()||this._debouncerApplyCachedData.flush()}__debounceClearCache(){this.__clearCacheDebouncer=F.debounce(this.__clearCacheDebouncer,U,()=>this.clearCache())}clearCache(){this._dataProviderController.clearCache(),this._dataProviderController.rootCache.size=this.size,this._dataProviderController.recalculateFlatSize(),this._hasData=!1,this.__updateVisibleRows(),this.__virtualizer.size||this._dataProviderController.loadFirstPage()}_pageSizeChanged(e,t){this._dataProviderController.setPageSize(e),t!==void 0&&e!==t&&this.clearCache()}_checkSize(){this.size===void 0&&this._flatSize===0&&console.warn("The <vaadin-grid> needs the total number of items in order to display rows, which you can specify either by setting the `size` property, or by providing it to the second argument of the `dataProvider` function `callback` call.")}_dataProviderChanged(e,t){this._dataProviderController.setDataProvider(e?e.bind(this):null),t!==void 0&&this.clearCache(),this._ensureFirstPageLoaded(),this._debouncerCheckSize=F.debounce(this._debouncerCheckSize,J.after(2e3),this._checkSize.bind(this))}_ensureFirstPageLoaded(){this._hasData||this._dataProviderController.loadFirstPage()}_itemsEqual(e,t){return this.getItemId(e)===this.getItemId(t)}_getItemIndexInArray(e,t){let i=-1;return t.forEach((n,s)=>{this._itemsEqual(n,e)&&(i=s)}),i}scrollToIndex(...e){let t;for(;t!==(t=this._dataProviderController.getFlatIndexByPath(e));)this._scrollToFlatIndex(t);(this._dataProviderController.isLoading()||!this.clientHeight)&&(this.__pendingScrollToIndexes=e)}__scrollToPendingIndexes(){if(this.__pendingScrollToIndexes&&this.$.items.children.length){const e=this.__pendingScrollToIndexes;delete this.__pendingScrollToIndexes,this.scrollToIndex(...e)}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Q={BETWEEN:"between",ON_TOP:"on-top",ON_TOP_OR_BETWEEN:"on-top-or-between",ON_GRID:"on-grid"},M={ON_TOP:"on-top",ABOVE:"above",BELOW:"below",EMPTY:"empty"},yt=!("draggable"in document.createElement("div")),At=a=>class extends a{static get properties(){return{dropMode:{type:String,sync:!0},rowsDraggable:{type:Boolean,sync:!0},dragFilter:{type:Function,sync:!0},dropFilter:{type:Function,sync:!0},__dndAutoScrollThreshold:{value:50}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter, loading)"]}ready(){super.ready(),this.$.table.addEventListener("dragstart",this._onDragStart.bind(this)),this.$.table.addEventListener("dragend",this._onDragEnd.bind(this)),this.$.table.addEventListener("dragover",this._onDragOver.bind(this)),this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this)),this.$.table.addEventListener("drop",this._onDrop.bind(this)),this.$.table.addEventListener("dragenter",e=>{this.dropMode&&(e.preventDefault(),e.stopPropagation())})}_onDragStart(e){if(this.rowsDraggable){let t=e.target;if(t.localName==="vaadin-grid-cell-content"&&(t=t.assignedSlot.parentNode.parentNode),t.parentNode!==this.$.items)return;if(e.stopPropagation(),this.toggleAttribute("dragging-rows",!0),this._safari){const c=t.style.transform;t.style.top=/translateY\((.*)\)/u.exec(c)[1],t.style.transform="none",requestAnimationFrame(()=>{t.style.top="",t.style.transform=c})}const i=t.getBoundingClientRect();yt?e.dataTransfer.setDragImage(t):e.dataTransfer.setDragImage(t,e.clientX-i.left,e.clientY-i.top);let n=[t];this._isSelected(t._item)&&(n=this.__getViewportRows().filter(c=>this._isSelected(c._item)).filter(c=>!this.dragFilter||this.dragFilter(this.__getRowModel(c)))),e.dataTransfer.setData("text",this.__formatDefaultTransferData(n)),X(t,{dragstart:n.length>1?`${n.length}`:""}),this.style.setProperty("--_grid-drag-start-x",`${e.clientX-i.left+20}px`),this.style.setProperty("--_grid-drag-start-y",`${e.clientY-i.top+10}px`),requestAnimationFrame(()=>{X(t,{dragstart:!1}),this.style.setProperty("--_grid-drag-start-x",""),this.style.setProperty("--_grid-drag-start-y","")});const s=new CustomEvent("grid-dragstart",{detail:{draggedItems:n.map(c=>c._item),setDragData:(c,u)=>e.dataTransfer.setData(c,u),setDraggedItemsCount:c=>t.setAttribute("dragstart",c)}});s.originalEvent=e,this.dispatchEvent(s)}}_onDragEnd(e){this.toggleAttribute("dragging-rows",!1),e.stopPropagation();const t=new CustomEvent("grid-dragend");t.originalEvent=e,this.dispatchEvent(t)}_onDragLeave(e){e.stopPropagation(),this._clearDragStyles()}_onDragOver(e){if(this.dropMode){if(this._dropLocation=void 0,this._dragOverItem=void 0,this.__dndAutoScroll(e.clientY)){this._clearDragStyles();return}let t=e.composedPath().find(i=>i.localName==="tr");if(!this._flatSize||this.dropMode===Q.ON_GRID)this._dropLocation=M.EMPTY;else if(!t||t.parentNode!==this.$.items){if(t)return;if(this.dropMode===Q.BETWEEN||this.dropMode===Q.ON_TOP_OR_BETWEEN)t=Array.from(this.$.items.children).filter(i=>!i.hidden).pop(),this._dropLocation=M.BELOW;else return}else{const i=t.getBoundingClientRect();if(this._dropLocation=M.ON_TOP,this.dropMode===Q.BETWEEN){const n=e.clientY-i.top<i.bottom-e.clientY;this._dropLocation=n?M.ABOVE:M.BELOW}else this.dropMode===Q.ON_TOP_OR_BETWEEN&&(e.clientY-i.top<i.height/3?this._dropLocation=M.ABOVE:e.clientY-i.top>i.height/3*2&&(this._dropLocation=M.BELOW))}if(t&&t.hasAttribute("drop-disabled")){this._dropLocation=void 0;return}e.stopPropagation(),e.preventDefault(),this._dropLocation===M.EMPTY?this.toggleAttribute("dragover",!0):t?(this._dragOverItem=t._item,t.getAttribute("dragover")!==this._dropLocation&&ze(t,{dragover:this._dropLocation})):this._clearDragStyles()}}__dndAutoScroll(e){if(this.__dndAutoScrolling)return!0;const t=this.$.header.getBoundingClientRect().bottom,i=this.$.footer.getBoundingClientRect().top,n=t-e+this.__dndAutoScrollThreshold,s=e-i+this.__dndAutoScrollThreshold;let c=0;if(s>0?c=s*2:n>0&&(c=-n*2),c){const u=this.$.table.scrollTop;if(this.$.table.scrollTop+=c,u!==this.$.table.scrollTop)return this.__dndAutoScrolling=!0,setTimeout(()=>{this.__dndAutoScrolling=!1},20),!0}}__getViewportRows(){const e=this.$.header.getBoundingClientRect().bottom,t=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter(i=>{const n=i.getBoundingClientRect();return n.bottom>e&&n.top<t})}_clearDragStyles(){this.removeAttribute("dragover"),P(this.$.items,e=>{ze(e,{dragover:null})})}_onDrop(e){if(this.dropMode){e.stopPropagation(),e.preventDefault();const t=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map(n=>({type:n,data:e.dataTransfer.getData(n)}));this._clearDragStyles();const i=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData:t}});i.originalEvent=e,this.dispatchEvent(i)}}__formatDefaultTransferData(e){return e.map(t=>Array.from(t.children).filter(i=>!i.hidden&&i.getAttribute("part").indexOf("details-cell")===-1).sort((i,n)=>i._column._order>n._column._order?1:-1).map(i=>i._content.textContent.trim()).filter(i=>i).join("	")).join(`
`)}_dragDropAccessChanged(){this.filterDragAndDrop()}filterDragAndDrop(){P(this.$.items,e=>{e.hidden||this._filterDragAndDrop(e,this.__getRowModel(e))})}_filterDragAndDrop(e,t){const i=this.loading||e.hasAttribute("loading"),n=!this.rowsDraggable||i||this.dragFilter&&!this.dragFilter(t),s=!this.dropMode||i||this.dropFilter&&!this.dropFilter(t);j(e,c=>{n?c._content.removeAttribute("draggable"):c._content.setAttribute("draggable",!0)}),X(e,{"drag-disabled":!!n,"drop-disabled":!!s})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function qe(a,r){if(!a||!r||a.length!==r.length)return!1;for(let e=0,t=a.length;e<t;e++)if(a[e]instanceof Array&&r[e]instanceof Array){if(!qe(a[e],r[e]))return!1}else if(a[e]!==r[e])return!1;return!0}const xt=a=>class extends a{static get properties(){return{_columnTree:Object}}ready(){super.ready(),this._addNodeObserver()}_hasColumnGroups(e){return e.some(t=>t.localName==="vaadin-grid-column-group")}_getChildColumns(e){return B.getColumns(e)}_flattenColumnGroups(e){return e.map(t=>t.localName==="vaadin-grid-column-group"?this._getChildColumns(t):[t]).reduce((t,i)=>t.concat(i),[])}_getColumnTree(){const e=B.getColumns(this),t=[e];let i=e;for(;this._hasColumnGroups(i);)i=this._flattenColumnGroups(i),t.push(i);return t}_debounceUpdateColumnTree(){this.__updateColumnTreeDebouncer=F.debounce(this.__updateColumnTreeDebouncer,U,()=>this._updateColumnTree())}_updateColumnTree(){const e=this._getColumnTree();qe(e,this._columnTree)||(e.forEach(t=>{t.forEach(i=>{i.performUpdate&&i.performUpdate()})}),this._columnTree=e)}_addNodeObserver(){this._observer=new B(this,(e,t)=>{const i=t.flatMap(s=>s._allCells),n=s=>i.filter(c=>c&&c._content.contains(s)).length;this.__removeSorters(this._sorters.filter(n)),this.__removeFilters(this._filters.filter(n)),this._debounceUpdateColumnTree(),this._debouncerCheckImports=F.debounce(this._debouncerCheckImports,J.after(2e3),this._checkImports.bind(this)),this._ensureFirstPageLoaded()})}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach(e=>{this.querySelector(e)&&!customElements.get(e)&&console.warn(`Make sure you have imported the required module for <${e}> element.`)})}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach(e=>this._updateFirstAndLastColumnForRow(e))}_updateFirstAndLastColumnForRow(e){Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])')).sort((t,i)=>t._column._order-i._column._order).forEach((t,i,n)=>{G(t,"first-column",i===0),G(t,"last-column",i===n.length-1)})}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const wt=a=>class extends a{getEventContext(e){const t={},i=e.__composedPath||e.composedPath(),n=i[i.indexOf(this.$.table)-3];return n&&(t.section=["body","header","footer","details"].find(s=>n.getAttribute("part").indexOf(s)>-1),n._column&&(t.column=n._column),(t.section==="body"||t.section==="details")&&Object.assign(t,this.__getRowModel(n.parentElement))),t}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const It=a=>class extends a{static get properties(){return{_filters:{type:Array,value:()=>[]}}}constructor(){super(),this._filterChanged=this._filterChanged.bind(this),this.addEventListener("filter-changed",this._filterChanged)}_filterChanged(e){e.stopPropagation(),this.__addFilter(e.target),this.__applyFilters()}__removeFilters(e){e.length!==0&&(this._filters=this._filters.filter(t=>e.indexOf(t)<0),this.__applyFilters())}__addFilter(e){this._filters.indexOf(e)===-1&&this._filters.push(e)}__applyFilters(){this.dataProvider&&this.isAttached&&this.clearCache()}_mapFilters(){return this._filters.map(e=>({path:e.path,value:e.value}))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Et=a=>class extends a{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_itemsFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_footerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number,_focusedCell:{type:Object,observer:"_focusedCellChanged",sync:!0},interacting:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0,observer:"_interactingChanged"}}}get __rowFocusMode(){return this.__isRow(this._itemsFocusable)||this.__isRow(this._headerFocusable)||this.__isRow(this._footerFocusable)}set __rowFocusMode(e){["_itemsFocusable","_footerFocusable","_headerFocusable"].forEach(t=>{const i=this[t];if(e){const n=i&&i.parentElement;this.__isCell(i)?this[t]=n:this.__isCell(n)&&(this[t]=n.parentElement)}else if(!e&&this.__isRow(i)){const n=i.firstElementChild;this[t]=n._focusButton||n}})}get _visibleItemsCount(){return this._lastVisibleIndex-this._firstVisibleIndex-1}ready(){super.ready(),!(this._ios||this._android)&&(this.addEventListener("keydown",this._onKeyDown),this.addEventListener("keyup",this._onKeyUp),this.addEventListener("focusin",this._onFocusIn),this.addEventListener("focusout",this._onFocusOut),this.$.table.addEventListener("focusin",this._onContentFocusIn.bind(this)),this.addEventListener("mousedown",()=>{this.toggleAttribute("navigating",!1),this._isMousedown=!0,this._focusedColumnOrder=void 0}),this.addEventListener("mouseup",()=>{this._isMousedown=!1}))}_focusableChanged(e,t){t&&t.setAttribute("tabindex","-1"),e&&this._updateGridSectionFocusTarget(e)}_focusedCellChanged(e,t){t&&$e(t,"part","focused-cell"),e&&De(e,"part","focused-cell")}_interactingChanged(){this._updateGridSectionFocusTarget(this._headerFocusable),this._updateGridSectionFocusTarget(this._itemsFocusable),this._updateGridSectionFocusTarget(this._footerFocusable)}__updateItemsFocusable(){if(!this._itemsFocusable)return;const e=this.shadowRoot.activeElement===this._itemsFocusable;this._getRenderedRows().forEach(t=>{if(t.index===this._focusedItemIndex)if(this.__rowFocusMode)this._itemsFocusable=t;else{let i=this._itemsFocusable.parentElement,n=this._itemsFocusable;if(i){this.__isCell(i)&&(n=i,i=i.parentElement);const s=[...i.children].indexOf(n);this._itemsFocusable=this.__getFocusable(t,t.children[s])}}}),e&&this._itemsFocusable.focus()}_onKeyDown(e){const t=e.key;let i;switch(t){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":i="Navigation";break;case"Enter":case"Escape":case"F2":i="Interaction";break;case"Tab":i="Tab";break;case" ":i="Space";break}this._detectInteracting(e),this.interacting&&i!=="Interaction"&&(i=void 0),i&&this[`_on${i}KeyDown`](e,t)}_ensureScrolledToIndex(e){[...this.$.items.children].find(i=>i.index===e)?this.__scrollIntoViewport(e):this.scrollToIndex(e)}__isRowExpandable(e){if(this.itemHasChildrenPath){const t=e._item;return!!(t&&ge(this.itemHasChildrenPath,t)&&!this._isExpanded(t))}}__isRowCollapsible(e){return this._isExpanded(e._item)}__isDetailsCell(e){return e.matches('[part~="details-cell"]')}__isCell(e){return e instanceof HTMLTableCellElement}__isRow(e){return e instanceof HTMLTableRowElement}__getIndexOfChildElement(e){return Array.prototype.indexOf.call(e.parentNode.children,e)}_onNavigationKeyDown(e,t){e.preventDefault();const i=this.__isRTL,n=e.composedPath().find(g=>this.__isRow(g)),s=e.composedPath().find(g=>this.__isCell(g));let c=0,u=0;switch(t){case"ArrowRight":c=i?-1:1;break;case"ArrowLeft":c=i?1:-1;break;case"Home":this.__rowFocusMode||e.ctrlKey?u=-1/0:c=-1/0;break;case"End":this.__rowFocusMode||e.ctrlKey?u=1/0:c=1/0;break;case"ArrowDown":u=1;break;case"ArrowUp":u=-1;break;case"PageDown":if(this.$.items.contains(n)){const g=this.__getIndexInGroup(n,this._focusedItemIndex);this._scrollToFlatIndex(g)}u=this._visibleItemsCount;break;case"PageUp":u=-this._visibleItemsCount;break}if(this.__rowFocusMode&&!n||!this.__rowFocusMode&&!s)return;const p=i?"ArrowLeft":"ArrowRight",f=i?"ArrowRight":"ArrowLeft";if(t===p){if(this.__rowFocusMode){if(this.__isRowExpandable(n)){this.expandItem(n._item);return}this.__rowFocusMode=!1,this._onCellNavigation(n.firstElementChild,0,0);return}}else if(t===f)if(this.__rowFocusMode){if(this.__isRowCollapsible(n)){this.collapseItem(n._item);return}}else{const g=[...n.children].sort((C,x)=>C._order-x._order);if(s===g[0]||this.__isDetailsCell(s)){this.__rowFocusMode=!0,this._onRowNavigation(n,0);return}}this.__rowFocusMode?this._onRowNavigation(n,u):this._onCellNavigation(s,c,u)}_onRowNavigation(e,t){const{dstRow:i}=this.__navigateRows(t,e);i&&i.focus()}__getIndexInGroup(e,t){return e.parentNode===this.$.items?t!==void 0?t:e.index:this.__getIndexOfChildElement(e)}__navigateRows(e,t,i){const n=this.__getIndexInGroup(t,this._focusedItemIndex),s=t.parentNode,c=(s===this.$.items?this._flatSize:s.children.length)-1;let u=Math.max(0,Math.min(n+e,c));if(s!==this.$.items){if(u>n)for(;u<c&&s.children[u].hidden;)u+=1;else if(u<n)for(;u>0&&s.children[u].hidden;)u-=1;return this.toggleAttribute("navigating",!0),{dstRow:s.children[u]}}let p=!1;if(i){const f=this.__isDetailsCell(i);if(s===this.$.items){const g=t._item,{item:C}=this._dataProviderController.getFlatIndexContext(u);f?p=e===0:p=e===1&&this._isDetailsOpened(g)||e===-1&&u!==n&&this._isDetailsOpened(C),p!==f&&(e===1&&p||e===-1&&!p)&&(u=n)}}return this._ensureScrolledToIndex(u),this._focusedItemIndex=u,this.toggleAttribute("navigating",!0),{dstRow:[...s.children].find(f=>!f.hidden&&f.index===u),dstIsRowDetails:p}}_onCellNavigation(e,t,i){const n=e.parentNode,{dstRow:s,dstIsRowDetails:c}=this.__navigateRows(i,n,e);if(!s)return;let u=this.__getIndexOfChildElement(e);this.$.items.contains(e)&&(u=[...this.$.sizer.children].findIndex(C=>C._column===e._column));const p=this.__isDetailsCell(e),f=n.parentNode,g=this.__getIndexInGroup(n,this._focusedItemIndex);if(this._focusedColumnOrder===void 0&&(p?this._focusedColumnOrder=0:this._focusedColumnOrder=this._getColumns(f,g).filter(C=>!C.hidden)[u]._order),c)[...s.children].find(x=>this.__isDetailsCell(x)).focus();else{const C=this.__getIndexInGroup(s,this._focusedItemIndex),x=this._getColumns(f,C).filter(I=>!I.hidden),E=x.map(I=>I._order).sort((I,$)=>I-$),S=E.length-1,A=E.indexOf(E.slice(0).sort((I,$)=>Math.abs(I-this._focusedColumnOrder)-Math.abs($-this._focusedColumnOrder))[0]),L=i===0&&p?A:Math.max(0,Math.min(A+t,S));L!==A&&(this._focusedColumnOrder=void 0);const T=x.reduce((I,$,W)=>(I[$._order]=W,I),{})[E[L]];let k;if(this.$.items.contains(e)){const I=this.$.sizer.children[T];this._lazyColumns&&(this.__isColumnInViewport(I._column)||I.scrollIntoView(),this.__updateColumnsBodyContentHidden(),this.__updateHorizontalScrollPosition()),k=[...s.children].find($=>$._column===I._column),this._scrollHorizontallyToCell(k)}else k=s.children[T],this._scrollHorizontallyToCell(k);k.focus()}}_onInteractionKeyDown(e,t){const i=e.composedPath()[0],n=i.localName==="input"&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/iu.test(i.type);let s;switch(t){case"Enter":s=this.interacting?!n:!0;break;case"Escape":s=!1;break;case"F2":s=!this.interacting;break}const{cell:c}=this._getGridEventLocation(e);if(this.interacting!==s&&c!==null)if(s){const u=c._content.querySelector("[focus-target]")||[...c._content.querySelectorAll("*")].find(p=>this._isFocusable(p));u&&(e.preventDefault(),u.focus(),this._setInteracting(!0),this.toggleAttribute("navigating",!1))}else e.preventDefault(),this._focusedColumnOrder=void 0,c.focus(),this._setInteracting(!1),this.toggleAttribute("navigating",!0);t==="Escape"&&this._hideTooltip(!0)}_predictFocusStepTarget(e,t){const i=[this.$.table,this._headerFocusable,this._itemsFocusable,this._footerFocusable,this.$.focusexit];let n=i.indexOf(e);for(n+=t;n>=0&&n<=i.length-1;){let c=i[n];if(c&&!this.__rowFocusMode&&(c=i[n].parentNode),!c||c.hidden)n+=t;else break}let s=i[n];if(s&&!this.__isHorizontallyInViewport(s)){const c=this._getColumnsInOrder().find(u=>this.__isColumnInViewport(u));if(c)if(s===this._headerFocusable)s=c._headerCell;else if(s===this._itemsFocusable){const u=s._column._cells.indexOf(s);s=c._cells[u]}else s===this._footerFocusable&&(s=c._footerCell)}return s}_onTabKeyDown(e){const t=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);if(t){if(e.stopPropagation(),t===this.$.table)this.$.table.focus();else if(t===this.$.focusexit)this.$.focusexit.focus();else if(t===this._itemsFocusable){let i=t;const n=this.__isRow(t)?t:t.parentNode;if(this._ensureScrolledToIndex(this._focusedItemIndex),n.index!==this._focusedItemIndex&&this.__isCell(t)){const s=Array.from(n.children).indexOf(this._itemsFocusable),c=Array.from(this.$.items.children).find(u=>!u.hidden&&u.index===this._focusedItemIndex);c&&(i=c.children[s])}e.preventDefault(),i.focus()}else e.preventDefault(),t.focus();this.toggleAttribute("navigating",!0)}}_onSpaceKeyDown(e){e.preventDefault();const t=e.composedPath()[0],i=this.__isRow(t);(i||!t._content||!t._content.firstElementChild)&&this.dispatchEvent(new CustomEvent(i?"row-activate":"cell-activate",{detail:{model:this.__getRowModel(i?t:t.parentElement)}}))}_onKeyUp(e){if(!/^( |SpaceBar)$/u.test(e.key)||this.interacting)return;e.preventDefault();const t=e.composedPath()[0];if(t._content&&t._content.firstElementChild){const i=this.hasAttribute("navigating");t._content.firstElementChild.dispatchEvent(new MouseEvent("click",{shiftKey:e.shiftKey,bubbles:!0,composed:!0,cancelable:!0})),this.toggleAttribute("navigating",i)}}_onFocusIn(e){this._isMousedown||this.toggleAttribute("navigating",!0);const t=e.composedPath()[0];t===this.$.table||t===this.$.focusexit?(this._predictFocusStepTarget(t,t===this.$.table?1:-1).focus(),this._setInteracting(!1)):this._detectInteracting(e)}_onFocusOut(e){this.toggleAttribute("navigating",!1),this._detectInteracting(e),this._hideTooltip(),this._focusedCell=null}_onContentFocusIn(e){const{section:t,cell:i,row:n}=this._getGridEventLocation(e);if(!(!i&&!this.__rowFocusMode)){if(this._detectInteracting(e),t&&(i||n))if(this._activeRowGroup=t,this.$.header===t?this._headerFocusable=this.__getFocusable(n,i):this.$.items===t?this._itemsFocusable=this.__getFocusable(n,i):this.$.footer===t&&(this._footerFocusable=this.__getFocusable(n,i)),i){const s=this.getEventContext(e);this.__pendingBodyCellFocus=this.loading&&s.section==="body",this.__pendingBodyCellFocus||i.dispatchEvent(new CustomEvent("cell-focus",{bubbles:!0,composed:!0,detail:{context:s}})),this._focusedCell=i._focusButton||i,Ze()&&e.target===i&&this._showTooltip(e)}else this._focusedCell=null;this._detectFocusedItemIndex(e)}}__dispatchPendingBodyCellFocus(){this.__pendingBodyCellFocus&&this.shadowRoot.activeElement===this._itemsFocusable&&this._itemsFocusable.dispatchEvent(new Event("focusin",{bubbles:!0,composed:!0}))}__getFocusable(e,t){return this.__rowFocusMode?e:t._focusButton||t}_detectInteracting(e){const t=e.composedPath().some(i=>i.localName==="vaadin-grid-cell-content");this._setInteracting(t),this.__updateHorizontalScrollPosition()}_detectFocusedItemIndex(e){const{section:t,row:i}=this._getGridEventLocation(e);t===this.$.items&&(this._focusedItemIndex=i.index)}_updateGridSectionFocusTarget(e){if(!e)return;const t=this._getGridSectionFromFocusTarget(e),i=this.interacting&&t===this._activeRowGroup;e.tabIndex=i?-1:0}_preventScrollerRotatingCellFocus(e,t){e.index===this._focusedItemIndex&&this.hasAttribute("navigating")&&this._activeRowGroup===this.$.items&&(this._navigatingIsHidden=!0,this.toggleAttribute("navigating",!1)),t===this._focusedItemIndex&&this._navigatingIsHidden&&(this._navigatingIsHidden=!1,this.toggleAttribute("navigating",!0))}_getColumns(e,t){let i=this._columnTree.length-1;return e===this.$.header?i=t:e===this.$.footer&&(i=this._columnTree.length-1-t),this._columnTree[i]}__isValidFocusable(e){return this.$.table.contains(e)&&e.offsetHeight}_resetKeyboardNavigation(){if(!this.$&&this.performUpdate&&this.performUpdate(),["header","footer"].forEach(e=>{if(!this.__isValidFocusable(this[`_${e}Focusable`])){const t=[...this.$[e].children].find(n=>n.offsetHeight),i=t?[...t.children].find(n=>!n.hidden):null;t&&i&&(this[`_${e}Focusable`]=this.__getFocusable(t,i))}}),!this.__isValidFocusable(this._itemsFocusable)&&this.$.items.firstElementChild){const e=this.__getFirstVisibleItem(),t=e?[...e.children].find(i=>!i.hidden):null;t&&e&&(this._focusedColumnOrder=void 0,this._itemsFocusable=this.__getFocusable(e,t))}else this.__updateItemsFocusable()}_scrollHorizontallyToCell(e){if(e.hasAttribute("frozen")||e.hasAttribute("frozen-to-end")||this.__isDetailsCell(e))return;const t=e.getBoundingClientRect(),i=e.parentNode,n=Array.from(i.children).indexOf(e),s=this.$.table.getBoundingClientRect();let c=s.left,u=s.right;for(let p=n-1;p>=0;p--){const f=i.children[p];if(!(f.hasAttribute("hidden")||this.__isDetailsCell(f))&&(f.hasAttribute("frozen")||f.hasAttribute("frozen-to-end"))){c=f.getBoundingClientRect().right;break}}for(let p=n+1;p<i.children.length;p++){const f=i.children[p];if(!(f.hasAttribute("hidden")||this.__isDetailsCell(f))&&(f.hasAttribute("frozen")||f.hasAttribute("frozen-to-end"))){u=f.getBoundingClientRect().left;break}}t.left<c&&(this.$.table.scrollLeft+=Math.round(t.left-c)),t.right>u&&(this.$.table.scrollLeft+=Math.round(t.right-u))}_getGridEventLocation(e){const t=e.composedPath(),i=t.indexOf(this.$.table),n=i>=1?t[i-1]:null,s=i>=2?t[i-2]:null,c=i>=3?t[i-3]:null;return{section:n,row:s,cell:c}}_getGridSectionFromFocusTarget(e){return e===this._headerFocusable?this.$.header:e===this._itemsFocusable?this.$.items:e===this._footerFocusable?this.$.footer:null}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const St=a=>class extends a{static get properties(){return{detailsOpenedItems:{type:Array,value:()=>[],sync:!0},rowDetailsRenderer:{type:Function,sync:!0},_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems, rowDetailsRenderer)","_rowDetailsRendererChanged(rowDetailsRenderer)"]}ready(){super.ready(),this._detailsCellResizeObserver=new ResizeObserver(e=>{e.forEach(({target:t})=>{this._updateDetailsCellHeight(t.parentElement)}),this.__virtualizer.__adapter._resizeHandler()})}_rowDetailsRendererChanged(e){e&&this._columnTree&&P(this.$.items,t=>{if(!t.querySelector("[part~=details-cell]")){this._updateRow(t,this._columnTree[this._columnTree.length-1]);const i=this._isDetailsOpened(t._item);this._toggleDetailsCell(t,i)}})}_detailsOpenedItemsChanged(e,t){P(this.$.items,i=>{if(i.hasAttribute("details-opened")){this._updateItem(i,i._item);return}t&&this._isDetailsOpened(i._item)&&this._updateItem(i,i._item)})}_configureDetailsCell(e){e.setAttribute("part","cell details-cell"),e.toggleAttribute("frozen",!0),this._detailsCellResizeObserver.observe(e)}_toggleDetailsCell(e,t){const i=e.querySelector('[part~="details-cell"]');i&&(i.hidden=!t,!i.hidden&&this.rowDetailsRenderer&&(i._renderer=this.rowDetailsRenderer))}_updateDetailsCellHeight(e){const t=e.querySelector('[part~="details-cell"]');t&&(this.__updateDetailsRowPadding(e,t),requestAnimationFrame(()=>this.__updateDetailsRowPadding(e,t)))}__updateDetailsRowPadding(e,t){t.hidden?e.style.removeProperty("padding-bottom"):e.style.setProperty("padding-bottom",`${t.offsetHeight}px`)}_updateDetailsCellHeights(){P(this.$.items,e=>{this._updateDetailsCellHeight(e)})}_isDetailsOpened(e){return this.detailsOpenedItems&&this._getItemIndexInArray(e,this.detailsOpenedItems)!==-1}openItemDetails(e){this._isDetailsOpened(e)||(this.detailsOpenedItems=[...this.detailsOpenedItems,e])}closeItemDetails(e){this._isDetailsOpened(e)&&(this.detailsOpenedItems=this.detailsOpenedItems.filter(t=>!this._itemsEqual(t,e)))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pe={SCROLLING:500,UPDATE_CONTENT_VISIBILITY:100},zt=a=>class extends Xe(a){static get properties(){return{columnRendering:{type:String,value:"eager",sync:!0},_frozenCells:{type:Array,value:()=>[]},_frozenToEndCells:{type:Array,value:()=>[]},_rowWithFocusedElement:Element}}static get observers(){return["__columnRenderingChanged(_columnTree, columnRendering)"]}get _scrollLeft(){return this.$.table.scrollLeft}get _scrollTop(){return this.$.table.scrollTop}set _scrollTop(e){this.$.table.scrollTop=e}get _lazyColumns(){return this.columnRendering==="lazy"}ready(){super.ready(),this.scrollTarget=this.$.table,this.$.items.addEventListener("focusin",e=>{const t=e.composedPath().indexOf(this.$.items);this._rowWithFocusedElement=e.composedPath()[t-1]}),this.$.items.addEventListener("focusout",()=>{this._rowWithFocusedElement=void 0}),this.$.table.addEventListener("scroll",()=>this._afterScroll())}_onResize(){if(this._updateOverflow(),this.__updateHorizontalScrollPosition(),this._firefox){const e=!re(this);e&&this.__previousVisible===!1&&(this._scrollTop=this.__memorizedScrollTop||0),this.__previousVisible=e}}_scrollToFlatIndex(e){e=Math.min(this._flatSize-1,Math.max(0,e)),this.__virtualizer.scrollToIndex(e),this.__scrollIntoViewport(e)}__scrollIntoViewport(e){const t=[...this.$.items.children].find(i=>i.index===e);if(t){const i=t.getBoundingClientRect(),n=this.$.footer.getBoundingClientRect().top,s=this.$.header.getBoundingClientRect().bottom;i.bottom>n?this.$.table.scrollTop+=i.bottom-n:i.top<s&&(this.$.table.scrollTop-=s-i.top)}}_scheduleScrolling(){this._scrollingFrame||(this._scrollingFrame=requestAnimationFrame(()=>this.$.scroller.toggleAttribute("scrolling",!0))),this._debounceScrolling=F.debounce(this._debounceScrolling,J.after(Pe.SCROLLING),()=>{cancelAnimationFrame(this._scrollingFrame),delete this._scrollingFrame,this.$.scroller.toggleAttribute("scrolling",!1)})}_afterScroll(){this.__updateHorizontalScrollPosition(),this.hasAttribute("reordering")||this._scheduleScrolling(),this.hasAttribute("navigating")||this._hideTooltip(!0),this._updateOverflow(),this._debounceColumnContentVisibility=F.debounce(this._debounceColumnContentVisibility,J.after(Pe.UPDATE_CONTENT_VISIBILITY),()=>{this._lazyColumns&&this.__cachedScrollLeft!==this._scrollLeft&&(this.__cachedScrollLeft=this._scrollLeft,this.__updateColumnsBodyContentHidden())}),this._firefox&&!re(this)&&this.__previousVisible!==!1&&(this.__memorizedScrollTop=this._scrollTop)}__updateColumnsBodyContentHidden(){if(!this._columnTree)return;const e=this._getColumnsInOrder();if(!e[0]||!e[0]._sizerCell)return;let t=!1;if(e.forEach(i=>{const n=this._lazyColumns&&!this.__isColumnInViewport(i);i._bodyContentHidden!==n&&(t=!0,i._cells.forEach(s=>{if(s!==i._sizerCell){if(n)s.remove();else if(s.__parentRow){const c=[...s.__parentRow.children].find(u=>e.indexOf(u._column)>e.indexOf(i));s.__parentRow.insertBefore(s,c)}}})),i._bodyContentHidden=n}),t&&this._frozenCellsChanged(),this._lazyColumns){const i=[...e].reverse().find(c=>c.frozen),n=this.__getColumnEnd(i),s=e.find(c=>!c.frozen&&!c._bodyContentHidden);this.__lazyColumnsStart=this.__getColumnStart(s)-n,this.$.items.style.setProperty("--_grid-lazy-columns-start",`${this.__lazyColumnsStart}px`),this._resetKeyboardNavigation()}}__getColumnEnd(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?0:e._sizerCell.offsetWidth):this.__isRTL?this.$.table.clientWidth:0}__getColumnStart(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?e._sizerCell.offsetWidth:0):this.__isRTL?this.$.table.clientWidth:0}__isColumnInViewport(e){return e.frozen||e.frozenToEnd?!0:this.__isHorizontallyInViewport(e._sizerCell)}__isHorizontallyInViewport(e){return e.offsetLeft+e.offsetWidth>=this._scrollLeft&&e.offsetLeft<=this._scrollLeft+this.clientWidth}__columnRenderingChanged(e,t){t==="eager"?this.$.scroller.removeAttribute("column-rendering"):this.$.scroller.setAttribute("column-rendering",t),this.__updateColumnsBodyContentHidden()}_updateOverflow(){this._debounceOverflow=F.debounce(this._debounceOverflow,oe,()=>{this.__doUpdateOverflow()})}__doUpdateOverflow(){let e="";const t=this.$.table;t.scrollTop<t.scrollHeight-t.clientHeight&&(e+=" bottom"),t.scrollTop>0&&(e+=" top");const i=xe(t,this.getAttribute("dir"));i>0&&(e+=" start"),i<t.scrollWidth-t.clientWidth&&(e+=" end"),this.__isRTL&&(e=e.replace(/start|end/giu,s=>s==="start"?"end":"start")),t.scrollLeft<t.scrollWidth-t.clientWidth&&(e+=" right"),t.scrollLeft>0&&(e+=" left");const n=e.trim();n.length>0&&this.getAttribute("overflow")!==n?this.setAttribute("overflow",n):n.length===0&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}_frozenCellsChanged(){this._debouncerCacheElements=F.debounce(this._debouncerCacheElements,U,()=>{Array.from(this.shadowRoot.querySelectorAll('[part~="cell"]')).forEach(e=>{e.style.transform=""}),this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]")),this._frozenToEndCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen-to-end]")),this.__updateHorizontalScrollPosition()}),this._debounceUpdateFrozenColumn()}_debounceUpdateFrozenColumn(){this.__debounceUpdateFrozenColumn=F.debounce(this.__debounceUpdateFrozenColumn,U,()=>this._updateFrozenColumn())}_updateFrozenColumn(){if(!this._columnTree)return;const e=this._columnTree[this._columnTree.length-1].slice(0);e.sort((n,s)=>n._order-s._order);let t,i;for(let n=0;n<e.length;n++){const s=e[n];s._lastFrozen=!1,s._firstFrozenToEnd=!1,i===void 0&&s.frozenToEnd&&!s.hidden&&(i=n),s.frozen&&!s.hidden&&(t=n)}t!==void 0&&(e[t]._lastFrozen=!0),i!==void 0&&(e[i]._firstFrozenToEnd=!0),this.__updateColumnsBodyContentHidden()}__updateHorizontalScrollPosition(){if(!this._columnTree)return;const e=this.$.table.scrollWidth,t=this.$.table.clientWidth,i=Math.max(0,this.$.table.scrollLeft),n=xe(this.$.table,this.getAttribute("dir")),s=`translate(${-i}px, 0)`;this.$.header.style.transform=s,this.$.footer.style.transform=s,this.$.items.style.transform=s;const c=this.__isRTL?n+t-e:i,u=`translate(${c}px, 0)`;this._frozenCells.forEach(C=>{C.style.transform=u});const p=this.__isRTL?n:i+t-e,f=`translate(${p}px, 0)`;let g=f;if(this._lazyColumns){const C=this._getColumnsInOrder(),x=[...C].reverse().find(w=>!w.frozenToEnd&&!w._bodyContentHidden),E=this.__getColumnEnd(x),S=C.find(w=>w.frozenToEnd),A=this.__getColumnStart(S);g=`translate(${p+(A-E)+this.__lazyColumnsStart}px, 0)`}this._frozenToEndCells.forEach(C=>{this.$.items.contains(C)?C.style.transform=g:C.style.transform=f}),this.hasAttribute("navigating")&&this.__rowFocusMode&&this.$.table.style.setProperty("--_grid-horizontal-scroll-position",`${-c}px`)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Rt=a=>class extends a{static get properties(){return{selectedItems:{type:Object,notify:!0,value:()=>[],sync:!0},__selectedKeys:{type:Object,computed:"__computeSelectedKeys(itemIdPath, selectedItems)"}}}static get observers(){return["__selectedItemsChanged(itemIdPath, selectedItems)"]}_isSelected(e){return this.__selectedKeys.has(this.getItemId(e))}selectItem(e){this._isSelected(e)||(this.selectedItems=[...this.selectedItems,e])}deselectItem(e){this._isSelected(e)&&(this.selectedItems=this.selectedItems.filter(t=>!this._itemsEqual(t,e)))}_toggleItem(e){this._isSelected(e)?this.deselectItem(e):this.selectItem(e)}__selectedItemsChanged(){this.requestContentUpdate()}__computeSelectedKeys(e,t){const i=t||[],n=new Set;return i.forEach(s=>{n.add(this.getItemId(s))}),n}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */let Te="prepend";const Ft=a=>class extends a{static get properties(){return{multiSort:{type:Boolean,value:!1},multiSortPriority:{type:String,value:()=>Te},multiSortOnShiftClick:{type:Boolean,value:!1},_sorters:{type:Array,value:()=>[]},_previousSorters:{type:Array,value:()=>[]}}}static setDefaultMultiSortPriority(e){Te=["append","prepend"].includes(e)?e:"prepend"}ready(){super.ready(),this.addEventListener("sorter-changed",this._onSorterChanged)}_onSorterChanged(e){const t=e.target;e.stopPropagation(),t._grid=this,this.__updateSorter(t,e.detail.shiftClick,e.detail.fromSorterClick),this.__applySorters()}__removeSorters(e){e.length!==0&&(this._sorters=this._sorters.filter(t=>e.indexOf(t)<0),this.multiSort&&this.__updateSortOrders(),this.__applySorters())}__updateSortOrders(){this._sorters.forEach((e,t)=>{e._order=this._sorters.length>1?t:null})}__appendSorter(e){e.direction?this._sorters.includes(e)||this._sorters.push(e):this._removeArrayItem(this._sorters,e),this.__updateSortOrders()}__prependSorter(e){this._removeArrayItem(this._sorters,e),e.direction&&this._sorters.unshift(e),this.__updateSortOrders()}__updateSorter(e,t,i){if(!(!e.direction&&this._sorters.indexOf(e)===-1)){if(e._order=null,this.multiSort&&(!this.multiSortOnShiftClick||!i)||this.multiSortOnShiftClick&&t)this.multiSortPriority==="append"?this.__appendSorter(e):this.__prependSorter(e);else if(e.direction||this.multiSortOnShiftClick){const n=this._sorters.filter(s=>s!==e);this._sorters=e.direction?[e]:[],n.forEach(s=>{s._order=null,s.direction=null})}}}__applySorters(){this.dataProvider&&this.isAttached&&JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())&&this.__debounceClearCache(),this._a11yUpdateSorters(),this._previousSorters=this._mapSorters()}_mapSorters(){return this._sorters.map(e=>({path:e.path,direction:e.direction}))}_removeArrayItem(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pt=a=>class extends a{static get properties(){return{cellClassNameGenerator:{type:Function,sync:!0},cellPartNameGenerator:{type:Function,sync:!0}}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)","__cellPartNameGeneratorChanged(cellPartNameGenerator)"]}__cellClassNameGeneratorChanged(){this.generateCellClassNames()}__cellPartNameGeneratorChanged(){this.generateCellPartNames()}generateCellClassNames(){P(this.$.items,e=>{!e.hidden&&!e.hasAttribute("loading")&&this._generateCellClassNames(e,this.__getRowModel(e))})}generateCellPartNames(){P(this.$.items,e=>{!e.hidden&&!e.hasAttribute("loading")&&this._generateCellPartNames(e,this.__getRowModel(e))})}_generateCellClassNames(e,t){j(e,i=>{if(i.__generatedClasses&&i.__generatedClasses.forEach(n=>i.classList.remove(n)),this.cellClassNameGenerator){const n=this.cellClassNameGenerator(i._column,t);i.__generatedClasses=n&&n.split(" ").filter(s=>s.length>0),i.__generatedClasses&&i.__generatedClasses.forEach(s=>i.classList.add(s))}})}_generateCellPartNames(e,t){j(e,i=>{if(i.__generatedParts&&i.__generatedParts.forEach(n=>{H(i,null,n)}),this.cellPartNameGenerator){const n=this.cellPartNameGenerator(i._column,t);i.__generatedParts=n&&n.split(" ").filter(s=>s.length>0),i.__generatedParts&&i.__generatedParts.forEach(s=>{H(i,!0,s)})}})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Tt=a=>class extends gt(vt(xt(ut(zt(Rt(Ft(St(Et(ht(It(mt(Ct(wt(At(Pt(Je(a))))))))))))))))){static get observers(){return["_columnTreeChanged(_columnTree)","_flatSizeChanged(_flatSize, __virtualizer, _hasData, _columnTree)"]}static get properties(){return{_safari:{type:Boolean,value:et},_ios:{type:Boolean,value:we},_firefox:{type:Boolean,value:tt},_android:{type:Boolean,value:Ie},_touchDevice:{type:Boolean,value:Le},allRowsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},__pendingRecalculateColumnWidths:{type:Boolean,value:!0},isAttached:{value:!1},__gridElement:{type:Boolean,value:!0}}}constructor(){super(),this.addEventListener("animationend",this._onAnimationEnd)}get _firstVisibleIndex(){const r=this.__getFirstVisibleItem();return r?r.index:void 0}get _lastVisibleIndex(){const r=this.__getLastVisibleItem();return r?r.index:void 0}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.recalculateColumnWidths()}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this._hideTooltip(!0)}__getFirstVisibleItem(){return this._getRenderedRows().find(r=>this._isInViewport(r))}__getLastVisibleItem(){return this._getRenderedRows().reverse().find(r=>this._isInViewport(r))}_isInViewport(r){const e=this.$.table.getBoundingClientRect(),t=r.getBoundingClientRect(),i=this.$.header.getBoundingClientRect().height,n=this.$.footer.getBoundingClientRect().height;return t.bottom>e.top+i&&t.top<e.bottom-n}_getRenderedRows(){return Array.from(this.$.items.children).filter(r=>!r.hidden).sort((r,e)=>r.index-e.index)}_getRowContainingNode(r){const e=it("vaadin-grid-cell-content",r);return e?e.assignedSlot.parentElement.parentElement:void 0}_isItemAssignedToRow(r,e){const t=this.__getRowModel(e);return this.getItemId(r)===this.getItemId(t.item)}ready(){super.ready(),this.__virtualizer=new at({createElements:this._createScrollerRows.bind(this),updateElement:this._updateScrollerItem.bind(this),scrollContainer:this.$.items,scrollTarget:this.$.table,reorderElements:!0}),new ResizeObserver(()=>setTimeout(()=>{this.__updateColumnsBodyContentHidden(),this.__tryToRecalculateColumnWidthsIfPending()})).observe(this.$.table),Oe(this),this._tooltipController=new rt(this),this.addController(this._tooltipController),this._tooltipController.setManual(!0)}__getBodyCellCoordinates(r){if(this.$.items.contains(r)&&r.localName==="td")return{item:r.parentElement._item,column:r._column}}__focusBodyCell({item:r,column:e}){const t=this._getRenderedRows().find(n=>n._item===r),i=t&&[...t.children].find(n=>n._column===e);i&&i.focus()}_focusFirstVisibleRow(){const r=this.__getFirstVisibleItem();this.__rowFocusMode=!0,r.focus()}_flatSizeChanged(r,e,t,i){if(e&&t&&i){const n=this.shadowRoot.activeElement,s=this.__getBodyCellCoordinates(n),c=e.size||0;e.size=r,e.update(c-1,c-1),r<c&&e.update(r-1,r-1),s&&n.parentElement.hidden&&this.__focusBodyCell(s),this._resetKeyboardNavigation()}}__hasRowsWithClientHeight(){return!!Array.from(this.$.items.children).filter(r=>r.clientHeight).length}__getIntrinsicWidth(r){return this.__intrinsicWidthCache.has(r)||this.__calculateAndCacheIntrinsicWidths([r]),this.__intrinsicWidthCache.get(r)}__getDistributedWidth(r,e){if(r==null||r===this)return 0;const t=Math.max(this.__getIntrinsicWidth(r),this.__getDistributedWidth((r.assignedSlot||r).parentElement,r));if(!e)return t;const i=r,n=t,s=i._visibleChildColumns.map(f=>this.__getIntrinsicWidth(f)).reduce((f,g)=>f+g,0),c=Math.max(0,n-s),p=this.__getIntrinsicWidth(e)/s*c;return this.__getIntrinsicWidth(e)+p}_recalculateColumnWidths(r){this.__virtualizer.flush(),[...this.$.header.children,...this.$.footer.children].forEach(i=>{i.__debounceUpdateHeaderFooterRowVisibility&&i.__debounceUpdateHeaderFooterRowVisibility.flush()}),this._debouncerHiddenChanged&&this._debouncerHiddenChanged.flush(),this.__intrinsicWidthCache=new Map;const e=this._firstVisibleIndex,t=this._lastVisibleIndex;this.__viewportRowsCache=this._getRenderedRows().filter(i=>i.index>=e&&i.index<=t),this.__calculateAndCacheIntrinsicWidths(r),r.forEach(i=>{i.width=`${this.__getDistributedWidth(i)}px`})}__setVisibleCellContentAutoWidth(r,e){r._allCells.filter(t=>this.$.items.contains(t)?this.__viewportRowsCache.includes(t.parentElement):!0).forEach(t=>{t.__measuringAutoWidth=e,t.__measuringAutoWidth?(t.__originalWidth=t.style.width,t.style.width="auto",t.style.position="absolute"):(t.style.width=t.__originalWidth,delete t.__originalWidth,t.style.position="")})}__getAutoWidthCellsMaxWidth(r){return r._allCells.reduce((e,t)=>t.__measuringAutoWidth?Math.max(e,t.offsetWidth+1):e,0)}__calculateAndCacheIntrinsicWidths(r){r.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!0)),r.forEach(e=>{const t=this.__getAutoWidthCellsMaxWidth(e);this.__intrinsicWidthCache.set(e,t)}),r.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!1))}recalculateColumnWidths(){if(!this._columnTree)return;if(re(this)||this._dataProviderController.isLoading()){this.__pendingRecalculateColumnWidths=!0;return}const r=this._getColumns().filter(e=>!e.hidden&&e.autoWidth);this._recalculateColumnWidths(r)}__tryToRecalculateColumnWidthsIfPending(){this.__pendingRecalculateColumnWidths&&!re(this)&&!this._dataProviderController.isLoading()&&this.__hasRowsWithClientHeight()&&(this.__pendingRecalculateColumnWidths=!1,this.recalculateColumnWidths())}_onDataProviderPageLoaded(){super._onDataProviderPageLoaded(),this.__tryToRecalculateColumnWidthsIfPending()}_createScrollerRows(r){const e=[];for(let t=0;t<r;t++){const i=document.createElement("tr");i.setAttribute("part","row body-row"),i.setAttribute("role","row"),i.setAttribute("tabindex","-1"),this._columnTree&&this._updateRow(i,this._columnTree[this._columnTree.length-1],"body",!1,!0),e.push(i)}return this._columnTree&&this._columnTree[this._columnTree.length-1].forEach(t=>{t.isConnected&&t._cells&&(t._cells=[...t._cells])}),this.__afterCreateScrollerRowsDebouncer=F.debounce(this.__afterCreateScrollerRowsDebouncer,oe,()=>{this._afterScroll(),this.__tryToRecalculateColumnWidthsIfPending()}),e}_createCell(r,e){const i=`vaadin-grid-cell-content-${this._contentIndex=this._contentIndex+1||0}`,n=document.createElement("vaadin-grid-cell-content");n.setAttribute("slot",i);const s=document.createElement(r);s.id=i.replace("-content-","-"),s.setAttribute("role",r==="td"?"gridcell":"columnheader"),!Ie&&!we&&(s.addEventListener("mouseenter",u=>{this.$.scroller.hasAttribute("scrolling")||this._showTooltip(u)}),s.addEventListener("mouseleave",()=>{this._hideTooltip()}),s.addEventListener("mousedown",()=>{this._hideTooltip(!0)}));const c=document.createElement("slot");if(c.setAttribute("name",i),e&&e._focusButtonMode){const u=document.createElement("div");u.setAttribute("role","button"),u.setAttribute("tabindex","-1"),s.appendChild(u),s._focusButton=u,s.focus=function(){s._focusButton.focus()},u.appendChild(c)}else s.setAttribute("tabindex","-1"),s.appendChild(c);return s._content=n,n.addEventListener("mousedown",()=>{if(nt){const u=p=>{const f=n.contains(this.getRootNode().activeElement),g=p.composedPath().includes(n);!f&&g&&s.focus(),document.removeEventListener("mouseup",u,!0)};document.addEventListener("mouseup",u,!0)}else setTimeout(()=>{n.contains(this.getRootNode().activeElement)||s.focus()})}),s}_updateRow(r,e,t="body",i=!1,n=!1){const s=document.createDocumentFragment();j(r,c=>{c._vacant=!0}),r.innerHTML="",t==="body"&&(r.__cells=[],r.__detailsCell=null),e.filter(c=>!c.hidden).forEach((c,u,p)=>{let f;if(t==="body"){c._cells||(c._cells=[]),f=c._cells.find(C=>C._vacant),f||(f=this._createCell("td",c),c._cells.push(f)),f.setAttribute("part","cell body-cell"),f.__parentRow=r,r.__cells.push(f);const g=r===this.$.sizer;if((!c._bodyContentHidden||g)&&r.appendChild(f),g&&(c._sizerCell=f),u===p.length-1&&this.rowDetailsRenderer){this._detailsCells||(this._detailsCells=[]);const C=this._detailsCells.find(x=>x._vacant)||this._createCell("td");this._detailsCells.indexOf(C)===-1&&this._detailsCells.push(C),C._content.parentElement||s.appendChild(C._content),this._configureDetailsCell(C),r.appendChild(C),r.__detailsCell=C,this._a11ySetRowDetailsCell(r,C),C._vacant=!1}n||(c._cells=[...c._cells])}else{const g=t==="header"?"th":"td";i||c.localName==="vaadin-grid-column-group"?(f=c[`_${t}Cell`]||this._createCell(g),f._column=c,r.appendChild(f),c[`_${t}Cell`]=f):(c._emptyCells||(c._emptyCells=[]),f=c._emptyCells.find(C=>C._vacant)||this._createCell(g),f._column=c,r.appendChild(f),c._emptyCells.indexOf(f)===-1&&c._emptyCells.push(f)),f.part.add("cell",`${t}-cell`)}f._content.parentElement||s.appendChild(f._content),f._vacant=!1,f._column=c}),t!=="body"&&this.__debounceUpdateHeaderFooterRowVisibility(r),this.appendChild(s),this._frozenCellsChanged(),this._updateFirstAndLastColumnForRow(r)}__debounceUpdateHeaderFooterRowVisibility(r){r.__debounceUpdateHeaderFooterRowVisibility=F.debounce(r.__debounceUpdateHeaderFooterRowVisibility,U,()=>this.__updateHeaderFooterRowVisibility(r))}__updateHeaderFooterRowVisibility(r){if(!r)return;const e=Array.from(r.children).filter(t=>{const i=t._column;if(i._emptyCells&&i._emptyCells.indexOf(t)>-1)return!1;if(r.parentElement===this.$.header){if(i.headerRenderer)return!0;if(i.header===null)return!1;if(i.path||i.header!==void 0)return!0}else if(i.footerRenderer)return!0;return!1});r.hidden!==!e.length&&(r.hidden=!e.length),this._resetKeyboardNavigation()}_updateScrollerItem(r,e){this._preventScrollerRotatingCellFocus(r,e),this._columnTree&&(this._updateRowOrderParts(r,e),this._a11yUpdateRowRowindex(r,e),this._getItem(e,r))}_columnTreeChanged(r){this._renderColumnTree(r),this.recalculateColumnWidths(),this.__updateColumnsBodyContentHidden()}_updateRowOrderParts(r,e=r.index){X(r,{first:e===0,last:e===this._flatSize-1,odd:e%2!==0,even:e%2===0})}_updateRowStateParts(r,{expanded:e,selected:t,detailsOpened:i}){X(r,{expanded:e,collapsed:this.__isRowExpandable(r),selected:t,"details-opened":i})}_renderColumnTree(r){for(P(this.$.items,e=>{this._updateRow(e,r[r.length-1],"body",!1,!0);const t=this.__getRowModel(e);this._updateRowOrderParts(e),this._updateRowStateParts(e,t),this._filterDragAndDrop(e,t)});this.$.header.children.length<r.length;){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),e.setAttribute("tabindex","-1"),this.$.header.appendChild(e);const t=document.createElement("tr");t.setAttribute("part","row"),t.setAttribute("role","row"),t.setAttribute("tabindex","-1"),this.$.footer.appendChild(t)}for(;this.$.header.children.length>r.length;)this.$.header.removeChild(this.$.header.firstElementChild),this.$.footer.removeChild(this.$.footer.firstElementChild);P(this.$.header,(e,t,i)=>{this._updateRow(e,r[t],"header",t===r.length-1);const n=q(e);N(n,"first-header-row-cell",t===0),N(n,"last-header-row-cell",t===i.length-1)}),P(this.$.footer,(e,t,i)=>{this._updateRow(e,r[r.length-1-t],"footer",t===0);const n=q(e);N(n,"first-footer-row-cell",t===0),N(n,"last-footer-row-cell",t===i.length-1)}),this._updateRow(this.$.sizer,r[r.length-1]),this._resizeHandler(),this._frozenCellsChanged(),this._updateFirstAndLastColumn(),this._resetKeyboardNavigation(),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows(),this.generateCellClassNames(),this.generateCellPartNames(),this.__updateHeaderAndFooter()}_updateItem(r,e){r._item=e;const t=this.__getRowModel(r);this._toggleDetailsCell(r,t.detailsOpened),this._a11yUpdateRowLevel(r,t.level),this._a11yUpdateRowSelected(r,t.selected),this._updateRowStateParts(r,t),this._generateCellClassNames(r,t),this._generateCellPartNames(r,t),this._filterDragAndDrop(r,t),P(r,i=>{if(i._renderer){const n=i._column||this;i._renderer.call(n,i._content,n,t)}}),this._updateDetailsCellHeight(r),this._a11yUpdateRowExpanded(r,t.expanded)}_resizeHandler(){this._updateDetailsCellHeights(),this.__updateHorizontalScrollPosition()}_onAnimationEnd(r){r.animationName.indexOf("vaadin-grid-appear")===0&&(r.stopPropagation(),this.__tryToRecalculateColumnWidthsIfPending(),requestAnimationFrame(()=>{this.__scrollToPendingIndexes()}))}__getRowModel(r){return{index:r.index,item:r._item,level:this._getIndexLevel(r.index),expanded:this._isExpanded(r._item),selected:this._isSelected(r._item),detailsOpened:!!this.rowDetailsRenderer&&this._isDetailsOpened(r._item)}}_showTooltip(r){const e=this._tooltipController.node;e&&e.isConnected&&(this._tooltipController.setTarget(r.target),this._tooltipController.setContext(this.getEventContext(r)),e._stateController.open({focus:r.type==="focusin",hover:r.type==="mouseenter"}))}_hideTooltip(r){const e=this._tooltipController&&this._tooltipController.node;e&&e._stateController.close(r)}requestContentUpdate(){this.__updateHeaderAndFooter(),this.__updateVisibleRows()}__updateHeaderAndFooter(){(this._columnTree||[]).forEach(r=>{r.forEach(e=>{e._renderHeaderAndFooter&&e._renderHeaderAndFooter()})})}__updateVisibleRows(r,e){this.__virtualizer&&this.__virtualizer.update(r,e)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Dt=ce`
  @keyframes vaadin-grid-appear {
    to {
      opacity: 1;
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    animation: 1ms vaadin-grid-appear;
    height: 400px;
    flex: 1 1 auto;
    align-self: stretch;
    position: relative;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  #scroller {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    transform: translateY(0);
    width: auto;
    height: auto;
    position: absolute;
    inset: 0;
  }

  :host([all-rows-visible]) {
    height: auto;
    align-self: flex-start;
    flex-grow: 0;
    width: 100%;
  }

  :host([all-rows-visible]) #scroller {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :host([all-rows-visible]) #items {
    min-height: 1px;
  }

  #table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    outline: none;
    /* Workaround for a Desktop Safari bug: new stacking context here prevents the scrollbar from getting hidden */
    z-index: 0;
  }

  #header,
  #footer {
    display: block;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    overflow: visible;
    width: 100%;
    z-index: 1;
  }

  #header {
    top: 0;
  }

  th {
    text-align: inherit;
  }

  /* Safari doesn't work with "inherit" */
  [safari] th {
    text-align: initial;
  }

  #footer {
    bottom: 0;
  }

  #items {
    flex-grow: 1;
    flex-shrink: 0;
    display: block;
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    left: 0;
    overflow: visible;
  }

  [part~='row'] {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  [part~='row'][loading] [part~='body-cell'] ::slotted(vaadin-grid-cell-content) {
    visibility: hidden;
  }

  [column-rendering='lazy'] [part~='body-cell']:not([frozen]):not([frozen-to-end]) {
    transform: translateX(var(--_grid-lazy-columns-start));
  }

  #items [part~='row'] {
    position: absolute;
  }

  #items [part~='row']:empty {
    height: 100%;
  }

  [part~='cell']:not([part~='details-cell']) {
    flex-shrink: 0;
    flex-grow: 1;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding: 0;
    white-space: nowrap;
  }

  [part~='cell'] > [tabindex] {
    display: flex;
    align-items: inherit;
    outline: none;
    position: absolute;
    inset: 0;
  }

  [part~='details-cell'] {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [hidden] {
    display: none !important;
  }

  [frozen],
  [frozen-to-end] {
    z-index: 2;
    will-change: transform;
  }

  [no-scrollbars][safari] #table,
  [no-scrollbars][firefox] #table {
    overflow: hidden;
  }

  /* Reordering styles */
  :host([reordering]) [part~='cell'] ::slotted(vaadin-grid-cell-content),
  :host([reordering]) [part~='resize-handle'],
  #scroller[no-content-pointer-events] [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    pointer-events: none;
  }

  [part~='reorder-ghost'] {
    visibility: hidden;
    position: fixed;
    pointer-events: none;
    opacity: 0.5;

    /* Prevent overflowing the grid in Firefox */
    top: 0;
    left: 0;
  }

  :host([reordering]) {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Resizing styles */
  [part~='resize-handle'] {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    cursor: col-resize;
    z-index: 1;
  }

  [part~='resize-handle']::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 35px;
    transform: translateX(-50%);
  }

  [last-column] [part~='resize-handle']::before,
  [last-frozen] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
    right: 0;
  }

  [frozen-to-end] [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  [frozen-to-end] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  [first-frozen-to-end] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
  }

  [first-frozen-to-end] {
    margin-inline-start: auto;
  }

  /* Hide resize handle if scrolled to end */
  :host(:not([overflow~='end'])) [first-frozen-to-end] [part~='resize-handle'] {
    display: none;
  }

  #scroller[column-resizing] {
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Sizer styles */
  #sizer {
    display: flex;
    position: absolute;
    visibility: hidden;
  }

  #sizer [part~='details-cell'] {
    display: none !important;
  }

  #sizer [part~='cell'][hidden] {
    display: none !important;
  }

  #sizer [part~='cell'] {
    display: block;
    flex-shrink: 0;
    line-height: 0;
    height: 0 !important;
    min-height: 0 !important;
    max-height: 0 !important;
    padding: 0 !important;
    border: none !important;
  }

  #sizer [part~='cell']::before {
    content: '-';
  }

  #sizer [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: none !important;
  }

  /* RTL specific styles */

  :host([dir='rtl']) #items,
  :host([dir='rtl']) #header,
  :host([dir='rtl']) #footer {
    left: auto;
  }

  :host([dir='rtl']) [part~='reorder-ghost'] {
    left: auto;
    right: 0;
  }

  :host([dir='rtl']) [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [part~='resize-handle']::before {
    transform: translateX(50%);
  }

  :host([dir='rtl']) [last-column] [part~='resize-handle']::before,
  :host([dir='rtl']) [last-frozen] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle'] {
    right: 0;
    left: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle']::before {
    right: 0;
    left: auto;
  }

  @media (forced-colors: active) {
    [part~='selected-row'] [part~='first-column-cell']::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border: 2px solid;
    }

    [part~='focused-cell']::before {
      outline: 2px solid !important;
      outline-offset: -1px;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */de("vaadin-grid",Dt,{moduleId:"vaadin-grid-styles"});class Z extends Tt(st(Ne(ot(ae)))){static get template(){return Me`
      <div
        id="scroller"
        safari$="[[_safari]]"
        ios$="[[_ios]]"
        loading$="[[loading]]"
        column-reordering-allowed$="[[columnReorderingAllowed]]"
      >
        <table id="table" role="treegrid" aria-multiselectable="true" tabindex="0">
          <caption id="sizer" part="row"></caption>
          <thead id="header" role="rowgroup"></thead>
          <tbody id="items" role="rowgroup"></tbody>
          <tfoot id="footer" role="rowgroup"></tfoot>
        </table>

        <div part="reorder-ghost"></div>
      </div>

      <slot name="tooltip"></slot>

      <div id="focusexit" tabindex="0"></div>
    `}static get is(){return"vaadin-grid"}}le(Z);de("vaadin-grid-sorter",ce`
    :host {
      justify-content: flex-start;
      align-items: baseline;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      cursor: var(--lumo-clickable-cursor);
    }

    [part='content'] {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [part='indicators'] {
      margin-left: var(--lumo-space-s);
    }

    [part='indicators']::before {
      transform: scale(0.8);
    }

    :host(:not([direction]):not(:hover)) [part='indicators'] {
      color: var(--lumo-tertiary-text-color);
    }

    :host([direction]) {
      color: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
    }

    [part='order'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part='indicators'] {
      margin-right: var(--lumo-space-s);
      margin-left: 0;
    }
  `,{moduleId:"lumo-grid-sorter"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const je=document.createElement("template");je.innerHTML=`
  <style>
    @font-face {
      font-family: 'vaadin-grid-sorter-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;document.head.appendChild(je.content);de("vaadin-grid-sorter",ce`
    :host {
      display: inline-flex;
      cursor: pointer;
      max-width: 100%;
    }

    [part='content'] {
      flex: 1 1 auto;
    }

    [part='indicators'] {
      position: relative;
      align-self: center;
      flex: none;
    }

    [part='order'] {
      display: inline;
      vertical-align: super;
    }

    [part='indicators']::before {
      font-family: 'vaadin-grid-sorter-icons';
      display: inline-block;
    }

    :host(:not([direction])) [part='indicators']::before {
      content: '\\e901';
    }

    :host([direction='asc']) [part='indicators']::before {
      content: '\\e900';
    }

    :host([direction='desc']) [part='indicators']::before {
      content: '\\e902';
    }
  `,{moduleId:"vaadin-grid-sorter-styles"});const $t=a=>class extends a{static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null,sync:!0},_order:{type:Number,value:null,sync:!0},_isConnected:{type:Boolean,observer:"__isConnectedChanged"}}}static get observers(){return["_pathOrDirectionChanged(path, direction)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1,!this.parentNode&&this._grid&&this._grid.__removeSorters([this])}_pathOrDirectionChanged(){this.__dispatchSorterChangedEvenIfPossible()}__isConnectedChanged(e,t){t!==!1&&this.__dispatchSorterChangedEvenIfPossible()}__dispatchSorterChangedEvenIfPossible(){this.path===void 0||this.direction===void 0||!this._isConnected||(this.dispatchEvent(new CustomEvent("sorter-changed",{detail:{shiftClick:!!this._shiftClick,fromSorterClick:!!this._fromSorterClick},bubbles:!0,composed:!0})),this._fromSorterClick=!1,this._shiftClick=!1)}_getDisplayOrder(e){return e===null?"":e+1}_onClick(e){if(e.defaultPrevented)return;const t=this.getRootNode().activeElement;this!==t&&this.contains(t)||(e.preventDefault(),this._shiftClick=e.shiftKey,this._fromSorterClick=!0,this.direction==="asc"?this.direction="desc":this.direction==="desc"?this.direction=null:this.direction="asc")}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ot extends $t(Ne(ke(ae))){static get template(){return Me`
      <div part="content">
        <slot></slot>
      </div>
      <div part="indicators">
        <span part="order">[[_getDisplayOrder(_order)]]</span>
      </div>
    `}static get is(){return"vaadin-grid-sorter"}}le(Ot);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const kt=a=>class extends a{static get properties(){return{width:{type:String,value:"58px",sync:!0},flexGrow:{type:Number,value:0,sync:!0},selectAll:{type:Boolean,value:!1,notify:!0,sync:!0},autoSelect:{type:Boolean,value:!1,sync:!0},dragSelect:{type:Boolean,value:!1,sync:!0},_indeterminate:{type:Boolean,sync:!0},_selectAllHidden:Boolean}}static get observers(){return["_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header, selectAll, _indeterminate, _selectAllHidden)"]}_defaultHeaderRenderer(e,t){let i=e.firstElementChild;i||(i=document.createElement("vaadin-checkbox"),i.setAttribute("aria-label","Select All"),i.classList.add("vaadin-grid-select-all-checkbox"),e.appendChild(i),i.addEventListener("checked-changed",this.__onSelectAllCheckedChanged.bind(this)));const n=this.__isChecked(this.selectAll,this._indeterminate);i.__rendererChecked=n,i.checked=n,i.hidden=this._selectAllHidden,i.indeterminate=this._indeterminate}_defaultRenderer(e,t,{item:i,selected:n}){let s=e.firstElementChild;s||(s=document.createElement("vaadin-checkbox"),s.setAttribute("aria-label","Select Row"),e.appendChild(s),s.addEventListener("checked-changed",this.__onSelectRowCheckedChanged.bind(this)),pe(e,"track",this.__onCellTrack.bind(this)),e.addEventListener("mousedown",this.__onCellMouseDown.bind(this)),e.addEventListener("click",this.__onCellClick.bind(this))),s.__item=i,s.__rendererChecked=n,s.checked=n}__onSelectAllCheckedChanged(e){e.target.checked!==e.target.__rendererChecked&&(this._indeterminate||e.target.checked?this._selectAll():this._deselectAll())}__onSelectRowCheckedChanged(e){e.target.checked!==e.target.__rendererChecked&&(e.target.checked?this._selectItem(e.target.__item):this._deselectItem(e.target.__item))}__onCellTrack(e){if(this.dragSelect)if(this.__dragCurrentY=e.detail.y,this.__dragDy=e.detail.dy,e.detail.state==="start"){const i=this._grid._getRenderedRows().find(n=>n.contains(e.currentTarget.assignedSlot));this.__selectOnDrag=!this._grid._isSelected(i._item),this.__dragStartIndex=i.index,this.__dragStartItem=i._item,this.__dragAutoScroller()}else e.detail.state==="end"&&(this.__dragStartItem&&(this.__selectOnDrag?this._selectItem(this.__dragStartItem):this._deselectItem(this.__dragStartItem)),setTimeout(()=>{this.__dragStartIndex=void 0}))}__onCellMouseDown(e){this.dragSelect&&e.preventDefault()}__onCellClick(e){this.__dragStartIndex!==void 0&&e.preventDefault()}__dragAutoScroller(){if(this.__dragStartIndex===void 0)return;const e=this._grid._getRenderedRows(),t=e.find(u=>{const p=u.getBoundingClientRect();return this.__dragCurrentY>=p.top&&this.__dragCurrentY<=p.bottom});let i=t?t.index:void 0;const n=this.__getScrollableArea();this.__dragCurrentY<n.top?i=this._grid._firstVisibleIndex:this.__dragCurrentY>n.bottom&&(i=this._grid._lastVisibleIndex),i!==void 0&&e.forEach(u=>{(i>this.__dragStartIndex&&u.index>=this.__dragStartIndex&&u.index<=i||i<this.__dragStartIndex&&u.index<=this.__dragStartIndex&&u.index>=i)&&(this.__selectOnDrag?this._selectItem(u._item):this._deselectItem(u._item),this.__dragStartItem=void 0)});const s=n.height*.15,c=10;if(this.__dragDy<0&&this.__dragCurrentY<n.top+s){const u=n.top+s-this.__dragCurrentY,p=Math.min(1,u/s);this._grid.$.table.scrollTop-=p*c}if(this.__dragDy>0&&this.__dragCurrentY>n.bottom-s){const u=this.__dragCurrentY-(n.bottom-s),p=Math.min(1,u/s);this._grid.$.table.scrollTop+=p*c}setTimeout(()=>this.__dragAutoScroller(),10)}__getScrollableArea(){const e=this._grid.$.table.getBoundingClientRect(),t=this._grid.$.header.getBoundingClientRect(),i=this._grid.$.footer.getBoundingClientRect();return{top:e.top+t.height,bottom:e.bottom-i.height,left:e.left,right:e.right,height:e.height-t.height-i.height,width:e.width}}_selectAll(){}_deselectAll(){}_selectItem(e){}_deselectItem(e){}__isChecked(e,t){return t||e}};class fe extends kt(Ge){static get is(){return"vaadin-grid-flow-selection-column"}static get properties(){return{autoWidth:{type:Boolean,value:!0},width:{type:String,value:"56px"}}}_defaultHeaderRenderer(r,e){super._defaultHeaderRenderer(r,e);const t=r.firstElementChild;t&&(t.id="selectAllCheckbox")}_selectAll(){this.selectAll=!0,this.$server.selectAll()}_deselectAll(){this.selectAll=!1,this.$server.deselectAll()}_selectItem(r){this._grid.$connector.doSelection([r],!0)}_deselectItem(r){this._grid.$connector.doDeselection([r],!0),this.selectAll=!1}}customElements.define(fe.is,fe);(function(){const a=function(r){return window.Vaadin.Flow.tryCatchWrapper(r,"Vaadin Grid")};window.Vaadin.Flow.gridConnector={initLazy:r=>a(function(e){if(e.$connector)return;const t=e._dataProviderController;t.ensureFlatIndexHierarchyOriginal=t.ensureFlatIndexHierarchy,t.ensureFlatIndexHierarchy=a(function(o){const{item:l}=this.getFlatIndexContext(o);if(!l||!this.isExpanded(l))return;e.$connector.hasCacheForParentKey(e.getItemId(l))?this.ensureFlatIndexHierarchyOriginal(o):e.$connector.beforeEnsureFlatIndexHierarchy(o,l)}),t.isLoadingOriginal=t.isLoading,t.isLoading=a(function(){return e.$connector.hasEnsureSubCacheQueue()||this.isLoadingOriginal()});const i={},n={},s={},c=50,u=20;let p=[],f,g=[],C;const x=150;let E,S={};const A="null";S[A]=[0,0];const L=["SINGLE","NONE","MULTI"];let w={},T="SINGLE",k=!1;e.size=0,e.itemIdPath="key";function I(o){return{[e.itemIdPath]:o}}e.$connector={},e.$connector.hasCacheForParentKey=a(o=>{var l;return((l=s[o])==null?void 0:l.size)!==void 0}),e.$connector.hasEnsureSubCacheQueue=a(()=>g.length>0),e.$connector.hasParentRequestQueue=a(()=>p.length>0),e.$connector.hasRootRequestQueue=a(()=>Object.keys(i).length>0||!!(E!=null&&E.isActive())),e.$connector.beforeEnsureFlatIndexHierarchy=a(function(o,l){g.push({flatIndex:o,itemkey:e.getItemId(l)}),C=ie.debounce(C,Ee,()=>{for(;g.length;)e.$connector.flushEnsureSubCache()})}),e.$connector.doSelection=a(function(o,l){T==="NONE"||!o.length||l&&e.hasAttribute("disabled")||(T==="SINGLE"&&(w={}),o.forEach(d=>{d&&(w[d.key]=d,d.selected=!0,l&&e.$server.select(d.key));const h=!e.activeItem||!d||d.key!=e.activeItem.key;!l&&T==="SINGLE"&&h&&(e.activeItem=d)}),e.selectedItems=Object.values(w))}),e.$connector.doDeselection=a(function(o,l){if(T==="NONE"||!o.length||l&&e.hasAttribute("disabled"))return;const d=e.selectedItems.slice();for(;o.length;){const h=o.shift();for(let _=0;_<d.length;_++){const m=d[_];if((h==null?void 0:h.key)===m.key){d.splice(_,1);break}}h&&(delete w[h.key],delete h.selected,l&&e.$server.deselect(h.key))}e.selectedItems=d}),e.__activeItemChanged=a(function(o,l){T=="SINGLE"&&(o?w[o.key]||e.$connector.doSelection([o],!0):l&&w[l.key]&&(e.__deselectDisallowed?e.activeItem=l:e.$connector.doDeselection([l],!0)))}),e._createPropertyObserver("activeItem","__activeItemChanged",!0),e.__activeItemChangedDetails=a(function(o,l){e.__disallowDetailsOnClick||o==null&&l===void 0||(o&&!o.detailsOpened?e.$server.setDetailsVisible(o.key):e.$server.setDetailsVisible(null))}),e._createPropertyObserver("activeItem","__activeItemChangedDetails",!0),e.$connector._getSameLevelPage=a(function(o,l,d){if((l.parentItem?e.getItemId(l.parentItem):A)===o)return Math.floor(d/e.pageSize);const{parentCache:_,parentCacheIndex:m}=l;return _?this._getSameLevelPage(o,_,m):null}),e.$connector.flushEnsureSubCache=a(function(){const o=g.shift();return o?(t.ensureFlatIndexHierarchyOriginal(o.flatIndex),!0):!1}),e.$connector.debounceRootRequest=a(function(o){const l=e._hasData?x:0;E=ie.debounce(E,Se.after(l),()=>{e.$connector.fetchPage((d,h)=>e.$server.setRequestedRange(d,h),o,A)})}),e.$connector.flushParentRequests=a(function(){const o=[];p.splice(0,u).forEach(({parentKey:l,page:d})=>{e.$connector.fetchPage((h,_)=>o.push({parentKey:l,firstIndex:h,size:_}),d,l)}),o.length&&e.$server.setParentRequestedRanges(o)}),e.$connector.debounceParentRequest=a(function(o,l){p=p.filter(d=>d.parentKey!==o),p.push({parentKey:o,page:l}),f=ie.debounce(f,Se.after(c),()=>{for(;p.length;)e.$connector.flushParentRequests()})}),e.$connector.fetchPage=a(function(o,l,d){d===A&&(l=Math.min(l,Math.floor((e.size-1)/e.pageSize)));const h=e._getRenderedRows();let _=h.length>0?h[0].index:0,m=h.length>0?h[h.length-1].index:0,b=m-_,z=Math.max(0,_-b),v=Math.min(m+b,e._flatSize),y=[null,null];for(let O=z;O<=v;O++){const{cache:Y,index:Ye}=t.getFlatIndexContext(O),K=e.$connector._getSameLevelPage(d,Y,Ye);K!==null&&(y[0]=Math.min(y[0]??K,K),y[1]=Math.max(y[1]??K,K))}(y.some(O=>O===null)||l<y[0]||l>y[1])&&(y=[l,l]);let D=S[d]||[-1,-1];if(D[0]!=y[0]||D[1]!=y[1]){S[d]=y;let O=y[1]-y[0]+1;o(y[0]*e.pageSize,O*e.pageSize)}}),e.dataProvider=a(function(o,l){var h,_;if(o.pageSize!=e.pageSize)throw"Invalid pageSize";let d=o.page;if(o.parentItem){let m=e.getItemId(o.parentItem);n[m]||(n[m]={});const b=t.getItemContext(o.parentItem);(h=s[m])!=null&&h[d]&&b.subCache?(d=Math.min(d,Math.floor(s[m].size/e.pageSize)),g=[],l(s[m][d],s[m].size)):(n[m][d]=l,e.$connector.debounceParentRequest(m,d))}else{if(d=Math.min(d,Math.floor(e.size/e.pageSize)),e.size===0){l([],0);return}(_=s[A])!=null&&_[d]?l(s[A][d]):(i[d]=l,e.$connector.debounceRootRequest(d))}}),e.$connector.setSorterDirections=a(function(o){k=!0,setTimeout(a(()=>{try{const l=Array.from(e.querySelectorAll("vaadin-grid-sorter"));e._sorters.forEach(d=>{l.includes(d)||l.push(d)}),l.forEach(d=>{d.direction=null}),e.multiSortPriority!=="append"&&(o=o.reverse()),o.forEach(({column:d,direction:h})=>{l.forEach(_=>{_.getAttribute("path")===d&&(_.direction=h)})})}finally{k=!1}}))}),e._updateItem=a(function(o,l){Z.prototype._updateItem.call(e,o,l),o.hidden||Array.from(o.children).forEach(d=>{var h,_;Array.from(((_=(h=d==null?void 0:d._content)==null?void 0:h.__templateInstance)==null?void 0:_.children)||[]).forEach(m=>{m._attachRenderedComponentIfAble&&m._attachRenderedComponentIfAble(),Array.from((m==null?void 0:m.children)||[]).forEach(b=>{b._attachRenderedComponentIfAble&&b._attachRenderedComponentIfAble()})})}),T===L[1]&&(o.removeAttribute("aria-selected"),Array.from(o.children).forEach(d=>d.removeAttribute("aria-selected")))});const $=a(function(o,l){if(o==null||e.$server.updateExpandedState==null)return;let d=e.getItemId(o);e.$server.updateExpandedState(d,l)});e.expandItem=a(function(o){$(o,!0),Z.prototype.expandItem.call(e,o)}),e.collapseItem=a(function(o){$(o,!1),Z.prototype.collapseItem.call(e,o)});const W=function(o){if(!o||!Array.isArray(o))throw"Attempted to call itemsUpdated with an invalid value: "+JSON.stringify(o);let l=Array.from(e.detailsOpenedItems),d=!1;for(let h=0;h<o.length;++h){const _=o[h];_&&(_.detailsOpened?e._getItemIndexInArray(_,l)<0&&l.push(_):e._getItemIndexInArray(_,l)>=0&&l.splice(e._getItemIndexInArray(_,l),1),w[_.key]&&(w[_.key]=_,_.selected=!0,d=!0))}e.detailsOpenedItems=l,d&&e.selectedItems.splice(0,e.selectedItems.length,...Object.values(w))},ue=function(o,l){let d;if((l||A)!==A){d=s[l][o];const h=I(l),_=t.getItemContext(h);if(_&&_.subCache){const m=n[l],b=m&&m[o];Ce(o,d,b,_.subCache)}}else d=s[A][o],Ce(o,d,i[o],t.rootCache);return d},Ce=function(o,l,d,h){if(!d){let _=o*e.pageSize,m=_+e.pageSize;if(l){if(h&&h.items)for(let b=_;b<m;b++)h.items[b]&&(h.items[b]=l[b-_])}else if(h&&h.items)for(let b=_;b<m;b++)delete h.items[b]}},be=function(){_e(),e.__updateVisibleRows()},_e=function(){t.recalculateFlatSize(),e._flatSize=t.flatSize},ee=function(o){if(!o||!e.$||e.$.items.childElementCount===0)return;const l=o.map(h=>h.key),d=e._getRenderedRows().filter(h=>h._item&&l.includes(h._item.key)).map(h=>h.index);d.length>0&&e.__updateVisibleRows(d[0],d[d.length-1])};e.$connector.set=a(function(o,l,d){if(o%e.pageSize!=0)throw"Got new data to index "+o+" which is not aligned with the page size of "+e.pageSize;let h=d||A;const _=o/e.pageSize,m=Math.ceil(l.length/e.pageSize);for(let b=0;b<m;b++){let z=_+b,v=l.slice(b*e.pageSize,(b+1)*e.pageSize);s[h]||(s[h]={}),s[h][z]=v,e.$connector.doSelection(v.filter(D=>D.selected)),e.$connector.doDeselection(v.filter(D=>!D.selected&&w[D.key]));const y=ue(z,h);y&&(W(y),ee(y))}});const ve=function(o){let l=o.parentUniqueKey||A;if(s[l]){for(let d in s[l])for(let h in s[l][d])if(e.getItemId(s[l][d][h])===e.getItemId(o))return{page:d,index:h,parentKey:l}}return null};e.$connector.updateHierarchicalData=a(function(o){let l=[];for(let h=0;h<o.length;h++){let _=ve(o[h]);if(_){s[_.parentKey][_.page][_.index]=o[h];let m=_.parentKey+":"+_.page;l[m]||(l[m]={parentKey:_.parentKey,page:_.page})}}let d=Object.keys(l);for(let h=0;h<d.length;h++){let _=l[d[h]];const m=ue(_.page,_.parentKey);m&&(W(m),ee(m))}}),e.$connector.updateFlatData=a(function(o){for(let l=0;l<o.length;l++){let d=ve(o[l]);if(d){s[d.parentKey][d.page][d.index]=o[l];const h=parseInt(d.page)*e.pageSize+parseInt(d.index),{rootCache:_}=t;_.items[h]&&(_.items[h]=o[l])}}W(o),ee(o)}),e.$connector.clearExpanded=a(function(){e.expandedItems=[],g=[],p=[]}),e.$connector.clear=a(function(o,l,d){let h=d||A;if(!s[h]||Object.keys(s[h]).length===0)return;if(o%e.pageSize!=0)throw"Got cleared data for index "+o+" which is not aligned with the page size of "+e.pageSize;let _=Math.floor(o/e.pageSize),m=Math.ceil(l/e.pageSize);for(let v=0;v<m;v++){let y=_+v,D=s[h][y];e.$connector.doDeselection(D.filter(Y=>w[Y.key])),D.forEach(Y=>e.closeItemDetails(Y)),delete s[h][y];const O=ue(y,d);O&&W(O),ee(D)}let b=t.rootCache;if(d){const v=I(h);b=t.getItemContext(v).subCache}const z=o+m*e.pageSize;for(let v=o;v<z;v++)delete b.items[v],b.removeSubCache(v);_e()}),e.$connector.reset=a(function(){e.size=0,te(s),te(t.rootCache.items),te(S),C&&C.cancel(),f&&f.cancel(),E&&E.cancel(),C=void 0,f=void 0,g=[],p=[],be()});const te=o=>Object.keys(o).forEach(l=>delete o[l]);e.$connector.updateSize=o=>e.size=o,e.$connector.updateUniqueItemIdPath=o=>e.itemIdPath=o,e.$connector.expandItems=a(function(o){let l=Array.from(e.expandedItems);o.filter(d=>!e._isExpanded(d)).forEach(d=>l.push(d)),e.expandedItems=l}),e.$connector.collapseItems=a(function(o){let l=Array.from(e.expandedItems);o.forEach(d=>{let h=e._getItemIndexInArray(d,l);h>=0&&l.splice(h,1)}),e.expandedItems=l,o.forEach(d=>e.$connector.removeFromQueue(d))}),e.$connector.removeFromQueue=a(function(o){let l=e.getItemId(o);Object.values(n[l]||{}).forEach(d=>d([])),delete n[l],g=g.filter(d=>d.itemkey!==l),p=p.filter(d=>d.parentKey!==l)}),e.$connector.confirmParent=a(function(o,l,d){s[l]||(s[l]={});const h=s[l].size!==d;s[l].size=d,d===0&&(s[l][0]=[]);let _=Object.getOwnPropertyNames(n[l]||{});for(let m=0;m<_.length;m++){let b=_[m],z=S[l]||[0,0];const v=n[l][b];if(s[l]&&s[l][b]||b<z[0]||b>z[1]){delete n[l][b];let y=s[l][b]||new Array(d);v(y,d)}else v&&d===0&&(delete n[l][b],v([],d))}if(h&&_.length===0){const m=I(l),b=t.getItemContext(m);b&&b.subCache&&(b.subCache.size=d),_e()}e.$server.confirmParentUpdate(o,l),e.loading||(e.__confirmParentUpdateDebouncer=ie.debounce(e.__confirmParentUpdateDebouncer,Ee,()=>e.__updateVisibleRows()))}),e.$connector.confirm=a(function(o){var d;let l=Object.getOwnPropertyNames(i);for(let h=0;h<l.length;h++){let _=l[h],m=S[A]||[0,0];const b=e.size?Math.ceil(e.size/e.pageSize)-1:0,z=Math.min(m[1],b),v=i[_];(d=s[A])!=null&&d[_]||_<m[0]||+_>z?(delete i[_],s[A][_]?v(s[A][_]):(v(new Array(e.pageSize)),e.requestContentUpdate())):v&&e.size===0&&(delete i[_],v([]))}Object.keys(i).length&&delete S[A],e.$server.confirmUpdate(o)}),e.$connector.ensureHierarchy=a(function(){for(let o in s)o!==A&&delete s[o];te(S),t.rootCache.removeSubCaches(),be()}),e.$connector.setSelectionMode=a(function(o){if((typeof o=="string"||o instanceof String)&&L.indexOf(o)>=0)T=o,w={},e.$connector.updateMultiSelectable();else throw"Attempted to set an invalid selection mode"}),e.$connector.updateMultiSelectable=a(function(){e.$&&(T===L[0]?e.$.table.setAttribute("aria-multiselectable",!1):T===L[1]?e.$.table.removeAttribute("aria-multiselectable"):e.$.table.setAttribute("aria-multiselectable",!0))}),e._createPropertyObserver("isAttached",()=>e.$connector.updateMultiSelectable());const ye=o=>l=>{o&&(o(l),o=null)};e.$connector.setHeaderRenderer=a(function(o,l){const{content:d,showSorter:h,sorterPath:_}=l;if(d===null){o.headerRenderer=null;return}o.headerRenderer=ye(m=>{m.innerHTML="";let b=m;if(h){const z=document.createElement("vaadin-grid-sorter");z.setAttribute("path",_);const v=d instanceof Node?d.textContent:d;v&&z.setAttribute("aria-label",`Sort by ${v}`),m.appendChild(z),b=z}d instanceof Node?b.appendChild(d):b.textContent=d})}),e.__applySorters=()=>{const o=e._mapSorters(),l=JSON.stringify(e._previousSorters)!==JSON.stringify(o);e._previousSorters=o,Z.prototype.__applySorters.call(e),l&&!k&&e.$server.sortersChanged(o)},e.$connector.setFooterRenderer=a(function(o,l){const{content:d}=l;if(d===null){o.footerRenderer=null;return}o.footerRenderer=ye(h=>{h.innerHTML="",d instanceof Node?h.appendChild(d):h.textContent=d})}),e.addEventListener("vaadin-context-menu-before-open",a(function(o){const{key:l,columnId:d}=o.detail;e.$server.updateContextMenuTargetItem(l,d)})),e.getContextMenuBeforeOpenDetail=a(function(o){var m,b;const l=o.detail.sourceEvent||o,d=e.getEventContext(l),h=((m=d.item)==null?void 0:m.key)||"",_=((b=d.column)==null?void 0:b.id)||"";return{key:h,columnId:_}}),e.preventContextMenu=a(function(o){const l=o.type==="click",{column:d}=e.getEventContext(o);return l&&d instanceof fe}),e.addEventListener("click",a(o=>Ae(o,"item-click"))),e.addEventListener("dblclick",a(o=>Ae(o,"item-double-click"))),e.addEventListener("column-resize",a(o=>{e._getColumnsInOrder().filter(d=>!d.hidden).forEach(d=>{d.dispatchEvent(new CustomEvent("column-drag-resize"))}),e.dispatchEvent(new CustomEvent("column-drag-resize",{detail:{resizedColumnKey:o.detail.resizedColumn._flowId}}))})),e.addEventListener("column-reorder",a(o=>{const l=e._columnTree.slice(0).pop().filter(d=>d._flowId).sort((d,h)=>d._order-h._order).map(d=>d._flowId);e.dispatchEvent(new CustomEvent("column-reorder-all-columns",{detail:{columns:l}}))})),e.addEventListener("cell-focus",a(o=>{const l=e.getEventContext(o);["header","body","footer"].indexOf(l.section)!==-1&&e.dispatchEvent(new CustomEvent("grid-cell-focus",{detail:{itemKey:l.item?l.item.key:null,internalColumnId:l.column?l.column._flowId:null,section:l.section}}))}));function Ae(o,l){if(o.defaultPrevented)return;const d=o.target;if(We(d)||d instanceof HTMLLabelElement)return;const h=e.getEventContext(o),_=h.section;h.item&&_!=="details"&&(o.itemKey=h.item.key,h.column&&(o.internalColumnId=h.column._flowId),e.dispatchEvent(new CustomEvent(l,{detail:o})))}e.cellClassNameGenerator=a(function(o,l){const d=l.item.style;if(d)return(d.row||"")+" "+(o&&d[o._flowId]||"")}),e.cellPartNameGenerator=a(function(o,l){const d=l.item.part;if(d)return(d.row||"")+" "+(o&&d[o._flowId]||"")}),e.dropFilter=a(o=>o.item&&!o.item.dropDisabled),e.dragFilter=a(o=>o.item&&!o.item.dragDisabled),e.addEventListener("grid-dragstart",a(o=>{e._isSelected(o.detail.draggedItems[0])?(e.__selectionDragData?Object.keys(e.__selectionDragData).forEach(l=>{o.detail.setDragData(l,e.__selectionDragData[l])}):(e.__dragDataTypes||[]).forEach(l=>{o.detail.setDragData(l,o.detail.draggedItems.map(d=>d.dragData[l]).join(`
`))}),e.__selectionDraggedItemsCount>1&&o.detail.setDraggedItemsCount(e.__selectionDraggedItemsCount)):(e.__dragDataTypes||[]).forEach(l=>{o.detail.setDragData(l,o.detail.draggedItems[0].dragData[l])})}))})(r)}})();
