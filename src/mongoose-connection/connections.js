const MongooseConnector = require('./mongooseMutiple')

const VERSION_COLLECTION_NAME = 'versionManager'
const USER_JIUZHOU_COLLECTION_NAME = 'jiuzhouUser'
const USER_TOUTIAO_COLLECTION_NAME = 'toutiaoShenqi'
const SOFT_ADMIN_COLLECTION_NAME = 'softAdmin'

const VERSION_MODEL_NAME = 'Version'
const USER_MODEL_NAME = 'User'
const SOFT_MODEL_NAME = 'Software'

const userSchemaOpt = {
    username: { type: String, index: true, unique: true },
    password: { type: String },
    qq: { type: String },
    time: { type: String }
}
const versionSchemaOpt = {
  project: { type: String, index: true, unique: true },
  version: { type: String }
}
const softwareSchemaOpt = {
  project: { type: String, index: true, unique: true },
  open: { type: String }
}

const versionConnection = new MongooseConnector(VERSION_COLLECTION_NAME)
versionConnection.initSchema(VERSION_MODEL_NAME, versionSchemaOpt)

const jiuzhouUserConnection = new MongooseConnector(USER_JIUZHOU_COLLECTION_NAME)
jiuzhouUserConnection.initSchema(USER_MODEL_NAME, userSchemaOpt)

const toutiaoUserConnection = new MongooseConnector(USER_TOUTIAO_COLLECTION_NAME)
toutiaoUserConnection.initSchema(USER_MODEL_NAME, userSchemaOpt)

const softAdminConnection = new MongooseConnector(SOFT_ADMIN_COLLECTION_NAME)
softAdminConnection.initSchema(SOFT_MODEL_NAME, softwareSchemaOpt)

module.exports = {
    versionConnection,
    jiuzhouUserConnection,
    toutiaoUserConnection,
    softAdminConnection
}
