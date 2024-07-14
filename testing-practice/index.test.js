import {
    capitalize,
    reverseString,
    calculator,
    caesarCipher,
    analyzeArray,
} from './index';

// ================== Capitalize ================= \\
test('Capitalize : Happy path', () => {
    expect(capitalize('nOt CapItAlIzeD')).toBe('Not capitalized');
});

test('Capitalize : empty string', () => {
    expect(capitalize('')).toBe('');
});

test('Capitalize : single character', () => {
    expect(capitalize('a')).toBe('A');
});

test('Capitalize : already capitalized string', () => {
    expect(capitalize('Capitalized')).toBe('Capitalized');
});

test('Capitalize : string with numbers', () => {
    expect(capitalize('123 not capitalized')).toBe('123 not capitalized');
});

test('Capitalize : string with leading spaces', () => {
    expect(capitalize('  leading spaces')).toBe('  leading spaces');
});
// ================================================ \\

// ================= Reverse string =============== \\
test('Reverse string : Happy path', () => {
    expect(reverseString('not Reversed')).toBe('desreveR ton');
});
test('Reverse string : empty', () => {
    expect(reverseString('')).toBe('');
});

test('Reverse string : single character', () => {
    expect(reverseString('a')).toBe('a');
});

test('Reverse string : with special characters', () => {
    expect(reverseString('@#$!')).toBe('!$#@');
});

// ================================================ \\

// =================== Calculator ================= \\
test('Calculator : add', () => {
    expect(calculator.add(10, 34)).toBe(44);
});

test('Calculator : subtract', () => {
    expect(calculator.subtract(10, 5)).toBe(5);
});

test('Calculator : divide', () => {
    expect(calculator.divide(20, 5)).toBe(4);
});

test('Calculator : multiply', () => {
    expect(calculator.multiply(10, 100)).toBe(1000);
});

test('Calculator : divide by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
});

test('Calculator : floating point multiplication', () => {
    expect(calculator.multiply(0.1, 0.2)).toBeCloseTo(0.02);
});

test('Calculator : negative numbers addition', () => {
    expect(calculator.add(-10, 5)).toBe(-5);
});
// ================================================ \\

// ================= Caesar cipher ================ \\
test('Caesar cipher : happy path', () => {
    expect(caesarCipher('Hello, World!', 10)).toBe('Rovvy, Gybvn!');
});

test('Caesar cipher : empty string', () => {
    expect(caesarCipher('', 5)).toBe('');
});

test('Caesar cipher : no shift (should return the same string)', () => {
    expect(caesarCipher('Hello, World!', 0)).toBe('Hello, World!');
});

test('Caesar cipher : wrap around from end of alphabet', () => {
    expect(caesarCipher('Zebra', 5)).toBe('Ejgwf');
});
// ================================================ \\

// ================= Analyze array ================ \\

test('Analyze array : happy path', () => {
    const array = [1, 8, 3, 4, 2, 6];
    const target = {
        average: 4,
        min: 1,
        max: 8,
        length: 6,
    };
    expect(analyzeArray(array)).toEqual(target);
});

test('Analyze array : empty array', () => {
    expect(analyzeArray([])).toEqual({
        average: NaN,
        min: undefined,
        max: undefined,
        length: 0,
    });
});

test('Analyze array : array with negative numbers', () => {
    const negativeArray = [-1, -2, -3, -4, -5];
    const negativeTarget = {
        average: -3,
        min: -5,
        max: -1,
        length: 5,
    };
    expect(analyzeArray(negativeArray)).toEqual(negativeTarget);
});

test('Analyze array : array with duplicate numbers', () => {
    const duplicateArray = [2, 2, 2, 2, 2];
    const duplicateTarget = {
        average: 2,
        min: 2,
        max: 2,
        length: 5,
    };
    expect(analyzeArray(duplicateArray)).toEqual(duplicateTarget);
});
// ================================================ \\
