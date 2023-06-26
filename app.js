let currentOp = document.getElementById("current-operand");
let previousOp = document.getElementById("previous-operand");

let previousSum = previousOp.innerHTML;

let operation = "return " + previousSum;
let evaluator = Function(undefined, operation);

console.log(evaluator());

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
			case "±":
				break;
			case "%":
				break;
			case "÷":
				break;
			case "×":
				break;
			case "−":
				break;
			case "+":
				break;
			case "=":
				break;
			case ".":
				break;
			default:
				currentOp.innerHTML+=numeric;
		}
        currentOp.innerHTML = addCommasToNumber(currentOp.innerHTML)
	});
});


// function addCommasToNumber(numberString) {
//     // Match any sequence of three digits followed by a non-digit character
//     const regex = /\B(?=(\d{3})+(?!\d))/g;
  
//     // Insert commas after every match
//     return numberString.replace(regex, ",");
//   }