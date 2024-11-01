const express = require("express");
const router = express.Router();
const { Cor } = require("../models");

router.get("", (req, res) => {
    Cor.findAll().then((tipos) => {
        res.send(tipos)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })   
});

module.exports = router;
