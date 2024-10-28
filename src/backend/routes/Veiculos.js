const express = require("express");
const router = express.Router();
const { Veiculo, Modelo } = require("../models");

router.get('/select', async (req, res) => {
    try {
      const veiculos = await Veiculo.findAll({
        include: [{
          model: Modelo,
          attributes: ['nome'], // Inclui apenas o nome do modelo
        }],
      });
      res.json(veiculos);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      res.status(500).send('Erro ao buscar veículos');
    }
  });

router.get("/insert", (req, res) => {
    //res.send("insert");
    Veiculo.create({
        tipo: "Moto",
        placa: "ABC1A24",
        renavam: "Engenheiro",
        chassi: "9BD111060T5002156",
        motor: "200 cc",
        cor: "Preta",
        ano: "2020",
        valor: "100",
        status: "123",
        id_modelo: 2766,
        id_combustivel: 1,
        imagem: "https://image1.mobiauto.com.br/images/api/images/v1.0/388675756/transform/fl_progressive,f_webp,q_70,w_600"
        
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

module.exports = router;