function RecogerDatos() {
    fetch("http://localhost:3000/animales")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error en la respuesta de la red");
            }
        })
        .then(animales => MostrarAnimales(animales))
        .catch(error => console.error("Hubo un problema con la petición Fetch:", error));
}

function MostrarAnimales(animales) {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHtml = "";

    if (!animales || animales.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">No se encontraron animales de este tipo.</td></tr>';
        return;
    }

    animales.forEach(animal => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${animal.Nombre}</td>`;
        tbody.appendChild(newRow);
    });
}


function CrearNuevoAnimal() {
    let tbody = document.getElementsByTagName("tbody")[0];

    if (tbody != "") {
        tbody.innerHtml = "";
    }

    let nuevoAnimal = {
        id: 10,
        Tipo: "Pez",
        Nombre: "Nemo",
        Observacion: "Alegre",
        Ubicacion: "Acuario pasillo",
        Rasgos: "Naranja con manchas negras",
        Imagen: "https://nemo.jpg"
    }
    let init = {
        method: "POST",
        body: JSON.stringify(nuevoAnimal),
        headers: { "Content-type": "application/json;" }
    };

    fetch("http://localhost:3000/animales", init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return "error";
            }
        })
        .then(animalNuevo => console.log(animalNuevo))
}