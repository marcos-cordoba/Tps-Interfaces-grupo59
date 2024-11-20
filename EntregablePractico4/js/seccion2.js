const imagenes = ["imagenes/seccion2/imagen2.svg", "imagenes/seccion2/imagen3.svg", "imagenes/seccion2/imagen4.svg"];
let indice = 0;

function cambiarImagen(){
    if(indice === 2){
        indice = -1;
    }
    indice = (indice + 1);
    document.getElementById("imagen").src = imagenes[indice];
}


setInterval(cambiarImagen, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-s2");

    const handleScroll = () => {
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
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar al inicio para detectar la posición inicial
});

