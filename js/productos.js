let buscar = document.querySelector(".input__header");
let eliminar = document.querySelector(".eliminar");
let editar = document.querySelector(".editar");

let container = document.querySelector(".imagenes");

let agregarProducto = async (palabra) => {
  let uri = "http://localhost:3000/productos?_sort=precio&_order=desc";
  if (palabra) {
    uri += `&q=${palabra}`;
  }

  const respuesta = await fetch(uri);
  const productos = await respuesta.json();

  let box = "";

  productos.forEach((producto) => {
    box += `
    <div class="box__producto">
      <img src="${producto.imagen}" alt="" class="foto" />
      <img class="eliminar" src="img/delete.png" alt="eliminar producto">
      <img src="img/edit.png" alt="editar producto" class="editar">
      <p class="description">${producto.nombre}</p>
      <p class="precio">$ ${producto.precio}</p>
      <p class="ver">#000${producto.id}</p>
    </div>
    `;
  });
  container.innerHTML = box;
};

buscar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregarProducto(buscar.value);
  }
});

window.addEventListener("DOMContentLoaded", () => agregarProducto());
