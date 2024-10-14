const flechasIzq = document.querySelectorAll('.flechaIzquierda');
const flechasDer = document.querySelectorAll('.flechaDerecha');
const carruseles = document.querySelectorAll('.contenidoCarrusel');
let desplazamiento = Array(carruseles.length).fill(0);
flechasIzq.forEach((flecha, index) => {
    flecha.addEventListener('click', () => {
        // Aquí `index` se usa para seleccionar el carrusel correspondiente
        const carruselAsociado = carruseles[index];
        
        // Incrementar el desplazamiento hacia la izquierda
        
        if (desplazamiento[index]<50&&desplazamiento[index]<0) {
            desplazamiento[index] += 10; 
            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
        }
    });
    });
    
    
    flechasDer.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
           
                // Aquí `index` se usa para seleccionar el carrusel correspondiente
                const carruselAsociado = carruseles[index];
                
                // Incrementar el desplazamiento hacia la izquierda
                if (desplazamiento[index]>(-50)) {
                    desplazamiento[index] -= 10; 
                    carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
                }
                
               
              
            });
        });
        