
function openMenuSiseBar () {
  const btnMenuSideBar = document.querySelector("button#btn-open-menu-side-bar")
  const menuSidebar = document.querySelector("nav.menu-side-bar")
  console.log(btnMenuSideBar)
  console.log(menuSidebar)


  btnMenuSideBar.addEventListener("click",()=>{
    console.log("clicou")

    menuSidebar.classList.toggle("active")
  })
}
openMenuSiseBar()


function GetTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  console.log(`Hoje: ${day}/${month}/${year}`);

  function showStatusColor() {
    const statusGreen = document.querySelector("div.status");
    const statusDate = document.querySelector("div.date")
    console.log(statusGreen);

    // Data da tarefa (exemplo)
    let UserDay = 4;
    let UserMonth = 9;
    let UserYear = 2025;

    // Criar objetos de data
    const today = new Date(year, month - 1, day);
    const dueDate = new Date(UserYear, UserMonth - 1, UserDay);

    // Diferença em milissegundos
    const diffTime = dueDate - today;

    // Converter para dias
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(`Faltam ${diffDays} dias para a tarefa`);

    if (diffDays < 0) {
      console.log("Tarefa vencida! coloque uma cor vermelha");
      statusGreen.classList.add("status-red")
      statusDate.classList.add("status-red")

    } else if (diffDays <= 3) {
      console.log("Tarefa prestes a vencer! coloque a cor amarela");
      statusGreen.classList.add("status-yellow")
       statusDate.classList.add("status-yellow")
    
    } else {
      console.log("Tranquilo, você ainda tem tempo! coloque a cor verde");
      statusGreen.classList.add("status-green")
      statusDate.classList.add("status-green")
    }
  }

  showStatusColor();
}
GetTime();

function showDescription() {
  const openDescription = document.querySelector("div.open-description");
  const menuDescription = document.querySelector("div.menu-editing-save-delete")
  menuDescription.classList.add("test");
  console.log(menuDescription)
  const btnDescription = document.querySelector("button#btn-description");

  btnDescription.addEventListener("click", () => {
    openDescription.classList.toggle("active");

    menuDescription.classList.toggle("active"); 
  
   
      
    
  });
}
showDescription();

function checkBox () {
    const checkBox = document.querySelector("input#checkbox")
    console.log(checkBox)
    

    const listOfTheAplication = document.querySelector("ul#liste-of-the-aplication")
  
   
    console.log(listOfTheAplication)

   checkBox.addEventListener("click", () => {
listOfTheAplication.classList.toggle("background-js")
});
listOfTheAplication.classList.add("backfround-list")
}
checkBox ()

function addTask () {
 const btnAddTask = document.querySelector("button#btn-add-task")
        btnAddTask.addEventListener("click", ()=>{
          console.log("clicou")
        })
}

addTask()








