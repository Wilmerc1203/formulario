// El evento DOMContentLoaded se dispara cuando el documento HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");  // Obtiene el formulario
  const tablebody = document.querySelector("tbody");  // Obtiene el cuerpo de la tabla
  const saveBtn = document.getElementById("saveBtn");  // Obtiene el botón de Guardar
  const consultBtn = document.getElementById("consultBtn");  // Obtiene el botón de Consultar

  // Función para cargar y renderizar los datos de la tabla desde localStorage
  const loadTableData = () => {
    // Obtener los usuarios actuales desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Renderizar la tabla con los usuarios actuales
    renderTable(users);
  };
  // Función para guardar o actualizar los usuarios en localStorage
  const saveUser = (user, userIndex) => {
    // Obtener los usuarios actuales desde localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Si se pasa un índice, se edita el usuario existente
    if (userIndex !== undefined) {
      users[userIndex] = user;
    } else {
      // Si no hay índice, se agrega un nuevo usuario
      users.push(user);
    }

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Renderizar la tabla con los usuarios actualizados
    renderTable(users);
  };

  // Función para renderizar la tabla de usuarios
  const renderTable = (users) => {
    tablebody.innerHTML = ""; // Limpiar la tabla antes de renderizarla

    // Repetir el código para cada usuario en la lista
    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.email}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.edad}</td>
        <td>${user.direccion}</td>
        <td>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="consultUser(${index})">Consultar</button>
          <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="editUser(${index})">Editar</button>
        </td>
      `;
      tablebody.appendChild(row);  // Agregar la fila al cuerpo de la tabla
    });
  };

  // Función para consultar un usuario y llenar el formulario con sus datos
  window.consultUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];  // Obtener los usuarios desde localStorage
    const user = users[index];  // Obtener el usuario en el índice especificado

    if (user) {
      // Llenar el formulario con los datos del usuario
      document.getElementById("Email").value = user.email;
      document.getElementById("Nombre").value = user.nombre;
      document.getElementById("Apellido").value = user.apellido;
      document.getElementById("Edad").value = user.edad;
      document.getElementById("Direccion").value = user.direccion;
      // Ocultar el botón de guardar y mostrar el de consultar
      saveBtn.style.display = "none";  // Ocultar el botón de guardar
      consultBtn.style.display = "inline-block";  // Mostrar el botón de consultar
    }
  };

  // Función para eliminar un usuario de la lista
  window.deleteUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];  // Obtener los usuarios desde localStorage
    users.splice(index, 1);  // Eliminar el usuario en la posición especificada
    localStorage.setItem("users", JSON.stringify(users));  // Actualizar localStorage
    loadTableData();  // Volver a cargar la tabla actualizada
  };

  // Función para editar un usuario
  window.editUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];  // Obtener los usuarios desde localStorage
    const user = users[index];  // Obtener el usuario a editar

    // Llenar el formulario con los datos del usuario a editar
    document.getElementById("Email").value = user.email;
    document.getElementById("Nombre").value = user.nombre;
    document.getElementById("Apellido").value = user.apellido;
    document.getElementById("Edad").value = user.edad;
    document.getElementById("Direccion").value = user.direccion;

    // Guardar el índice del usuario a editar en un campo oculto
    document.getElementById("userIndex").value = index;

    // Mostrar el botón de guardar y ocultar el de consultar
    saveBtn.style.display = "inline-block";  // Mostrar el botón de guardar
    consultBtn.style.display = "none";  // Ocultar el botón de consultar
  };

  // Función para resetear el formulario
  const resetForm = () => {
    document.getElementById("newUserForm").reset();  // Resetear el formulario
    document.getElementById("userIndex").value = "";  // Limpiar el campo oculto de índice
    saveBtn.style.display = "inline-block";  // Mostrar el botón de guardar
    consultBtn.style.display = "none";  // Ocultar el botón de consultar
  };

  // Manejo del envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    // Obtener el índice del usuario a editar (si es un caso de edición)
    const userIndex = document.getElementById("userIndex").value;

    // Crear un objeto con los datos del usuario a guardar
    const user = {
      email: document.getElementById("Email").value,
      nombre: document.getElementById("Nombre").value,
      apellido: document.getElementById("Apellido").value,
      edad: document.getElementById("Edad").value,
      direccion: document.getElementById("Direccion").value,
    };

    // Guardar el usuario (nuevo o editado)
    saveUser(user, userIndex ? parseInt(userIndex) : undefined);

    resetForm();  // Resetear el formulario después de guardar
    bootstrap.Modal.getInstance(document.getElementById("newUserModal")).hide();  // Cerrar el modal
  });
  loadTableData();  // Cargar los datos en la tabla cuando se cargue la página
});
