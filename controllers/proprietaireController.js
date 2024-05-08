const User = require("../models/proprietaireModels");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");

// masque les données sensible type carte banquaire
const MaskData = require("maskdata");

const maskPhoneOptions = {
    maskWith : "0", //  il est possible de mettre une * a la place du zero cependant il faut changé le type de data utilisé par mongoose dans le model de données
    unmaskedStratDigit : 4,
    unmaskedEndDigits : 1
};

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((passHash)=> {
        const proprietaire = new User({
            email: req.body.email,
            password: passHash,
            name: req.body.name,
            phone: MaskData.maskPhone(req.body.phone,maskPhoneOptions),
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


exports.login = (req, res, next) => {

User.findOne({ email: req.body.email,

}).then((proprietaire)=> {
    if (!proprietaire) {
        return res.status(401).json({ error: "mot de passe ou mail incorrect" });
        }
        bcrypt.compare(req.body.password, proprietaire.password).then((valid) => {
            console.log(valid);
            if (!valid) {
                return res.status(401).json({ error: "mot de passe ou mail incorrect" });
            }
            console.log(proprietaire);
            res.status(200).json({
                userId: proprietaire._id,
                token: jwt.sign({ userId: proprietaire._id,}, "Token test",{expiresIn: "1h"}),
            });
        })
            .catch((error) => res.status(500).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
};
