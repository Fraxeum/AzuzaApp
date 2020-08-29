webpackJsonp([5],{

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_modal\", function() { return Modal; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_46f4a262_js__ = __webpack_require__(164);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__ = __webpack_require__(165);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_3c3e1099_js__ = __webpack_require__(441);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__ = __webpack_require__(440);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__theme_18cbe2cc_js__ = __webpack_require__(745);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__framework_delegate_c2e2e1f4_js__ = __webpack_require__(747);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__index_6826f2f6_js__ = __webpack_require__(748);\n\n\n\n\n\n\n\n\n\n\n/**\n * iOS Modal Enter Animation\n */\nvar iosEnterAnimation = function (baseEl) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var backdropAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    backdropAnimation\n        .addElement(baseEl.querySelector('ion-backdrop'))\n        .fromTo('opacity', 0.01, 0.4);\n    wrapperAnimation\n        .addElement(baseEl.querySelector('.modal-wrapper'))\n        .beforeStyles({ 'opacity': 1 })\n        .fromTo('transform', 'translateY(100%)', 'translateY(0%)');\n    return baseAnimation\n        .addElement(baseEl)\n        .easing('cubic-bezier(0.36,0.66,0.04,1)')\n        .duration(400)\n        .beforeAddClass('show-modal')\n        .addAnimation([backdropAnimation, wrapperAnimation]);\n};\n/**\n * Animations for modals\n */\n// export function modalSlideIn(rootEl: HTMLElement) {\n// }\n// export class ModalSlideOut {\n//   constructor(el: HTMLElement) {\n//     let backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));\n//     let wrapperEle = <HTMLElement>el.querySelector('.modal-wrapper');\n//     let wrapperEleRect = wrapperEle.getBoundingClientRect();\n//     let wrapper = new Animation(this.plt, wrapperEle);\n//     // height of the screen - top of the container tells us how much to scoot it down\n//     // so it's off-screen\n//     wrapper.fromTo('translateY', '0px', `${this.plt.height() - wrapperEleRect.top}px`);\n//     backdrop.fromTo('opacity', 0.4, 0.0);\n//     this\n//       .element(this.leavingView.pageRef())\n//       .easing('ease-out')\n//       .duration(250)\n//       .add(backdrop)\n//       .add(wrapper);\n//   }\n// }\n// export class ModalMDSlideIn {\n//   constructor(el: HTMLElement) {\n//     const backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));\n//     const wrapper = new Animation(this.plt, el.querySelector('.modal-wrapper'));\n//     backdrop.fromTo('opacity', 0.01, 0.4);\n//     wrapper.fromTo('translateY', '40px', '0px');\n//     wrapper.fromTo('opacity', 0.01, 1);\n//     const DURATION = 280;\n//     const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';\n//     this.element(this.enteringView.pageRef()).easing(EASING).duration(DURATION)\n//       .add(backdrop)\n//       .add(wrapper);\n//   }\n// }\n// export class ModalMDSlideOut {\n//   constructor(el: HTMLElement) {\n//     const backdrop = new Animation(this.plt, el.querySelector('ion-backdrop'));\n//     const wrapper = new Animation(this.plt, el.querySelector('.modal-wrapper'));\n//     backdrop.fromTo('opacity', 0.4, 0.0);\n//     wrapper.fromTo('translateY', '0px', '40px');\n//     wrapper.fromTo('opacity', 0.99, 0);\n//     this\n//       .element(this.leavingView.pageRef())\n//       .duration(200)\n//       .easing('cubic-bezier(0.47,0,0.745,0.715)')\n//       .add(wrapper)\n//       .add(backdrop);\n//   }\n// }\n/**\n * iOS Modal Leave Animation\n */\nvar iosLeaveAnimation = function (baseEl) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var backdropAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperEl = baseEl.querySelector('.modal-wrapper');\n    var wrapperElRect = wrapperEl.getBoundingClientRect();\n    backdropAnimation\n        .addElement(baseEl.querySelector('ion-backdrop'))\n        .fromTo('opacity', 0.4, 0.0);\n    wrapperAnimation\n        .addElement(wrapperEl)\n        .beforeStyles({ 'opacity': 1 })\n        .fromTo('transform', 'translateY(0%)', \"translateY(\" + (baseEl.ownerDocument.defaultView.innerHeight - wrapperElRect.top) + \"px)\");\n    return baseAnimation\n        .addElement(baseEl)\n        .easing('ease-out')\n        .duration(250)\n        .addAnimation([backdropAnimation, wrapperAnimation]);\n};\n/**\n * Md Modal Enter Animation\n */\nvar mdEnterAnimation = function (baseEl) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var backdropAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    backdropAnimation\n        .addElement(baseEl.querySelector('ion-backdrop'))\n        .fromTo('opacity', 0.01, 0.32);\n    wrapperAnimation\n        .addElement(baseEl.querySelector('.modal-wrapper'))\n        .keyframes([\n        { offset: 0, opacity: 0.01, transform: 'translateY(40px)' },\n        { offset: 1, opacity: 1, transform: 'translateY(0px)' }\n    ]);\n    return baseAnimation\n        .addElement(baseEl)\n        .easing('cubic-bezier(0.36,0.66,0.04,1)')\n        .duration(280)\n        .beforeAddClass('show-modal')\n        .addAnimation([backdropAnimation, wrapperAnimation]);\n};\n/**\n * Md Modal Leave Animation\n */\nvar mdLeaveAnimation = function (baseEl) {\n    var baseAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var backdropAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_af478fe9_js__[\"a\" /* c */])();\n    var wrapperEl = baseEl.querySelector('.modal-wrapper');\n    backdropAnimation\n        .addElement(baseEl.querySelector('ion-backdrop'))\n        .fromTo('opacity', 0.32, 0.0);\n    wrapperAnimation\n        .addElement(wrapperEl)\n        .keyframes([\n        { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },\n        { offset: 1, opacity: 0, transform: 'translateY(40px)' }\n    ]);\n    return baseAnimation\n        .addElement(baseEl)\n        .easing('cubic-bezier(0.47,0,0.745,0.715)')\n        .duration(200)\n        .addAnimation([backdropAnimation, wrapperAnimation]);\n};\nvar Modal = /** @class */ (function () {\n    function class_1(hostRef) {\n        var _this = this;\n        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        this.presented = false;\n        this.mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        /**\n         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.\n         */\n        this.keyboardClose = true;\n        /**\n         * If `true`, the modal will be dismissed when the backdrop is clicked.\n         */\n        this.backdropDismiss = true;\n        /**\n         * If `true`, a backdrop will be displayed behind the modal.\n         */\n        this.showBackdrop = true;\n        /**\n         * If `true`, the modal will animate.\n         */\n        this.animated = true;\n        this.onBackdropTap = function () {\n            _this.dismiss(undefined, __WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"a\" /* B */]);\n        };\n        this.onDismiss = function (ev) {\n            ev.stopPropagation();\n            ev.preventDefault();\n            _this.dismiss();\n        };\n        this.onLifecycle = function (modalEvent) {\n            var el = _this.usersElement;\n            var name = LIFECYCLE_MAP[modalEvent.type];\n            if (el && name) {\n                var ev = new CustomEvent(name, {\n                    bubbles: false,\n                    cancelable: false,\n                    detail: modalEvent.detail\n                });\n                el.dispatchEvent(ev);\n            }\n        };\n        Object(__WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"e\" /* d */])(this.el);\n        this.didPresent = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionModalDidPresent\", 7);\n        this.willPresent = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionModalWillPresent\", 7);\n        this.willDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionModalWillDismiss\", 7);\n        this.didDismiss = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionModalDidDismiss\", 7);\n    }\n    /**\n     * Present the modal overlay after it has been created.\n     */\n    class_1.prototype.present = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var container, componentProps, _a;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        if (this.presented) {\n                            return [2 /*return*/];\n                        }\n                        container = this.el.querySelector(\".modal-wrapper\");\n                        if (!container) {\n                            throw new Error('container is undefined');\n                        }\n                        componentProps = Object.assign(Object.assign({}, this.componentProps), { modal: this.el });\n                        _a = this;\n                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_8__framework_delegate_c2e2e1f4_js__[\"a\"])(this.delegate, container, this.component, ['ion-page'], componentProps)];\n                    case 1:\n                        _a.usersElement = _b.sent();\n                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_9__index_6826f2f6_js__[\"a\" /* d */])(this.usersElement)];\n                    case 2:\n                        _b.sent();\n                        return [2 /*return*/, Object(__WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"f\" /* e */])(this, 'modalEnter', iosEnterAnimation, mdEnterAnimation)];\n                }\n            });\n        });\n    };\n    /**\n     * Dismiss the modal overlay after it has been presented.\n     *\n     * @param data Any data to emit in the dismiss events.\n     * @param role The role of the element that is dismissing the modal. For example, 'cancel' or 'backdrop'.\n     */\n    class_1.prototype.dismiss = function (data, role) {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var dismissed;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"g\" /* f */])(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation)];\n                    case 1:\n                        dismissed = _a.sent();\n                        if (!dismissed) return [3 /*break*/, 3];\n                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_8__framework_delegate_c2e2e1f4_js__[\"b\" /* d */])(this.delegate, this.usersElement)];\n                    case 2:\n                        _a.sent();\n                        _a.label = 3;\n                    case 3: return [2 /*return*/, dismissed];\n                }\n            });\n        });\n    };\n    /**\n     * Returns a promise that resolves when the modal did dismiss.\n     */\n    class_1.prototype.onDidDismiss = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"h\" /* g */])(this.el, 'ionModalDidDismiss');\n    };\n    /**\n     * Returns a promise that resolves when the modal will dismiss.\n     */\n    class_1.prototype.onWillDismiss = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_6__overlays_10640d86_js__[\"h\" /* g */])(this.el, 'ionModalWillDismiss');\n    };\n    class_1.prototype.render = function () {\n        var _a, _b;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        return (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"a\" /* H */], { \"no-router\": true, \"aria-modal\": \"true\", class: Object.assign((_a = {}, _a[mode] = true, _a), Object(__WEBPACK_IMPORTED_MODULE_7__theme_18cbe2cc_js__[\"b\" /* g */])(this.cssClass)), style: {\n                zIndex: \"\" + (20000 + this.overlayIndex),\n            }, onIonBackdropTap: this.onBackdropTap, onIonDismiss: this.onDismiss, onIonModalDidPresent: this.onLifecycle, onIonModalWillPresent: this.onLifecycle, onIonModalWillDismiss: this.onLifecycle, onIonModalDidDismiss: this.onLifecycle }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"ion-backdrop\", { visible: this.showBackdrop, tappable: this.backdropDismiss }), Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { role: \"dialog\", class: (_b = {},\n                _b[\"modal-wrapper\"] = true,\n                _b[mode] = true,\n                _b) })));\n    };\n    Object.defineProperty(class_1.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(class_1, \"style\", {\n        get: function () { return \".sc-ion-modal-md-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color,#fff);--box-shadow:none;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:strict}.overlay-hidden.sc-ion-modal-md-h{display:none}.modal-wrapper.sc-ion-modal-md{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}\\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}\\@media only screen and (min-width:768px) and (min-height:768px){.sc-ion-modal-md-h{--width:600px;--height:600px}}\\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--border-radius:2px;--box-shadow:0 28px 48px rgba(0,0,0,0.4)}}.modal-wrapper.sc-ion-modal-md{-webkit-transform:translate3d(0,40px,0);transform:translate3d(0,40px,0);opacity:.01}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return class_1;\n}());\nvar LIFECYCLE_MAP = {\n    'ionModalDidPresent': 'ionViewDidEnter',\n    'ionModalWillPresent': 'ionViewWillEnter',\n    'ionModalWillDismiss': 'ionViewWillLeave',\n    'ionModalDidDismiss': 'ionViewDidLeave',\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-modal-md.entry.js\n// module id = 702\n// module chunks = 5\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-modal-md.entry.js");

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return createColorClasses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getClassMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return hostContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return openURL; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar hostContext = function (selector, el) {\n    return el.closest(selector) !== null;\n};\n/**\n * Create the mode and color classes for the component based on the classes passed in\n */\nvar createColorClasses = function (color) {\n    var _a;\n    return (typeof color === 'string' && color.length > 0) ? (_a = {\n            'ion-color': true\n        },\n        _a[\"ion-color-\" + color] = true,\n        _a) : undefined;\n};\nvar getClassList = function (classes) {\n    if (classes !== undefined) {\n        var array = Array.isArray(classes) ? classes : classes.split(' ');\n        return array\n            .filter(function (c) { return c != null; })\n            .map(function (c) { return c.trim(); })\n            .filter(function (c) { return c !== ''; });\n    }\n    return [];\n};\nvar getClassMap = function (classes) {\n    var map = {};\n    getClassList(classes).forEach(function (c) { return map[c] = true; });\n    return map;\n};\nvar SCHEME = /^[a-z][a-z0-9+\\-.]*:/;\nvar openURL = function (url, ev, direction) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var router;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {\n            router = document.querySelector('ion-router');\n            if (router) {\n                if (ev != null) {\n                    ev.preventDefault();\n                }\n                return [2 /*return*/, router.push(url, direction)];\n            }\n        }\n        return [2 /*return*/, false];\n    });\n}); };\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js\n// module id = 745\n// module chunks = 1 2 3 4 5 6 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");

/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return attachComponent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return detachComponent; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar attachComponent = function (delegate, container, component, cssClasses, componentProps) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var el;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                if (delegate) {\n                    return [2 /*return*/, delegate.attachViewToDom(container, component, componentProps, cssClasses)];\n                }\n                if (typeof component !== 'string' && !(component instanceof HTMLElement)) {\n                    throw new Error('framework delegate is missing');\n                }\n                el = (typeof component === 'string')\n                    ? container.ownerDocument && container.ownerDocument.createElement(component)\n                    : component;\n                if (cssClasses) {\n                    cssClasses.forEach(function (c) { return el.classList.add(c); });\n                }\n                if (componentProps) {\n                    Object.assign(el, componentProps);\n                }\n                container.appendChild(el);\n                if (!el.componentOnReady) return [3 /*break*/, 2];\n                return [4 /*yield*/, el.componentOnReady()];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2: return [2 /*return*/, el];\n        }\n    });\n}); };\nvar detachComponent = function (delegate, element) {\n    if (element) {\n        if (delegate) {\n            var container = element.parentElement;\n            return delegate.removeViewFromDom(container, element);\n        }\n        element.remove();\n    }\n    return Promise.resolve();\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/framework-delegate-c2e2e1f4.js\n// module id = 747\n// module chunks = 1 2 3 4 5 6 7 70\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/framework-delegate-c2e2e1f4.js");

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return deepReady; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getIonPageElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return lifecycle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return setPageHidden; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"e\", function() { return transition; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_3c3e1099_js__ = __webpack_require__(441);\n\n\n\nvar iosTransitionAnimation = function () { return __webpack_require__.e/* import() */(104).then(__webpack_require__.bind(null, 751)); };\nvar mdTransitionAnimation = function () { return __webpack_require__.e/* import() */(103).then(__webpack_require__.bind(null, 752)); };\nvar transition = function (opts) {\n    return new Promise(function (resolve, reject) {\n        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"m\" /* w */])(function () {\n            beforeTransition(opts);\n            runTransition(opts).then(function (result) {\n                if (result.animation) {\n                    result.animation.destroy();\n                }\n                afterTransition(opts);\n                resolve(result);\n            }, function (error) {\n                afterTransition(opts);\n                reject(error);\n            });\n        });\n    });\n};\nvar beforeTransition = function (opts) {\n    var enteringEl = opts.enteringEl;\n    var leavingEl = opts.leavingEl;\n    setZIndex(enteringEl, leavingEl, opts.direction);\n    if (opts.showGoBack) {\n        enteringEl.classList.add('can-go-back');\n    }\n    else {\n        enteringEl.classList.remove('can-go-back');\n    }\n    setPageHidden(enteringEl, false);\n    if (leavingEl) {\n        setPageHidden(leavingEl, false);\n    }\n};\nvar runTransition = function (opts) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var animationBuilder, ani;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, getAnimationBuilder(opts)];\n            case 1:\n                animationBuilder = _a.sent();\n                ani = (animationBuilder)\n                    ? animation(animationBuilder, opts)\n                    : noAnimation(opts);\n                return [2 /*return*/, ani];\n        }\n    });\n}); };\nvar afterTransition = function (opts) {\n    var enteringEl = opts.enteringEl;\n    var leavingEl = opts.leavingEl;\n    enteringEl.classList.remove('ion-page-invisible');\n    if (leavingEl !== undefined) {\n        leavingEl.classList.remove('ion-page-invisible');\n    }\n};\nvar getAnimationBuilder = function (opts) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var getAnimation, _a;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_b) {\n        switch (_b.label) {\n            case 0:\n                if (!opts.leavingEl || !opts.animated || opts.duration === 0) {\n                    return [2 /*return*/, undefined];\n                }\n                if (opts.animationBuilder) {\n                    return [2 /*return*/, opts.animationBuilder];\n                }\n                if (!(opts.mode === 'ios')) return [3 /*break*/, 2];\n                return [4 /*yield*/, iosTransitionAnimation()];\n            case 1:\n                _a = (_b.sent()).iosTransitionAnimation;\n                return [3 /*break*/, 4];\n            case 2: return [4 /*yield*/, mdTransitionAnimation()];\n            case 3:\n                _a = (_b.sent()).mdTransitionAnimation;\n                _b.label = 4;\n            case 4:\n                getAnimation = _a;\n                return [2 /*return*/, getAnimation];\n        }\n    });\n}); };\nvar animation = function (animationBuilder, opts) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var trans, mod, err_1, didComplete;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, waitForReady(opts, true)];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2:\n                _a.trys.push([2, 5, , 6]);\n                return [4 /*yield*/, __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 650))];\n            case 3:\n                mod = _a.sent();\n                return [4 /*yield*/, mod.create(animationBuilder, opts.baseEl, opts)];\n            case 4:\n                trans = _a.sent();\n                return [3 /*break*/, 6];\n            case 5:\n                err_1 = _a.sent();\n                trans = animationBuilder(opts.baseEl, opts);\n                return [3 /*break*/, 6];\n            case 6:\n                fireWillEvents(opts.enteringEl, opts.leavingEl);\n                return [4 /*yield*/, playTransition(trans, opts)];\n            case 7:\n                didComplete = _a.sent();\n                if (opts.progressCallback) {\n                    opts.progressCallback(undefined);\n                }\n                if (didComplete) {\n                    fireDidEvents(opts.enteringEl, opts.leavingEl);\n                }\n                return [2 /*return*/, {\n                        hasCompleted: didComplete,\n                        animation: trans\n                    }];\n        }\n    });\n}); };\nvar noAnimation = function (opts) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var enteringEl, leavingEl;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                enteringEl = opts.enteringEl;\n                leavingEl = opts.leavingEl;\n                return [4 /*yield*/, waitForReady(opts, false)];\n            case 1:\n                _a.sent();\n                fireWillEvents(enteringEl, leavingEl);\n                fireDidEvents(enteringEl, leavingEl);\n                return [2 /*return*/, {\n                        hasCompleted: true\n                    }];\n        }\n    });\n}); };\nvar waitForReady = function (opts, defaultDeep) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var deep, promises;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;\n                promises = deep ? [\n                    deepReady(opts.enteringEl),\n                    deepReady(opts.leavingEl),\n                ] : [\n                    shallowReady(opts.enteringEl),\n                    shallowReady(opts.leavingEl),\n                ];\n                return [4 /*yield*/, Promise.all(promises)];\n            case 1:\n                _a.sent();\n                return [4 /*yield*/, notifyViewReady(opts.viewIsReady, opts.enteringEl)];\n            case 2:\n                _a.sent();\n                return [2 /*return*/];\n        }\n    });\n}); };\nvar notifyViewReady = function (viewIsReady, enteringEl) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                if (!viewIsReady) return [3 /*break*/, 2];\n                return [4 /*yield*/, viewIsReady(enteringEl)];\n            case 1:\n                _a.sent();\n                _a.label = 2;\n            case 2: return [2 /*return*/];\n        }\n    });\n}); };\nvar playTransition = function (trans, opts) {\n    var progressCallback = opts.progressCallback;\n    // TODO: Remove AnimationBuilder\n    var promise = new Promise(function (resolve) {\n        trans.onFinish(function (currentStep) {\n            if (typeof currentStep === 'number') {\n                resolve(currentStep === 1);\n            }\n            else if (trans.hasCompleted !== undefined) {\n                resolve(trans.hasCompleted);\n            }\n        });\n    });\n    // cool, let's do this, start the transition\n    if (progressCallback) {\n        // this is a swipe to go back, just get the transition progress ready\n        // kick off the swipe animation start\n        trans.progressStart(true);\n        progressCallback(trans);\n    }\n    else {\n        // only the top level transition should actually start \"play\"\n        // kick it off and let it play through\n        // ******** DOM WRITE ****************\n        trans.play();\n    }\n    // create a callback for when the animation is done\n    return promise;\n};\nvar fireWillEvents = function (enteringEl, leavingEl) {\n    lifecycle(leavingEl, __WEBPACK_IMPORTED_MODULE_2__constants_3c3e1099_js__[\"c\" /* b */]);\n    lifecycle(enteringEl, __WEBPACK_IMPORTED_MODULE_2__constants_3c3e1099_js__[\"a\" /* L */]);\n};\nvar fireDidEvents = function (enteringEl, leavingEl) {\n    lifecycle(enteringEl, __WEBPACK_IMPORTED_MODULE_2__constants_3c3e1099_js__[\"b\" /* a */]);\n    lifecycle(leavingEl, __WEBPACK_IMPORTED_MODULE_2__constants_3c3e1099_js__[\"d\" /* c */]);\n};\nvar lifecycle = function (el, eventName) {\n    if (el) {\n        var ev = new CustomEvent(eventName, {\n            bubbles: false,\n            cancelable: false,\n        });\n        el.dispatchEvent(ev);\n    }\n};\nvar shallowReady = function (el) {\n    if (el && el.componentOnReady) {\n        return el.componentOnReady();\n    }\n    return Promise.resolve();\n};\nvar deepReady = function (el) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var element, stencilEl;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                element = el;\n                if (!element) return [3 /*break*/, 4];\n                if (!(element.componentOnReady != null)) return [3 /*break*/, 2];\n                return [4 /*yield*/, element.componentOnReady()];\n            case 1:\n                stencilEl = _a.sent();\n                if (stencilEl != null) {\n                    return [2 /*return*/];\n                }\n                _a.label = 2;\n            case 2: return [4 /*yield*/, Promise.all(Array.from(element.children).map(deepReady))];\n            case 3:\n                _a.sent();\n                _a.label = 4;\n            case 4: return [2 /*return*/];\n        }\n    });\n}); };\nvar setPageHidden = function (el, hidden) {\n    if (hidden) {\n        el.setAttribute('aria-hidden', 'true');\n        el.classList.add('ion-page-hidden');\n    }\n    else {\n        el.hidden = false;\n        el.removeAttribute('aria-hidden');\n        el.classList.remove('ion-page-hidden');\n    }\n};\nvar setZIndex = function (enteringEl, leavingEl, direction) {\n    if (enteringEl !== undefined) {\n        enteringEl.style.zIndex = (direction === 'back')\n            ? '99'\n            : '101';\n    }\n    if (leavingEl !== undefined) {\n        leavingEl.style.zIndex = '100';\n    }\n};\nvar getIonPageElement = function (element) {\n    if (element.classList.contains('ion-page')) {\n        return element;\n    }\n    var ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');\n    if (ionPage) {\n        return ionPage;\n    }\n    // idk, return the original element so at least something animates and we don't have a null pointer\n    return element;\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/index-6826f2f6.js\n// module id = 748\n// module chunks = 1 2 3 4 5 6 7\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/index-6826f2f6.js");

/***/ })

});