import Swal from 'sweetalert2';

export const updateProgress = () => {
  const tasks = document.querySelectorAll('li.tarea');

  if (tasks.length) {
    const tasksCompleted = document.querySelectorAll('i.completo');
    const progress = Math.round(tasksCompleted.length / tasks.length * 100);
    console.log(progress);

    const porcentage = document.querySelector('#porcentaje');
    porcentage.style.width = progress+'%';

    if (progress === 100) {
      Swal.fire(
        '¡Proyecto finalizado!',
        'Todas las tareas del proyecto han sido completadas',
        'success'
      );
    }
  }
};