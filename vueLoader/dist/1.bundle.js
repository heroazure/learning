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
	__vue_template__ = __webpack_require__(9)
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
/***/ function(module, exports) {

	// <template>
	//     <div class="tab1" v-demo:hello.a.b="{value:'0',text:'nimei'}">
	//         {{msg}}
	//     </div>
	// </template>
	//
	// <script>
	var myMixin = {
	    created: function () {
	        this.hello();
	    },
	    methods: {
	        hello: function () {
	            console.log('hello from mixin!');
	        }
	    }
	};
	module.exports = {
	    mixins: [myMixin],
	    data: function () {
	        return {
	            msg: 'tab1'
	        };
	    },
	    directives: {
	        'demo': {
	            bind: function () {
	                console.log('bind begin...');
	            },
	            update: function (newVal, oldVal) {
	                this.el.innerHTML = 'name - ' + this.name + '<br>' + 'expression - ' + this.expression + '<br>' + 'argument - ' + this.arg + '<br>' + 'modifiers - ' + JSON.stringify(this.modifiers) + '<br>' + 'value - ' + JSON.stringify(newVal);
	            }
	        }
	    }
	};
	// </script>
	//
	// <style src="../less/tab1.less"></style>

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab1\" v-demo:hello.a.b=\"{value:'0',text:'nimei'}\">\n    {{msg}}\n</div>\n";

/***/ }
]);