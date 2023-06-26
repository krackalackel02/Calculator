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
				currentOp.innerHTML = eval(
					removeCommasFromNumber(previousOp.innerHTML)
				);
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
