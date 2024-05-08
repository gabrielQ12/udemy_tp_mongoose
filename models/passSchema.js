const passwordValidator = require('password-validator');

const passSchema = new passwordValidator();

passSchema
    .is().min(8) // minimum 8 lettre
    .is().max(20) // maximum 20 lettre
    .has().uppercase() // upper case letters
    .has().lowercase() // lower case letters
    .has().digits(2) // dois contenire au moins 2 chiffres
    .has().not().spaces() // ne dois pas contenire des espaces
    .is().not().oneOf(["Password", "Password123"]); // liste de mot de passe interdit

    module.exports = passSchema;