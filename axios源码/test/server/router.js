const router = require("koa-router")();

router.get("/user", ctx => {
  console.log(ctx);
  ctx.body = {
    aa: "vv"
  };
});
module.exports = router.routes();
