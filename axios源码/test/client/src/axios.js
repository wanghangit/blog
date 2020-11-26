import defaults from "./default";
import { mergeConfig, forEach, merge } from "../util/index";

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
    config = mergeConfig(this.defaults, config);
    // 根据传入的method进行数据过滤
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    // 获取config中的adapter也就是xmlhttprequest基于Promise封装的方法
    const adapter = config.adapter || defaults.adapter;
    // 返回一个promise的方法
    return adapter(config).then(
      response => {
        return response;
      },
      reason => {
        return Promise.reject(reason);
      }
    );
  }
}

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
export default Axios;
