// String bases 
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";

// Curried functions to get random strings from different bases
const getRandomAlphabets = getRandomObjects(alphabets);
const getRandomNumbers = () => {
    // Caps the numbers to be 15 digits for accuracy purpose
    randomNumbers = getRandomObjects(numbers)(15);
    return trimLeadingZeroes(randomNumbers);
}
const getRandomAlphanumerics = () => {
    randomAlphanumerics = getRandomObjects(alphabets + numbers)();
    // Makes sure that the alphanumerics contain both the alphabets and numbers
    while (onlyNumbers(randomAlphanumerics) || onlyAlphabets(randomAlphanumerics)) {
        randomAlphanumerics = getRandomObjects(alphabets + numbers)();
    }
    return randomAlphanumerics;
}
const getRandomRealNumbers = () => {
    randomNumbers = getRandomObjects(numbers)(15);
    // Randomizes the position of the decimal point in the numeric string 
    /* The decimal point shouldn't be placed after the last character else it would be an integer instead */
    randomDecimalPointPos = Math.floor(Math.random() * (randomNumbers.length - 1));
    randomRealNumbers = randomNumbers.slice(0, randomDecimalPointPos) + "." + randomNumbers.slice(randomDecimalPointPos, randomNumbers.length);
    // Formats the floating points properly 
    return parseFloat(randomRealNumbers).toString();
}

function getRandomObjects(base) {
    // Defaults to 20 max length for the randomized string
    return function(maxLength = 20) {
        const baseLength = base.length;
        const objectLength = Math.floor(Math.random() * maxLength) + 1;
        let result = "";
        for (let i = 0; i < objectLength; i++) {
            // Retrieves a character from the base string randomly and appends it to the randomized string
            result += base.charAt(Math.floor(Math.random() * baseLength));
        }
        return result; 
    }
}

function trimLeadingZeroes(inputString) {
    trimmedString = inputString.replace(/^0+/, "");
    return (trimmedString.length >= 1 ? trimmedString : "0");
}

function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
}

function onlyAlphabets(str) {
    return /^[a-z]+$/.test(str.toLowerCase());
}

exports.getRandomAlphabets = getRandomAlphabets;
exports.getRandomNumbers = getRandomNumbers;
exports.getRandomAlphanumerics = getRandomAlphanumerics;
exports.getRandomRealNumbers = getRandomRealNumbers;