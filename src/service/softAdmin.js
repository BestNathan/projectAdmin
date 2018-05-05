module.exports = class extends think.Service {
  constructor() {
    super()
    this.adminUser = 'nathan'
    this.password = 'zhangdage2011'
  }

  paramCheck(param, ctx) {
    let value = ctx.post(param)
    if (!value) {
      return ctx.fail(1008, param.toUpperCase() + '_NOT_EXSIT')
    } else {
      ctx.state[param] = value
      return value
    }
  }

  loginUserCheck(ctx){
    return this.paramCheck('user',ctx)
  }
  loginPasswordCheck(ctx){
    return this.paramCheck('password',ctx)
  }
  loginParamsCheck(ctx) {
    return this.loginUserCheck(ctx) && this.loginPasswordCheck(ctx)
  }
  loginResult(ctx){
    let user = ctx.state.user
    let pwd = ctx.state.password
    if(user === this.adminUser && pwd === this.password){
      return true
    }
    return false
  }

  projectCheck(ctx){
    return this.paramCheck('project',ctx)
  }

  async projectExist(ctx) {
    let project = ctx.state.project
    let model = this.model('softAdmin')
    try {
      let result = await model.find({
        project
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, '项目 ' + project + ' 不存在')
      }
      return result
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async addProject(ctx) {
    let project = ctx.state.project
    let model = this.model('softAdmin')
    try {
      let result = await model.insert({
        project,
        open: '0'
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async openProject(ctx) {
    let project = ctx.state.project
    let model = this.model('softAdmin')
    try {
      let result = await model.update({
        project
      },{
        open: '1'
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async closeProject(ctx) {
    let project = ctx.state.project
    let model = this.model('softAdmin')
    try {
      let result = await model.update({
        project
      },{
        open: '0'
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async deleteProject(ctx) {
    let project = ctx.state.project
    let model = this.model('softAdmin')
    try {
      let result = await model.delete({
        project
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async getProjects(ctx) {
    let size = ctx.state.size
    let page = ctx.state.page
    let model = this.model('softAdmin')
    try {
      let result = await model.findAllByConditions({
        page,
        size
      },{
        project: 1,
        open: 1,
        _id:0
      })
      let obj = {}
      if (typeof result === 'string') {
        return ctx.fail(1100, result)
      }
      obj.projects = result
      result = await model.getCount()
      if (typeof result === -1) {
        return ctx.fail(1100, "CountError")
      }
      obj.totalCount = result
      obj.pages = Math.ceil(result / size)
      return obj
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }
};
