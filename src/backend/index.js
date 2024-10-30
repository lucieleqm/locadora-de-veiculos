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
const combustivelRoute = require("./routes/Combustiveis");
const veiculoRoute = require("./routes/Veiculos");

app.use("/clientes", clienteRoute);
app.use("/marcas",marcaRoute);
app.use("/combustiveis",combustivelRoute);
app.use("/veiculos",veiculoRoute);

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Endpoint de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});



