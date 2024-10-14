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
                window.location.href = 'home.html'; // Cambia a la URL de tu home
            }, 0); // 500 ms para esperar a que termine la animación
        }
    }, 50);
});
 