const express = require("express");
const router = express.Router();

const proprietaireCtrl = require("../controllers/proprietaireController");



router.post("/signup",proprietaireCtrl.signUp);
router.post("/login",proprietaireCtrl.login);



module.exports = router;