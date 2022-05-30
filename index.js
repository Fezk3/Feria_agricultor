const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/feria', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connexion a la base de datos exitosa");
    })
    .catch(err => {
        console.log("Error al conectar a la base de datos: ");
        console.log(err)
    })

// para usar ejs como motor de plantillas
app.set('view engine', 'ejs');
// para el body de los formularios POST
app.use(express.urlencoded({ extended: true }));
// para que se pueda usar el metodo PUT, DELETE, PATCH
app.use(methodOverride('_method'));
// para parsear json
app.use(express.json());

const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
const Puesto = require('./models/puesto');


const categorias = ['Fruta', 'Vegetal', 'Carne'];
/*

Notas:

para parsear rutas /:id se usa el metodo req.params
const {id} = req.params;
para parsear querystring se usa el metodo req.query 
const nombre = req.query.nombre;
para parsear body se usa el metodo req.body -> para los formularios POST
const nombre = req.body.nombre;

Para enviar resultados de la base de datos a la vista se usa
res.render('ruta', {datos}); // datos es un objeto 

En plantillas ejs:
<%  %> -> para escribir codigo javascript
<%= %> -> para escribir codigo javascript y que se muestre en la vista
<%- %> -> para includes de plantillas

*/

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', async (req, res) => {
    const puestos = await Puesto.find({}).populate('productos');
    res.render('index', { puestos });
});

// Rutas de puestos

// index de puestos
app.get('/puestos', async (req, res) => {
    const puestos = await Puesto.find({});
    res.render('puestos/index', { puestos });
});

// creando un puesto
app.get('/puestos/new', (req, res) => {
    res.render('puestos/new');
});

app.post('/puestos', async (req, res) => {
    const { numero, duenio } = req.body;
    const puesto = new Puesto({ numero, duenio });
    await puesto.save();
    res.redirect('/puestos');
});

// viendo un puesto
app.get('/puestos/:id', async (req, res) => {
    const { id } = req.params;
    const puesto = await Puesto.findById(id).populate('productos');
    res.render('puestos/show', { puesto });
});

// agregando un producto a un puesto
app.get('/puestos/:id/productos/new', async (req, res) => {
    const { id } = req.params;
    const puesto = await Puesto.findById(id);
    res.render('productos/new', { puesto, categorias });
});

app.post('/puestos/:id/productos', async (req, res) => {

    const { id } = req.params;
    const puesto = await Puesto.findById(id);

    const { nombre, precio, categoria } = req.body;
    const producto = new Producto({ nombre, precio, categoria });

    puesto.productos.push(producto); // agregando el producto al puesto
    await puesto.save(); // guardando el puesto
    producto.puesto = puesto; // asignando el puesto al producto
    await producto.save(); // guardando el producto

    res.redirect(`/puestos/${id}`); // redirigiendo a la vista del puesto
});

// eliminar un puesto
app.delete('/puestos/:id', async (req, res) => {
    const { id } = req.params;
    await Puesto.findByIdAndDelete(id);
    res.redirect('/puestos');
});

// editar un puesto
app.get('/puestos/:id/edit', async (req, res) => {
    const { id } = req.params;
    const puesto = await Puesto.findById(id);
    res.render('puestos/edit', { puesto });
});

app.put('/puestos/:id', async (req, res) => {
    const { id } = req.params;
    const { numero, duenio } = req.body;
    await Puesto.findByIdAndUpdate(id, { numero, duenio });
    res.redirect(`/puestos/${id}`);
});





// Rutas para productos

// index de productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.find({});
    res.render('productos/index', { productos, categorias });
});

// creando un producto
app.get('/productos/new', (req, res) => {
    res.render('productos/new', { categorias });
});

app.post('/productos', async (req, res) => {
    const { nombre, precio, categoria } = req.body;
    const productonuevo = new Producto({ nombre, precio, categoria });
    await productonuevo.save();
    res.redirect('/productos');
});

// viendo un producto
app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('puesto');
    res.render('productos/show', { producto });
});

// editar un producto
app.get('/productos/:id/edit', async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.render('productos/edit', { producto, categorias });
});

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria } = req.body;
    const pro = await Producto.findByIdAndUpdate(id, { nombre, precio, categoria });
    res.redirect(`/productos/${id}`);
});

// eliminar un producto
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.redirect('/productos');
});