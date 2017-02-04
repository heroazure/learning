var webpack = require('webpack');
var path = require('path');
var config = {
    entry: {
        index: [
            path.join(__dirname, './index.js')
        ]
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.less', '.css', '.vue']
    }
};
module.exports = config;