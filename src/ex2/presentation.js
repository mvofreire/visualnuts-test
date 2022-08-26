const { ask, startNewPresentation, logSuccess, clearLog, logInfo } = require('../utils')
const data = require('./data');
const {
  getCountriesCount,
  getCountryByLanguage,
  getCountOfLanguagesByCountriesCode,
  getCountryByHighestOfficialLanguage,
  getMostCommonOfficialLanguage
} = require('./lib');

const descriptionContent = `
x - Go Back to previous page
1 - Returns the number of countries in the world
2 - Find the country with the most official languages, where they officially speak German(de). 
3 - Show counts all the official languages spoken in the listed countries.
4 - Find the country with the highest number of official languages.
5 - Find the most common official language(s), of all countries.
`;

function showData() {
  logInfo('### - EXERCISE 2 - ###')
  logInfo('### -------------- ###')
  logInfo(' - COUNTRIES DATA - ')
  data.forEach(item => {
    logInfo(`Country Code: ${item.country}`)
    logInfo(`Official Languages: [${item.languages.join(' | ')}] Total - ${item.languages.length}`)
  })
}

function runOption1() {
  const total = getCountriesCount()
  logSuccess(`The total number of the countries in the world is: ${total}`)
  return Promise.resolve();
}

function runOption2() {
  const lang = 'de'
  const countries = getCountryByLanguage(lang);
  const countriesNames = countries.map(x => x.country)
  logSuccess(`The country with the most official languages, where they officially speak German is: ${countriesNames.join(' | ')}`)
  return Promise.resolve();
}

async function runOption3() {
  const { inputCodes } = await ask({
    name: 'inputCodes',
    description: 'Provider a list of countrie separated with comma. Eg:pt,us,de',
    type: 'string'
  });
  const codes = inputCodes.toUpperCase().split(',');
  const totalLanguages = getCountOfLanguagesByCountriesCode(codes)
  logSuccess(`The total official languages spoken in [${codes.join(' | ')}]: ${totalLanguages}`)
  return Promise.resolve();
}

function runOption4() {
  const country = getCountryByHighestOfficialLanguage();
  logSuccess(`The country with the highest number of official languages is: ${country.country}`)
  return Promise.resolve();
}

function runOption5() {
  const language = getMostCommonOfficialLanguage();
  logSuccess(`The most common official language(s), of all countries is: ${language}`)
  return Promise.resolve();
}

function runOption(option) {
  switch (option) {
    case '1':
      return runOption1()
    case '2':
      return runOption2()
    case '3':
      return runOption3()
    case '4':
      return runOption4()
    case '5':
      return runOption5()
    default:
      return Promise.resolve()
  }
}

async function init() {
  return startNewPresentation(async (validatePresentation) => {
    showData();
    const { option } = await ask({
      name: 'option',
      description: descriptionContent,
      required: true
    })
    clearLog()
    await validatePresentation(option);
    await runOption(option)
  })
}

module.exports = { init }
