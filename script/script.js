// ======================================
// Seletores globais
// ======================================
const inputAddTask = document.querySelector(".input-add-task");       // Input título da task
const inputDate = document.getElementById("date");                    // Input de data
const descriptionOfTask = document.querySelector(".add-description"); // Textarea descrição
const deletedTaskList = document.querySelector(".deleted-task-list"); // UL das tarefas deletadas

// ======================================
// Função para setar a data atual no input
// ======================================
function setTodayAsValue() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayStr = `${yyyy}-${mm}-${dd}`;
  inputDate.setAttribute("min", todayStr); // Impede datas passadas
  inputDate.value = todayStr;              // Valor inicial = hoje
}
setTodayAsValue();

// ======================================
// Função que define cor/ícone conforme a data
// ======================================
function applyTaskStatus(task) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const statusDiv = task.querySelector(".checkbox-status-description");
  const statusDateDiv = task.querySelector(".date");
  const descriptionDiv = task.querySelector(".show-description");
  const menuDiv = task.querySelector(".menu-editing-save-delete");
  const statusIcon = task.querySelector(".status-date img");

  // Pega data da task
  let inputValue = inputDate.value || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const [yyyy, mm, dd] = inputValue.split("-");
  const dueDate = new Date(yyyy, mm - 1, dd);

  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  // Reseta classes
  statusDiv.classList.remove("status-red", "status-yellow", "status-green");
  statusDateDiv.classList.remove("status-red", "status-yellow", "status-green");

  // Define status visual
  if (diffDays < 0) {
    statusDiv.classList.add("status-red");
    statusDateDiv.classList.add("status-red");
    descriptionDiv.classList.add("status-red-dark");
    menuDiv.classList.add("status-red-dark-bottom");
    statusIcon.src = "assets/icon/Asset 2@2000x.png"; // atrasada
  } else if (diffDays <= 3) {
    statusDiv.classList.add("status-yellow");
    statusDateDiv.classList.add("status-yellow");
    descriptionDiv.classList.add("status-yellow-dark");
    menuDiv.classList.add("status-yellow-dark-bottom");
    statusIcon.src = "assets/icon/Asset 10@2000x.png"; // prazo curto
  } else {
    statusDiv.classList.add("status-green");
    statusDateDiv.classList.add("status-green");
    descriptionDiv.classList.add("status-green-dark");
    menuDiv.classList.add("status-green-dark-bottom");
    statusIcon.src = "assets/icon/Asset 9@2000x.png"; // ok
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

    // -----------------------------
    // Status + data
    // -----------------------------
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

    // -----------------------------
    // Checkbox + título + botão descrição
    // -----------------------------
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

    // -----------------------------
    // Descrição
    // -----------------------------
    const openDescDiv = document.createElement("div");
    openDescDiv.classList.add("open-description", "display-none");

    const showDescDiv = document.createElement("div");
    showDescDiv.classList.add("show-description");

    const pDesc = document.createElement("p");
    pDesc.textContent = descriptionOfTask.value;

    showDescDiv.appendChild(pDesc);
    openDescDiv.appendChild(showDescDiv);

    // -----------------------------
    // Menu de edição (editar/deletar)
    // -----------------------------
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

    // -----------------------------
    // Monta o li final
    // -----------------------------
    newTask.append(statusDiv, checkboxDiv, openDescDiv, menuDiv);
    listOfTasks.appendChild(newTask);

    // Aplica status visual
    applyTaskStatus(newTask);

    // Limpa inputs
    inputAddTask.value = "";
    descriptionOfTask.value = "";
    setTodayAsValue();
  });
}
addTask();

// ======================================
// Sidebar toggle
// ======================================
function closeSidebar() {
  const toggle = document.getElementById("checkbox");
  const openMenu = document.querySelector(".menu-sidebar");
  openMenu.classList.remove("active");
  toggle.checked = false;
}
function openSideBar() {
  const toggle = document.getElementById("checkbox");
  toggle.addEventListener("change", () => {
    const openMenu = document.querySelector(".menu-sidebar");
    openMenu.classList.toggle("active");
  });
}
openSideBar();

// ======================================
// Delegação de eventos (checkbox, descrição, deletar)
// ======================================
document.addEventListener("click", (event) => {
  // ✅ Marcar/desmarcar checkbox
  if (event.target.classList.contains("checkbox")) {
    const task = event.target.closest("li");
    const statusDiv = task.querySelector(".checkbox-status-description");
    const statusDateDiv = task.querySelector(".date");
    const statusIcon = task.querySelector(".status-date img");

    statusDiv.classList.toggle("background-list-checked");
    statusDateDiv.classList.toggle("background-list-checked");

    if (statusDiv.classList.contains("background-list-checked")) {
      statusIcon.src = "assets/icon/Asset 4@2000x.png"; // marcado
    } else {
      if (statusDiv.classList.contains("status-red")) statusIcon.src = "assets/icon/Asset 2@2000x.png";
      else if (statusDiv.classList.contains("status-yellow")) statusIcon.src = "assets/icon/Asset 10@2000x.png";
      else statusIcon.src = "assets/icon/Asset 9@2000x.png";
    }
  }

  // ✅ Botão de descrição → expandir/retrair
  if (event.target.closest(".btn-description")) {
    const task = event.target.closest("li");
    const openDesc = task.querySelector(".open-description");
    const menuDiv = task.querySelector(".menu-editing-save-delete");

    openDesc.classList.toggle("active");
    menuDiv.classList.toggle("active");
  }

  // ✅ Botão deletar → mover para lista de deletados
  if (event.target.closest(".menu-editing-save-delete button img[src*='trash']")) {
    const task = event.target.closest("li");
    deletedTaskList.appendChild(task); // move para lista de deletados
    console.log("Tarefa movida para deletados!");
  }
});

// ======================================
// Controle de páginas (Hero, All, Deleted)
// ======================================

// 🔹 Esconde todas as páginas
function hideAllPages() {
  document.querySelector(".Hero").classList.remove("active");
  document.querySelector(".Show-all-the-task").classList.remove("active");
  document.querySelector(".Show-all-the-task-deleted").classList.remove("active");

  document.querySelector(".Hero").style.display = "none";
  document.querySelector(".Show-all-the-task").style.display = "none";
  document.querySelector(".Show-all-the-task-deleted").style.display = "none";
}

// 🔹 Mostrar todas as tarefas
function showAllTheTask() {
  const btn_show_all_the_task = document.querySelector(".nav-add-task-btn");
  btn_show_all_the_task.addEventListener("click", () => {
    hideAllPages();

    const showAllSection = document.querySelector(".Show-all-the-task");
    showAllSection.classList.add("active");
    showAllSection.style.display = "block";

    // Clona lista principal para exibir
   

    closeSidebar();
  });
}
showAllTheTask();

// 🔹 Mostrar página Hero (Add new task)
function showHeroPage() {
  const btn_add_task_nav = document.querySelector(".btn-add-task-side-bar");
  btn_add_task_nav.addEventListener("click", () => {
    hideAllPages();

    const hero = document.querySelector(".Hero");
    hero.classList.add("active");
    hero.style.display = "grid";

    closeSidebar();
  });
}
showHeroPage();

// 🔹 Mostrar Deleted (tarefas excluídas)
function showDeletedTaksPage() {
  const btn_show_task_deleted_nav = document.querySelector(".deleted-task");
  btn_show_task_deleted_nav.addEventListener("click", () => {
    hideAllPages();

    const deletedSection = document.querySelector(".Show-all-the-task-deleted");
    deletedSection.classList.add("active");
    deletedSection.style.display = "block";

    closeSidebar();
  });
}
showDeletedTaksPage();
