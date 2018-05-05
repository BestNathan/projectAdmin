const base = require('./base.js')

module.exports = class extends base {
  async __before(){
    let flag = await super.__before()
    if(!flag){
      return false
    }

    let service = this.service('admin')
    //controller logic action check
    flag = service.routerCheck(this.ctx)
    if(!flag){
      return this.fail(9999,'NOT_FOUND')
    }
    //check if has admin and has authuration
    let oprator = this.post('admin')
    if(!oprator){
      return this.fail(1004,'NO_ADMIN')
    }
    this.ctx.state.oprator = oprator
    flag = service.adminCheck(this.ctx)
    if(!flag){
      return false
    }
    //check if has action and action allowed
    let action = this.post('action')
    if(!action){
      return this.fail(1005,'NO_ACTION')
    }
    this.ctx.state.action = action
    flag = service.actionCheck(this.ctx)
    if(!flag){
      return false
    }
    //check params of action exsit and complete
    flag = service.actionParamsCheck(this.ctx)
    if(!flag){
      return false
    }
    //check username if exsit in database
    if(service.actionNeedQueryUsername(action)){
      let res = await service.usernameExsit(this.ctx)
      if(!res){
        return false
      }
      this.ctx.state.model = res
    }
    if (action == 'users') {
      let res = await service.getUsers(this.ctx)
      if(!res){
        return false
      }
      this.ctx.state.model = res
    }

  }

};
