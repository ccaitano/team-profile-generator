const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer')
const Intern = require ('./lib/intern');
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

            generateTeam();
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
            var engineer = new Engineer(name, id, email, github);
            
            teamMembers.push(engineer);
            generateTeam();
        })
}

function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the Intern's name: ",
                name: "internName"
            },
            {
                type: "input",
                message: "Please enter the Intern's id: ",
                name: "internId"
            },
            {
                type: "input",
                message: "Please enter the Intern's e-mail: ",
                name: "internEmail"
            },
            {
                type: "input",
                message: "Please enter the Intern's school: ",
                name: "school"
            }
        ])
        .then(response => {
            var {name, id, email, school} = response;
            var intern = new Intern(name, id, email, school);
            
            teamMembers.push(intern);
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