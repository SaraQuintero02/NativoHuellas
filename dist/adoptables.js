document.addEventListener('DOMContentLoaded', () => {
  console.log('adoptables.js iniciado');

  const historias = {
    Polito: "Rescatado a principios de agosto, se encuentra vacunado, pendiente por esterilización. Polito es muy jugueton, pero necesita mucho amor.",
    Asia: "Encontrada a mediados de julio, pendiente por vacunas y esterilización, es bastante agresiva y nerviosa.",
    Pedro: "Pedro llego el 3 de septiembre, ya se encuentra vacunado pendiente por esterilización, es muy nervioso con otros animales.",
    Rem: "Rem fue encontrada hace muy poco, está esterilizada y vacunada, es muy seria pero con el debido trato su corazón puede ablandarse.",
    Coco: "Coco fue encontrado hace 4 meses, se encuentra esterilizado y con todas las vacunas, es un perro entrenado y en busca de una familia que lo pueda acoger",
    Maya: "Maya fue recibida desde recien nacida, tuvo un nacimiento dificil pero ahorita se encuentra sana y con todas sus vacunas, es una gatita muy juguetona."
  };

  // Referencias
  const grid = document.querySelector('.grid-adoptables');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('nombre'); 
  const modalHistoria = document.getElementById('historia');
  const closeBtn = document.getElementById('cerrar');
  const verMasLink = document.querySelector('#adoptables a, #ver-mas, a.ver-mas');

  if (!grid) {
    console.error('No se encontró el contenedor .grid-adoptables. Revisa tu HTML.');
    return;
  }
  if (!modal || !modalTitle || !modalHistoria || !closeBtn) {
    console.warn('Algún elemento del modal no existe (modal/nombre/historia/cerrar). Aun así el resto funcionará si están presentes.');
  }

  // Abrir / cerrar modal
  function abrirModal(nombre) {
    modalTitle && (modalTitle.textContent = nombre || 'Sin nombre');
    modalHistoria && (modalHistoria.textContent = historias[nombre] || 'Historia no disponible.');
    modal && modal.classList.remove('oculto');
    modal && modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    console.log('Modal abierto para:', nombre);
  }
  function cerrarModal() {
    if (modal) {
      modal.classList.add('oculto');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
    console.log('Modal cerrado');
  }

  // Cerrar con botón / overlay / ESC
  if (closeBtn) closeBtn.addEventListener('click', cerrarModal);
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

  // Añadir botón "Ver historia" a tarjetas estáticas que no lo tengan (compatibilidad)
  document.querySelectorAll('.adopt').forEach(card => {
    const hasBtn = card.querySelector('.btn-historia, .info-btn, .ver-historia');
    if (!hasBtn) {
      const btn = document.createElement('button');
      btn.className = 'btn-historia';
      btn.type = 'button';
      btn.textContent = 'Ver historia';
      // opcional: estilalo con CSS .btn-historia
      card.appendChild(btn);
    }
    // Si la tarjeta tiene data-nombre, úsala; si no, extrae del H3
    if (!card.dataset.nombre) {
      const h3 = card.querySelector('h3');
      if (h3) {
        const nombre = h3.innerText.split('|')[0].trim();
        card.dataset.nombre = nombre;
      }
    }
  });

  // Delegation: controla clicks en la grid (tanto botones como la tarjeta en general)
  grid.addEventListener('click', (e) => {
    // Si clic en un botón de historia (puede ser .btn-historia, .info-btn o .ver-historia)
    const btn = e.target.closest('.btn-historia, .info-btn, .ver-historia');
    if (btn) {
      e.stopPropagation();
      const card = btn.closest('.adopt');
      const nombre = card?.dataset?.nombre || card?.querySelector('h3')?.innerText.split('|')[0].trim();
      abrirModal(nombre);
      return;
    }

    // Si clic en la tarjeta (img, h3, etc.) también abrimos modal (opcional)
    const article = e.target.closest('.adopt');
    if (article) {
      const nombre = article.dataset.nombre || article.querySelector('h3')?.innerText.split('|')[0].trim();
      abrirModal(nombre);
    }
  });

  // Ver más animales
verMasLink.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Ver más clickeado - agregando nuevos adoptables');

  const nuevos = [
    { nombre: "Rem", edad: "1 año", img: "../assets/img/rem.jpg" },
    { nombre: "Coco", edad: "3 años", img: "../assets/img/coco.jpg" },
    { nombre: "Maya", edad: "1 mes", img: "../assets/img/maya.jpg" }
  ];

  nuevos.forEach(a => {
    const card = document.createElement('article');
    card.className = 'adopt';
    card.dataset.nombre = a.nombre;
    card.innerHTML = `
      <img src="${a.img}" alt="${a.nombre}">
      <h3>${a.nombre} | ${a.edad}</h3>
      <button class="info-btn" type="button">...</button>
    `;
    grid.appendChild(card);
  });

  // Ocultar el enlace después de usarse
  verMasLink.style.display = 'none';
});
})