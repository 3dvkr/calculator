let doMath = document.querySelectorAll('.doMath');

let disp = document.querySelector('#display');
let clearDisp = document.querySelector('#clearDisp');

clearDisp.addEventListener('click', () => {disp.innerText= ''});
doMath.forEach(element => element.addEventListener('click', updateMainDisplay));

// USING THE KEYBOARD

document.querySelector('body').addEventListener('keypress', updateMainDisplay);

function updateMainDisplay(e) {
    if (e.type == 'click') {
        console.log("MouseEvent detected");
        updateDisplay(e);
    }
    else if (e.type == 'keypress') {
        console.log("KeyboardEvent detected");
        calcWithKeyboard(e);
    }
    console.log('End of main function: ' + disp.textContent);
}


function calcWithKeyboard(e) {
    console.log(e);
    console.log(disp.textContent);
    let testNumberEntry = !isNaN(e.key) && !isNaN(disp.textContent[disp.textContent.length - 1]);
	console.log('keyboard: ' + disp.textContent);
    if (!isNaN(e.key) || '+-*/'.includes(e.key)) {addToDisp(testNumberEntry, disp, e.key)}
    if (e.key == '=' || e.key == 'Enter') {
        disp.textContent = handleCalc(disp.textContent);
    }
	console.log('final ' + disp.textContent);
}

// END USING THE KEYBOARD

// USING THE BUTTONS
function updateDisplay(event) {
    console.log(event);
	console.log('buttons: ' + event.target.innerText);
	let testTwoDigit = !isNaN(event.target.textContent) &&  !isNaN(disp.textContent[disp.textContent.length - 1]);
    addToDisp(testTwoDigit, disp, event.target.textContent);
    if (event.target.innerText == '=') {
        disp.textContent = handleCalc(disp.textContent);
    }
}
// END USING THE BUTTONS

function handleCalc(updateText) {
    do {
        updateText = calculate(updateText);
        console.log('handleCalc' + updateText);
        } while (updateText == '')
    return updateText;
}

// CHECK FOR MULTI-DIGIT NUMBERS
function addToDisp(logicTest, objToUpdate, stuffToAdd) {
	if (logicTest) {
		objToUpdate.textContent += stuffToAdd;
	} else {objToUpdate.textContent += ' ' + stuffToAdd}
}

// SIMPLE CALCULATION INSTRUCTIONS
function mathOp(arithmetic, a, b) {
	if (arithmetic == '+') {return +a + +b}
	else if (arithmetic == '-') {return +a - +b}
	else if (arithmetic == '*') {return +a * b}
	else if (arithmetic == '/') {return +a / +b}
	else {return null}
}

	
// CALCULATION INSTRUCTIONS USING THE USER INPUT
function calculate(mathString) {
    console.log('Entering the calculate function, and updating the disp area-----');
	let result;
	let mathArr = mathString.split(' ');
    console.log(mathArr);
    mathArr = mathArr.filter(x => x != '');
    console.log(mathArr);
	for (let i = 0; i < mathArr.length; i++) {

		if (i == 0 && !isNaN(mathArr[i])) {
			result = mathArr[0];
		}
		else if ('+-*/'.includes(mathArr[i])) {
			result = mathOp(mathArr[i], result, mathArr[i + 1]);
			// console.log(result);
		}
    }
    console.log('result from calculate function: ' + result);
	return result;
}

console.log('potato');
