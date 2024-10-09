
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el elemento del menú hamburguesa
    let menuHamburguesa = document.querySelector('.menuHamburguesa');
    // Selecciona el menú de categorías
    let menuCategorias = document.querySelector('.menuCategorias');

    // Añade un listener para el clic
    menuHamburguesa.addEventListener('click', function () {
        // Alterna la clase 'closed' en el menú de categorías
        menuCategorias.classList.toggle('open');
    });
});