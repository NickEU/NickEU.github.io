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
    
    if (allTogglesAreTrue === true)
      setAllToggles(this, false)
    else 
      setAllToggles(this, true)

    function setAllToggles(obj, value) {
      for (var i = 0; i < obj.list.length; i++)
        obj.list[i].completed = value;
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
      for ( var i = 0; i < todoList.childNodes.length; i++) {
        var checkbox = todoList.childNodes[i].querySelector('[type="checkbox"]');
        checkbox.checked = todo.list[i].completed;  
      }    
    },
  
    addNewLi: function() {
      var todoList = document.getElementById("todoList");
      var li = document.createElement('li');
      view.addCheckbox(li);
      view.addTextNode(li);
      view.addDeleteBtn(li);
      todoList.appendChild(li);
    },
    
    addCheckbox: function(li) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.list[todo.list.length - 1].completed;
      checkbox.addEventListener('click', function () {
        handlers.toggleOne(view.findElNumber(this.parentNode));
      });
      li.appendChild(checkbox);
    },
    
    addTextNode: function(li) {
      var todoText = document.createElement('span');
      var textNode = document.createTextNode(todo.list[todo.list.length - 1].todoText);
      todoText.addEventListener('dblclick', function(){
        var text = view.getChangedTodoValue(this.firstChild.nodeValue);
        var elNumber = view.findElNumber(this.parentNode);
        this.firstChild.nodeValue = text;
        handlers.changeItem(elNumber, text);
      });
      todoText.appendChild(textNode);
      li.appendChild(todoText);
    },
    
    addDeleteBtn: function(li) {
      var delButton = document.createElement('button');
      delButton.textContent = 'X';
      delButton.addEventListener('click', function () {
        handlers.delItem(view.findElNumber(this.parentNode));
        this.parentNode.parentNode.removeChild(this.parentNode);
      });
      li.appendChild(delButton);
    },
    
    getChangedTodoValue: function(todoText) {
      var userInput = prompt("Wanna change your list element?", todoText);
      
      if (userInput === "")
        return todoText;
      
      return userInput;
    },
  
    findElNumber: function (li) {
      var list = li.parentNode;
      for (var i = 0; i < list.childNodes.length; i++) {
        if (list.childNodes[i] === li)
          return i;
      }
    }
  }