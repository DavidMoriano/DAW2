function solicitarInformacion() {
  let animalSeleccionado = document.getElementById("animales").value;
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  if (animalSeleccionado === "" || animalSeleccionado === "#") { 
    alert("Debes seleccionar un animal");

    return;
  }

  fetch("http://localhost:3000/animales?Tipo=" + animalSeleccionado)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      } else {
        return response.json();
      }
    })
    .then(AnimalSeleccionado => MostrarAnimales(AnimalSeleccionado))
    .catch(error => {
      console.error("Error al recuperar los datos: " + error);
      alert("Hubo un error al cargar la información. Revisa la consola para más detalles.");
    });
}

function MostrarAnimales(AnimalSeleccionado) {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  // Verificar si hay datos
  if (!AnimalSeleccionado || AnimalSeleccionado.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2">No se encontraron animales de este tipo.</td></tr>';
    return;
  }

  AnimalSeleccionado.forEach(animal => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${animal.Nombre}</td><td>${animal.Rasgos}</td>`;
    tbody.appendChild(newRow);
  });
}
