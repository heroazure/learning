/**
 * Created by heroxiao on 2016/6/5.
 */
var Vue=require('vue')
var vueResource=require('vue-resource')
var router=require('./router/router.config.js')
var app=require('./components/app.vue')

Vue.use(vueResource)
router.start(app,'#app')