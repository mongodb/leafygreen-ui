module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "lf",
  overrides: [
    {
      "files": ["*.ts", "*.tsx"],
      options: {
        parser: "babel-ts"
      }
    }
  ]
}
