module.exports = class extends think.Service {
  constructor() {
    super()
    this.AllAdmin = ['nathan']
    this.toutiaoAdmin = ['yang1990....']
    this.jiuzhouAdmin = ['yinyinp9']
    this.actions = ['query', 'update', 'delete']
    this.routerActions = ['toutiao','jiuzhou']
  }
  routerCheck(ctx){
    return this.routerActions.indexOf(ctx.action) != -1
  }

  adminCheck(ctx) {
    let action = ctx.action
    let oprator = ctx.state.oprator
    if (this.AllAdmin.indexOf(oprator) != -1 || this[action + 'Admin'].indexOf(oprator) != -1) {
      return true
    } else {
      return ctx.fail(1006, 'NO_AUTHURATION')
    }
  }

  actionCheck(ctx) {
    let action = ctx.state.action
    if (this.actions.indexOf(action) != -1) {
      return true
    } else {
      return ctx.fail(1007, 'ACTION_NOT_ALLOWED')
    }
  }

  actionParamsCheck(ctx) {
    let action = ctx.state.action
    let value = false
    switch (action) {
      case 'query':
      case 'delete':
        value = this.usernameCheck(ctx)
        break;
      case 'update':
        value = this.usernameCheck(ctx) && this.timeCheck(ctx)
        break;
      default:
    }
    return value
  }

  usernameCheck(ctx) {
    return this.paramCheck('username', ctx)
  }

  timeCheck(ctx) {
    return this.paramCheck('time', ctx)
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

  async usernameExsit(ctx) {
    let username = ctx.state.username
    let model = this.model('admin')
    let action = ctx.action
    try {
      let result = await model.find(action + 'User', {
        username: username
      })
      if (typeof result === 'string') {
        return ctx.fail(1009, '用户 ' + username + ' 不存在')
      }
      return result
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async deleteUser(ctx) {
    let username = ctx.state.username
    let model = this.model('admin')
    let action = ctx.action
    try {
      let result = await model.delete(action + 'User', {
        username: username
      })
      if (typeof result === 'string') {
        return ctx.fail(1100, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async updateTime(ctx) {
    let username = ctx.state.username
    let model = this.model('admin')
    let action = ctx.action
    let time = ctx.state.model.time ? ctx.state.model.time : 0
    let timeNow = new Date().getTime()
    let newTime = 0

    time = parseInt(time) < timeNow ? timeNow : parseInt(time)
    newTime = time + parseInt(ctx.state.time)
    try {
      let result = await model.update(action + 'User', {
        username: username
      }, {
        time: newTime
      })
      if (typeof result === 'string') {
        return ctx.fail(1100, result)
      }
      return true
    } catch (e) {
      return ctx.fail(1100, e.message)
    }
  }

  async adminControll(ctx) {
    let model = ctx.state.model
    let action = ctx.state.action
    if (!model || !action) {
      return ctx.fail(1100, 'something went wrong with server')
    }

    let obj = {}
    let flag = false
    switch (action) {
      case 'query':
        obj.time = model.time
        return ctx.success(obj, 'success');
        break;
      case 'update':
        flag = await this.updateTime(ctx)
        if (flag) {
          return ctx.success('success', 'success');
        }
        break;
      case 'delete':
        flag = await this.deleteUser(ctx)
        if (flag) {
          return ctx.success('success', 'success');
        }
        break;
      default:
        return ctx.fail(1100, 'something went wrong with server')
    }
  }

};
