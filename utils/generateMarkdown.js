// Function that returns a license badge based on which license is passed in
function renderLicenseBadge(data) {
  if (data.license === 'N/A') {
    return '';
  } else {
    return `
    This is a test.
    [![License badge](https://img.shields.io/badge/${data.license}-<STATUS>-<COLOR>.svg)
    `;
  }
}

// Function that returns the license link
function renderLicenseLink(data) {
  if (data.license === 'N/A') {
    return `
    This project does not require a license.
    `
  } else {
    return `
    This project is covered under the ${data.license} license.
    `
  }
}


// Function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  ${renderLicenseBadge(data.license)}

  ## Table of Contents
  * [Description](#Description)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)

  ## Description
  ${data.description}

  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## License
  ${renderLicenseLink(data)}

  ## Contributing
  ${data.contributing}

  ## Tests
  ${data.tests}

  ## Questions
  Want to see more of my work? Check out my GitHub page:
  [${data.username}](https://github.com/${data.username}) 

  If you have any questions, feel free to contact me via email:
  ${data.email}

`;
}

module.exports = generateMarkdown;