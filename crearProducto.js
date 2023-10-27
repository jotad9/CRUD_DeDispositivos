document.addEventListener("DOMContentLoaded", function () {
    const crearProductoForm = document.getElementById("crearProductoForm");

    crearProductoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const color = document.getElementById("color").value;
        const almacenamiento = document.getElementById("almacenamiento").value;
        const procesador = document.getElementById("procesador").value;

        // Generar un ID único
        const id = generarIDUnico();

        const nuevoProducto = {
            id,
            marca,
            modelo,
            color,
            almacenamiento,
            procesador,
        };

        // Lógica para enviar el nuevo producto al servidor (fetch, etc.)

        // Ejemplo de cómo usar fetch para enviar el nuevo producto al servidor:
        fetch("http://localhost:3000/dispositivos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Producto creado exitosamente.");
                    // Puedes redirigir al usuario a la página de lista de productos o realizar otra acción.
                } else {
                    console.error("No se pudo crear el dispositivo.");
                }
            })
            .catch((error) => {
                console.error("Error al crear el dispositivo:", error);
            });
            window.location.href = "index.html";
    });
});
generarIDUnico();
function generarIDUnico() {
    fetch('http://localhost:3000/dispositivos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta del servidor no es válida');
            }
            return response.json();
        })
        .then(data => {
            let id=0;
            for (let dispositivo of data) {
                id = dispositivo.id;
                console.log(id);
            }
            id++;
            console.log(id);
            return id;
        })
        
}