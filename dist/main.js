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
  await includeHTML("#header", "/page/header.html");
  new Header("nav");//Enlaza comportamientos del menu (abrir, cerrar)

  await includeHTML("#footer", "/page/footer.html");

  await includeHTML("#chatbot", "/page/chatbot.html");
  initChatbot(); //funcionalidad después de traer el HTML

  await includeHTML("#migapan", "/page/migapan.html");
  initBreadcrumb();
}

init();


