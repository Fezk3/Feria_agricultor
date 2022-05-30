// PARA PUESTOS -> EN puestos/index.ejs

const lis = document.querySelectorAll('li');
const agregar = document.querySelector('#agregar');

const contadorPuestos = () => {
    if (h1s.length === 15) {
        agregar.classList.add('disabled');
    } else {
        agregar.classList.remove('disabled');
    }
}

setInterval(contadorPuestos, 1000);