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

//Captura datos
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const mensaje = document.getElementById("mensaje");

  const usuarios = [
    { email: "nicolperes@gmail.com", password: "123456" },
    { email: "Luisa@gmail.com", password: "luisa123" },
    { email: "valeryospina@gmail.com", password: "os1234" },
  ];

  //Validar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mensaje.textContent = "";//limpia mensajes anteriores

    const correoIngresado = email.value.trim();
    const passwordIngresada = password.value.trim();
    let errores = []; //Problemas, los guarda

    //Validaciones
    if (!correoIngresado.includes("@")) {
      errores.push("El correo electrónico no es válido");
    }

    const usuarioEncontrado = usuarios.find((u) => u.email === correoIngresado);

    if (!usuarioEncontrado) {
      errores.push("Correo no registrado");
    } else if (usuarioEncontrado.password !== passwordIngresada) {
      errores.push("Contraseña incorrecta");
    }

    //Resultado de validación
    if (errores.length > 0) {
      mensaje.textContent = errores.join(".");
    } else {
      window.location.href = "perfiles.html";
    }
  });
});
