// 定义所有策略对象
var performances = {
  A: function(wage) {
    return wage * 4;
  },
  B: function(wage) {
    return wage * 3;
  },
  C: function(wage) {
    return wage * 2;
  }
};

function getBouns(performance, wage) {
  if (performances[performance]) {
    return performances[performance](wage);
  }
  throw new Error("performance is not define");
}

var bouns = getBouns("A", 10000);
console.log(bouns);
