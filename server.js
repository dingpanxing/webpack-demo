/*
 * @Descripttion: 
 * @version: 
 * @Author: dpx
 * @Date: 2020-06-03 16:17:01
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-03 16:25:35
 */ 
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const comper = webpack(config)
const app = express()

app.use(webpackDevMiddleware(comper,{
  publicPath:config.output.publicPath
}))


app.listen(3000,()=>{
  console.log('server is runing')
})
