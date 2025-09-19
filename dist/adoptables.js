// // Datos de los animales
// const animales = {
//   polito: {
//     nombre: "Polito",
//     historia: "Vacunado, desparasitado y esterilizado. Le encanta jugar y es muy sociable."
//   },
//   asia: {
//     nombre: "Asia",
//     historia: "Gatita rescatada, con todas las vacunas al día. Muy tierna y tranquila."
//   },
//   pedro: {
//     nombre: "Pedro",
//     historia: "Cachorro con dos meses, aún en proceso de vacunación. Muy activo y juguetón."
//   }
// };

// // Referencias al DOM
// const modal = document.getElementById("modal");
// const cerrarBtn = document.getElementById("cerrar");
// const nombreAnimal = document.getElementById("nombre");
// const historiaAnimal = document.getElementById("historia");
// const verMasBtn = document.getElementById("ver-mas");
// const grid = document.querySelector(".grid-adoptables");

// // Mostrar historia médica al hacer click en un animal
// document.querySelectorAll(".adopt").forEach(card => {
//   card.addEventListener("click", () => {
//     const id = card.dataset.id;
//     nombreAnimal.textContent = animales[id].nombre;
//     historiaAnimal.textContent = animales[id].historia;
//     modal.classList.remove("oculto");
//   });
// });

// // Cerrar modal
// cerrarBtn.addEventListener("click", () => {
//   modal.classList.add("oculto");
// });

// // Ver más → cargar nuevos animales
// verMasBtn.addEventListener("click", (e) => {
//   e.preventDefault();
  
//   const nuevos = [
//     {id: "luna", nombre: "Luna", edad: "3 años", img: "../assets/img/luna.jpg", historia: "Perrita tranquila y esterilizada."},
//     {id: "milo", nombre: "Milo", edad: "8 meses", img: "../assets/img/milo.jpg", historia: "Gatito juguetón y cariñoso."}
//   ];
  
//   nuevos.forEach(animal => {
//     animales[animal.id] = {nombre: animal.nombre, historia: animal.historia};
    
//     const card = document.createElement("article");
//     card.classList.add("adopt");
//     card.dataset.id = animal.id;
//     card.innerHTML = `
//       <img src="${animal.img}" alt="${animal.nombre}">
//       <h3>${animal.nombre} | ${animal.edad}</h3>
//     `;
//     grid.appendChild(card);

//     // Reagregar evento para que funcione también en los nuevos
//     card.addEventListener("click", () => {
//       nombreAnimal.textContent = animales[animal.id].nombre;
//       historiaAnimal.textContent = animales[animal.id].historia;
//       modal.classList.remove("oculto");
//     });
//   });
// });