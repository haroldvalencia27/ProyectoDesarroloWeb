// login.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDisplay = document.getElementById("error");

  // Usuarios hardcodeados (para práctica sin localStorage)
  const usuariosValidos = [
    { usuario: "admin", clave: "1234" },
    { usuario: "leperfumer", clave: "perfumito" }
  ];

  const usuarioEncontrado = usuariosValidos.find(
    (user) => user.usuario === username && user.clave === password
  );

  if (usuarioEncontrado) {
    errorDisplay.textContent = "";
    alert("¡Bienvenido a LE PERFUM!");
    // Aquí podrías redirigir a otra página si quisieras
    window.location.href = "index.html";
  } else {
    errorDisplay.textContent = "Usuario o contraseña incorrectos.";
  }
});
