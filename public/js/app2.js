const h1s = document.querySelectorAll('h1');
const agregar = document.querySelector('#agregar');

const contadorPuestos = () => {
    if (h1s.length === 5) {
        agregar.classList.add('disabled');
    } else {
        agregar.classList.remove('disabled');
    }
}

setInterval(contadorPuestos, 1000);