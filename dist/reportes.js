import { Header } from "./header.js";
import { initChatbot } from "./chatbot.js"; 

async function includeHTML(id, file) {
  const el = document.querySelector(id);//Busca en el dom el elemento con ese selector
  if (!el) return;
  const res = await fetch(file);//Descarga contenido
  el.innerHTML = await res.text();//Convierte respuesta en texto
}

async function init() {
  await includeHTML("#header", "header.html");
  new Header("nav");//Enlaza comportamientos del menu (abrir, cerrar)

  await includeHTML("#footer", "footer.html");

  await includeHTML("#chatbot", "chatbot.html");
  initChatbot(); //funcionalidad después de traer el HTML
}

init();


document.addEventListener("DOMContentLoaded", () => { //Se ejecutara cuando todo el html este listo
  //1. Leer URL
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");//Recupera valor del parametro

  if (tipo) { //Si existe asigna el valor
    const selectTipo = document.getElementById("tipo");
    if (selectTipo) {
      selectTipo.value = tipo;
    }
  }

  //2. Fecha automatica
  const hoy = new Date(); 
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0"); 
  const day = String(hoy.getDate()).padStart(2, "0");       
  const fechaActual = `${year}-${month}-${day}`;//Une todo el formato en yy-mm-dd

  const fechaInput = document.getElementById("fecha");
  if (fechaInput) {
    fechaInput.value = fechaActual;
  }
});

