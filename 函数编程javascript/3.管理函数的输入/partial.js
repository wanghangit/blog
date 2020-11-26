// 偏函数的应用，将一次性传入的参数分阶段传入
function partial(fn, ...args) {
  return function(...otherArgs) {
    return fn(...args, ...otherArgs);
  };
}

function add(x, y) {
  return x + y;
}

var pAdd = partial(add, 2);
console.log(pAdd(3));
console.log([1, 2, 3, 4, 5].map(partial(add, 3))); // 直接将变量提前传入

/**
 * 柯里化函数将函数变成每次传入一个参数一步步调用的函数
 * 松散的柯里化允许一次传入多个参数
 * @param {*} fn 
 * @param {*} le 
 */
function curry(fn, le = fn.length){
  return (function curreid(preArgs){
    return function nextCurry(...nextArgs){
      var args = preArgs.concat(nextArgs)
      if(args.length>=le){
        return fn(...args)
      }else{
        return curreid(args)
      }
    }
  })([])
}

var addCurry = curry(add)
console.log(addCurry(2)(3))
