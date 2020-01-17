// 计算运动的算法，4个参数是已消耗时间，原始位置，位置间的差距，持续的总时间
const motions = {
  linear: function(t, b, c, d) {
    return (c * t) / d + b;
  },
  ease: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  }
};

/**
 * 动画的主方法，模仿css的属性参数
 */
class Animate {
  /**
   *
   * @param {*} dom 需要修改的dom元素
   * @param {*} property 要改变的style属性
   * @param {*} target 改变style的目标值
   * @param {*} time 运动的时间
   * @param {*} motion 运动函数
   */
  constructor(dom, property, target, time, motion) {
    this.dom = document.querySelector(dom);
    this.property = property;
    this.startDom = +getComputedStyle(this.dom)[property].replace("px", "");
    this.startTime = +new Date();
    this.curTime = this.startTime;
    this.time = time;
    this.end = this.startTime + time;
    this.endDom = target;
    this.motion = motions[motion];
  }
  /**
   * 开始执行动画
   */
  start() {
    this.timer = setInterval(() => {
      this.step();
    }, 60);
  }
  // 每一步执行的具体步骤
  step() {
    this.curTime = +new Date();
    if (this.curTime > this.end) {
      clearInterval(this.timer);
      this.update(this.endDom);
      return;
    }
    var p = this.motion(
      this.curTime - this.startTime,
      this.startDom,
      this.endDom - this.startDom,
      this.time
    );
    this.update(p);
  }
  // 更新dom的方法
  update(value) {
    this.dom.style[this.property] = value + "px";
  }
}
