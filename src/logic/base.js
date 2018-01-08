module.exports = class extends think.Logic {
  __before(){
    if(this.isGet && this.ctx.action === 'index'){
      this.display()
      return false
    }
    
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
