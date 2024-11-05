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
    vaciar() {
        this.imagenFondo=null;
        this.equipo=null;
       
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
        this.yInicial;
    }

    vaciarCeldas(){
        for (let i = 0; i < this.celdas.length; i++) {
            for (let j = 0; j < this.celdas[i].length; j++) {
                let celda = this.celdas[i][j];
                
                celda.vaciar();
            }
        }
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
        this.yInicial = (canvasHeight - altoTablero) / 2;
        
        this.celdas = Array.from({ length: filas }, (_, i) => 
            Array.from({ length: columnas }, (_, j) => 
                new Celda(i, j, xInicial + j * anchoCelda, this.yInicial + i * altoCelda, "images/juegos/starwars.svg")
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
            let y=0;
            switch (cantVictoria) {
                case '4':
                    y = pos.y + altoCelda+50;
                    break;
                case '5':
                    y = pos.y + altoCelda+20;
                    break;
                case '6':
                    y = pos.y + altoCelda+10;
                    break;
                case '7':
                    y = pos.y + altoCelda;
                   
                    
                
                    break;
            }
            
            
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
let cantVictoria =0;
let ladoCelda =40;
let cantFichas =0;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;



let tablero=new Tablero();;
let fichasRojas = [];
let fichasAzules = [];
let imagenBackground = new Image();


let imagenFicha = new Image();
let imagenAzul = new Image();



document.querySelectorAll(".ficha").forEach(boton => {
    boton.addEventListener("click", (e) => {
        let ficha = e.currentTarget.getAttribute("ficha"); // Usar e.currentTarget en lugar de e.target

        switch(ficha) {
            case '1':
               
            document.querySelectorAll(".fj2").forEach(aux => {
                if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "5"){ 
                    document.querySelectorAll(".fj1").forEach(aux => {
                        if (aux.classList.contains("seleccionado")) {
                            // Si la tiene, la elimina
                            aux.classList.remove("seleccionado");
                        }
                    });
                    boton.classList.toggle("seleccionado");
                    document.querySelectorAll(".fj2").forEach(aux2 => {
                        if(aux2.classList.contains("bloquear")){
                            aux2.classList.remove("bloquear");
                        }
                    });
                    if(!aux.classList.contains("bloquear")){
                        aux.classList.toggle("bloquear");
                    }
                    
                    imagenFicha.src = "images.jpeg";
                
                    
                } 
                
            });
            break;
            case '2':
                document.querySelectorAll(".fj2").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "6"){ 
                        document.querySelectorAll(".fj1").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj2").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        
                        imagenFicha.src = "images2.jpeg";
                    
                        
                    } 
                    
                });
                break;
            case '3':
                document.querySelectorAll(".fj2").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "7"){ 
                        document.querySelectorAll(".fj1").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj2").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        
                        imagenFicha.src = "image3.jfif";
                    
                        
                    } 
                    
                });
                break;
            case '4':
                document.querySelectorAll(".fj2").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "8"){ 
                        document.querySelectorAll(".fj1").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj2").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        
                        imagenFicha.src = "image4.jfif";
                    
                        
                    } 
                    
                });
                break;
        }
        //console.log("imagenAzul = "+imagenAzul.src + " imagenFicha = "+imagenFicha.src);
        document.querySelectorAll('.modo').forEach(modo => {
            if((modo.classList.contains("seleccionado"))&&(imagenAzul.src!="")&&(imagenFicha.src!="")){

                //console.log("entro a for con imagenAzul = "+imagenAzul.src + " imagenFicha = "+imagenFicha.src);
                if(!document.querySelector('.btn-empezar-partida').classList.contains("seleccionado")){
                    document.querySelector('.btn-empezar-partida').classList.toggle("seleccionado");
                }
            }
        });
    });
});
document.querySelectorAll(".fj2").forEach(boton => {
    boton.addEventListener("click", (e) => {
        let ficha = e.currentTarget.getAttribute("ficha"); // Usar e.currentTarget en lugar de e.target

        switch(ficha) {
            case '5':
               
                document.querySelectorAll(".fj1").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "1"){ 
                        document.querySelectorAll(".fj2").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj1").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                      
                        imagenAzul.src = "images.jpeg";
                    
                        
                    } 
                    
                });
                break; 
            case '6':
                document.querySelectorAll(".fj1").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "2"){ 
                        document.querySelectorAll(".fj2").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj1").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        
                        imagenAzul.src = "images2.jpeg";
                    
                        
                    } 
                    
                });
                break; 
                
            case '7':
                document.querySelectorAll(".fj1").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "3"){ 
                        document.querySelectorAll(".fj2").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj1").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        
                        imagenAzul.src = "image3.jfif";
                    
                        
                    } 
                    
                });
                break; 
            case '8':
                document.querySelectorAll(".fj1").forEach(aux => {
                    if (!aux.classList.contains("seleccionado")&&aux.getAttribute("ficha") === "4"){ 
                        document.querySelectorAll(".fj2").forEach(aux => {
                            if (aux.classList.contains("seleccionado")) {
                                // Si la tiene, la elimina
                                aux.classList.remove("seleccionado");
                            }});
                        boton.classList.toggle("seleccionado");
                        document.querySelectorAll(".fj1").forEach(aux2 => {
                            if(aux2.classList.contains("bloquear")){
                                aux2.classList.remove("bloquear");
                            }
                        });
                        if(!aux.classList.contains("bloquear")){
                            aux.classList.toggle("bloquear");
                        }
                        imagenAzul.src = "image4.jfif";
                    
                        
                    } 
                    
                });
                break; 
          
        }

        //console.log("imagenAzul = "+imagenAzul.src + " imagenFicha = "+imagenFicha.src);
        document.querySelectorAll('.modo').forEach(modo => {
            if((modo.classList.contains("seleccionado"))&&(imagenAzul.src!="")&&(imagenFicha.src!="")){

                //console.log("entro a for con imagenAzul = "+imagenAzul.src + " imagenFicha = "+imagenFicha.src);
                if(!document.querySelector('.btn-empezar-partida').classList.contains("seleccionado")){
                    document.querySelector('.btn-empezar-partida').classList.toggle("seleccionado");
                }
            }
        });
    });
});


imagenBackground.src = "fondojuego3.webp";





let turnoRojo = true;
let fichaSeleccionada = null;
let offsetX = 0, offsetY = 0;


const botonInicio = document.getElementById("btn-jugar-juego");
const contenedorJuego = document.getElementById("contenedorJuego");
const juego = document.querySelector(".juego");
const opcionesModo = document.getElementById("opciones-modo");



let nombreJugadorRojo = null;
let nombreJugadorAzul = null;
let botonJugar=document.getElementById("btn-jugar");
botonJugar.addEventListener("click", () => {
    
    if((imagenAzul.src) && (imagenFicha.src)){
        console.log("entra");
        opcionesModo.style.display = "none";
        contenedorJuego.style.display = "block";
        iniciarReloj();
        dibujar(); // Función que inicia el juego con el modo elegido
    }
    
});

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

        document.querySelectorAll('.modo').forEach(aux => {
            
            if(aux.classList.contains("seleccionado")){

                aux.classList.remove("seleccionado");
            }
        })
        
        boton.classList.toggle('seleccionado');

        juego.style.display = "block";
        f = e.target.getAttribute("data-filas");
        c = e.target.getAttribute("data-columnas");
        cantVictoria = e.target.getAttribute("data-cantidad-victoria");
        tablero.setVictoria(cantVictoria)
        tablero.setFilasYColumnas(f,c);
        cantFichas = (f * c ) /2;
        nombreJugadorRojo = document.getElementById('nombreJugadorRojo').value;
        nombreJugadorAzul = document.getElementById('nombreJugadorAzul').value;
        // Crear fichas
        
        for (let i = cantFichas; i > 0; i--) {
                fichasRojas.push(new Ficha(150, 100 + i * 8, "red", imagenFicha)); 
                fichasAzules.push(new Ficha(950, 100 + i * 8, "blue", imagenAzul));
        }

        
        if((imagenAzul.src!="")&&(imagenFicha.src)!=""){
            
            if(!document.querySelector('.btn-empezar-partida').classList.contains("seleccionado")){
                document.querySelector('.btn-empezar-partida').classList.toggle("seleccionado");
            }
        };

        // document.querySelectorAll('.modo').forEach(aux => {
        //     console.log("entro a for aux 2");
        //     if(aux.classList.contains("seleccionado")&&(!imagenAzul.src==null)&&(!imagenFicha.src==null)){
        //         console.log("entro a aux for 2");
        //         document.querySelector('.btn-empezar-partida').classList.toggle("seleccionado");
        //     }
        // });
        
        
    });
});

canvas.addEventListener("click", function(e) {
    // Obtener la posición del clic
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verificar si el clic está dentro del área del botón
    if (x >= xBoton && x <= 550 && y >= yBoton && y <= 45) {
        volverAlMenu();
        tiempoRestante=300;
        turnoRojo = true; 
         fichasRojas = [];
         fichasAzules = [];
        
        cantFichas=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tablero.setFilasYColumnas(f,c);
        dibujar();
        imagenFicha = new Image();
        imagenAzul = new Image();
        document.querySelectorAll(".ficha").forEach(aux => {
            if (aux.classList.contains("seleccionado")) {
                // Si la tiene, la elimina
                aux.classList.remove("seleccionado");
            }
        });
        document.querySelectorAll(".modo").forEach(aux => {
            if (aux.classList.contains("seleccionado")) {
                // Si la tiene, la elimina
                aux.classList.remove("seleccionado");
            }
        });

        
    }
    
});
canvas.addEventListener("click", function(e) {
    // Obtener la posición del clic
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verificar si el clic está dentro del área del botón
    if(x >= 600 && x <= 750 && y >= yBoton && y <= 45){
        
        tiempoRestante=300;
        turnoRojo = true; 
        fichasRojas = [];
        fichasAzules = [];
        // Crear fichas
        for (let i = cantFichas; i > 0; i--) {
            fichasRojas.push(new Ficha(150, 100 + i * 8, "red", imagenFicha)); 
            fichasAzules.push(new Ficha(950, 100 + i * 8, "blue", imagenAzul));
        }
        tablero.setFilasYColumnas(f,c);
        dibujar();
    } 
}  );

function volverAlMenu() {
    opcionesModo.style.display = "block";
        contenedorJuego.style.display = "none";
}
function vaciarTablero() {
    
    
    

    
}

let tiempoRestante = 5 * 60; 
let intervaloReloj;

function dibujarReloj() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;

   
    let tiempoTexto = `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;

    ctx.clearRect((canvas.width / 2) -30, 6, 61, 21);
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(tiempoTexto, (canvas.width/2), 20);
}

let relojCorriendo = false;

function iniciarReloj() {
    if (!relojCorriendo) {
        relojCorriendo = true;

        intervaloReloj = setInterval(() => {
            if (tiempoRestante > 0) {
                dibujarReloj();
                tiempoRestante--;
            } else {
                document.getElementById("resultados").innerHTML = `<div class="contenedor-victoria" style="opacity: 1;"><p class="victoria">Se acabo el tiempo:¡Empate!</p></div>`;
                clearInterval(intervaloReloj);
                setTimeout(reiniciarJuego, 4000);
            }
        }, 1000); 
    }
}

function detenerReloj() {
    if (intervaloReloj) {
        clearInterval(intervaloReloj);
        relojCorriendo = false; 
    }
}

let xBoton=350;
let yBoton =0;

function dibujarBoton(ctx, x, y, ancho, alto, texto) {
    // Dibuja un fondo con esquinas redondeadas
    ctx.beginPath();
    ctx.moveTo(x + 10, y); // Esquina superior izquierda redondeada
    ctx.lineTo(x + ancho - 10, y);
    ctx.quadraticCurveTo(x + ancho, y, x + ancho, y + 10); // Esquina superior derecha redondeada
    ctx.lineTo(x + ancho, y + alto - 10);
    ctx.quadraticCurveTo(x + ancho, y + alto, x + ancho - 10, y + alto); // Esquina inferior derecha redondeada
    ctx.lineTo(x + 10, y + alto);
    ctx.quadraticCurveTo(x, y + alto, x, y + alto - 10); // Esquina inferior izquierda redondeada
    ctx.lineTo(x, y + 10);
    ctx.quadraticCurveTo(x, y, x + 10, y); // Cierre de la forma

    // Agrega un degradado al fondo
    let gradiente = ctx.createLinearGradient(x, y, x, y + alto);
    gradiente.addColorStop(0, '#FF00ff'); // Azul más claro
    gradiente.addColorStop(1, '#006bb3'); // Azul más oscuro
    ctx.fillStyle = gradiente;
    ctx.fill();
    
    // Agrega sombra para dar un efecto de elevación
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Dibuja el texto
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texto, x + ancho / 2, y + alto / 2);
    
    // Resetea la sombra para evitar que afecte otros elementos
    ctx.shadowColor = 'transparent';
}
function dibujarBotonVolver() {
    
    dibujarBoton(ctx, xBoton, yBoton, 150, 40, "Menu principal");
    dibujarBoton(ctx, 600, yBoton, 150, 40, "Reiniciar juego");

}

function dibujar(posObjetivo) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(imagenBackground, 0, 0, canvas.width, canvas.height);
    dibujarReloj();
    
    dibujarBotonVolver();
    
    // Mostrar nombres
    ctx.fillStyle = "white"; // Color del texto
    ctx.font = "20px Arial"; // Fuente y tamaño
    ctx.fillText(`Jugador: ${nombreJugadorRojo}`, canvas.width - 950, 75);
    ctx.fillText(`Jugador: ${nombreJugadorAzul}`, canvas.width - 150, 75);
    
    if(turnoRojo){
        // Mostrar nombres
        ctx.fillStyle = "white"; // Color del texto
        ctx.font = "20px Arial"; // Fuente y tamaño
        ctx.fillText(`Turno: ${nombreJugadorRojo}`, (canvas.width/2), 50);
    }
    else{
      // Mostrar nombres
        ctx.fillStyle = "white"; // Color del texto
        ctx.font = "20px Arial"; // Fuente y tamaño
        ctx.fillText(`Turno: ${nombreJugadorAzul}`, (canvas.width/2), 50);  
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

   
    const posObjetivo = tablero.posicionesObjetivo.find(pos =>
        fichaSeleccionada.x > pos.x && fichaSeleccionada.x < pos.x + ladoCelda &&
        fichaSeleccionada.y > pos.y && fichaSeleccionada.y < pos.y + ladoCelda
    );

    if (posObjetivo) {
        const columna = tablero.posicionesObjetivo.indexOf(posObjetivo);
        let filaDisponible = -1;

        
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
    let yInicial = tablero.yInicial;

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
                // canvas.style.opacity = "0.33";    
                document.getElementById("resultados").innerHTML = `<div class="contenedor-victoria" style="opacity: 1;"><p class="victoria">¡Victoria para ${turnoRojo ? nombreJugadorRojo : nombreJugadorAzul}!</p></div>`;
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
    canvas.style.opacity = "1";
    // Oculta el contenedor del juego
    contenedorJuego.style.display = "none";
    // Muestra las opciones de modo
    opcionesModo.style.display = "block";
}


imagenFicha.onload = imagenAzul.onload = imagenBackground.onload = dibujar;
