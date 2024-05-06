const User = require("../models/proprietaireModels");
const bcrypt = require ("bcrypt");

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((passHash)=> {
        const proprietaire = new User({
            email: req.body.email,
            password: passHash,
            name: req.body.name,
            phone: req.body.phone,
        });

        proprietaire
        .save()
        .then(() => res.status(201).json({ message: "propriétaire créé" }))
        .catch((error) => res.status(400).json({ error }));
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};
