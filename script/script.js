// Seletores globais de inputs
const input_add_task = document.querySelector(".input-add-task");
const input_Date = document.getElementById("date");
let description_of_the_task = document.querySelector(".add-description"); // CORRIGIDO: antes usava id errado

console.log(input_add_task);
console.log(input_Date);
console.log(description_of_the_task);

// Função para abrir/fechar menu lateral
function openMenuSiseBar() {
  const btnMenuSideBar = document.querySelector("#btn-open-menu-side-bar");
  const menuSidebar = document.querySelector(".menu-side-bar");

  btnMenuSideBar.addEventListener("click", () => {
    console.log("clicou");
    menuSidebar.classList.toggle("active");
  });
}
openMenuSiseBar();

// Função para verificar status da data
function GetTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  console.log(`Hoje: ${day}/${month}/${year}`);

  function showStatusColor() {
    const statusGreen = document.querySelector(".checkbox-status-description");
    const statusDate = document.querySelector("div.date");
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

    console.log(`Faltam ${diffDays} dias para a tarefa`);

    statusGreen.classList.remove("status-red", "status-yellow", "status-green");
    statusDate.classList.remove("status-red", "status-yellow", "status-green");

    if (diffDays < 0) {
      statusGreen.classList.add("status-red");
      statusDate.classList.add("status-red");
    } else if (diffDays <= 3) {
      statusGreen.classList.add("status-yellow");
      statusDate.classList.add("status-yellow");
    } else {
      statusGreen.classList.add("status-green");
      statusDate.classList.add("status-green");
    }
  }

  showStatusColor();
}

// CORRIGIDO: Delegação de eventos para abrir descrição
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

// CORRIGIDO: Delegação de eventos para checkboxes
function checkBox() {
  const taskList = document.querySelector("#liste-of-the-aplication");

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("checkbox")) {
      const task = event.target.closest("li");
      task.classList.toggle("backfround-list");
    }
  });
}
checkBox();

// Função para adicionar nova task
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
  });
}
addTask();
