document.addEventListener("DOMContentLoaded", function() {
      
  });

view = {
    buttonContainer: document.querySelector(`#btns`),
    displayDiv: document.querySelector(`#res`),
    updateDisplay: function(input) {
        if (input == 'btn1') {
            this.displayDiv.textContent += '1';            
        } else if (input == 'btn0') {
            this.displayDiv.textContent += '0'; 
        } else if (input == 'Sum') {
            this.displayDiv.textContent += '+';
        } else if (input == 'Mul') {
            this.displayDiv.textContent += '*';
        } else if (input == 'Div') {
            this.displayDiv.textContent += '/';
        } else if (input == 'Sub') {
            this.displayDiv.textContent += '-';
        } else if (input == 'Eql') {
            this.displayDiv.textContent += '=';
        }     
    },
    displayResult: function(input) {
        this.clearDisplay();
        this.displayDiv.textContent = input;
    },
    clearDisplay: function() {
        this.displayDiv.textContent = '';
    }
}

handlers = {
    divClicked: function() {
        let clickedBtn = event.target;
        console.log(event);
        if (clickedBtn.id == 'btn1' || clickedBtn.id == 'btn0') {
            view.updateDisplay(clickedBtn.id);
        } else if (clickedBtn.id == 'btnClr') {
            view.clearDisplay();
        } else if (clickedBtn.className == 'operator') {
            dataStorage.operator = clickedBtn.id.slice(3);
            if (view.displayDiv.textContent != '') {
                dataStorage.operandFirst = view.displayDiv.textContent;
                view.updateDisplay(dataStorage.operator);
            }
        } else if (clickedBtn.id == 'btnEql') {
            if (view.displayDiv.textContent == '') {
                return;
            } else {
                if (dataStorage.parseExpression(view.displayDiv.textContent)) {
                    calculator.getResult()
                    view.displayResult(dataStorage.result);
                    dataStorage.resetStorage();
                } else {
                    console.log('Not a valid expression');
                }
                
            }
        }
    }
}

calculator = {
    getResult: function() {
        let result;
        switch(dataStorage.operator) {
            case 'Sum':
                result = this.calcSum();
                break;
            case 'Sub':
                result = this.calcSub();
                break;
            case 'Mul':
                result = this.calcMul();
                break;
            case 'Div':
                result = this.calcDiv();
                break;
        } 
        dataStorage.result = result;       
    },
    calcSum: function() {
        return 'Sum';
    },
    calcSub: function() {
        return 'Sub';        
    },
    calcMul: function() {
        return 'Mul';
    },
    calcDiv: function() {
        return 'Div';
    }
}


dataStorage = {
    result: undefined,
    operandFirst: undefined,
    operandSecond: undefined,
    operator: undefined,

    parseExpression: function(str) {
        let secondOperandArr = [];
        for (let i = 0; ; i++) {
            let currEl = str[str.length - i];
            if(currEl == '1' || currEl == '0') {
                secondOperandArr.unshift(currEl);                
            } else if(currEl == '+' || currEl == '-' || currEl == '/' || currEl == '*') {
                this.operandSecond = secondOperandArr.join('');
                break;
            }
            if(i > str.length - 1) {
                return false;
            }
        }
        return true;
    },

    resetStorage: function() {
        this.operator = undefined;
        this.result = undefined;
        this.operandFirst = undefined;
        this.operandSecond = undefined;
    },

    getObjectForCalc: function() {
        return {
            operandFirst: this.operandFirst,
            operandSecond: this.operandSecond,
            operator: this.operator,
            result: this.result
        }
    }
}

