const express = require("express")
const routes = express.Router()
let { getOtpSotre, setOtpSotre } = require("../global")
routes.get("/", (req, res) => {
    console.log("otpSotre : ", getOtpSotre());

    res.status(200).send({ message: "this is a testing server" })
})

module.exports = routes