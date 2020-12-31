
let SudokoBoard = [
	[4, null, null, null, null, null, null, null, null],
	[9, null, 1, null, 7, null, null, null, null],
	[null, null, 8, null, 4, null, null, 5, 6],
	[6, null, 4, null, null, 7, null, null, null],
	[null, 8, 2, 9, 5, 1, 6, 7, null],
	[null, null, null, 8, null, null, 3, null, 5],
	[8, 1, null, null, 2, null, 9, null, null],
	[null, null, null, null, 1, null, 8, null, 3],
	[null, null, null, null, null, null, null, null, 2],
];


function writeInGameBoard() {
	for (let i = 0; i < 9; i++) {
		let main = document.getElementById("SudokoBoard");
		let rowDiv = document.createElement("div");
		rowDiv.classList.add("rowDivMainClass"); //Big boxes class name
		rowDiv.id = `rowDiv${i}`;
		main.appendChild(rowDiv);
		//smallBox Loop
		let sudokoArrays = SudokoBoard[i];
		for (let q = 0; q < 9; q++) {
			let smallBox = document.createElement("div");
			smallBox.id = `smallBox${q}`;
			smallBox.classList.add("SmallBoxMainClass"); //Small boxes class name
			rowDiv.appendChild(smallBox);
			//Create Inputs
			let input = document.createElement("input");
			input.classList.add("InputsDesign"); //Inputs class name
			smallBox.appendChild(input);
			input.value = sudokoArrays[q];
			input.type = "number";
			input.min = 1;
			input.max = 9;
			input.id = `InputOf-Col${i}-Row${q}`;
			if (input.value) {
				input.readOnly = true
			}
		}
	}
}

writeInGameBoard();


///Check Input NUMBER Values ✓✓✓✓✓✓✓✓ DONE
let verifyNumberBigOrSmallNumbers = () => {
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			let InputNumberValues = document.getElementById(
				`InputOf-Col${i}-Row${j}`
			);

			if (
				parseInt(InputNumberValues.value) > 9 ||
				parseInt(InputNumberValues.value) <= 0
			) {
				alert("Please Type a Number between 1-9");
				InputNumberValues.value = null;
			}

		}
	}
};


function checkRowsAndColsDuplicates() {
	let inputId = this.id;

	// מוציא את הטור והשורה של הקופסה שלחצתי עליה
	let smallBoxCol = inputId.charAt(11);
	let smallBoxRow = inputId.charAt(inputId.length - 1);

	// creating an 'array' of all existing inputs
	let allInputs = document.querySelectorAll(".InputsDesign");

	// running on the array and extracting the input elements in same row or column
	let allInSameColAndRow = [];
	for (let i = 0; i < allInputs.length; i++) {
		let currInputId = allInputs[i].id;
		let currInputRow = currInputId.charAt(currInputId.length - 1);
		let currInputCol = currInputId.charAt(11);
		if (currInputRow === smallBoxRow || currInputCol === smallBoxCol)
			allInSameColAndRow.push(allInputs[i]);
	}

	//WORKING FUNCTION

	// running on the elements array and checking if the value is the same as the inserted value
	for (let i = 0; i < allInSameColAndRow.length; i++) {
		let selectedInput = allInSameColAndRow[i];

		if (+this.value === +selectedInput.value &&
			this.id != selectedInput.id
		) {
			selectedInput.style.color = "#FF6262";
			this.style.color = "#FF6262";

			setTimeout(() => {
				selectedInput.style.color = "white";
				this.style.color = "white";
				this.value = null;
			}, 500);
		}
	}
}

//Mark all 9 boxes and give them unique class
for (i = 0; i < 3; i++) {
	let a = this.value;
	for (j = 0; j < 3; j++) {
		document
			.getElementById(`InputOf-Col${i}-Row${j}`)
			.classList.add("BigBox-1");
		document
			.getElementById(`InputOf-Col${i + 3}-Row${j}`)
			.classList.add("BigBox-2");
		document
			.getElementById(`InputOf-Col${i + 6}-Row${j}`)
			.classList.add("BigBox-3");
		document
			.getElementById(`InputOf-Col${j}-Row${i + 3}`)
			.classList.add("BigBox-4");
		document
			.getElementById(`InputOf-Col${i + 3}-Row${j + 3}`)
			.classList.add("BigBox-5");
		document
			.getElementById(`InputOf-Col${i + 6}-Row${j + 3}`)
			.classList.add("BigBox-6");
		document
			.getElementById(`InputOf-Col${j}-Row${i + 6}`)
			.classList.add("BigBox-7");
		document
			.getElementById(`InputOf-Col${j + 3}-Row${i + 6}`)
			.classList.add("BigBox-8");
		document
			.getElementById(`InputOf-Col${j + 6}-Row${i + 6}`)
			.classList.add("BigBox-9");
	}
}

function checkBoxDuplicates() {
	let thisBoxClass = this.classList.value.charAt(20);
	let allBoxInputs = document.querySelectorAll(`.BigBox-${+thisBoxClass}`);

	for (i = 0; i < allBoxInputs.length; i++) {
		if (+this.value == +allBoxInputs[i].value &&
			this.id != allBoxInputs[i].id &
			this.value != null &
			allBoxInputs[i] != null
		) {
			allBoxInputs[i].style.color = "#FF6262";
			this.style.color = "#FF6262";

			setTimeout(() => {
				this.style.color = "white";
				this.value = null;
				allBoxInputs.forEach((item) => {
					item.style.color = "white";
				});
			}, 500);
		}
	}
}


//Evoke the functions above
for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		document
			.getElementById(`InputOf-Col${i}-Row${j}`)
			.addEventListener("input", checkRowsAndColsDuplicates);
		document
			.getElementById(`InputOf-Col${i}-Row${j}`)
			.addEventListener("input", checkBoxDuplicates);
		document
			.getElementById(`InputOf-Col${i}-Row${j}`)
			.addEventListener("input", verifyNumberBigOrSmallNumbers);
	}
}


document.getElementById('CheckBoardBTN').addEventListener('click', () => {

	let checkForEmptySpaces = () => {
		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				let SelectInputs = document.getElementById(`InputOf-Col${i}-Row${j}`);
				let SelectInputsValues = parseInt(SelectInputs.value); //(inputIds.value = 1)
				if (!SelectInputsValues) {
					SelectInputs.style.backgroundColor = "rgba(0, 0, 0, .1)";
					setTimeout(function () {
						SelectInputs.style.backgroundColor = "transparent";
					}, 1000);
				}
			}
		}
	};


	//check if the board is full and valid it
	let allInputsCells = document.querySelectorAll(".InputsDesign");

	const inputsArr = [];

	allInputsCells.forEach((cell) => {
		inputsArr.push(cell);
	});

	function checkAllInputs(item) {
		if (item.value >= 1) return true;
	}

	function fullBoardValidation() {
		if (inputsArr.every(checkAllInputs) == false) {
			checkForEmptySpaces();
		} else if (inputsArr.every(checkAllInputs) == true) {
			alert("You have completed the board!");
		}
	}

	fullBoardValidation();

})


document.getElementById('RestartBTN').addEventListener('click', () => {
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			let SelectInputs = document.getElementById(`InputOf-Col${i}-Row${j}`);
			SelectInputs.value = SudokoBoard[i][j]
		}
	}


})


// document.getElementById('fillboard').addEventListener('click', () => {

//   for (i = 0; i < 9; i++) {
//       for (j = 0; j < 9; j++) {
//           let InputNumberValues = document.getElementById(`InputOf-Col${i}-Row${j}`)
//           InputNumberValues.value = 1


//       }
//   }

// })