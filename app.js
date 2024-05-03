const express = require ("express");

const app = express();

const morgan = require ("./middlewares/infoRequete");

const bodyParser = require ("./middlewares/parserDonnées");

app.use(bodyParser);

// morgan permet de voir les requêtes http dans la console
app.use(morgan);

app.get("",(req,res) => {
    res.status(200)
    res.send("application fonctionnel");
});

console.log("application executé");

module.exports = app;