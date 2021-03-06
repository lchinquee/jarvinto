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
            type: 'list',
            name: 'license',
            message: 'Select the licenses required for this project (Required)',
            choices: ['Mozilla', 'MIT', 'Open', 'Apache', 'N/A']
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