// model mongoose immobilier
const immobilierModel = require('../models/immobilierModels');

// récupéré toute les données immobilliers de la BDD (GET)
exports.getAllImmobillier =  (req,res) => {
        immobilierModel
        .find()
        .then((elements) => {
            console.log("liste des bien");
            res.status(200).json(elements)
        })
        .catch((error) =>
            res.status(500).json({error: "pas d'accès au server"}),
    );
};

// récupéré 1 bien immobillier (GET)
exports.getOneImmobillier =  (req,res) => {
    immobilierModel
    .findOne ({_id: req.params.id})
    .then((element) => {
        console.log("1 bien immobillier trouvé");
        res.status(200).json(element)
    })
    .catch((error) =>
        res.status(500).json({error: "pas d'accès au server"}),
);
};

// ajouter 1 bien immobiler (POST)
exports.postNewImmobillier = async (req,res) => {
    try {
        const newImmo = await immobilierModel.create({
            type: req.body.type,
            titre :req.body.titre,
            description: req.body.description,
            categorie : req.body.categorie,
            annee : req.body.annee,
            etat : req.body.etat,
            surfaceHabitat : req.body.surfaceHabitat,
            surfaceTotale: req.body.surfaceTotale,
            jardin : req.body.jardin ,
            ville : req.body.ville,
            adresse : req.body.adresse,
            postal : req.body.postal,
        });
        res.status(200).json({message : "bien enregistré"});
        console.log("nouveau bien immo: " + newImmo);
    } catch (err) {
        res.status(500).send({
            message : err.message || "une erreur s'est produite"
        });
    }
};


// modifier 1 bien immobilier (PUT)
exports.putModifImmobillier = async (req,res) => {

    const newObjectImmo = req.body;

    console.log(newObjectImmo);
    try {
        const idRequete = {_id: req.params.id};

        const updateImmo = await immobilierModel.findByIdAndUpdate(
            idRequete,
            newObjectImmo,
            {new:true},
        );

        if(updateImmo){
            res
                .status(200)
                .json({message : "bien modifié"});
            console.log("modifié: " + updateImmo);
        }else {
            res
                .status(404)
                .json({message : "bien non trouvé et non modifié "});
            console.log("non modifié: " + updateImmo);
        }
    } catch (err) {
        res.status(500).send({
            message : err.message || "une erreur s'est produite"
        });
    }
};


// supprimer 1 bien immobilier (DELETE)
exports.deleteOneImmobillier = async (req,res) => {

    try {
        const idRequete = {_id: req.params.id};

        const supprimImmo = await immobilierModel.findByIdAndDelete(idRequete);

        if(supprimImmo){
            res
                .status(200)
                .json({message : "bien supprimé"});
            console.log("supprimé: " + supprimImmo);
        }else {
            res
                .status(404)
                .json({message : "bien non trouvé et non supprimé "});
            console.log("non supprimé car : " + supprimImmo);
        }
    } catch (err) {
        res.status(500).send({
            message : err.message || "une erreur s'est produite"
        });
    }
};