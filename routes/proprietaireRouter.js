const express = require("express");
const router = express.Router();

const proprietaireCtrl = require("../controllers/proprietaireController");

const verifEmail = require("../middlewares/validEmail");



router.post("/signup",verifEmail, proprietaireCtrl.signUp);
router.post("/login",proprietaireCtrl.login);



module.exports = router;