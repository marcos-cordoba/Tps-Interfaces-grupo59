const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fichasRojas = [];
const fichasAzules = [];
const posicionesObjetivo = [];
const filas = 5;
const columnas = 5;
const tablero = Array(filas).fill(null).map(() => Array(columnas).fill(null));

const imagenFicha = new Image();
const imagenAzul = new Image();
imagenFicha.src = "images.jpeg"; 
imagenAzul.src = "images2.jpeg"; 


let turnoRojo = true; // Turno inicial

// Crear 15 fichas rojas y 15 azules
for (let i = 0; i < 15; i++) {
    fichasRojas.push({ x: 50, y: 50 + i * 30, color: "red", activa: false, fija: false });
    fichasAzules.push({ x: 100, y: 50 + i * 30, color: "blue", activa: false, fija: false });
}

// Crear 8 posiciones objetivo para la primera fila de la matriz
for (let i = 0; i < columnas; i++) {
    posicionesObjetivo.push({ x: 200 + i * 80, y:30 });
}

let fichaSeleccionada = null;
let offsetX = 0;
let offsetY = 0;

// Dibujar el tablero y las fichas
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar posiciones objetivo
    posicionesObjetivo.forEach(pos => {
        ctx.strokeStyle = "black";
        ctx.strokeRect(pos.x, pos.y, 80, 80);
    });

    // Dibujar la matriz de 8x8
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            ctx.strokeStyle = "gray";
            ctx.strokeRect(200 + j * 80, 110 + i * 80, 80, 80);
        }
    }
    
    // Dibujar fichas rojas
    fichasRojas.forEach(ficha => {
        // Crear el clipping en forma de círculo
        ctx.save(); // Guardar el estado actual del contexto
        ctx.beginPath();
        ctx.arc(ficha.x, ficha.y, 30, 0, Math.PI * 2);
        ctx.clip(); // Definir la región de recorte

        // Dibujar la imagen dentro del clipping
        ctx.drawImage(imagenFicha, ficha.x - 30, ficha.y - 30, 60, 60);

        // Restaurar el contexto para dibujar fuera del clipping
        ctx.restore();

        // Dibujar el borde de la ficha
        ctx.beginPath();
        ctx.arc(ficha.x, ficha.y, 30, 0, Math.PI * 2);
        ctx.lineWidth = 2; // Ajustar el grosor del borde
        ctx.strokeStyle = ficha.color; // Usar el color para el borde
        ctx.stroke();
        
    });

    // Dibujar fichas azules
    fichasAzules.forEach(ficha => {
        // Crear el clipping en forma de círculo
        ctx.save(); // Guardar el estado actual del contexto
        ctx.beginPath();
        ctx.arc(ficha.x, ficha.y, 30, 0, Math.PI * 2);
        ctx.clip(); // Definir la región de recorte

        // Dibujar la imagen dentro del clipping
        ctx.drawImage(imagenAzul, ficha.x - 30, ficha.y - 30, 60, 60);

        // Restaurar el contexto para dibujar fuera del clipping
        ctx.restore();

        // Dibujar el borde de la ficha
        ctx.beginPath();
        ctx.arc(ficha.x, ficha.y, 30, 0, Math.PI * 2);
        ctx.lineWidth = 2; // Ajustar el grosor del borde
        ctx.strokeStyle = ficha.color; // Usar el color para el borde
        ctx.stroke();
        
    });
}

// Verificar victoria
function verificarVictoria(fila, columna, equipo) {
    const direcciones = [
        [0, 1],   // Horizontal
        [1, 0],   // Vertical
        [1, 1],   // Diagonal ascendente
        [1, -1]   // Diagonal descendente
    ];

    for (let [df, dc] of direcciones) {
        let conteo = 1;

        // Verificar en dirección positiva
        for (let paso = 1; paso < 4; paso++) {
            const f = fila + paso * df;
            const c = columna + paso * dc;
            if (f >= 0 && f < filas && c >= 0 && c < columnas && tablero[f][c] === equipo) {
                conteo++;
            } else {
                break;
            }
        }

        // Verificar en dirección negativa
        for (let paso = 1; paso < 4; paso++) {
            const f = fila - paso * df;
            const c = columna - paso * dc;
            if (f >= 0 && f < filas && c >= 0 && c < columnas && tablero[f][c] === equipo) {
                conteo++;
            } else {
                break;
            }
        }

        // Si se encontraron 4 en línea, se termina el juego
        if (conteo >= 4) {
            
            
            return true;
        }
    }
    return false;
}

// Manejo del mouse
canvas.addEventListener("mousedown", e => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const fichas = turnoRojo ? fichasRojas : fichasAzules;

    // Verificar si una ficha fue seleccionada
    fichaSeleccionada = fichas.find(ficha => 
        Math.hypot(ficha.x - mouseX, ficha.y - mouseY) < 15 && !ficha.fija
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
        dibujar();
    }
});
function reiniciarJuego() {
    // Reiniciar el estado del tablero
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = null;
        }
    }

    // Reiniciar la posición de las fichas
    fichasRojas.forEach((ficha, index) => {
        ficha.x = 50;
        ficha.y = 50 + index * 30;
        ficha.activa = false;
        ficha.fija=false;
    });

    fichasAzules.forEach((ficha, index) => {
        ficha.x = 100;
        ficha.y = 50 + index * 30;
        ficha.activa = false;
        ficha.fija=false;
    });

    // Reiniciar el turno y el estado del juego
    turnoRojo = true;
    juegoTerminado = false;
    fichaGanadora = null; // Resetear ficha ganadora
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = ``;
    dibujar();
}
canvas.addEventListener("mouseup", () => {
    if (!fichaSeleccionada) return;

    fichaSeleccionada.activa = false;

    // Verificar si se soltó en una posición objetivo
    const posObjetivo = posicionesObjetivo.find(pos =>
        fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + 80 &&
        fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + 80
    );

    if (posObjetivo) {
        // Calcular la columna de la posición objetivo
        const columna = posicionesObjetivo.indexOf(posObjetivo);
        let filaDisponible = -1;

        // Buscar la primera fila disponible desde abajo hacia arriba
        for (let i = filas - 1; i >= 0; i--) {
            if (!tablero[i][columna]) {
                filaDisponible = i;
                break;
            }
        }

        if (filaDisponible !== -1) {
            // Actualizar la posición de la ficha en la matriz
            tablero[filaDisponible][columna] = turnoRojo ? "rojo" : "azul";
            fichaSeleccionada.x = 200 + columna * 80 + 40;
            fichaSeleccionada.y = 110 + filaDisponible * 80 + 40;

         

            // Marcar la ficha como fija
            fichaSeleccionada.fija = true;
            
            // Verificar si hay victoria
            if (verificarVictoria(filaDisponible, columna, turnoRojo ? "rojo" : "azul")) {
                const resultados = document.getElementById("resultados");
                resultados.innerHTML += `<p>¡Victoria para ${turnoRojo ? "rojo" : "azul"}!</p>`;
                setTimeout(reiniciarJuego, 3000);
                // Deshabilitar eventos si hay victoria
                canvas.removeEventListener("mousedown", this);
                canvas.removeEventListener("mousemove", this);
                canvas.removeEventListener("mouseup", this);
            } else {
                turnoRojo = !turnoRojo;
                // Cambiar de turno
            }
        } else {
            // Volver la ficha a su lugar original si la columna está llena
            if (turnoRojo) {
                fichaSeleccionada.x = 50; // Para equipo rojo
                fichaSeleccionada.y = 50 + fichasRojas.indexOf(fichaSeleccionada) * 30;
            } else {
                fichaSeleccionada.x = 100; // Para equipo azul
                fichaSeleccionada.y = 50 + fichasAzules.indexOf(fichaSeleccionada) * 30;
            }
        }
    } else {
        // Volver la ficha a su lugar original si no se soltó en una posición objetivo
        if (turnoRojo) {
            fichaSeleccionada.x = 50; // Para equipo rojo
            fichaSeleccionada.y = 50 + fichasRojas.indexOf(fichaSeleccionada) * 30;
        } else {
            fichaSeleccionada.x = 100; // Para equipo azul
            fichaSeleccionada.y = 50 + fichasAzules.indexOf(fichaSeleccionada) * 30;
        }
    }

    fichaSeleccionada = null; // Limpiar la selección de ficha
    dibujar(); // Volver a dibujar el tablero
});
imagenAzul.onload = () => {
    dibujar();
    
};


imagenFicha.onload = () => {
    dibujar();
    
};
