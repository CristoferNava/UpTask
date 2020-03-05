import Swal from 'sweetalert2';
import axios from 'axios';

// Variables
const removeBtn = document.querySelector('#eliminar-proyecto');

// Event Listeners
if (removeBtn) {
  removeBtn.addEventListener('click', (e) => {
    // Accediendo al atributo personalizado
    const projectURL = e.target.dataset.projectUrl;

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
        // Envío de la petición a Axios
        const url = `${location.origin}/projects/${projectURL}`;
        axios.delete(url, {params: {projectURL}})
          .then((res) => {
            console.log(res.data);

            Swal.fire(
              '¡Proyecto eliminado!',
              'El proyecto ha sido eliminado de forma correcta.',
              'success'
            );
      
            // Redirect to the home page
            setTimeout(() => {
              window.location.href = '/new-project';
            }, 3000);
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error con la conexión',
              text: 'No se pudo eliminar el proyecto'
            })
          });
        }
      })
  });
}