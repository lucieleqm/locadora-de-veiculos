const express = require("express");
const router = express.Router();
const { Marca, Modelo } = require("../models");

// Função para criar um novo modelo
router.post("/criar", async (req, res) => {
    const { nome, marcaId } = req.body;
    try {
        const modeloExistente = await Modelo.findOne({
            where: { nome, id_marca: marcaId },
        });
        if (modeloExistente) {
            return res.status(400).json({ error: 'Esse modelo já existe para essa marca.' });
        }
        const novoModelo = await Modelo.create({ nome, id_marca: marcaId });
        return res.status(201).json(novoModelo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar modelo.' });
    }
});

module.exports = router;

