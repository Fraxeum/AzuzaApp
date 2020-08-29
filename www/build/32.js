webpackJsonp([32],{

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_tab_bar\", function() { return TabBar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_tab_button\", function() { return TabButton; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_18cbe2cc_js__ = __webpack_require__(745);\n\n\n\nvar TabBar = /** @class */ (function () {\n    function TabBar(hostRef) {\n        Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        this.keyboardVisible = false;\n        /**\n         * If `true`, the tab bar will be translucent.\n         * Only applies when the mode is `\"ios\"` and the device supports\n         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).\n         */\n        this.translucent = false;\n        this.ionTabBarChanged = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionTabBarChanged\", 7);\n    }\n    TabBar.prototype.selectedTabChanged = function () {\n        if (this.selectedTab !== undefined) {\n            this.ionTabBarChanged.emit({\n                tab: this.selectedTab\n            });\n        }\n    };\n    TabBar.prototype.onKeyboardWillHide = function () {\n        var _this = this;\n        setTimeout(function () { return _this.keyboardVisible = false; }, 50);\n    };\n    TabBar.prototype.onKeyboardWillShow = function () {\n        if (this.el.getAttribute('slot') !== 'top') {\n            this.keyboardVisible = true;\n        }\n    };\n    TabBar.prototype.componentWillLoad = function () {\n        this.selectedTabChanged();\n    };\n    TabBar.prototype.render = function () {\n        var _a;\n        var _b = this, color = _b.color, translucent = _b.translucent, keyboardVisible = _b.keyboardVisible;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"e\" /* d */])(this);\n        return (Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"a\" /* H */], { role: \"tablist\", \"aria-hidden\": keyboardVisible ? 'true' : null, class: Object.assign(Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2__theme_18cbe2cc_js__[\"a\" /* c */])(color)), (_a = {}, _a[mode] = true, _a['tab-bar-translucent'] = translucent, _a['tab-bar-hidden'] = keyboardVisible, _a)) }, Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"slot\", null)));\n    };\n    Object.defineProperty(TabBar.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TabBar, \"watchers\", {\n        get: function () {\n            return {\n                \"selectedTab\": [\"selectedTabChanged\"]\n            };\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TabBar, \"style\", {\n        get: function () { return \":host{padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-bottom:var(--ion-safe-area-bottom,0);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color) ::slotted(ion-tab-button){--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}:host(.ion-color) ::slotted(.tab-selected){color:var(--ion-color-contrast)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){color:rgba(var(--ion-color-contrast-rgb),.7);background:var(--ion-color-base)}:host(.ion-color) ::slotted(ion-tab-button.ion-focused),:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:var(--background-focused)}:host(.tab-bar-translucent) ::slotted(ion-tab-button){background:transparent}:host([slot=top]){padding-bottom:0;border-top:0;border-bottom:var(--border)}:host(.tab-bar-hidden){display:none!important}:host{--background:var(--ion-tab-bar-background,var(--ion-background-color,#fff));--background-focused:var(--ion-tab-bar-background-focused,#e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));--color:var(--ion-tab-bar-color,var(--ion-color-step-450,#8c8c8c));--color-selected:var(--ion-tab-bar-color-activated,var(--ion-color-primary,#3880ff));height:50px}\\@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){:host(.tab-bar-translucent){--background:rgba(var(--ion-background-color-rgb,255,255,255),0.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}:host(.ion-color.tab-bar-translucent){background:rgba(var(--ion-color-base-rgb),.8)}:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:rgba(var(--ion-background-color-rgb,255,255,255),.6)}}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return TabBar;\n}());\nvar TabButton = /** @class */ (function () {\n    function TabButton(hostRef) {\n        var _this = this;\n        Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        /**\n         * If `true`, the user cannot interact with the tab button.\n         */\n        this.disabled = false;\n        /**\n         * The selected tab component\n         */\n        this.selected = false;\n        this.onKeyUp = function (ev) {\n            if (ev.key === 'Enter' || ev.key === ' ') {\n                _this.selectTab(ev);\n            }\n        };\n        this.onClick = function (ev) {\n            _this.selectTab(ev);\n        };\n        this.ionTabButtonClick = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionTabButtonClick\", 7);\n    }\n    TabButton.prototype.onTabBarChanged = function (ev) {\n        this.selected = this.tab === ev.detail.tab;\n    };\n    TabButton.prototype.componentWillLoad = function () {\n        if (this.layout === undefined) {\n            this.layout = __WEBPACK_IMPORTED_MODULE_1__config_3c7f3790_js__[\"b\"].get('tabButtonLayout', 'icon-top');\n        }\n    };\n    TabButton.prototype.selectTab = function (ev) {\n        if (this.tab !== undefined) {\n            if (!this.disabled) {\n                this.ionTabButtonClick.emit({\n                    tab: this.tab,\n                    href: this.href,\n                    selected: this.selected\n                });\n            }\n            ev.preventDefault();\n        }\n    };\n    Object.defineProperty(TabButton.prototype, \"hasLabel\", {\n        get: function () {\n            return !!this.el.querySelector('ion-label');\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TabButton.prototype, \"hasIcon\", {\n        get: function () {\n            return !!this.el.querySelector('ion-icon');\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TabButton.prototype, \"tabIndex\", {\n        get: function () {\n            if (this.disabled) {\n                return -1;\n            }\n            var hasTabIndex = this.el.hasAttribute('tabindex');\n            if (hasTabIndex) {\n                return this.el.getAttribute('tabindex');\n            }\n            return 0;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    TabButton.prototype.render = function () {\n        var _a;\n        var _b = this, disabled = _b.disabled, hasIcon = _b.hasIcon, hasLabel = _b.hasLabel, tabIndex = _b.tabIndex, href = _b.href, rel = _b.rel, target = _b.target, layout = _b.layout, selected = _b.selected, tab = _b.tab;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"e\" /* d */])(this);\n        var attrs = {\n            download: this.download,\n            href: href,\n            rel: rel,\n            target: target\n        };\n        return (Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"a\" /* H */], { onClick: this.onClick, onKeyup: this.onKeyUp, role: \"tab\", tabindex: tabIndex, \"aria-selected\": selected ? 'true' : null, id: tab !== undefined ? \"tab-button-\" + tab : null, class: (_a = {},\n                _a[mode] = true,\n                _a['tab-selected'] = selected,\n                _a['tab-disabled'] = disabled,\n                _a['tab-has-label'] = hasLabel,\n                _a['tab-has-icon'] = hasIcon,\n                _a['tab-has-label-only'] = hasLabel && !hasIcon,\n                _a['tab-has-icon-only'] = hasIcon && !hasLabel,\n                _a[\"tab-layout-\" + layout] = true,\n                _a['ion-activatable'] = true,\n                _a['ion-selectable'] = true,\n                _a['ion-focusable'] = true,\n                _a) }, Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"a\", Object.assign({}, attrs, { tabIndex: -1 }), Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"slot\", null), mode === 'md' && Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"ion-ripple-effect\", { type: \"unbounded\" }))));\n    };\n    Object.defineProperty(TabButton.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TabButton, \"style\", {\n        get: function () { return \":host{--ripple-color:var(--color-selected);-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:var(--background);color:var(--color)}:host,a{height:100%;outline:none}a{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;border:0;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){a{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.ion-focused){background:var(--background-focused)}\\@media (any-hover:hover){a:hover{color:var(--color-selected)}}:host(.tab-selected){color:var(--color-selected)}:host(.tab-hidden){display:none!important}:host(.tab-disabled){pointer-events:none;opacity:.4}::slotted(ion-icon),::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-label){-ms-flex-order:0;order:0}::slotted(ion-icon){-ms-flex-order:-1;order:-1;height:1em}:host(.tab-has-label-only) ::slotted(ion-label){white-space:normal}::slotted(ion-badge){-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}:host(.tab-layout-icon-start){-ms-flex-direction:row;flex-direction:row}:host(.tab-layout-icon-end){-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.tab-layout-icon-bottom){-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.tab-layout-icon-hide) ::slotted(ion-icon),:host(.tab-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color)}:host{--padding-top:0;--padding-end:2px;--padding-bottom:0;--padding-start:2px;max-width:240px;font-size:10px}:host(.tab-has-label-only) ::slotted(ion-label){margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:12px;font-size:14px;line-height:1.1}::slotted(ion-badge){padding-left:6px;padding-right:6px;padding-top:1px;padding-bottom:1px;left:calc(50% + 6px);top:4px;height:auto;font-size:12px;line-height:16px}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-badge){padding-left:unset;padding-right:unset;-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px}}:host-context([dir=rtl]) ::slotted(ion-badge),[dir=rtl] ::slotted(ion-badge){left:unset;right:unset;right:calc(50% + 6px)}::slotted(ion-icon){margin-top:4px;font-size:30px}::slotted(ion-icon:before){vertical-align:top}::slotted(ion-label){margin-top:0;margin-bottom:1px;min-height:11px}:host(.tab-layout-icon-end) ::slotted(ion-label),:host(.tab-layout-icon-hide) ::slotted(ion-label),:host(.tab-layout-icon-start) ::slotted(ion-label){margin-top:2px;margin-bottom:2px;font-size:14px;line-height:1.1}:host(.tab-layout-icon-end) ::slotted(ion-icon),:host(.tab-layout-icon-start) ::slotted(ion-icon){min-width:24px;height:26px;margin-top:2px;margin-bottom:1px;font-size:24px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){left:calc(50% + 12px)}:host-context([dir=rtl]).tab-layout-icon-bottom ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-bottom) ::slotted(ion-badge){left:unset;right:unset;right:calc(50% + 12px)}:host(.tab-layout-icon-bottom) ::slotted(ion-icon){margin-top:0;margin-bottom:1px}:host(.tab-layout-icon-bottom) ::slotted(ion-label){margin-top:4px}:host(.tab-layout-icon-end) ::slotted(ion-badge),:host(.tab-layout-icon-start) ::slotted(ion-badge){left:calc(50% + 35px);top:10px}:host-context([dir=rtl]).tab-layout-icon-end ::slotted(ion-badge),:host-context([dir=rtl]).tab-layout-icon-start ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-end) ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-start) ::slotted(ion-badge){left:unset;right:unset;right:calc(50% + 35px)}:host(.tab-has-label-only) ::slotted(ion-badge),:host(.tab-layout-icon-hide) ::slotted(ion-badge){left:calc(50% + 30px);top:10px}:host-context([dir=rtl]).tab-has-label-only ::slotted(ion-badge),:host-context([dir=rtl]).tab-layout-icon-hide ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-has-label-only) ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-hide) ::slotted(ion-badge){left:unset;right:unset;right:calc(50% + 30px)}:host(.tab-has-icon-only) ::slotted(ion-badge),:host(.tab-layout-label-hide) ::slotted(ion-badge){top:10px}:host(.tab-layout-label-hide) ::slotted(ion-icon){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return TabButton;\n}());\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-tab-bar_2-ios.entry.js\n// module id = 729\n// module chunks = 32\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-tab-bar_2-ios.entry.js");

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return createColorClasses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getClassMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return hostContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return openURL; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar hostContext = function (selector, el) {\n    return el.closest(selector) !== null;\n};\n/**\n * Create the mode and color classes for the component based on the classes passed in\n */\nvar createColorClasses = function (color) {\n    var _a;\n    return (typeof color === 'string' && color.length > 0) ? (_a = {\n            'ion-color': true\n        },\n        _a[\"ion-color-\" + color] = true,\n        _a) : undefined;\n};\nvar getClassList = function (classes) {\n    if (classes !== undefined) {\n        var array = Array.isArray(classes) ? classes : classes.split(' ');\n        return array\n            .filter(function (c) { return c != null; })\n            .map(function (c) { return c.trim(); })\n            .filter(function (c) { return c !== ''; });\n    }\n    return [];\n};\nvar getClassMap = function (classes) {\n    var map = {};\n    getClassList(classes).forEach(function (c) { return map[c] = true; });\n    return map;\n};\nvar SCHEME = /^[a-z][a-z0-9+\\-.]*:/;\nvar openURL = function (url, ev, direction) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var router;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {\n            router = document.querySelector('ion-router');\n            if (router) {\n                if (ev != null) {\n                    ev.preventDefault();\n                }\n                return [2 /*return*/, router.push(url, direction)];\n            }\n        }\n        return [2 /*return*/, false];\n    });\n}); };\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js\n// module id = 745\n// module chunks = 1 2 3 4 5 6 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");

/***/ })

});