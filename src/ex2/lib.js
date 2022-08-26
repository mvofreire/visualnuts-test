const data = require('./data')

const getCountriesCount = () => {
  return data.length
}

const getCountryByLanguage = (language) => {
  return data.filter(x => x.languages.includes(language))
}

const getCountOfLanguagesByCountriesCode = (countries) => {
  return data.filter(x => countries.includes(x.country)).reduce((acc, obj) => acc + obj.languages.length, 0);
}

const getCountryByHighestOfficialLanguage = () => {
  const sortedByLanguageLength = data.sort((a, b) => {
    return b.languages.length - a.languages.length
  })
  return sortedByLanguageLength[0];
}

const getMostCommonOfficialLanguage = () => {
  const result = {}
  let sortable = [];

  const allLanguagesFlatten = data.map(country => country.languages).flat();
  allLanguagesFlatten.forEach(lang => {
    result[lang] = (result[lang] || 0) + 1
  })
  for (var countLang in result) {
    sortable.push([countLang, result[countLang]]);
  }
  sortable.sort((a, b) => b[1] - a[1]);
  const [mostCommonLanguage] = sortable
  const [code] = mostCommonLanguage
  return code
}

module.exports = {
  getCountriesCount,
  getCountryByLanguage,
  getCountOfLanguagesByCountriesCode,
  getCountryByHighestOfficialLanguage,
  getMostCommonOfficialLanguage
}