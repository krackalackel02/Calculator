let currentOp = document.getElementById("current-operand");
let previousOp = document.getElementById("previous-operand");

let previousSum = previousOp.innerHTML;

let buttons = Array.from(document.querySelectorAll(".btn"));
buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		let numeric = e.target.innerHTML;
		if (e.button !== 0) return;
		switch (numeric) {
			case "AC":
				previousOp.innerHTML = "";
				currentOp.innerHTML = "";
				break;
			case "DEL":
				previousOp.innerHTML = previousOp.innerHTML.replace(/\S\s*$/, "");
				break;
			case "÷":
				numeric = "/";
				previousOp.innerHTML += numeric;

				break;
			case "×":
				numeric = "*";
				previousOp.innerHTML += numeric;

				break;
			case "−":
				numeric = "-";
				previousOp.innerHTML += numeric;

				break;
			case "=":
				let operation = removeCommasFromNumber(previousOp.innerHTML);
				currentOp.innerHTML = evaluateExpression(operation)
				break;
			default:
				previousOp.innerHTML += numeric;
				break;
		}
		currentOp.innerHTML = addCommasToNumber(currentOp.innerHTML);
		previousOp.innerHTML = addCommasToNumber(previousOp.innerHTML);
	});
});

function removeCommasFromNumber(numberString) {
	return numberString.replace(/,/g, "");
}

function addCommasToNumber(numberString) {
	numberString = removeCommasFromNumber(numberString);
	// Match any sequence of three digits followed by a non-digit character
	const regex = /\B(?=(\d{3})+(?!\d))/g;

	// Insert commas after every match
	return numberString.replace(regex, ",");
}

function evaluateExpression(expression) {
	let numbers = expression.match(/\d+/g);
	let operators = expression.match(/[+\/*-]/g);
  
	// Perform the evaluation using the order of operations (BODMAS/BEDMAS)
	let result = null;
  
	// Perform multiplication and division first
	for (let i = 0; i < operators.length; i++) {
	  if (operators[i] === '*' || operators[i] === '/') {
		let num1 = parseFloat(numbers[i]);
		let num2 = parseFloat(numbers[i + 1]);
  
		if (operators[i] === '*') {
		  result = num1 * num2;
		} else if (operators[i] === '/') {
		  result = num1 / num2;
		}
  
		// Update the numbers and operators arrays
		numbers.splice(i, 2, result.toString());
		operators.splice(i, 1);
		i--; // Decrement i to account for the removed elements
	  }
	}
  
	// Perform addition and subtraction
	for (let i = 0; i < operators.length; i++) {
	  let num1 = parseFloat(numbers[i]);
	  let num2 = parseFloat(numbers[i + 1]);
  
	  if (operators[i] === '+') {
		result = num1 + num2;
	  } else if (operators[i] === '-') {
		result = num1 - num2;
	  }
  
	  // Update the numbers and operators arrays
	  numbers.splice(i, 2, result.toString());
	  operators.splice(i, 1);
	  i--; // Decrement i to account for the removed elements
	}
  
	// At this point, the expression should be fully evaluated and only one number should remain
	if (numbers.length === 1 && operators.length === 0) {
	  return parseFloat(numbers[0]);
	} else {
	  // Error handling if the expression is invalid
	  throw new Error('Invalid expression');
	}
  }