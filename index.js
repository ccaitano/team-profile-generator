const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer')
const generateHTML = require('./generateHTML');
const { create } = require('domain');

var teamMembers = [];

function generateTeam(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add another employee to this team?",
                name: "addEmployee",
                choices: ["Add New Engineer", "Add New Intern", "No Other Team Members to Add"],
                default: "No Other Team Members to Add"
            }
        ])
        .then((response) => {
            const employeeType = response.addEmployee;
            switch(employeeType) {
                case "Add New Engineer":
                    createEngineer();
                    break;
                case "Add New Intern":
                    createIntern();
                    break;
                case "No Other Team Members to Add":
                    createPage();
                    break;
            }
        })
}

function createManager() {
    inquirer
        .prompt([
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
            }
        ])
        .then((response) => {
            var { managerName, managerID, managerEmail, officeNumber } = response;
            var manager = new Manager(managerName, managerID, managerEmail, officeNumber);

            teamMembers.push(manager);
        });

}

function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the Engineer's name: ",
                name: "engineerName"
            },
            {
                type: "input",
                message: "Please enter the Engineer's id: ",
                name: "engineerId"
            },
            {
                type: "input",
                message: "Please enter the Engineer's e-mail: ",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "Please enter the Engineer's GitHub username: ",
                name: "github"
            }

        ])
        .then(response => {
            var {name, id, email, github} = response;
            var engineer = Engineer(name, id, email, github);
            
            teamMembers.push(engineer);
            generateTeam();
        })
}
function writeToFile(data) {
    generateHTML(data);
    console.log(data.managerEmail);
    // fs.writeFile('./index.html', htmlString, (err) =>
    //     err ? console.error(err) : console.log("HTML Page Successfully Created!")
    // )
}

createManager();