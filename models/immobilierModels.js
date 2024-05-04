const mongoose = require('mongoose');

const Immobilier = new mongoose.Schema({
    type: {
        type: String,
        enum: ["appartement", "maison", "terrain", "garage"],
        required: true,
    },
    titre : { type: String, required: true},
    description: { type: String, required: true},
    categorie : { type: String, enum: ["location", "vente"]},
    imageUrl : {type: String, required: true},
    annee : {type: Number, min:1300},
    etat : {type: String, enum: ['neuf', 'ancien']},
    surfaceHabitat : {type: Number, min : 10},
    surfaceTotale: {type: Number, min : 0, required: true},
    jardin : { type : String, enum : [ "oui", "non"]},
    ville : {type: String , required: true},
    adresse : {type: String, required: true},
    postal : { type: Number, required: true},
    proprietaire: [{type : mongoose.Types.ObjectId, ref:"User"}]
});

module.exports = mongoose.model("Immo", Immobilier);