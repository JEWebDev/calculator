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
    if (regex.test(operation)) {
      evaluateOperation();
      buildOperation(keyValue);
    } else {
      buildOperation(keyValue);
    }
  });
});
deleteBtn.addEventListener("click", () => {
  console.log("Delete Button");
});
resetBtn.addEventListener("click", () => {
  console.log("Reset Button");
});
equalBtn.addEventListener("click", () => {
  console.log("Equal Button");
});

// Functions
function buildOperation(key) {
  operation += key;
  updateCurrentOperation();
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

    console.log(`${operand1} ${operator} ${operand2}`);
    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;
      case "/":
        result = operand1 / operand2;
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
