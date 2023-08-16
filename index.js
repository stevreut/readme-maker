// // TODO: Include packages needed for this application

// // TODO: Create an array of questions for user input
// const questions = [];

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();

// ABOVE THIS POINT was the original starter code, now commented out and
// probably ultimately to be deleted.

const inquirer = require('inquirer');

console.log('preparing to prompt for info');

const questions = [
    {
        type: 'input',
        name: 'description',
        message: "What is the README description?",
    },
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter(val) {
            return val.toLowerCase();
        }
    }
];

let tempAnswers = null;  // TODO

inquirer.prompt(questions).then((answers) => {
    console.log('answers received');
    tempAnswers = answers;
    answersJsonString = JSON.stringify(answers, null, '  ');
    console.log('JSON of answers = \n' + answersJsonString);
});