// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acá vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:0
};

// Esta función va a chequear si el Rompecabezas está en la posición ganadora
function chequearSiGano(){

var contador = 0;

  for (var x = 0; x < grilla.length; x++) {
  var filas = grilla[x];

    for (var y = 0; y < filas.length; y++) {
      var posicion = grilla[x][y];

      contador++ ;

      if (grilla[x][y] !== contador) {
        return false;
      }

      }
    }
    return true;
  }



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  // Seleccionar el modal
  var modal = document.getElementById('modalGanaste');
  var span = document.getElementsByClassName("close")[0];
  var boton = document.querySelector("#boton-reiniciar");

      modal.style.display = "block";

  // Cuando el usuario hace click en <span> (x), cierra el modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // Cuando el usuario clickea el boton reiniciar, cierra el modal y reinicia el juego

  boton.addEventListener('click', function () {
    modal.style.display = "none";
    mezclarPiezas(50);
  });

  // Cuando el usuario hace click fuera del modal, lo cierra
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var tablero = document.querySelector("#juego");

    //INTERCAMBIO LÓGICO
    var posicion1 = grilla[fila1][columna1];
    var posicion2 = grilla[fila2][columna2];
    var aux = posicion1;

    grilla[fila1][columna1] = posicion2
    grilla[fila2][columna2] = aux;

    //INTERCAMBIO EN DOM
    //Llamando a los elementos

    var ficha1 = document.getElementById('pieza' + grilla[fila1][columna1]);
    var ficha2 = document.getElementById('pieza' + grilla[fila2][columna2]);

    // Clonando elementos
    var clon1 = ficha1.cloneNode(true);
    var clon2 = ficha2.cloneNode(true);

    //Reemplazando elementos por los clones
    tablero.replaceChild(clon1, ficha2);
    tablero.replaceChild(clon2, ficha1);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){

  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2) {
    return true;
  } else {
    return false;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento
function moverEnDireccion(direccion){
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;

  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces <= 0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()* direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

 // Funcion reiniciar juego. Muestra un modal con un texto, al hacer click en el modal éste se cierra y vuelve a mezclar las piezas.
function reiniciar () {
  var boton = document.querySelector("#reset-button");
  var modal = document.getElementById('modalAbandono');
  boton.addEventListener('click', function () {
    modal.style.display = "block";
  });

  modal.onclick = function() {
      modal.style.display = "none";
      mezclarPiezas(50);
  }
}


function iniciar(){
  mezclarPiezas(50);
  capturarTeclas();
  reiniciar();
}


iniciar();
