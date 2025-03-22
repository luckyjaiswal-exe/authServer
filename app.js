const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDB = require('./db/db');
require('dotenv').config();

// PORT declaration
const PORT = process.env.PORT || 8000

// connecting to db
connectToDB()

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// available routes
app.use("/", require("./routes/home"))
app.use("/api/register", require("./routes/signupRoute"))
app.use("/api/login", require("./routes/loginRoute"))
app.use("/api/verify", require("./routes/verifyOTP"))
app.use("/*", require("./routes/404Routes"))

// listening server
app.listen(PORT, () => {
    console.log(`
==============================
Server listning on PORT : ${PORT}    
==============================
    `)
})


