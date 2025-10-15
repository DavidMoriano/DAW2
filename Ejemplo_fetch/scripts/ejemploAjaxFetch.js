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
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${usuario.name}</td><td>${usuario.email}</td>`;
    tbody.appendChild(newRow);
  });
}

function mostrarTareas() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response))
}



