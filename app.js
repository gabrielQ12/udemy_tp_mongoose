const express = require ("express");
const mongoose = require ("mongoose");
const app = express();
const immobilierRoutes = require ("./routes/immobilierRouter");
const proprietaireRoutes = require ("./routes/proprietaireRouter");
// Middleware//
const morgan = require ("./middlewares/infoRequete");
const bodyParser = require ("./middlewares/parserDonnées");

// module path

const path = require("path");

app.use(bodyParser);
// morgan permet de voir les requêtes http dans la console
app.use(morgan);

app.use((req,res,next) => {
    res.setHeader("Acces-Control-Allow-Origin", "*");
    res.setHeader(
        "Acces-Control-Allow-Origin",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    );
    res.setHeader(
        "Acces-Control-Methodes",
        "GET, POST, PUT, DELETE, PATH, OPTIONS",
    );
    next();
});

// Fin des Middlewares//

/// geres les images dans le dossier statique ///
app.use("/images", express.static(path.join(__dirname,"image")));
///

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
app.use("/api/authentification", proprietaireRoutes);

// Exemple //
app.get("",(req,res) => {
    res.status(200)
    res.send("application fonctionnel");
});

console.log("application executé");

module.exports = app;