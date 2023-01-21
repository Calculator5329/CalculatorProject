
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

//Functions

function drawText(text, x, y, color, font1) {
    ctx.fillStyle = color;
    ctx.font = font1
    ctx.fillText(text, x, y)
}
function drawLine(x, y, z, a, color, lWidth = 1) {
    ctx.strokeStyle = color
    ctx.lineWidth = lWidth
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(z, a);
    ctx.stroke();
}
function strokeRect(x, y, width, height, color, a = 0) {
    drawLine(x - a, y, x + width + a, y, color)
    drawLine(x - a, y + height, x + width + a, y + height, color)
    drawLine(x, y + height + a, x, y - a, color)
    drawLine(x + width, y - a, x + width, y + height + a, color)
    drawLine(x - a, y, x + width + a, y, color)
    drawLine(x - a, y + height, x + width + a, y + height, color)
    drawLine(x, y + height + a, x, y - a, color)
    drawLine(x + width, y - a, x + width, y + height + a, color)
}
function rect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}
function roundedRect(x, y, width, height, color, a = 0) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, width - 2, height - 2)
    drawLine(x - a, y, x + width + a, y, color, 2)
    drawLine(x - a, y + height, x + width + a, y + height, color, 2)
    drawLine(x, y + height + a, x, y - a, color, 2)
    drawLine(x + width, y - a, x + width, y + height + a, color, 2)
}
function circle(x, y, radius, color, z) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.lineWidth = z
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
function ellipse(x, y, width, height, color, z, fill) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.fillStyle = fill
    ctx.lineWidth = z
    ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
}
function flipCoin() {
    if (Math.random() > 0.5) {
        return true
    }
    else {
        return false
    }
}
function randNum(x, y) {
    return Math.random() * (y - x) + x
}
function randInt(x, y) {
    return Math.round(Math.random() * (y - x) + x)
}
function pickNum(x, y) {
    if (Math.random() < 0.5) {
        return y
    }
    else {
        return x
    }
}
function makeArc(x, y, radius, d1, d2, color, z) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.lineWidth = z
    ctx.arc(x, y, radius, d1, d2);
    ctx.stroke();
}
function listAverage(list) {
    let a = 0
    let sum = 0
    while (a < (list.length - 1)) {
        sum += list[a]
        a += 1
    }
    if (list.length === 1) {
        return list[0]
    }
    else {
        return (sum / (list.length - 1))
    }
}
function listMax(list) {
    let i = 0
    let currentMax = 0
    while (i < list.length) {
        if (list[i] > currentMax) {
            currentMax = list[i]
        }
        i++
    }
    i = 0
    return currentMax
}
function valueInRect(x, y, rect_x, rect_y, rect_width, rect_height) {
    let value = false
    if (x > rect_x) {
        if (x < rect_x + rect_width) {
            if (y > rect_y) {
                if (y < rect_y + rect_height) {
                    value = true
                }
            }
        }
    }
    return value
}
function defaultText(text, x, y) {
    drawText(text, x, y, Default_Color, Default_Font)
}
function paragraphText(text, max_letters) {
    let res = text.split(" ");
    let i = 0
    let letter_counter = 0
    let return_list = []
    let cumulative_strings = ""
    while (i < res.length) {
        letter_counter += res[i].length
        if (letter_counter > max_letters) {
            if (cumulative_strings != "") {
                return_list.push(cumulative_strings)
            }
            cumulative_strings = ""
            letter_counter = res[i].length
        }
        cumulative_strings += res[i] + " "
        i += 1
    }
    return_list.push(cumulative_strings)
    return_list.push("")
    return return_list
}
function amountInList(x, list) {
    let i = 0
    let count = 0
    while (i < list.length) {
        if (list[i] == x) {
            count += 1
        }
        i += 1
    }
    return count
}
function roundDollar(a) {
    return Math.round(a * 100) / 100
}
function roundDollarDouble(a) {
    return Math.round(a * 10000) / 10000
}
function variance25() {
    return Math.random() * 0.5 + 0.75
}
function variance10() {
    return Math.random() * 0.2 + 0.9
}
function scaleDown(original_list, scale, star_var = false) {
    let list = original_list

    if (star_var) {
        let i = 0

        while (i < list[0].length) {
            list[0][i] = (list[0][i]) / scale
            list[1][i] = (list[1][i]) / scale
            i += 1
        }

        i = 0

    }
    else {
        let i = 0
        while (i < list.length) {
            list[i] = list[i] / scale
            i += 1
        }

        i = 0
    }

    return list

}
function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function listContains(list, val) {
    let containsVal = false
    for (let i = 0; i < list.length; i++) {
        if (list[i] == val) {
            containsVal = true
        }
    }
    return containsVal
}
function divisors(num, divisor) {
    let changingNum = num
    let divisorCount = 0

    while (changingNum / divisor == Math.round(changingNum / divisor)) {
        changingNum = changingNum / divisor
        divisorCount += 1
    }

    return divisorCount
}
function highestPowBelow(num, divisor) {
    let currentPow = 0

    while (Math.pow(divisor, currentPow) < num) {
        currentPow += 1
    }

    return currentPow - 1
}
function toHexSingle(num) {
    let hexList = ['A', 'B', 'C', 'D', 'E', 'F']
    if (num < 10) {
        return num
    }
    else if (num < 16) {
        return hexList[num - 10]
    }
    else {
        return "Err"
    }
}
function toHex(num) {
    let changingNum = num
    let digitList = []
    let highestPow = highestPowBelow(num, 16)
    let outputString = ""

    for (let i = 0; i < highestPow + 1; i++) {
        digitList.push((Math.floor(changingNum / Math.pow(16, highestPow - i))))
        changingNum -= Math.floor(changingNum / Math.pow(16, highestPow - i)) * Math.pow(16, highestPow - i)
    }

    for (let i = 0; i < digitList.length; i++) {
        outputString += toHexSingle(digitList[i])
    }

    return outputString
}
function rectCollisions(x, y, x2, y2, objectX, objectY, objectX2, objectY2) {
    let returnString = ""

    //Above object
    //If any number between x and x2 is contained between objectX and objectX2
    if (x2 - 1 >= objectX && x + 1 <= objectX2) {
        //If the bottom of main is hitting the top of the object and the top of main is not below the top of the object
        if (y2 >= objectY && y < objectY) {
            returnString = "above"
        }
    }

    //Below object
    //If any number between x and x2 is contained between objectX and objectX2
    if (x2 - 1 >= objectX && x + 1 <= objectX2) {
        //If the top of main is hitting the bottom of the object and the bottom of main is below the bottom of the object
        if (y <= objectY2 && y2 > objectY2) {
            returnString = "below"
        }
    }

    //Left of object
    //If any number between y and y2 is contained between objectY and objectY2
    if (y2 >= objectY && y <= objectY2) {
        //If the right of main is hitting the left of the object and the left is left of the left of the object
        if (x2 >= objectX && x < objectX) {
            if (returnString == "") {
                returnString = "left"
            }
        }
    }

    //Right of object
    //If any number between y and y2 is contained between objectY and objectY2
    if (y2 >= objectY && y <= objectY2) {
        //If the left of main is hitting the right of the object and the right of main is to the right of the right of the object
        if (x <= objectX2 && x2 > objectX2) {
            if (returnString == "") {
                returnString = "right"
            }
        }
    }

    return returnString

}


export {
    drawText, drawLine, strokeRect, rect, roundedRect, circle, flipCoin, randNum, randInt, pickNum, makeArc, listAverage, listMax, valueInRect,
    defaultText, paragraphText, amountInList, roundDollar, roundDollarDouble, variance10, variance25, separator, scaleDown, listContains, divisors, toHex, 
    rectCollisions, ellipse
}