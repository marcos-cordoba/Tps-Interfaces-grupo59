
//Punto 2
// Selecciona el ícono de la hamburguesa
const hamburguesa = document.querySelector('.hamburguesa');
// Añade un evento de clic al ícono de la hamburguesa
hamburguesa.addEventListener('click', () => {
    if (hamburguesa.classList.contains('cruz')) {
        // Cambia a la animación de volver a hamburguesa
        hamburguesa.classList.remove('cruz');
        hamburguesa.classList.add('volver');
    } else {
        // Cambia a la animación de cruz
        hamburguesa.classList.remove('volver');
        hamburguesa.classList.add('cruz');
    }
});