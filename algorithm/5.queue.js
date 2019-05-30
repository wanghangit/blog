class Node{
  constructor(node){
    this.node = node
    this.next = null 
  }
}
class QueueBaseOnLinkedList{
  constructor(){
    this.head = null
    this.tail = null
  }
  enqueue(value){
    if(this.head == null){
      this.head = new Node(value)
      this.tail = this.head
    } else{
      this.tail.next = new Node(value)
      this.tail = this.tail.next
    }
  }
  dequeue(){
    if(this.head == null){
      return -1
    }
    var value = this.head.node
    this.head = this.head.next
    return value
  }
  display(){
    var curNode = this.head
    while(curNode!=null){
      console.log(curNode.node)
      curNode = curNode.next
    }
  }
}
class CircleQueue{
  constructor(){
    this.head = null
    this.tail = null
  }
  enqueue(value){
    if(this.head==null){
      this.head = new Node(value)
      this.head.next = this.tail
      this.tail = this.head
    }else{
      const flag = this.head == this.tail
      this.tail.next = new Node(value)
      this.tail.next.next = this.head
      this.tail = this.tail.next
      if(flag){
        this.head = this.tail
      }
    }
  }
}
const queue = new QueueBaseOnLinkedList()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue.display())
