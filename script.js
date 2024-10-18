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
    }
  })
} )