const flechasIzq = document.querySelectorAll('.flechaIzquierda');
const flechasDer = document.querySelectorAll('.flechaDerecha');
const carruseles = document.querySelectorAll('.contenidoCarrusel');
let desplazamiento = Array(carruseles.length).fill(0);

// Función para aplicar la inclinación por izquierda
function aplicarInclinacionIzq(carrusel) {
    carrusel.style.transform += ` skewX(10deg)`; // Aplica inclinación
}

// Función para remover la inclinación por izquierda
function removerInclinacionIzq(carrusel) {
    // Remueve la inclinación después de un tiempo
    setTimeout(() => {
        carrusel.style.transform = carrusel.style.transform.replace(/ skewX\(10deg\)/, ''); // Remueve la inclinación
    }, 400); // Remueve después de 0.4 segundos
}

// Función para aplicar la inclinación por derecha
function aplicarInclinacionDer(carrusel) {
    carrusel.style.transform += ` skewX(-10deg)`; // Aplica inclinación
}

// Función para remover la inclinación por derecha
function removerInclinacionDer(carrusel) {
    // Remueve la inclinación después de un tiempo
    setTimeout(() => {
        carrusel.style.transform = carrusel.style.transform.replace(/ skewX\(-10deg\)/, ''); // Remueve la inclinación
    }, 400); // Remueve después de 0.4 segundos
}

if (window.matchMedia("(min-width: 780px)").matches) {
    flechasIzq.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
            
            const carruselAsociado = carruseles[index];

            // Verifica si está al inicio; si no, mueve a la izquierda
            if (desplazamiento[index] < 30 && desplazamiento[index] < 0) {
                desplazamiento[index] += 12;
            } else {
                desplazamiento[index] = -24; // Vuelve al final del carrusel
            }

            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
            aplicarInclinacionIzq(carruselAsociado); // Aplica la inclinación hacia la izquierda
            removerInclinacionIzq(carruselAsociado); // Remueve la inclinación después de un tiemp de la izquierda
        });
    });

    flechasDer.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
            const carruselAsociado = carruseles[index];

            // Verifica si está al final; si no, mueve a la derecha
            if (desplazamiento[index] > -24) {
                desplazamiento[index] -= 12;
            } else {
                desplazamiento[index] = 0; // Vuelve al inicio del carrusel
            }

            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
            aplicarInclinacionDer(carruselAsociado); // Aplica la inclinación hacia la derecha
            removerInclinacionDer(carruselAsociado); // Remueve la inclinación después de un tiempo de la derecha
        });
    });
}

if (window.matchMedia("(max-width: 780px)").matches) {
    flechasIzq.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
            const carruselAsociado = carruseles[index];

            // Verifica si está al inicio; si no, mueve a la izquierda
            if (desplazamiento[index] < 40 && desplazamiento[index] < 0) {
                desplazamiento[index] += 52;
            } else {
                desplazamiento[index] = -360; // Vuelve al final del carrusel
            }

            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
            aplicarInclinacionIzq(carruselAsociado); // Aplica la inclinación hacia la izquierda
            removerInclinacionIzq(carruselAsociado); // Remueve la inclinación después de un tiemp de la izquierda
        });
    });

    flechasDer.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
            const carruselAsociado = carruseles[index];

            // Verifica si está al final; si no, mueve a la derecha
            if (desplazamiento[index] > -360) {
                desplazamiento[index] -= 52;
            } else {
                desplazamiento[index] = 0; // Vuelve al inicio del carrusel
            }

            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
            aplicarInclinacionDer(carruselAsociado); // Aplica la inclinación hacia la derecha
            removerInclinacionDer(carruselAsociado); // Remueve la inclinación después de un tiempo de la derecha
        });
    });
}
        
        
        