const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async loginAction(){
    let flag = this.service('softAdmin').loginResult(this.ctx)
    if(flag){
      const cookie = think.md5(think.uuid() + think.version + new Date().getTime() + 'bestnathan')
      this.cookie('admin', cookie, {
        path: '/softAdmin'
      })
      think.adminSession = cookie
      return this.success('登录成功', 'success')
    }else {
      return this.fail(2000, '账号密码错误!')
    }
  }
  async openAction() {
    let flag = await this.service('softAdmin').openProject(this.ctx)
    if(flag){
      return this.success('success','success')
    }
    return false
  }
  async closeAction() {
    let flag = await this.service('softAdmin').closeProject(this.ctx)
    if(flag){
      return this.success('success','success')
    }
    return false
  }
  async addAction() {
    let flag = await this.service('softAdmin').addProject(this.ctx)
    if(flag){
      return this.success('success','success')
    }
    return false
  }
  async deleteAction() {
    let flag = await this.service('softAdmin').deleteProject(this.ctx)
    if(flag){
      return this.success('success','success')
    }
    return false
  }
  async allAction() {
    let flag = await this.service('softAdmin').getProjects(this.ctx)
    if(flag){
      return this.success('success','success')
    }
    return false
  }
  async testAction(){
    if (this.ctx.model.open == '1') {
      return this.success('授权已打开', 'success')
    }
    return this.fail(2002, '未授权，请联系作者')
  }
};
