let nombre = document.querySelector("#nombre");
let errorNombre = document.querySelector("#errorNombre");

let mensaje = document.querySelector("#mensaje");
let errorMensaje = document.querySelector("#errorMensaje");

let enviado = document.querySelector("#enviado");

function validar() {
  if (nombre.value === "") {
    errorNombre.innerHTML = "Este campo debe completarse!";
  } else if (nombre.value.length > 40) {
    errorNombre.innerHTML = "El nombre debe contener maximo 40 caracteres.";
  } else if (mensaje.value === "") {
    errorMensaje.innerHTML = "Este campo debe completarse!";
  } else if (mensaje.value > 120) {
    errorMensaje.innerHTML = "El mensaje debe contener maximo 120 caracteres.";
  } else {
    enviado.innerHTML = `Muchas gracias ${nombre.value}. Tu mensaje fue enviado correctamente. Te contactaremos pronto.`;
    errorNombre.innerHTML = "";
    errorMensaje.innerHTML = "";
    nombre.value = "";
    mensaje.value = "";
  }
}

let boton = document.querySelector(".boton__contacto");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  validar();
});
