import crypto from 'crypto'
import db from '../srv/db'

if (process.argv.length !== 5) {
    console.log('Usage: node --experimental-modules createUser.mjs <email> <fullName> <password>')
    process.exit()
}
db.connect(
).then(() => {
    let salt = crypto.randomBytes(16).toString('hex')
    let hash = crypto.pbkdf2Sync(process.argv[4], salt, 1000, 64, 'sha1').toString('hex')
    new db.User({
        email: process.argv[2],
        fullName: process.argv[3],
        passwordSalt: salt,
        passwordHash: hash,
        role: 'Administrator',
        status: 'Active'
    }).save(
    ).then(() => {
        console.log('User created')
        db.disconnect()
    }).catch(err => {
        console.log(err)
        db.disconnect()
    })
})

