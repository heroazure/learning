/**
 * Created by heroxiao on 2016/5/21.
 */
var index = function () {

    //Vue组件
    function component() {
        //demo1(全局注册)
        var component1 = Vue.extend({
            template: '<div>第一个自定义vue组件</div>'
        })
        Vue.component('h-comp1', component1)


        //demo2(局部注册)
        var child = Vue.extend({
            template: '<p>我是子组件</p>'
        })
        var parent = Vue.extend({
            template: '<div>我是父组件</div><h-child></h-child>',
            components: {
                'h-child': child
            }
        })
        Vue.component('v-parent1', parent)

        // 在一个步骤中扩展与注册
        Vue.component('h-parent2', {
            template: '<div>我是在一个步骤中扩展与注册的父组件</div><h-child2></h-child2>',
            components: {
                'h-child2': {
                    template: '<div>我是在一个步骤中扩展与注册的child组件</div>'
                }
            }
        })

        var child2 = Vue.extend({
            template: '<h2>{{msg}}</h2><h4>{{msg2}}</h4><h-child3 :msg3="dd"></h-child3>',
            props: {
                msg: {
                    type: String,
                    default: function () {
                        return this.$parent.def1
                    }
                },
                msg2: null
            },
            data: function () {
                return {
                    dd: '自定义组件数据'
                }
            },
            components: {
                'h-child3': {
                    template: '<figure>{{msg3}}</figure>',
                    props: {
                        msg3: {
                            type: String,
                            default: function () {
                                return this.$root.def1
                            }
                        }
                    }
                }
            }
        })
        Vue.component('h-child2', child2)

        var vm = new Vue({
            el: '#app',
            data: {
                pmsg: '动态 Props',
                pmsg2: '动态 Props2222',
                def1: '默认值'
            }
        })

        //自定义事件
        Vue.component('h-child4', {
            template: '#temp1',
            data: function () {
                return {
                    msg: ''
                }
            },
            methods: {
                notify: function () {
                    if (this.msg.trim()) {
                        this.$dispatch('child-patch', this.msg)
                    }
                    this.msg = ''
                }
            }
        })

        new Vue({
            el: '#custom-event',
            data: {
                messages: []
            },
            /*events:{
             'child-patch': function (msg) {
             this.messages.push(msg)
             }
             },*/
            methods: {
                handleIt: function (msg) {
                    this.messages.push(msg)
                    //alert(this.$refs.child4.msg)
                }
            }
        })

        //动态组件
       var vm2= new Vue({
            el:'#dynamic',
            data:{
                currentView:'h-home'
            },
            components:{
                "h-home":{
                    template:'<h1>我是home组件</h1>',
                    /*activate: function () {
                        //alert('home')
                    }*/
                },
                'h-artic':{
                    template:'<h1>我是artic组件</h1>',
                    /*activate: function () {
                        //alert('artic')
                    }*/
                }
            }
        })
        //window.vm2=vm2

    }

    //css3过渡
    function transition(){

        new Vue({
            el:'#transition',
            data:{
                show:true
            },
            methods:{
                click1: function () {
                    this.show=!this.show
                }
            }
        })

        Vue.transition('expand',{
            beforeEnter: function (el) {
                el.textContent='beforeEnter'
            },
            Enter: function (el) {
                el.textContent='Enter'
            },
            afterEnter: function (el) {
                el.textContent='afterEnter'
            },
            enterCancelled: function (el) {
                el.textContent='enterCancelled'
            },
            beforeLeave: function (el) {
                el.textContent = 'beforeLeave'
            },
            leave: function (el) {
                el.textContent = 'leave'
            },
            afterLeave: function (el) {
                el.textContent = 'afterLeave'
            },
            leaveCancelled: function (el) {
                // handle cancellation
            }
        })
    }

    //表单控件
    function forms(){
        new Vue({
            el:'#forms',
            data:{
                checkedNames:[],
                checked:false
            },
            init: function () {
                //this.checked=true
            },
            created: function () {
                console.log(this.checked)
                console.log(this.$el)
                this.checked=true
            },
            beforeCompile: function () {
                console.log(this.checked)
                console.log(this.$el)
            },
            ready: function () {
                console.log(this.$el)
            }
        })
    }

    return {
        component: component,
        transition:transition,
        forms:forms
    }
}();