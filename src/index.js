/*
 * @Descripttion: 
 * @version: 
 * @Author: dpx
 * @Date: 2020-06-04 13:44:37
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-08 10:04:56
 */ 
// import creatDiv from './avt'
// import creatDivs from './avt copy'
import {add} from './count'
// import _ from 'loadsh'


function getComponents(){
  return import(/* webpackChunkName:'lodash' */'lodash').then(({default:_})=>{
    let foo = document.createElement('div')
    foo.innerHTML = _.join(['xing','x'],'%')
    return foo
  })
}

document.addEventListener('click',()=>{
  getComponents().then((el)=>{
    document.body.appendChild(el)
  })
})

// creatDiv()
// creatDivs()
add(5,9)
// add(3,9)


// console.log(_.join(['a','b','c'],'----'))
if (module.hot) {
  module.hot.accept()
}