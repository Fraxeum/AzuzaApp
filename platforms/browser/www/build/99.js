webpackJsonp([99],{

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startStatusTap\", function() { return startStatusTap; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_3c7f3790_js__ = __webpack_require__(72);\n\n\nvar startStatusTap = function () {\n    var win = window;\n    win.addEventListener('statusTap', function () {\n        Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"g\" /* f */])(function () {\n            var width = win.innerWidth;\n            var height = win.innerHeight;\n            var el = document.elementFromPoint(width / 2, height / 2);\n            if (!el) {\n                return;\n            }\n            var contentEl = el.closest('ion-content');\n            if (contentEl) {\n                contentEl.componentOnReady().then(function () {\n                    Object(__WEBPACK_IMPORTED_MODULE_0__core_ca0488fc_js__[\"m\" /* w */])(function () { return contentEl.scrollToTop(300); });\n                });\n            }\n        });\n    });\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/status-tap-a0df8284.js\n// module id = 757\n// module chunks = 99\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/status-tap-a0df8284.js");

/***/ })

});