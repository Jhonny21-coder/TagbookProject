const e="vaadin-checkbox[theme~=toggle-button]::part(checkbox),vaadin-checkbox[theme~=toggle-button]>input{grid-column:2}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox::part(checkbox),vaadin-checkbox[theme~=toggle-button]::part(checkbox){width:calc(3em - 12px);height:1.5em;border-radius:.75em;background-color:var(--lumo-contrast-40pct);margin:0;cursor:pointer}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox::part(checkbox):after,vaadin-checkbox[theme~=toggle-button]::part(checkbox):after{width:calc(1.2em - 4px);height:calc(1.2em - 4px);border-radius:50%;background-color:var(--lumo-primary-contrast-color);border:none;top:2px;left:2px;transform:none;opacity:1;transition:transform .2s ease}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox[disabled]::part(checkbox):after,vaadin-checkbox[theme~=toggle-button][disabled]::part(checkbox):after{color:transparent!important}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox[checked]::part(checkbox):after,vaadin-checkbox[theme~=toggle-button][checked]::part(checkbox):after{transform:translate(calc(100% - 8px))}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox[checked]::part(checkbox),vaadin-checkbox[theme~=toggle-button][checked]::part(checkbox){background-color:var(--lumo-primary-color)}vaadin-checkbox-group[theme~=toggle-button]>vaadin-checkbox[checked][disabled]::part(checkbox),vaadin-checkbox[theme~=toggle-button][checked][disabled]::part(checkbox){background-color:var(--lumo-primary-color);opacity:.3}";export{e as $};