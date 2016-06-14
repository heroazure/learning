/*! 创建by heroxiao */
webpackJsonp([2],{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(15)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\tab2.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tab2.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 14:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 15:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	    data: function data() {
	        return {
	            msg: 'tab2'
	        };
	    }
	};

/***/ },

/***/ 16:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab2\">\n    {{msg}}\n</div>\n";

/***/ }

});
//# sourceMappingURL=2.bundle.js.map