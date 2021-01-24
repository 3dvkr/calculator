let doMath = document.querySelectorAll('.doMath');

let disp = document.querySelector('#display');
let clearDisp = document.querySelector('#clearDisp');

clearDisp.addEventListener('click', () => {disp.innerText= ''});
document.querySelector('body').addEventListener('keypress', (e) => {
    if (e.key == ' '){e.preventDefault(); disp.innerText= '';}
});

doMath.forEach(element => element.addEventListener('click', updateMainDisplay));
document.querySelector('body').addEventListener('keypress', updateMainDisplay);

// USING THE KEYBOARD
function updateMainDisplay(e) {
    if (e.type == 'click') {updateDisplay(e)}
    else if (e.type == 'keypress') {calcWithKeyboard(e)}
}

function calcWithKeyboard(e) {

    let testNumberEntry = !isNaN(e.key) && !isNaN(disp.textContent[disp.textContent.length - 1]);
	console.log('keyboard: ' + disp.textContent);
    if (!isNaN(e.key) || '+*-/'.includes(e.key)) {addToDisp(testNumberEntry, disp, e.key)}
    if (e.key == '=' || e.key == 'Enter') {
        disp.textContent = handleCalc(disp.textContent);
    }
	console.log('final ' + disp.textContent);
}
// END USING THE KEYBOARD

// USING THE BUTTONS
function updateDisplay(event) {
	let testTwoDigit = !isNaN(event.target.textContent) &&  !isNaN(disp.textContent[disp.textContent.length - 1]);
    addToDisp(testTwoDigit, disp, event.target.textContent);
    if (event.target.innerText == '=') {
        disp.textContent = handleCalc(disp.textContent);
    }
    document.activeElement.blur();
}
// END USING THE BUTTONS

function handleCalc(updateText) {
    do {
        updateText = calculate(updateText);
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

function bundleMath(symbol1, symbol2, calcMath) {
    do {
        let indexOp = Math.max(calcMath.indexOf(symbol1), calcMath.indexOf(symbol2));
        if (indexOp > 0){
            let [operator, num] = calcMath.splice(indexOp, 2);
            calcMath[indexOp - 1] = mathOp(operator, calcMath[indexOp - 1], num)
        }
    } while (calcMath.includes(symbol1) || calcMath.includes(symbol2))
    return calcMath;
}
	
// CALCULATION INSTRUCTIONS USING THE USER INPUT
function calculate(mathString) {
	let mathArr = mathString.split(' ').filter(x => x != '');

    mathArr = bundleMath('*', '/', mathArr);
    mathArr = bundleMath('+', '-', mathArr);

	return mathArr[0];
}