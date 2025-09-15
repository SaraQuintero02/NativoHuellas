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

//Editar perfiles
const btnEditar = document.getElementById("editarPerfil");
const editor = document.getElementById("editorPerfil");
const cerrar = document.querySelector(".cerrar");

btnEditar.addEventListener("click", () => {
  editor.style.display = "block"; //Al dar click cambiara estilo none => block

  //Rellena datos en inputs que ya estan
  document.getElementById("nombreInput").value = document.getElementById("nombre").innerText;
  document.getElementById("correoInput").value = document.getElementById("correo").innerText;
  document.getElementById("telefonoInput").value = document.getElementById("telefono").innerText;
  document.getElementById("tipoInput").value = document.getElementById("tipo_usuario").innerText.toLowerCase();
});

//Cerrar el edito al dar clik en X
cerrar.addEventListener("click", () => {
  editor.style.display = "none";
});

//Guardar cambios
document.getElementById("formEditar").addEventListener("submit", (e) => {
  e.preventDefault();

  //ActualizaR datos en pantalla
  document.getElementById("nombre").innerText = document.getElementById("nombreInput").value;
  document.getElementById("correo").innerText = document.getElementById("correoInput").value;
  document.getElementById("telefono").innerText = document.getElementById("telefonoInput").value;
  document.getElementById("tipo_usuario").innerText =
    document.getElementById("tipoInput").value.charAt(0).toUpperCase() +
    document.getElementById("tipoInput").value.slice(1);

  editor.style.display = "none";
});
