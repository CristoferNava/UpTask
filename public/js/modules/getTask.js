import axios from 'axios';
import Swal from 'sweetalert2';
import {updateProgress} from '../functions/progress';

const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
  tasks.addEventListener('click', (e) => {
    // Change the status of the task
    if (e.target.classList.contains('fa-check-circle')) {
      // Sent patch (only update a part of the object, the status in this case) petion to tasks/id
      const icon = e.target;
      const taskID = icon.parentElement.parentElement.dataset.taskId;
      const url = `${location.origin}/tasks/${taskID}`;
      
      axios.patch(url, {taskID})
        .then(res => {
          icon.classList.toggle('completo');
          updateProgress();
        })
        .catch(err => {
          console.log(err);
        });
    }

    // Remove task
    if (e.target.classList.contains('fa-trash')) {
      const taskHTML = e.target.parentElement.parentElement,
            taskID = taskHTML.dataset.taskId;

      Swal.fire({
        title: '¿Estás seguro?',
        text: "Una vez eliminada no podrás recuperar la tarea",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, borrar tarea!',
        cancelButtonText: 'Cancelar'
      })
      .then((result) => {
        if (result.value) {
          // Sent the request using axios
          const url = `${location.origin}/tasks/${taskID}`;
      
          axios.delete(url, {params: {taskID}})
            .then(res => {
              taskHTML.parentElement.removeChild(taskHTML);
              Swal.fire(
                '¡Tarea eliminada!',
                'La tarea ha sido eliminada de forma correcta.',
                'success'
              );
              updateProgress();
            }) 
        }
      })
    }
  }); 
}

export default tasks;