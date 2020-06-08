/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-05 14:34:42
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 * 
 * ==================
 * spitChunks
 * 1.同步代码 配置opimization{ splitChunks:{chunks:'all'}}
 * 2.异步代码 import().then() 返回 异步调用
 */
const path = require("path");
// const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/index.js",
        // sub: "./src/index.js",
    },
    // devtool: "cheap-mudule-eval-source-map",
    // devtool: "cheap-mudule-eval-source-map",
    // devtool: 'cheap-module-inline-source-map',
    // devtool: 'cheap-module-eval-source-map',dev
    // devtool: 'cheap-module-source-map',pro
    module: {
        rules: [
          {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:"babel-loader",
            // options: {  plugins: ["transform-class-properties"] }
            // options:{
            //   presets:[["babel-preset-env",{
            //     useBuiltIns:'usage'
            //   }]]
            // }
          },
          {
                test: /\.(jpg|gif|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        //placeholder
                        name: "[name]_[hash].[ext]",
                        outputPath: "img/",
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.(woff2?|eot|ttf|svg)(\?.*)?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "font/",
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // importLoaders: 2,
                            // modules:true
                        },
                    },
                    "sass-loader",
                    "postcss-loader",
                ],
            },
        ],
    },
    optimization:{
      splitChunks:{
        chunks:'all'
      }
    },
    plugins: [
        // new FileManagerPlugin({
        //     onStart: {
        //         // 删除压缩包
        //         delete: ["dist"],
        //     },
        // }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        publicPath: "/",
        filename: "[name]_[hash].js",
        path: path.resolve(__dirname, "../dist"),
    },
};