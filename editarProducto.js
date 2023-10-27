document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dispositivoId = urlParams.get('id');

    // Aquí puedes implementar la lógica para cargar los datos del dispositivo utilizando el ID proporcionado.
    // Puedes utilizar una solicitud fetch para obtener los datos del dispositivo por su ID y llenar el formulario de edición.
    // Por ejemplo:
    fetch(`http://localhost:3000/dispositivos/${dispositivoId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('marca').value = data.marca;
            document.getElementById('modelo').value = data.modelo;
            document.getElementById('color').value = data.color;
            document.getElementById('almacenamiento').value = data.almacenamiento;
            document.getElementById('procesador').value = data.procesador;
        })
        .catch(error => {
            console.error('Error al cargar los datos del dispositivo:', error);
        });

    // Agregar un manejador de eventos para guardar la edición
    const guardarEdicionBtn = document.getElementById('guardarEdicion');
    guardarEdicionBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener los valores editados
        const editedData = {
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            color: document.getElementById('color').value,
            almacenamiento: document.getElementById('almacenamiento').value,
            procesador: document.getElementById('procesador').value,
        };

        // Enviar los datos editados a través de una solicitud PUT
        fetch(`http://localhost:3000/dispositivos/${dispositivoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
            .then(response => {
                if (response.ok) {
                    // Redirigir de nuevo a la página de inicio después de la edición exitosa
                    window.location.href = 'index.html';
                } else {
                    console.error('Error al actualizar el dispositivo.');
                }
            })
            .catch(error => {
                console.error('Error al actualizar el dispositivo:', error);
            });
    });
});
