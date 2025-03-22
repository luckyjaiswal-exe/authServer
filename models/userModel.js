const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    _id: {
        type: "ObjectId"
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    versionKey: false
})

const User = mongoose.model('User', schema, 'users')

module.exports = User