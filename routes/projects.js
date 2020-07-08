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

    router.post('/', async function (req, res, next){
        const { project } = request.body
        try {
            dbCollection.insertOne(project, (error, result) => {
                if (error) throw error
                dbCollection.find().toArray((_error, _result) => {
                    if (_error) throw _error
                    res.json(_result)
                })
            })
        } catch (error) {
            console.error(error, 'Unable to post a new project')
            next(error)
        }
    })

    router.delete('/:name', async function (req, res, next){
        const { name } = req.params
        try {
            await dbCollection.deleteOne({ name: name }, ( error, result ) => {
                if (err) console.error(error, 'Unable to delete')
                dbCollection.find().toArray((_error, _result) => {
                    if (_error) console.error( _error, 'Unable to retrieve all projects after deletion' )
                    res.json(_result)
                })
            })
        } catch (error) {
            console.error(error, 'Unable to deliver request')
        }
    })

}, function(err) {
    throw (err, 'Unable to establish Database connection')
})


module.exports = router