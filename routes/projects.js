const express = require("express")
const router = express.Router()
const db = require('../db')
const dbName = "personalwebsite";
const collectionName = "softwareprojects";

db.initialize(dbName, collectionName, function(dbCollection) {

    // async await and try catch DO WORK - write in es6
    router.get('/', async function (req, res, next){
        try {
            await dbCollection.find().toArray(function(err, result) {
                res.json(result)
            });
        } catch (error) {
            next(error)
        }
    })

    router.get(`/:projectName`, async function (req, res, next){
        console.log(req.params)
        try {
            await dbCollection.findOne({name:req.params}).toArray(function(err, result){
                console.log(result)
                res.json(result)
            })
        } catch (error) {
            next(error)
        }
    })

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