class Node{
  constructor(el){
    this.node = el
    this.next = null
  }
}

class LinkList{
  constructor(){
    this.head = new Node("head")
  }
  // 按值查找
  findByValue(item){
    let curNode = this.head
    while(curNode!=null&&curNode.node!==item){
      curNode = curNode.next
    }
    return curNode == null ? -1 : curNode
  }
  // 按位置查找
  findByIndex(index){
    let curNode = this.head
    let pos = 0
    while(curNode!=null && pos!=index){
      curNode = curNode.next
      pos++
    }
    return curNode == null ? -1 : curNode
  }
  // 遍历显示所有节点
  display() {
  //先检查是否为环
  if(this.checkCircle()) return false

  let currentNode = this.head
  while (currentNode !== null) {
      console.log(currentNode.node)
      currentNode = currentNode.next
  }
  }
  // 在指定元素后拆入
  insert(newElement,el){
    let curNode = this.findByValue(el)
    if (curNode == -1){
      console.error(`el is not exit`)
      return;
    }
    let newNode = new Node(newElement)
    newNode.next = curNode.next
    curNode.next = newNode
  }
  findPrev(item){
    let curNode = this.head
    while(curNode!=null && curNode.next.node!==item){
      curNode = curNode.next
    }
    if(curNode.next!=null){
      return curNode
    }
    return -1
  }
  remove(item){
    let prevNode = findPrev(item)
    if(prevNode!=-1){
      prevNode.next = prevNode.next.next
    }
  }
  // 反转链表
  revertList(){
    let root = new Node("head")
    let curNode = this.head.next
    while(curNode!=null){
      let next = curNode.next
      curNode.next = root.next
      root.next = curNode
      curNode = next
    }
    this.head = root
  }
  // 检查链表是否是环
  checkCircle(){
    let fast = this.head.next
    let slow = this.head
    while(fast!=null&&fast.next!=null){
      fast = fast.next.next
      slow = slow.next
      if (fast == slow){
        return true
      }
    }
    return false
  }
  mergeSortList(listA,listB){
    if(!listA){
      return listB 
    }
    if(!listB){
      return listA
    }
    var a = listA, 
        b = listB
    var result = null
    if(a.node<b.node){
      result = a
      a = a.next
    }else{
      result = b
      b = b.next
    }
    while(a!=null&&b!=null){
      if(a.node<b.node){
        result.next = a
        a=a.next
      } else {
        result.next = b
        b = b.next
      }
      result = result.next
    }
    if(a != null){
      result.next = a
    }else{
      result.next = b
    }
    return result
  }
}
let list = new LinkList()
list.insert('chen','head')
list.insert('curry','chen')
list.insert('chen','curry')
console.log(list.display())
console.log('-------------start reverse------------')
list.revertList()
console.log(list.display())
console.log(list.checkCircle())

