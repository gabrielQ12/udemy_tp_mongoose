const express = require("express");
const router = express.Router();
const immobilierCtrl = require("../controllers/immobilierController");

router.get("",immobilierCtrl.getAllImmobillier);

router.get("/:id",immobilierCtrl.getOneImmobillier);

router.post("",immobilierCtrl.postNewImmobillier);

router.put("/:id",immobilierCtrl.putModifImmobillier);

router.delete("/:id",immobilierCtrl.deleteOneImmobillier);

module.exports = router;