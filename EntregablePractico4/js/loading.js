document.addEventListener("DOMContentLoaded", function(){
    const percentageElement = document.getElementById('percentage');
    const progressBar = document.querySelector('.progress');
    let percentage = 0;
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
        percentage += 1;
        percentageElement.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;
        
        if (percentage >= 100) {
            clearInterval(interval);
            
            // Añadir animación de finalización
            progressBar.style.animation = 'completeAnimation 0.5s ease forwards';
            
            // Redirigir después de la animación
            setTimeout(() => {
                window.location.href = 'index.html'; // Cambia a la URL de tu home
            }, 0); // 500 ms para esperar a que termine la animación
        }
    }, 500);
});

const imagen1 = document.getElementById('personaje_1');

document.addEventListener("mousemove", parallaxVengadores);

function parallaxVengadores(e) {
    console.log("ESTO ANDA")
    //Determina el centro de la pantalla
    let w = window.innerWidth / 2;
    let h = window.innerHeight / 2;

    //Determina la posicion del mouse
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    //Calcula la diferencia de la posición del mouse respecto del centro de la ventana
    let desplazamientoX = mouseX - w;
    let desplazamientoY = mouseY - h;

    //Calcula el desplazamiento de cada capa en proporción al desplazamiento calculado anteriormente
    imagen1.setAttribute('style', 'transform: translate3d( ' + desplazamientoX * 0.04 + 'px, ' + -desplazamientoY * 0.04 + 'px, 0px)');
}