const express = require("express");
const router = express.Router();
const { Reparo, Veiculo, Modelo, Marca } = require("../models");

// Buscar Todos os Reparos
router.get("", (req, res) => {
    Reparo.findAll({
        include: [{
            model: Veiculo,
            attributes: ['placa'],
            include: [{
                model: Modelo,
                attributes: ['nome'],
                include: [{
                    model: Marca,
                    attributes: ['nome']
                }
                ]
            }
            ]
        }]
    }).then((reparos) => {
        res.send(reparos)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

// Buscar reparos de um veículo
router.get("/:veiculoId", (req, res) => {
    const veiculoId = Number(req.params.veiculoId);
    Reparo.findAll({
        where: { id_veiculo: veiculoId },
        include: [{
            model: Veiculo,
            attributes: ['placa'],
            include: [{
                model: Modelo,
                attributes: ['nome'],
                include: [{
                    model: Marca,
                    attributes: ['nome']
                }
                ]
            }
            ]
        }]
    }).then((reparos) => {
        res.send(reparos)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});


router.post("/cadastrar", async (req, res) => {
    const { descricao, data, custo, id_veiculo } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        const novoReparo = await Reparo.create({
            descricao,
            data,
            custo,
            id_veiculo,
        });

        res.status(201).json(novoReparo);
    } catch (error) {
        console.error('Erro ao criar reparo:', error);
        res.status(500).json({ error: 'Erro ao criar reparo' });
    }
});

module.exports = router;