const express = require("express");

// securité
const verifEmail = require("../middlewares/validEmail");
const verifPass = require("../middlewares/validPass");
const proprietaireCtrl = require("../controllers/proprietaireController");
const limiter = require("../middlewares/rateLimit");
// const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute de temporisation
//     max: 3, // limite a 3 requete en échec par ip
//     message: "vous avez dépassé le nombre de tentatives autorisées"
// });
// fin sécurité

const router = express.Router();

router.post("/signup",verifEmail,verifPass, proprietaireCtrl.signUp);
router.post("/login",limiter, proprietaireCtrl.login);



module.exports = router;