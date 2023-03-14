const allClearBtn = document.querySelector('.all-clear')
const clearBtn = document.querySelector('.clear')
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
const numberBtns = Array.from(document.querySelectorAll('.number'))
const operationBtns = Array.from(document.querySelectorAll('.operation'))
const maxDecimalLength = 8

const runningTotalDisplay = document.querySelector('.running-total-display')
const mainDisplay = document.querySelector('.main-display')

let calc = new Map()
setCalcDefault()
createNumberEventListeners()
createOperationEventListeners()

allClearBtn.addEventListener('click', () => {
    setCalcDefault()
    updateDisplays()
})

clearBtn.addEventListener('click', () => {
    calc.set("displayValue", "0")
    calc.set("equalsPressed")
    updateDisplays()
})

equalBtn.addEventListener('click', () => {
    if (calc.get("savedOperation")) {
        calc.set("displayValue", String(operate(calc.get("savedOperation"), Number(calc.get("runningTotal")), Number(calc.get("displayValue")))))
        calc.set("runningTotal", calc.get("displayValue"))
    }
    updateDisplays()
})

decimalBtn.addEventListener('click', () => {
    if (calc.get("operationPressed")) {
        calc.set("displayValue", "0.")
    } else {
        if (!calc.get("decimalPressed")) {
            calc.set("displayValue", calc.get("displayValue") + ".")
            calc.set("decimalPressed", true)
        }
    }
    updateDisplays()
})

posNegBtn.addEventListener('click', () => {
    if (calc.get("operationPressed")) {
        calc.set("posNegPressed", true)
    } else {
        if (!calc.get("posNegPressed")) {
            calc.set("displayValue", "-" + calc.get("displayValue"))
            calc.set("posNegPressed", true)
            updateDisplays()
        } else {
            calc.set("displayValue", Number(calc.get("displayValue")) * -1)
            calc.set("posNegPressed", false)
        }
    }
})

function setCalcDefault() {
    calc.set("decimalPressed", false)
    calc.set("savedOperation", null)
    calc.set("operationPressed", false)
    calc.set("equalsPressed", false)
    calc.set("posNegPressed", false)
    calc.set("runningTotal", 0)
    calc.set("displayValue", "0")
}

function createNumberEventListeners() {
    for (let i = 0; i <= 9; i++) {
        numberBtns[i].addEventListener('click', (e) => {
            if (calc.get("displayValue") === "0" && calc.get("runningTotal") === 0 && !calc.get("posNegPressed")) {
                calc.set("displayValue", e.target.textContent)
            } else {
                if (calc.get("operationPressed")) {
                    if(calc.get("displayValue") === "0.") {
                        calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                    } else if (calc.get("posNegPressed")) {
                        calc.set("displayValue", String(Number(e.target.textContent) * -1))
                    } else {
                        calc.set("displayValue", e.target.textContent)
                    }
                } else if (calc.get("posNegPressed")) {
                    calc.set("displayValue", String((Number(e.target.textContent) * -1)))
                } else if (calc.get("decimalPressed")) {
                    calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                } else {
                    calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                }
            }
            calc.set("operationPressed", false)
            updateDisplays()
        })
    }
}

function createOperationEventListeners() {
    for (let i = 0; i < 4; i++) {
        operationBtns[i].addEventListener('click', (e) => {
            if (!calc.get("operationPressed")) {

                if (calc.get("savedOperation")) {
                    operate(calc.get("savedOperation"), calc.get("runningTotal"), calc.get("displayValue"))
                } else {
                    calc.set("runningTotal", calc.get("displayValue"))
                    updateDisplays()
                }
                if (e.target.classList.contains('add')) {
                    calc.set("savedOperation", 'add')
                } else if (e.target.classList.contains('subtract')) {
                    calc.set("savedOperation", 'subract')
                } else if (e.target.classList.contains('multiply')) {
                    calc.set("savedOperation", 'multiply')
                } else if (e.target.classList.contains('divide')) {
                    calc.set("savedOperation", 'divide')
                }
            } else {
                if (e.target.classList.contains('add')) {
                    calc.set("savedOperation", 'add')
                } else if (e.target.classList.contains('subtract')) {
                    calc.set("savedOperation", 'subtract')
                } else if (e.target.classList.contains('multiply')) {
                    calc.set("savedOperation", 'multiply')
                } else if (e.target.classList.contains('divide')) {
                    calc.set("savedOperation", 'divide')
                }
            }
            calc.set("operationPressed", true)
            calc.set("posNegPressed", false)
        })
    }
}

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
    let output = 0
    switch(operator) {
        case "add": output = add(x, y); break;
        case "subtract": output = subtract(x, y); break;
        case "multiply": output = multiply(x, y); break;
        case "divide": output = divide(x, y); break;
        default: return "Invalid input"
    }
    return round(output, 8)
}

function updateDisplays() {
    mainDisplay.textContent = calc.get("displayValue")
    runningTotalDisplay.textContent = calc.get("runningTotal")
}

function round(num, precision) {
    return Number(Math.round(num + "e+" + precision) + "e-" + precision)
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
}


// TESTS
// Simple Addition:
// 1 + 2 = 3 PASSES

// Decimal displays and saves properly
// 0.1 + 2 = 2.1 PASSES

// Float imprecision is rounded
// 0.1 + 0.2 = 0.3 PASSES

// Negative numbers display and save properly
// -1 + 2 = 1 PASSES

// Multiple digit numbers display and save properly
// 12 + 31 = 43 PASSES 

// Pressing pos/neg button after operation displays and saves properly
// 12 + -3 = 9 PASSES

// Pressing pos/neg button after number displays and saves properly
// 12 + 3(-) = 9 PASSES 

// Decimal pressed after operation displays and saves properly
// 12 + .3 = 12.3 PASSES 

// Pressing 0 and then decimal also works 
// 12 + 0.3 = 12.3 PASSES 

// Operations pressed in succession update the saved operation
// 12 +-x/- 3 = 9 FAILS

// Multiple operations done before equals displays and updates properly
// 1 - 2 + 3 = 2 FAILS

// Operations done after equals keep the running total and update the display properly
// 1 + 2 = (3) + 5 = 8 PASSES 

