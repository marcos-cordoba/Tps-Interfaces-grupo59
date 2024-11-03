
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
        const anchoCelda = 60;
        const altoCelda = 60;
        const radioCirculo = 22.5; // 75% de 30
        const offset = (80 - anchoCelda) / 2; // Ajuste para centrar el área más pequeña

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
        ctx.strokeStyle = this.equipo ? (this.equipo === "rojo" ? "red" : "blue") : "white";
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
    }

    setFilasYColumnas(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        const anchoCelda = 60; // Nuevo ancho de la celda
        const altoCelda = 60; // Nuevo alto de la celda
        const xInicial = 370; // Posición inicial en x
        const yInicial = 130; // Posición inicial en y
    
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
        const anchoCelda = 40;
        const altoCelda = 40;
        const radioCirculo = 22.5; // Tamaño reducido del círculo
    
        // Dibujar las posiciones objetivo como flechas
        this.posicionesObjetivo.forEach(pos => {
            const x = pos.x + anchoCelda; // Centro de la celda
            const y = pos.y + altoCelda +15; // Centro de la celda
            
            // Dibujar flecha
            ctx.beginPath();
            ctx.moveTo(x, y + 25); // Parte superior de la flecha
            ctx.lineTo(x + 15, y); // Parte izquierda de la flecha
            ctx.lineTo(x - 15, y); // Parte derecha de la flecha
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
            for (let paso = 1; paso < 4; paso++) {
                const f = fila + paso * df;
                const c = columna + paso * dc;
                if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && this.celdas[f][c].equipo === equipo) {
                    conteo++;
                } else break;
            }
            for (let paso = 1; paso < 4; paso++) {
                const f = fila - paso * df;
                const c = columna - paso * dc;
                if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && this.celdas[f][c].equipo === equipo) {
                    conteo++;
                } else break;
            }
            if (conteo >= 4) return true;
        }
        return false;
    }
}

// Clase Ficha
class Ficha {
    constructor(x, y, color, imagen) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.imagen = imagen;
        this.activa = false;
        this.fija = false;
        this.inicialX = x;
        this.inicialY = y;
    }

    dibujar() {
        const radioFicha = 22.5; // Nuevo radio de la ficha
    
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
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

let tablero=new Tablero();;
const fichasRojas = [];
const fichasAzules = [];

const imagenFicha = new Image();
const imagenAzul = new Image();
imagenFicha.src = "images.jpeg";
imagenAzul.src = "images2.jpeg";





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
    botonInicio.style.display = "none"; // Ocultamos el botón de inicio
    juego.style.border = "none";
    
});


// Manejar el clic en cada opción de modo de juego
document.querySelectorAll(".modo").forEach(boton => {
    boton.addEventListener("click", (e) => {
        f = e.target.getAttribute("data-filas");
        c = e.target.getAttribute("data-columnas");
        tablero.setFilasYColumnas(f,c);
        let cantFichas = (f * c ) /2;
        nombreJugadorRojo = document.getElementById('nombreJugadorRojo').value;
        nombreJugadorAzul = document.getElementById('nombreJugadorAzul').value;
        // Crear fichas
        for (let i = cantFichas; i > 0; i--) {
                fichasRojas.push(new Ficha(150, 100 + i * 15, "red", imagenFicha));
                fichasAzules.push(new Ficha(950, 100 + i * 15, "blue", imagenAzul));
        }
        
        opcionesModo.style.display = "none";
        contenedorJuego.style.display = "block";
        
        dibujar(); // Función que inicia el juego con el modo elegido
    });
});


let tiempoRestante = 5 * 60; // 5 minutos en segundos
let intervaloReloj;

function dibujarReloj() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    // Formatea el tiempo en dos dígitos
    const tiempoTexto = `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;

    // Limpia el área del reloj
    ctx.clearRect((canvas.width / 2) - 30, 0, 100, 20);
    // Dibuja el tiempo en el canvas
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(tiempoTexto, (canvas.width/2)-30, 20);
}

function iniciarReloj() {
    // Detiene el intervalo actual si ya está corriendo
    if (intervaloReloj) {
        clearInterval(intervaloReloj);
    }

    // Inicia un nuevo intervalo
    intervaloReloj = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            dibujarReloj();
        } else {
            clearInterval(intervaloReloj);
            console.log("¡Tiempo terminado!");
        }
    }, 1000); // Disminuye el tiempo cada segundo
}
iniciarReloj();

function dibujar(posObjetivo) {
    
    ctx.clearRect(0, 20, canvas.width, canvas.height);
    
    
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
            fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + 60 &&
            fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + 60
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
        fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + 60 &&
        fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + 60
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
            // Ajustar la posición de la ficha con las nuevas coordenadas y tamaños
            tablero.celdas[filaDisponible][columna].ocupar(turnoRojo ? "rojo" : "azul");
            // Asegúrate de usar 60 en lugar de 80 para que coincida con el nuevo tamaño de celda
            fichaSeleccionada.x = 380 + columna * 60 + 30; // Centro de la celda de 60x60
            fichaSeleccionada.y = 140 + filaDisponible * 60 + 30;
            fichaSeleccionada.fija = true;
            

            // Verificar si hay una victoria después de colocar la ficha
            if (tablero.verificarVictoria(filaDisponible, columna, turnoRojo ? "rojo" : "azul")) {
                if(turnoRojo){
                    document.getElementById("resultados").innerHTML = `<p class="victoria">¡Victoria para ${nombreJugadorRojo}!</p>`;
                }
                else{
                    document.getElementById("resultados").innerHTML = `<p class="victoria">¡Victoria para ${nombreJugadorAzul}!</p>`;
                }
                setTimeout(reiniciarJuego, 3000);
            } else {
                turnoRojo = !turnoRojo;
            }
        } else {
            fichaSeleccionada.resetPosicion(); // Si no hay lugar, la ficha vuelve a su posición inicial
        }
    } else {
        fichaSeleccionada.resetPosicion();
    }
    tablero.dibujar(null);
    fichaSeleccionada = null;
    dibujar();
});



function reiniciarJuego() {
    tablero.celdas.forEach(fila => fila.forEach(celda => celda.ocupar(null)));
    fichasRojas.forEach(ficha => ficha.resetPosicion());
    fichasAzules.forEach(ficha => ficha.resetPosicion());
    turnoRojo = true;
    document.getElementById("resultados").innerHTML = ``;
    dibujar();
}

imagenFicha.onload = imagenAzul.onload = dibujar;
