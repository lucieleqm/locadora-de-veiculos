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

app.use("/clientes", clienteRoute);



db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  })
})


// Endpoint de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});



