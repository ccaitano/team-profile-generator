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
var managerCard="";
var teamEngineerCards="";
var engineerCard;
var teamInternCards="";
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
    const name = manager.getName();
    const role = manager.getRole();
    const id = manager.getId();
    const email = manager.getEmail();
    const officeNumber = manager.getOfficeNumber();
    
    managerCard = `
    <div class="row py-4 mx-auto">
        <div class="col-sm col-md-4 col-lg-8">
            <div class="card bg-primary" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold text-white">${name}</h5>
                    <p class="card-text text-white">${role}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Employee ID: ${id}</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${email}" target="_blank">${email}</a></li>
                    <li class="list-group-item">Office Number: ${officeNumber}</li>
                </ul>
            </div>
        </div>
     </div>`

     return managerCard;
}


function renderEngineerCard(name, role, id, email, github) { 
    engineerCard = `
    <div class="row py-4 mx-auto">
        <div class="col-sm col-md-4 col-lg-8">
            <div class="card bg-success" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold text-white">${name}</h5>
                    <p class="card-text text-white">${role}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Employee ID: ${id}</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${email}" target="_blank">${email}</a></li>
                    <li class="list-group-item">GitHub Username: <a href="https://github.com/${github}" target="_blank">${github}</a></li>
                </ul>
            </div>
        </div>
     </div>`

     return engineerCard;
}

function generateEngineerCards() {
    for (var i = 0; i < teamEngineers.length; i++ ) {
        let teamEngineer = teamEngineers[i];
        let name = teamEngineer.getName();
        let role = teamEngineer.getRole();
        let id = teamEngineer.getId();
        let email = teamEngineer.getEmail();
        let github = teamEngineer.getGithub();
        teamEngineerCards += renderEngineerCard(name, role, id, email, github);
    }
    return teamEngineerCards;
}

function renderInternCard(name, role, id, email, school) { 
    internCard = `
    <div class="row py-4 mx-auto">
        <div class="col-sm col-md-4 col-lg-8">
            <div class="card bg-warning" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold text-white">${name}</h5>
                    <p class="card-text text-white">${role}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Employee ID: ${id}</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${email}" target="_blank">${email}</a></li>
                    <li class="list-group-item">Current School: ${school}</li>
                </ul>
            </div>
        </div>
     </div>`

    return internCard;
}

function generateInternCards() {
    for (var i = 0; i < teamInterns.length; i++ ) {
        let teamIntern = teamInterns[i];
        let name = teamIntern.getName();
        let role = teamIntern.getRole();
        let id = teamIntern.getId();
        let email = teamIntern.getEmail();
        let school = teamIntern.getSchool();
        teamInternCards += renderInternCard(name, role, id, email, school);
    }
    return teamInternCards;
}

function createPage() {
    renderManagerCard();
    generateEngineerCards();
    generateInternCards();
    generateHTML(managerCard, teamEngineerCards, teamInternCards);
    fs.writeFile('./index.html', htmlString, (err) =>
        err ? console.error(err) : console.log("HTML Page Successfully Created!")
    )
}

createManager();