let URL = "http://localhost:3000/clientes";
let formulario = document.getElementById("formularioCliente");
let tabla = document.createElement("table");
tabla.innerHTML = `
  <thead>
    <tr>
      <th>Id</th>
      <th>Nombre y apellidos</th>
      <th>Fecha nacimiento</th>
      <th>Sexo</th>
    </tr>
  </thead>
  <tbody id="tablaBody"></tbody>`;
document.body.appendChild(tabla);
let tbody = document.getElementById("tablaBody");

async function cargarClientes() {
    fetch(URL)
        .then(response => response.json())
        .then(datos => {
            tbody.innerHTML = "";
            datos.forEach(c => {
                let fila = document.createElement("tr");
                fila.innerHTML = `
            <td>${c.id}</td>
            <td>${c.nombre} ${c.apellidos}</td>
            <td>${c.fechaNac}</td>
            <td>${c.Sexo}</td>`;
                tbody.appendChild(fila);
            });
        })
        .catch(error => console.log(error));
}

function obtenerPreferencias() {
    let checks = document.querySelectorAll("input[name='preferencias']:checked");
    return Array.from(checks).map(c => c.value).join("_");
}

function registrarCliente() {
    let cliente = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        DNI: document.getElementById("dni").value,
        fechaNac: document.getElementById("fechaNacimiento").value,
        Sexo: document.querySelector("input[name='sexo']:checked").value,
        preferencias: obtenerPreferencias()
    };
    fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    })
        .then(respuesta => {
            if (respuesta.ok) {
                cargarClientes();
                formulario.reset(); //Limpio el form
                alert("Cliente registrado correctamente");
            } else {
                alert("Error al registrar el cliente");
            }
        })
        .catch(error => {
            console.error("Error de red o servidor:", error);
            alert("Error al conectar con el servidor");
        });

}

function borrarCliente() {
    let dni = prompt("Introduce el DNI para borrar");

    if (!dni) {
        return alert("Introduce el DNI del cliente a borrar");
    }

    fetch(URL)
        .then(response => response.json())
        .then(clientes => {
            let cliente = clientes.find(c => c.DNI === dni);
            if (!cliente) {
                return alert("No se encontró ningún cliente con ese DNI");
            }

            return fetch(`${URL}/${cliente.id}`, { method: "DELETE" });
        })
        .then(respuesta => {
            if (!respuesta) return; // evita error si no se encontró cliente

            if (respuesta.ok) {
                cargarClientes();
                alert("Cliente borrado correctamente");
            } else {
                alert("Error al borrar el cliente");
            }
        })
        .catch(error => {
            console.error("Error al borrar el cliente:", error);
            alert("Error de conexión al servidor");
        });
}


function actualizarCliente() {
    let dni = prompt("Introduce el DNI para actualizar");

    if (!dni) {
        return alert("Introduce el DNI del cliente a actualizar");
    }

    fetch(URL)
        .then(response => response.json())
        .then(clientes => {
            let clienteExistente = clientes.find(c => c.DNI === dni);

            if (!clienteExistente) {
                alert("No se encontró ningún cliente con ese DNI");
                return Promise.reject("Cliente no encontrado");
            }

            let clienteActualizado = {
                nombre: document.getElementById("nombre").value,
                apellidos: document.getElementById("apellidos").value,
                DNI: dni,
                fechaNac: document.getElementById("fechaNacimiento").value,
                Sexo: document.querySelector("input[name='sexo']:checked").value,
                preferencias: obtenerPreferencias()
            };

            return fetch(`${URL}/${clienteExistente.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteActualizado)
            });
        })
        .then(respuesta => {
            if (respuesta.ok) {
                cargarClientes();
                alert("Cliente actualizado correctamente");
            } else {
                alert("Error al actualizar el cliente");
            }
        })
        .catch(error => {
            console.error("Error al actualizar el cliente:", error);
            if (error !== "Cliente no encontrado") {
                alert("Error de conexión al servidor");
            }
        });
}

