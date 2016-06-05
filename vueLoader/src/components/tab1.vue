<template>
    <div class="tab1">
        {{msg}}
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
    .tab1{
        color: #ff0000;
    }
</style>