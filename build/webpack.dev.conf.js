/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-08 17:22:26
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 */
const webpack = require("webpack");

const devConfig = {
    mode: "development",
    devServer: {
        hot: true,
        contentBase: "./dist",
        port: 8080,
        open: true,
        historyApiFallback: true, //history模式
        proxy: {
            '/react': {
                target: 'http://www.dell-lee.com',
                changeOrigin: true, //突破限制元
                secure: true, //https
                pathRewrite: {
                    '/react': '/react'
                }
            }
        },
        hotOnly: true //如果HMR失效 不刷新
    },
    devtool: "cheap-mudule-eval-source-map",

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = devConfig