let container__starWars = document.querySelector(".imagenes__starWars");
let container__consolas = document.querySelector(".imagenes__consolas");
let container__diversos = document.querySelector(".imagenes__diversos");
let busqueda = document.querySelector(".busqueda");
let container__busqueda = document.querySelector(".imagenes__busqueda");
let nuevaBusqueda = document.querySelector(".boton__busqueda");

let buscar = document.querySelector(".input__header");

let agregarProducto = async () => {
  let uri = "https://e-commerce-api-pinoen.herokuapp.com/productos";

  const respuesta = await fetch(uri);
  const productos = await respuesta.json();

  productos.forEach((producto) => {
    template = `
      <div class="box__${producto.categoria}">
        <img src="${producto.imagen}" alt="" class="foto" />
        <p class="description">${producto.nombre}</p>
        <p class="precio">$ ${producto.precio}</p>
        <p class="ver">#000${producto.id}</p>
      </div>
      `;
    if (producto.categoria === "starWars") {
      container__starWars.innerHTML += template;
    }
    if (producto.categoria === "consolas") {
      container__consolas.innerHTML += template;
    }
    if (producto.categoria === "diversos") {
      container__diversos.innerHTML += template;
    }
  });
};

let buscarProductos = async (palabra) => {
  let uri = "https://e-commerce-api-pinoen.herokuapp.com/productos";
  if (palabra) {
    uri += `?&q=${palabra}`;
  }

  const respuesta = await fetch(uri);
  const productos = await respuesta.json();

  productos.forEach((producto) => {
    template = `
      <div class="box__${producto.categoria}">
        <img src="${producto.imagen}" alt="" class="foto" />
        <p class="description">${producto.nombre}</p>
        <p class="precio">$ ${producto.precio}</p>
        <p class="ver">#000${producto.id}</p>
      </div>
      `;
  });
  container__busqueda.innerHTML += template;
};

buscar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarProductos(buscar.value);
    busqueda.style.display = "flex";
  }
  nuevaBusqueda.addEventListener("click", () => {
    window.location.reload();
  });
});

window.addEventListener("DOMContentLoaded", () => agregarProducto());
