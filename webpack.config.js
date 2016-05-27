/**
 * Created by heroxiao on 2016/5/27.
 */
var webpack=require('webpack')
module.exports={
    entry:'./webpackdemo/enter.js',
    output:{
        path:'./webpackdemo/',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/, loader: 'style!css'
            }
        ]
    }
}