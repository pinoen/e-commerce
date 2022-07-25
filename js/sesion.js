let email = document.querySelector("#email");
let errorEmail = document.querySelector("#errorEmail");

let password = document.querySelector("#password");
let errorPassword = document.querySelector("#errorPassword");

let usuarioInvalido = document.querySelector("#usuarioInvalido");

let usuariosRegistrados = [];

fetch("data/usuarios.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.usuarios.length; i++) {
      usuariosRegistrados.push(data.usuarios[i]);
    }
  });

function iniciarSesion() {
  if (email.value === "") {
    errorEmail.innerHTML = "Este campo debe completarse!";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  ) {
    errorEmail.innerHTML =
      "Este campo debe tener formato de email valido usando por ejemplo simbolo arroba (@), proveedor del servicio y punto(.).";
  } else if (password.value === "") {
    errorPassword.innerHTML =
      "Este campo debe completarse! Ingresar una clave valida.";
  } else {
    for (let i = 0; i < usuariosRegistrados.length; i++) {
      if (
        usuariosRegistrados[i].email !== email.value ||
        usuariosRegistrados[i].password !== password.value
      ) {
        usuarioInvalido.innerHTML =
          "Correo electronico no registrado o clave incorrecta";
      } else {
        window.location.replace("/productos.html");
      }
    }
  }
}

let iniciar = document.querySelector(".entrar");

iniciar.addEventListener("click", (e) => {
  e.preventDefault();
  iniciarSesion();
});
