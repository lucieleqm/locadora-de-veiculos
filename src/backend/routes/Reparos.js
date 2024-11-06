const express = require('express')
const router = express.Router()
const {Reparo, Modelo, Veiculo} = require('../models');

// Buscar reparos
router.get("", (req, res) => {
    Reparo.findAll({
        include: [
            {
                model: Veiculo,
                include: [
                    {
                        model: Modelo,
                        attributes: ['nome']
                    }
                ],
                attributes: ['placa']
            },
            {model: Reparo, attributes: ['data']},
            {model: Reparo, attributes: ['custo']},
            {model: Reparo, attributes: ['descricao']}
        ]
    }).then((reparos) => {
        res.send(reparos);
    }).catch(err => {
        console.log("Erro ao buscar reparos:", err); // Detalha o erro no console
        res.status(500).json({ error: "Erro ao buscar reparos", details: err.message }); // Envia a mensagem detalhada do erro
    });
});


router.post('/insert', async (req, res) => {
    const t = await Reparo.sequelize.transaction()

    const { id_veiculo, data, custo, descricao} = req.body;
    console.log('Recebido do backend', req.body);

    try {
        const novoReparo = await Reparo.create({
            descricao,
            data: data,
            custo,
            id_veiculo,
        }, {transaction: t})

        await t.commit()
       
        res.status(201).json(novoReparo)
    } catch(error) {
        await t.rollback()
        console.error('Erro ao cadastrar reparo:', error)
        res.status(500).json({error: 'Erro ao cadastrar reparo'})
    }      
})

module.exports = router;