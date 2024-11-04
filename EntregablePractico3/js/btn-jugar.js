let pantallaJuego = document.querySelector('.juego');
let boton = document.querySelector('btn-jugar-juego');


boton.addEventListener('click', function (){
    pantallaJuego.classList.toggle('invisibilisar');
});

