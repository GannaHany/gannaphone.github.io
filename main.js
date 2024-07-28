let todoList = [];

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoListElement = document.getElementById('todo-list');


if (localStorage.getItem('todoList')) {
  todoList = JSON.parse(localStorage.getItem('todoList'));
}

addBtn.addEventListener('click', addTodo);

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todoList.push({ text: todoText, completed: false });
    todoInput.value = '';
    saveTodoList();
    TodoList();
  }
}

function TodoList() {
  todoListElement.innerHTML = '';
  todoList.forEach((todo, index) => {
    const todoElement = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('click', () => {
      todo.completed = checkbox.checked;
      saveTodoList();
      TodoList();
    });
    const todoTextElement = document.createElement('span');
    todoTextElement.textContent = todo.text;
    if (todo.completed) {
      todoTextElement.classList.add('completed');
    }
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveTodoList();
      TodoList();
    });
    todoElement.appendChild(checkbox);
    todoElement.appendChild(todoTextElement);
    todoElement.appendChild(removeBtn);
    todoListElement.appendChild(todoElement);
  });
}

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

TodoList();
