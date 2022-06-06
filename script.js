
const tasks = [
  {
    id: 1,
    title: "Do groceries",
    content: "Healthy food only",
    finished: false,
  },
  {
    id: 2,
    title: "Read a book",
    content: "Finish reading The Book Thief book",
    finished: true,
  },
  {
    id: 3,
    title: "Create tests for course",
    content:
      "Create tests for Programming course (make sure to upload it to mega)",
    finished: false,
  },
];

const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const btnClose = document.getElementById("btnClose");
const btnSave = document.getElementById("btnSave");
const title = document.getElementById("title");
const content = document.getElementById("content");
const titleError = document.getElementById("titleError");

/* ADDING TASKS */
addBtn.onclick = function () {
  modal.classList.add("show");
  modal.style.display = "block";
  title.value = "";
  content.value = "";
};
function getRandomId() {
  return Math.floor(Math.random() * 100);
}

btnClose.onclick = function () {
  modal.classList.remove("show");
  modal.style.display = "none";
  title.value = "";
  content.value = "";
  titleError.classList.add("hide");
  isValid();
};

btnSave.onclick = function () {
  saveChanges();
  if (isValid()) {
    addNewTask({
      id: getRandomId(),
      title: title.value,
      content: content.value,
      finished: false,
    });
  }
};

function saveChanges() {
  if (!title.value) {
    titleError.classList.remove("hide");
    titleError.style.color = "red";
  } else {
    titleError.classList.add("hide");
    modal.classList.remove("show");
    modal.style.display = "none";
  }
}
function isValid() {
  if (title.value) {
    return true;
  } else {
    return false;
  }
}
function addNewTask(newTask) {
  tasks.push(newTask);
  refreshList();
}

/*  */ ////////////////////*  */

/* UPDATING LISTS */
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

function creatingTask(task) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <div class="card-body">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.content}</p>
  </div>
    `;

  if (task.finished) {
    doneList.appendChild(card);
    let cardBody = card.querySelector(".card-body");
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.classList.add("btn", "btn-primary");
    cardBody.appendChild(btnDelete);
    btnDelete.onclick = function () {
      deleteBtn(task.id);
    };
  } else {
    let cardBody = card.querySelector(".card-body");
    const btnFinish = document.createElement("button");
    btnFinish.innerText = "Finish";
    btnFinish.classList.add("btn", "btn-danger");
    cardBody.appendChild(btnFinish);
    todoList.appendChild(card);
    btnFinish.onclick = function () {
      doneList.appendChild(card);
      btnFinish.classList.remove("btn-danger");
      btnFinish.classList.add("btn-primary");
      btnFinish.innerText = "Delete";
      finishBtn(task.id);
    };
  }
}
function addingTask() {
  tasks.forEach((task) => {
    creatingTask(task);
  });
}

addingTask();

/*  */ //////////////*  */

/* FUNCTIONS FOR REORDERING LISTS */

function deleteBtn(taskId) {
  let index = tasks.findIndex((obj) => obj.id == taskId);
  tasks.splice(index, 1);
  refreshList();
}
function finishBtn(taskId) {
  let index = tasks.findIndex((obj) => obj.id == taskId);
  tasks[index].finished = true;
  refreshList();
}
function refreshList() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  addingTask();
}
