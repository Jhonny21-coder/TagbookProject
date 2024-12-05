import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/app-layout/src/vaadin-app-layout.js';
import '@vaadin/tooltip/src/vaadin-tooltip.js';
import '@vaadin/icon/src/vaadin-icon.js';
import '@vaadin/horizontal-layout/src/vaadin-horizontal-layout.js';
import '@vaadin/checkbox/src/vaadin-checkbox.js';
import '@vaadin/icons/vaadin-iconset.js';
import { injectGlobalCss } from 'Frontend/generated/jar-resources/theme-util.js';

import { css, unsafeCSS, registerStyles } from '@vaadin/vaadin-themable-mixin';
import $cssFromFile_0 from 'Frontend/generated/jar-resources/styles/vaadin-checkbox.css?inline';

injectGlobalCss($cssFromFile_0.toString(), 'CSSImport end', document);