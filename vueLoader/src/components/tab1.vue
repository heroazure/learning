<template>
    <div class="tab1" v-demo:hello.a.b="{value:'0',text:'nimei'}">
        {{msg}}
    </div>
</template>

<script>
    var myMixin = {
        created: function () {
            this.hello()
        },
        methods: {
            hello: function () {
                console.log('hello from mixin!')
            }
        }
    }
    module.exports={
        mixins:[myMixin],
        data: function () {
            return{
                msg:'tab1'
            }
        },
        directives:{
            'demo':{
                bind: function () {
                    console.log('bind begin...')
                },
                update: function (newVal, oldVal) {
                    this.el.innerHTML=      'name - '       + this.name + '<br>' +
                            'expression - ' + this.expression + '<br>' +
                            'argument - '   + this.arg + '<br>' +
                            'modifiers - '  + JSON.stringify(this.modifiers) + '<br>' +
                            'value - '      + JSON.stringify(newVal)
                }
            }
        }
    }
</script>

<style src="../less/tab1.less"></style>