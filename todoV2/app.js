document.addEventListener("DOMContentLoaded", function() {
  view.displayTodos();
  domElements.userInputField.focus();  
});

let todos = {
  list: [
    {text:'Solve a HackerRank challenge',
      completed: false},
    {text:'Progress through the FCC curriculum',
      completed: false},
    {text:'Make a new version of my TODO app',
      completed: true}  ],

  addItem: function(item, bool = false) {
    this.list.push({text: item, completed: bool});
    view.displayTodos();
  },
  changeItem: function(index, newText) {
    this.list[index].text = newText; 
    view.displayTodos();
  },
  deleteItem: function(index) {
    this.list.splice(index,1);
    view.displayTodos();
  },
  toggleCompleted: function(index) {
    let todoItem = this.list[index];
    todoItem.completed = !todoItem.completed;
    view.displayTodos();
  },
  toggleAll: function() {
    let allAreTrue = true;
    for(let i = 0; i < this.list.length; i++) {
      if (!this.list[i].completed) {
        this.list[i].completed = true;
        allAreTrue = false;
      }
    }
    if (allAreTrue) {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].completed = false;
      }
    }
    view.displayTodos();
  }
};

let view = {
  editModeOn: false,
  itemBeingEdited: 0,
  displayTodos: function() {
    domElements.userInputField.value = ''
    domElements.captionHdr.textContent = '';
    let listEl = document.querySelector('div #todoList');
    listEl.onclick = handlers.listClicked;
    listEl.innerHTML = '';
    if (todos.list.length === 0) {
      domElements.captionHdr.textContent = 'The list is empty!';
    } else {
      domElements.captionHdr.textContent += 'Things to do: ';
      for (let i = 0; i < todos.list.length; i++) {
        let liElChild = document.createElement('LI');
        liElChild.id = i;

        let checkMark = todos.list[i].completed ? 'X' : '   '; 
        liElChild.appendChild(domElements.createToggleSpan(document.createTextNode(`[${checkMark}]`)));
        liElChild.appendChild(document.createTextNode(`${todos.list[i].text}  `));

        liElChild.appendChild(domElements.createDelButton());
        listEl.appendChild(liElChild);
      }
    }
  }
}

let domElements = {
  textField: document.querySelector('#divTextDisplay'),
  userInputField: document.querySelector('#userInputField'),
  captionHdr: document.querySelector('#captionHeader'),
  createDelButton: function() {
    let btn = document.createElement("button");
    var text = document.createTextNode("Delete");
    btn.appendChild(text);
    btn.classList.add('delButton');
    return btn;    
  },
  createToggleSpan: function(textNode) {
    let span = document.createElement('span');
    span.classList.add('toggleTxt');
    span.appendChild(textNode);
    return span;
  }
}

let handlers = {
  listClicked: function(event) {
    let id = Number(event.target.parentNode.id);
    if (event.target.className == 'delButton') {
      todos.deleteItem(id);
    } else if (event.target.className == 'toggleTxt') {
      todos.toggleCompleted(id);
    } else {
      let todoText = todos.list[event.target.id].text;
      domElements.userInputField.value = todoText;
      view.itemBeingEdited = event.target.id;
      view.editModeOn = true;
      view.editedId = event.target.id;
    }
    domElements.userInputField.focus();
  },
  processKbInput: function() {
    let e = window.event;
    if (e.target.id == 'userInputField' && e.code == 'Enter') {
      if (view.editModeOn) {
        view.editModeOn = false;
        if (domElements.userInputField.value == '') {
          todos.deleteItem(view.editedId);
        } else {
          todos.changeItem(Number(view.itemBeingEdited), domElements.userInputField.value);
        }
      } else {
        todos.addItem(domElements.userInputField.value);
      }            
    }
  },
  toggleAll: function() {
    todos.toggleAll();     
  }
};
