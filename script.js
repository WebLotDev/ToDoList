document.addEventListener('DOMContentLoaded', loadTasks);

const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const todoList = document.getElementById('todo-list');

// Add task on form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = taskInput.value;
  const dueDate = dueDateInput.value;

  if (task && dueDate) {
    addTask(task, dueDate);
    taskInput.value = '';
    dueDateInput.value = '';
  }
});

// Function to add a task to the DOM and local storage
function addTask(task, dueDate) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task} <small>(Due: ${dueDate})</small></span>
    <button class="delete-btn">Delete</button>
  `;

  todoList.appendChild(li);
  saveTask(task, dueDate);

  // Attach delete button event
  li.querySelector('.delete-btn').addEventListener('click', function() {
    deleteTask(li, task);
  });
}

// Save task to local storage
function saveTask(task, dueDate) {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.push({ task, dueDate });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadTasks() {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  tasks.forEach(function(taskObj) {
    addTask(taskObj.task, taskObj.dueDate);
  });
}

// Delete task from local storage and DOM
function deleteTask(li, task) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(t => t.task !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  li.remove();
}
