/**
 * 查找第一个目标元素
 * @param {*} arr 
 * @param {*} value 
 */
function firstNum(arr, value){
  let low = 0,
      high = arr.length - 1;
  while(low <= high) {
    let mid = (low+high) >> 1;
    if(arr[mid]>value) {
      high = mid - 1
    } else if(arr[mid]<value){
      high = mid + 1
    } else {
      if(arr[mid - 1]!=value) return mid
      else {
        while(arr[mid - 1] == value){
          mid--;
        }
        return mid;
      }
    }
  }
}
let arr = [3,4,6,7,10]
//console.log(firstNum(arr,7))

/**
 * 查找第一个大于等于给定值的元素
 * @param {*} arr 
 * @param {*} num 
 */
function findFirstLessNum(arr, value){
  let low = 0,
      high = arr.length - 1;
  while(low<=high){
    let mid = (low+high) >> 1;
    if(arr[mid]>=value) {
      if (mid == 0 || arr[mid - 1]<value) return mid
      else high = mid - 1
    } else {
      low = mid + 1
    }
  }
}
console.log(findFirstLessNum(arr, 4))
