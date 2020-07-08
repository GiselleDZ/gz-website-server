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

    router.get(`/:name`, async function (req, res, next){
        const { name }= req.params
        try {
            await dbCollection.findOne({name:name}, (err, result) => {
                if (err ) console.log(err)
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