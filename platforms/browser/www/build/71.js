webpackJsonp([71],{

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SupportPageModule\", function() { return SupportPageModule; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message__ = __webpack_require__(769);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(166);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(18);\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\n\nvar SupportPageModule = /** @class */ (function () {\n    function SupportPageModule() {\n    }\n    SupportPageModule = __decorate([\n        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__[\"J\" /* NgModule */])({\n            declarations: [\n                __WEBPACK_IMPORTED_MODULE_2__message__[\"a\" /* MessagePage */]\n            ],\n            imports: [\n                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__[\"p\" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__message__[\"a\" /* MessagePage */]), __WEBPACK_IMPORTED_MODULE_3__angular_http__[\"a\" /* HttpModule */],\n            ],\n            exports: [\n                __WEBPACK_IMPORTED_MODULE_2__message__[\"a\" /* MessagePage */]\n            ],\n            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_user_user__[\"a\" /* UserProvider */]]\n        })\n    ], SupportPageModule);\n    return SupportPageModule;\n}());\n\n//# sourceMappingURL=message.module.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/message/message.module.ts\n// module id = 657\n// module chunks = 71\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/src/pages/message/message.module.ts");

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return MessagePage; });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(18);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth__ = __webpack_require__(46);\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\n\nvar MessagePage = /** @class */ (function () {\n    function MessagePage(navCtrl, user, toastCtrl) {\n        this.navCtrl = navCtrl;\n        this.user = user;\n        this.toastCtrl = toastCtrl;\n        this.message = null;\n        this.loadChatListTopics();\n    }\n    MessagePage.prototype.loadChatListTopics = function () {\n        var _this = this;\n        this.user.getSupportTopics().then(function (data) { return __awaiter(_this, void 0, void 0, function () {\n            var _a;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        if (!data || (!data.success && data.code == \"1000\") || !(data.data)) {\n                            this.exitToLoginPage();\n                            return [2 /*return*/, false];\n                        }\n                        if (data.data && data.data.length < 1) {\n                            this.chatListTopics = [\n                                {\n                                    \"Name\": \"Assets\",\n                                    \"value\": \"2\"\n                                },\n                                {\n                                    \"Name\": \"KYC\",\n                                    \"value\": \"3\"\n                                },\n                                {\n                                    \"Name\": \"Other\",\n                                    \"value\": \"4\"\n                                },\n                                {\n                                    \"Name\": \"Problem signin in\",\n                                    \"value\": \"1\"\n                                }\n                            ];\n                            return [2 /*return*/];\n                        }\n                        _a = this;\n                        return [4 /*yield*/, data.data];\n                    case 1:\n                        _a.chatListTopics = _b.sent();\n                        return [2 /*return*/];\n                }\n            });\n        }); });\n    };\n    MessagePage.prototype.openChat = function () {\n        // console.log(proptype);\n        this.navCtrl.push('page-chat-detail');\n    };\n    MessagePage.prototype.send = function () {\n    };\n    MessagePage.prototype.exitToLoginPage = function (message) {\n        if (!message) {\n            message = \"Your session has expired. Please log in again.\";\n        }\n        this.user.setToast(message);\n        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__auth_auth__[\"a\" /* AuthPage */]);\n    };\n    MessagePage = __decorate([\n        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__[\"n\" /* Component */])({\n            selector: 'page-message',template:/*ion-inline-start:\"/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/src/pages/message/message.html\"*/'<ion-header>\\n\t<ion-navbar>\\n\t\t<button ion-button menuToggle>\\n\t\t\t<ion-icon name=\"menu\" color=\"light\"></ion-icon>\\n\t\t</button>\\n\t\t<ion-title>Support message</ion-title>\\n\t</ion-navbar>\\n</ion-header>\\n\\n<ion-content>\\n\\n\t<ion-grid no-padding>\\n\t\t<ion-row nowrap no-padding>\\n\t\t\t<ion-col col-12 no-padding>\\n\\n\t\t\t\t<ion-item class=\"share-list-item padding-LR-5\">\\n\t\t\t\t\t<ion-label class=\"text-white\">Set support topic</ion-label>\\n\t\t\t\t\t<ion-select>\\n\t\t\t\t\t\t<ion-option *ngFor=\"let item of chatListTopics\" value=\"{{item.value}}\">\\n\t\t\t\t\t\t\t{{item.Name}}\\n\t\t\t\t\t\t</ion-option>\\n\t\t\t\t\t</ion-select>\\n\t\t\t\t</ion-item>\\n\\n\t\t\t\t<ion-item class=\"share-list-item\">\\n\t\t\t\t\t<ion-textarea [(ngModel)]=\"message\" placeholder=\"Type your message\" rows=\"4\" maxLength=\"5000\" autocomplete=\"on\"\\n\t\t\t\t\t\tautocorrect=\"on\"></ion-textarea>\\n\t\t\t\t</ion-item>\\n\t\t\t\t<div style=\"margin-top: 11px;\">\\n\t\t\t\t\t<button ion-button block (click)=\"send()\" color=\"secondary\"\\n\t\t\t\t\t\t[disabled]=\"message != null && message.length > 10\">Send</button>\\n\t\t\t\t</div>\\n\t\t\t</ion-col>\\n\t\t</ion-row>\\n\t</ion-grid>\\n\\n</ion-content>'/*ion-inline-end:\"/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/src/pages/message/message.html\"*/\n        }),\n        __metadata(\"design:paramtypes\", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__[\"u\" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_user__[\"a\" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__[\"A\" /* ToastController */]])\n    ], MessagePage);\n    return MessagePage;\n}());\n\n//# sourceMappingURL=message.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/pages/message/message.ts\n// module id = 769\n// module chunks = 71\n\n//# sourceURL=/Users/llewellynmorkel/Desktop/AZUZAAPP/AZUZA_0.1.1/src/pages/message/message.ts");

/***/ })

});