function loadImage(){
  var node = document.createElement("img")
  document.body.appendChild(node)
  return {
    setSrc: function(url){
      node.src = url
    }
  }
}
var loadUrl = loadImage()
loadUrl.setSrc("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2251955320,1321161564&fm=26&gp=0.jpg")

var proxy = (function ProxyLoadImage(){
  var img = new Image()
  img.onload = function(){
    loadUrl.setSrc(this.src)
  }
  return {
    setSrc: function(url){
      img.src = url
      loadUrl.setSrc("./timg.gif")
    }
  }
})()

proxy.setSrc("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2251955320,1321161564&fm=26&gp=0.jpg")

