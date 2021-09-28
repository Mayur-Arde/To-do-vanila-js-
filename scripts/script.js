// all variable Elements 
const todoForm = document.getElementById('todo-form');
const alert = document.getElementById('alert');
const todo = document.getElementById('todo');
const btnSubmit = document.getElementById('btn-submit');
const todoContainer = document.getElementById('todo-container');
const list = document.getElementById('todolist')
const item = document.getElementById('todo-item');
const btnClear =document.getElementById('btn-clear');

// program  variable
let editElement;
let editFlag = false;
let editId = '';
let id = new Date().getTime().toString();
console.log(id);
// functions 
const addItem = function (e) {
  e.preventDefault();
  // console.log(e);
  const todoValue = todo.value;  
  // console.log(todoValue);
  if (todoValue && !editFlag){
    const element = document.createElement('article');
    element.classList.add('todo-item');
    element.innerHTML =`<p class="title" id="title">${todoValue}</p>
    <div class="button-conatiner">
      <button class="btn btn-edit" id="btn-edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn btn-delete" id="btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>`

    // append element to child
    list.appendChild(element);
    // show todoContainer 
    todoContainer.classList.add('show-container');
    btnClear.style.visibility = 'visible';
    showAlert('✌ Task Added to list' ,'success');
    setBackDefault();
  }else if(todoValue && editFlag){

  }else{
    showAlert(`🚫Enter your Task to add`, 'danger');
  }
}

const clearList = function (e){
  e.preventDefault();
  const items = document.querySelectorAll('.todo-item');
  items.forEach(item => {
    item.remove(item);
  });
  showAlert('All Tasks deleted', 'success');
  setBackDefault();
}

// show alert message function 
const showAlert = function(message, color){
  alert.innerText = message;
  alert.classList.add(color);
  setTimeout(() =>{
    alert.innerText = "";
    alert.classList.remove(color);
  },1000);
}

// fucntion reset back to default 
const setBackDefault = function (){
  todo.value = "";
}
// Event Listerners
btnSubmit.addEventListener('click', addItem);
btnClear.addEventListener('click', clearList);