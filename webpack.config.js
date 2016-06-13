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
    },
    plugins:[
        new webpack.BannerPlugin('鍒涘缓by heroxiao')
    ],
    resolve: {
        //查找module的话从这里开始查找
        root: './webpackdemo/', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            module1 : 'module1.js',//后续直接 require('module1') 即可
            module2 : 'module2.js',//后续直接 require('module1') 即可
            module3 : 'module3.js',//后续直接 require('module1') 即可
            paginate : 'vue-paginate.min.js'//后续直接 require('module1') 即可
        }
    }
}