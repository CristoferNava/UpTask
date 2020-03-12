import axios from 'axios';
const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
  tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
      // Sent patch (only update a part of the object, the status in this case) petion to tasks/id
      const taskID = e.target.parentElement.parentElement.dataset.taskId;
      const url = `${location.origin}/tasks/${taskID}`;
      
      axios.patch(url, {taskID})
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }); 
}

export default tasks;