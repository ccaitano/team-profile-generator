const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./generateHTML');

function writeToFile(data) {
    generateHTML(data);
    fs.writeFile('./index.html', readMeString, (err) =>
        err ? console.error(err) : console.log("HTML Page Successfully Created!")
    )
}

function init() {
    inquirer
        .prompt([

        ])
        .then((response) => {
            writeToFile(response);
        });
}

init();