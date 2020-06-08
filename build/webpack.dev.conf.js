/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-05 10:41:00
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 */
const webpack = require("webpack");
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.conf")

const devConfig = {
    mode: "development",
    devServer: {
        hot: true,
        contentBase: "./dist",
        port: 8080,
        open: true,
        hotOnly: true //如果HMR失效 不刷新
    },
    devtool: "cheap-mudule-eval-source-map",
    optimization:{
      usedExports:true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = merge(baseConfig,devConfig)