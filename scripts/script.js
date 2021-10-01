// all variable Elements
const todoForm = document.getElementById('todo-form');
const alert = document.getElementById('alert');
const todo = document.getElementById('todo');
const btnSubmit = document.getElementById('btn-submit');
const todoContainer = document.getElementById('todo-container');
const list = document.getElementById('todolist');
const item = document.getElementById('todo-item');
const btnClear = document.getElementById('btn-clear');

// program  variable
let editElement;
let editFlag = false;
let editId = '';
let id = new Date().getTime().toString();


// local Storage
const addToLocalStorage = function (id, value) {
  const todo = { id: id, value: value };
  let items = localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
  items.push(todo);
  localStorage.setItem('list', JSON.stringify(items));
};

const removeLocalStorage = function (id) {
  let items = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  items = items.filter(item => item.id !== id);
  localStorage.setItem('list', JSON.stringify(items));
};

const editLocalStorage = function(id, value){
  let items = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  items = items.map((item)=>{
    if (item.id === id){
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
};

const createListItem = function(id , value){
  const element = document.createElement('article');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add('todo-item');
    element.innerHTML = `<p class="title" id="title">${value}</p>
    <div class="button-conatiner">
      <button class="btn btn-edit" id="btn-edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn btn-delete" id="btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

    // evenr listner of btn edit and delete inside the function
    const btnEdit = element.querySelector('.btn-edit');
    btnEdit.addEventListener('click', editTask);
    const btnDelete = element.querySelector('.btn-delete');
    btnDelete.addEventListener('click', deleteTask);
    const taskDone = element.querySelector('.title');
    taskDone.addEventListener('click', completedTask);
    // append element to child
    list.appendChild(element);  
};

const populateList = function(){
  let items = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  if(items.length > 0){
    items.forEach(item=> createListItem(item.id,item.value));
    btnClear.style.visibility = 'hidden';
  }
  todoContainer.classList.add('show-container');
  // btnClear.style.visibility = 'visible';
}

const addItem = function (e) {
  let id = new Date().getTime().toString();
  e.preventDefault();
  todoValue = todo.value;

  if (todoValue && !editFlag) {
    createListItem(id, todoValue);
    // show todoContainer
    todoContainer.classList.add('show-container');
    btnClear.style.visibility = 'visible';
    showAlert('✌ Task Added to list', 'success');
    addToLocalStorage(id, todoValue);
    setBackDefault();
  } else if (todoValue && editFlag) {
    editElement.innerHTML = todoValue;
    showAlert('👍 Task name is updated', 'success');
    editLocalStorage(editId, todoValue);
    setBackDefault();
  } else {
    showAlert(`🚫Enter your Task to add`, 'danger');
  }
};

// clear task btn function
const clearList = function (e) {
  e.preventDefault();
  const items = document.querySelectorAll('.todo-item');
  if (items.length > 0) {
    items.forEach((item) => {
      item.remove(item);
      showAlert('🚫 All Tasks deleted', 'success');
      todoContainer.classList.remove('show-container');
      btnClear.style.visibility = 'hidden';
      localStorage.removeItem('list');
      setBackDefault();
    });
  } else {
    showAlert('🚫 No Task to delete', 'danger');
  }
};

// fucntion completedTask
const completedTask = function (e) {
  e.preventDefault();
  const para = e.currentTarget;
  para.classList.toggle('task-done');
  setBackDefault();
};

// edit task function
const editTask = function (e) {
  e.preventDefault();
  const element = e.currentTarget.parentElement.parentElement;
  editId = element.dataset.id;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  todo.value = editElement.innerHTML;
  editFlag = true;
  btnSubmit.textContent = 'Edit';
  btnClear.style.visibility = 'visible';  
};

// delete task function
const deleteTask = function (e) {
  // e.preventDefault();

  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if(list.children.length === 0){
    todoContainer.classList.remove('show-container');
    btnClear.style.visibility = 'hidden';
  }
  showAlert('Task removed','danger');
  btnClear.style.visibility = 'visiable';
  removeLocalStorage(id);
  setBackDefault();
};

// show alert message function
const showAlert = function (message, color) {
  alert.innerText = message;
  alert.style.visibility = 'visible';
  alert.classList.add(color);
  setTimeout(() => {
    alert.innerText = '';
    alert.style.visibility = 'hidden';
    alert.classList.remove(color);
  }, 1000);
};

// fucntion reset back to default
const setBackDefault = function () {
  todo.value = '';
  btnSubmit.textContent = 'Submit';
  editFlag = false;
};


// Event Listerners
btnSubmit.addEventListener('click', addItem);
btnClear.addEventListener('click', clearList);
window.addEventListener('DOMContentLoaded',populateList);
