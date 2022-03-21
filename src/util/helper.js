const containOtherType = (files) => files.filter(file => {
  const fileArr = file.split('.');
  return fileArr[fileArr.length - 1] !== 'json'
})

const getFileName = (file) => {
  const fileArr = file.split('.');
  return fileArr.slice(0, fileArr.length - 1)

}

const getLanguagesList = (languages) => {
  return languages.reduce((acc, cur) => {
    if (acc.includes(cur)) {
      return acc
    }
    return [...acc, cur]
  }, [])
}

module.exports = {
  containOtherType,
  getFileName,
  getLanguagesList
}