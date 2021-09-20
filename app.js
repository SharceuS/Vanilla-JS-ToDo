//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions
function addTodo(event) {
  //Prevent page from refreshing
  event.preventDefault();

  //Add item to local storage
  saveLocalTodos(todoInput.value);

  //Create a div with class
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create the LIST ITEM
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //Insert the LI inside the div
  todoDiv.appendChild(newTodo);

  //Checked list
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Delete list
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //clear todo Input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    console.log(todo.classList[1]);
    if (todo.classList[1] === "completed") {
      removeLocalTodos_c(todo);
    } else if (todo.classList[1] === "fall") {
      removeLocalTodos(todo);
    }
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  } else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (todo.classList[1] === "completed") {
      saveLocalTodos_c(todo.innerText);
      removeLocalTodos(todo);
    } else {
      removeLocalTodos_c(todo);
      saveLocalTodos(todo.innerText);
    }
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos_c(todo) {
  let todos;

  if (localStorage.getItem("todos_c") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos_c"));
  }

  todos.push(todo);
  localStorage.setItem("todos_c", JSON.stringify(todos));
}

function saveLocalTodos(todo) {
  let todos, todos_c;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos, todos_c;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Create a div with class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create the LIST ITEM
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //Insert the LI inside the div
    todoDiv.appendChild(newTodo);

    //Checked list
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete list
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });

  if (localStorage.getItem("todos_c") === null) {
    todos_c = [];
  } else {
    todos_c = JSON.parse(localStorage.getItem("todos_c"));
  }

  todos_c.forEach(function (todo) {
    //Create a div with class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("completed");

    //Create the LIST ITEM
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //Insert the LI inside the div
    todoDiv.appendChild(newTodo);

    //Checked list
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete list
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos_c(todo) {
  let todos;

  if (localStorage.getItem("todos_c") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos_c"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos_c", JSON.stringify(todos));
}
