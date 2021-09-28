// all variable Elements 
const todoForm = document.getElementById('todo-form');
const alert = document.getElementById('alert');
const todo = document.getElementById('todo');
const btnSubmit = document.getElementById('btn-submit');
const todoContainer = document.getElementById('todo-container');
const list = document.getElementById('todolist')
const item = document.getElementById('todo-item');
const btnClear = document.getElementById('btn-clear');

// program  variable
let editElement;
let editFlag = false;
let editId = '';
let id = new Date().getTime().toString();
let todoValue;
console.log(id);
// functions 
const addItem = function (e) {
  e.preventDefault();
  // console.log(e);
  todoValue = todo.value;  
  // console.log(todoValue);
  if (todoValue && !editFlag){
    const element = document.createElement('article');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
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

    // evenr listner of btn edit and delete inside the function 
    const btnEdit = element.querySelector('.btn-edit');
    btnEdit.addEventListener('click', editTask);
    const btnDelete = element.querySelector('.btn-delete');
    btnDelete.addEventListener('click', deleteTask);

 
    // append element to child
    list.appendChild(element);
    // show todoContainer 
    todoContainer.classList.add('show-container');
    btnClear.style.visibility = 'visible';
    showAlert('✌ Task Added to list' ,'success');
    setBackDefault();
  }else if(todoValue && editFlag){
    editElement.innerHTML = todoValue;
    showAlert('👍 Task name is updated', 'success' )
    setBackDefault();
  }else{
    showAlert(`🚫Enter your Task to add`, 'danger');
  }
}

// clear task btn function 
const clearList = function (e){
  e.preventDefault();
  const items = document.querySelectorAll('.todo-item');
  if (items.length > 0){
    items.forEach(item => {
      item.remove(item);
      showAlert('🚫 All Tasks deleted', 'success');
      todoContainer.classList.remove('show-container');
      btnClear.style.visibility = 'hidden';
      setBackDefault();
    });
  }else{
    showAlert('🚫 No Task to delete', 'danger');
  }
}

// edit task function 
const editTask = function(e){
  e.preventDefault();
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement.value);
  todo.value = editElement.innerText;
  editFlag = true;
  btnSubmit.textContent = 'Edit';
  // setBackDefault();
}
// delete task function
const deleteTask = function(e){
  e.preventDefault();
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  showAlert(`Task is deleted`, 'danger')
  if (list.children.length === 0){
    setBackDefault();
    btnClear.style.visibility = 'hidden';
  }
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
  btnSubmit.textContent = 'Submit';
  editFlag = false;
}
// Event Listerners
btnSubmit.addEventListener('click', addItem);
btnClear.addEventListener('click', clearList);
