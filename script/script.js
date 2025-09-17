// ======================================
// Seletores globais de inputs
// ======================================
const input_add_task = document.querySelector(".input-add-task"); // Input do título da task
const input_Date = document.getElementById("date"); // Input de data
const description_of_the_task = document.querySelector(".add-description"); // Textarea da descrição

// ======================================
// Função para setar data mínima e placeholder como hoje
// ======================================
function setTodayAsPlaceholder() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayStr = `${yyyy}-${mm}-${dd}`;

  input_Date.setAttribute("min", todayStr); // Impede datas passadas
  input_Date.value = todayStr;              // Valor inicial
  input_Date.setAttribute("placeholder", todayStr); // Placeholder
}
setTodayAsPlaceholder();

// ======================================
// Função para aplicar status de cores e ícones conforme data
// ======================================
function GetTime(task) {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const status_task_color = task.querySelector(".checkbox-status-description");
  const statusDate = task.querySelector(".date");
  const description = task.querySelector(".show-description");
  const menu_editing_save_delete = task.querySelector(".menu-editing-save-delete");
  const statusIcon = task.querySelector(".status-date img");

  const [yyyy, mm, dd] = input_Date.value.split("-");
  const today = new Date(year, month - 1, day);
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(yyyy, mm - 1, dd);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Limpa classes antigas
  status_task_color.classList.remove("status-red", "status-yellow", "status-green");
  statusDate.classList.remove("status-red", "status-yellow", "status-green");
  description.classList.remove("status-red-dark", "status-yellow-dark", "status-green-dark");
  menu_editing_save_delete.classList.remove("status-red-dark-bottom", "status-yellow-dark-bottom", "status-green-dark-bottom");

  // Aplica cores e troca ícone
  if (diffDays < 0) {
    status_task_color.classList.add("status-red");
    statusDate.classList.add("status-red");
    description.classList.add("status-red-dark");
    menu_editing_save_delete.classList.add("status-red-dark-bottom");
    statusIcon.src = "assets/icon/Asset 2@2000x.png";
  } else if (diffDays <= 3) {
    status_task_color.classList.add("status-yellow");
    statusDate.classList.add("status-yellow");
    description.classList.add("status-yellow-dark");
    menu_editing_save_delete.classList.add("status-yellow-dark-bottom");
    statusIcon.src = "assets/icon/Asset 10@2000x.png";
  } else {
    status_task_color.classList.add("status-green");
    statusDate.classList.add("status-green");
    description.classList.add("status-green-dark");
    menu_editing_save_delete.classList.add("status-green-dark-bottom");
    statusIcon.src = "assets/icon/Asset 9@2000x.png";
  }
}

// ======================================
// Função para abrir/fechar descrição e menu de edição
// ======================================
function showDescription() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.closest(".btn-description")) {
      const task = event.target.closest("li");
      const openDescription = task.querySelector(".open-description");
      const menuDescription = task.querySelector(".menu-editing-save-delete");

      openDescription.classList.toggle("active");
      menuDescription.classList.toggle("active");
    }
  });
}
showDescription();

// ======================================
// Função para lidar com checkbox
// ======================================
function checkBox() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkbox")) {
      const task = event.target.closest("li");
      const status_task_color = task.querySelector(".checkbox-status-description");
      const statusDate = task.querySelector(".date");
      const statusIcon = task.querySelector(".status-date img");

      status_task_color.classList.toggle("background-list-checked");
      statusDate.classList.toggle("background-list-checked");

      if (status_task_color.classList.contains("background-list-checked")) {
        statusIcon.src = "assets/icon/Asset 4@2000x.png"; // ícone marcado
      } else {
        if (status_task_color.classList.contains("status-red")) statusIcon.src = "assets/icon/Asset 2@2000x.png";
        else if (status_task_color.classList.contains("status-yellow")) statusIcon.src = "assets/icon/Asset 10@2000x.png";
        else statusIcon.src = "assets/icon/Asset 9@2000x.png";
      }
    }
  });
}
checkBox();

// ======================================
// Função para adicionar nova task
// ======================================
function addTask() {
  const btnAddTask = document.querySelector("#btn-add-task");

  btnAddTask.addEventListener("click", () => {
    const list_of_the_task = document.getElementById("liste-of-the-aplication");
    const new_element_task = document.createElement("li");

    // -----------------------------
    // Status-date
    // -----------------------------
    const statusDiv = document.createElement("div");
    const statusDateWrapper = document.createElement("div");
    statusDateWrapper.classList.add("status-date");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");

    const spanDate = document.createElement("span");
    spanDate.textContent = input_Date.value;

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
    pTitle.textContent = input_add_task.value;

    const btnDescription = document.createElement("button");
    btnDescription.classList.add("btn-description");
    const btnImg = document.createElement("img");
    btnImg.src = "assets/icon/011-copywriting.png";
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
    pDesc.textContent = description_of_the_task.value;

    showDescDiv.appendChild(pDesc);
    openDescDiv.appendChild(showDescDiv);

    // -----------------------------
    // Menu de edição
    // -----------------------------
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-editing-save-delete");

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    const btnSave = document.createElement("button");
    btnSave.textContent = "Salvar";
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Deletar";

    menuDiv.append(btnEdit, btnSave, btnDelete);

    // -----------------------------
    // Monta o li completo
    // -----------------------------
    new_element_task.append(statusDiv, checkboxDiv, openDescDiv, menuDiv);
    list_of_the_task.appendChild(new_element_task);

    console.log("Nova tarefa adicionada!");

    // Aplica cores e ícones
    GetTime(new_element_task);
  });
}
addTask();
