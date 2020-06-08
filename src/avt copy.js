/*
 * @Descripttion: 
 * @version: 
 * @Author: dpx
 * @Date: 2020-06-02 16:03:31
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-04 16:53:15
 */

let creatDivs = function() {
    let fooDiv = document.createElement('div')
    fooDiv.setAttribute('id', 'number')
    fooDiv.innerHTML = 20222
    document.body.appendChild(fooDiv)
}
export default creatDivs