const mongoose = require('mongoose');

const puestoSchema = new mongoose.Schema({
    numero: Number,
    duenio: String,
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }]
});

const Puesto = mongoose.model('Puesto', puestoSchema);

module.exports = Puesto;