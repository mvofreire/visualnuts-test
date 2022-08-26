const mockData = require('./mockData')
const data = require('../data')
const {
  getCountriesCount,
  getCountryByLanguage,
  getCountOfLanguagesByCountriesCode,
  getCountryByHighestOfficialLanguage,
  getMostCommonOfficialLanguage
} = require('../lib')

jest.mock('../data', () => mockData)

describe('Exercice 2', () => {

  test('Should returns the number of countries in the world', () => {
    const expected = data.length;
    const result = getCountriesCount();

    expect(result).toEqual(expected);
  });

  test('Should find the country with the most official languages, where they officially speak German(de).', () => {
    const lang = 'de'
    const expected = data.filter(x => x.languages.includes(lang));
    const result = getCountryByLanguage(lang);

    expect(result).toEqual(expected);
  })

  test('Should counts all the official languages spoken in the listed countries', () => {
    const countries = ["PT", "EN", "BE"]
    const expected = data.filter(x => countries.includes(x.country)).reduce((acc, obj) => acc + obj.languages.length, 0);
    const result = getCountOfLanguagesByCountriesCode(countries);

    expect(result).toEqual(expected);
  })

  test('Should find the country with the highest number of official languages', () => {
    const expected = mockData.find(x => x.country === 'PT');
    const result = getCountryByHighestOfficialLanguage();

    expect(result).toEqual(expected)
  })

  test('Should find the most common official language(s), of all countries', () => {
    const expected = 'de';
    const result = getMostCommonOfficialLanguage();

    expect(result).toEqual(expected)
  })
})