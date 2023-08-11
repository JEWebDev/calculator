// Screen Elements
const currentOperation = document.querySelector(".current-operation");
const previousOperation = document.querySelector(".previous-operation");
// Numpad Elements
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector(".delete-btn");
const resetBtn = document.querySelector(".reset-btn");
const equalBtn = document.querySelector(".equal-btn");

//Variables
let operation = "";
const regex = /\d+[\/\*\-+]{1}\d+/;
const operatorRegex = /[\/\*\-+]{1}/;

//Event Listeners
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const keyValue = e.target.dataset.value;
    buildOperation(keyValue);
  });
});
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const keyValue = e.target.dataset.value;
    let operationLastChar = operation[operation.length - 1];
    const operators = ["+", "-", "*", "/"];
    if (!operators.includes(operationLastChar)) {
      if (regex.test(operation)) {
        evaluateOperation();
        buildOperation(keyValue);
      } else {
        buildOperation(keyValue);
      }
    }
  });
});
deleteBtn.addEventListener("click", () => {
  deleteOneChar();
});
resetBtn.addEventListener("click", () => {
  reset();
});
equalBtn.addEventListener("click", () => {
  evaluateOperation();
});

// Functions
function buildOperation(key) {
  operation += key;
  updateCurrentOperation();
}
function sum(operand1, operand2) {
  return operand1 + operand2;
}
function subtract(operand1, operand2) {
  return operand1 - operand2;
}
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
function divide(operand1, operand2) {
  if (operand2 === 0) {
    error();
  } else {
    return operand1 / operand2;
  }
}
function evaluateOperation() {
  const getOperatorRegex = /\D/;
  let operand1 = 0;
  let operator = "";
  let operand2 = 0;
  let result = 0;
  if (regex.test(operation)) {
    operand1 = parseInt(operation.split(operatorRegex)[0]);
    operator = getOperatorRegex.exec(operation)[0];
    operand2 = parseInt(operation.split(operatorRegex)[1]);

    switch (operator) {
      case "+":
        result = sum(operand1, operand2);
        break;
      case "-":
        result = subtract(operand1, operand2);
        break;
      case "*":
        result = multiply(operand1, operand2);
        break;
      case "/":
        result = divide(operand1, operand2);
        break;
      default:
        break;
    }
    updatePreviousOperation(operation + "=");
    operation = result;
    updateCurrentOperation();
  }
}
function updateCurrentOperation() {
  currentOperation.textContent = operation;
}
function updatePreviousOperation(operation) {
  previousOperation.textContent = operation;
}
function deleteOneChar() {
  operation = operation.toString();
  let sliced = operation.slice(-1);
  if (!currentOperation === "Can't divide by zero") {
    if (operation.length <= 1) {
      operation = operation.replace(sliced, "");
      currentOperation.textContent = "0";
    } else {
      operation = operation.replace(sliced, "");
      updateCurrentOperation();
    }
  } else {
    currentOperation.textContent = "0";
    operation = "";
  }
}
function reset() {
  operation = "";
  currentOperation.textContent = operation + "0";
  updatePreviousOperation("");
}
function error() {
  console.log(currentOperation.textContent);
}
/*
! Add support for operations with float numbers
TODO: Change regex to accept integers and float numbers

! Add support for entering float numbers with period button
TODO: Logic to disable period button after one use

TODO: Future updates:
* Add keyboard support
* Fix Responsive design
* Add theme switch functionality
*/
