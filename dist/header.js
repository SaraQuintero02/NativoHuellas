export class Header {
  //Constructor
  constructor(navSelector) {
    this.nav = document.querySelector(navSelector); //Busca en el Dom el elemento que coincida con el selector (nav)
    this.openMenu = null;

    //Inicializa evento si (nav) esta abierto
    if (this.nav) {
      this.initEvents();
    }
  }

  initEvents() {
    //1. Metodo al hacer click en los submenus
    this.nav.querySelectorAll("[data-menu]").forEach((menuLink) => {
      menuLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        //Obtiene valor y llama a abrirCerrarMenu
        const menu = menuLink.getAttribute("data-menu");
        this.abrirCerrarMenu(menu);
      });
    });

    //2. Metodo para cerrar al hacer click
    document.addEventListener("click", (event) => {
      if (!event.target.closest("nav")) {
        this.openMenu = null;
        this.cierraMenus();
      }
    });

    //3. Metodo para cerrar con tecla ESC
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.openMenu = null;
        this.cierraMenus();
      }
    });
  }

  //4. Metodo abrirCerrarMenu
  abrirCerrarMenu(menu) {
    if (this.openMenu === menu) { //Comprueba si el submenu ya estaba abiero
      this.openMenu = null; //Si es el mismo lo cierra
      this.cierraMenus();//metodo para cerrar todo los submenus
    } else {
      this.openMenu = menu; 
      this.cierraMenus();
      const submenuLi = this.nav.querySelector(`[data-menu="${menu}"]`)?.parentElement;
      if (submenuLi) submenuLi.classList.add("open");
    }
  }

  //5. Metodo cierraMenus
  cierraMenus() {
    this.nav.querySelectorAll(".submenu").forEach((submenuLi) => {
      submenuLi.classList.remove("open");
    });
  }
}
