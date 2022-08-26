const { VISUAL_LABEL, NUTS_LABEL, FULL_LABEL, ERROR_MESSAGE } = require('./constants')

function isDivisible(value, divisor) {
  return ((value % divisor) === 0)
}

function isNumber(value) {
  return !isNaN(value)
}

function startProcess(limit) {
  if (!isNumber(limit)) {
    return console.error(ERROR_MESSAGE)
  }

  for (let i = 1; i <= limit; i++) {
    if (isDivisible(i, 3) && isDivisible(i, 5)) {
      console.log(FULL_LABEL)
    }
    else if (isDivisible(i, 3)) {
      console.log(VISUAL_LABEL)
    }
    else if (isDivisible(i, 5)) {
      console.log(NUTS_LABEL)
    }
    else {
      console.log(i)
    }
  }
}

module.exports = { startProcess, isNumber }