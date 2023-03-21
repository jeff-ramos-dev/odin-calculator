const allClearBtn = document.querySelector('.all-clear')
const clearBtn = document.querySelector('.clear')
const posNegBtn = document.querySelector('.pos-neg')
const equalBtn = document.querySelector('.equal')
const decimalBtn = document.querySelector('.decimal')
const numberBtns = Array.from(document.querySelectorAll('.number'))
const operationBtns = Array.from(document.querySelectorAll('.operation'))
const runningTotalDisplay = document.querySelector('.running-total-display')
const mainDisplay = document.querySelector('.main-display')

let calc = {
    decimalPressed: false,
    savedOperation: null,
    operationPressed: false,
    equalsPressed: false,
    posNegPressed: false,
    runningTotal: 0,
    displayValue: "0",
}

setCalcDefault()

createNumberEventListeners()

createOperationEventListeners()

allClearBtn.addEventListener('click', () => {
    setCalcDefault()
    updateDisplays()
    scaleFontSize()
})

clearBtn.addEventListener('click', () => {
    calc.displayValue = "0"
    if (calc.equalsPressed) {
        calc.runningTotal = 0
    }
    calc.equalsPressed = false
    updateDisplays()
    scaleFontSize()
})

equalBtn.addEventListener('click', () => {
    if (calc.savedOperation) {
        calc.displayValue = String(operate(calc.savedOperation, Number(calc.runningTotal), Number(calc.displayValue)))
        calc.runningTotal = calc.displayValue
    }
    calc.equalsPressed = true
    updateDisplays()
    scaleFontSize()
})

decimalBtn.addEventListener('click', () => {
    if (calc.equalsPressed) {
        if (calc.displayValue.includes(".")) {
            calc.decimalPressed = true
        } else {
            calc.displayValue += "."
        }
    }
    if (calc.operationPressed) {
        calc.displayValue = "0."
    } else {
        if (!calc.decimalPressed) {
            calc.displayValue  += "."
            calc.decimalPressed = true
        } else {
            calc.displayValue = "0."
        }
    }
    updateDisplays()
    scaleFontSize()
})

posNegBtn.addEventListener('click', () => {
    if (calc.operationPressed) {
        calc.posNegPressed = true
    } else {
        if (!calc.posNegPressed && !calc.equalsPressed) {
            calc.displayValue = "-" + calc.displayValue
            calc.posNegPressed = true
        } else {
            calc.displayValue = Number(calc.displayValue) * -1
            calc.posNegPressed = false
            updateDisplays()
        }
        updateDisplays()
    }
    scaleFontSize()
})

function setCalcDefault() {
    for (let i = 0; i < 4; i++) {
        operationBtns[i].classList.remove('active')
    }
    calc.decimalPressed = false
    calc.savedOperation = null
    calc.operationPressed = false
    calc.equalsPressed = false
    calc.posNegPressed = false
    calc.runningTotal = 0
    calc.displayValue = "0"
}

function createNumberEventListeners() {
    for (let i = 0; i <= 9; i++) {
        numberBtns[i].addEventListener('click', (e) => {
            if (calc.displayValue.length >= 9 && !calc.operationPressed) { return }
            if (calc.displayValue === "0" && calc.runningTotal === 0 && !calc.posNegPressed) {
                calc.displayValue = e.target.textContent
            } else {
                if (calc.equalsPressed) {
                    if (calc.decimalPressed) {
                        calc.displayValue += e.target.textContent
                    } else {
                        calc.displayValue = e.target.textContent
                    }
                } else if (calc.operationPressed) {
                    if(calc.displayValue === "0.") {
                        calc.displayValue = calc.displayValue + e.target.textContent
                    } else if (calc.posNegPressed) {
                        calc.displayValue = String(Number(e.target.textContent) * -1)
                    } else {
                        calc.displayValue = e.target.textContent
                        calc.decimalPressed = false
                    }
                } else if (calc.posNegPressed) {
                    if (calc.displayValue === "-0") {
                        calc.displayValue = String((Number(e.target.textContent) * -1))
                    } else {
                        calc.displayValue = calc.displayValue + e.target.textContent
                    }
                } else if (calc.decimalPressed) {
                    calc.displayValue = calc.displayValue + e.target.textContent
                } else if (calc.displayValue === "0") {
                    calc.displayValue = e.target.textContent
                } else {
                    calc.displayValue = calc.displayValue + e.target.textContent
                }
            }
            calc.operationPressed = false
            updateDisplays()
            scaleFontSize()
            for (let i = 0; i < 4; i++) {
                operationBtns[i].classList.remove('active')
            }
        })
    }
}

function createOperationEventListeners() {
    for (let i = 0; i < 4; i++) {
        operationBtns[i].addEventListener('click', (e) => {
            if (!calc.operationPressed) {
                if (calc.savedOperation && !calc.equalsPressed) {
                    calc.runningTotal = operate(calc.savedOperation, Number(calc.runningTotal), Number(calc.displayValue))
                    updateDisplays()
                } else if (!calc.equalsPressed) {
                    calc.runningTotal = calc.displayValue
                    updateDisplays()
                } else {
                    calc.runningTotal = Number(calc.displayValue)
                    calc.equalsPressed = false
                    updateDisplays()
                }
                if (e.target.classList.contains('add')) {
                    calc.savedOperation = 'add'
                } else if (e.target.classList.contains('subtract')) {
                    calc.savedOperation = 'subtract'
                } else if (e.target.classList.contains('multiply')) {
                    calc.savedOperation = 'multiply'
                } else if (e.target.classList.contains('divide')) {
                    calc.savedOperation = 'divide'
                }
            } else {
                if (e.target.classList.contains('add')) {
                    calc.savedOperation = 'add'
                } else if (e.target.classList.contains('subtract')) {
                    calc.savedOperation = 'subtract'
                } else if (e.target.classList.contains('multiply')) {
                    calc.savedOperation = 'multiply'
                } else if (e.target.classList.contains('divide')) {
                    calc.savedOperation = 'divide'
                }
            }
            calc.operationPressed = true
            calc.posNegPressed = false
            for (let i = 0; i < 4; i++) {
                operationBtns[i].classList.remove('active')
            }
            e.target.classList.add('active')
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

function round(num, precision) {
    return Number(Math.round(num + "e+" + precision) + "e-" + precision)
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
    if (output >= 1000000000) {
        let exponent = String(output).length - 1
        output = String(round((output / (10 ** exponent)), 8)) + "e" + exponent
        return output
    }
    return round(output, 8)
}

function scaleFontSize() {
    if (mainDisplay.textContent.length > 12) {
        mainDisplay.style.fontSize = "1.75rem"
    } else if (mainDisplay.textContent.length > 9) {
        mainDisplay.style.fontSize = "2.5rem"
    } else {
        mainDisplay.style.fontSize = "2.75rem"
    }
}

function updateDisplays() {
    mainDisplay.textContent = calc.displayValue
    runningTotalDisplay.textContent = calc.runningTotal
}


module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
}
