const allClearBtn = document.querySelector('.all-clear')
const clearBtn = document.querySelector('.clear')
const posNegBtn = document.querySelector('.pos-neg')
const equalBtn = document.querySelector('.equal')
const decimalBtn = document.querySelector('.decimal')
const numberBtns = Array.from(document.querySelectorAll('.number'))
const operationBtns = Array.from(document.querySelectorAll('.operation'))
const runningTotalDisplay = document.querySelector('.running-total-display')
const mainDisplay = document.querySelector('.main-display')

let calc = new Map()

setCalcDefault()

createNumberEventListeners()

createOperationEventListeners()

allClearBtn.addEventListener('click', () => {
    setCalcDefault()
    updateDisplays()
    scaleFontSize()
})

clearBtn.addEventListener('click', () => {
    calc.set("displayValue", "0")
    if (calc.get("equalsPressed")) {
        calc.set("runningTotal", 0)
    }
    calc.set("equalsPressed", false)
    updateDisplays()
    scaleFontSize()
})

equalBtn.addEventListener('click', () => {
    if (calc.get("savedOperation")) {
        calc.set("displayValue", String(operate(calc.get("savedOperation"), Number(calc.get("runningTotal")), Number(calc.get("displayValue")))))
        calc.set("runningTotal", calc.get("displayValue"))
    }
    calc.set("equalsPressed", true)
    updateDisplays()
    scaleFontSize()
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
    scaleFontSize()
})

posNegBtn.addEventListener('click', () => {
    if (calc.get("operationPressed")) {
        calc.set("posNegPressed", true)
    } else {
        if (!calc.get("posNegPressed") && !calc.get("equalsPressed")) {
            calc.set("displayValue", "-" + calc.get("displayValue"))
            calc.set("posNegPressed", true)
        } else {
            calc.set("displayValue", Number(calc.get("displayValue")) * -1)
            calc.set("posNegPressed", false)
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
            if (calc.get("displayValue").length >= 9 && !calc.get("operationPressed")) { return }
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
                        calc.set("decimalPressed", false)
                    }
                } else if (calc.get("posNegPressed")) {
                    if (calc.get("displayValue") === "-0") {
                        calc.set("displayValue", String((Number(e.target.textContent) * -1)))
                    } else {
                        calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                    }
                } else if (calc.get("decimalPressed")) {
                    calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                } else if (calc.get("displayValue") === "0") {
                    calc.set("displayValue", e.target.textContent)
                } else {
                    calc.set("displayValue", calc.get("displayValue") + e.target.textContent)
                }
            }
            calc.set("operationPressed", false)
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
            if (!calc.get("operationPressed")) {

                if (calc.get("savedOperation") && !calc.get("equalsPressed")) {
                    calc.set("runningTotal", operate(calc.get("savedOperation"), Number(calc.get("runningTotal")), Number(calc.get("displayValue"))))
                    updateDisplays()
                } else if (!calc.get("equalsPressed")) {
                    calc.set("runningTotal", calc.get("displayValue"))
                    updateDisplays()
                } else {
                    calc.set("equalsPressed", false)
                }
                if (e.target.classList.contains('add')) {
                    calc.set("savedOperation", 'add')
                } else if (e.target.classList.contains('subtract')) {
                    calc.set("savedOperation", 'subtract')
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
            console.log("OPERATION PRESSED")
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
    mainDisplay.textContent = calc.get("displayValue")
    runningTotalDisplay.textContent = calc.get("runningTotal")
}


module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate
}
