module.exports = class extends think.Service {
  constructor(){
    super()
    this.AllAdmin = ['nathan']
    this.toutiaoAdmin = ['yang1990....']
    this.jiuzhouAdmin = ['yinyinp9']
  }
  isAllAdmin(oprator){
    return this.AllAdmin.indexOf(oprator)!=-1
  }

  toutiaoAdmin(oprator){
    return this.toutiaoAdmin.indexOf(oprator)!=-1
  }

  jiuzhouAdmin(oprator){
    return this.jiuzhouAdmin.indexOf(oprator)!=-1
  }

  adminCheck(project,oprator){
    return this.isAllAdmin(oprator) || this[project + 'Admin'] && this[project + 'Admin'](oprator)
  }

  test(){
    console.log('admin  service  test  function')
    this.model('admin').test()
  }
};
