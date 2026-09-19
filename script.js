let currentNumber = "";
let previousNumber = "";
let operator = null;

const display = document.getElementById("display");
const history = document.getElementById("history");

function updateDisplay() {
  display.textContent = currentNumber || "0";
}

function appendNumber(number) {
  if (number === "." && currentNumber.includes(".")) {
    return;
  }

  if (currentNumber === "0" && number !== ".") {
    currentNumber = "";
  }

  currentNumber += number;
  updateDisplay();
}

function chooseOperator(selectedOperator) {
  if (currentNumber === "" && previousNumber === "") {
    return;
  }

  if (currentNumber !== "") {
    if (previousNumber !== "") {
      calculate();
    }

    previousNumber = currentNumber;
    currentNumber = "";
  }

  operator = selectedOperator;
  history.textContent = previousNumber + " " + operator;
}

function calculate() {
  if (previousNumber === "" || currentNumber === "" || operator === null) {
    return;
  }

  const first = parseFloat(previousNumber);
  const second = parseFloat(currentNumber);

  let result;

  if (operator === "+") {
    result = first + second;
  } else if (operator === "-") {
    result = first - second;
  } else if (operator === "×") {
    result = first * second;
  } else if (operator === "÷") {
    if (second === 0) {
      display.textContent = "Error";
      currentNumber = "";
      previousNumber = "";
      operator = null;
      history.textContent = "";
      return;
    }

    result = first / second;
  }

  history.textContent = `${first} ${operator} ${second} =`;

  currentNumber = String(
    Number.isInteger(result) ? result : parseFloat(result.toFixed(10))
  );

  previousNumber = "";
  operator = null;

  updateDisplay();
}

function clearCalculator() {
  currentNumber = "";
  previousNumber = "";
  operator = null;

  display.textContent = "0";
  history.textContent = "";
}

function deleteLast() {
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay();
}

function percentage() {
  if (currentNumber === "") {
    return;
  }

  currentNumber = String(parseFloat(currentNumber) / 100);
  updateDisplay();
}

document.addEventListener("keydown", function(event) {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
  }

  if (event.key === ".") {
    appendNumber(".");
  }

  if (event.key === "+") {
    chooseOperator("+");
  }

  if (event.key === "-") {
    chooseOperator("-");
  }

  if (event.key === "*") {
    chooseOperator("×");
  }

  if (event.key === "/") {
    chooseOperator("÷");
  }

  if (event.key === "Enter" || event.key === "=") {
    calculate();
  }

  if (event.key === "Backspace") {
    deleteLast();
  }

  if (event.key === "Escape") {
    clearCalculator();
  }

  if (event.key === "%") {
    percentage();
  }
});
