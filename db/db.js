const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;
const connectToDB = () => {
    mongoose.connect(DB_URI)
        .then(() => {
            console.log(`
-----------------------------
Databse connection successful
-----------------------------
            `)
        })
        .catch(err => {
            console.log(`DB Error ${err}`)
        })

}
module.exports = connectToDB 