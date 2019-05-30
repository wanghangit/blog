class Node{
  constructor(el){
    this.node = el
    this.next = null
  }
}
class StackBaseLinkedList{
  constructor(){
    this.top = null
  }
  push(value){
    const node = new Node(value)
    if(this.top==null){
      this.top = node
    } else {
      node.next = this.top
      this.top = node
    }
  }
  clear(){
    this.top = null
  }
  pop(){
    if(this.top==null){
      return -1
    }
    var v = this.pop.node
    this.top = this.top.next
    return v
  }
  display() {
    if (this.top !== null) {
      let temp = this.top
      while (temp !== null) {
        console.log(temp.node)
        temp = temp.next
      }
    }
  }
}

class Brower{
  constructor(){
    this.normalStack = new StackBaseLinkedList()
    this.backStack = new StackBaseLinkedList()
  }
  pushNormal(name){
    this.normalStack.clear()
    this.backStack.push(name)
  }
  back(){
    const v = this.backStack.pop()
    if(v!=-1){
      this.normalStack.push(v)
    }else {
      console.log('无法后退')
    }
  }
  front(){
    const v = this.normalStack.pop()
    if(v!=-1){
      this.backStack.push(v)
    }else {
      console.log('无法前进')
    }
  }
}