webpackJsonp([30],{

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_text\", function() { return Text; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_18cbe2cc_js__ = __webpack_require__(745);\n\n\n\nvar Text = /** @class */ (function () {\n    function Text(hostRef) {\n        Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n    }\n    Text.prototype.render = function () {\n        var _a;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"e\" /* d */])(this);\n        return (Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"a\" /* H */], { class: Object.assign(Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_2__theme_18cbe2cc_js__[\"a\" /* c */])(this.color)), (_a = {}, _a[mode] = true, _a)) }, Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"i\" /* h */])(\"slot\", null)));\n    };\n    Object.defineProperty(Text, \"style\", {\n        get: function () { return \":host(.ion-color){color:var(--ion-color-base)}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return Text;\n}());\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-text.entry.js\n// module id = 732\n// module chunks = 30\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-text.entry.js");

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return createColorClasses; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return getClassMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return hostContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return openURL; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n\nvar hostContext = function (selector, el) {\n    return el.closest(selector) !== null;\n};\n/**\n * Create the mode and color classes for the component based on the classes passed in\n */\nvar createColorClasses = function (color) {\n    var _a;\n    return (typeof color === 'string' && color.length > 0) ? (_a = {\n            'ion-color': true\n        },\n        _a[\"ion-color-\" + color] = true,\n        _a) : undefined;\n};\nvar getClassList = function (classes) {\n    if (classes !== undefined) {\n        var array = Array.isArray(classes) ? classes : classes.split(' ');\n        return array\n            .filter(function (c) { return c != null; })\n            .map(function (c) { return c.trim(); })\n            .filter(function (c) { return c !== ''; });\n    }\n    return [];\n};\nvar getClassMap = function (classes) {\n    var map = {};\n    getClassList(classes).forEach(function (c) { return map[c] = true; });\n    return map;\n};\nvar SCHEME = /^[a-z][a-z0-9+\\-.]*:/;\nvar openURL = function (url, ev, direction) { return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(void 0, void 0, void 0, function () {\n    var router;\n    return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {\n            router = document.querySelector('ion-router');\n            if (router) {\n                if (ev != null) {\n                    ev.preventDefault();\n                }\n                return [2 /*return*/, router.push(url, direction)];\n            }\n        }\n        return [2 /*return*/, false];\n    });\n}); };\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js\n// module id = 745\n// module chunks = 1 2 3 4 5 6 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js");

/***/ })

});