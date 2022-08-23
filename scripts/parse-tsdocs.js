const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const { Command } = require('commander')

const cli = new Command('parse-tsdoc')
  .arguments('[packages]')
  .parse(process.argv);

const skippedComponents = [];

const TSDocOptions = {
  propFilter: (prop, component) => {
    if (skippedComponents.includes(component.name)) {
      return false;
    }
    
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find(
        declaration => {
          return !declaration.fileName.includes('node_modules');
        },
      );

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
};

if (cli.args.length) {
  cli.args.forEach(parseDocs)
} else {
  const packagesDir = path.resolve(__dirname, '../packages');
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(parseDocs)
} 

function parseDocs(componentName) {
  const componentDir = path.resolve(__dirname, `../packages/${componentName}`)
  
  if (fs.existsSync(componentDir)) {
    console.log(chalk.blueBright(`Parsing TSDoc for:`, chalk.blue.bold(`${componentName}`)))
    const componentFileNames = parseFileNames(componentDir)
    const docs = docgen.parse(componentFileNames, TSDocOptions);
    const outFilePath = path.resolve(__dirname, componentDir + '/tsdoc.json')
    fs.writeFileSync(outFilePath, JSON.stringify(docs, null, 2), err => {
      if (err) console.error(err);
    });
  } else {
    console.warn(chalk.yellow('Could not find component:'), chalk.bold.yellow(componentName))
  }
}

function parseFileNames(root) {
  const parsedFileNames = [];
  getFilesRecursively(root);
  return parsedFileNames
  
  function getFilesRecursively(directory) {
    const filesInDirectory = fs.readdirSync(directory);
  
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
  
      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
      } else {
        const regex = /^(?!.*\.(spec|d|story|stories)\.tsx?$).*\.tsx?$/;
  
        if (regex.test(absolute)) {
          parsedFileNames.push(absolute);
        }
      }
    }
  };
}
