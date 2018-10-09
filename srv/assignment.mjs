import express from 'express'
import db from './db'

export default express.Router(
).get('/', (request, response) => {
    db.Assignment.find({
    }).then(data => {
        return Promise.all(data.map(d => {
            return db.Course.findOne({
                _id: d.course
            }).then(data => {
                d.course = data.title
                return db.User.findOne({
                    _id: d.teacher
                })
            }).then(data => {
                d.teacher = data.fullName
                return Promise.resolve(d)
            })
        }))
    }).then(data => {
        response.send(data)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).post('/', (request, response) => {
    new db.Assignment(
        request.body
    ).save(
    ).then(() => {
        response.sendStatus(200)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
})

