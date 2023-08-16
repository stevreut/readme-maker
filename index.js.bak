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
const fs = require('fs');

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
    return answers;
}).then((data) => {
    // TODO data is a place-holder name, ultimate TBD
    console.log('data.description = "' + data.description + '"');
    console.log('data.size = "' + data.size + '"');
    const {description,size} = data;
    let logContent = 
`Demo README as log file
================
 Description:
    ${description}
================
 Size:
    ${size}
================`;
    fs.writeFile('./misc/log.txt',logContent, (err) => {
        if (err) {
            console.log('error on write = "' + err + '"');
        } else {
            console.log('write to ./misc/log.txt was successful');
        }
    })
});  // TODO - no error checking?!