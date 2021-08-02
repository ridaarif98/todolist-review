import addEventsDragAndDrop from './sorting.js';

let collection = [];
const form = document.getElementById('addTodo');

function stausCheck(ev) {
  const buttonId = ev.target.id;
  const dataGet = localStorage.getItem('todoObject');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  const rtest = collection[collection.findIndex((x) => x.id === parseInt(buttonId, 10))];
  const last = collection.indexOf(rtest);
  if (collection[last].complete === false) {
    collection[last].complete = true;
  } else {
    collection[last].complete = false;
  }
  localStorage.setItem('todoObject', JSON.stringify(collection));
}

function ShowList(arr) {
  const listBook = arr.map((b) => `
  <ul class="testList1" draggable="true">
        <li><input type="checkbox" id='${b.id}' value='${b.complete}' class="checkboX" ${b.complete ? 'checked' : 'unchecked'}>
        <p>${b.title}</p>
        </li>
        <i class=" fa fa-ellipsis-v" id='${b.id}'></i>
        <i class="fa fa-trash-o" id='${b.id}'></i>          
    </ul>
   `).join('');
  document.getElementById('showListItem').innerHTML = `${listBook}`;
  const test = document.querySelectorAll('.testList1');
  test.forEach((li) => {
    addEventsDragAndDrop(li);
  });
}

function addList() {
  const todo = {
    id: collection.length,
    title: document.getElementById('todotitle').value,
    complete: false,
  };
  collection.push(todo);
  localStorage.setItem('todoObject', JSON.stringify(collection));
  if (collection.length > 0) {
    ShowList(collection);
  }
  form.reset();
}

function editList(ev) {
  const buttonId = ev.target.id;
  const dataGet = localStorage.getItem('todoObject');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  const rtest = collection[collection.findIndex((x) => x.id === parseInt(buttonId, 10))];
  const last = collection.indexOf(rtest);
  const test = ev.target.parentNode;
  const editInput = test.querySelector('p');
  editInput.contentEditable = true;
  editInput.classList.add('test');
  const a = test.querySelector('.fa-ellipsis-v');
  a.style.display = 'none';
  const b = test.querySelector('.fa-trash-o');
  b.style.display = 'block';
  collection[last].title = editInput.innerHTML;

  editInput.addEventListener('keyup', () => {
    collection[last].title = editInput.innerHTML;
    localStorage.setItem('todoObject', JSON.stringify(collection));
  });
}

function removeTodo(ev) {
  const buttonId = ev.target.id;
  collection = collection.filter(
    (y) => y !== collection[collection.findIndex(
      (x) => x.id === parseInt(buttonId, 10),
    )],
  );
  collection = collection.map((el, id) => ({ ...el, id }));
  localStorage.setItem('todoObject', JSON.stringify(collection));
  ShowList(collection);
}

function removeCompleted() {
  collection = collection.filter((y) => !y.complete).map((y, id) => ({ ...y, id }));
  localStorage.setItem('todoObject', JSON.stringify(collection));
  ShowList(collection);
}

window.addEventListener('load', () => {
  const dataGet = localStorage.getItem('todoObject');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  if (collection.length > 0) {
    ShowList(collection);
  }
});

export {
  addList, stausCheck, editList, removeTodo, removeCompleted,
};