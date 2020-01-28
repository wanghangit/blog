const Koa = require("koa")
const static = require("koa-static")
const router = require("./router.js")

const app = new Koa()
app.use(static(__dirname+"/public"))
app.use(function(ctx, next){
  ctx.set("Access-Control-Allow-Origin", "*")
  next()
})
app.use(router)


app.listen(3000)

