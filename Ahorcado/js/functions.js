document.addEventListener("DOMContentLoaded", () => {
  let palabras = ["HOLA", "CARRO", "ARBOL", "NARANJA", "SANDIA", "ROJO", "GATO", "AZUL", "AMARILLO", "BASADO", "LORO", "AHORCADO", "HTML", "KINAL", "ESTRELLA"];
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  let adivinarElement = document.getElementById("adivinar");
  let horcar = document.getElementById("horca").getContext("2d");
  let palabraOculta = [];
  let letrasAdivinadas = [];
  let letrasIncorrectas = [];
  let intentosFallidos = 0;

  function actualizarPalabraOculta() {
    adivinarElement.innerHTML = "";
    for (let i = 0; i < palabra.length; i++) {
      let span = document.createElement("span");
      span.textContent = palabraOculta[i];
      if (letrasAdivinadas.includes(palabra[i])) {
      } else {
        span.style.color = letrasIncorrectas.includes(palabra[i]) ? "red" : "black";
      }
      adivinarElement.appendChild(span);
    }
  }

  function capturarTeclado(letra) {
    if (palabra.includes(letra)) {
      // La letra está en la palabra
      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
          palabraOculta[i] = letra;
          letrasAdivinadas.push(letra);
        }
      }
    } else {
      letrasIncorrectas.push(letra);
      intentosFallidos++;
      dibujarVidaHorca(intentosFallidos);
    }
    actualizarPalabraOculta();

    if (palabraOculta.join("") === palabra) {
      document.getElementById("mensaje").textContent = "¡Ganaste! La palabra correcta es: " + palabra;
      mostrarBotonReiniciar();
      letras.forEach((boton) => {
        boton.disabled = true;
      });
    }
    if (intentosFallidos >= 7) {
      document.getElementById("mensaje").textContent = "Perdiste. La palabra correcta era: " + palabra;
      mostrarBotonReiniciar();
      letras.forEach((boton) => {
        boton.disabled = true;
      });
    }
  }
  actualizarPalabraOculta();

  let letras = document.querySelectorAll(".btnTeclado");
  letras.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!letrasAdivinadas.includes(boton.innerText) && !letrasIncorrectas.includes(boton.innerText)) {
        capturarTeclado(boton.innerText);
        boton.disabled = true; // Bloquear el botón
        if (letrasIncorrectas.includes(boton.innerText)) {
          boton.style.backgroundColor = "red"; // Cambiar color del botón incorrecto
        } else {
          boton.style.backgroundColor = "green"; // Cambiar color del botón correcto
        }
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    const letra = event.key.toUpperCase();
    if (/^[A-Z]$/.test(letra)) {
      if (!letrasAdivinadas.includes(letra) && !letrasIncorrectas.includes(letra)) {
        capturarTeclado(letra);
        const boton = document.querySelector(`.btnTeclado:contains('${letra}')`);
        if (boton) {
          boton.disabled = true;
          if (letrasIncorrectas.includes(letra)) {
            boton.style.backgroundColor = "red"; // Cambiar color del botón incorrecto
          } else {
            boton.style.backgroundColor = "green"; // Cambiar color del botón correcto
          }
        }
      }
    }
  });

  function dibujarBaseHorca() {
    horcar.strokeStyle = "white";
    horcar.beginPath();
    horcar.moveTo(250, 240);
    horcar.lineTo(470, 240);
    horcar.moveTo(270, 240);
    horcar.lineTo(270, 5);
    horcar.moveTo(270, 10);
    horcar.lineTo(370, 10);
    horcar.moveTo(335, 10);
    horcar.lineTo(270, 70);
    horcar.moveTo(370, 5);
    horcar.lineTo(370, 30);
    horcar.lineWidth = 10;
    horcar.stroke();
    horcar.closePath();
  }
  dibujarBaseHorca();

  function dibujarVidaHorca(cont) {
    horcar.strokeStyle = "#FFF";
    switch (cont) {
      case 1:
        horcar.lineWidth = 4;
        horcar.beginPath();
        horcar.arc(370, 55, 25, 0, Math.PI * 2);
        break;
      case 2://cuerpo
        horcar.lineWidth = 4;
        horcar.moveTo(370, 78);
        horcar.lineTo(370, 150);
        break;
      case 3://brazo der
        horcar.lineWidth = 4;
        horcar.moveTo(370, 80);
        horcar.lineTo(385, 150);
        break;
      case 4://brazo iz
        horcar.lineWidth = 4;
        horcar.moveTo(370, 80);
        horcar.lineTo(355, 150);
        break;
      case 5://pierna der
        horcar.lineWidth = 4;
        horcar.moveTo(370, 150);
        horcar.lineTo(385, 220);
        break;
      case 6:
        horcar.lineWidth = 4;
        horcar.moveTo(370, 150);
        horcar.lineTo(355, 220);
        break;
      case 7:
        horcar.lineWidth = 4;
        // Ojo izquierdo
        horcar.moveTo(365, 50);
        horcar.lineTo(355, 60);
        horcar.moveTo(355, 50);
        horcar.lineTo(365, 60);
        // Ojo derecho
        horcar.moveTo(375, 50);
        horcar.lineTo(385, 60);
        horcar.moveTo(385, 50);
        horcar.lineTo(375, 60);
        //boca
        horcar.moveTo(365, 70);
        horcar.lineTo(370, 70);
        break;
    }
    horcar.stroke();
    horcar.closePath();
  }

});
