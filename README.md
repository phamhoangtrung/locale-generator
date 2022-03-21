# locale-generator package

### input folder

- Where all the input JSON files take place
- Only accept JSON file

### output folder

- All the locale files take place each language have its own folder which files have same name as input file

### generateLocale function

```ts
  generateLocale(
    languages:string[], // ISO 639 code
    options:{ inputDirectory:string, // default: src/input
              outputDirectory:string, // default: src/output
              specialCharacters:string //default: **
            }
  )

// Example:
generateLocale(["th", "id", "vi"], {
  inputDirectory: "./src/input-files",
  outputDirectory: "./src/output",
  specialCharacters: "/S/_"
})

```
