document.addEventListener("DOMContentLoaded", () => {
  const gridAdoptables = document.querySelector(".grid-adoptables");
  const modal = document.getElementById("modal");
  const cerrarBtn = document.getElementById("cerrar");
  const nombreModal = document.getElementById("nombre");
  const historiaModal = document.getElementById("historia");

  function abrirModal(nombre, historia) {
    nombreModal.textContent = nombre;
    historiaModal.textContent = historia;
    modal.classList.remove("oculto");
    modal.setAttribute("aria-hidden", "false");
  }

  cerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
    modal.setAttribute("aria-hidden", "true");
  });

  fetch("http://localhost:8080/animales/animal")
    .then((response) => response.json())
    .then((data) => {
      gridAdoptables.innerHTML = "";

      data.forEach((animal) => {
        //Creación de bloque por animal
        const article = document.createElement("article");
        article.classList.add("adopt");
        article.dataset.id = animal.aniId;
        article.dataset.nombre = animal.aniNombre;
        article.dataset.edad = `${animal.aniEdad} ${
          animal.aniEdad === 1 ? "año" : "años"
        }`;
        article.dataset.historia = animal.aniDescripcion;

        const h3 = document.createElement("h3");
        h3.textContent = `${animal.aniNombre} | ${animal.aniEdad} ${
          animal.aniEdad === 1 ? "año" : "años"
        }`;

        const button = document.createElement("button");
        button.classList.add("info-btn");
        button.setAttribute("aria-label", `Historia ${animal.aniNombre}`);
        button.textContent = "...";
        button.addEventListener("click", () => {
          abrirModal(animal.aniNombre, animal.aniDescripcion);
        });

        //Crear imagen si existe
        if (animal.aniFoto) {
          const img = document.createElement("img");
          img.src = `data:image/jpeg;base64,${animal.aniFoto}`;
          img.alt = `Foto de ${animal.aniNombre}`;
          img.style.width = "100%";
          img.style.borderRadius = "8px";
          article.appendChild(img);
        }

        article.appendChild(h3);
        article.appendChild(button);
        gridAdoptables.appendChild(article);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los animales:", error);
      gridAdoptables.innerHTML = "<p>Error al cargar los animales.</p>";
    });
});
