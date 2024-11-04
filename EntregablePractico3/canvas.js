const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Clase Celda
class Celda {
    constructor(fila, columna, x, y, urlImagenFondo = null) {
        this.fila = fila;
        this.columna = columna;
        this.x = x;
        this.y = y;
        this.equipo = null; // Guardará "rojo" o "azul" cuando se ocupe
        this.imagenFondo = null;

        // Si se proporciona una URL, cargamos la imagen de fondo
        if (urlImagenFondo) {
            this.imagenFondo = new Image();
            this.imagenFondo.src = urlImagenFondo;
        }
    }

    dibujar() {
        // Definimos el tamaño reducido (75% de 80 es 60)
        let anchoCelda = ladoCelda;
        let altoCelda = ladoCelda;
        let radioCirculo = 20; // 75% de 30
        let offset = (80 - anchoCelda) / 2; // Ajuste para centrar el área más pequeña

        // Si hay una imagen de fondo, dibújala
        if (this.imagenFondo && this.imagenFondo.complete) {
            ctx.drawImage(this.imagenFondo, this.x + offset, this.y + offset, anchoCelda, altoCelda);
        } else {
            // Si no hay imagen, usa un color de fondo gris claro
            ctx.fillStyle = "#E0E0E0";
            ctx.fillRect(this.x + offset, this.y + offset, anchoCelda, altoCelda);
        }

        // Dibuja el contorno de la celda
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x + offset, this.y + offset, anchoCelda, altoCelda);

        // Dibuja el círculo en la celda
        ctx.beginPath();
        ctx.arc(this.x + 40, this.y + 40, radioCirculo, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    ocupar(equipo) {
        this.equipo = equipo;
    }

    estaOcupada() {
        return this.equipo !== null;
    }
}



class Tablero {
    constructor() {
        this.celdas = []; // Matriz de objetos Celda
        this.posicionesObjetivo = [];
        this.color = "#000000";
        this.victoria = 0;
    }

    setVictoria(victoria){
        this.victoria = victoria;
    }

    setFilasYColumnas(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        const anchoCelda = ladoCelda; // Nuevo ancho de la celda
        const altoCelda = ladoCelda; // Nuevo alto de la celda
        
        let anchoTablero = columnas * anchoCelda; // Número de columnas por el ancho de cada celda
        let altoTablero = filas * altoCelda; // Número de filas por el alto de cada celda

        // Calcular la posición inicial para centrar el tablero
        let xInicial = (canvasWidth - anchoTablero) / 2;
        let yInicial = (canvasHeight - altoTablero) / 2;
    
        this.celdas = Array.from({ length: filas }, (_, i) => 
            Array.from({ length: columnas }, (_, j) => 
                new Celda(i, j, xInicial + j * anchoCelda, yInicial + i * altoCelda, "images/juegos/starwars.svg")
            )
        );
    
        // Actualizamos las posiciones objetivo basadas en el nuevo tamaño de celda
        this.posicionesObjetivo = [];
        for (let i = 0; i < columnas; i++) {
            this.posicionesObjetivo.push({ x: xInicial + i * anchoCelda, y: 30 });
        }
    }

   
    dibujar(posObjetivo) {
        let anchoCelda = 40;
        let altoCelda = 40;
        let radioCirculo = 20; // Tamaño reducido del círculo
    
        // Dibujar las posiciones objetivo como flechas
        this.posicionesObjetivo.forEach(pos => {
            const x = pos.x + anchoCelda; // Centro de la celda
            const y = pos.y + altoCelda ; // Centro de la celda
            
            // Dibujar flecha
            ctx.beginPath();
            ctx.moveTo(x, y + 35); // Parte superior de la flecha
            ctx.lineTo(x + 20, y); // Parte izquierda de la flecha
            ctx.lineTo(x - 20, y); // Parte derecha de la flecha
            ctx.closePath();
            
            if (pos === posObjetivo) {
                ctx.fillStyle = "#FFFFFF"; // Cambiar el color de la flecha al pasar por la posición objetivo
            } else {
                ctx.fillStyle = this.color; // Color por defecto de la flecha
            }
            
            

            ctx.fill();
    
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();
    
        });
    
        // Dibujar cada celda
        this.celdas.forEach(fila => fila.forEach(celda => celda.dibujar()));
    }
    
    

    verificarVictoria(fila, columna, equipo) {
        const direcciones = [
            [0, 1], [1, 0], [1, 1], [1, -1]
        ];

        for (let [df, dc] of direcciones) {
            let conteo = 1;
            for (let paso = 1; paso < this.victoria; paso++) {
                const f = fila + paso * df;
                const c = columna + paso * dc;
                if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && this.celdas[f][c].equipo === equipo) {
                    conteo++;
                } else break;
            }
            for (let paso = 1; paso < this.victoria; paso++) {
                const f = fila - paso * df;
                const c = columna - paso * dc;
                if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && this.celdas[f][c].equipo === equipo) {
                    conteo++;
                } else break;
            }
            if (conteo >= this.victoria) return true;
        }
        return false;
    }
}

// Clase Ficha
class Ficha {
    constructor(x, y, color, imagen) {
        this.x = x;
        this.y = y;
        this.color = "black";
        this.imagen = imagen;
        this.activa = false;
        this.fija = false;
        this.inicialX = x;
        this.inicialY = y;
    }

    dibujar() {
        const radioFicha = 19; // Nuevo radio de la ficha
    
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, radioFicha, 0, Math.PI * 2);
        ctx.clip();
    
        // Dibuja la imagen de la ficha con el nuevo tamaño de 45x45
        ctx.drawImage(this.imagen, this.x - radioFicha, this.y - radioFicha, 45, 45);
        ctx.restore();
    
        // Dibuja el contorno de la ficha
        ctx.beginPath();
        ctx.arc(this.x, this.y, radioFicha, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    
    limpiar(){
        this.x = -130;
        this.y = -130;
    }

    // Método para regresar a su posición inicial
    resetPosicion() {
        this.x = this.inicialX;
        this.y = this.inicialY;
    }
}

// Configuración inicial
let f=null;
let c=null;

let ladoCelda =40;


let canvasWidth = canvas.width;
let canvasHeight = canvas.height;



let tablero=new Tablero();;
const fichasRojas = [];
const fichasAzules = [];
const imagenBackground = new Image();
const imagenFicha = new Image();
const imagenAzul = new Image();

imagenFicha.src = "images.jpeg";
imagenAzul.src = "images2.jpeg";
imagenBackground.src = "images/back4.jpg";





let turnoRojo = true;
let fichaSeleccionada = null;
let offsetX = 0, offsetY = 0;


const botonInicio = document.getElementById("btn-jugar-juego");
const contenedorJuego = document.getElementById("contenedorJuego");
const juego = document.querySelector(".juego");
const opcionesModo = document.getElementById("opciones-modo");



let nombreJugadorRojo = null;
let nombreJugadorAzul = null;

// Función para mostrar el juego al hacer clic en el botón
botonInicio.addEventListener("click", () => {
    opcionesModo.style.display = "block";
     // Mostramos el juego
    botonInicio.style.display = "none"; 
    juego.style.display = "none";// Ocultamos el botón de inicio
    juego.style.border = "none";
    
});


// Manejar el clic en cada opción de modo de juego
document.querySelectorAll(".modo").forEach(boton => {
    boton.addEventListener("click", (e) => {
        juego.style.display = "block";
        f = e.target.getAttribute("data-filas");
        c = e.target.getAttribute("data-columnas");
        cantVictoria = e.target.getAttribute("data-cantidad-victoria");
        tablero.setVictoria(cantVictoria)
        tablero.setFilasYColumnas(f,c);
        let cantFichas = (f * c ) /2;
        nombreJugadorRojo = document.getElementById('nombreJugadorRojo').value;
        nombreJugadorAzul = document.getElementById('nombreJugadorAzul').value;
        // Crear fichas
        for (let i = cantFichas; i > 0; i--) {
                fichasRojas.push(new Ficha(150, 100 + i * 8, "red", imagenFicha)); 
                fichasAzules.push(new Ficha(950, 100 + i * 8, "blue", imagenAzul));
        }
        
        opcionesModo.style.display = "none";
        contenedorJuego.style.display = "block";
        iniciarReloj();
        dibujar(); // Función que inicia el juego con el modo elegido
        
    });
});

canvas.addEventListener("click", function(e) {
    // Obtener la posición del clic
    tiempoRestante=300;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verificar si el clic está dentro del área del botón
    if (x >= xBoton && x <= 400 && y >= yBoton && y <= 45) {
        volverAlMenu();
    }
});

function volverAlMenu() {
    opcionesModo.style.display = "block";
        contenedorJuego.style.display = "none";
}


let tiempoRestante = 5 * 60; 
let intervaloReloj;

function dibujarReloj() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;

    // Formatea el tiempo en dos dígitos
    let tiempoTexto = `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;

    // Limpia el área del reloj
    ctx.clearRect((canvas.width / 2) - 30, 0, 61, 20);
    // Dibuja el tiempo en el canvas
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(tiempoTexto, (canvas.width/2)-30, 20);
}

let relojCorriendo = false; // Flag para indicar si el reloj está corriendo

function iniciarReloj() {
    if (!relojCorriendo) {
        // Inicia el intervalo solo si no está corriendo
        relojCorriendo = true;

        intervaloReloj = setInterval(() => {
            if (tiempoRestante > 0) {
                dibujarReloj();
                tiempoRestante--;
            } else {
                clearInterval(intervaloReloj);
                relojCorriendo = false; // Reinicia el flag cuando el tiempo se termina
                console.log("¡Tiempo terminado!");
            }
        }, 1000); // Disminuye el tiempo cada segundo
    }
}

function detenerReloj() {
    if (intervaloReloj) {
        clearInterval(intervaloReloj);
        relojCorriendo = false; // Reinicia el flag
    }
}

let xBoton=300;
let yBoton =5;
function dibujarBotonVolver() {
    ctx.fillStyle = "blue"; // Color de fondo del botón
    ctx.fillRect(xBoton, yBoton, 100, 40); // Posición y tamaño del botón

    ctx.font = "20px Arial";
    ctx.fillStyle = "white"; // Color del texto
    ctx.fillText("Volver", xBoton+10, yBoton+35); // Posición del texto
    

}

function dibujar(posObjetivo) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(imagenBackground, 0, 0, canvas.width, canvas.height);
    dibujarReloj();
    
    dibujarBotonVolver();
    
    // Mostrar nombres
    ctx.fillStyle = "white"; // Color del texto
    ctx.font = "20px Arial"; // Fuente y tamaño
    ctx.fillText(`Jugador: ${nombreJugadorRojo}`, 50, 50);
    ctx.fillText(`Jugador: ${nombreJugadorAzul}`, canvas.width - 200, 50);
    
    if(turnoRojo){
        // Mostrar nombres
        ctx.fillStyle = "white"; // Color del texto
        ctx.font = "20px Arial"; // Fuente y tamaño
        ctx.fillText(`Turno: ${nombreJugadorRojo}`, (canvas.width/2)-30, 50);
    }
    else{
      // Mostrar nombres
        ctx.fillStyle = "white"; // Color del texto
        ctx.font = "20px Arial"; // Fuente y tamaño
        ctx.fillText(`Turno: ${nombreJugadorAzul}`, (canvas.width/2)-30, 50);  
    }


    
    tablero.dibujar(posObjetivo);
    
    
    
    fichasRojas.forEach(ficha => ficha.dibujar());
    fichasAzules.forEach(ficha => ficha.dibujar());
}


// Eventos del mouse
canvas.addEventListener("mousedown", e => {
    const mouseX = e.offsetX, mouseY = e.offsetY;
    const fichas = turnoRojo ? fichasRojas : fichasAzules;
    fichaSeleccionada = fichas.slice().reverse().find(ficha => 
        Math.hypot(ficha.x - mouseX, ficha.y - mouseY) < 22.5 && !ficha.fija
    );

    if (fichaSeleccionada) {
        offsetX = mouseX - fichaSeleccionada.x;
        offsetY = mouseY - fichaSeleccionada.y;
        fichaSeleccionada.activa = true;
    }
});

canvas.addEventListener("mousemove", e => {
    if (fichaSeleccionada && fichaSeleccionada.activa) {
        
        
        fichaSeleccionada.x = e.offsetX - offsetX;
        fichaSeleccionada.y = e.offsetY - offsetY;
        
        // Ajustamos la detección de la posición objetivo con el nuevo tamaño de 60x60
        let posObjetivo = tablero.posicionesObjetivo.find(pos =>
            fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + ladoCelda &&
            fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + ladoCelda
        );
        
        if (posObjetivo) {
            const columna = tablero.posicionesObjetivo.indexOf(posObjetivo);
            let filaDisponible = -1;

            // Buscar la primera fila disponible desde abajo hacia arriba
            for (let i = f - 1; i >= 0; i--) {
                
                if (!tablero.celdas[i][columna].estaOcupada()) {
                    filaDisponible = i;
                    break;
                }
            }
            console.log("filaDisplonible"+filaDisponible);
            if (filaDisponible == -1) {
                posObjetivo=null;
            }
            
        }    
        dibujar(posObjetivo);
    }
});

canvas.addEventListener("mouseup", () => {
    if (!fichaSeleccionada) return;

    fichaSeleccionada.activa = false;

    // Ajustamos la detección de la posición objetivo con el nuevo tamaño de 60x60
    const posObjetivo = tablero.posicionesObjetivo.find(pos =>
        fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + ladoCelda &&
        fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + ladoCelda
    );

    if (posObjetivo) {
        const columna = tablero.posicionesObjetivo.indexOf(posObjetivo);
        let filaDisponible = -1;

        // Buscar la primera fila disponible desde abajo hacia arriba
        for (let i = f - 1; i >= 0; i--) {
            if (!tablero.celdas[i][columna].estaOcupada()) {
                filaDisponible = i;
                break;
            }
        }

        if (filaDisponible !== -1) {
            // Iniciar la animación de caída
            animarCaida(fichaSeleccionada, filaDisponible, columna);
        } else {
            fichaSeleccionada.resetPosicion();
        }
    } else {
        fichaSeleccionada.resetPosicion();
    }
    tablero.dibujar(null);
    fichaSeleccionada = null;
    dibujar();
});

function animarCaida(ficha, filaDestino, columnaDestino) {
    const velocidadCaida = 10; // Incremento de caída en píxeles (ajusta este valor para controlar la velocidad)
    let anchoTablero = c * ladoCelda; // Número de columnas por el ancho de cada celda
    let altoTablero = f * ladoCelda;
    // Calcular la posición inicial para centrar el tablero
    let xInicial = (canvasWidth - anchoTablero) / 2;
    let yInicial = (canvasHeight - altoTablero) / 2;

    // La posición final en el eje Y (centrado)
    const yDestino = yInicial+20 + filaDestino * ladoCelda + ladoCelda / 2;

    // La posición final en el eje X (centrado)
    const xDestino = xInicial+20 + columnaDestino * ladoCelda + ladoCelda / 2;
    function pasoCaida() {
        // Mueve la ficha hacia abajo en incrementos
        ficha.x = xDestino;
        if (ficha.y < yDestino) {
            ficha.y += velocidadCaida; // Incrementa la posición Y de la ficha
            // Dibuja el tablero y la ficha en su nueva posición
            tablero.dibujar();
            dibujar();
            // Continúa la animación en el siguiente cuadro
            requestAnimationFrame(pasoCaida);
        } else {
            // La ficha ha llegado a su posición final
            ficha.y = yDestino;
            ficha.x = xDestino; // Ajusta la posición X para que quede centrada
            ficha.fija = true;

            tablero.celdas[filaDestino][columnaDestino].ocupar(turnoRojo ? "rojo" : "azul");

            // Verificar si hay una victoria después de colocar la ficha
            if (tablero.verificarVictoria(filaDestino, columnaDestino, turnoRojo ? "rojo" : "azul")) {
                document.getElementById("resultados").innerHTML = `<p class="victoria">¡Victoria para ${turnoRojo ? nombreJugadorRojo : nombreJugadorAzul}!</p>`;
                setTimeout(reiniciarJuego, 3000);
            } else {
                turnoRojo = !turnoRojo;
            }
            
            fichaSeleccionada = null; // Liberar la selección actual
            dibujar();
        }
    }

    // Inicia el primer paso de la animación
    requestAnimationFrame(pasoCaida);
}



function reiniciarJuego() {
    // Limpia el tablero y resetea fichas
    tablero.celdas.forEach(fila => fila.forEach(celda => celda.ocupar(null)));
    fichasRojas.forEach(ficha => ficha.limpiar());
    fichasAzules.forEach(ficha => ficha.limpiar());
    turnoRojo = true;
    document.getElementById("resultados").innerHTML = ``;
    dibujar();
    // Oculta el contenedor del juego
    contenedorJuego.style.display = "none";
    // Muestra las opciones de modo
    opcionesModo.style.display = "block";
}


imagenFicha.onload = imagenAzul.onload = imagenBackground.onload = dibujar;
