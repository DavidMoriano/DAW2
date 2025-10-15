function recuperarDatos() {
  let idTitle = document.getElementById("titleId").value;
  if (isNaN(idTitle) || idTitle == "") {
    alert("Debes introducir un número");
  } else {
    fetch("https://jsonplaceholder.typicode.com/albums?" + "userId=" + idTitle)
      .then((response) => response.json())
      .then((infoPosts) => mostrarDatos(infoPosts))
      .catch((error) => console.error(error));
  }
}

function mostrarDatos(infoPosts) {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  infoPosts.forEach((post) => {
    const newPost = document.createElement("tr");
    newPost.innerHTML = `<td>${post.userId}</td> <td>${post.id}</td> <td>${post.title}</td>`;
    tbody.appendChild(newPost);
  });
}

function mostrarDatosConsolaRespuesta() {
  let idTitle = document.getElementById("titleId").value;
  if (isNaN(idTitle) || idTitle == "") {
    alert("Debes introducir un número");
  } else {
    fetch("https://jsonplaceholder.typicode.com/albums?" + "userId=" + idTitle)
      .then((response) => response.json())
      .then((respuesta) => console.log(respuesta))
      .catch((error) => console.error(error));
  }
}

function recuperarEmails() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error HTTP: " + response.status + " (" + response.statusText + ")");
      }
    })
    .then((usuarios) => mostrarDatosEmail(usuarios))
    .catch((error) => console.error(error));
}

function mostrarDatosEmail(usuarios) {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  usuarios.forEach((usuario) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${usuario.name}</td><td>${usuario.email}</td>`;
    newRow.innerHTML += `<br>`;
    tbody.appendChild(newRow);
  });

}

function recuperarTarea() {
  let idTarea = document.getElementById("tareaId").value;
  if (isNaN(idTarea) || idTarea == "") {
    alert("Debes introducir un número");
  } else {
    fetch("https://jsonplaceholder.typicode.com/todos/" + idTarea)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error("Error HTTP: " + response.status + " (" + response.statusText + ")");
        }
      })
      .then((tarea) => mostrarTarea(tarea))
      .catch((error) => {
        if (error.message.startsWith("Error HTTP")) {
          console.error(error.message);
        }
      });
  }
}

function mostrarTarea(tarea) {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  let newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${tarea.userId}</td><td>${tarea.id}</td><td>${tarea.title}</td><td>${tarea.completed}</td>`;
  tbody.appendChild(newRow);
}

function mostrarTareas() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((tareas) => {
      let tbody = document.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";
      tareas.forEach((tarea) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${tarea.userId}</td><td>${tarea.id}</td><td>${tarea.title}</td><td>${tarea.completed}</td>`;
        tbody.appendChild(newRow);
      });
    })
    .catch((error) => console.error(error));
}

function crearTarea() {
  let nuevaTarea = {
    userId: 10,
    title: "Prueba de POST",
    completed: false
  };

  let init = {
    method: "POST",
    body: JSON.stringify(nuevaTarea),
    headers: { "Content-type": "application/json;" }
  };

  fetch("https://jsonplaceholder.typicode.com/todos", init)
    .then(response => {
      if (response.status === 201) 
        return response.json();
      return "error";
    })
    .then(tareaCreada => console.log(tareaCreada))
}


