import Swal from 'sweetalert2';
import axios from 'axios';

// Variables
const removeBtn = document.getElementById('eliminar-proyecto'); 

// Event Listeners
removeBtn.addEventListener('click', () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Una vez eliminado no podrás recuperar el proyecto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, borrar proyecto!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        '¡Proyecto eliminado!',
        'El proyecto ha sido eliminado de forma correcta.',
        'success'
      );

      // Redirect to the home page
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  })
});