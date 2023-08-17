import inquirer from 'inquirer';
import fsp from 'fs/promises';

console.log('preparing to prompt for info mjs');

const questions = [
    {
        type: 'input',
        name: 'user',
        message: 'What is your GitHub user name?'
    },
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
        type: 'input',
        name: 'email',
        message: "What is your email address?"
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license was used?',
        choices: ['MIT','GPLv2','Apache','GPLv3','BSD 3-clause','LGPv3','no license']
        // filter (val) {
        //     return val.toLowerCase().trim();
        // }
    }
];

let inqResp = await inquirer.prompt(questions);
console.log('answers received');
let answersJsonString = JSON.stringify(inqResp, null, '  ');
console.log('JSON of answers = \n' + answersJsonString);
console.log('inqResp.description = "' + inqResp.description + '"');

let {
        user,
        title,
        description,
        installation,
        usage,
        contributing,
        tests,
        email,
        license
    } = inqResp;

user = user.trim();
let gitHubUrl = '';
let gitUserInfo = '';
if (user !== '' && user !== null) {
    gitHubUrl = 'http://github.com/' + user + '/';
    gitUserInfo = `\nMore information about this repository can be found by 
referring to GitHub user account [${user}](${gitHubUrl}).`
}

email = email.trim();
let emailPara = '';
if (email !== '' && email !== null) {
    emailPara = '\nFor more information, contact the owner of ' +
        'this repository at [' + email + '](mailto:' + email + ').';
}

let toc = [];
let tocAsString = '';

function catalog(field, label) {
    let locField = field.trim();
    if (locField === '' || locField === null) {
        return '';
    } else {
        toc.push({label: label, link: '#'+label.toLowerCase()});
        console.log('toc = ' + JSON.stringify(toc));
        let newField = '\n## ' + label + '\n\n' + 
            locField;
        return newField;
    }
}

function formatToc() {
    for (const entry of toc) {
        tocAsString += 
            ('\n- [' + entry.label + '](' +
             entry.link + ')');
    }
}

if (license === 'no license') {
    license = 'This software is not licensed.'
} else {
    license = 'This software is available under the terms of the ' +
        license + ' license.';
}

installation = catalog(installation,'Installation');
usage = catalog(usage,'Usage');
contributing = catalog(contributing,'Contributing');  // TODO
tests = catalog(tests,'Testing');

formatToc();

let badges = '';

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
${tests}

## Questions
${gitUserInfo}
${emailPara}`;  

// TODO - ultimately must use different output file name - perhaps prompt for it?
let writeResult = await fsp.writeFile('./misc/log.txt',readMeContent);
console.log('past write - any logging prior?')
