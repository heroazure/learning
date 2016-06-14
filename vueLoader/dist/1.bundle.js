/*! 创建by heroxiao */
webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(7)
	__vue_script__ = __webpack_require__(8)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\tab1.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tab1.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(9);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var myMixin = {
	    created: function created() {
	        this.hello();
	    },
	    methods: {
	        hello: function hello() {
	            console.log('hello from mixin!');
	        }
	    }
	};
	module.exports = {
	    mixins: [myMixin],
	    data: function data() {
	        return {
	            msg: 'tab1'
	        };
	    },
	    directives: {
	        'demo': {
	            bind: function bind() {
	                console.log('bind begin...');
	            },
	            update: function update(newVal, oldVal) {
	                this.el.innerHTML = 'name - ' + this.name + '<br>' + 'expression - ' + this.expression + '<br>' + 'argument - ' + this.arg + '<br>' + 'modifiers - ' + (0, _stringify2.default)(this.modifiers) + '<br>' + 'value - ' + (0, _stringify2.default)(newVal);
	            }
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(11)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab1\" v-demo:hello.a.b=\"{value:'0',text:'nimei'}\">\n    {{msg}}\n</div>\n";

/***/ }
]);
//# sourceMappingURL=1.bundle.js.map