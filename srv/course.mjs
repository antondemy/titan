import express from 'express'
import db from './db'

export default express.Router(
).get('/', (request, response) => {
    db.Course.find({
    }).then(data => {
        response.send(data)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).post('/', (request, response) => {
    new db.Course(
        request.body
    ).save(
    ).then(() => {
        response.sendStatus(200)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
})

