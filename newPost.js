const fs = require("fs")
const fs_ = require("fs-extra")
const path = require("path")
const inquirer = require("inquirer")

function getAuthor() {
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
      return author
    })
}
function init() {
  if (!fs.existsSync(path.join(__dirname, ".env"))) {
    return getAuthor().then(author => {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(__dirname, ".env"),
          `AUTHOR=${author}\n`,
          resolve
        )
      })
    })
  }
  return Promise.resolve()
}

init().then(() => {
  require("dotenv").config()
  const author = process.env.AUTHOR

  return inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Whats the title of the post?",
      },
      {
        name: "description",
        type: "input",
        message: "What is the post's description?",
      },
    ])
    .then(({ title, description }) => {
      const date = new Date().toISOString()
      const config = {
        title,
        author,
        date: `"${date}"`,
        description: `"${description}"`,
      }
      const tmplt = frontMatterTmplt(config)
      const folderName = title
        .toLowerCase()
        .split(" ")
        .slice(0, 5)
        .join("-")
      const indexMD = path.join(
        __dirname,
        "src",
        "blog",
        folderName,
        "index.mdx"
      )
      fs_.outputFile(indexMD, tmplt, console.log)
    })
})

const frontMatterTmplt = config => {
  const frontMatter = Object.keys(config)
    .reduce((acc, k) => {
      let t = `${k}: ${config[k]}`
      return [t, ...acc]
    }, [])
    .join("\n")

  return `---
${frontMatter}
---
`
}
