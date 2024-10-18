document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById("input");
  const button = document.getElementById("button");
  const taskList =document.getElementById('tasks');

  button.addEventListener('click', (e) => {
    e.preventDefault()
    const taskText = input.ariaValueMax.trim();
    if (taskText !== '') {
      const li =document.createElement('li');
      li.classList.add('task');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox'
      const labelText =document.createElement('label');
      labelText.classList.add('text')
      labelText.textContent = taskText
      const editButton = document.createElement('button');
      editButton.classList.add('edit')
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>'
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove')
      removeButton.innerHTML

    }
  })
} )