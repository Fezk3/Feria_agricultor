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

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.render('index');
});