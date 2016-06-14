<template>
    <div class="tab2">
        {{msg}}
    </div>
</template>

<script type="text/ecmascript-6">
    module.exports={
        data: function () {
            return{
                msg:'tab2'
            }
        }
    }
</script>

<style>
    .tab2{
        color: #00ff00;
        border: 1px solid red;
    }
</style>