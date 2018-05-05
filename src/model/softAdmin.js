const connection = require('../mongoose-connection/connections.js').softAdminConnection

module.exports = class extends think.Model {
  insert(opt){
    return connection.insert(opt)
  }
  delete(condition){
    return connection.delete(condition)
  }
  find(condition,opt={}){
    return connection.find(condition, opt)
  }
  update(condition,update){
    return connection.update(condition, update)
  }
  findAllByConditions(condition, outputOpt){
    return connection.findAllByConditions(condition, outputOpt)
  }
  getCount(){
    return connection.getCount()
  }
};
