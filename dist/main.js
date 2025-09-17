import { Header } from "./header.js";
import { initChatbot } from "./chatbot.js"; 
import { initBreadcrumb } from "./migapan.js";

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

  await includeHTML("#migapan", "migapan.html");
  initBreadcrumb();
}

init();


