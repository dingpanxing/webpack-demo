/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-05 10:40:01
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 */
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base.conf")


const prodConfig = {
    mode: "production",
    devtool: "cheap-mudule-source-map",
};
module.exports = merge(baseConfig,prodConfig)