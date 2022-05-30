const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    categoria: String,
    puesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puesto'
    }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;