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


document.addEventListener("DOMContentLoaded", () => {
  // 1. Asignar tipo desde URL si existe
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");
  if (tipo) {
    const selectTipo = document.getElementById("tipo");
    if (selectTipo) {
      selectTipo.value = tipo;
    }
  }

  // 2. Asignar fecha actual
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0");
  const day = String(hoy.getDate()).padStart(2, "0");
  const fechaActual = `${year}-${month}-${day}`;
  const fechaInput = document.getElementById("fecha");
  if (fechaInput) {
    fechaInput.value = fechaActual;
  }

  // 3. Mostrar mensajes en el DOM
  const mensajeDiv = document.getElementById("mensaje");

  function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = "mensaje " + tipo;
  }

  // 4. Enviar formulario
  const form = document.querySelector(".form-reporte form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturar datos del formulario
    const tipoTexto = document.getElementById("tipo").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;

    // Asignar ID de tipoReporte según texto
    let tipoReporteId;
    switch (tipoTexto) {
      case "abandonado":
        tipoReporteId = 1;
        break;
      case "maltratado":
        tipoReporteId = 2;
        break;
      case "encerrado":
        tipoReporteId = 3;
        break;
      default:
        tipoReporteId = 1;
    }

    // Simular ID de usuario (deberías obtenerlo de sesión o login)
    const usuarioId = 1;

    // Crear objeto reporte
    const reporte = {
      reporDescripcion: descripcion,
      reporFecha: fecha,
      reporUbicacion: ubicacion,
      tipoReporte: {
        tipreporId: tipoReporteId
      },
      usuario: {
        usuId: usuarioId
      }
    };

    // Enviar al backend
    try {
      const response = await fetch("http://localhost:8080/reportes/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reporte)
      });

      if (response.ok) {
        const data = await response.json();
        mostrarMensaje("Reporte enviado con éxito. ID: " + data.reporId, "exito");
        form.reset();
        fechaInput.value = fechaActual;
      } else {
        const error = await response.text();
        mostrarMensaje("Error al enviar el reporte: " + error, "error");
      }
    } catch (err) {
      console.error("Error de red:", err);
      mostrarMensaje("No se pudo conectar con el servidor.", "error");
    }
  });
});



