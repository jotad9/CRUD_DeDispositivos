document.addEventListener("DOMContentLoaded", function () {
  const cuerpoTabla = document.getElementById('tabla-dispositivos');

  function mostrarProductos() {
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
      let html = '';
      for (let dispositivo of data) {
        html += `
        <tr>
          <td>${dispositivo.id}</td>
          <td>${dispositivo.marca}</td>
          <td>${dispositivo.modelo}</td>
          <td>${dispositivo.color}</td>
          <td>${dispositivo.almacenamiento}</td>
          <td>${dispositivo.procesador}</td>
          <td><button class="btn btn-danger" data-dispositivo-id="${dispositivo.id}">Eliminar</button></td>
          
        </tr>
        `;
      }
      cuerpoTabla.innerHTML = html;

      
    // Agregar manejador de eventos para los botones de eliminación
    const botonesEliminar = cuerpoTabla.querySelectorAll('button[data-dispositivo-id]');
    botonesEliminar.forEach(btn => {
      btn.addEventListener('click', function() {
        const dispositivoId = this.getAttribute('data-dispositivo-id');
        eliminarDispositivo(dispositivoId);
      });
    });
  })
  
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
}

  function eliminarDispositivo(dispositivoId) {
    fetch(`http://localhost:3000/dispositivos/${dispositivoId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta del servidor no es válida');
      }
      mostrarProductos();
      return response.json();
      
    })
    .catch(error => {
      console.error('Error al eliminar el dispositivo:', error);
    });
  }

  mostrarProductos();
});

