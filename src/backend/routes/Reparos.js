const express = require("express");
const router = express.Router();
const { Reparo, Veiculo, Modelo, Marca } = require("../models");

// Buscar Todos os Reparos
router.get("", (req, res) => {
    Reparo.findAll({
        include: [
            {
                model: Veiculo, attributes: ['placa'],
                include: [
                    {
                        model: Modelo, attributes: ['nome'],
                        include: [
                            { model: Marca, attributes: ['nome'] }
                        ]
                    }
                ]
            },
        ]
    }).then((reparos) => {
        res.send(reparos)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

router.post("/cadastrar", async (req, res) => {
    const t = await Reparo.sequelize.transaction();

    const { descricao, data, custo, id_veiculo } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        const novoReparo = await Reparo.create ({
            descricao,
            data,
            custo,
            id_veiculo,
        }, { transaction: t });

        await t.commit();

        res.status(201).json(novoReparo);
    } catch(error){
        await t.rollback();
        console.error('Erro ao criar reparo:', error);
        res.status(500).json({ error: 'Erro ao criar reparo' });
    }
});

module.exports = router;