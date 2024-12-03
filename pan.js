const nameUser = document.getElementById("bienvenidos");
const data = JSON.parse(localStorage.getItem('user'));  // Recuperar el objeto 'user' completo

let nombre= JSON.parse(localStorage.getItem('user')).nombre;
nameUser.innerHTML = "Bienvenid@ " + `${nombre}`;  // Mostrar el nombre del usuario


function salir() {  
    const exit = confirm('¿Estás seguro de que deseas salir?');
  if (exit) {
    window.location.href = 'iniciar.html'; // Redirige a la página de inicio de sesión
  }}
