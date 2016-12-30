const fs = require('fs')
const path = require('path')

const types = fs.readdirSync(path.join(__dirname, 'template'))
  .filter(v => /^gi-/.test(v))
  .map(v => v.substring(3))

const filters = {}
types.forEach(type => {
  filters[`gi-${type}`] = `type === "${type}"`
})

module.exports = {
  enforceCurrentFolder: true,
  prompts: {
    type: {
      type: 'list',
      message: 'Choose a gitignore file:',
      choices: types
    }
  },
  move: {
    'gi-*': '.gitignore'
  },
  filters: filters,
  post({chalk, folderName, answers, log}) {
    log.success(`${answers.type} .gitignore is successfully generated in ${folderName}`)
  }
}
