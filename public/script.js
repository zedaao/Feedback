const input = document.getElementById("input");
const input2 = document.getElementById("input2");
const btn = document.getElementById("btn");
const box = document.getElementById("box");
const lista = document.getElementById("todo_lista");
const li = document.querySelector("#li");

function getAllTasks() {
  fetch("http://localhost:5555/tasks/api/")
    .then((response) => response.json())
    .then((data) => {
      if (!data || data.length === 0) {
        lista.innerHTML = '<p class="no-tasks ">Nenhuma tarefa cadastrada.</p>';
      } else {
        lista.innerHTML = "";
        data.forEach(criarElemento);
      }
    });
}

function deleteTask(id) {
  fetch("http://localhost:5555/tasks/api/" + id, { method: "DELETE" }).then(
    () => {
      getAllTasks();
    }
  );
}

function createTask(value, feedback) {
  fetch("http://localhost:5555/tasks/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: value, feedback: feedback }),
  }).then(() => {
    getAllTasks();
  });
}

function criarElemento(task) {
  const li = document.createElement("li");
  const deletar = document.createElement("button");
  const image = document.createElement("img");

  const p = document.createElement("p");
  const feedback = document.createElement("p");

  deletar.appendChild(image);
  deletar.classList.add("btn-2");
  image.setAttribute("src", "./css/dele.png");

  deletar.addEventListener("click", () => {
    deleteTask(task.id);
  });

  lista.appendChild(li);
  feedback.innerHTML = `Feedback: ${task.feedback}`;
  p.innerHTML = `Nome: ${task.name}`;

  li.appendChild(p);
  li.appendChild(feedback);
  li.appendChild(deletar);
}

btn.addEventListener("click", () => {
  const value = input.value;
  const feedback = input2.value;
  createTask(value, feedback);
  input.value = "";
  input2.value = "";
});

getAllTasks();
