document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Capturar valores del formulario
        const usuario = {
            usuNombre: document.getElementById("nombre").value.trim(),
            usuEmail: document.getElementById("email").value.trim(),
            usuContraseña: document.getElementById("password").value.trim(),
            usuTelefono: document.getElementById("telefono").value.trim() === ""
                ? 0
                : parseInt(document.getElementById("telefono").value.trim(), 10),
            usu_fechaRegistro: document.getElementById("fecha").value
        };


        try {
            const response = await fetch("http://localhost:8080/usuario/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Error en el registro (" + response.status + "): " + errorText);
            }

            const data = await response.json();

            mensaje.textContent = "Usuario registrado con ID: " + data.usuId;
            mensaje.style.color = "green";
            form.reset();
        } catch (error) {
            console.error("Detalle del error:", error);
            mensaje.textContent = "No se pudo registrar el usuario.";
            mensaje.style.color = "red";
        }
    });
});
