/**
 * Created by heroxiao on 2016/5/27.
 */
define(function (require, exports, module) {
    'use strict';

    require('./style.css')
    var Vue=require('./vue.js')
    Vue.use(require('./vue-resource.js'))
    document.write('running...')
    document.write(require('./module.js'))
})