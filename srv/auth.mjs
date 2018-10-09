import express from 'express'
import crypto from 'crypto'
import db from './db'

export default express.Router(
).post('/srv/auth/signIn', (request, response) => {
    db.User.findOne({
        email: request.body.email
    }).then(data => {
        if (data !== null) {
            let hash = crypto.pbkdf2Sync(
                request.body.password,
                data.passwordSalt,
                1000,
                64,
                'sha1'
            ).toString('hex')
            if (data.passwordHash === hash) {
                let cookie = crypto.randomBytes(32).toString('hex')
                return new db.Session({
                    cookie: cookie,
                    user: data._id,
                    ipAddress: request.connection.remoteAddress,
                    openedAt: Date.now(),
                    closedAt: null
                }).save(
                ).then(() => {
                    response.cookie('Authentication', cookie)
                    console.log('Successful sign-in from '
                        + request.connection.remoteAddress)
                    response.sendStatus(200)
                })
            }
        }
        console.log('Failed sign-in from '
            + request.connection.remoteAddress)
        response.sendStatus(401)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).all(/.*/, (request, response, next) => {
    let cookie = request.cookies.Authentication
    if (cookie === undefined) {
        response.redirect('/signIn')
    } else {
        db.Session.findOne({
            cookie: cookie,
            openedAt: {
                $gt: Date.now() - (12 * 60 * 60 * 1000)
            },
            closedAt: null
        }).then(data => {
            if (data === null) {
                response.redirect('/signIn')
            } else {
                request.user = data.user
                next()
            }
        }).catch(err => {
            console.log(err)
            response.redirect('/signIn')
        })
    }
}).post('/srv/auth/signOut', (request, response) => {
    let cookie = request.cookies.Authentication
    db.Session.update({
        cookie: cookie
    }, {
        $set: {
            closedAt: Date.now()
        }
    }).then(() => {
        response.clearCookie('Authentication')
        response.sendStatus(200)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
}).get('/srv/auth/currentUser', (request, response) => {
    db.User.findOne({
        _id: request.user
    }, {
        passwordSalt: false,
        passwordHash: false
    }).then(data => {
        response.send(data)
    }).catch(err => {
        console.log(err)
        response.sendStatus(500)
    })
})

