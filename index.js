// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// Array of questions for user input
const questions = readmeData => {
    return inquirer.prompt([
        {
            // Title 
            type: 'input',
            name: 'title',
            message: 'What would you like to title your README page? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your README title!');
                    return false;
                }
            }
        },
        {
            // Description Section
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description for your project!');
                    return false;
                }
            }
        },
        {
            // Installation Section
            type: 'input',
            name: 'installation',
            message: 'Provide installation instructions (Required)',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter installation instructions for your project!');
                    return false;
                }
            }
        },
        {
            // Usage Section
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use for the project (Required)',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please enter instructions and examples for use for your project!');
                    return false;
                }
            }
        },
        {
            // License Section
            type: 'checkbox',
            name: 'license',
            message: 'Select the licenses required for this project (Check all that apply)',
            choices: ['Mozilla Public', 'MIT', 'Open', 'Apache']
        },
        {
            // Contributing Section
            type: 'input',
            name: 'contributing',
            message: 'Provide contribution guidelines for your project (Required)',
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log('Please enter contribution guidelines for your project!');
                    return false;
                }
            }
        },
        {
            // Tests Section
            type: 'input',
            name: 'tests',
            message: 'Provide tests for the project (Required)',
            validate: testInput => {
                if (testInput) {
                    return true;
                } else {
                    console.log('Please enter tests to test your project!');
                    return false;
                }
            }
        },
        {
            // Questions Section
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub username (Required)',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email address!');
                    return false;
                }
            }
        }
    ]);
}; 

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

// Function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, error => {
            if (error) {
                reject(error);
                return;
            }
            resolve({
                ok: true,
                message: 'README file created!'
            });
        });
    });
};

// Function to initialize app
function init() {
    return questions()
        .then(readmeData => {
            return generateMarkdown(readmeData);
        })
        .then(pageREADME => {
            return writeFile(pageREADME);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
        })
        .catch(error => {
            console.log(error);
        });
}

// Function call to initialize app
init();