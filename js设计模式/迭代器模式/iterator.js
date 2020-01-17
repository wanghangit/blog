function Iterator(array){
  var current = 0;
  function next(){
    if(isDone()){
      return
    }
    current++
  }
  function isDone(){
    return current >= array.length
  }
  function get(){

    return array[current]
  }
  return {
    next,
    isDone,
    get
  }
}

var arr = [1,2,3]
var arrIterator = Iterator(arr)
console.log(arrIterator.get())
arrIterator.next()
console.log(arrIterator.get())
arrIterator.next()
console.log(arrIterator.get())
arrIterator.next()
console.log(arrIterator.isDone())