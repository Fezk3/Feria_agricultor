// PARA PRODUCTOS -> EN puestos/show.ejs

const lis = document.querySelectorAll('li');
const agregar = document.querySelector('#agregar');

const contadorProductos = () => {
    if (lis.length === 5) {
        agregar.classList.add('disabled');
    } else {
        agregar.classList.remove('disabled');
    }
}

setInterval(contadorProductos, 1000);
