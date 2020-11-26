import { createError, forEach } from "../util/index";

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
