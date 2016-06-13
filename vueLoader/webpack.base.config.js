/**
 * Created by heroxiao on 2016/5/27.
 */
var webpack=require('webpack')
var path=require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname,'dist/'),
        publicPath:'./dist/',
        //chunkFilename: '[id].chunk.js',
        filename:'bundle.js'
    },
    plugins:[
        new webpack.BannerPlugin('创建by heroxiao'),
        new ExtractTextPlugin('style.css',{allChunks: true})
    ],
    resolve: {
        //查找module的话从这里开始查找
        root: './src/components/', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            tab1 : 'tab1.vue',//后续直接 require('tab1') 即可
            tab2 : 'tab2.vue',//后续直接 require('tab1') 即可
            tab3 : 'tab3.vue'//后续直接 require('tab1') 即可
        }
    },
    module: {
        loaders: [{
            test: /\.vue?$/,
            exclude: /node_modules/,
            loader: 'vue'
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.less$/,
            loader: "style!css!postcss!less"
        },{
            test: /\.scss$/,
            loader: "style!css!postcss!sass"
        },{
            test: /\.css$/,
            //include:[path.join(__dirname,'Develop/')],
            loader: "style!css!postcss"
        },{
            test: /\.css$/,
            include: /node_modules/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpg|svg|gif|jpeg)$/,
            loader: 'url',
            query: {
                // inline files smaller then 10kb as base64 dataURL
                limit: 10000,
                // fallback to file-loader with this naming scheme
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?limit=100000'
        }]
    },
    // vue-loader configurations
    vue: {
        //postcss: [require('postcss-cssnext')()],
        // configure autoprefixer
        autoprefixer: {
            browsers: ['last 2 versions']
        },
        loaders: {
            js: 'babel',
            css: ExtractTextPlugin.extract('css'),
            less:ExtractTextPlugin.extract('css!postcss!less'),
            scss:ExtractTextPlugin.extract('css!postcss!sass')
        }
    }
}