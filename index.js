const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer')
const Intern = require ('./lib/intern');
const generateHTML = require('./generateHTML');
const { create } = require('domain');

var teamEngineers = [];
var teamInterns = [];
var manager;
var managerCard;
var engineerCard;
var internCard;

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
                name: "officeNumber"
            }
        ])
        .then((response) => {
            var { managerName, managerID, managerEmail, officeNumber } = response;
            manager = new Manager(managerName, managerID, managerEmail, officeNumber);
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
            var {engineerName, engineerId, engineerEmail, github} = response;
            var engineer = new Engineer(engineerName, engineerId, engineerEmail, github);
            
            teamEngineers.push(engineer);
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
            var {internName, internId, internEmail, school} = response;
            var intern = new Intern(internName, internId, internEmail, school);            
            teamInterns.push(intern);
            generateTeam();
        })
}

function renderManagerCard() {
    console.log(manager);
    const name = manager.getName();
    const role = manager.getRole();
    const id = manager.getId();
    const email = manager.getEmail();
    const officeNumber = manager.getOfficeNumber();
    
    managerCard = `
     <div class="card" style="width: 18rem;">
         <div class="card-body">
             <h5 class="card-title">${name}</h5>
             <p class="card-text">${role}</p>
         </div>
         <ul class="list-group list-group-flush">
             <li class="list-group-item">Employee ID: ${id}</li>
             <li class="list-group-item">E-mail: ${email}</li>
             <li class="list-group-item">Office Number: ${officeNumber}</li>
         </ul>
     </div>
     `
     return managerCard;
}

function createPage() {
    renderManagerCard();
    console.log(managerCard);
    // generateHTML();
    // fs.writeFile('./index.html', htmlString, (err) =>
    //     err ? console.error(err) : console.log("HTML Page Successfully Created!")
    // )
}

createManager();