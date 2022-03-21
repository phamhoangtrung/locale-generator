const translate = require("translate");
const { config } = require('./config')
const fs = require("fs");

const makeDir = (folderName) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
}

const readLocaleFile = (filename) => {
  return new Promise((resolve, reject) => {
    const source = config.inputDirectory + "/" + filename + ".json";
    fs.readFile(source, "utf8", (error, data) => {
      if (error) return reject(error);

      const parseData = JSON.parse(data);
      return resolve(parseData);
    });
  });
}

const writeLocaleFile = (language, fname, data) => {
  const folderName = config.outputDirectory + "/" + language
  makeDir(folderName)
  const locale = JSON.stringify(data);
  const dest = folderName + "/" + fname + ".json";
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, locale, (error) => {
      if (error) return reject(error);
      return resolve({
        message: `${dest} successfully written`
      });
    });
  })
}

const translateLocaleFile = async (language, data) => {
  const localeData = { ...data }
  for (let key in localeData) {
    const notTranslate = localeData[key].startsWith(config.specialCharacters)
    if (!notTranslate) {
      localeData[key] = await translate(localeData[key], language);
    } else {
      localeData[key] = localeData[key].replace(config.specialCharacters, "")
    }
  }
  return localeData;
}

const readInputDir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(config.inputDirectory, (error, files) => {
      if (error) return reject(error);
      return resolve(files)
    })
  })
}

module.exports = {
  readLocaleFile,
  writeLocaleFile,
  translateLocaleFile,
  readInputDir,
  makeDir
}

