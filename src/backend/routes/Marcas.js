const express = require("express");
const router = express.Router();
const { Marca, Modelo} = require("../models");

router.get("/select", (req, res) => {
    Marca.findAll().then((marcas) => {
        res.send(marcas)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })   
});

router.get("/:marcaId/modelos", async (req, res) => {
    const { marcaId } = req.params;
  
    try {
      const modelos = await Modelo.findAll({
        where: { id_marca: marcaId },
      });
  
      if (modelos.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum modelo encontrado para esta marca." });
      }
  
      res.json(modelos);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
      res.status(500).json({ mensagem: "Erro ao buscar modelos." });
    }
  });

module.exports = router;