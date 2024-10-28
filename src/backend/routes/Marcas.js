const express = require("express");
const router = express.Router();
const { Marca} = require("../models");

router.get("/select", (req, res) => {
    Marca.findAll().then((marcas) => {
        res.send(marcas)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })   
});

module.exports = router;