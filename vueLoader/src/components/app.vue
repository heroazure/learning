<template>
    <div class="container">
        <ul class="menus">
            <li v-link="{path:'/tab1'}">tab1</li>
            <li v-link="{path:'/tab2'}">tab2</li>
            <li v-link="{path:'/tab3'}">tab3</li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
module.exports={
    data: function () {
        return{
            msg:'tab1'
        }
    }
}
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