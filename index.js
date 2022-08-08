const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./generateHTML');

const managerQuestions = [
    {
        type: "input",
        message: "Welcome to the Team Profile Generator. Please press 'ENTER' to begin.",
        name: "welcome"
    },
    {
        type:"input",
        message: "Please enter the Team Manager's name: ",
        name: "managerName"
    },
    {
        type: "input",
        message: "Please enter the Team Manager's employee ID: ",
        name: "managerID"
    },
    {
        type: "input",
        message: "Please enter the Team Manager's e-mail address: ",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "Please enter the Team Manager's office number: ",
        name: "managerNumber"
    },
    {
        type: "list",
        message: "Would you like to add another employee to this team?",
        name: "addEmployee",
        choices: ["Add New Engineer", "Add New Intern", "No Other Team Members to Add"],
        default: "No Other Team Members to Add"
    }
]
function writeToFile(data) {
    generateHTML(data);
    console.log(data.managerEmail);
    // fs.writeFile('./index.html', htmlString, (err) =>
    //     err ? console.error(err) : console.log("HTML Page Successfully Created!")
    // )
}

function init() {
    inquirer
        .prompt([
            ...managerQuestions
        ])
        .then((response) => {
            writeToFile(response);
        });
}

init();