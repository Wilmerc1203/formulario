function RegistrarUsuario() {
  const user = {
      email: document.getElementById('email').value,
      nombre: document.getElementById('Nombre').value,
      password: document.getElementById('password').value
  };

  // Validación básica
  if (!user.email || !validarEmail(user.email)) {
      alert('Por favor, ingresa un email válido.');
      return;
  }

  if (!user.nombre) {
      alert('El nombre no puede estar vacío.');
      return;
  }

  if (user.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
  }

  // Guardar el objeto 'user' completo en localStorage
  localStorage.setItem('user', JSON.stringify(user));

  alert('Usuario registrado exitosamente.');
  window.location.replace('index.html');  // Redirige al inicio de sesión
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
