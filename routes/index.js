
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.send('unauthorized: please visit gisellezatonyl.com');
});

// const db = require('../db')
// const dbName = "personalwebsite";
// const collectionName = "softwareprojects";

//db initialize
// db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    // dbCollection.find().toArray(function(err, result) {
    //     if (err) throw err;
    //       console.log(result);
    // });

    // << db CRUD routes >>
    // router.post('/', (req, res) => {
    //     console.log('IT WORKKKKKSSSSS')
    //     const item = { name: "Tensor Three" }
    //     dbCollection.insertOne(item, (error, result) => { // callback of insertOne
    //         if (error) throw error;
    //         console.log('THIS WENT THROUGH')
    //         // return updated list
    //         dbCollection.find().toArray((_error, _result) => { // callback of find
    //             if (_error) throw _error;
    //             console.log(_result)
    //             res.json(_result);
    //         });
    //     });
    // });

// }, function(err) { // failureCallback
//     throw (err);
// })


module.exports = router
