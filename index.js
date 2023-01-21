let mouseX = 1
let mouseY = 1
function printMousePos(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

document.addEventListener("click", printMousePos);


let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext('2d')

const GAME_WIDTH = 1800;
const GAME_HEIGHT = 900;

import {drawText, drawLine, strokeRect, rect, roundedRect, circle, flipCoin, randNum, randInt, pickNum, makeArc, listAverage, listMax, valueInRect,
    defaultText, paragraphText, amountInList, roundDollar, roundDollarDouble, variance10, variance25, separator, scaleDown, listContains, divisors, toHex, 
    rectCollisions, ellipse } from './functions.js' 

import {Stack} from './stack.js';

let Default_Font = "40px Times New Roman"
let Default_Color = "Black"

//Detecting keyboard input

let keyPressed = false
let keyReleased = false
let keyType = ""
let keys = []

window.addEventListener('keydown', (event) => {
    keyType = event.key
    keys[keyType] = true
}, true);

window.addEventListener('keyup', (event) => {
    keyType = event.key
    keys[keyType] = false
}, true);

function charToInt(char) {
    try {
        let int = parseInt(char);
        if (isNaN(int)) {
            throw new Error("Input is not a valid number");
        }
        return int;
    } catch (error) {
        console.log(error.message);
    }
}
function intToString(num) {
    try {
      if (typeof num !== 'number') {
        throw new Error('Input must be a number');
      }
      return num.toString();
    } catch (error) {
      console.error(error);
    }
  }
function roundStrokeRect(x, y, height, width, lineWidth=3, strokeColor="black", fillColor="white") {
    roundedRect(x, y, height, width, strokeColor, 0)
    rect(x + lineWidth, y + lineWidth, height - lineWidth*2, width - lineWidth*2, fillColor)
}
function makeButton(x, y, a, b) {
    if (mouseX > x && mouseY > y) {
        if (mouseX < a && mouseY < b) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}
function backspace(myString) {
    return myString.slice(0, -2);    
}
function calcChars(x, op, y) {
    x = charToInt(x)
    y = charToInt(y)

    if(op == "+") {
        return x + y
    }
    if(op == "-") {
        return x - y
    }
    if(op == "*") {
        return x * y
    }
    if(op == "/") {
        return x / y
    }
    if(op == "^") {
        return x ** y
    }
    if(op == "%") {
        return x % y
    }
}
function calculateList(stack) {
    let x = 0
    let y = 0
    let op = ""
    while(stack.items.length > 2) {
        y = stack.pop()
        op = stack.pop()
        x = stack.pop()
        console.log("x " + x + "op " + op + "y " + y )
        console.log(calcChars(x, op, y))
        stack.push(calcChars(x, op, y))
    }

    return roundDollar(stack.pop())
}

// Variables

// Calculator Coords
let calculatorX = 100
let calculatorY = 100

// Buttons
let buttonList = [7, 8, 9, " / ", 4, 5, 6, " * ", 1, 2, 3, " - ", 0, " . ", " = ", " + "]

// The input gathered from the user
let userInput = ""
let UISize = 48
let UIList = []
let UIStack = new Stack();


function main() {
    ctx.clearRect(-1, -1, 1802, 902)

    // Code for loop goes here 

    // Calculator Body
    roundStrokeRect(calculatorX, calculatorY, 365, 650)

    // Result section
    roundStrokeRect(calculatorX + 25, calculatorY + 15, 325, 100)
    drawLine(calculatorX, calculatorY + 130, calculatorX + 365, calculatorY + 130, "black", 4)

    // Buttons

    // Number Buttons
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            // 25, 110, 195, 280, 
            roundStrokeRect(calculatorX + 25 + 85*i, calculatorY + 310 + 85*j, 60, 60)
            drawText(7 + i - j*3, calculatorX + 25 + 85*i + 18, calculatorY + 310 + 85*j + 40, "black", "36px Arial")
        
        }
    }

    // 0, ., and = Buttons
    roundStrokeRect(calculatorX + 25 + 85*0, calculatorY + 310 + 85*3, 60, 60)
    drawText("0", calculatorX + 25 + 18, calculatorY + 330 + 85*3 + 25, "black", "36px Arial")

    roundStrokeRect(calculatorX + 25 + 85, calculatorY + 310 + 85*3, 60, 60)
    drawText(".", calculatorX + 25 + 85 + 20, calculatorY + 330 + 85*3 + 25, "black", "72px Arial")

    roundStrokeRect(calculatorX + 25 + 85*2, calculatorY + 310 + 85*3, 60, 60)
    drawText("=", calculatorX + 25 + 85*2 + 18, calculatorY + 330 + 85*3 + 25, "black", "36px Arial")

    // /, *, -, +
    roundStrokeRect(calculatorX + 25 + 85*3, calculatorY + 310 + 85*3, 60, 60)
    drawText("+", calculatorX + 25 + 18 + 85*3, calculatorY + 330 + 85*3 + 25, "black", "40px Arial")

    roundStrokeRect(calculatorX + 25 + 85*3, calculatorY + 310 + 85*2, 60, 60)
    drawText("-", calculatorX + 25 + 21 + 85*3, calculatorY + 330 + 85*2 + 25, "black", "48px Arial")

    roundStrokeRect(calculatorX + 25 + 85*3, calculatorY + 310 + 85*1, 60, 60)
    drawText("x", calculatorX + 25 + 20 + 85*3, calculatorY + 330 + 85*1 + 20, "black", "40px Arial")

    roundStrokeRect(calculatorX + 25 + 85*3, calculatorY + 310, 60, 60)
    drawText("÷", calculatorX + 25 + 17 + 85*3, calculatorY + 330  + 26, "black", "48px Arial")

    roundStrokeRect(calculatorX + 25 + 85*3, calculatorY + 310 - 85, 60, 60)
    drawText("CE", calculatorX + 25 + 8 + 85*3, calculatorY + 330 - 85 + 22, "black", "32px Arial")

    // Making the buttons functional
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            // 25, 110, 195, 280, 
            if(makeButton(calculatorX + 25 + 85*i, calculatorY + 310 + 85*j, calculatorX + 25 + 85*i + 60,  calculatorY + 310 + 85*j + 60)) {
                console.log(buttonList[i + j*4])
                userInput += buttonList[i + j*4]
            }
        }
    }
    
    // Making the AC button functional
    if(makeButton(calculatorX + 25 + 85*3, calculatorY + 310 - 85, calculatorX + 25 + 85*3 + 60, calculatorY + 310 - 85 + 60)) {
        userInput = backspace(userInput)
    }

    // Making sure the equation length does not exceed the alotted space
    if(userInput.length > 15) {
        UISize = 32
        drawText("Error, userInput length exceeded 15", 500, 100, "red", "48px Arial")
    }

    drawText(userInput, calculatorX + 320 - userInput.length*20, calculatorY + 100, "black", UISize + "px Arial")

    UIList = userInput.split(' ')

    drawText(UIList, 500, 100, "blue", "48px Arial")

    UIStack = new Stack();
    for (let element of UIList) {
        UIStack.push(element)
    }

    if(UIList.includes("=")) {
        UIStack.pop()
        UIStack.pop()
        userInput = intToString(calculateList(UIStack))
    }
    


    mouseX = 0
    mouseY = 0
}

const framesPerSecond = 240;
setInterval(main, 1000 / framesPerSecond);