"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[557,498],{188:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": function() { return /* binding */ ChangeClient; }\n/* harmony export */ });\n/* harmony import */ var _classes_AddClient_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(366);\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(861);\n/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(509);\nfunction _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\nvar ChangeClient = /*#__PURE__*/function (_AddClient) {\n  _inherits(ChangeClient, _AddClient);\n\n  var _super = _createSuper(ChangeClient);\n\n  function ChangeClient(client) {\n    var _thisSuper, _this;\n\n    _classCallCheck(this, ChangeClient);\n\n    _this = _super.call(this);\n    _this.client = client;\n\n    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(ChangeClient.prototype)), "getModal", _thisSuper).call(_thisSuper, \'app-modal--add\');\n\n    return _this;\n  }\n\n  _createClass(ChangeClient, [{\n    key: "getComponent",\n    value: function getComponent() {\n      var heading = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\'h2\', \'Изменить данные\', {\n        class: \'app-modal__heading\'\n      });\n      var id = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\'span\', "ID: ".concat(this.client.id), {\n        class: \'app-modal__id\'\n      });\n      var btnSave = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\'button\', \'Сохранить\', {\n        class: \'app__btn--primary app-modal__btn\'\n      });\n      var btnDel = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\'button\', \'Удалить клиента\', {\n        class: \'app-modal__btn--subbtn\'\n      });\n      var form = this.getForm([btnSave, btnDel], this.client);\n      (0,redom__WEBPACK_IMPORTED_MODULE_2__/* .mount */ .LI)(this.modalInner, heading);\n      (0,redom__WEBPACK_IMPORTED_MODULE_2__/* .mount */ .LI)(this.modalInner, id);\n      (0,redom__WEBPACK_IMPORTED_MODULE_2__/* .mount */ .LI)(this.modalInner, form);\n      this.btnSave = btnSave;\n      this.btnDel = btnDel;\n      this.validation();\n      return this.modal;\n    }\n  }]);\n\n  return ChangeClient;\n}(_classes_AddClient_ts__WEBPACK_IMPORTED_MODULE_0__["default"]);\n\n\n\n//# sourceURL=webpack:///./classes/ChangeClient.ts?')}}]);