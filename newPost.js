const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")

require("dotenv").config()

if (!fs.existsSync(path.join(__dirname, ".env"))) {
  return inquirer
    .prompt([
      {
        name: "author",
        type: "input",
        message: "whats your name?",
      },
    ])
    .then(answers => {
      const { author } = answers
      fs.writeFileSync(path.join(__dirname, ".env"), `AUTHOR=${author}\n`)
    })
}
const author = process.env.AUTHOR

if (!author) {
  // require('fs').writeF
  // -- write file
  console.log("ok hi")
}
