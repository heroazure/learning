/**
 * Created by heroxiao on 2016/5/27.
 */
'use strict';

require('./style.css')
var Vue = require('./vue.js')
//import Vue from './vue.js';
/*var VuePaginate = require('paginate')
Vue.use(VuePaginate)*/
Vue.use(require('./vue-resource.js'))
Vue.http.interceptors.push({

    request: function (request) {
        console.log('request')
        return request;
    },

    response: function (response) {
        console.log('response')
        return response;
    }

});

/*Vue.http.options.root = '/root';
 Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';*/

new Vue({
    el: '#app',
    data: {
        msg: 'runing................',
        langs: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Ruby', 'Python']
    },
    /*http:{
     root:'',
     headers:{
     Authorization:'Basic YXBpOnBhc3N3b3Jk'
     }
     },*/
    ready: function () {

        // GET request
        this.$http({
            url: './data.json',
            method: 'GET',
            beforeSend: function (request) {
                console.log('beforeSend')
                //request.xhr.abort()
            }
        }).then(function (response) {
            // success callback
            console.log(response.status)
            console.log(JSON.stringify(response.data))
            console.log(response.headers('expires'))
            this.msg = response.data[0].name
        }, function (response) {
            // error callback
            console.log('error')
        });

       /* var resource = this.$resource('./data.json');

        // get item
        resource.get({id: 1}).then(function (response) {
            this.$set('msg', response.data[1].name+'000')
        });*/
    }
})

/*document.write('enter.js<br />')
 document.write(require('module1'))
 document.write(require('module2'))*/
//document.write(require('module3'))