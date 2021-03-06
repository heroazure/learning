var Vue =require('vue')
var VueRouter=require('vue-router')
Vue.use(VueRouter)
var router = new VueRouter({
    //history: true,
    saveScrollPosition: true,
    linkActiveClass: 'active'//当前激活的路由链接（包括父级链接）自动添加的class
})
router.map({
    '/':{
        component: function (resolve) {
            require(['../components/tab1.vue'],resolve)
        }
    },
    '/tab1':{
        component:function (resolve) {
            require(['../components/tab1.vue'],resolve)
        }
    },
    '/tab2':{
        component:function (resolve) {
            require(['../components/tab2.vue'],resolve)
        }
    },
    '/tab3':{
        component:function (resolve) {
            require(['../components/tab3.vue'],resolve)
        }
    }
})
router.redirect({

    // 重定向任意未匹配路径到 /crm
    '*': {
        component: function (resolve) {
            //require(['../components/Crm.vue'], resolve)
        }
    }
})
router.alias({

})

module.exports=router
