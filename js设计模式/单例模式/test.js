var single = (function(){
  var instance
  return function getInstance(fn){
    if(!instance){
      instance = fn.apply(this, [].slice.call(arguments, 1))
    }
    return instance
  }
})()

var createDiv = function(html){
  var div = document.createElement("div")
  div.innerHTML = html
  document.body.appendChild(div)
  return div
}

var div1 = single(createDiv, "single1")
var div2 = single(createDiv, 'single2')
console.log(div1 === div2)