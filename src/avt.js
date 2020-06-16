/*
 * @Descripttion: 
 * @version: 
 * @Author: dpx
 * @Date: 2020-06-02 16:03:31
 * @LastEditors: dpx
 * @LastEditTime: 2020-06-10 10:34:55
 */
import avatar from './avatar.jpg';


export function creatImg(){
  var img = new Image();
  img.src = avatar;
  img.classList.add('avater')
  var root = document.getElementById('root');
  root.append(img);
}
export function creatDiv() {
    let btn = document.createElement('button')
    btn.innerHTML = 'BTN'
    document.body.appendChild(btn)

    let fooDiv = document.createElement('div')
    fooDiv.innerHTML = 200
    btn.onclick = function() {
        let foo = parseInt(fooDiv.innerHTML)
        fooDiv.innerHTML = foo + 1
        fooDiv.classList.add('color')
        console.log(foo)
            // parseInt(fooDiv.innerHTML) ++
        document.body.appendChild(fooDiv)
    }
}
// export default creatDiv