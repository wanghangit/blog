function Goods(name) {
  this.name = name;
}
var A = {
  send: function(target) {
    console.log("A send goods");
    target.receive(new Goods("apple"));
  }
};
// 代理对象
var Courier = {
  receive: function(good) {
    B.receive(good);
  }
};
var B = {
  receive: function(good) {
    console.log("B receive " + good.name);
  }
};
A.send(Courier);
