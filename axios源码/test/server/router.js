const router = require("koa-router")();

router.get("/getUserInfo", ctx => {
  console.log(ctx);
  ctx.body = {
    name: "xiaoming",
    age: 18
  };
});
module.exports = router.routes();
