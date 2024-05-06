const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const proprietaireSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password : { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, validate: /^[0-9]{10}$/, required: true },
});

proprietaireSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", proprietaireSchema);