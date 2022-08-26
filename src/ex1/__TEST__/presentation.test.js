const Functions = require('../lib');
const Utils = require('../../utils')
const { init } = require('../presentation')
const { QUESTION_MESSAGE, ERROR_MESSAGE } = require('../constants')

jest.mock('../../utils')
jest.mock('../lib')

describe('Exercice 1', () => {
  describe('Presentation', () => {

    test.only('Should ask for a number', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbAsk = jest.fn(() => Promise.resolve({ value: 3 }))
      Utils.ask.mockImplementation(cbAsk);

      const cbStartProcess = jest.fn()
      Functions.startProcess.mockImplementationOnce(cbStartProcess)

      await init();

      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
      expect(cbStartProcess).toBeCalled();
    })
  })
})