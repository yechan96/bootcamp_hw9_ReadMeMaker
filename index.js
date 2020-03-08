const inquirer = require('inquirer');
const GitHub = require('github-api');
const fs = require('fs');
const gh = new GitHub();
const questions =[
    {
        type:'input',
        name:'user',
        message: 'What is your GitHub username?'

    },
    {
        type:'input',
        name:'projectname',
        message: 'What is your project\'s name?'

    },
    {
        type:'input',
        name:'description',
        message: 'Please write a short description of your project:'

    },
    {
        type:'list',
        name:'license',
        message: 'What kind of license should your project have?',
        choices: ["MIT","APACHE 2.0","GPL 3.0","BSD 3","None"]

    },
    {
        type:'input',
        name:'dependencies',
        message: 'What command should be run to install dependencies?'

    },
    {
        type:'input',
        name:'tests',
        message: 'What command should be run tests?'

    },
    {
        type:'input',
        name:'using',
        message: 'What does the user need to know about using the repo?'

    },
    {
        type:'input',
        name:'contribute',
        message: 'What does the user need to know about contributing to the repo?'

    }
];
const retreiveUser = (user)=>{
    return gh.getUser(user).getProfile();
}

async function main(){
    const input = await inquirer.prompt(questions);
    const user = await retreiveUser(input.user);
    const write = await readMeGen(input,user.data);
}

main();


//the whole thing


function readMeGen (input, user){
    var text =
`# ${input.projectname}
[![GitHub license](https://img.shields.io/badge/license-${input.license}-blue.svg)](https://github.com/yechan96/${input.projectname})
## Description

${input.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependecies, run the following command:

\`\`\`
${input.dependencies}
\`\`\`

## Usage

${input.using}

## License

${input.license}

## Contributing

${input.contribute}

## Tests

\`\`\`
${input.tests}
\`\`\`

## Questions

<img src="${user.avatar_url}" alt="avatar" style="border-radius: 16px" width="30">

If you have any questions about the repo, open an issue or contact [${user.login}](${user.url}) directly at null.

`;

    fs.writeFile('README.md',text,(err)=>{
        if (err) throw err;
        console.log("Done!");
    });
    return Promise.resolve();
}

