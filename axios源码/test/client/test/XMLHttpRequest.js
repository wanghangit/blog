// 实例化一个请求实例
var request = new XMLHttpRequest()
// 打开一个请求的链接
request.open("GET", "http://localhost:3000/getUserInfo")
//
request.onreadystatechange = function(){
  // 只有4的状态是正常的请求成功
  if(request.readyState !== 4) return
  // 打印响应数据
  console.log(request.response)
}
