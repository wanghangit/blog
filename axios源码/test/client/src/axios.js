class Axios{
  constructor(instanceConfig){
    this.defaults = instanceConfig
  }
  request(config){
    if(typeof config === 'string'){
      config = arguments[1] || {}
      config.url = arguments[0]
    }else{
      config = config || {}
    }
  }
}