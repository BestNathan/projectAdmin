module.exports = class extends think.Logic {
  __before(){
    if(this.isMethod('OPTIONS')){
      this.service('cors').setCorsHeaders(this)
      this.ctx.body = ''
      return false
    }
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    if(!this.isPost){
      return this.fail(1001,'METHOD_NOT_ALLOWED')
    }

    if(!this.ctx.get('content-type')){
      return this.fail(1002,'CONTENT_TYPE_UNDIFINED')
    }

    if (!this.ctx.is('json','application/x-www-form-urlencoded')) {
      return this.fail(1003,'CONTENT_TYPE_NOT_ALLOWED')
    }

    return true
  }

};
