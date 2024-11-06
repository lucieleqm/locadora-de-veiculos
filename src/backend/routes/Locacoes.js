const express = require("express");
const router = express.Router();
const { Locacao, ImagemLocacao, Cliente, Veiculo, Modelo, Marca} = require("../models");
const upload = require('../config/multer');

// Buscar Todas as Locacoes
router.get("", (req, res) => {
    Locacao.findAll({
        include: [
            {model: Cliente, atributes: ['nome']},
            {model: Veiculo, include: [
                {model: Modelo, atributes: ['nome'], include: [
                    {model: Marca, atributes: ['nome']}
                ]}
            ]},
        ]
    }).then((locacoes) => {
        res.send(locacoes)
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
});

// Rota para Cadastrar a Locacao
router.post("/cadastrar", upload.array('imagens') ,async (req, res) => {
    // transaction serve para garantir que todas as inserções sejam atômicas, 
    //ou seja,  (ou todas ocorrem, ou nenhuma ocorre, para garantir integridade)
    const t = await Locacao.sequelize.transaction();

    const { dt_inicio, dt_final, id_veiculo, id_cliente } = req.body;
    console.log('Recebido no backend:', req.body);

    try {
        // Cria a Locacão
        const novaLocacao = await Locacao.create({
            dt_Inicio: dt_inicio, 
            dt_Final: dt_final, 
            id_veiculo, 
            id_cliente,
        }, { transaction: t });

        // Manipulação das imagens
       const imagens = req.files.map((file) => ({
            id_locacao: novaLocacao.id,
            url: `uploads/${file.filename}`
        }));

        //Cadastra várias imagens de uma vez
        await ImagemLocacao.bulkCreate(imagens, { transaction: t });

        await t.commit();

        res.status(201).json(novaLocacao);
    } catch (error) {
        // Reverte alteraçoes feitas na transação
        await t.rollback();
        console.error('Erro ao criar locação:', error);
        res.status(500).json({ error: 'Erro ao criar locação' });
    }
});


module.exports = router;
