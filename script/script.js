// ======================================
// Seletores globais de inputs
// ======================================
const inputAddTask = document.querySelector(".input-add-task"); // Input do título da task
const inputDate = document.getElementById("date");              // Input de data
const descriptionOfTask = document.querySelector(".add-description"); // Textarea da descrição
const btnAddTask = document.querySelector("#btn-add-task");     // Botão principal

// Variável global para controlar se estamos editando alguma tarefa
let taskBeingEdited = null;

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
// Função para abrir/fechar descrição e menu de edição
// ======================================
function toggleDescription() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.closest(".btn-description")) {
      const task = event.target.closest("li");
      const openDesc = task.querySelector(".open-description");
      const menuDiv = task.querySelector(".menu-editing-save-delete");

      openDesc.classList.toggle("active");
      menuDiv.classList.toggle("active");
    }
  });
}
toggleDescription();

// ======================================
// Função para lidar com checkbox
// ======================================
function handleCheckbox() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkbox")) {
      const task = event.target.closest("li");
      const statusDiv = task.querySelector(".checkbox-status-description");
      const statusDateDiv = task.querySelector(".date");
      const statusIcon = task.querySelector(".status-date img");

      statusDiv.classList.toggle("background-list-checked");
      statusDateDiv.classList.toggle("background-list-checked");

      if (statusDiv.classList.contains("background-list-checked")) {
        statusIcon.src = "assets/icon/Asset 4@2000x.png"; // ícone marcado
      } else {
        if (statusDiv.classList.contains("status-red")) statusIcon.src = "assets/icon/Asset 2@2000x.png";
        else if (statusDiv.classList.contains("status-yellow")) statusIcon.src = "assets/icon/Asset 10@2000x.png";
        else statusIcon.src = "assets/icon/Asset 9@2000x.png";
      }
    }
  });
}
handleCheckbox();

// ======================================
// Função para capturar clique no botão editar
// ======================================
function handleEditTask() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.closest("button")?.querySelector("img")?.src.includes("041-notebook")) {
      const task = event.target.closest("li");

      // Pega os valores atuais da tarefa
      const title = task.querySelector(".checkbox-status-description p").textContent;
      const desc = task.querySelector(".show-description p").textContent;
      const date = task.querySelector(".date span").textContent;

      // Joga os valores nos inputs
      inputAddTask.value = title;
      descriptionOfTask.value = desc;
      inputDate.value = date;

      // Marca qual tarefa será editada
      taskBeingEdited = task;

      // Muda texto do botão para "Salvar edição"
      btnAddTask.textContent = "Salvar edição";
    }
  });
}
handleEditTask();

// ======================================
// Função para adicionar ou atualizar tarefa
// ======================================
function addTask() {
  btnAddTask.addEventListener("click", () => {
    const listOfTasks = document.getElementById("liste-of-the-aplication");

    // Caso seja edição de uma tarefa existente
    if (taskBeingEdited) {
      taskBeingEdited.querySelector(".checkbox-status-description p").textContent = inputAddTask.value;
      taskBeingEdited.querySelector(".show-description p").textContent = descriptionOfTask.value;
      taskBeingEdited.querySelector(".date span").textContent = inputDate.value;

      // Reaplica status da data para cores/ícones corretos
      applyTaskStatus(taskBeingEdited);

      console.log("Tarefa editada!");

      // Limpa inputs e reseta estado de edição
      inputAddTask.value = "";
      descriptionOfTask.value = "";
      setTodayAsValue();
      taskBeingEdited = null;

      // Volta o botão para "Adicionar"
      btnAddTask.textContent = "Adicionar";
      return;
    }

    // Caso seja uma nova tarefa
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
    // Menu de edição (ícones)
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
    setTodayAsValue();
  });
}
addTask();
