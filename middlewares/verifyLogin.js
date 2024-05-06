const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{

        const token = req.header.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Token test");
        const userId = decodedToken.userId;
        const timeExpire = decodedToken.exp;
        const dateExpire = new Date(timeExpire*1000);

        console.log(decodedToken, userId, timeExpire,dateExpire);

        if ( req.body.userId && req.body.userId !== userId ){
            console.log( " erreur token");
            throw "user ID non valable";
        } else {
            req.auth = { userId: userId,}
            console.log("le test de log est passé " + req.auth.userId);
            console.log(req);
            console.log("le test de log est passé CRUD OK");
            next();
        }

    } catch (error) {
        res.status(401).json({
            error: " authentification en echec" });
    }
};