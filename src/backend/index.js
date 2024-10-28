require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());


const db = require("./models");
const clienteRoute = require("./routes/Clientes");
const marcaRoute = require("./routes/Marcas");
const veiculoRoute = require("./routes/Veiculos");

app.use("/clientes", clienteRoute);
app.use("/marcas",marcaRoute);
app.use("/veiculos",veiculoRoute);


/*
db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  })
})
*/


// Endpoint de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});



