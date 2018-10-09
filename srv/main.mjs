import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import https from 'https'
import db from './db'
import auth from './auth'
import user from './user'
import course from './course'
import assignment from './assignment'

Error.stackTraceLimit = 1

let app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

app.use(express.static('public-no-auth', {
    extensions: [ 'html' ]
}))
app.use('/', auth)
app.use(express.static('public', {
    extensions: [ 'html' ]
}))
app.get('/', (request, response) => {
    response.redirect('/assignments')
})
app.use('/srv/user', user)
app.use('/srv/course', course)
app.use('/srv/assignment', assignment)
app.use((request, response) => {
    response.redirect('/')
})

db.connect(
).then(() => {
    if (process.env.TITAN_HTTPS === undefined) {
        app.listen(80, '0.0.0.0')
    } else {
        https.createServer({
                key: fs.readFileSync('key.pem'),
                cert: fs.readFileSync('cert.pem')
            },
            app
        ).listen(443, '0.0.0.0')
    }
})

