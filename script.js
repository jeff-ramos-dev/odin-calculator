const allClearBtn = document.querySelector('.ac')
const clearBtn = document.querySelector('.c')
const posNegBtn = document.querySelector('.pos-neg')
const divideBtn = document.querySelector('.divide')
const multiplyBtn = document.querySelector('.multiply')
const minusBtn = document.querySelector('.subtract')
const plusBtn = document.querySelector('.add')
const equalBtn = document.querySelector('.equal')
const decimalBtn = document.querySelector('.decimal')
const zeroBtn = document.querySelector('.zero')
const oneBtn = document.querySelector('.one')
const twoBtn = document.querySelector('.two')
const threeBtn = document.querySelector('.three')
const fourBtn = document.querySelector('.four')
const fiveBtn = document.querySelector('.five')
const sixBtn = document.querySelector('.six')
const sevenBtn = document.querySelector('.seven')
const eightBtn = document.querySelector('.eight')
const nineBtn = document.querySelector('.nine')


function add(x, y) {
    return x + y
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function operate(operator, x, y) {
    switch(operator) {
        case "add": return add(x, y)
        case "subtract":return subtract(x, y)
        case "multiply": return multiply(x, y)
        case "divide": return divide(x, y)
        default: return "Invalid input"
    }
}


module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
}