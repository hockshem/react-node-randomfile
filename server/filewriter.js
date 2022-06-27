const fs = require("fs");
const path = require("path");
const randomiser = require("./randomiser"); 

const randomiserFunctions = [randomiser.getRandomAlphabets, randomiser.getRandomNumbers, randomiser.getRandomRealNumbers, randomiser.getRandomAlphanumerics];

const randomObjectsCount = {
    alphabets: 0,
    numbers: 0,
    realNumbers: 0,
    alphanumerics: 0
};

const writeRandomStringsToFile = (fileName, maxSizeInMB = 2) => {
    resetRandomObjectCount();
    const absolutePath = path.join(__dirname, "public", fileName);
    const writeStream = fs.createWriteStream(absolutePath);
    const maxSizeInBytes = toBytes(maxSizeInMB);
    writeStream.on("open", (_) => {
        console.log("File descriptor is opened!");
    });
    writeStream.on("finish", () => {
        console.log("All writes are complete.");
        console.log(`Bytes written: ${writeStream.bytesWritten}`);
    });
    writeStream.on("close", () => {
        console.log("File descriptor is closed.");
    });

    let bytesInStream = 0;

    let randomiserFunction = pickRandomiserFunction();
    let randomObject = randomiserFunction();
    writeStream.write(randomObject);
    bytesInStream += randomObject.length;
    increaseRandomObjectCount(randomiserFunction);
    
    while (bytesInStream < maxSizeInBytes) {
        randomiserFunction = pickRandomiserFunction();
        randomObject = ", " + randomiserFunction();
        writeStream.write(randomObject);
        bytesInStream += randomObject.length;
        increaseRandomObjectCount(randomiserFunction);
    }

    console.log(`Bytes written: ${bytesInStream}`);

    writeStream.end();

    return fileName;
};

function toBytes(MB) {
    return MB * 1024 * 1024;
}

function pickRandomiserFunction() {
    const index = Math.floor(Math.random() * randomiserFunctions.length);
    return randomiserFunctions[index];
}

function increaseRandomObjectCount(randomiserFunction) {
    switch (randomiserFunction) {
        case randomiser.getRandomAlphabets:
            randomObjectsCount.alphabets++;
            break;
        case randomiser.getRandomNumbers:
            randomObjectsCount.numbers++;
            break;
        case randomiser.getRandomRealNumbers:
            randomObjectsCount.realNumbers++;
            break;
        case randomiser.getRandomAlphanumerics:
            randomObjectsCount.alphanumerics++;
            break;
        default: 
            break;
    }
}

function resetRandomObjectCount() {
    randomObjectsCount.alphabets = 0;
    randomObjectsCount.numbers = 0;
    randomObjectsCount.alphanumerics = 0;
    randomObjectsCount.realNumbers = 0;
}

exports.writeRandomStringsToFile = writeRandomStringsToFile;
exports.randomObjectsCount = randomObjectsCount;

