const sales = {
  subList: [],
  listener: function(fnc) {
    this.subList.push(fnc)
  },
  tirgger: function(){
    this.subList.forEach((fn) => {
      fn.apply(this, arguments)
    })
  }
};

sales.listener(function(price){
  console.log(`通知xiaoming新房${price}万`)
})
sales.listener(function(price){
  console.log(`通知andy新房${price}万`)
})
sales.tirgger(100)
//通知xiaoming新房100万
//通知andy新房100万