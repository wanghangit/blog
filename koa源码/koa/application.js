const http = require("http")

class Koa{
  constructor(){
    this.callbackList = []
  }
  use(fn){
    this.callbackList.push(fn)
  }
  listen(port){
    const server = http.createServer((req, res) => {
      this.callbackList.forEach((fn) => {
        fn.call(this, req, res)
      })
    })
    server.listen(port)
  }
}

module.exports = Koa