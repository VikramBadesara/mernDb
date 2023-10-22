const express = require('express')
const router = express.Router()

const db_gtw = require('../repositories/db.gateway')

router.get('/', (req, res) => {
    res.status(200).send("In resource")
})


router.post('/getUserInfo', async (req, res) => {

    let collectionName = req?.query?.collectionName
    let filter = req?.body ?? null

    db_gtw.getFromDb(collectionName, filter).then(response => {
        res.status(200).send(response)
    }).catch(error => [
        res.status(500).send(error.message)
    ])
})

router.post('/saveUserData', async (req, res) => {

    let collectionName = req?.query?.collectionName
    let userInfo = req?.body

    db_gtw.saveToDb(collectionName, userInfo).then(response => {
        res.status(200).send(response)
    }).catch(error => [
        res.status(500).send(error.message)
    ])
})

router.delete('/admin/deleteUser', async (req, res) => {
    
    let collectionName = req?.query?.collectionName
    let filter = req?.body ?? null
    let adminApi = true
    
    db_gtw.deleteFromDb(collectionName, filter, adminApi).then(response => {
        res.status(200).send(response)
    }).catch(error => [
        res.status(500).send(error.message)
    ])
})


router.delete('/deleteUser', async (req, res) => {
    
    let collectionName = req?.query?.collectionName
    let filter = req?.body ?? null
    let adminApi = false

    db_gtw.deleteFromDb(collectionName, filter, adminApi).then(response => {
        res.status(200).send(response)
    }).catch(error => [
        res.status(500).send(error.message)
    ])
})

module.exports = router