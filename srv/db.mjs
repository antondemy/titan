import mongoose from 'mongoose'

let db = {}
db.connect = () => {
    mongoose.Promise = global.Promise
    return mongoose.connection.openUri('mongodb://localhost/titan'
    ).then(() => {
        db.createModels()
    })
}
db.disconnect = () => {
    return Promise.all(mongoose.modelNames().map(name => {
        return mongoose.model(name).createIndexes()
    })).then(() => {
        return mongoose.disconnect()
    })
}
db.createModels = () => {
    db.Assignment = mongoose.model('assignment', new mongoose.Schema({
        course: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        teacher: {
            type: String,
            required: true
        },
        returnBy: {
            type: Date,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }))
    db.Course = mongoose.model('course', new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        language: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        finishDate: {
            type: Date,
            required: true
        },
        credits: {
            type: Number,
            required: true
        }
    }))
    db.User = mongoose.model('user', new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        passwordSalt: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }))
    db.Session = mongoose.model('session', new mongoose.Schema({
        cookie: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: String,
            required: true
        },
        ipAddress: {
            type: String,
            required: true
        },
        openedAt: {
            type: Date,
            required: true
        },
        closedAt: {
            type: Date,
            required: false
        }
    }))
}
export default db

