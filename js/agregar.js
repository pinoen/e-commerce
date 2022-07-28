const form = document.querySelector(".datos-producto");
const agregado = document.querySelector("#agregado");

function validarDatos(e) {
  e.preventDefault();
  if (
    form.url.value === "" ||
    form.categoria.value === "" ||
    form.nombre.value === "" ||
    form.precio === "" ||
    form.descripcion.value === ""
  ) {
    agregado.innerHTML = "Todos los campos deben completarse!";
  } else if (form.nombre.value.length > 20) {
    agregado.innerHTML =
      "El nombre del producto no puede tener mas de 20 caracteres.";
  } else if (form.descripcion.value.length > 150) {
    agregado.innerHTML =
      "La descripcion del producto no puede tener mas de 150 caracteres.";
  } else {
    nuevoProducto();
  }
}

const nuevoProducto = async (e) => {
  const datos = {
    imagen: form.url.value,
    categoria: form.categoria.value,
    nombre: form.nombre.value,
    precio: form.precio.value,
    descripcion: form.descripcion.value,
  };

  await fetch("http://localhost:3000/productos", {
    method: "post",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" },
  });

  agregado.innerHTML = "Producto agregado exitosamente!";
  agregado.style.color = "rgb(57, 194, 57)";
};

form.addEventListener("submit", validarDatos);
