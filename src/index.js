const { updateConfig, config } = require('./util/config');
const { makeDir, readLocaleFile, writeLocaleFile, translateLocaleFile, readInputDir } = require('./util/file')
const { containOtherType, getFileName, getLanguagesList } = require('./util/helper')

const startTranslation = async (language, fname, data) => {
  const translateData = await translateLocaleFile(language, data);
  return writeLocaleFile(language, fname, translateData)
}

const generateLocale = async (languages, options) => {

  options && updateConfig(options)

  const file = await readInputDir()
  const notJSON = containOtherType(file)

  if (notJSON.length > 0) throw new Error("Only generate JSON files read: " + onlyJSON[0])

  const fileNames = file.flatMap(getFileName)
  const languagesList = getLanguagesList([...languages, ...config.defaultLanguage])

  makeDir(config.outputDirectory)

  const response = fileNames.flatMap(async (fname) => {

    const originData = await readLocaleFile(fname);

    const result = languagesList.flatMap((lang) => startTranslation(lang, fname, originData));

    return await Promise.all(result)
  })

  const result = await Promise.all(response)

  console.log(result.flat());
}



generateLocale(["th", "id", "vi"], {
  inputDirectory: "./src/input-files",
  outputDirectory: "./src/output",
  specialCharacters: "/S/_"
})
