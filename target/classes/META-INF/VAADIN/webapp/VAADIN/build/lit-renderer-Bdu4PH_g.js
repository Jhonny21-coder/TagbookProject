import{j as l,x as $}from"./indexhtml-DPuqjys-.js";const d=window;d.Vaadin=d.Vaadin||{};d.Vaadin.setLitRenderer=(n,t,s,r,u,a)=>{const f=Function(`
    "use strict";

    const [render, html, returnChannel] = arguments;

    return (root, model, itemKey) => {
      const { item, index } = model;
      ${u.map(e=>`
          const ${e} = (...args) => {
            if (itemKey !== undefined) {
              returnChannel('${e}', itemKey, args[0] instanceof Event ? [] : [...args]);
            }
          }`).join("")}

      render(html\`${s}\`, root)
    }
  `)(l,$,r),i=(e,h,_)=>{const{item:o}=_;e.__litRenderer!==i&&(e.innerHTML="",delete e._$litPart$,e.__litRenderer=i);const c={};for(const m in o)m.startsWith(a)&&(c[m.replace(a,"")]=o[m]);f(e,{..._,item:c},o.key)};i.__rendererId=a,n[t]=i};d.Vaadin.unsetLitRenderer=(n,t,s)=>{var r;((r=n[t])==null?void 0:r.__rendererId)===s&&(n[t]=void 0)};
