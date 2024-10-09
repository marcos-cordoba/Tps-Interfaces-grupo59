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














// // Seleccionamos los formularios y elementos clave
// const formLogin = document.querySelector('.login-box-arriba form');
// const formRegistro = document.querySelector('.form-container form');
// //const successAnimation = document.querySelector('.successAnimation');
// // const checkmark = document.querySelector('.checkmark');
// // const checkmarkCircle = document.querySelector('.checkmarkCircle');
// // const checkmarkCheck = document.querySelector('.checkmarkCheck');
// const waitTime = 4000; // Duración de la animación en ms

// // Función para simular el inicio de sesión correcto
// function loginExitoso() {
//     // Aquí puedes realizar la validación que necesites antes de proceder con la animación

//     // Aplicar animación de éxito
//     successAnimation.classList.remove('formHidden'); // Muestra la animación
//     checkmark.classList.add('checkmarkAnimation');
//     checkmarkCircle.classList.add('checkmarkCircleAnimation');
//     checkmarkCheck.classList.add('checkmarkCheckAnimation');

//     setTimeout(() => {
//         // Al finalizar la animación, ocultar nuevamente
//         successAnimation.classList.add('formHidden');
//         checkmark.classList.remove('checkmarkAnimation');
//         checkmarkCircle.classList.remove('checkmarkCircleAnimation');
//         checkmarkCheck.classList.remove('checkmarkCheckAnimation');
        
//         // Aquí podrías redirigir al usuario o cambiar el contenido
//         window.location.href = '/dashboard'; // Redirige a la página principal
//     }, waitTime);
// }

// // Eventos para manejar el envío de los formularios
// formLogin.addEventListener('submit', (event) => {
//     event.preventDefault(); // Evita el envío inmediato del formulario
//     loginExitoso(); // Llama a la animación de éxito
// });

// formRegistro.addEventListener('submit', (event) => {
//     event.preventDefault(); // Evita el envío inmediato del formulario
//     loginExitoso(); // Llama a la animación de éxito (registro exitoso)
// });