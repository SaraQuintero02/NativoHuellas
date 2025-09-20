export function initChatbot() {
  const btn = document.getElementById("chatbotButton");//Botón
  const popup = document.getElementById("chatbotPopup");//Caja de mensaje
  const closePopup = document.getElementById("closePopup");//(x)

  if (!btn || !popup || !closePopup) return; //Si no existe la funcion termina

  //Abrir y cerrar sobre el icono
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = popup.style.display === "flex" ? "none" : "flex"; //Alterna flex y none
  });

  //Cerrar al hacer click (x)
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  //Cerrar al hacer click en cualquier parte
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.style.display = "none";
    }
  });

  //Botón para subir automaticamente
  const scrollButton = document.getElementById("scrollButton");
  if (scrollButton) {
    //Mostrar y ocultar boton segun el scroll (desplazamiento)
    window.addEventListener("scroll", () => { //Escucha el evento
      if (window.scrollY > 400) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    });

    //Al presionar el botón se hace el desplazamiento 
    scrollButton.addEventListener("click", (e) => { 
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
