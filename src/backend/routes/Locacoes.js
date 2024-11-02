const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Locacao, Veiculo, Cliente } = require("../models");
// Middleware para tratar FormData
const upload = multer(); // Configuração básica para multipart/form-data
router.use(upload.none()); // Isso permite que você receba dados de texto no FormData

router.get("", (req, res) => {
    Locacao.findAll().then((locacoes) => {
        res.send(locacoes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

// Rota para Cadastrar a Locacao
router.post("/cadastrar", async (req, res) => {
    const t = await Locacao.sequelize.transaction();

    const { dt_inicio, dt_final, id_veiculo, id_cliente } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        // Cria a Locacão
        const novaLocacao = await Locacao.create({
            dt_inicio: new Date(dt_inicio), 
            dt_final: new Date(dt_final), 
            id_veiculo, 
            id_cliente,
        }, { transaction: t });

        await t.commit();

        res.status(201).json(novaLocacao);
    } catch (error) {
        console.error('Erro ao criar locação:', error);
        res.status(500).json({ error: 'Erro ao criar locação' });
    }
});


module.exports = router;
