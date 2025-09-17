document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-voluntario"); //Busca el formulario por id

  if (form) {
    // 1.Capturar los datos
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      //2.Obtener datos
      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const mensaje = document.getElementById("mensaje").value;

      const telefono = "573043018954";

      //3. Mensaje
      const texto =
        `Quiero ser voluntario\n\n` +
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `${mensaje}`;

      //4.URL de whatsapp
      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
      window.open(url, "_blank");

      //5. Mensaje de confirmación
      document.getElementById("mensaje-confirmacion").style.display = "block";
      form.reset();
    });
  } else {
    console.error("No se encontró el formulario");
  }
});
