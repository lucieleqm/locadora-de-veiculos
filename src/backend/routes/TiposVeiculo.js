const express = require("express");
const router = express.Router();
const { TipoVeiculo, Marca } = require("../models");

router.get("", (req, res) => {
    TipoVeiculo.findAll().then((tipos) => {
        res.send(tipos)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })   
});


// Rota para buscar marcas associadas a um tipo de veículo específico
router.get("/:tipoId/marcas", async (req, res) => {
  const { tipoId } = req.params;

  try {
    const marcas = await Marca.findAll({
      where: {id_tipo_veiculo: tipoId}
    });

    if (marcas.length === 0) {
      return res.status(404).json({ mensagem: "Tipo de veículo não encontrado." });
    }

    res.status(200).json(marcas);
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    res.status(500).json({ mensagem: "Erro ao buscar marcas" });
  }
});

module.exports = router;
