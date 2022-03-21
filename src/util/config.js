const config = {
  outputDirectory: "./src/locales",
  inputDirectory: "./src/input",
  defaultLanguage: ["en"],
  specialCharacters: "**"
}

const updateConfig = (options) => {
  const configKey = Object.keys(config)

  for (const key in options) {
    if (!configKey.includes(key)) {
      throw new Error("No key exist in config options")
    }
    config[key] = options[key]
  }
}



module.exports = { config, updateConfig }