const prompt = require('prompt')
const Logs = require('console-log-colors')
const { ask, startNewPresentation, logInfo, logSuccess, logError, clearLog } = require('../utils')

jest.mock('prompt')
jest.mock('console-log-colors')

describe('Root', () => {
  describe('Utils', () => {

    beforeEach(() => {
      prompt.start.mockImplementation(jest.fn())
    })

    test('Should ask an input', async () => {
      const askProperites = { name: 'option' }
      const cbGet = jest.fn((properties, callback) => {
        callback(null, {
          [properties.name]: 'test'
        })
      })
      prompt.get.mockImplementationOnce(cbGet)

      await ask(askProperites);

      expect(cbGet).toBeCalled()
      expect(cbGet).toBeCalledWith(askProperites, expect.any(Function))
    })

    test('Should ask funcion run onError', async () => {
      const askProperites = { name: 'option' }
      const cbGet = jest.fn((_, callback) => {
        callback('ERROR')
      })
      prompt.get.mockImplementationOnce(cbGet)
      console.error = jest.fn()
      const runAsk = ask(askProperites);

      expect(runAsk).rejects.toMatch('ERROR')
      expect(cbGet).toBeCalled()
      expect(cbGet).toBeCalledWith(askProperites, expect.any(Function))
      expect(console.error).toBeCalled()
      expect(console.error).toBeCalledWith('ERROR')
    })

    test('Should log info', () => {
      const cbLogInfo = jest.fn();
      Logs.log.gray.mockImplementationOnce(cbLogInfo)

      const msg = 'test info'
      logInfo(msg);

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toBeCalledWith(msg)
    })

    test('Should log Error', () => {
      const cbLog = jest.fn();
      Logs.log.red.mockImplementationOnce(cbLog)

      const msg = 'test error'
      logError(msg);

      expect(cbLog).toBeCalled()
      expect(cbLog).toBeCalledWith(msg)
    })

    test('Should log Sucess', () => {
      const cbLog = jest.fn();
      Logs.log.green.mockImplementationOnce(cbLog)

      const msg = 'test success'
      logSuccess(msg);

      expect(cbLog).toBeCalled()
      expect(cbLog).toBeCalledWith(msg)
    })

    test('Should clear log', () => {
      const cbLog = jest.fn();
      console.clear = cbLog;
      const oldNodeENV = process.env.NODE_ENV;

      process.env.NODE_ENV = 'only for this test'
      clearLog();
      clearLog();
      process.env.NODE_ENV = oldNodeENV

      expect(cbLog).toBeCalled()
      expect(cbLog).toBeCalledTimes(2)
    })

    test('Should start a new Presentation', async () => {
      let count = 0;
      const option = 1;
      const optionExit = 'x';
      const childPresentation = jest.fn(async (validation) => {
        if (count === 0) {
          await validation(option)
        } else {
          await validation(optionExit)
        }
        count++;
      })

      await startNewPresentation(childPresentation)

      expect(childPresentation).toBeCalledTimes(2)
    })

    test('Should exit of the Presentation', async () => {
      const option = 'x';
      const childPresentation = jest.fn(async (validation) => {
        await validation(option)
      })

      await startNewPresentation(childPresentation)

      expect(childPresentation).toBeCalledTimes(1)
    })
  })
})