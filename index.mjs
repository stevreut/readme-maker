import inquirer from 'inquirer';
import fsp from 'fs/promises';

// const inquirer = require('inquirer');
// const fs = require('fs');

console.log('preparing to prompt for info mjs');

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

let inqResp = await inquirer.prompt(questions);
console.log('answers received');
let answersJsonString = JSON.stringify(inqResp, null, '  ');
console.log('JSON of answers = \n' + answersJsonString);
console.log('inqResp.description = "' + inqResp.description + '"');
console.log('inqResp.size = "' + inqResp.size + '"');
const {description,size} = inqResp;
let logContent = 
`Demo README as log file
================
 Description:
    ${description}
================
 Size:
    ${size}
================`;
let writeResult = await fsp.writeFile('./misc/log.txt',logContent);
console.log('past write - any logging prior?')
