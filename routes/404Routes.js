const express = require("express")
const router = express.Router()

router.get("/*", (req, res) => {
    res.status(404).json({ errorCode: "404", errorMessage: "path not found" })
})
router.post("/*", (req, res) => {
    res.status(404).json({ errorCode: "404", errorMessage: "path not found" })
})

module.exports = router