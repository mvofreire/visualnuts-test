const { startProcess } = require('../lib');
const { VISUAL_LABEL, NUTS_LABEL, FULL_LABEL, ERROR_MESSAGE, QUESTION_MESSAGE } = require('../constants')

describe('Exercice 1', () => {
  describe('Utils', () => {
    test('Should log numbers in console-> limit:100', () => {
      const callback = jest.fn()
      console.log = callback;
      const limit = 100;
      startProcess(limit)
      expect(callback).toBeCalledTimes(limit)
    })

    test('Should log Error in console if anything diferente of number -> limit:"a"', () => {
      const callback = jest.fn()
      console.error = callback;
      const limit = 'a';
      startProcess(limit)
      expect(callback).toBeCalledTimes(1)
      expect(callback).toBeCalledWith(ERROR_MESSAGE)
    })

    test('Should log numbers in console-> limit:300', () => {
      const limit = 300;
      const callback = jest.fn()
      console.log = callback;
      startProcess(limit)
      expect(callback).toBeCalledTimes(limit)
    })

    test('Should log numbers in console-> limit:500', () => {
      const limit = 500;
      const callback = jest.fn()
      console.log = callback;
      startProcess(limit)
      expect(callback).toBeCalledTimes(limit)
    })

    test('Should show "Visual" when the number is divisible by 3 -> limit:6', () => {
      const limit = 6;
      const result = [];
      const callback = jest.fn(v => result.push(v))
      console.log = callback;
      startProcess(limit)

      expect(callback).toBeCalledTimes(limit)
      expect(result.filter(x => x === VISUAL_LABEL).length).toBe(2)
    })

    test('Should show "Nuts" when the number is divisible by 5 -> limit:15', () => {
      const limit = 10;
      const result = [];

      const callback = jest.fn(v => result.push(v))
      console.log = callback;

      startProcess(limit)
      expect(callback).toBeCalledTimes(limit)
      expect(result.filter(x => x === NUTS_LABEL).length).toBe(2)
    })

    test('Should show "Visual Nuts" when the number is divisible by 3 and 5 -> limit:15', () => {
      const limit = 15;
      const result = [];

      const callback = jest.fn(v => result.push(v))
      console.log = callback;

      startProcess(limit)
      expect(callback).toBeCalledTimes(limit)
      expect(result.filter(x => x === FULL_LABEL).length).toBe(1)
    })

    // xtest('Should return a readline instance', () => {
    //   const expected = 1
    //   const cb = jest.fn(() => expected)
    //   jest.spyOn(readline, 'createInterface').mockImplementationOnce(cb)

    //   const result = createInterface();

    //   expect(result).toBe(expected)
    //   expect(cb).toBeCalled()
    // })

    // xtest('Should resolve a Promise with a number is provided', () => {
    //   const expected = 20;
    //   const instance = {
    //     question(_, cb) {
    //       return cb(expected);
    //     },
    //     close() { }
    //   };
    //   const result = question(instance, QUESTION_MESSAGE);
    //   expect(result).resolves.toBe(expected)
    // })

    // xtest('Should reject a Promise with not a number is provided', () => {
    //   const expected = 'AAA';
    //   const instance = {
    //     question(_, cb) {
    //       return cb(expected);
    //     },
    //     close() { }
    //   };
    //   const result = question(instance, QUESTION_MESSAGE);
    //   expect(result).rejects.toBe(ERROR_MESSAGE)
    // })
  })
})