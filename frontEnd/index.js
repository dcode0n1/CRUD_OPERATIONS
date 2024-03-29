//CRUD OPERATIONS CONSISTS OF CREATE,READ,UPDATE,DELETE

//CREATE

function createTodo() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (title.value && description.value) {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Todo Created ✅");

        // refetch todos
        getTodo();

        // clear title and description on successful creation
        title.value = "";
        description.value = "";
      });
  } else {
    alert("Title and description are required");
  }
}

//READ

function getTodo() {
  const todoList = document.getElementById("todo-list");
  // Clear todos to remove any stale data
  todoList.innerHTML = "";

  fetch("http://localhost:3000/todos", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((todo) => {
        makeTodoCard(todo.title, todo.description, todo.id);
      });
    });
}

//UPDATE
function putTodo(id) {
  const newTitle = prompt("Enter new title");
  const newDescription = prompt("Enter new description");

  if (newTitle) {
    const updated = {};

    if (newTitle) {
      updated.title = newTitle;
    }

    if (newDescription) {
      updated.description = newDescription;
    }

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Todo Updated ✅");

        // refetch todos
        getTodo();
      });
  } else {
    alert("One of Title, description is required");
  }
}

//DELETE
function deleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      console.log("Todo Deleted ✅");

      // refetch todos
      getTodo();
    });
}

// Create Todo Card and Append it to div with class todo-list
function makeTodoCard(title, description, id) {
  // create div with todo-item class
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  // create title and description <span> elements
  const todoItemTitle = document.createElement("span");
  const todoItemDescription = document.createElement("span");

  // add classes to title and description <span> elements
  todoItemTitle.classList.add("todo-item-title");
  todoItemDescription.classList.add("todo-item-description");

  // Add value to title and description <span> elements
  todoItemTitle.innerText = title;
  todoItemDescription.innerText = description;

  const todoItemActions = document.createElement("div");
  todoItemActions.classList.add("todo-item-actions");

  // create Edit button and add the class and text
  const todoEdit = document.createElement("button");
  todoEdit.classList.add("todo-edit");
  todoEdit.innerText = "Edit";

  // add click listener to Edit Button
  todoEdit.addEventListener("click", () => putTodo(id));

  // create Delete button and add the class and text
  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete");
  todoDelete.innerText = "Delete";

  // add click listener to Delete Button
  todoDelete.addEventListener("click", () => deleteTodo(id));

  // append (push) to respective nodes
  todoItemActions.appendChild(todoEdit);
  todoItemActions.appendChild(todoDelete);

  todoItem.appendChild(todoItemTitle);
  todoItem.appendChild(todoItemDescription);
  todoItem.appendChild(todoItemActions);

  // push todo-item to todo-list
  const todoList = document.getElementById("todo-list");
  todoList.appendChild(todoItem);
}
