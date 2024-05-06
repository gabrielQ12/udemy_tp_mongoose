// model mongoose immobilier
const immobilierModels = require('../models/immobilierModels');

const Fs = require("fs");

// récupéré toute les données immobilliers de la BDD (GET)
exports.getAllImmobillier =  (req,res) => {
        immobilierModels
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
    immobilierModels
    .findOne ({_id: req.params.id})
    .populate({path: "proprietaire", select: "name phone"})
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

        const immoFileImage = req.file;
        const immoData = JSON.parse(req.body.data);
        console.log(immoData);
        console.log(immoFileImage);

        delete immoData._id;
        delete immoData.proprietaire;

        const newImmo = await immobilierModels.create({
            type: immoData.type,
            titre :immoData.titre,
            description: immoData.description,
            categorie : immoData.categorie,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${immoFileImage.filename}`,
            annee : immoData.annee,
            etat : immoData.etat,
            surfaceHabitat : immoData.surfaceHabitat,
            surfaceTotale: immoData.surfaceTotale,
            jardin : immoData.jardin ,
            ville : immoData.ville,
            adresse : immoData.adresse,
            postal : immoData.postal,
            proprietaire :  req.auth.userId,
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
        const supprimImmoModif = await immobilierModels.findById(idRequete);
        const nomImage = supprimImmoModif.imageUrl.split("/images/")[1];

        let immoObjet;

        if (supprimImmoModif.proprietaire != req.auth.userId) {
            console.log(req.file); 
            Fs.unlink(`./images/${req.file.filename}`, () =>
                console.log("image abandon image / requete non autorisé"),
        );
            res.status(401).send({message : "non authorisé"});
        } else {

        /// première condition ///
        if(req.file && req.body.data){

            console.log(nomImage);

            Fs.unlink(`./images/${nomImage}`, () => console.log("image suprimé et remplacé"));

            immoObjet = {
                ...JSON.parse(req.body.data), 
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`,
        };
        /// Fin première condition ///
        console.log("ici ? body.data + image: " + immoObjet);
    }
        /// second condition ///
    else if (req.file && !req.body.data){
        console.log(nomImage);
        Fs.unlink(`./images/${nomImage}`, () => console.log("image suprimé et remplacé"),
    );
        /// Fin second condition ///
    immoObjet = {
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`,
    };
    console.log("ici pas de body data mais une image : " + immoObjet);
        /// troisième condition ///
    }else if (req.body.data) {
        immoObjet = {
            ...JSON.parse(req.body.data),
        };
        console.log("ici pas d'image sauf  body data  : " + immoObjet);
        /// Fin de troisieme condition ///
        /// Quatrieme condition ///
    }else {
        immoObjet = {...req.body,};
        console.log("ici pas d'image mais un body raw  : " + immoObjet);
    }   /// Fin de quatrieme condition ///
        immobilierModels
        .updateOne({_id:req.params.id},{...immoObjet,_id:req.params.id})
        .then(()=> res.status(200).json({message: "immobillier modifié ! "}))
        .catch((error) =>
            {res.status(400).json({error,message: "envoi donnée erroné"});
        });
    }
    // bon user,  authentification reussi ,  fin du else
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
        // Code avec JWT
        immobilierModels
        .findById(idRequete)
        .then((immoSupprim) => {
            if (immoSupprim.proprietaire != req.auth.userId) {
                res.status(401)
                .send({ message : " non authorisé)}" });
            } else {
                immobilierModels.deleteOne(idRequete).then(() => {
                    const nomImage = immoSupprim.imageUrl.split("/images/")[1];
                    consol.log(nomImage);
                    Fs.unlink(`./images/${nomImage}`, () =>
                        console.log("image suprimé "),
                    );
                    res.status(201).json ({message :  "trouvé et supprimé"});
                    console.log("trouvé et supprimé" + immoSupprim);
                })
                .catch ((err) => {
                    res.status(400).json ({ message : "pb supression"});
                    console.log("non suipprimé " + err);
                })
            }
        })
        .catch((error) => {
            res.status(404).json({ message : " identifiant immo non trouvé"})
        console.log ("immo non trouvé" + error);
        });
        ///
        ///
        // Code sans JWT
        // const supprimImmo = await immobilierModels.findByIdAndDelete(idRequete);

        // console.log(supprimImmo);

        // if(supprimImmo){
        //     const nomImage = supprimImmo.imageUrl.split("/images/")[1];
        //     consol.log(nomImage);
        //     Fs.unlink(`./images/${nomImage}`, () => console.log("image suprimé "),
        // );
        //     res.status(200).json({message : "bien supprimé"});
        //     console.log("supprimé: " + supprimImmo);
        // }else {
        //     res
        //         .status(404)
        //         .json({message : "bien non trouvé et non supprimé "});
        //     console.log("non supprimé car : " + supprimImmo);
        // }
    } catch (err) {
        res.status(500).send({
            message : err.message || "une erreur s'est produite"
        });
    }
};