import express from 'express'
import crypto from 'crypto'
import db from './db'

export default express.Router(
).get('/', (request, response) => {
    db.User.find({
        }, {
            passwordSalt: false,
            passwordHash: false
    }).then(data => {
        response.send(data)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).post('/', (request, response) => {
    let user = request.body
    user.passwordSalt = crypto.randomBytes(16).toString('hex')
    user.passwordHash = crypto.pbkdf2Sync(user.password, user.passwordSalt, 1000, 64, 'sha1').toString('hex')
    user.status = 'Active'
    delete user.password
    new db.User(
        user
    ).save(
    ).then(() => {
        response.sendStatus(200)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).get('/byRole/:role', (request, response) => {
    db.User.find({
            role: request.params.role
        }, {
            passwordSalt: false,
            passwordHash: false
    }).then(data => {
        response.send(data)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).get('/block/:id', (request, response) => {
    db.User.findOneAndUpdate({
        _id: request.params.id
    }, {
        $set: {
            status: 'Blocked'
        }
    }).then(() => {
        response.sendStatus(200)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
})

