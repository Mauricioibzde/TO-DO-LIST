// ======================================
// Seletores globais de inputs
// ======================================
const inputAddTask = document.querySelector(".input-add-task"); // Input do título da task
const inputDate = document.getElementById("date");              // Input de data
const descriptionOfTask = document.querySelector(".add-description"); // Textarea da descrição

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
  inputDate.value = todayStr;              // Valor inicial: data de hoje
  inputDate.setAttribute("placeholder", todayStr); // Placeholder opcional
}
setTodayAsValue(); // Executa ao carregar a página

// ======================================
// Função para aplicar status de cores e ícones conforme data
// ======================================
function applyTaskStatus(task) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const statusDiv = task.querySelector(".checkbox-status-description");
  const statusDateDiv = task.querySelector(".date");
  const descriptionDiv = task.querySelector(".show-description");
  const menuDiv = task.querySelector(".menu-editing-save-delete");
  const statusIcon = task.querySelector(".status-date img");

  // Se o input estiver vazio, usar a data atual
  let inputValue = inputDate.value || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const [yyyy, mm, dd] = inputValue.split("-");
  const dueDate = new Date(yyyy, mm - 1, dd);
  dueDate.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  // Remove classes antigas
  statusDiv.classList.remove("status-red", "status-yellow", "status-green");
  statusDateDiv.classList.remove("status-red", "status-yellow", "status-green");
  descriptionDiv.classList.remove("status-red-dark", "status-yellow-dark", "status-green-dark");
  menuDiv.classList.remove("status-red-dark-bottom", "status-yellow-dark-bottom", "status-green-dark-bottom");

  // Aplica cores e troca ícone
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
// Função para adicionar nova task
// ======================================
function addTask() {
  const btnAddTask = document.querySelector("#btn-add-task");

  btnAddTask.addEventListener("click", () => {
    const listOfTasks = document.getElementById("liste-of-the-aplication");
    const newTask = document.createElement("li");

    // -----------------------------
    // Status-date
    // -----------------------------
    const statusDiv = document.createElement("div");
    const statusDateWrapper = document.createElement("div");
    statusDateWrapper.classList.add("status-date");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");

    const spanDate = document.createElement("span");
    // Exibe a data atual se o input estiver vazio
    spanDate.textContent = inputDate.value || new Date().toISOString().split("T")[0];

    const spanImg = document.createElement("span");
    const img = document.createElement("img");
    img.src = "assets/icon/Asset 10@2000x.png";
    spanImg.appendChild(img);

    dateDiv.append(spanDate, spanImg);
    statusDateWrapper.appendChild(dateDiv);
    statusDiv.appendChild(statusDateWrapper);

    // -----------------------------
    // Checkbox e título
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
    // Menu de edição (apenas ícones)
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
    // Monta o li completo
    // -----------------------------
    newTask.append(statusDiv, checkboxDiv, openDescDiv, menuDiv);
    listOfTasks.appendChild(newTask);

    console.log("Nova tarefa adicionada!");

    // Aplica cores e ícones conforme data
    applyTaskStatus(newTask);

    // Limpa inputs após adicionar
    inputAddTask.value = "";
    descriptionOfTask.value = "";
    setTodayAsValue(); // Reinsere a data atual no input
  });
}
addTask();

// ======================================
// Função para FECHAR a sidebar
// ======================================
function closeSidebar() {
  const toggle = document.getElementById("checkbox");
  const openMenu = document.querySelector(".menu-sidebar");

  openMenu.classList.remove("active"); // Esconde sidebar
  toggle.checked = false;              // Volta o botão principal para posição original
}

// ======================================
// Sidebar toggle
// ======================================
function openSideBar() {
  const toggle = document.getElementById("checkbox");
  toggle.addEventListener("change", () => {
    const openMenu = document.querySelector(".menu-sidebar");
    openMenu.classList.toggle("active");
    console.log("mudou");
  });
}
openSideBar();

// ======================================
// Delegação de eventos global
// ======================================
document.addEventListener("click", (event) => {
  // ✅ Checkboxes
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

  // ✅ Botão descrição
  if (event.target.closest(".btn-description")) {
    const task = event.target.closest("li");
    const openDesc = task.querySelector(".open-description");
    const menuDiv = task.querySelector(".menu-editing-save-delete");

    openDesc.classList.toggle("active");
    menuDiv.classList.toggle("active");
  }

  // ✅ Botão excluir
  if (event.target.closest(".menu-editing-save-delete button img[src*='trash']")) {
    const task = event.target.closest("li");
    task.remove();
    console.log("Tarefa excluída!");
  }
});

// ======================================
// Mostrar todas as tarefas
// ======================================
function showAllTheTask () {
  let btn_show_all_the_task = document.getElementById("nav-add-task-btn");

  btn_show_all_the_task.addEventListener("click", () => {
    const heroPage = document.querySelector(".Hero");
    const showAllSection = document.querySelector(".Show-all-the-task");
    const allTaskOnTheList = document.querySelector(".all-the-liste");
    const taskList = document.getElementById("liste-of-the-aplication");
    taskList.classList.toggle("height-of-the-all-the-liste");

    // Limpa a UL do "Show-all-the-task"
    allTaskOnTheList.innerHTML = "";

    // Clona a lista de tarefas (apenas HTML, sem listeners)
    const clonedList = taskList.cloneNode(true);
    allTaskOnTheList.appendChild(clonedList);

    // Esconde Hero e mostra AllTasks
    heroPage.classList.toggle("active");
    showAllSection.classList.toggle("active");

    console.log("Lista clonada para a seção 'All the Task'");

    // 🔥 Fecha sidebar e reseta botão
    closeSidebar();
  });
}
showAllTheTask();

// ======================================
// Mostrar página Hero
// ======================================
function showHeroPage () {
   const btn_add_task_nav = document.querySelector(".btn-add-task-side-bar");
   btn_add_task_nav.addEventListener("click",()=>{
      console.log("Add new task btn");

      // 🔥 Fecha sidebar e reseta botão
      closeSidebar();
   });
} 
showHeroPage();

// ======================================
// Mostrar página de tarefas deletadas
// ======================================
function showDeletedTaksPage () {
   const btn_show_task_deleted_nav = document.querySelector(".deleted-task");
   btn_show_task_deleted_nav.addEventListener("click",()=>{
      console.log("Deleted task btn");

      // 🔥 Fecha sidebar e reseta botão
      closeSidebar();
   });
} 
showDeletedTaksPage();
