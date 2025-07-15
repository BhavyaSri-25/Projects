//7dd098952b9568042c1a2688
const calcExpression = document.getElementById('calcExpression');
const calcResult = document.getElementById('calcResult');
let expression = "";
let result = "";
const flipper = document.querySelector('.flip-container');
const toggleBtn = document.getElementById('toggleMode');

let showingCalculator = true;


toggleBtn.addEventListener('click', () => {
  flipper.classList.toggle('flip');
  showingCalculator = !showingCalculator;
  toggleBtn.textContent = showingCalculator
    ? "Switch to Converter"
    : "Switch to Calculator";

    document.body.classList.toggle('flip-bg');
});


function updateDisplay() {
  const exprText = expression === "" ? "0" : expression;
  calcExpression.innerHTML = `${exprText}<span class="cursor"></span>`;
  calcResult.textContent = result !== "" ? `= ${result}` : "";
}




// Calculator Logic
function append(char) {
  if (expression === "0" || result !== "") {
    expression = char;
    result = "";
  } else {
    expression += char;
  }
  updateDisplay();
}

function clearCalc() {
  expression = "";
  result = "";
  updateDisplay();
}

function backspace() {
  if (expression.length <= 1) {
    expression = "";
    result = "";
  } else {
    expression = expression.slice(0, -1);
    try {
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      expr = expr.replace(/([\d.]+)\s*%\s*([\d.]+)/g, '($1*($2/100))');

      result = eval(expr);
    } catch {
      result = "";
    }
  }
  updateDisplay();
}


function toggleSign() {
  if (expression.startsWith('-')) {
    expression = expression.slice(1);
  } else {
    expression = '-' + expression;
  }
  updateDisplay();
}

function calculate() {
  try {
    let expr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    expr = expr.replace(/([\d.]+)\s*%\s*([\d.]+)/g, '($1*($2/100))');

    result = eval(expr);
  } catch {
    result = "Error";
  }
  updateDisplay();
}

// Currency Converter Logic
function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultEl = document.getElementById("convResult");

  resultEl.textContent = "Converting…";

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Enter a valid amount.";
    return;
  }

  const apiKey = "7dd098952b9568042c1a2688";

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        const rate = data.conversion_rates[to];
        if (!rate) {
          resultEl.textContent = "Invalid target currency.";
          return;
        }
        const converted = amount * rate;
        resultEl.textContent =
          `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      } else {
        resultEl.textContent = "Conversion failed.";
        console.error("API error:", data);
      }
    })
    .catch(err => {
      console.error(err);
      resultEl.textContent = "Error fetching rates.";
    });
}



// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (showingCalculator) {
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
      append(key);
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Delete') {
      clearCalc();
    }
  }
});

// Initialize display
updateDisplay();


























//with comments

/*

//7dd098952b9568042c1a2688
const calcExpression = document.getElementById('calcExpression');
const calcResult = document.getElementById('calcResult');
let expression = "";
let result = "";
const flipper = document.querySelector('.flip-container');
const toggleBtn = document.getElementById('toggleMode');

let showingCalculator = true;

// Toggle between calculator & converter
toggleBtn.addEventListener('click', () => {
  flipper.classList.toggle('flip');
  showingCalculator = !showingCalculator;
  toggleBtn.textContent = showingCalculator
    ? "Switch to Converter"
    : "Switch to Calculator";

    document.body.classList.toggle('flip-bg');
});

// 🔷 Helper to update both lines

function updateDisplay() {
  const exprText = expression === "" ? "0" : expression;
  calcExpression.innerHTML = `${exprText}<span class="cursor"></span>`;
  calcResult.textContent = result !== "" ? `= ${result}` : "";
}




// Calculator Logic
function append(char) {
  if (expression === "0" || result !== "") {
    // start new expression after result
    expression = char;
    result = "";
  } else {
    expression += char;
  }
  updateDisplay();
}

function clearCalc() {
  expression = "";
  result = "";
  updateDisplay();
}

function backspace() {
  if (expression.length <= 1) {
    expression = "";
    result = "";
  } else {
    expression = expression.slice(0, -1);
    try {
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      expr = expr.replace(/([\d.]+)\s*%\s*([\d.]+)/g, '($1*($2/100))');

      result = eval(expr);
    } catch {
      result = "";
    }
  }
  updateDisplay();
}


function toggleSign() {
  if (expression.startsWith('-')) {
    expression = expression.slice(1);
  } else {
    expression = '-' + expression;
  }
  updateDisplay();
}

function calculate() {
  try {
    let expr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Replace `a % b` with `(a * (b/100))`
    expr = expr.replace(/([\d.]+)\s*%\s*([\d.]+)/g, '($1*($2/100))');

    result = eval(expr);
  } catch {
    result = "Error";
  }
  updateDisplay();
}

// Currency Converter Logic
function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultEl = document.getElementById("convResult");

  resultEl.textContent = "Converting…";

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Enter a valid amount.";
    return;
  }

  const apiKey = "7dd098952b9568042c1a2688";

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        const rate = data.conversion_rates[to];
        if (!rate) {
          resultEl.textContent = "Invalid target currency.";
          return;
        }
        const converted = amount * rate;
        resultEl.textContent =
          `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      } else {
        resultEl.textContent = "Conversion failed.";
        console.error("API error:", data);
      }
    })
    .catch(err => {
      console.error(err);
      resultEl.textContent = "Error fetching rates.";
    });
}



// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (showingCalculator) {
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
      append(key);
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Delete') {
      clearCalc();
    }
  }
});

// Initialize display
updateDisplay();

*/
