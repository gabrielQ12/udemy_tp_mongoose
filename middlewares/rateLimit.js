const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
     windowMs: 1 * 60 * 1000, // 1 minute de temporisation
     max: 3, // limite a 3 requete en échec par ip
    message: "vous avez dépassé le nombre de tentatives autorisées"
});

module.exports = limiter;