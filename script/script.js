// ======================================
// Seletores globais
// ======================================
const inputAddTask = document.querySelector(".input-add-task");
const inputDate = document.getElementById("date");
const descriptionOfTask = document.querySelector(".add-description");
const deletedTaskList = document.querySelector(".deleted-task-list");
const doneTaskList = document.querySelector(".liste-of-the-aplication-task-done");
const successMessage = document.getElementById("success-message");

// ======================================
// Função para setar a data atual no input
// ======================================
function setTodayAsValue() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  inputDate.setAttribute("min", todayStr);
  inputDate.value = todayStr;
}
setTodayAsValue();

// ======================================
// Função que define cor/ícone conforme a data
// ======================================
function applyTaskStatus(task) {
  const today = new Date();
  const statusDiv = task.querySelector(".checkbox-status-description");
  const statusDateDiv = task.querySelector(".date");
  const descriptionDiv = task.querySelector(".show-description");
  const menuDiv = task.querySelector(".menu-editing-save-delete");
  const statusIcon = task.querySelector(".status-date img");

  let inputValue = inputDate.value || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const [yyyy, mm, dd] = inputValue.split("-");
  const dueDate = new Date(yyyy, mm - 1, dd);

  const diffDays = Math.ceil((dueDate - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));

  statusDiv.classList.remove("status-red", "status-yellow", "status-green");
  statusDateDiv.classList.remove("status-red", "status-yellow", "status-green");

  if (diffDays < 0) {
    statusDiv.classList.add("status-red");
    statusDateDiv.classList.add("status-red");
    descriptionDiv.classList.add("status-red-dark");
    menuDiv.classList.add("status-red-dark-bottom");
    statusIcon.src = "assets/icon/Asset 2@2000x.png";
  } else if (diffDays <= 3) {
    statusDiv.classList.add("status-yellow");
    statusDateDiv.classList.add("status-yellow");
    descriptionDiv.classList.add("status-yellow-dark");
    menuDiv.classList.add("status-yellow-dark-bottom");
    statusIcon.src = "assets/icon/Asset 10@2000x.png";
  } else {
    statusDiv.classList.add("status-green");
    statusDateDiv.classList.add("status-green");
    descriptionDiv.classList.add("status-green-dark");
    menuDiv.classList.add("status-green-dark-bottom");
    statusIcon.src = "assets/icon/Asset 9@2000x.png";
  }
}

// ======================================
// Adicionar nova task
// ======================================
function addTask() {
  const btnAddTask = document.querySelector("#btn-add-task");

  btnAddTask.addEventListener("click", () => {
    const listOfTasks = document.querySelector(".liste-of-the-aplication");
    const newTask = document.createElement("li");

    // Status + data
    const statusDiv = document.createElement("div");
    const statusDateWrapper = document.createElement("div");
    statusDateWrapper.classList.add("status-date");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");

    const spanDate = document.createElement("span");
    spanDate.textContent = inputDate.value || new Date().toISOString().split("T")[0];

    const spanImg = document.createElement("span");
    const img = document.createElement("img");
    img.src = "assets/icon/Asset 10@2000x.png";
    spanImg.appendChild(img);

    dateDiv.append(spanDate, spanImg);
    statusDateWrapper.appendChild(dateDiv);
    statusDiv.appendChild(statusDateWrapper);

    // Checkbox + título + botão descrição
    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox-status-description");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox");

    const pTitle = document.createElement("p");
    pTitle.textContent = inputAddTask.value;

    const btnDescription = document.createElement("button");
    btnDescription.classList.add("btn-description");
    const btnImg = document.createElement("img");
    btnImg.src = "assets/icon/023-copywriting.png";
    btnDescription.appendChild(btnImg);

    checkboxDiv.append(checkboxInput, pTitle, btnDescription);

    // Descrição
    const openDescDiv = document.createElement("div");
    openDescDiv.classList.add("open-description", "display-none");

    const showDescDiv = document.createElement("div");
    showDescDiv.classList.add("show-description");

    const pDesc = document.createElement("p");
    pDesc.textContent = descriptionOfTask.value;

    showDescDiv.appendChild(pDesc);
    openDescDiv.appendChild(showDescDiv);

    // Menu edição (editar/deletar)
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-editing-save-delete");

    const btnEdit = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = "assets/icon/041-notebook.png";
    btnEdit.appendChild(editIcon);

    const btnDelete = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/icon/048-trash can.png";
    btnDelete.appendChild(deleteIcon);

    menuDiv.append(btnEdit, btnDelete);

    // Monta a task
    newTask.append(statusDiv, checkboxDiv, openDescDiv, menuDiv);
    listOfTasks.appendChild(newTask);

    // Aplica status visual
    applyTaskStatus(newTask);

    // Limpa inputs
    inputAddTask.value = "";
    descriptionOfTask.value = "";
    setTodayAsValue();

    // Feedback
    statusMenssagen("Task added successfully! Add another task!");
  });
}
addTask();

// ======================================
// Sidebar toggle
// ======================================
function closeSidebar() {
  const toggle = document.getElementById("checkbox");
  toggle.checked = false;
  document.querySelector(".menu-sidebar").classList.remove("active");
}

function openSideBar() {
  const toggle = document.getElementById("checkbox");
  toggle.addEventListener("change", () => {
    document.querySelector(".menu-sidebar").classList.toggle("active");
  });
}
openSideBar();

// ======================================
// Delegação de eventos
// ======================================
document.addEventListener("click", (event) => {
  const task = event.target.closest("li");

  // Marcar/desmarcar checkbox → move para "done" se marcado
  if (event.target.classList.contains("checkbox")) {
    const statusDiv = task.querySelector(".checkbox-status-description");
    const statusDateDiv = task.querySelector(".date");
    const statusIcon = task.querySelector(".status-date img");

    statusDiv.classList.toggle("background-list-checked");
    statusDateDiv.classList.toggle("background-list-checked");

    if (statusDiv.classList.contains("background-list-checked")) {
      statusIcon.src = "assets/icon/Asset 4@2000x.png";

      // Mover task concluída para a lista de done
      doneTaskList.appendChild(task);
      statusMenssagen("Task marked as done!");
    } else {
      // Retorna para a lista principal se desmarcada
      document.querySelector(".liste-of-the-aplication").appendChild(task);
      applyTaskStatus(task); // Reaplica cor/status
      statusMenssagen("Task unmarked!");
    }
  }

  // Expandir/retrair descrição
  if (event.target.closest(".btn-description")) {
    const openDesc = task.querySelector(".open-description");
    const menuDiv = task.querySelector(".menu-editing-save-delete");

    openDesc.classList.toggle("active");
    menuDiv.classList.toggle("active");
  }

  // Deletar task
  if (event.target.closest(".menu-editing-save-delete button img[src*='trash']")) {
    if (task.parentElement.classList.contains("liste-of-the-aplication") ||
        task.parentElement.classList.contains("liste-of-the-aplication-task-done")) {
      task.parentElement.removeChild(task);
    }

    deletedTaskList.appendChild(task);
    statusMenssagen("Task moved to Deleted Tasks!");
  }
});

// ======================================
// Controle de páginas
// ======================================
function showPage(selector) {
  document.querySelectorAll(".Hero, .Show-all-the-task, .Show-all-the-task-deleted, .Show-all-the-task-done")
    .forEach(page => {
      page.style.display = "none";
      page.classList.remove("active");
    });

  const page = document.querySelector(selector);
  page.style.display = selector === ".Hero" ? "grid" : "block";
  page.classList.add("active");
  closeSidebar();

  if (selector === ".Show-all-the-task") {
    const taskList = document.querySelector(".liste-of-the-aplication");
    const allTaskOnTheList = document.querySelector(".all-the-liste");
    allTaskOnTheList.innerHTML = "";
    const clonedList = taskList.cloneNode(true);
    allTaskOnTheList.appendChild(clonedList);
  }
}

document.querySelector(".btn-add-task-side-bar").addEventListener("click", () => showPage(".Hero"));
document.querySelector(".nav-add-task-btn").addEventListener("click", () => showPage(".Show-all-the-task"));
document.querySelector(".deleted-task").addEventListener("click", () => showPage(".Show-all-the-task-deleted"));

// ======================================
// Mensagem de status
// ======================================
function statusMenssagen(message) {
  const originalText = "Add a task!";
  successMessage.textContent = message;
  setTimeout(() => {
    successMessage.textContent = originalText;
  }, 3000);
}
