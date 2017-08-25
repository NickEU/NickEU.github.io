var todo = {
  list: [],

  addTodo: function(todoText) {
    this.list.push({
      todoText : todoText,
      completed : false,
    });
  },

  change: function(index, todoText) {
    this.list[index].todoText = todoText;
  },

  toggleCompleted: function(index) {
    var todo = this.list[index];
    todo.completed = !todo.completed;
  },
  
  toggleAll: function() {
    var allTogglesAreTrue = true;
   
    for (var i = 0; i < this.list.length; i++) {
       if (this.list[i].completed === false) {
         allTogglesAreTrue = false;
         break;
       }
    }

    if (allTogglesAreTrue)
      setAllToggles(this, false)
    else 
      setAllToggles(this, true)

    function setAllToggles(obj, value) {
      obj.list.forEach(function(element){
        element.completed = value;
      });
    }
  },
  
  delete: function(index) {
    this.list.splice(index, 1);
  },
};


var handlers = {
  toggleAll: function() {
    todo.toggleAll();
    view.updateCheckboxes();
  },
  toggleOne: function(index) {
    todo.toggleCompleted(index);
  },
  changeItem: function(index, todoText) {
    todo.change(index, todoText);
  },
  addItem: function() {
    var input = document.getElementById("inputField");
    todo.addTodo(input.value);
    input.value = "";
    view.addNewLi();
  },
  delItem: function(index) {
    todo.delete(index);
  }
}


var view = {
    updateCheckboxes: function() {
      var todoList = document.getElementById("todoList");

      todoList.childNodes.forEach(function (element, index) {
        var checkbox = element.querySelector('[type="checkbox"]');
        checkbox.checked = todo.list[index].completed;
      });    
    },
  
    addNewLi: function() {
      var todoList = document.getElementById("todoList");
      var li = document.createElement('li');
      li.id = todo.list.length - 1;
      view.addCheckbox(li);
      view.addTextNode(li);
      view.addDeleteBtn(li);
      todoList.appendChild(li);
    },
    
    addCheckbox: function(li) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.list[todo.list.length - 1].completed;
      li.appendChild(checkbox);
    },
    
    addTextNode: function(li) {
      var todoText = document.createElement('span');
      var textNode = document.createTextNode(todo.list[todo.list.length - 1].todoText);
      todoText.appendChild(textNode);
      li.appendChild(todoText);
    },
    
    addDeleteBtn: function(li) {
      var delButton = document.createElement('button');
      delButton.textContent = 'X';
      li.appendChild(delButton);
    },

    handleUserClick: function(event) {
      var clickedTag = event.target.tagName;
      var li = event.target.parentNode;
      if (clickedTag === "BUTTON")
        view.handleDelBtnClick(li);
      else if (clickedTag === "SPAN")
        view.handleTextClick(event.target);
      else if (clickedTag === "INPUT")
        view.handleCheckboxClick(li);    
    },

    handleDelBtnClick: function(li) {
      handlers.delItem(li.id);
      li.parentNode.removeChild(li);
      view.setProperIDs();
    },

    handleTextClick: function(span) {
      var text = view.getChangedTodoValue(span.firstChild.nodeValue);
      var id = span.parentNode.id;
      span.firstChild.nodeValue = text;
      handlers.changeItem(id,text);
    },

    handleCheckboxClick: function(li) {
      handlers.toggleOne(li.id);
    },

    getChangedTodoValue: function(todoText) {
      var userInput = prompt("Wanna change your list element?", todoText);
      
      if (userInput === "")
        return todoText;
      
      if (userInput === null)
        return todoText;
      
      return userInput;
    },
    
    setProperIDs: function() {
      var list = document.getElementById("todoList");
      for (var i = 0; i < list.childNodes.length; i++)
        list.childNodes[i].id = i;
    }
  }

  todoList.addEventListener('click', view.handleUserClick);