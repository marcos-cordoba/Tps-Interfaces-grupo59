
//Punto 2
// Selecciona el ícono de la hamburguesa
const hamburguesa = document.querySelector('.hamburguesa');
let menuCategorias = document.querySelector('.menuCategorias')
// Añade un evento de clic al ícono de la hamburguesa
hamburguesa.addEventListener('click', () => {
    if (hamburguesa.classList.contains('cruz')) {
        // Cambia a la animación de volver a hamburguesa
        hamburguesa.classList.remove('cruz');
        hamburguesa.classList.add('volver');
        menuCategorias.style.display = `none`;
    } else {
        // Cambia a la animación de cruz
        hamburguesa.classList.remove('volver');
        hamburguesa.classList.add('cruz');
        menuCategorias.style.display = `block`;
    }
}
);

//Punto 3
const logoGrande = document.querySelector("#titulo");
const logoChico = document.querySelector(".navbarMedio");
document.addEventListener("scroll", () => {
    // Control de la opacidad del logo en función del desplazamiento vertical
    if (window.scrollY < 143) {
        logoChico.style.opacity = 0; // Si el scroll es menor a 100, establece la opacidad del logo chico en 0
        logoGrande.style.opacity=1;
        console.log("scroll"+window.scrollY);
        
    }
   
    if (window.scrollY > 143) {
        logoGrande.style.opacity=0;
        
        logoChico.style.opacity = 1;
        logoChico.style.zindex = 100;
        logoGrande.style.zindex = 0; // Ajusta la opacidad del logo chico en función del desplazamiento
    }
    // Control de la opacidad y escala del logo grande en función del desplazamiento
    // logoGrande.style.opacity = 1 - window.scrollY / 120;
    const scaleValue = Math.max(1 - window.scrollY / 240, 0.0);
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
        c.style.transition = `opacity ease ${index * 0.1}s`; // Ajusta la duración y el retraso de la transición
        c.style.opacity = '1';
        c.classList.add('animacion') // activa la animacion
    });
};

cargarElemento();

//Parallax
//Definimos 2 arreglos distintos ya que los personajes se moveran hacia arriba y el fondo hacia abajo
const capasPersonajes = [titulo, personaje1, personaje2, personaje3];
const capasNaturaleza = [arbolGrande, arbolMedio, arbolChico, arbusto1, arbusto2, arbusto3, arbusto4, piedra1, piedra2, piedra3, piedra4];
window.addEventListener("scroll", () => {
    capasPersonajes.forEach((e) => {
        let velocidad = e.getAttribute('data-velocidad'); // Obtiene la velocidad de desplazamiento
        e.style.transform = `translateY(-${window.scrollY * velocidad}px)`;
        let velocidadFondo = fondo.getAttribute('data-velocidad');
        fondo.style.transform = `translateY(${window.scrollY * velocidadFondo}px)`;
        let velocidadPersonaje1 = personaje1.getAttribute('data-velocidad');
        // personaje1.style.transform = `translate(-${window.scrollY * velocidadPersonaje1}px,-${window.scrollY * velocidadPersonaje1}px)`;
        // let velocidadPersonaje2 = personaje2.getAttribute('data-velocidad');
        // personaje2.style.transform =  `translate(0px,-${window.scrollY * velocidadPersonaje2}px)`;
        // let velocidadPersonaje3 = personaje3.getAttribute('data-velocidad');
        // personaje3.style.transform =  `translate(${window.scrollY * velocidadPersonaje3}px,-${window.scrollY * velocidadPersonaje3}px)`;
        let velocidadArbolGrande = arbolGrande.getAttribute('data-velocidad');
        arbolGrande.style.transform =  `translate(${window.scrollY * velocidadArbolGrande}px,-${window.scrollY * velocidadArbolGrande}px)`;
         // Mueve el elemento hacia arriba o hacia abajo dependiendo del valor de la velocidad y del desplazamiento vertical de la ventana.
        let velocidadArbolMedio = arbolMedio.getAttribute('data-velocidad');
        arbolMedio.style.transform =  `translate(${window.scrollY * velocidadArbolMedio}px,-${window.scrollY * velocidadArbolMedio}px)`;
        let velocidadArbolChico = arbolChico.getAttribute('data-velocidad');
        arbolChico.style.transform =  `translate(${window.scrollY * velocidadArbolChico}px,-${window.scrollY * velocidadArbolChico}px)`;
        let velocidadArbusto1 = arbusto1.getAttribute('data-velocidad');
        arbusto1.style.transform =  `translate(${window.scrollY * velocidadArbusto1}px,-${window.scrollY * velocidadArbusto1}px)`;
        let velocidadArbusto2 = arbusto1.getAttribute('data-velocidad');
        arbusto2.style.transform =  `translate(${window.scrollY * velocidadArbusto2}px,-${window.scrollY * velocidadArbusto2}px)`;
        let velocidadArbusto3 = arbusto1.getAttribute('data-velocidad');
        arbusto3.style.transform =  `translate(${window.scrollY * velocidadArbusto3}px,-${window.scrollY * velocidadArbusto3}px)`;
        let velocidadArbusto4 = arbusto1.getAttribute('data-velocidad');
        arbusto4.style.transform =  `translate(${window.scrollY * velocidadArbusto4}px,-${window.scrollY * velocidadArbusto4}px)`;
        let velocidadPiedra1 = piedra1.getAttribute('data-velocidad');
        piedra1.style.transform =  `translate(${window.scrollY * velocidadPiedra1}px,-${window.scrollY * velocidadPiedra1}px)`;
        let velocidadPiedra2 = piedra1.getAttribute('data-velocidad');
        piedra2.style.transform =  `translate(${window.scrollY * velocidadPiedra2}px,-${window.scrollY * velocidadPiedra2}px)`;
        let velocidadPiedra3 = piedra1.getAttribute('data-velocidad');
        piedra3.style.transform =  `translate(${window.scrollY * velocidadPiedra3}px,-${window.scrollY * velocidadPiedra3}px)`;
        let velocidadPiedra4 = piedra1.getAttribute('data-velocidad');
        piedra4.style.transform =  `translate(${window.scrollY * velocidadPiedra4}px,-${window.scrollY * velocidadPiedra4}px)`;
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
    imagen.style.transform = 'translate3d(' + desplazamientoX * -0.05 + 'px, ' + desplazamientoY * -0.05 + 'px, 0px) scale(1.05)';
}

function resetPosition() {
    // Restablece la posición de la imagen al centro
    imagen.style.transform = 'translate3d(0px, 0px, 0px)';
}

//Punto 10
// Selecciona el contenedor amarillo y los elementos
const sectionVideo = document.querySelector(".seccion5");
const personaje3Seccion5 = document.getElementById("personaje3Seccion5");
const videoFrame = document.getElementById("videoFrame");
// Agrega el evento para mostrar los elementos cuando el mouse entra en el contenedor
sectionVideo.addEventListener("mouseenter", () => {
    // Aparecer desde la derecha (personaje)
    personaje3Seccion5.style.transform = "translateX(0)"; // El personaje se mueve a su posición original
    personaje3Seccion5.style.opacity = "1"; // Muestra el personaje
    // Aparecer desde la izquierda (video)
    videoFrame.style.transform = "translateX(0)"; // El video se mueve a su posición original
    videoFrame.style.opacity = "1"; // Muestra el video
});
//Oculta los elementos cuando el mouse sale de la sección
sectionVideo.addEventListener("mouseleave", () => {
    // Mueve el personaje hacia la derecha
    personaje3Seccion5.style.transform = "translateX(200px)"; // Desplaza el personaje fuera de la pantalla hacia la derecha
    personaje3Seccion5.style.opacity = "0"; // Oculta el personaje

    // Mueve el video hacia la izquierda
    videoFrame.style.transform = "translateX(-200px)"; // Desplaza el video fuera de la pantalla hacia la izquierda
    videoFrame.style.opacity = "0"; // Oculta el video
});

//Punto 9
// Selecciona los elementos necesarios
const imagenes = document.querySelectorAll(".demoImag img"); // Todas las imágenes
const textos = document.querySelectorAll(".demoInfos > div"); // Todas las secciones de texto

// Configuración del evento scroll
window.addEventListener("scroll", () => {
    // Calcula el punto medio de la ventana (en altura) para tener una referencia de posición
    const centroVentana = window.innerHeight / 2;
    // Itera sobre cada bloque de texto (descripciones) y su índice correspondiente
    textos.forEach((texto, index) => {
    const limitesTexto = texto.getBoundingClientRect();  // Obtiene las dimensiones y la posición del bloque de texto actual en relación a la ventana
    const centroTexto = limitesTexto.top + limitesTexto.height / 2; // Calcula el centro vertical del bloque de texto sumando su altura dividida entre dos
    const distancia = Math.abs(centroVentana - centroTexto); // Calcula la distancia entre el centro del bloque de texto y el centro de la ventana

    // Activar la imagen y el texto cuando el centro del texto esté cerca del centro de la ventana
    if (distancia < (limitesTexto.height+60)) {
      // Desactiva todas las imágenes y textos
      imagenes.forEach((img) => {img.classList.add("inactive");
                                 img.classList.remove("sticky");

      });
      textos.forEach((txt) => txt.classList.remove("active"));

      // Activa la imagen y el texto actuales
      imagenes[index].classList.remove("inactive");
      imagenes[index].classList.add("sticky");
      textos[index].classList.add("active");
       // Calcula la traslación en el eje Y según el scroll
       if(window.scrollY>4084){

           let desplazamientoY = (centroVentana - centroTexto);
           imagenes[index].style.transform = `translateY(${desplazamientoY}px)`;
       }
       
    }
    
    
  });
});
console.log("scrooooool"+window.scrollY);