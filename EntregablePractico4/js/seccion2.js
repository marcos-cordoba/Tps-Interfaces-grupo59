

// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.getElementById("carrusel");
//     const images = carousel.querySelectorAll("img");
//     const imageWidth = images[0].clientWidth; // Ancho de cada imagen
//     let currentIndex = 0;

//     function moveCarousel() {
//         currentIndex++;
//         // Aplica el desplazamiento al carrusel
//         carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
//         carousel.style.transition = "transform 3s ease-in-out";

//         // Cuando llega al final de las imágenes visibles, reinicia sin transición
//         if (currentIndex === images.length) {
//             setTimeout(() => {
//                 carousel.style.transition = "none"; // Desactiva la transición
//                 currentIndex = 0; // Reinicia el índice
//                 carousel.style.transform = `translateX(0px)`; // Reinicia la posición
//             }, 0); // Espera a que termine la transición antes de reiniciar
//         }
//     }

//     // Configura un intervalo para mover el carrusel automáticamente
//     setInterval(moveCarousel, 3000); // Cambia cada 3 segundos
// });

const carousel = document.getElementById("carrusel")
const images = document.querySelectorAll('.carousel-img');
let currentIndex = 0;

function nextSlide() {
    currentIndex++;
    
    if (currentIndex ===     images.length -1) {
      carousel.style.transition = 'transform 0.5s ease-in-out'; // Desactiva la animación temporalmente
      carousel.style.transform = `translateX(-${currentIndex * 547.30}px)`;
      currentIndex = 0; // Reinicia el índice
      setTimeout(() => {
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(0px)`;
      },500)
    } else {
      updateCarousel();
    }
  }

function updateCarousel() {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * 547.38}px)`;
  }

  setInterval(nextSlide, 3000);


// setInterval(cambiarImagen, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-s2");

    const moverCards = () => {
        const windowHeight = window.innerHeight;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();

            // Verifica si la tarjeta está en pantalla
            if (rect.top < windowHeight && rect.bottom > 0) {
                const delay = index * 0.3; // Retraso entre cada tarjeta
                card.style.transitionDelay = `${delay}s`;
                card.style.transform = `translateY(0)`; // Mueve a su posición original
                card.style.opacity = 1; // Opacidad completa
            } else {
                // Opcional: Restablece el estado cuando está fuera del viewport
                card.style.transitionDelay = "0s";
                card.style.transform = `translateY(80px)`; // Restablece la posición inicial
                card.style.opacity = 0.5; // Baja la opacidad
            }
        });
    };

    // Escucha el evento de scroll
    window.addEventListener("scroll", moverCards);
    moverCards()// Ejecutar al inicio para detectar la posición inicial
});


//*Opcional
const seccion2 = document.querySelector('.seccion2');
const imgFondo= document.getElementById("fondo2");
const h1 = document.querySelector('h1.lato');
const parrafo = document.querySelector('p.parrafo-s2');
const personaje1s2 = document.querySelector('img.personaje1-s2');
const personaje2s2 = document.querySelector('img.personaje2-s2');
const cuadroImg = document.querySelector('.img-containter-s2');

const elementos = [h1, parrafo, personaje1s2, personaje2s2, cuadroImg];

let efectoActivo = true; // Flag para controlar el efecto

// Se obtiene la altura de la sección
const alturaSeccion = seccion2.offsetHeight;


// const observerOptions = {
//     root: null, // Usa el viewport como contenedor
//     rootMargin: '0px', // Sin margen extra
//     threshold: 0.2; // Se activa cuando el 10% de la sección es visible
// };

// const observerCallback = (entries, observer) => {
//     entries.forEach(entry => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // Cuando el 60% es visible
//                 efectoActivo = false; // Desactivar el efecto
//                 window.removeEventListener("scroll", handleScroll);
//                 console.log("ENTRO A ENTRY.ISTERSECTING");
//             } else {
//                 // Si menos del 60% está visible
//                 efectoActivo = true; // Reactivar el efecto
//                 window.addEventListener("scroll", handleScroll);
//             }
//         });
//     });
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(seccion2);

function handleScroll() {
   
   
    console.log("Entro al scroll seccion 2");


    const scrollY = window.scrollY;
    const rect = seccion2.getBoundingClientRect();
    console.log("Entro a seccion 2 SCROLL=" + scrollY);
    
    
    if((scrollY >800) && (scrollY < 1600)){
         console.log("Moviendo elementos en rango de scroll");
        // imgFondo.style.transform = `translateY(${scrollY * -0.2}px);`; // Fondo
        h1.style.transform = `translateY(${scrollY * 0.01}px)`; // Título
        parrafo.style.transform = `translateY(${scrollY * 0.02}px)`; // Párrafo

        personaje1s2.style.transform = `translateY(${scrollY * -0.02}px)  rotate3d(0, 1, 0, -180deg) translateX(${scrollY * 0.05}px`; // Personaje 1
        personaje2s2.style.transform = `translateY(${scrollY * -0.03}px) translateX(${scrollY * 0.05}px`; // Personaje 2

        cuadroImg.style.transform = `translateY(${scrollY * -0.05}px translateX(${scrollY * -0.5}px)`;

    }
  
}
document.addEventListener("scroll", handleScroll);

