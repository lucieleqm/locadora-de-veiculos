require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3001;

//app.use(bodyParser.json()); // Analisa JSON app.use
//(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());


const db = require("./models");
const clienteRoute = require("./routes/Clientes");
const coresRoute = require("./routes/Cores");
const tiposVeiculoRoute = require("./routes/TiposVeiculo");
const marcaRoute = require("./routes/Marcas");
const combustivelRoute = require("./routes/Combustiveis");
const veiculoRoute = require("./routes/Veiculos");
const locacaoRoute = require("./routes/Locacoes");
const reparosRoute = require('./routes/Reparos')


app.use("/clientes", clienteRoute);
app.use("/cores",coresRoute);
app.use("/tipos",tiposVeiculoRoute);
app.use("/marcas",marcaRoute);
app.use("/combustiveis",combustivelRoute);
app.use("/veiculos",veiculoRoute);
app.use("/locacoes", locacaoRoute);
app.use('/reparos', reparosRoute)

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Endpoint de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});



