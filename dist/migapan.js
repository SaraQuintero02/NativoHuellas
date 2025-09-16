document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.getElementById("migapan");

  //Migas de pan
  const crumbs = [
    { name: "Inicio", url: "index.htm" },
    { name: "Página actual", url: null } //Null página actual
  ];
  breadcrumb.innerHTML = `
    <ol>
      ${crumbs
        .map((c, i) => {
          if (c.url && i !== crumbs.length - 1) {
            return `<li><a href="${c.url}">${c.name}</a></li>`;
          } else {
            return `<li aria-current="page">${c.name}</li>`;
          }
        })
        .join("")}
    </ol>
  `;
});
