function iniciar() {
  const emailIngresado = document.getElementById('email').value;
  const passwordIngresada = document.getElementById('password').value;

  // Recuperar el objeto completo 'user' desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Validación de credenciales
  if (user && emailIngresado === user.email && passwordIngresada === user.password) {
      alert('Inicio de sesión exitoso.');
      window.location.replace('panel.html');  // Redirige al panel del usuario
  } else {
      alert('Email o contraseña incorrectos.');
  }
}

  
  