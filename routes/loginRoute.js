const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router()

router.post('/', [
    body('email', "Invalid email format").isEmail(),
    body('password', "Password Required").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body
    User.findOne({ email: email })
        .then(async (resData) => {
            if (resData == null) {
                return res.status(400).json({ success: false, message: "No user found with these credentials" })
            } else if (resData != null) {
                let comparedData = await bcrypt.compare(password, resData.password)
                if (comparedData) {
                    const jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const data = { id: resData._id.toString() }
                    const token = jwt.sign(data, jwtSecretKey);
                    res.status(200).json({ success: true, token: token })
                } else {
                    res.status(401).json({ success: true, message: "Please provide valid Credentials" })
                }
            } else {
                return res.status(500).json({ success: true, message: "Internal Server Error" })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        })
});

module.exports = router





