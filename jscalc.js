/* START TYPING OUT COMMANDS AS YOU ARE ABLE TO 
// NOT SURE IF TEXT FIELD WILL WORK FOR THE TEXT FIELD...
// YEAH THE DISPLAY NEEDS TO BE A DIV, NOT A FORM...
start entering the first number.
    the numbers won't do anything because goTime is false.
    or maybe we always need the start of entering a number to clear the display...
    yeah but pressing a number always turns goTime to false... 
    if goTime = true, then clear the display when a number is pressed (that is,
        right after an operator has been pressed)
// add a separate event listener for the decimal button... if the decimal
// is pressed, it must check if there already is a decimal in x... orrrr
        or the regex can check if it is a legitimate number... no actually i want 
        it to be impossible to display a wrong number
then when you're done entering the digits of the first number, you press an
    test with regex if content of the display is a number
    make it so the operator does not appear in the display...
    operator... this triggers....
    storing the current display as the x operand
    storing the operator as the value of the operator variable
    switching goTime to true, meaning the display will clear when the next
    number is pressed
    pressing enter seems to automatically clear the display
then you begin entering the second number
    this clears the display, because goTime is true...
    do i need a second switch?



*/



// make a default message for display that says "(Use NumPad)"



/*
make event listener for operators and =
    goTime = true;
    if operator, x and y all have content, then do the operate function with them
    // use same code as sound to store variables
*/
/*
make event listener for all numbers
    check if goTime is true; if so, store display as x and clear display
*/

let a = '3.44'
console.log(parseFloat(a))
let opParam, xParam, yParam;
let goTime = false;
let displayArr = [];

// I NEED TO FIGURE OUT HOW TO USE DECIMALS...

function operate(operator, x, y) {
    let answer
    console.log('x is ' + x)
    console.log('y is ' + y)
    switch (operator) {
        case '+':
            answer = x + y;
            break;
        case '-':
            answer = x - y;
            break;
        case '*':
            answer = x * y;
            break;
        case '/':
            answer = x/y;
            break;
        default:
            answer = null;
    }
    goTime = true;
    opParam, xParam, yParam = null;
    return Math.round(1000*answer)/1000;
}

const opArr = Array.from(document.querySelectorAll('.op'));
const numArr = Array.from(document.querySelectorAll('.num'));
opArr.forEach(op => op.addEventListener('click', opStroke));
numArr.forEach(num => num.addEventListener('click', numStroke));
opArr.forEach(op => op.addEventListener('click', playSound));
numArr.forEach(num => num.addEventListener('click', playSound));
// these add click functionality... but don't do the sound..
// the numStroke/opStroke only does e.key, so clicking displays no numbers
// will need completely new functions


const display = document.getElementById('display');
display.textContent = '0';
let restart = false;
window.addEventListener('keydown', keyStroke)
function keyStroke(e) {
    console.log(e.key)
    console.log(typeof e.key)
    if (e.key == 'Enter') {
        displayArr = [];
        displayArr.push(operate(String(opParam), parseFloat(xParam), parseFloat(yParam)));
        display.textContent = displayArr.join('');;
        restart = true;
        goTime = false;
    } else if (Number.isInteger(parseInt(e.key))) {
        numStroke(e)
    } else if (e.key == '.' && displayArr.includes('.') == false) {
        displayArr.push(e.key);
        display.textContent = displayArr.join('');
    } else if (e.key == 'Delete') {
        clear();
    } else if (e.key == '+' || '-' || '/' || '*') {
        if (e.key == '/') {e.preventDefault();}
        opStroke(e)
    }
}
// NOW THE DECIMAL GETS ERASED from the yparam...???

function numStroke(e) {
    console.log('num')
    if (goTime == false && restart == false) {
        displayArr.push(e.key);
        display.textContent = displayArr.join('');
    } else if (goTime == false && restart == true) {
        clear();
        restart = false;
        displayArr.push(e.key);
        display.textContent = displayArr.join('');
    } else {
        displayArr = [];
        displayArr.push(e.key);
        display.textContent = displayArr.join('');
        yParam = displayArr.join('');
        goTime = false;
    }
}

// AFTER I PRESS AN OPERATOR, THEN ENTER, IT SHOULD PROCESS THE PREVIOUS OPERATION
// INSTEAD IT RETURN NaN

// FOR SOME REASON THE Y PARAM IS ONLY ACCEPTING ONE DIGIT...
// MAYBE THAT'S WHY THE DECIMAL ISN'T WORKING EITHER... YEAH MUST BE
// SO SOMETHING IS WRONG WITH THE } ELSE { PART OF NUMsTROKE
// it empties the displayArr and only one character is stored as yParam...

function opStroke(e) {
    if (yParam) {
        console.log('hi')
        displayArr = [];
        displayArr.push(operate(String(opParam), parseFloat(xParam), parseFloat(yParam)));
        display.textContent = displayArr.join('');;
    }
    goTime = true;
    xParam = displayArr.join('');
    opParam = e.key;
}

function clear() {
    displayArr = [];
    display.textContent = displayArr.join('');
    opParam, xParam, yParam = null;
    goTime = false;
}

/// Below is just the button animation and sound code.

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    const num = document.querySelector(`div[data-key="${e.keyCode}"]`);    
    e.target.classList.remove('kaching');
 }

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const num = document.querySelector(`div[data-key="${e.keyCode}"]`);    
    if (!audio) return;
    num.classList.add('kaching');
    audio.currentTime = 0;
    audio.play();
}

opArr.forEach(op => op.addEventListener('transitionend', removeTransition));
numArr.forEach(num => num.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);



/*
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      console.log('enter')
    }
    if (event.key === '+') {
        console.log('plus')
    }
    if (event.key === '7') {
        console.log('7')
    }
    if (event.key === '+') {
        console.log('plus')
    }
  });
*/
  // ^this works

// I'll write it again below with some more functionality

// how do it make it so typing the plus sign doesn't write a plus sign?


//let x // the first number (i.e. what is currently displayed in the field)
//let y // the second number
//let o // the type of operator

/*
document.addEventListener('keydown', function(event) {
      // first test with a regex if the value in the field is a number.
      // if number is longer than 4 decimal points, round it up or down
      // if so, store it as the value of variable x
      
    if (event.key === 'Enter') {
      console.log('enter')
    }
    if (event.key === '+') {
        console.log('plus')
    }
    if (event.key === '7') {
        console.log('7')
    }
    if (event.key === '+') {
        console.log('plus')
    }
});
*/
  
/*




ok so make an if statement for each operator and enter
maybe each if statement simply switches the operator variable 
then the next keystroke listener checks what the operator is
if the operator is undefined, then that means it's entering the first number
so at the end of the operate function, you need to reset the operator variable 
to undefined

so field needs to be clear after each number is entered
so when you press an operator, it triggers a storage of the number currently 
in the field
answer keeps getting updated but is only displayed when you press enter
just need to listen for operator events/keystrokes, which will trigger
storage of the first number
so that event will store x and activate which operator we're using
then you enter the seocnd number, which triggers the actual operate function
the operate function returns 

nonono the first number is always the solution to everything so far
so answer/baseline number starts with the first number, but gets updated
at the end of the operate function
so the answer always gets displayed between operators, even if you don't 
press enter

so any operator or equal will trigger storing what's in the field
need error message here if it's not a number

event listener for operators that simply change a variable?
let operator
--event listener changes this variable to subtract, add etc.--

function operate (document.getElementById('input').value = x) {

}


****************************
i feel like thinking this through from the start

listen for keystroke that's not a number... i.e. either an operator or enter.
this stores the number in the field as the first number and store which
operator it is.
but how do i store the next number?
maybe i need a switch here...to confirm that we've started an operation
maybe the next number is the parameter of the operate() function
maybe first line of operate() confirms if we have the first number...
*/

// window.addEventListener('keydown', getOperator);
// need to somehow make this listener only for certain keys...
// maybe we just use a different 

/*

function getOperator() {
    // maybe we capture the value of x (the first number) here
    let x = document.getElementById('input').value = input;

}

function operate(o) {
    if (x === null) {return};
    // put in regex here that will return if x is not useable number or has letters

}
*/

/*
this runs the operation... but if there is no second number entered yet
the function stops
but if there is a second number, it will store the number in the field, 


enter number
enter operator 
enter second number (now everything happens)
    run function operate

enter number
enter operator
when we hit an operator button, it needs to store the
store number as x
store which operator we're using
enter number
run function to operate


enter number
automatically listen for this and update x?
enter operator
let op = use event listener for operators and update what this variable is
store number as x
store which operator we're using
enter number
run function to operate


let x // this is the first number

function operate(op) {
  
    x = document.getElementById('input').value = input;
    op = 
}

/*
function operate(x, o, y) {
    switch (o) {
        case '+':
            return x + y;
            break;
        case '-':
            return x - y;
            break;
        case '*':
            return x * y;
            break;
        case '/':
            return x/y;
            break;
        default:
            return null;
    }
}


let answer = 8;
document.getElementById('input').value = answer;
if (regex that asks if answer is not a number) {return 'ERROR'}


console.log
function operate(input) {
 

document.getElementById('input').value = input;


}
*/