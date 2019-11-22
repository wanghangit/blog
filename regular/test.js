function test(reg, str){
 console.log(reg.test(str)) 
}

function replace(reg, str, word){
  console.log(str.replace(reg, word))
}
/**匹配时间 */
var timeReg = /^([0-1][0-9]|[2][0-4]):[0-5][0-9]$/
var timeStr = '20:11'
test(timeReg, timeStr)

/**转化数字格式 */
var numReg = /(?!^)(?=(\d{3})+$)/g
replace(numReg, "123456789", ",")

function formatNum(num){
  return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, "$$ ")
}

console.log(formatNum(1819928))

/**密码校验 */
var passWordReg = /(?=.*[0-9])^[a-zA-Z_0-9]{6,12}$/

test(passWordReg, "aabc21")
replace(passWordReg, "aab2d2gf", "#")

/**变量提取 */
var reg1 = /(\d{4})-(\d{2})-(\d{2})/
reg1.test("1999-12-07")
replace(reg1, "1999-12-07", "$1/$2/$3")

/**反向引用 */
var reg2 = /\d{4}(\.|-|\/)\d{2}\1\d{2}/
test(reg2, "1918-10.11")
test(reg2, "1918-10-11")

/**模拟trim方法 */
function trim(str){
  return str.replace(/(?:^\s+|\s+$)/g, "")
}
let trimStr = "  asbv   "
console.log(trim(trimStr))
