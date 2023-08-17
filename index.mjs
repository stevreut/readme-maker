import inquirer from 'inquirer';
import fsp from 'fs/promises';

console.log('preparing to prompt for info mjs');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What is the README's title?"
    },
    {
        type: 'input',
        name: 'description',
        message: "What is the README's description?"
    },
    {
        type: 'input',
        name: 'installation',
        message: "What are the README's installation instructions?"
    },
    {
        type: 'input',
        name: 'usage',
        message: "What are the usage instructions?"
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Contribution information?"
    },
    { 
        type: 'input',
        name: 'tests',
        message: "What information about tests should be included?"
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license was used?',
        choices: ['MIT','Yale','Harvard','none'],  // TODO
        filter (val) {
            return val.toLowerCase().trim();
        }
    }
];

let inqResp = await inquirer.prompt(questions);
console.log('answers received');
let answersJsonString = JSON.stringify(inqResp, null, '  ');
console.log('JSON of answers = \n' + answersJsonString);
console.log('inqResp.description = "' + inqResp.description + '"');

let {
        title,
        description,
        installation,
        usage,
        contributing,
        tests,
        license
    } = inqResp;

let toc = [];
let tocAsString = 'TOC ASDF';  // TODO

function catalog(field, label) {
    let locField = field.trim();
    if (locField === '' || locField === null) {
        return '';
    } else {
        toc.push({label: label, link: '#'+label});
        console.log('toc = ' + JSON.stringify(toc));
        let newField = '\n## ' + label + '\n\n' + 
            locField;
        return newField;
    }
}

function formatToc() {
    for (const entry of toc) {
        tocAsString += 
            ('\n- [' + entry.label + '] (' +
             entry.link + ')');
    }
}

installation = catalog(installation,'Installation');
usage = catalog(usage,'Usage');
contributing = catalog(contributing,'Contributing');  // TODO
tests = catalog(tests,'Testing');

formatToc();

let badges = 'BADGES ASDF';  // TODO

let readMeContent = 

`# ${title}

## Description

${description}

## Table of Contents

${tocAsString}
${installation}
${usage}
${contributing}

## License

${license}

## Badges

${badges}
${tests}`;  

// TODO - ultimately must use different output file name - perhaps prompt for it?
let writeResult = await fsp.writeFile('./misc/log.txt',readMeContent);
console.log('past write - any logging prior?')
