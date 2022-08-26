const { ask, startNewPresentation, clearLog } = require('./utils')
const Ex1 = require('./ex1/presentation')
const Ex2 = require('./ex2/presentation')

async function startProcess(option) {
  switch (option) {
    case '1':
      return Ex1.init();
    case '2':
      return Ex2.init()
  }
}

const content = `
  Which exercise do you wanna test?
  
  1 - Exercise 1
  2 - Exercise 2

  x - To Exit
`;

(() => {
  startNewPresentation(async (validatePresentation) => {
    clearLog();
    const { option } = await ask({
      name: 'option',
      description: content,
      required: true
    })
    await validatePresentation(option)
    await startProcess(option)
  })
})()