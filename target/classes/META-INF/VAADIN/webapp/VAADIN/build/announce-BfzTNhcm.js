import{b as a,c as l}from"./chunk-422c3a2ad42cb7c26cccff5ea772b37973c9526da5f9baabc6ba2b82c6284122-BWrh5vjC.js";/**
 * @license
 * Copyright (c) 2022 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const e=document.createElement("div");e.style.position="fixed";e.style.clip="rect(0px, 0px, 0px, 0px)";e.setAttribute("aria-live","polite");document.body.appendChild(e);let t;function c(r,i={}){const o=i.mode||"polite",n=i.timeout===void 0?150:i.timeout;o==="alert"?(e.removeAttribute("aria-live"),e.removeAttribute("role"),t=a.debounce(t,l,()=>{e.setAttribute("role","alert")})):(t&&t.cancel(),e.removeAttribute("role"),e.setAttribute("aria-live",o)),e.textContent="",setTimeout(()=>{e.textContent=r},n)}export{c as a};
