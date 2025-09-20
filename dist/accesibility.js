const btnContraste = document.getElementById("contraste");
const btnAumentar = document.getElementById("aumentarFuente");
const btnDisminuir = document.getElementById("disminuirFuente");

//Tamaño base 16x0.75= 12px
let fontSize = 75; 

//Contraste
btnContraste.addEventListener("click", () => {
  document.body.classList.toggle("contraste-activo"); //Añade o lo quita

  if (document.body.classList.contains("contraste-activo")) {//Si la añade guarda on/off
    localStorage.setItem("contraste", "on");
  } else {
    localStorage.setItem("contraste", "off");
  }
});

//Aumentar de fuente
btnAumentar.addEventListener("click", () => {
  if (fontSize < 140) { //16X1.4= 22.4px
    fontSize += 10;
    document.documentElement.style.fontSize = fontSize + "%";
    localStorage.setItem("fontSize", fontSize);
  }
});

//Disminuir fuente
btnDisminuir.addEventListener("click", () => {
  if (fontSize > 70) { //16X70=11.2PX
    fontSize -= 10;
    document.documentElement.style.fontSize = fontSize + "%";
    localStorage.setItem("fontSize", fontSize);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("contraste") === "on") {
    document.body.classList.add("contraste-activo"); //Añade la clase activa al body
  }

//Restablecer siempre al tamaño base
  fontSize = 75;
  document.documentElement.style.fontSize = fontSize + "%";
});

