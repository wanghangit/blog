const Koa = require("../koa/application")
const app = new Koa()
app.use((req, res) => {
  res.end('hello')
})
app.listen(3000)