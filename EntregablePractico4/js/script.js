
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

//Punto 3
const logoGrande = document.querySelector("#titulo");
const logoChico = document.querySelector(".navbarMedio");
document.addEventListener("scroll", () => {
    // Control de la opacidad del logo en función del desplazamiento vertical
    if (window.scrollY < 100) {
        logoChico.style.opacity = 0; // Si el scroll es menor a 103, establece la opacidad del logo chico en 0
    }
    if (window.scrollY > 100) {
        logoChico.style.opacity = window.scrollY / 400; // Ajusta la opacidad del logo chico en función del desplazamiento
    }
    // Control de la opacidad y escala del logo grande en función del desplazamiento
    logoGrande.style.opacity = 1 - window.scrollY / 120;
    const scaleValue = Math.max(1 - window.scrollY / 200, 0.0);
    logoGrande.style.scale = scaleValue; // Ajusta la escala del logo grande
});

//Punto 4
// animaciones de entrada
const fondo = document.getElementById('fondo');
const arbolGrande = document.getElementById('arbolGrande');
const arbolMedio = document.getElementById('arbolMedio');
const arbolChico = document.getElementById('arbolChico');
const arbusto1 = document.getElementById('arbusto1');
const arbusto2 = document.getElementById('arbusto2');
const arbusto3 = document.getElementById('arbusto3');
const arbusto4 = document.getElementById('arbusto4');
const titulo = document.getElementById('titulo');
const piedra1 = document.getElementById('piedra1');
const piedra2 = document.getElementById('piedra2');
const piedra3 = document.getElementById('piedra3');
const piedra4 = document.getElementById('piedra4');
const personaje1 = document.getElementById('personaje1');
const personaje2 = document.getElementById('personaje2');
const personaje3 = document.getElementById('personaje3');
const capas = [arbolGrande,arbolMedio,arbolChico,arbusto1,arbusto2,arbusto3,arbusto4,titulo,piedra1,piedra2,piedra3,piedra4,personaje1,personaje2,personaje3];
const cargarElemento = () => {
    capas.forEach((c,index) => {
        c.style.transition = `opacity 0.2s ease ${index * 0.2}s`; // Ajusta la duración y el retraso de la transición
        c.style.opacity = '1';
        c.classList.add('animacion') // activa la animacion
    });
};

cargarElemento();
// Llama a la función después de 5 segundos (para que ocurra despúes del loader)
//Parallax
//Definimos 2 arreglos distintos ya que los personajes se moveran hacia arriba y el fondo hacia abajo
const capasPersonajes = [titulo, personaje1, personaje2, personaje3];
const capasNaturaleza = [arbolGrande, arbolMedio, arbolChico, arbusto1, arbusto2, arbusto3, arbusto4, piedra1, piedra2, piedra3, piedra4];
window.addEventListener("scroll", () => {
    console.log("ANDA1")
    capasPersonajes.forEach((e) => {
        let velocidad = e.getAttribute('data-velocidad'); // Obtiene la velocidad de desplazamiento
        e.style.transform = `translateY(-${window.scrollY * velocidad}px)`;
        let velocidadFondo = fondo.getAttribute('data-velocidad');
        fondo.style.transform = `translateY(${window.scrollY * velocidadFondo}px)`;
        let velocidadPersonaje1 = personaje1.getAttribute('data-velocidad');
        personaje1.style.transform = `translate(-${window.scrollY * velocidadPersonaje1}px,-${window.scrollY * velocidadPersonaje1}px)`;
        let velocidadPersonaje2 = personaje2.getAttribute('data-velocidad');
        personaje2.style.transform =  `translate(0px,-${window.scrollY * velocidadPersonaje2}px)`;
        let velocidadPersonaje3 = personaje3.getAttribute('data-velocidad');
        personaje3.style.transform =  `translate(${window.scrollY * velocidadPersonaje3}px,-${window.scrollY * velocidadPersonaje3}px)`;
         // Mueve el elemento hacia arriba o hacia abajo dependiendo del valor de la velocidad y del desplazamiento vertical de la ventana.
    })
});

window.addEventListener("scroll", () => {
    capasNaturaleza.forEach((e) => {
        const velocidad = e.getAttribute('data-velocidad'); // Obtiene la velocidad de desplazamiento
        e.style.transform = `translateY(${window.scrollY * velocidad}px)`; //Mueve los elementos hacia abajo
    });
});

//Punto 8
const imagen = document.getElementById('personajes');

document.addEventListener("mousemove", parallaxVengadores);
imagen.addEventListener("mouseleave", resetPosition);
function parallaxVengadores(e) {
    // Verifica si el mouse está sobre la imagen antes de aplicar el efecto
    if (e.target !== imagen) return;
    // Determina el centro de la pantalla
    let w = window.innerWidth / 2;
    let h = window.innerHeight / 2;
    // Determina la posición del mouse
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    // Calcula la diferencia de la posición del mouse respecto del centro de la ventana
    let desplazamientoX = mouseX - w;
    let desplazamientoY = mouseY - h;
    // Aplica el desplazamiento a la imagen
    imagen.style.transform = 'translate3d(' + desplazamientoX * 0.05 + 'px, ' + desplazamientoY * 0.05 + 'px, 0px) scale(1.05)';
}

function resetPosition() {
    // Restablece la posición de la imagen al centro
    imagen.style.transform = 'translate3d(0px, 0px, 0px)';
}