let eliminar = document.querySelector(".eliminar");
let editar = document.querySelector(".editar");

let container = document.querySelector(".imagenes");

let agregarProducto = async () => {
  const respuesta = await fetch("http://localhost:3000/productos");
  const productos = await respuesta.json();

  let box = "";

  productos.forEach((producto) => {
    box += `
    <div class="box__producto">
      <img src="${producto.imagen}" alt="" class="foto" />
      <img class="eliminar" src="img/delete.png" alt="eliminar producto">
      <img src="img/edit.png" alt="editar producto" class="editar">
      <p class="description">${producto.nombre}</p>
      <p class="precio">${producto.precio}</p>
      <p class="ver">#000${producto.id}</p>
    </div>
    `;
  });
  container.innerHTML += box;
};

window.addEventListener("DOMContentLoaded", () => agregarProducto());
