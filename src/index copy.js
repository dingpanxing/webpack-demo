/*
 * @Descripttion: 
 * @version: 
 * @Author: dpx
 * @Date: 2020-06-02 12:00:29
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-04 16:45:38
 */
// import avatar from './avatar.jpg';
// import style from './index.scss'
// import {creatImg} from './avt'

// new creatImg()
// var img = new Image();
// img.src = avatar;
// img.classList.add(style.avater)
// var root = document.getElementById('root');
// root.append(img);
// import './index.scss'
// import creatDiv from './avt'
// import creatDivs from './avt copy'
// import ArrShow from './es6'
// import 'babel-polyfill'
import React,{Component} from 'react'
import ReactDom from 'react-dom'
// let root = document.getElementById('root')

// root.innerHTML = '<div class="iconfont icon-guide2">aaa</div>'

// console.log('qqqqqqqqss')
// creatDiv()
// creatDivs()

// ArrShow()

class App extends Component {
  render (){
    return <div>hello wsors</div>
  }
}
ReactDom.render(<App/>,document.getElementById('root'))





if(module.hot){
  module.hot.accept(()=>{
    // document.body.removeChild(document.getElementById('number'))
    // creatDivs()
    ReactDom.render(<App/>,document.getElementById('root'))
  })
}
