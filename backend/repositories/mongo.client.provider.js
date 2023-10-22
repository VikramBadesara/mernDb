const MongoClient = require('mongodb').MongoClient

const common  =  require('../configs/common')
var dbName = common.config()['mongo_db_name']
var mongoUrl = common.config()['mongo_url']
console.log(`dbUrl: ${mongoUrl + dbName}`);

class Connection {    
    static connectToMongo() {
        let client = new MongoClient(mongoUrl)
        if(this.db) return Promise.resolve(this.db)
        return client.connect().then((connect)=>{
           this.db =  connect.db(dbName)
        //    this.db.collection('printMap').dropIndexes()
           this.db.collection('merndb').createIndex({ orgId: 1 })
           console.log('connected to mongo')
        })
        .catch(e=>{
            console.error("some db error",e.message)
        })
    }
}

Connection.db = null
Connection.url = mongoUrl + dbName
Connection.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000
}

module.exports = { Connection }
