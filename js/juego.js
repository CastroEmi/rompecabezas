// Representación de la grilla. Cada nro representa a una pieza.
// El 7 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acá vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas está ordenado en la posición ganadora;
function chequearSiGano(){
  var piezas = document.getElementsByClassName("pieza");

  for (var x = 0; x < grilla.length; x++) {
  var filas = grilla[x];

    for (var y = 0; y < filas.length; y++) {
      var piezaResultado = piezas[filas[y] - 1].id;

      if (piezaResultado === 'pieza' + filas[y]) {
        console.log("Ganaste!");
        return true;
      } else {
        return false;
      }
    }
  }
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("¡Felicitaciones! Ganaste :)")
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var tablero = document.querySelector("#juego");

    //INTERCAMBIO LÓGICO
    var posicion1 = grilla[fila1][columna1];
    var posicion2 = grilla[fila2][columna2];
    grilla[fila1][columna1] = posicion2;
    grilla[fila2][columna2] = posicion1;

    //INTERCAMBIO EN DOM
    //Llamando a los elementos
    var ficha1 = document.getElementById('pieza' + posicion1);
    var ficha2 = document.getElementById('pieza' + posicion2);
    // var imagen1 = document.getElementById('imagen' + posicion1);
    // var imagen2 = document.getElementById('imagen' + posicion2);

    //Obteniendo el padre de las imagenes
    // var imgPadre1 = imagen1.parentNode;
    // var imgPadre2 = imagen2.parentNode;

    // Clonando elementos
    var clon1 = ficha1.cloneNode();
    var clon2 = ficha2.cloneNode();
    // var clonImg1 = imagen1.cloneNode();
    // var clonImg2 = imagen2.cloneNode();

    //Reemplazando elementos por los clones
    tablero.replaceChild(clon1, ficha2);
    tablero.replaceChild(clon2, ficha1);
    // imgPadre2.replaceChild(clonImg1, imagen2);
    // imgPadre1.replaceChild(clonImg2, imagen1);
  }


// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia = posicionVacia[nuevaFila][nuevaColumna];
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  for (var x = 0; x < grilla.length; x++) {
  var filas = grilla[x];

    for (var y = 0; y < filas.length; y++) {
      var posicion = grilla[x][y]
      if (fila <= x && columna <= y) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
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
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
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

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
