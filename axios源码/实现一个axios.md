# 从0开始实现axios

我们在平时的开发中，使用的最多基本就是http请求，从最开始jquery的`$.ajax`到`axios`各种ajax的请求库，我们一直都是直接使用基本的get，post请求，最多是在请求头做些文章，很少会触及请求实现的原理，所有这些库都是基于`XMLHttpRequest`封装的，axios是目前比较流行的库所以这里就来根据源码，简单实现一个axios，通过这个实现的思路，是我们能更好的理解原理，在遇到问题时能很快的定位问题，有新的需求时能在原理上想清楚我们到底能不能实现。下边就先来看一看主要的思路

## 模拟后端环境

我们在实现一个请求库之前，我们需要模拟一些后端接口来测试我们写的代码，为了快速实现，我们选用`koa`来写一些接口

```js
// index.js
const Koa = require("koa")
const router = require("./router.js")

const app = new Koa()
app.use(function(ctx, next){
  ctx.set("Access-Control-Allow-Origin", "*")
  next()
})
app.use(router)
app.listen(3000)
// router.js
const router = require("koa-router")();

router.get("/getUserInfo", ctx => {
  console.log(ctx);
  ctx.body = {
    name: "xiaoming",
    age: 18
  };
});
module.exports = router.routes();
```
这样我们就有了一个支持跨域访问的接口，可以来测试简单请求

## XMLHttpRequest

如果想做一个ajax的请求库，这个api是怎么都绕不过的，几乎所以的请求都是通过这个api实现的。我们来看一下这个类怎么使用

```js
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
// 发送请求，这里传送请求体中的数据
request.send(null)
// 可以在控制台看到{"name":"xiaoming","age":18}
```

上边只是举一个简单的例子如何来使用这个类，还有很多的api可以实现很多功能，比如说遇到错误如何处理，设置超时时间，超时如何处理，如何设置请求头，如何设置响应数据，如何监听请求进度等等。

下边我们来看一下如何开始现实一个Axios类

```js
// Axios.js
class Axios {
  constructor(instanceConfig) {
    // 设置自定义的配置
    this.defaults = instanceConfig;
  }
  request(config) {
    // 对传入的参数进行修正
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    // 合并请求的config和实例化传入的配置
    config = mergeConfig(this.defaults, config)
    // 根据传入的method进行数据过滤
    if(config.method){
      config.method = config.method.toLowerCase()
    }else if(this.defaults.method){
      config.method = this.defaults.method.toLowerCase()
    }else{
      config.method = 'get'
    }
    // 获取config中的adapter也就是xmlhttprequest基于Promise封装的方法
    const adapter = config.adapter || defaults.adapter
    // 返回一个promise的方法
    return adapter(config).then((response) => {
      return response
    }, (reason) => {
      return Promise.reject(reason)
    })
  }
}
// megreConfig
export function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  const valueFromConfig2Keys = ["url", "method", "params", "data"];
  const mergeDeepPropertiesKeys = ["headers", "auth", "proxy"];
  const defaultToConfig2Keys = [
    "baseURL",
    "url",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "withCredentials",
    "adapter",
    "onProgress",
    "maxContentLength",
    "validateStatus",
    "cancelToken",
  ];
  // 这些key都要来自于第二个参数
  forEach(valueFromConfig2Keys, function(key) {
    if (typeof config2[key] !== undefined) {
      config[key] = config2[key];
    }
  });
  // 这些key需要深度合并
  forEach(mergeDeepPropertiesKeys, function(key) {
    if(isObject(config2[key])){
      config[key] = deepMerge(config1[key],config2[key])
    }else if(typeof config2[key] !== undefined){
      config[key] = config2[key]
    }else if(isObject(config1[key])){
      config[key] = deepMerge(config2[key])
    }else if(typeof config1[key] !== undefined){
      config[key] = config1[key]
    }
  });
  // 默认来自于config2
  forEach(defaultToConfig2Keys,function(key){
    if(typeof config2[key] !== undefined){
      config[key] = config2[key]
    }else if(typeof config1[key] !== undefined){
      config[key] = config1[key]
    }
  })
  return config
}

// axios.js
import Axios from './src/Axios'
import defaults from './src/default'
// 将默认配置传入生成实例导出
const axios = new Axios(defaults)

export default axios
```

Axios类的结构很清楚现在我们就是要实现一个请求所以我们定义一个request方法，根据传入的数据，我们发送请求。这里有一个合并config的策略，针对一些属性我们需要使用使用方传入的像`url，method，data`,有些我们需要合并，代码很简单可以直接看逻辑，我们先来看看我们使用的默认配置defaults，目前只有一个adapter，就是xmlhttprequest封装的请求，这里基本和axios源码写的一样，通过传入的config去发送一个请求，增加了很多错误异常处理，只要不是正常的情况我们都要将xml对象置为null来释放内存

```js
const defaults = {
  adapter: xhr
}

export default function xhr(config) {
  return new Promise((resolve, reject) => {
    var requestData = config.data;
    var requestHeader = config.headers;
    var xmlHttpRequest = new XMLHttpRequest();
    // 打开一个请求的链接
    xmlHttpRequest.open(config.method.toUpperCase(), config.url);
    // 监听请求的状态变化
    xmlHttpRequest.onreadystatechange = function() {
      // 状态为4说明请求成功响应
      if (!xmlHttpRequest || xmlHttpRequest.readyState !== 4) {
        return;
      }
      // 获得响应头
      const responseHeader =
        "getAllResponseHeaders" in xmlHttpRequest
          ? xmlHttpRequest.getAllResponseHeaders()
          : null;
      // 获得响应数据
      const responseData =
        !config.responseType || config.responseType === "text"
          ? xmlHttpRequest.responseText
          : xmlHttpRequest.response;
      const response = {
        data: responseData,
        headers: responseHeader,
        status: xmlHttpRequest.status,
        config: config,
        request: xmlHttpRequest
      };
      // 校验是否有自定义code校验
      if (!config.validateSattus || config.validateSattus(response.status)) {
        resolve(response);
      } else {
        reject(createError("status code validate error" + response.status));
      }
      // 释放内存
      xmlHttpRequest = null;
    };
    // 设置超时时间
    xmlHttpRequest.timeout = config.timeout;
    // 取消请求的回调
    xmlHttpRequest.onabort = function() {
      if (!xmlHttpRequest) {
        return;
      }
      reject(createError("request abort"));
      xmlHttpRequest = null;
    };
    // 网络错误的回调
    xmlHttpRequest.onerror = function() {
      reject(createError("NetWork Error"));
      xmlHttpRequest = null;
    };
    // 超时的回调
    xmlHttpRequest.ontimeout = function() {
      let message = `request timeout at ${cosnfig.timeout} ms`;
      if (config.timeoutErrorMessage) {
        message = config.timeoutErrorMessage;
      }
      reject(createError(message));
      xmlHttpRequest = null;
    };
    if ("setRequestHeader" in xmlHttpRequest) {
      forEach(requestHeader, function(item, key) {
        if (
          requestData === undefined &&
          key.toUpperCase() === "content-type"
        ) {
          delete requestHeader[key];
        } else {
          xmlHttpRequest.setRequestHeader(key, item);
        }
      });
    }
    // 允许跨域携带cookie
    if (config.withCredentials) {
      xmlHttpRequest.withCredentials = !!config.withCredentials;
    }
    // 监听请求进度
    if (typeof config.onProcess === "function") {
      xmlHttpRequest.addEventListener("progress", config.onProcess);
    }
    // 取消请求
    if (config.cancelToken) {
      config.cancelToken.promise.then(calcel => {
        if (!xmlHttpRequest) return;
        xmlHttpRequest.abort()
        reject(calcel)
        xmlHttpRequest = null
      });
    }
    // 处理data没传的情况
    if(requestData === undefined){
      requestData = null
    }
    // 发送请求体的data数据
    xmlHttpRequest.send(requestData)
  });
}
```

到这个为止我们就实现了一个基本的axios，我们可以试验一下

```js
import axios from '../axios'

axios.request({
  method: 'get',
  url: 'http://localhost:3000/user'
}).then((res) => {
  console.log(res)
},(reason) => {
  console.log(reason)
})
```

这样我们就简单实现了一个请求，并获取响应

## 封装请求方法

我们在使用的时候一般不会使用request这个api，我们一般会使用`get,post`这些方法，这里我们就需要包装一下这些请求,在原型上添加这些请求的包装方法，然后我们就能使用类似源码`axios.get或axios.post这些方法`

```js
// 在原型链上增加不带请求体的请求方法
forEach(["get", "head", "delete", "options"], function(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(
      merge(config || {}, {
        method: method,
        url: url
      })
    );
  };
});

// 在原型链上增加带请求体的请求方法
forEach(["post", "put", "patch"], function(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(
      merge(config || {}, {
        method: method,
        url: url,
        data: data
      })
    );
  };
});
```

## 自定义实例

我们在开发中可能会有这种情况，我们的请求头都是使用`application/json`的Content-type，现在前后端分离比较多我们都想要带上`withCredentials`,但又不想每次都重复写，axios为我们提供了自定义实例的方法，我们来实现下
