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

app.get('/', (req, res) => {
    res.render('index');
});