const connections = require('../mongoose-connection/connections.js')

module.exports = class extends think.Model {
  insert(connectionName,opt){
    let conneciton = connections[connectionName+'Connection']
    return conneciton.insert(opt)
  }
  delete(connectionName,condition){
    let conneciton = connections[connectionName+'Connection']
    return conneciton.delete(condition)
  }
  find(connectionName,condition,opt={}){
    let conneciton = connections[connectionName+'Connection']
    return conneciton.find(condition, opt)
  }
  update(connectionName,condition,update){
    let conneciton = connections[connectionName+'Connection']
    return conneciton.update(condition, update)
  }
};
