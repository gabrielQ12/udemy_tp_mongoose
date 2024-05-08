const express = require("express");
const router = express.Router();

const proprietaireCtrl = require("../controllers/proprietaireController");

const verifEmail = require("../middlewares/validEmail");

const verifPass = require("../middlewares/validPass");



router.post("/signup",verifEmail,verifPass, proprietaireCtrl.signUp);
router.post("/login",proprietaireCtrl.login);



module.exports = router;