const MongooseConnector = require('./mongooseMutiple')

const VERSION_COLLECTION_NAME = 'versionManager'
const USER_JIUZHOU_COLLECTION_NAME = 'jiuzhouUser'
const USER_TOUTIAO_COLLECTION_NAME = 'toutiaoShenqi'

const VERSION_MODEL_NAME = 'Version'
const USER_MODEL_NAME = 'User'

const userSchemaOpt = {
    username: { type: String, index: true, unique: true },
    password: { type: String },
    qq: { type: String },
    time: { type: String }
}


const versionConnection = new MongooseConnector(VERSION_COLLECTION_NAME)
versionConnection.initSchema(VERSION_MODEL_NAME, {
    project: { type: String, index: true, unique: true },
    version: { type: String }
})

const jiuzhouUserConnection = new MongooseConnector(USER_JIUZHOU_COLLECTION_NAME)
jiuzhouUserConnection.initSchema(USER_MODEL_NAME, userSchemaOpt)

const toutiaoUserConnection = new MongooseConnector(USER_TOUTIAO_COLLECTION_NAME)
toutiaoUserConnection.initSchema(USER_MODEL_NAME, userSchemaOpt)


module.exports = {
    versionConnection,
    jiuzhouUserConnection,
    toutiaoUserConnection
}
