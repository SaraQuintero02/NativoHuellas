import { Header } from "./header.js";

async function includeHTML(id, file) {
  const el = document.querySelector(id);//Busca en el dom el elemento con ese selector
  if (!el) return;
  const res = await fetch(file);//Descarga contenido
  el.innerHTML = await res.text();//Convierte respuesta en texto
}

async function init() {
  await includeHTML("#header", "header.html");
  new Header("nav"); //Enlaza comportamientos del menu (abrir, cerrar)
  await includeHTML("#footer", "footer.html");
}
init();