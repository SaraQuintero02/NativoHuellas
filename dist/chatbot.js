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
}


