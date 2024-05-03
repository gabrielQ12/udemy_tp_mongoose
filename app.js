const express = require ("express");
const mongoose = require ("mongoose");
const app = express();
const morgan = require ("./middlewares/infoRequete");
const bodyParser = require ("./middlewares/parserDonnées");

app.use(bodyParser);

// morgan permet de voir les requêtes http dans la console
app.use(morgan);

require("dotenv").config();


// connexion à la BDD mongoDB
mongoose
    .connect (process.env.LIEN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connecté à la BDD"))
    .catch(() => console.log("Erreur de connection"));

app.get("",(req,res) => {
    res.status(200)
    res.send("application fonctionnel");
});

console.log("application executé");

module.exports = app;