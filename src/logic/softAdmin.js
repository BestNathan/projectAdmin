const base = require('./base')

module.exports = class extends base {
  async __before() {
    let flag = await super.__before()
    if(!flag){
      return false
    }
    if (this.ctx.action !== 'login') {
      if (this.ctx.action !== 'test' && (!think.adminSession || think.adminSession !== this.cookie('admin'))) {
        return this.fail(2001, '未登录')
      }
      if (!this.service('softAdmin').projectCheck(this.ctx)) {
        return false
      }
      if (this.ctx.action !== 'add') {
        flag = await this.service('softAdmin').projectExist(this.ctx)
        if(!flag){
          return false
        }
        this.ctx.model = flag
      }
    }
  }

  async loginAction() {
    let flag = this.service('softAdmin').loginParamsCheck(this.ctx)
    if(!flag){
      return false
    }
  }

};
