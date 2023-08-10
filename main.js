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
    console.log("operator");
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
function updateCurrentOperation() {
  currentOperation.textContent = operation;
}
