const prompt = require('prompt');
const { log } = require('console-log-colors')
const { EXIT_CODE } = require('./constants')

prompt.start();

function onError(err) {
  console.error(err)
  return 1;
}

module.exports.ask = (properties) => {
  return new Promise((resolve, reject) => {
    prompt.get(properties, function (err, result) {
      if (err) {
        reject(err)
        return onError(err)
      }
      resolve(result)
    })
  })
}

module.exports.logSuccess = (msg) => {
  log.green(msg)
}

module.exports.logError = (msg) => {
  log.red(msg)
}

module.exports.logInfo = (msg) => {
  log.gray(msg)
}

module.exports.clearLog = () => {
  const isTestEnv = process.env.NODE_ENV === 'test'
  if (!isTestEnv) {
    console.clear()
  }
}

module.exports.startNewPresentation = (childPresentation) => {
  this.clearLog()
  return new Promise(async (resolve) => {
    let option;

    const validatePresentation = (value) => {
      if (value === EXIT_CODE) {
        option = EXIT_CODE;
        return Promise.reject()
      }
      return Promise.resolve()
    }

    while (option !== EXIT_CODE) {
      try {
        await childPresentation(validatePresentation)
      } catch (error) {
        option = EXIT_CODE
      }
    }
    resolve()
  })
}