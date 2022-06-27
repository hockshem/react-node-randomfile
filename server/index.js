const express = require("express");
const fs = require("fs");
const cors = require("cors");
const fw = require("./filewriter");

const fileName = "randomObjects.txt";
const randomObjectsEndPoint = "/api/randomObjects"

const PORT = 3001;

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.get(randomObjectsEndPoint, (req, res) => {
    res.json({message: "Server Status: Online"});
});

app.get(`${randomObjectsEndPoint}/generateFile`, (req, res) => {
    let name = fw.writeRandomStringsToFile(fileName);
    res.json({status: "Success", fileName: name});
});

app.get(`${randomObjectsEndPoint}/getCount`, (req, res) => {
    res.json(fw.randomObjectsCount);
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});

