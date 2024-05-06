const express = require("express");
const router = express.Router();

const multer = require("../middlewares/multerConfig");

const immobilierCtrl = require("../controllers/immobilierController");

const authentification = require("../middlewares/verifyLogin");

router.get("",authentification,immobilierCtrl.getAllImmobillier);

router.get("/:id",authentification, immobilierCtrl.getOneImmobillier);

router.post("",authentification, multer, immobilierCtrl.postNewImmobillier);

router.put("/:id",authentification, multer ,immobilierCtrl.putModifImmobillier);

router.delete("/:id",authentification, immobilierCtrl.deleteOneImmobillier);

module.exports = router;