const express = require ("express");
const mongoose = require ("mongoose");
const app = express();
const immobilierRoutes = require ("./routes/immobilierRouter");
// Middleware//
const morgan = require ("./middlewares/infoRequete");
const bodyParser = require ("./middlewares/parserDonnées");

app.use(bodyParser);
// morgan permet de voir les requêtes http dans la console
app.use(morgan);

// Fin des Middlewares//

app.use("/images", express.static("images"));

require("dotenv").config();


// connexion à la BDD mongoDB
mongoose
    .connect (process.env.LIEN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connecté à la BDD"))
    .catch(() => console.log("Erreur de connection"));

// Routes//
app.use("/api/immobilier", immobilierRoutes);

// Exemple //
app.get("",(req,res) => {
    res.status(200)
    res.send("application fonctionnel");
});

console.log("application executé");

module.exports = app;