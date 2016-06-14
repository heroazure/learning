<template>
    <div class="container">
        <ul class="menus">
            <li v-link="{path:'/tab1'}">tab1</li>
            <li v-link="{path:'/tab2'}">tab2</li>
            <li v-link="{path:'/tab3'}">tab3</li>
        </ul>
        <router-view></router-view>

        <hr>
        <display></display>
        <increment></increment>
    </div>
</template>
<script type="text/ecmascript-6">
    import Display from './Display.vue'
    import Increment from './Increment.vue'
    import store from '../vuex/store.js'
    export default{
        components:{
            Display,
            Increment
        },
        store:store,
        data: function () {
            return{
                msg:'tab1'
            }
        }
    }
//module.exports={
//    components:{
//        Display,
//        Increment
//    },
//    store:store,
//    data: function () {
//        return{
//            msg:'tab1'
//        }
//    }
//}
</script>

<style>
    .menus{
        list-style: none;
    }
    .menus>li{
        float: left;
        cursor: pointer;
    }
</style>