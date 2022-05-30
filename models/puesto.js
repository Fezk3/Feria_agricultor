const mongoose = require('mongoose');
const Producto = require('./producto');

const puestoSchema = new mongoose.Schema({
    numero: Number,
    duenio: String,
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }]
});

// middleware para que cuando se elimine una granja, se eliminen los productos de esa granja
puestochema.post('findOneAndDelete', async (puesto) => {
    if (puesto.productos.length) {
        await Producto.deleteMany({ _id: { $in: puesto.productos } });
    }
});

const Puesto = mongoose.model('Puesto', puestoSchema);

module.exports = Puesto;