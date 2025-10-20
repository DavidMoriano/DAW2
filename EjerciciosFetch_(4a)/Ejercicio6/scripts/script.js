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
  <tbody id="tablaBody"></tbody>
`;
document.body.appendChild(tabla);
let tbody = document.getElementById("tablaBody");

async function cargarClientes() {
    let res = await fetch(URL);
    let data = await res.json();
    tbody.innerHTML = "";
    data.forEach(c => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nombre} ${c.apellidos}</td>
      <td>${c.fechaNac}</td>
      <td>${c.Sexo}</td>
    `;
        tbody.appendChild(fila);
    });
}

function obtenerPreferencias() {
    let checks = document.querySelectorAll("input[name='preferencias']:checked");
    return Array.from(checks).map(c => c.value).join("_");
}

async function registrarCliente() {
    let cliente = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        DNI: document.getElementById("dni").value,
        fechaNac: document.getElementById("fechaNacimiento").value,
        Sexo: document.querySelector("input[name='sexo']:checked").value,
        preferencias: obtenerPreferencias()
    };
    let res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });
    if (res.ok) {
        await cargarClientes();
        formulario.reset();
        alert("Cliente registrado correctamente");
    } else {
        alert("Error al registrar el cliente");
    }
}

async function borrarCliente() {
    let dni = document.getElementById("dni").value.trim();
    if (!dni) return alert("Introduce el DNI del cliente a borrar");
    let res = await fetch(URL);
    let clientes = await res.json();
    let cliente = clientes.find(c => c.DNI === dni);
    if (!cliente) return alert("No se encontró ningún cliente con ese DNI");
    let borrar = await fetch(`${URL}/${cliente.id}`, { method: "DELETE" });
    if (borrar.ok) {
        await cargarClientes();
        alert("Cliente borrado correctamente");
    } else {
        alert("Error al borrar el cliente");
    }
}

async function actualizarCliente() {
    let dni = document.getElementById("dni").value.trim();
    if (!dni) return alert("Introduce el DNI del cliente a actualizar");
    let res = await fetch(URL);
    let clientes = await res.json();
    let clienteExistente = clientes.find(c => c.DNI === dni);
    if (!clienteExistente) return alert("No se encontró ningún cliente con ese DNI");
    let clienteActualizado = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        DNI: dni,
        fechaNac: document.getElementById("fechaNacimiento").value,
        Sexo: document.querySelector("input[name='sexo']:checked").value,
        preferencias: obtenerPreferencias()
    };
    let actualizar = await fetch(`${URL}/${clienteExistente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteActualizado)
    });
    if (actualizar.ok) {
        await cargarClientes();
        alert("Cliente actualizado correctamente");
    } else {
        alert("Error al actualizar el cliente");
    }
}

cargarClientes();