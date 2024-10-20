document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("input");
  const button = document.getElementById("button");
  const taskList = document.getElementById('tasks');
  const time = document.getElementById('time');
  const duration = document.getElementById('duration');
  const sortTimeButton = document.getElementById('sortTime');
  const filterUpcomingButton = document.getElementById('filterUpcoming');

  // Fetch tasks from json-server
  fetch('http://localhost:8000/tasks')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        addTaskToDOM(task);
      });
    })
    .catch(error => console.error('Error:', error));

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    const taskTime = time.value;
    const taskDuration = duration.value;
    if (taskText !== '') {
      fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskText,
          taskTime,
          taskDuration
        })
      })
      .then(response => response.json())
      .then(task => {
        addTaskToDOM(task);
        input.value = '';
        time.value = '';
        duration.value = '';
      })
      .catch(error => console.error('Error:', error));
    }
  });

  function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.classList.add('task');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const labelText = document.createElement('label');
    labelText.classList.add('text');
    labelText.textContent = `${task.taskText} at ${task.taskTime} for ${task.taskDuration} mins`;
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>';
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
    li.appendChild(checkbox);
    li.appendChild(labelText);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Add event listeners
    removeButton.addEventListener('click', () => {
      fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        taskList.removeChild(li);
      })
      .catch(error => console.error('Error:', error));
    });

    editButton.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.taskText);
      if (newText !== null && newText.trim() !== '') {
        labelText.textContent = `${newText} at ${task.taskTime} for ${task.taskDuration} mins`;
        fetch(`http://localhost:8000/tasks/${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskText: newText })
        })
        .catch(error => console.error('Error:', error));
      }
    });

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        li.classList.add('completed');
        alert(`Completed: ${task.taskText}`);
      } else {
        li.classList.remove('completed');
      }
    });
  }

  sortTimeButton.addEventListener('click', () => {
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a,b) => {
      const timeA = a.querySelector('.text').textContent.split(' at ')[1].split(' for ')[0];
      const timeB = a.querySelector('.text').textContent.split(' at ')[1].split(' for ')[0];
      return new Date(`1970/01/01 ${timeA}`) - new Date (`1970/01/01 ${timeB}`);
    });
    taskList.innerHTML = '';
    tasksArray.forEach(task => taskList.appendChild(task));
  })
});
