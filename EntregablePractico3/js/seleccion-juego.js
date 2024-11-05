let modos = document.querySelectorAll(".modo");


for (let index = 0; index < modos.length; index++) {
    const element = modos[index];
    element.addEventListener('clic', function(){
        element.classList.toggle('modo-seleccionado');
    })
    
}

