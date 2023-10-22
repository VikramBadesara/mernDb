const { Connection } = require("./mongo.client.provider");
const uuid = require('uuid')


async function getFromDb(collectionName, filter) {
    try {
        if (!collectionName) throw new Error(`Please provide collectionName`)

        if (!filter) filter = null

        return Connection.db.collection(collectionName).find(filter).toArray()

    } catch (error) {
        throw new Error(`Catched some error getting data: ${error.message}`)
    }
}


async function saveToDb(collectionName, userData) {

    try {
        if (!collectionName) throw new Error(`Please provide collectionName`)


        let collection = Connection.db.collection(collectionName)

        if (Array.isArray(userData)) {

            userData.forEach(data => {
                data.uuid = uuid.v4()
                data._id = data.uuid
            })

            let res = await collection.insertMany(userData)

            if (res?.acknowledged && res?.insertedId == userData?._id) return userData
            else throw new Error(`Some error saving data: ${res}`)

        } else {

            if (!Object.values(userData)?.length) return `Missing required fields`

            userData.uuid = uuid.v4()
            userData._id = userData.uuid
            let res = await collection.insertOne(userData)

            if (res?.acknowledged && res?.insertedId == userData?._id) return userData
            else throw new Error(`Some error saving data: ${res}`)

        }

    } catch (error) {
        throw new Error(`Catched some error saving data: ${error.message}`)
    }
}


async function deleteFromDb(collectionName, filter, adminApi) {

    try {
        if (!collectionName) throw new Error(`Please provide collectionName`)

        console.log("adminApi: ", adminApi)
        console.log("filter: ", filter)
        if (!adminApi && !Object.values(filter)?.length) throw new Error(`un-authorised to delete all data`)

        return Connection.db.collection(collectionName).deleteMany(filter)

    } catch (error) {
        throw new Error(`Caught Error: ${error.message}`)
    }
}


module.exports = {
    saveToDb: saveToDb,
    getFromDb: getFromDb,
    deleteFromDb: deleteFromDb
}