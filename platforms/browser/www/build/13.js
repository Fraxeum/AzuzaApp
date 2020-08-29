webpackJsonp([13],{

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_toast\", function() { return Toast; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_46f4a262_js__ = __webpack_require__(164);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__ = __webpack_require__(165);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__ = __webpack_require__(440);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__theme_18cbe2cc_js__ = __webpack_require__(745);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_3476b023_js__ = __webpack_require__(746);\n\n\n\n\n\n\n\n\n/**\n * iOS Toast Enter Animation\n */\nvar iosEnterAnimation = function (baseEl, position) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var hostEl = baseEl.host || baseEl;\n    var wrapperEl = baseEl.querySelector('.toast-wrapper');\n    var bottom = \"calc(-10px - var(--ion-safe-area-bottom, 0px))\";\n    var top = \"calc(10px + var(--ion-safe-area-top, 0px))\";\n    wrapperAnimation.addElement(wrapperEl);\n    switch (position) {\n        case 'top':\n            wrapperAnimation.fromTo('transform', 'translateY(-100%)', \"translateY(\" + top + \")\");\n            break;\n        case 'middle':\n            var topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);\n            wrapperEl.style.top = topPosition + \"px\";\n            wrapperAnimation.fromTo('opacity', 0.01, 1);\n            break;\n        default:\n            wrapperAnimation.fromTo('transform', 'translateY(100%)', \"translateY(\" + bottom + \")\");\n            break;\n    }\n    return baseAnimation\n        .addElement(hostEl)\n        .easing('cubic-bezier(.155,1.105,.295,1.12)')\n        .duration(400)\n        .addAnimation(wrapperAnimation);\n};\n/**\n * iOS Toast Leave Animation\n */\nvar iosLeaveAnimation = function (baseEl, position) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var hostEl = baseEl.host || baseEl;\n    var wrapperEl = baseEl.querySelector('.toast-wrapper');\n    var bottom = \"calc(-10px - var(--ion-safe-area-bottom, 0px))\";\n    var top = \"calc(10px + var(--ion-safe-area-top, 0px))\";\n    wrapperAnimation.addElement(wrapperEl);\n    switch (position) {\n        case 'top':\n            wrapperAnimation.fromTo('transform', \"translateY(\" + top + \")\", 'translateY(-100%)');\n            break;\n        case 'middle':\n            wrapperAnimation.fromTo('opacity', 0.99, 0);\n            break;\n        default:\n            wrapperAnimation.fromTo('transform', \"translateY(\" + bottom + \")\", 'translateY(100%)');\n            break;\n    }\n    return baseAnimation\n        .addElement(hostEl)\n        .easing('cubic-bezier(.36,.66,.04,1)')\n        .duration(300)\n        .addAnimation(wrapperAnimation);\n};\n/**\n * MD Toast Enter Animation\n */\nvar mdEnterAnimation = function (baseEl, position) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var hostEl = baseEl.host || baseEl;\n    var wrapperEl = baseEl.querySelector('.toast-wrapper');\n    var bottom = \"calc(8px + var(--ion-safe-area-bottom, 0px))\";\n    var top = \"calc(8px + var(--ion-safe-area-top, 0px))\";\n    wrapperAnimation.addElement(wrapperEl);\n    switch (position) {\n        case 'top':\n            wrapperEl.style.top = top;\n            wrapperAnimation.fromTo('opacity', 0.01, 1);\n            break;\n        case 'middle':\n            var topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);\n            wrapperEl.style.top = topPosition + \"px\";\n            wrapperAnimation.fromTo('opacity', 0.01, 1);\n            break;\n        default:\n            wrapperEl.style.bottom = bottom;\n            wrapperAnimation.fromTo('opacity', 0.01, 1);\n            break;\n    }\n    return baseAnimation\n        .addElement(hostEl)\n        .easing('cubic-bezier(.36,.66,.04,1)')\n        .duration(400)\n        .addAnimation(wrapperAnimation);\n};\n/**\n * md Toast Leave Animation\n */\nvar mdLeaveAnimation = function (baseEl) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var hostEl = baseEl.host || baseEl;\n    var wrapperEl = baseEl.querySelector('.toast-wrapper');\n    wrapperAnimation\n        .addElement(wrapperEl)\n        .fromTo('opacity', 0.99, 0);\n    return baseAnimation\n        .addElement(hostEl)\n        .easing('cubic-bezier(.36,.66,.04,1)')\n        .duration(300)\n        .addAnimation(wrapperAnimation);\n};\nvar Toast = /** @class */ (function () {\n    function class_1(hostRef) {\n        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        this.presented = false;\n        this.mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        /**\n         * How many milliseconds to wait before hiding the toast. By default, it will show\n         * until `dismiss()` is called.\n         */\n        this.duration = 0;\n        /**\n         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.\n         */\n        this.keyboardClose = false;\n        /**\n         * The position of the toast on the screen.\n         */\n        this.position = 'bottom';\n        /**\n         * @deprecated Use `buttons` instead. If `true`, the close button will be displayed.\n         */\n        this.showCloseButton = false;\n        /**\n         * If `true`, the toast will be translucent.\n         * Only applies when the mode is `\"ios\"` and the device supports\n         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).\n         */\n        this.translucent = false;\n        /**\n         * If `true`, the toast will animate.\n         */\n        this.animated = true;\n        Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"e\" /* d */])(this.el);\n        this.didPresent = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionToastDidPresent\", 7);\n        this.willPresent = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionToastWillPresent\", 7);\n        this.willDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionToastWillDismiss\", 7);\n        this.didDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionToastDidDismiss\", 7);\n    }\n    /**\n     * Present the toast overlay after it has been created.\n     */\n    class_1.prototype.present = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var _this = this;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"f\" /* e */])(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position)];\n                    case 1:\n                        _a.sent();\n                        if (this.duration > 0) {\n                            this.durationTimeout = setTimeout(function () { return _this.dismiss(undefined, 'timeout'); }, this.duration);\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    /**\n     * Dismiss the toast overlay after it has been presented.\n     *\n     * @param data Any data to emit in the dismiss events.\n     * @param role The role of the element that is dismissing the toast.\n     * This can be useful in a button handler for determining which button was\n     * clicked to dismiss the toast.\n     * Some examples include: ``\"cancel\"`, `\"destructive\"`, \"selected\"`, and `\"backdrop\"`.\n     */\n    class_1.prototype.dismiss = function (data, role) {\n        if (this.durationTimeout) {\n            clearTimeout(this.durationTimeout);\n        }\n        return Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"g\" /* f */])(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);\n    };\n    /**\n     * Returns a promise that resolves when the toast did dismiss.\n     */\n    class_1.prototype.onDidDismiss = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"h\" /* g */])(this.el, 'ionToastDidDismiss');\n    };\n    /**\n     * Returns a promise that resolves when the toast will dismiss.\n     */\n    class_1.prototype.onWillDismiss = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"h\" /* g */])(this.el, 'ionToastWillDismiss');\n    };\n    class_1.prototype.getButtons = function () {\n        var _this = this;\n        var buttons = this.buttons\n            ? this.buttons.map(function (b) {\n                return (typeof b === 'string')\n                    ? { text: b }\n                    : b;\n            })\n            : [];\n        // tslint:disable-next-line: deprecation\n        if (this.showCloseButton) {\n            buttons.push({\n                // tslint:disable-next-line: deprecation\n                text: this.closeButtonText || 'Close',\n                handler: function () { return _this.dismiss(undefined, 'cancel'); }\n            });\n        }\n        return buttons;\n    };\n    class_1.prototype.buttonClick = function (button) {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var role, shouldDismiss;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        role = button.role;\n                        if (Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"j\" /* i */])(role)) {\n                            return [2 /*return*/, this.dismiss(undefined, role)];\n                        }\n                        return [4 /*yield*/, this.callButtonHandler(button)];\n                    case 1:\n                        shouldDismiss = _a.sent();\n                        if (shouldDismiss) {\n                            return [2 /*return*/, this.dismiss(undefined, button.role)];\n                        }\n                        return [2 /*return*/, Promise.resolve()];\n                }\n            });\n        });\n    };\n    class_1.prototype.callButtonHandler = function (button) {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var rtn, e_1;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        if (!(button && button.handler)) return [3 /*break*/, 4];\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_5__overlays_10640d86_js__[\"p\" /* s */])(button.handler)];\n                    case 2:\n                        rtn = _a.sent();\n                        if (rtn === false) {\n                            // if the return value of the handler is false then do not dismiss\n                            return [2 /*return*/, false];\n                        }\n                        return [3 /*break*/, 4];\n                    case 3:\n                        e_1 = _a.sent();\n                        console.error(e_1);\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/, true];\n                }\n            });\n        });\n    };\n    class_1.prototype.renderButtons = function (buttons, side) {\n        var _a;\n        var _this = this;\n        if (buttons.length === 0) {\n            return;\n        }\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        var buttonGroupsClasses = (_a = {\n                'toast-button-group': true\n            },\n            _a[\"toast-button-group-\" + side] = true,\n            _a);\n        return (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: buttonGroupsClasses }, buttons.map(function (b) { return Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"button\", { type: \"button\", class: buttonClass(b), tabIndex: 0, onClick: function () { return _this.buttonClick(b); } }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"toast-button-inner\" }, b.icon &&\n            Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"ion-icon\", { icon: b.icon, slot: b.text === undefined ? 'icon-only' : undefined, class: \"toast-icon\" }), b.text), mode === 'md' && Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"ion-ripple-effect\", { type: b.icon !== undefined && b.text === undefined ? 'unbounded' : 'bounded' })); })));\n    };\n    class_1.prototype.render = function () {\n        var _a, _b;\n        var allButtons = this.getButtons();\n        var startButtons = allButtons.filter(function (b) { return b.side === 'start'; });\n        var endButtons = allButtons.filter(function (b) { return b.side !== 'start'; });\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        var wrapperClass = (_a = {\n                'toast-wrapper': true\n            },\n            _a[\"toast-\" + this.position] = true,\n            _a);\n        return (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"a\" /* H */], { style: {\n                zIndex: \"\" + (60000 + this.overlayIndex),\n            }, class: Object.assign(Object.assign(Object.assign((_b = {}, _b[mode] = true, _b), Object(__WEBPACK_IMPORTED_MODULE_6__theme_18cbe2cc_js__[\"a\" /* c */])(this.color)), Object(__WEBPACK_IMPORTED_MODULE_6__theme_18cbe2cc_js__[\"b\" /* g */])(this.cssClass)), { 'toast-translucent': this.translucent }) }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: wrapperClass }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"toast-container\" }, this.renderButtons(startButtons, 'start'), Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"toast-content\" }, this.header !== undefined &&\n            Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"toast-header\" }, this.header), this.message !== undefined &&\n            Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"toast-message\", innerHTML: Object(__WEBPACK_IMPORTED_MODULE_7__index_3476b023_js__[\"a\" /* s */])(this.message) })), this.renderButtons(endButtons, 'end')))));\n    };\n    Object.defineProperty(class_1.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(class_1, \"style\", {\n        get: function () { return \":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper,[dir=rtl] .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\\@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}\\@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle{opacity:.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.activated{opacity:.4}\\@media (any-hover:hover){.toast-button:hover{opacity:.6}}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return class_1;\n}());\nvar buttonClass = function (button) {\n    var _a;\n    return Object.assign((_a = { 'toast-button': true, 'toast-button-icon-only': button.icon !== undefined && button.text === undefined }, _a[\"toast-button-\" + button.role] = button.role !== undefined, _a['ion-focusable'] = true, _a['ion-activatable'] = true, _a), Object(__WEBPACK_IMPORTED_MODULE_6__theme_18cbe2cc_js__[\"b\" /* g */])(button.cssClass));\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-toast-ios.entry.js\n// module id = 735\n// module chunks = 13\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-toast-ios.entry.js");

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return createColorClasses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getClassMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return hostContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return openURL; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar hostContext = function (selector, el) {\n    return el.closest(selector) !== null;\n};\n/**\n * Create the mode and color classes for the component based on the classes passed in\n */\nvar createColorClasses = function (color) {\n    var _a;\n    return (typeof color === 'string' && color.length > 0) ? (_a = {\n            'ion-color': true\n        },\n        _a[\"ion-color-\" + color] = true,\n        _a) : undefined;\n};\nvar getClassList = function (classes) {\n    if (classes !== undefined) {\n        var array = Array.isArray(classes) ? classes : classes.split(' ');\n        return array\n            .filter(function (c) { return c != null; })\n            .map(function (c) { return c.trim(); })\n            .filter(function (c) { return c !== ''; });\n    }\n    return [];\n};\nvar getClassMap = function (classes) {\n    var map = {};\n    getClassList(classes).forEach(function (c) { return map[c] = true; });\n    return map;\n};\nvar SCHEME = /^[a-z][a-z0-9+\\-.]*:/;\nvar openURL = function (url, ev, direction) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var router;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {\n            router = document.querySelector('ion-router');\n            if (router) {\n                if (ev != null) {\n                    ev.preventDefault();\n                }\n                return [2 /*return*/, router.push(url, direction)];\n            }\n        }\n        return [2 /*return*/, false];\n    });\n}); };\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js\n// module id = 745\n// module chunks = 1 2 3 4 5 6 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return sanitizeDOMString; });\n/**\n * Does a simple sanitization of all elements\n * in an untrusted string\n */\nvar sanitizeDOMString = function (untrustedString) {\n    try {\n        if (typeof untrustedString !== 'string' || untrustedString === '') {\n            return untrustedString;\n        }\n        /**\n         * Create a document fragment\n         * separate from the main DOM,\n         * create a div to do our work in\n         */\n        var documentFragment_1 = document.createDocumentFragment();\n        var workingDiv = document.createElement('div');\n        documentFragment_1.appendChild(workingDiv);\n        workingDiv.innerHTML = untrustedString;\n        /**\n         * Remove any elements\n         * that are blocked\n         */\n        blockedTags.forEach(function (blockedTag) {\n            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);\n            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {\n                var element = getElementsToRemove[elementIndex];\n                if (element.parentNode) {\n                    element.parentNode.removeChild(element);\n                }\n                else {\n                    documentFragment_1.removeChild(element);\n                }\n                /**\n                 * We still need to sanitize\n                 * the children of this element\n                 * as they are left behind\n                 */\n                var childElements = getElementChildren(element);\n                /* tslint:disable-next-line */\n                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {\n                    sanitizeElement(childElements[childIndex]);\n                }\n            }\n        });\n        /**\n         * Go through remaining elements and remove\n         * non-allowed attribs\n         */\n        // IE does not support .children on document fragments, only .childNodes\n        var dfChildren = getElementChildren(documentFragment_1);\n        /* tslint:disable-next-line */\n        for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {\n            sanitizeElement(dfChildren[childIndex]);\n        }\n        // Append document fragment to div\n        var fragmentDiv = document.createElement('div');\n        fragmentDiv.appendChild(documentFragment_1);\n        // First child is always the div we did our work in\n        var getInnerDiv = fragmentDiv.querySelector('div');\n        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;\n    }\n    catch (err) {\n        console.error(err);\n        return '';\n    }\n};\n/**\n * Clean up current element based on allowed attributes\n * and then recursively dig down into any child elements to\n * clean those up as well\n */\nvar sanitizeElement = function (element) {\n    // IE uses childNodes, so ignore nodes that are not elements\n    if (element.nodeType && element.nodeType !== 1) {\n        return;\n    }\n    for (var i = element.attributes.length - 1; i >= 0; i--) {\n        var attribute = element.attributes.item(i);\n        var attributeName = attribute.name;\n        // remove non-allowed attribs\n        if (!allowedAttributes.includes(attributeName.toLowerCase())) {\n            element.removeAttribute(attributeName);\n            continue;\n        }\n        // clean up any allowed attribs\n        // that attempt to do any JS funny-business\n        var attributeValue = attribute.value;\n        /* tslint:disable-next-line */\n        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {\n            element.removeAttribute(attributeName);\n        }\n    }\n    /**\n     * Sanitize any nested children\n     */\n    var childElements = getElementChildren(element);\n    /* tslint:disable-next-line */\n    for (var i = 0; i < childElements.length; i++) {\n        sanitizeElement(childElements[i]);\n    }\n};\n/**\n * IE doesn't always support .children\n * so we revert to .childNodes instead\n */\nvar getElementChildren = function (el) {\n    return (el.children != null) ? el.children : el.childNodes;\n};\nvar allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];\nvar blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js\n// module id = 746\n// module chunks = 12 13 14 15 16 17 18 19 64 65 66 67\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/index-3476b023.js");

/***/ })

});