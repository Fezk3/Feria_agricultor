const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    password: String
});

const Usuario = mongoose.model('Usuario', puestoSchema);

module.exports = Usuario;