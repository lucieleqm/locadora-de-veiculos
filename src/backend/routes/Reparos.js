const express = require('express')
const router = express.Router()
const {Reparo, Modelo, Veiculo} = require('../models');

// Buscar reparos
router.get("", async (req, res) => {
    try {
        const reparos = await Reparo.findAll({
            include: [
                {
                    model: Veiculo,
                    attributes: ['placa'],
                    include: [
                        {
                            model: Modelo,
                            attributes: ['nome']
                        }
                    ]
                }
            ],
            attributes: ['data', 'custo', 'descricao']
        });

        console.log("Dados de reparos:", JSON.stringify(reparos, null, 2));

        res.send(reparos);
    } catch (err) {
        console.log("Erro ao buscar reparos:", err);
        res.status(500).json({ error: "Erro ao buscar reparos", details: err.message });
    }
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