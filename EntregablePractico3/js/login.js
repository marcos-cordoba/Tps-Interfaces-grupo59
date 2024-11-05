const form = document.querySelectorAll('.form');
const botonAlternatia = document.querySelectorAll('.botonAlternativa');
const botonRegistro = document.querySelectorAll('.botonRegistro');
var waitTime = 4000
const successAnimation = document.querySelector('.successAnimation')
const checkmark = document.querySelector('.checkmark');
const checkmarkCircle = document.querySelector('.checkmarkCircle');
const checkmarkCheck = document.querySelector('.checkmarkCheck');

// añade un evento click, a cada boton de registro
botonRegistro.forEach(boton => {
  
    boton.addEventListener('click', () => {
        successAnimation.classList.toggle('successAnimationAppear');
        checkmark.classList.toggle('checkmarkAnimation');
        checkmarkCircle.classList.toggle('checkmarkCircleAnimation');
        checkmarkCheck.classList.toggle('checkmarkCheckAnimation');
        setTimeout(() => {
            cambioDeForm()
            successAnimation.classList.toggle('successAnimationAppear');
            checkmark.classList.toggle('checkmarkAnimation');
            checkmarkCircle.classList.toggle('checkmarkCircleAnimation');
            checkmarkCheck.classList.toggle('checkmarkCheckAnimation');
        }, waitTime);
    });
})

// cada vez que se jace click, se llama a la funcion 'cambioDeForm'
botonAlternatia.forEach(boton => {
    boton.addEventListener('click', cambioDeForm)
})

//funcion que altera la visibilidad de los formularios
function cambioDeForm(){
    form.forEach(Element => {
        Element.classList.toggle('formHidden') //Se alterna la clase 'formHidden', ocultando o mostrando el formulario
    });
}

function cambioDeForm() {
    console.log("Cambio de formulario");
    form.forEach(Element => {
        Element.classList.toggle('formHidden');
    });
}

function procesarFormulario(event) {
  event.preventDefault(); // Evita el envío del formulario

  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;
  const feedbackMessage = document.getElementById("feedbackMessage");

  if (user === "admin" && password === "admin") {
    // Éxito: muestra mensaje y aplica animación de éxito
    feedbackMessage.textContent = "¡Inicio de sesión exitoso!";
    feedbackMessage.classList.remove("error");
    feedbackMessage.classList.add("visible", "success");
    // Redirigir a home.html después de 6 segundos
    setTimeout(() => {
      window.location.href = "loading.html";
    }, 2000);
  } else {
    // Error: muestra mensaje y mantiene el color rojo
    feedbackMessage.textContent = "Error: Credenciales incorrectas";
    feedbackMessage.classList.remove("success");
    feedbackMessage.classList.add("visible", "error");
  }
}