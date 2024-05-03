
console.log("Point d'entré démarrage serveur");


const app = require ("./app.js");

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`ecoute du port : ${port}`);
});