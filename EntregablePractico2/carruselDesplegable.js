const flechasIzq = document.querySelectorAll('.flechaIzquierda');
const flechasDer = document.querySelectorAll('.flechaDerecha');
const carruseles = document.querySelectorAll('.contenidoCarrusel');
let desplazamiento = Array(carruseles.length).fill(0);
if (window.matchMedia("(min-width: 780px)").matches) {
    flechasIzq.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
            // Aquí `index` se usa para seleccionar el carrusel correspondiente
            const carruselAsociado = carruseles[index];
            
            // Incrementar el desplazamiento hacia la izquierda
            
            if (desplazamiento[index]<30&&desplazamiento[index]<0) {
                desplazamiento[index] += 12; 
                carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
            }
        });
        });
}  
if (window.matchMedia("(min-width: 780px)").matches) {
    flechasDer.forEach((flecha, index) => {
        flecha.addEventListener('click', () => {
           
                // Aquí `index` se usa para seleccionar el carrusel correspondiente
                const carruselAsociado = carruseles[index];
                
                // Incrementar el desplazamiento hacia la izquierda
                if (desplazamiento[index]>(-24)) {
                    desplazamiento[index] -= 12; 
                    carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
                }
                
               
              
            });
        });
    }
        if (window.matchMedia("(max-width: 780px)").matches) {
            flechasIzq.forEach((flecha, index) => {
                flecha.addEventListener('click', () => {
                    // Aquí `index` se usa para seleccionar el carrusel correspondiente
                    const carruselAsociado = carruseles[index];
                    
                    // Incrementar el desplazamiento hacia la izquierda
                    if (desplazamiento[index] < 40 && desplazamiento[index] < 0) {
                        desplazamiento[index] += 52; 
                        carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
                    }
                });
            });
        }
        if (window.matchMedia("(max-width: 780px)").matches) {
            flechasDer.forEach((flecha, index) => {
                flecha.addEventListener('click', () => {
                   
                        // Aquí `index` se usa para seleccionar el carrusel correspondiente
                        const carruselAsociado = carruseles[index];
                        
                        // Incrementar el desplazamiento hacia la izquierda
                        if (desplazamiento[index]>(-360)) {
                            desplazamiento[index] -= 52; 
                            carruselAsociado.style.transform = `translateX(${desplazamiento[index]}%)`;
                        }
                        
                       
                      
                    });
                });
        }
        
        
        