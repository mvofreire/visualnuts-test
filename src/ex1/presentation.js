const { startProcess } = require('./lib');
const { QUESTION_MESSAGE } = require('./constants');
const { startNewPresentation, ask, clearLog } = require('../utils')

function init() {
  return startNewPresentation(async (validatePresentation) => {
    const { value } = await ask({ name: 'value', description: QUESTION_MESSAGE });
    clearLog();
    await validatePresentation(value)
    startProcess(value);
  })
}

module.exports = { init }
