webpackJsonp([67],{

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_infinite_scroll\", function() { return InfiniteScroll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ion_infinite_scroll_content\", function() { return InfiniteScrollContent; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__ = __webpack_require__(438);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_3c7f3790_js__ = __webpack_require__(72);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_3476b023_js__ = __webpack_require__(746);\n\n\n\n\nvar InfiniteScroll = /** @class */ (function () {\n    function class_1(hostRef) {\n        var _this = this;\n        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n        this.thrPx = 0;\n        this.thrPc = 0;\n        this.didFire = false;\n        this.isBusy = false;\n        this.isLoading = false;\n        /**\n         * The threshold distance from the bottom\n         * of the content to call the `infinite` output event when scrolled.\n         * The threshold value can be either a percent, or\n         * in pixels. For example, use the value of `10%` for the `infinite`\n         * output event to get called when the user has scrolled 10%\n         * from the bottom of the page. Use the value `100px` when the\n         * scroll is within 100 pixels from the bottom of the page.\n         */\n        this.threshold = '15%';\n        /**\n         * If `true`, the infinite scroll will be hidden and scroll event listeners\n         * will be removed.\n         *\n         * Set this to true to disable the infinite scroll from actively\n         * trying to receive new data while scrolling. This is useful\n         * when it is known that there is no more data that can be added, and\n         * the infinite scroll is no longer needed.\n         */\n        this.disabled = false;\n        /**\n         * The position of the infinite scroll element.\n         * The value can be either `top` or `bottom`.\n         */\n        this.position = 'bottom';\n        this.onScroll = function () {\n            var scrollEl = _this.scrollEl;\n            if (!scrollEl || !_this.canStart()) {\n                return 1;\n            }\n            var infiniteHeight = _this.el.offsetHeight;\n            if (infiniteHeight === 0) {\n                // if there is no height of this element then do nothing\n                return 2;\n            }\n            var scrollTop = scrollEl.scrollTop;\n            var scrollHeight = scrollEl.scrollHeight;\n            var height = scrollEl.offsetHeight;\n            var threshold = _this.thrPc !== 0 ? (height * _this.thrPc) : _this.thrPx;\n            var distanceFromInfinite = (_this.position === 'bottom')\n                ? scrollHeight - infiniteHeight - scrollTop - threshold - height\n                : scrollTop - infiniteHeight - threshold;\n            if (distanceFromInfinite < 0) {\n                if (!_this.didFire) {\n                    _this.isLoading = true;\n                    _this.didFire = true;\n                    _this.ionInfinite.emit();\n                    return 3;\n                }\n            }\n            else {\n                _this.didFire = false;\n            }\n            return 4;\n        };\n        this.ionInfinite = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"d\" /* c */])(this, \"ionInfinite\", 7);\n    }\n    class_1.prototype.thresholdChanged = function () {\n        var val = this.threshold;\n        if (val.lastIndexOf('%') > -1) {\n            this.thrPx = 0;\n            this.thrPc = (parseFloat(val) / 100);\n        }\n        else {\n            this.thrPx = parseFloat(val);\n            this.thrPc = 0;\n        }\n    };\n    class_1.prototype.disabledChanged = function () {\n        var disabled = this.disabled;\n        if (disabled) {\n            this.isLoading = false;\n            this.isBusy = false;\n        }\n        this.enableScrollEvents(!disabled);\n    };\n    class_1.prototype.connectedCallback = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var contentEl, _a;\n            var _this = this;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        contentEl = this.el.closest('ion-content');\n                        if (!contentEl) {\n                            console.error('<ion-infinite-scroll> must be used inside an <ion-content>');\n                            return [2 /*return*/];\n                        }\n                        _a = this;\n                        return [4 /*yield*/, contentEl.getScrollElement()];\n                    case 1:\n                        _a.scrollEl = _b.sent();\n                        this.thresholdChanged();\n                        this.disabledChanged();\n                        if (this.position === 'top') {\n                            Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"m\" /* w */])(function () {\n                                if (_this.scrollEl) {\n                                    _this.scrollEl.scrollTop = _this.scrollEl.scrollHeight - _this.scrollEl.clientHeight;\n                                }\n                            });\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    class_1.prototype.disconnectedCallback = function () {\n        this.enableScrollEvents(false);\n        this.scrollEl = undefined;\n    };\n    /**\n     * Call `complete()` within the `ionInfinite` output event handler when\n     * your async operation has completed. For example, the `loading`\n     * state is while the app is performing an asynchronous operation,\n     * such as receiving more data from an AJAX request to add more items\n     * to a data list. Once the data has been received and UI updated, you\n     * then call this method to signify that the loading has completed.\n     * This method will change the infinite scroll's state from `loading`\n     * to `enabled`.\n     */\n    class_1.prototype.complete = function () {\n        return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"b\" /* __awaiter */])(this, void 0, void 0, function () {\n            var scrollEl, prev_1;\n            var _this = this;\n            return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__[\"e\" /* __generator */])(this, function (_a) {\n                scrollEl = this.scrollEl;\n                if (!this.isLoading || !scrollEl) {\n                    return [2 /*return*/];\n                }\n                this.isLoading = false;\n                if (this.position === 'top') {\n                    /**\n                     * New content is being added at the top, but the scrollTop position stays the same,\n                     * which causes a scroll jump visually. This algorithm makes sure to prevent this.\n                     * (Frame 1)\n                     *    - complete() is called, but the UI hasn't had time to update yet.\n                     *    - Save the current content dimensions.\n                     *    - Wait for the next frame using _dom.read, so the UI will be updated.\n                     * (Frame 2)\n                     *    - Read the new content dimensions.\n                     *    - Calculate the height difference and the new scroll position.\n                     *    - Delay the scroll position change until other possible dom reads are done using _dom.write to be performant.\n                     * (Still frame 2, if I'm correct)\n                     *    - Change the scroll position (= visually maintain the scroll position).\n                     *    - Change the state to re-enable the InfiniteScroll.\n                     *    - This should be after changing the scroll position, or it could\n                     *    cause the InfiniteScroll to be triggered again immediately.\n                     * (Frame 3)\n                     *    Done.\n                     */\n                    this.isBusy = true;\n                    prev_1 = scrollEl.scrollHeight - scrollEl.scrollTop;\n                    // ******** DOM READ ****************\n                    requestAnimationFrame(function () {\n                        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"g\" /* f */])(function () {\n                            // UI has updated, save the new content dimensions\n                            var scrollHeight = scrollEl.scrollHeight;\n                            // New content was added on top, so the scroll position should be changed immediately to prevent it from jumping around\n                            var newScrollTop = scrollHeight - prev_1;\n                            // ******** DOM WRITE ****************\n                            requestAnimationFrame(function () {\n                                Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"m\" /* w */])(function () {\n                                    scrollEl.scrollTop = newScrollTop;\n                                    _this.isBusy = false;\n                                });\n                            });\n                        });\n                    });\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    class_1.prototype.canStart = function () {\n        return (!this.disabled &&\n            !this.isBusy &&\n            !!this.scrollEl &&\n            !this.isLoading);\n    };\n    class_1.prototype.enableScrollEvents = function (shouldListen) {\n        if (this.scrollEl) {\n            if (shouldListen) {\n                this.scrollEl.addEventListener('scroll', this.onScroll);\n            }\n            else {\n                this.scrollEl.removeEventListener('scroll', this.onScroll);\n            }\n        }\n    };\n    class_1.prototype.render = function () {\n        var _a;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        var disabled = this.disabled;\n        return (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"a\" /* H */], { class: (_a = {},\n                _a[mode] = true,\n                _a['infinite-scroll-loading'] = this.isLoading,\n                _a['infinite-scroll-enabled'] = !disabled,\n                _a) }));\n    };\n    Object.defineProperty(class_1.prototype, \"el\", {\n        get: function () { return Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"f\" /* e */])(this); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(class_1, \"watchers\", {\n        get: function () {\n            return {\n                \"threshold\": [\"thresholdChanged\"],\n                \"disabled\": [\"disabledChanged\"]\n            };\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(class_1, \"style\", {\n        get: function () { return \"ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return class_1;\n}());\nvar InfiniteScrollContent = /** @class */ (function () {\n    function InfiniteScrollContent(hostRef) {\n        Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"l\" /* r */])(this, hostRef);\n    }\n    InfiniteScrollContent.prototype.componentDidLoad = function () {\n        if (this.loadingSpinner === undefined) {\n            var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n            this.loadingSpinner = __WEBPACK_IMPORTED_MODULE_2__config_3c7f3790_js__[\"b\"].get('infiniteLoadingSpinner', __WEBPACK_IMPORTED_MODULE_2__config_3c7f3790_js__[\"b\"].get('spinner', mode === 'ios' ? 'lines' : 'crescent'));\n        }\n    };\n    InfiniteScrollContent.prototype.render = function () {\n        var _a;\n        var mode = Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"e\" /* d */])(this);\n        return (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"a\" /* H */], { class: (_a = {},\n                _a[mode] = true,\n                // Used internally for styling\n                _a[\"infinite-scroll-content-\" + mode] = true,\n                _a) }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"infinite-loading\" }, this.loadingSpinner && (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"infinite-loading-spinner\" }, Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"ion-spinner\", { name: this.loadingSpinner }))), this.loadingText && (Object(__WEBPACK_IMPORTED_MODULE_1__core_ca0488fc_js__[\"i\" /* h */])(\"div\", { class: \"infinite-loading-text\", innerHTML: Object(__WEBPACK_IMPORTED_MODULE_3__index_3476b023_js__[\"a\" /* s */])(this.loadingText) })))));\n    };\n    Object.defineProperty(InfiniteScrollContent, \"style\", {\n        get: function () { return \"ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}\\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line{stroke:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600,#666)}\"; },\n        enumerable: true,\n        configurable: true\n    });\n    return InfiniteScrollContent;\n}());\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/ion-infinite-scroll_2-ios.entry.js\n// module id = 689\n// module chunks = 67\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/ion-infinite-scroll_2-ios.entry.js");

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return sanitizeDOMString; });\n/**\n * Does a simple sanitization of all elements\n * in an untrusted string\n */\nvar sanitizeDOMString = function (untrustedString) {\n    try {\n        if (typeof untrustedString !== 'string' || untrustedString === '') {\n            return untrustedString;\n        }\n        /**\n         * Create a document fragment\n         * separate from the main DOM,\n         * create a div to do our work in\n         */\n        var documentFragment_1 = document.createDocumentFragment();\n        var workingDiv = document.createElement('div');\n        documentFragment_1.appendChild(workingDiv);\n        workingDiv.innerHTML = untrustedString;\n        /**\n         * Remove any elements\n         * that are blocked\n         */\n        blockedTags.forEach(function (blockedTag) {\n            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);\n            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {\n                var element = getElementsToRemove[elementIndex];\n                if (element.parentNode) {\n                    element.parentNode.removeChild(element);\n                }\n                else {\n                    documentFragment_1.removeChild(element);\n                }\n                /**\n                 * We still need to sanitize\n                 * the children of this element\n                 * as they are left behind\n                 */\n                var childElements = getElementChildren(element);\n                /* tslint:disable-next-line */\n                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {\n                    sanitizeElement(childElements[childIndex]);\n                }\n            }\n        });\n        /**\n         * Go through remaining elements and remove\n         * non-allowed attribs\n         */\n        // IE does not support .children on document fragments, only .childNodes\n        var dfChildren = getElementChildren(documentFragment_1);\n        /* tslint:disable-next-line */\n        for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {\n            sanitizeElement(dfChildren[childIndex]);\n        }\n        // Append document fragment to div\n        var fragmentDiv = document.createElement('div');\n        fragmentDiv.appendChild(documentFragment_1);\n        // First child is always the div we did our work in\n        var getInnerDiv = fragmentDiv.querySelector('div');\n        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;\n    }\n    catch (err) {\n        console.error(err);\n        return '';\n    }\n};\n/**\n * Clean up current element based on allowed attributes\n * and then recursively dig down into any child elements to\n * clean those up as well\n */\nvar sanitizeElement = function (element) {\n    // IE uses childNodes, so ignore nodes that are not elements\n    if (element.nodeType && element.nodeType !== 1) {\n        return;\n    }\n    for (var i = element.attributes.length - 1; i >= 0; i--) {\n        var attribute = element.attributes.item(i);\n        var attributeName = attribute.name;\n        // remove non-allowed attribs\n        if (!allowedAttributes.includes(attributeName.toLowerCase())) {\n            element.removeAttribute(attributeName);\n            continue;\n        }\n        // clean up any allowed attribs\n        // that attempt to do any JS funny-business\n        var attributeValue = attribute.value;\n        /* tslint:disable-next-line */\n        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {\n            element.removeAttribute(attributeName);\n        }\n    }\n    /**\n     * Sanitize any nested children\n     */\n    var childElements = getElementChildren(element);\n    /* tslint:disable-next-line */\n    for (var i = 0; i < childElements.length; i++) {\n        sanitizeElement(childElements[i]);\n    }\n};\n/**\n * IE doesn't always support .children\n * so we revert to .childNodes instead\n */\nvar getElementChildren = function (el) {\n    return (el.children != null) ? el.children : el.childNodes;\n};\nvar allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];\nvar blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js\n// module id = 746\n// module chunks = 12 13 14 15 16 17 18 19 64 65 66 67\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/node_modules/@ionic/core/dist/esm-es5/index-3476b023.js");

/***/ })

});