let buscar = document.querySelector(".input__header");
let container = document.querySelector(".imagenes");

let agregarProducto = async (palabra) => {
  let uri = "http://localhost:3000/productos?";
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
      <div class="box__edicion" id="box__edicion${producto.id}"></div>
    </div>
    `;
  });
  container.innerHTML = box;

  let eliminar = document.querySelectorAll(".eliminar");
  eliminar.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let boxPadre = e.target.parentNode.children;
      let id = boxPadre[5].innerHTML.slice(4);

      const res = await fetch("http://localhost:3000/productos/" + id, {
        method: "delete",
      });
      boxPadre.remove();
    });
  });

  let editar = document.querySelectorAll(".editar");
  editar.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let boxPadre = e.target.parentNode.children;
      let datosProductos = {
        imagen: boxPadre[0].src.slice(22),
        nombre: boxPadre[3].innerHTML,
        precio: boxPadre[4].innerHTML.slice(2),
        id: boxPadre[5].innerHTML.slice(4),
      };

      let boxEditar = document.querySelector(
        `#box__edicion${datosProductos.id}`
      );

      boxEditar.style.display = "flex";
      boxEditar.innerHTML = `
        <form class="datos-producto" action="" method="post">
          <h3>Editar producto</h3>
          <input type="text" name="url" id="url" value="${datosProductos.imagen}">
          <input type="text" name="categoria" id="categoria" value="Categoria">
          <input type="text" name="nombre" id="nombre" value="${datosProductos.nombre}">
          <input type="number" step=".01" name="precio" id="precio" value="${datosProductos.precio}">
          <textarea name="descripcion" id="descripcion" placeholder="Descripcion del producto"></textarea>
          <button type="submit" class="guardar">Guardar cambios</button>
          <span id="agregado"></span>
        </form>
      `;

      let formulario = document.querySelector(".datos-producto");
      let btn = document.querySelector(".guardar");
      btn.addEventListener("click", async (e) => {
        const doc = {
          imagen: formulario.url.value,
          categoria: formulario.categoria.value,
          nombre: formulario.nombre.value,
          precio: formulario.precio.value,
          descripcion: formulario.descripcion.value,
          id: datosProductos.id,
        };
        console.log(formulario);
        const response = await fetch(
          "http://localhost:3000/productos/" + datosProductos.id,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(doc),
          }
        );
        boxEditar.style.display = "none";
      });
    });
  });
};

buscar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregarProducto(buscar.value);
  }
});

window.addEventListener("DOMContentLoaded", () => agregarProducto());
