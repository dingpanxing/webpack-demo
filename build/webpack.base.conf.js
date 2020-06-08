/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-08 17:26:14
 * ==================
 * 1.source-map 方式
 * 2.bable-polyfill  useBuiltIns:'usage' 转义ES6=>ES5 增大文件体积 
 * 
 * ==================
 * spitChunks
 * 1.同步代码 配置opimization{ splitChunks:{chunks:'all'}}
 * 2.异步代码 import().then() 返回 异步调用
 * 3.css splitChunks MiniCssExtractPlugin
 * ==================
 * 4.打包兼容 Shimming (垫片)  自己定义的 $ 和 jquery $ 重复 ProvidePlugin()
 * 5.imports-loader {loader:'imports-loader?this => window'} 改变this指向
 * ==================
 * 6.环境变量使用 module.exports = (env) =>{if(env && env.production){return merge()}}
 * 
 */
const path = require("path");
// const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require("webpack-merge")
const webpack = require("webpack");
const prodConfig = require("./webpack.prod.conf")
const devConfig = require("./webpack.dev.conf")


const baseConfig = {
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
                  MiniCssExtractPlugin.loader,
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
    optimization:{ // tree-shaking
      runtimeChunk:{name:'sigle'}, // 新老版本 hash值变化 （老版本缓存失效 不改变内容 也会打包新hash）
      usedExports:true,
      splitChunks:{
        chunks:'all',
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
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[name].chunk.css"
        }),
        
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({ 
          $:'jquery',
          _:'lodash'
        })
        // new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        publicPath: "/",
        filename: "[name]_[hash].js",
        chunkFilename:"[name].chunk.js",// main 引用的用 chunkFilename
        path: path.resolve(__dirname, "../dist"),
    },
};

module.exports = (env)=>{
  if (env && env.production){
    return merge(baseConfig,prodConfig)
  } else {
    return merge(baseConfig,devConfig)
  }
}
