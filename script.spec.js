/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const htmlStr = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const { window } = new JSDOM(
    `<body><script>${script}</script></body>`,
    { runScripts: "dangerously", resources: "usable" }
);

describe('add', () => {
	test('adds 0 and 0', () => {
		expect(window.add(0,0)).toBe(0);
	});

	test('adds 2 and 2', () => {
		expect(window.add(2,2)).toBe(4);
	});

	test('adds positive numbers', () => {
		expect(window.add(2,6)).toBe(8);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(window.subtract(10,4)).toBe(6);
	});
});


describe('multiply', () => {
	test('multiplies two numbers', () => {
		expect(window.multiply(2,4)).toBe(8);
	});

	test('multiplies negative numbers', () => {
		expect(window.multiply(-2,4)).toBe(-8);
	});
});

describe('operate', () => {
    test('performs addition', () => {
        expect(window.operate("add", 2, 4)).toBe(6)
    })

    test('performs subtraction', () => {
        expect(window.operate("subtract", 12, 3)).toBe(9)
    })

    test('performs multiplication', () => {
        expect(window.operate("multiply", 12, 4)).toBe(48)
    })

    test('performs division', () => {
        expect(window.operate("divide", 12, 4)).toBe(3)
    })

    test('returns error message with invalid operator', () => {
        expect(window.operate("power", 2, 3)).toBe("Invalid input")
    })
})


