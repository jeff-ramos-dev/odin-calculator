const calculator = require('./script')

describe('add', () => {
	test('adds 0 and 0', () => {
		expect(calculator.add(0,0)).toBe(0);
	});

	test('adds 2 and 2', () => {
		expect(calculator.add(2,2)).toBe(4);
	});

	test('adds positive numbers', () => {
		expect(calculator.add(2,6)).toBe(8);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(calculator.subtract(10,4)).toBe(6);
	});
});


describe('multiply', () => {
	test('multiplies two numbers', () => {
		expect(calculator.multiply(2,4)).toBe(8);
	});

	test('multiplies negative numbers', () => {
		expect(calculator.multiply(-2,4)).toBe(-8);
	});
});

describe('operate', () => {
    test('performs addition', () => {
        expect(calculator.operate("add", 2, 4)).toBe(6)
    })

    test('performs subtraction', () => {
        expect(calculator.operate("subtract", 12, 3)).toBe(9)
    })

    test('performs multiplication', () => {
        expect(calculator.operate("multiply", 12, 4)).toBe(48)
    })

    test('performs division', () => {
        expect(calculator.operate("divide", 12, 4)).toBe(3)
    })

    test('returns error message with invalid operator', () => {
        expect(calculator.operate("power", 2, 3)).toBe("Invalid input")
    })
})


