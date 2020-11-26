const toString = Object.prototype.toString;
function isArray(obj) {
  return toString.call(obj) === "[object Array]";
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function createError(msg) {
  return new Error(msg);
}

/**
 * 对任意类型的对象一种通用的遍历
 * @param {*} obj
 * @param {*} fn
 */
export function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

export function deepMerge(/**obj1,obj2,obj3*/) {
  var result = {};
  function assginValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === "object") {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (let i = 0; i < arguments.length; i++) {
    forEach(arguments[i], assginValue);
  }
  return result;
}

export function merge(){
  let config = {}
  function assginValue(val, key){
    if(isObject(config[key]) && isObject(val)){
      config[key] = merge(config[key], val)
    }else{
      config[key] = val
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assginValue);
  }
  return config;
}

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
