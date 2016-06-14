<template>
    <div>
        <button @click='increment'>加1</button>
        <button @click='reduceCounter'>减2</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import { incrementCounter,reduceCounter } from '../vuex/actions'
    export default {
        vuex: {
            actions: {
                increment: incrementCounter,
                reduceCounter:reduceCounter
            }
        }
    }
</script>