// ===============================
// Seletores globais de inputs
// ===============================
const input_add_task = document.querySelector(".input-add-task");
const input_Date = document.getElementById("date");
let description_of_the_task = document.querySelector(".add-description"); // Corrigido: antes usava id errado

console.log(input_add_task);
console.log(input_Date);
console.log(description_of_the_task);

// ===============================
// Função para abrir/fechar menu lateral
// ===============================
/*function openMenuSiseBar() {
  const btnMenuSideBar = document.querySelector("#btn-open-menu-side-bar");
  const menuSidebar = document.querySelector(".menu-side-bar");

  btnMenuSideBar.addEventListener("click", () => {
    console.log("clicou");
    menuSidebar.classList.toggle("active");
  });
}
openMenuSiseBar();*/

// ===============================
// Função para verificar status da data e alterar ícone de forma dinâmica
// ===============================
function GetTime(task) {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  function showStatusColor() {
    // Pega elementos DENTRO da task clicada
    const status_task_color = task.querySelector(".checkbox-status-description");
    const statusDate = task.querySelector(".date");
    const description = task.querySelector(".show-description");
    const menu_editing_save_delete = task.querySelector(".menu-editing-save-delete");
    const statusIcon = task.querySelector(".status-date img"); // 🔥 ícone do calendário
    const input_Date = document.getElementById("date");

    if (!input_Date || !input_Date.value) {
      console.log("Nenhuma data escolhida ainda");
      return;
    }

    const [yyyy, mm, dd] = input_Date.value.split("-");
    const today = new Date(year, month - 1, day);
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(yyyy, mm - 1, dd);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Limpa classes anteriores
    status_task_color.classList.remove("status-red", "status-yellow", "status-green");
    statusDate.classList.remove("status-red", "status-yellow", "status-green");
    description.classList.remove("status-red-dark", "status-yellow-dark", "status-green-dark");
    menu_editing_save_delete.classList.remove("status-red-dark-bottom", "status-yellow-dark-bottom", "status-green-dark-bottom");

    // Aplica cores e troca ícones dinamicamente
    if (diffDays < 0) {
      status_task_color.classList.add("status-red");
      statusDate.classList.add("status-red");
      description.classList.add("status-red-dark");
      menu_editing_save_delete.classList.add("status-red-dark-bottom");
      statusIcon.src = "assets/icon/Asset 2@2000x.png"; // ícone vermelho
    } else if (diffDays <= 3) {
      status_task_color.classList.add("status-yellow");
      statusDate.classList.add("status-yellow");
      description.classList.add("status-yellow-dark");
      menu_editing_save_delete.classList.add("status-yellow-dark-bottom");
      statusIcon.src = "assets/icon/Asset 10@2000x.png"; // ícone amarelo
    } else {
      status_task_color.classList.add("status-green");
      statusDate.classList.add("status-green");
      description.classList.add("status-green-dark");
      menu_editing_save_delete.classList.add("status-green-dark-bottom");
      statusIcon.src = "assets/icon/Asset 9@2000x.png"; // ícone verde
    }
  }

  showStatusColor();
}

// ===============================
// Bloqueia datas passadas no input e seta data de hoje
// ===============================
function setTodayAsPlaceholder() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayStr = `${yyyy}-${mm}-${dd}`;

  input_Date.setAttribute("min", todayStr);
  input_Date.value = todayStr;
  input_Date.setAttribute("placeholder", todayStr);
}
setTodayAsPlaceholder();

// ===============================
// Abrir descrição
// ===============================
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

// ===============================
// Checkboxes
// ===============================
function checkBox() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkbox")) {
      const task = event.target.closest("li");
      const status_task_color = task.querySelector(".checkbox-status-description");
      const statusDate = task.querySelector(".date");
      const statusIcon = task.querySelector(".status-date img"); // 🔥 precisa estar dentro da task

      status_task_color.classList.toggle("background-list-checked");
      statusDate.classList.toggle("background-list-checked");

      // Altera ícone quando a checkbox for marcada/desmarcada
      if (status_task_color.classList.contains("background-list-checked")) {
        statusIcon.src = "assets/icon/Asset 4@2000x.png"; // ícone marcado
      } else {
        // Retorna ao ícone padrão da cor da task
        if (status_task_color.classList.contains("status-red")) statusIcon.src = "assets/icon/Asset 2@2000x.png";
        else if (status_task_color.classList.contains("status-yellow")) statusIcon.src = "assets/icon/Asset 10@2000x.png";
        else statusIcon.src = "assets/icon/Asset 9@2000x.png"; // verde
      }
    }
  });
}
checkBox();

// ===============================
// Adicionar nova task
// ===============================
function addTask() {
  const btnAddTask = document.querySelector("#btn-add-task");
  btnAddTask.addEventListener("click", () => {
    const list_of_the_task = document.getElementById("liste-of-the-aplication");
    const new_element_task = document.createElement("li");

    new_element_task.innerHTML = `
      <div>
        <div class="status-date">
          <div class="date">
            <span>${input_Date.value}</span>
            <span><img src="assets/icon/Asset 10@2000x.png" alt=""></span>
          </div>
        </div>
      </div>
      <div class="checkbox-status-description">
        <input type="checkbox" class="checkbox">
        <p>${input_add_task.value}</p>
        <button class="btn-description"><img src="assets/icon/011-copywriting.png" alt=""></button>
      </div>
      <div class="open-description display-none">
        <div class="show-description">
          <p>${description_of_the_task.value}</p>
        </div>
      </div>
      <div class="menu-editing-save-delete">
        <button>Editar</button>
        <button>Salvar</button>
        <button>Deletar</button>
      </div>
    `;

    list_of_the_task.appendChild(new_element_task);
    console.log("Nova tarefa adicionada!");

    // Aplica cores e ícones dinamicamente
    GetTime(new_element_task);
  });
}
addTask();
