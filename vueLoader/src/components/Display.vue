<template>
    <div>
        <h3>Count is {{countValue}}</h3>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getCount} from '../vuex/getters'
    export default {
        data(){
            return{

            }
        },
        vuex:{
            getters:{
                countValue:getCount
            }
        }
    }
</script>