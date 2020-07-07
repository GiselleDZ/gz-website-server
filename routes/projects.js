const express = require("express")
const router = express.Router()
const db = require('../db')
const dbName = "personalwebsite";
const collectionName = "softwareprojects";

router.get('/test', async function (req, res, next){
    console.log("GETS INTO THE ROUTE")
    try {
        console.log("THE CONNECTION WORKS")
    } catch (error) {
        console.log("THE CONNECTION FAILS")
        next(error)
    }
})

db.initialize(dbName, collectionName, function(dbCollection) { 

    // async await and try catch DO WORK - write in es6
    router.get('/', async function (req, res, next){
        console.log("GETS INTO THE ROUTE")
        try {
            const projects = await dbCollection.find().toArray(function(err, result) {
                console.log(result)
                res.json(projects)
            });
        } catch (error) {
            console.log("FAILS TO RECEIVE DATA")
            next(error)
        }
    })
    // async await and try catch DO WORK - write in es6
    router.post("/", (request, response) => {
        const item = request.body
        dbCollection.insertOne(item, (error, result) => { 
            if (error) throw error
            dbCollection.find().toArray((_error, _result) => { 
                if (_error) throw _error
                response.json(_result)
            })
        })
    })
}, function(err) {
    throw (err)
})


module.exports = router