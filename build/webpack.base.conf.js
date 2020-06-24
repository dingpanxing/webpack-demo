/*
 * @Descripttion:
 * @version:
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-24 13:47:24
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
 * ==================
 * PWA
 * npm install workbox-webpack-plugin -d
 * 
 */
const path = require("path");
// const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require("webpack-merge")
    // const webpack = require("webpack");
const prodConfig = require("./webpack.prod.conf")
const devConfig = require("./webpack.dev.conf")

// 打包多页面和dllplugin
const makePlugins = (configs) => {
	const plugins = [
    // new FileManagerPlugin({
        //     onStart: {
        //         // 删除压缩包
        //         delete: ["dist"],
        //     },
        // }),
      new MiniCssExtractPlugin({
          filename: "css/[name].css",
          chunkFilename: "css/[name].chunk.css"
      }),
      new CleanWebpackPlugin(),
      // new webpack.ProvidePlugin({ 
      //   $:'jquery',
      //   _:'lodash'
      // })
      // new webpack.HotModuleReplacementPlugin(),
	];
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: `${item}.html`,
				chunks: ['runtime', 'vendors', item]
			})
		)
	});
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
	files.forEach(file => {
		if(/.*\.dll.js/.test(file)) {
			plugins.push(new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file)
			}))
		}
		if(/.*\.manifest.json/.test(file)) {
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file)
			}))
		}
	});
	return plugins;
}

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
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // options: {  plugins: ["transform-class-properties"] }
                // options:{
                //   presets:[["babel-preset-env",{
                //     useBuiltIns:'usage'
                //   }]]
                // }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
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
                test: /\.(scss|css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //   // 只在开发模式中启用热更新
                        //   hmr: devMode,
                        //   // 如果模块热更新不起作用，重新加载全部样式
                        //   reloadAll: true,
                        // },
                    },
                    'css-loader', 'postcss-loader', 'sass-loader'
                ],
            },
        ],
    },
    optimization: { // tree-shaking
        runtimeChunk: {
            name: 'sigle'
        }, // 新老版本 hash值变化 （老版本缓存失效 不改变内容 也会打包新hash）
        usedExports: true,
        splitChunks: {
            chunks: 'all',
        }
    },
    output: {
        publicPath: "/",
        filename: "js/[name]_[hash].js",
        chunkFilename: "js/[name].chunk.js", // main 引用的用 chunkFilename
        path: path.resolve(__dirname, "../dist"),
    },
};
baseConfig.plugins = makePlugins(baseConfig);
module.exports = (env) => {
    if (env && env.production) {
        return merge(baseConfig, prodConfig)
    } else {
        return merge(baseConfig, devConfig)
    }
}