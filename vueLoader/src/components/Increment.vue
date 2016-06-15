<template>
    <div>
        <button @click='increment'>加1</button>
        <button @click="reduce">减1</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import { incrementCounter } from '../vuex/actions'
    export default {
        vuex: {
            actions: {
                increment: incrementCounter,
//                reduce:reduceCounter
            }
        }
    }
</script>