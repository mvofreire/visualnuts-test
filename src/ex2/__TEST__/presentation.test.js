const Utils = require('../../utils')
const mockData = require('./mockData')
const { init } = require('../presentation')

jest.mock('../data', () => mockData)
jest.mock('../../utils')

describe('Exercice 2', () => {
  describe('Presentation', () => {

    test('Should ask for a number', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbAsk = jest.fn(() => Promise.resolve({ option: 'x' }))
      Utils.ask.mockImplementation(cbAsk);

      await init();

      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })

    test('Should log total countries in the World', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbLogInfo = jest.fn()
      Utils.logSuccess.mockImplementation(cbLogInfo)

      const cbAsk = jest.fn(() => Promise.resolve({ option: '1' }))
      Utils.ask.mockImplementation(cbAsk);

      await init();

      const expectedLogSuccess = `The total number of the countries in the world is: ${mockData.length}`

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toHaveBeenCalledWith(expectedLogSuccess)
      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })

    test('Should log - The country with the most official languages, where they officially', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbLogInfo = jest.fn()
      Utils.logSuccess.mockImplementation(cbLogInfo)

      const cbAsk = jest.fn(() => Promise.resolve({ option: '2' }))
      Utils.ask.mockImplementation(cbAsk);

      await init();

      const expectedLogSuccess = `The country with the most official languages, where they officially speak German is: BE | DE | PT`

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toHaveBeenCalledWith(expectedLogSuccess)
      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })

    test('Should log - Show counts all the official languages spoken in the listed countries', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbLogInfo = jest.fn()
      Utils.logSuccess.mockImplementation(cbLogInfo)

      const cbAsk = jest.fn(() => Promise.resolve({ option: '3' }))
      Utils.ask.mockImplementationOnce(cbAsk);//1
      Utils.ask.mockImplementationOnce(jest.fn(()=>Promise.resolve({inputCodes:'pt,us'})));//2

      await init();

      const expectedLogSuccess = `The total official languages spoken in [PT | US]: 6`

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toHaveBeenCalledWith(expectedLogSuccess)
      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })

    test('Should log - The country with the highest number of official languages', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbLogInfo = jest.fn()
      Utils.logSuccess.mockImplementation(cbLogInfo)

      const cbAsk = jest.fn(() => Promise.resolve({ option: '4' }))
      Utils.ask.mockImplementation(cbAsk);

      await init();

      const expectedLogSuccess = `The country with the highest number of official languages is: PT`

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toHaveBeenCalledWith(expectedLogSuccess)
      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })

    test('Should log - The most common official language(s), of all countries', async () => {
      const validate = jest.fn(() => Promise.resolve());
      const startPresentation = jest.fn((child) => child(validate))
      Utils.startNewPresentation.mockImplementation(startPresentation);

      const cbLogInfo = jest.fn()
      Utils.logSuccess.mockImplementation(cbLogInfo)

      const cbAsk = jest.fn(() => Promise.resolve({ option: '5' }))
      Utils.ask.mockImplementation(cbAsk);

      await init();

      const expectedLogSuccess = `The most common official language(s), of all countries is: de`

      expect(cbLogInfo).toBeCalled()
      expect(cbLogInfo).toHaveBeenCalledWith(expectedLogSuccess)
      expect(validate).toBeCalled();
      expect(startPresentation).toBeCalled();
      expect(cbAsk).toBeCalled();
    })
  })
})