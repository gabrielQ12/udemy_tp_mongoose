const passSchema = require("../models/passSchema");

module.exports = (req,res,next) => {
    if (!passSchema.validate(req.body.password)){
        return res.status(400).json({error: "mot de passe non valide"});
    } else {
        next();
    }
}
