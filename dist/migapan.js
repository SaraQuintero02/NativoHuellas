export function initBreadcrumb() {
  const breadcrumbNav = document.querySelector("#migapan nav.breadcrumb");
  if (!breadcrumbNav) return;

  //Se obtiene el nombre del archivo index
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf("/") + 1) || "index.html";

  // Define títulos según archivo
  const titles = {
    "index.html": "Inicio",
    "nosotros.html": "Nosotros",
    "adoptables.html": "Adoptables",
    "contacto.html": "Contáctanos",
    "donar.html": "Donar",
    "login.html":"Inicio de sesión",
    "misionVision.html":"Misión y Visión",
    "noticias.html":"Noticias",
    "perfiles.html":"Perfil",
    "politicaPrivacidad.html":"Politica de privacidad",
    "procesoadopcion":"Proceso de adopción",
    "registro.html":"Registro",
    "reportes.html":"Reportes",
    "voluntarios.html":"Voluntariado",
  };

  //Busca en el objeto el nombre de la pagina actual
  const currentTitle = titles[file] || "Página actual";

  //Cración de array
  const miga = [
    { name: "Inicio", url: "index.html" },
    { name: currentTitle, url: null }
  ];

  //Buscar ol dentro del navegador
  const ol = breadcrumbNav.querySelector("ol");
  ol.innerHTML = miga
    .map((c, i) =>
      c.url && i !== miga.length - 1 
        //Operador ternario
        ? `<li><a href="${c.url}">${c.name}</a></li>`//Hace al primer objeto clicable
        : `<li aria-current="page">${c.name}</li>` //Pagina actual
    )
    .join("");
}
