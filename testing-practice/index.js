export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };

const capitalize = (str) => {
    if (!str) return str;

    const lowerCaseArr = str.toLowerCase().split('');
    lowerCaseArr[0] = lowerCaseArr[0].toUpperCase();

    return lowerCaseArr.join('');
};

const reverseString = (str) => {
    const strArr = str.split('');
    let result = '';
    for (let i = strArr.length - 1; i >= 0; i--) {
        result += strArr[i];
    }
    return result;
};

const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    },
};

const caesarCipher = (str, shift) => {
    // NOTE: sorry for the verbose comment, iam dumb, its the only way i'll learn
    let result = '';

    // Enumaeratin
    for (let i = 0; i <= str.length; i++) {
        const originalCode = str.charCodeAt(i);

        if (originalCode >= 65 && originalCode <= 90) {
            // Uppercase
            const baseIndex = originalCode - 65; // 0 = A 1 = B...
            const shiftIndex = (baseIndex + shift) % 26; // Wrap when shift more than 26
            const resultCode = shiftIndex + 65; // Convert back to ascii code

            result += String.fromCharCode(resultCode);
        } else if (originalCode >= 97 && originalCode <= 122) {
            // Lowercase
            const resultCode = ((originalCode - 97 + shift) % 26) + 97;
            result += String.fromCharCode(resultCode);
        } else {
            // Other letter
            result += str.charAt(i);
        }
    }

    return result;
};

const analyzeArray = (array) => {
    if (array.length === 0)
        return {
            min: undefined,
            max: undefined,
            average: NaN,
            length: 0,
        };
    return {
        min: array.reduce((a, b) => (a < b ? a : b)),
        max: array.reduce((a, b) => (a > b ? a : b)),
        average: array.reduce((a, b) => a + b) / array.length,
        length: array.length,
    };
};
