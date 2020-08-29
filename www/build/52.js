webpackJsonp([52],{

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_checkbox\", function() { return Checkbox; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_46f4a262_js__ = __webpack_require__(164);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_18cbe2cc_js__ = __webpack_require__(745);\n\n\n\n\nvar Checkbox = /** @class */ (function () {\n    function Checkbox(hostRef) {\n        var _this = this;\n        Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        this.inputId = \"ion-cb-\" + checkboxIds++;\n        /**\n         * The name of the control, which is submitted with the form data.\n         */\n        this.name = this.inputId;\n        /**\n         * If `true`, the checkbox is selected.\n         */\n        this.checked = false;\n        /**\n         * If `true`, the checkbox will visually appear as indeterminate.\n         */\n        this.indeterminate = false;\n        /**\n         * If `true`, the user cannot interact with the checkbox.\n         */\n        this.disabled = false;\n        /**\n         * The value of the toggle does not mean if it's checked or not, use the `checked`\n         * property for that.\n         *\n         * The value of a toggle is analogous to the value of a `<input type=\"checkbox\">`,\n         * it's only used when the toggle participates in a native `<form>`.\n         */\n        this.value = 'on';\n        this.onClick = function () {\n            _this.setFocus();\n            _this.checked = !_this.checked;\n            _this.indeterminate = false;\n        };\n        this.onFocus = function () {\n            _this.ionFocus.emit();\n        };\n        this.onBlur = function () {\n            _this.ionBlur.emit();\n        };\n        this.ionChange = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionChange\", 7);\n        this.ionFocus = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionFocus\", 7);\n        this.ionBlur = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionBlur\", 7);\n        this.ionStyle = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionStyle\", 7);\n    }\n    Checkbox.prototype.componentWillLoad = function () {\n        this.emitStyle();\n    };\n    Checkbox.prototype.checkedChanged = function (isChecked) {\n        this.ionChange.emit({\n            checked: isChecked,\n            value: this.value\n        });\n        this.emitStyle();\n    };\n    Checkbox.prototype.disabledChanged = function () {\n        this.emitStyle();\n    };\n    Checkbox.prototype.emitStyle = function () {\n        this.ionStyle.emit({\n            'checkbox-checked': this.checked,\n            'interactive-disabled': this.disabled,\n        });\n    };\n    Checkbox.prototype.setFocus = function () {\n        if (this.buttonEl) {\n            this.buttonEl.focus();\n        }\n    };\n    Checkbox.prototype.render = function () {\n        var _a;\n        var _this = this;\n        var _b = this, inputId = _b.inputId, indeterminate = _b.indeterminate, disabled = _b.disabled, checked = _b.checked, value = _b.value, color = _b.color, el = _b.el;\n        var labelId = inputId + '-lbl';\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"e\" /* d */])(this);\n        var label = Object(__WEBPACK_IMPORTED_MODULE_2__helpers_46f4a262_js__[\"f\"])(el);\n        if (label) {\n            label.id = labelId;\n        }\n        Object(__WEBPACK_IMPORTED_MODULE_2__helpers_46f4a262_js__[\"a\"])(true, el, this.name, (checked ? value : ''), disabled);\n        var path = indeterminate\n            ? Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"path\", { d: \"M6 12L18 12\" })\n            : Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"path\", { d: \"M5.9,12.5l3.8,3.8l8.8-8.8\" });\n        if (mode === 'md') {\n            path = indeterminate\n                ? Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"path\", { d: \"M2 12H22\" })\n                : Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"path\", { d: \"M1.73,12.91 8.1,19.28 22.79,4.59\" });\n        }\n        return (Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"a\" /* H */], { onClick: this.onClick, role: \"checkbox\", \"aria-disabled\": disabled ? 'true' : null, \"aria-checked\": \"\" + checked, \"aria-labelledby\": labelId, class: Object.assign(Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3__theme_18cbe2cc_js__[\"a\" /* c */])(color)), (_a = {}, _a[mode] = true, _a['in-item'] = Object(__WEBPACK_IMPORTED_MODULE_3__theme_18cbe2cc_js__[\"c\" /* h */])('ion-item', el), _a['checkbox-checked'] = checked, _a['checkbox-disabled'] = disabled, _a['checkbox-indeterminate'] = indeterminate, _a['interactive'] = true, _a)) }, Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"svg\", { class: \"checkbox-icon\", viewBox: \"0 0 24 24\" }, path), Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"button\", { type: \"button\", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: function (btnEl) { return _this.buttonEl = btnEl; } })));\n    };\n    Object.defineProperty(Checkbox.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Checkbox, \"watchers\", {\n        get: function () {\n            return {\n                \"checked\": [\"checkedChanged\"],\n                \"disabled\": [\"disabledChanged\"]\n            };\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Checkbox, \"style\", {\n        get: function () { return \":host{--background-checked:var(--ion-color-primary,#3880ff);--border-color-checked:var(--ion-color-primary,#3880ff);--checkmark-color:var(--ion-color-primary-contrast,#fff);--transition:none;display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-color){--background-checked:var(--ion-color-base);--border-color-checked:var(--ion-color-base);--checkmark-color:var(--ion-color-contrast)}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.checkbox-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-sizing:border-box;box-sizing:border-box}.checkbox-icon path{fill:none;stroke:var(--checkmark-color);stroke-width:1;opacity:0}:host(.checkbox-checked) .checkbox-icon,:host(.checkbox-indeterminate) .checkbox-icon{border-color:var(--border-color-checked);background:var(--background-checked)}:host(.checkbox-checked) .checkbox-icon path,:host(.checkbox-indeterminate) .checkbox-icon path{opacity:1}:host(.checkbox-disabled){pointer-events:none}:host{--border-radius:50%;--border-width:1px;--border-style:solid;--border-color:rgba(var(--ion-text-color-rgb,0,0,0),0.23);--background:var(--ion-item-background,var(--ion-background-color,#fff));--size:26px;width:var(--size);height:var(--size)}:host(.checkbox-disabled){opacity:.3}:host(.in-item){margin-left:0;margin-right:8px;margin-top:10px;margin-bottom:9px;display:block;position:static}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.in-item[slot=start]){margin-left:2px;margin-right:16px;margin-top:8px;margin-bottom:8px}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:16px;margin-inline-end:16px}}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return Checkbox;\n}());\nvar checkboxIds = 0;\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-checkbox-ios.entry.js\n// module id = 679\n// module chunks = 52\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-checkbox-ios.entry.js");

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return createColorClasses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getClassMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return hostContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return openURL; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar hostContext = function (selector, el) {\n    return el.closest(selector) !== null;\n};\n/**\n * Create the mode and color classes for the component based on the classes passed in\n */\nvar createColorClasses = function (color) {\n    var _a;\n    return (typeof color === 'string' && color.length > 0) ? (_a = {\n            'ion-color': true\n        },\n        _a[\"ion-color-\" + color] = true,\n        _a) : undefined;\n};\nvar getClassList = function (classes) {\n    if (classes !== undefined) {\n        var array = Array.isArray(classes) ? classes : classes.split(' ');\n        return array\n            .filter(function (c) { return c != null; })\n            .map(function (c) { return c.trim(); })\n            .filter(function (c) { return c !== ''; });\n    }\n    return [];\n};\nvar getClassMap = function (classes) {\n    var map = {};\n    getClassList(classes).forEach(function (c) { return map[c] = true; });\n    return map;\n};\nvar SCHEME = /^[a-z][a-z0-9+\\-.]*:/;\nvar openURL = function (url, ev, direction) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var router;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {\n            router = document.querySelector('ion-router');\n            if (router) {\n                if (ev != null) {\n                    ev.preventDefault();\n                }\n                return [2 /*return*/, router.push(url, direction)];\n            }\n        }\n        return [2 /*return*/, false];\n    });\n}); };\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js\n// module id = 745\n// module chunks = 1 2 3 4 5 6 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");

/***/ })

});