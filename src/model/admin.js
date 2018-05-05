const connections = require('../mongoose-connection/connections.js')

module.exports = class extends think.Model {
  insert(connectionName,opt){
    let connection = connections[connectionName+'Connection']
    return connection.insert(opt)
  }
  delete(connectionName,condition){
    let connection = connections[connectionName+'Connection']
    return connection.delete(condition)
  }
  find(connectionName,condition,opt={}){
    let connection = connections[connectionName+'Connection']
    return connection.find(condition, opt)
  }
  update(connectionName,condition,update){
    let connection = connections[connectionName+'Connection']
    return connection.update(condition, update)
  }
  findAllByConditions(connectionName,condition, outputOpt){
    let connection = connections[connectionName+'Connection']
    return connection.findAllByConditions(condition, outputOpt)
  }
  getCount(connectionName){
    let connection = connections[connectionName+'Connection']
    return connection.getCount()
  }
};
