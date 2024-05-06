const express = require("express");
const router = express.Router();

const proprietaireCtrl = require("../controllers/proprietaireController");



router.post("",proprietaireCtrl.signUp);



module.exports = router;