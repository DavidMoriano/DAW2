function comenzarAccion(accion) {
    let texto = document.getElementById("textArea").value;

    if (accion === "modificar") {
        let palabrasModificadas = texto.split(" ").map(
            palabra => palabra.replace(" ") + "ria");
        alert(palabrasModificadas.slice(-10).join(' '));

    }

    if (accion === "palabras") {
        let palabrasOrdenadas = texto.split(" ").sort(function (palabra1, palabra2) {
            if (palabra1[1] < palabra2[1]) {
                return -1;
            }
            if (palabra2[1] < palabra1[1]) {
                return 1;
            }
        });
        alert(palabrasOrdenadas.join("_"));
        console.log("* " + palabrasOrdenadas.map(letra => letra[1]).join(""));
    }

    if (accion === "ocurrencias") {
        let textoMinus = texto.toLowerCase();
        let palabraX = textoMinus.split(" ").some(letra => letra[0] === "x");
        if (palabraX) {
            console.log("Existen palabras que empiezan por X");
            let palabrasMasDe5 = texto.split(" ").every(palabra => palabra.length >= 5);
            if (palabrasMasDe5) {
                console.log("Todas las palabras tienen más de 5 letras");
            }

        }
    }

}


