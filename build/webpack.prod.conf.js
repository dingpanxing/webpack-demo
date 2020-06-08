/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-08 17:22:41
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 */
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.conf")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
    mode: "production",
    devtool: "cheap-mudule-source-map",
    plugins: [
      // new BundleAnalyzerPlugin(),

    ]
};
module.exports = prodConfig