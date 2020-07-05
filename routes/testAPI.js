const express = require("express")
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        res.send('API works')
    } catch (error) {
        next(error)
    }
})

module.exports = router