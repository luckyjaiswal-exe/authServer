const express = require('express');
const { getOtpSotre } = require('../global');
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');

const genEncryptedPass = async (password) => {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt);
    return hash
}

router.post('/', async (req, res) => {
    const otpStore = getOtpSotre();
    let dataSet = {}
    try {
        otpStore.forEach(element => {
            if (element["specialId"] == req.body.specialId) {
                if (element["OTP"]["OTP"] == req.body.OTP) {
                    dataSet = element;
                }
                else {
                    res.json({ success: false, message: "invalid OTP" });
                }
            }
        });
        let encyptedPass = await genEncryptedPass(dataSet["password"]);
        let user = new User({ _id: new mongoose.Types.ObjectId(), name: dataSet["name"], email: dataSet["email"], password: encyptedPass })
        user.save()
            .then((response) => {
                const jwtSecretKey = process.env.JWT_SECRET_KEY;
                const data = { id: response._id.toString() }
                const token = jwt.sign(data, jwtSecretKey);
                return res.status(200).json({ success: true, token: token })
            })
            .catch((err) => {
                console.log(err);

                return res.status(400).json({ success: false, message: "Something went wrong" })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error!" })
    }



})


module.exports = router



// {

//     let salt = await bcrypt.genSalt(10)
//     let encyptedPass = await bcrypt.hash(req.body.password, salt);
//     let user = new User({ _id: new mongoose.Types.ObjectId(), name: req.body.name, email: req.body.email, password: encyptedPass })
//     user.save()
//         .then((response) => {
//             const jwtSecretKey = process.env.JWT_SECRET_KEY;
//             const data = { id: response._id.toString() }
//             const token = jwt.sign(data, jwtSecretKey);
//             return res.status(200).json({ success: true, token: token })

//         })
//         .catch((err) => { return res.status(400).json({ success: false, message: "Something went wrong" }) })

// }