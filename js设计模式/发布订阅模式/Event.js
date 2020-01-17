class Event {
  constructor() {
    this.cache = {}; // 用来存放监听任务的对象
    this.offline = {}; // 用来存放离线任务，就是在监听前触发的任务
  }
  on(key, fn) {
    const eventList = this.cache[key];
    const offlineList = this.offline[key]
    if(offlineList && offlineList.length > 0){
      offlineList.forEach((arg) => {
        fn.apply(this, arg)
      })
    }
    if (!eventList) {
      this.cache[key] = [fn];
    } else {
      eventList.push(fn);
    }
  }
  emit(key) {
    const args = [].slice.call(arguments, 1);
    const eventList = this.cache[key];
    if (!eventList || eventList.length === 0) {
      if (!this.offline[key]) {
        this.offline[key] = [args];
      } else {
        this.offline[key].push(args);
      }
    } else {
      eventList.forEach(fn => {
        fn.apply(this, args);
      });
    }
  }
  remove(key, fn) {
    const eventList = this.cache[key];
    if (!eventList) return;
    if (!fn) {
      eventList.length = 0;
      return;
    }
    eventList.forEach((fnc, i) => {
      if (fnc === fn) {
        eventList.splice(i, 1);
      }
    });
  }
}

// test
const event = new Event()
event.emit('click', '10')
event.on('click', function(a){
  console.log(a)
})
event.emit('click', 20)
event.remove('click')
event.emit('click', 30)
