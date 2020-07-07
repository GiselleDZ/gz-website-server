const MongoClient = require('mongodb').MongoClient

const dbConnectionUrl = process.env.MONGODB_CONNECTION

function initialize(
    dbName,
    collectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`)
            failureCallback(err) // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName)
            const dbCollection = dbObject.collection(collectionName)
            console.log("[MongoDB connection] SUCCESS")

            successCallback(dbCollection)
        }
    })
}

module.exports = {
    initialize
}