module.exports = function(source){
  console.log(this.query.name)
  // 可以接收options传来的参数
  // return source.replace(/hello/, this.query.name)
  const result = source.replace(/hello/, this.query.name)
  // 也可以使用callback可以多传递信息例如sourcemap
  this.callback(null, result)
}