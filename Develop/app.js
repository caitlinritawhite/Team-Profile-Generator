const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const mainHTML = require('./templates/mainHTML');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const { create } = require("domain");



const managerCard = require('./templates/managerhtml');
const internCard = require('./templates/internhtml');
const engineerCard = require('./templates/engineerhtml');


const fullTeam = [];

const mainApp = () => {
    console.log('Build your team!');
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is your Managers name?',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is your Managers employee ID?',
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is your Managers email address?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your Managers office number?'
        },
    ])
    .then(questions => {
        const manager = new Manager(
            questions.managerName,
            questions.managerId,
            questions.managerEmail,
            questions.officeNumber
        );
        const managerCardHtml = managerCard(manager);
        fullTeam.push(managerCardHtml);
        addTeamMembers();
    });

    function addTeamMembers(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'addMembers',
                message: 'Would you like to:',
                choices: [
                    'Add an Engineer',
                    'Add an Intern',
                    'See my team!'
                ],
            },
        ])
        .then(answers => {
            switch (answers.addMembers){
                case 'Add an Engineer': {
                    promptEngineer();
                    break;
                }
                case 'Add an Intern': {
                    promptIntern();
                    break;
                }
                case 'See my team!': {
                    buildTeam();
                    break;
                }
            }
        });
    }

    const promptEngineer = () => {
        console.log('Engineer Info:');
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is your Engineers name?',
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is the Engineers ID number?'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is the Engineers email address?',
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is the Engineers GitHub username?'
            },
        ])
        .then(response => {
            const engineer = new Engineer(
                response.engineerName,
                response.engineerId,
                response.engineerEmail,
                response.engineerGithub
            );
            const engineerCardHtml = engineerCard(engineer);
            fullTeam.push(engineerCardHtml);
            addTeamMembers();
        });
    };

    const promptIntern = () => {
        console.log('Intern Info:');
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is your Interns name?',
            },
            {
                type: 'input',
                name: 'internId',
                message: 'What is your Interns ID number?'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is your Interns email address?'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "What school does your Intern attend?",
            },
        ])
        .then(response => {
            const intern = new Intern(
                response.internName,
                response.internId,
                response.internEmail,
                response.internSchool,
            );
            const internCardHtml = internCard(intern);
            fullTeam.push(internCardHtml);
            addTeamMembers();
        })
    }
    function buildTeam() {
        const finalTeam = fullTeam.join('');
        fs.writeFileSync(outputPath, mainHTML(finalTeam), 'utf-8')
    }
};

mainApp();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
