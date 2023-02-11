const express = require("express");
const router = express.Router();

router.get("/health", async (req, res) => {
    res.status(201).send({
        health: true
    })
});

module.exports = router;
