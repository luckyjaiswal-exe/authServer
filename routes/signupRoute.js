const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const router = express.Router()
let { getOtpSotre, setOtpSotre } = require('../global')

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

router.post('/', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid Password").isLength({ min: 8 }),
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    User.findOne({ email: req.body.email })
        .then(async (resData) => {
            if (resData != null) {
                return res.status(400).json({ success: false, message: "Email is already in use" })
            } else if (resData == null) {
                let OTPdata = req.body
                let OTP = generateOtp();
                let expiry = Date.now() + 300000
                let OTPobj = { OTP, expiry }
                let salt = await bcrypt.genSalt(10);
                let specialId = await bcrypt.hash(req.body.email, salt);
                OTPdata = { ...OTPdata, specialId, OTP: OTPobj }
                setOtpSotre(OTPdata)
                res.json({ status: true, specialId, ...OTPobj })

            } else {
                return res.status(500).json({ success: true, message: "Internal Server Error" })
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        })
});

module.exports = router



