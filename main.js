const notificacionHtml = document.querySelector('.notificacion'),
  estadoJuego = ["", "", "", "", "", "", "", "", ""],
  combinacionGanadora = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  mensajeGanador = () => `El jugador ${turno} ganó!`,
  mensajeEmpate = () => `El juego terminó en empate!`,
  turnoJugador = () => `Turno del jugador ${turno}`


let juegoActivo = true,
  turno = "O"



function main() {
  resultadoActual(turnoJugador())
  organizador()
}


function organizador() {
  document.querySelector('.contenedorJuego').addEventListener('click', celdaClick)
  document.querySelector('.reiniciar').addEventListener('click', botonReiniciar)
}



function resultadoActual(mensaje) {
  notificacionHtml.innerHTML = mensaje
}



function botonReiniciar() {
  juegoActivo = true
  turno = "X"
  reinicio()
  resultadoActual(turnoJugador())
  document.querySelectorAll('.celda').forEach(cell => cell.innerHTML = "")
}




function celdaClick(celdaClickeadaEvent) {
  const celdaClickeada = celdaClickeadaEvent.target
  if (celdaClickeada.classList.contains('celda')) {
    const celdaClickeadaIndex = Array.from(celdaClickeada.parentNode.children).indexOf(celdaClickeada)
    if (estadoJuego[celdaClickeadaIndex] !== '' || !juegoActivo) {
      return false
    }

    handleCellPlayed(celdaClickeada, celdaClickeadaIndex)
    handleResultValidation()
  }
}



function handleCellPlayed(celdaClickeada, celdaClickeadaIndex) {
  estadoJuego[celdaClickeadaIndex] = turno
  celdaClickeada.innerHTML = turno
}



function handleResultValidation() {
  let juegocombinacionGanadora = false
  for (let i = 0; i < combinacionGanadora.length; i++) { 
    const jugadaGanadora = combinacionGanadora[i] 
    let posicion1 = estadoJuego[jugadaGanadora[0]],
      posicion2 = estadoJuego[jugadaGanadora[1]],
      posicion3 = estadoJuego[jugadaGanadora[2]] 

    if (posicion1 === '' || posicion2 === '' || posicion3 === '') {
      continue;
    }
    if (posicion1 === posicion2 && posicion2 === posicion3) {
      juegocombinacionGanadora = true
      break
    }
  }

  if (juegocombinacionGanadora) {
    resultadoActual(mensajeGanador())
    juegoActivo = false
    return
  }

  let juegoEmpate = !estadoJuego.includes("")
  if (juegoEmpate) {
    resultadoActual(mensajeEmpate())
    juegoActivo = false
    return
  }

  cambioJugador()
}



function cambioJugador() {
  turno = turno === "X" ? "O" : "X"
  resultadoActual(turnoJugador())
}



function reinicio() {
  let i = estadoJuego.length
  while (i--) {
    estadoJuego[i] = ''
  }
}



main()