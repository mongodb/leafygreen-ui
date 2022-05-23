const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');

const skippedComponents = [];

const options = {
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

const dirPath = path.resolve(__dirname, '../packages');
const parsedFileNames = [];

const getFilesRecursively = directory => {
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

getFilesRecursively(dirPath);
const docs = docgen.parse(parsedFileNames, options);
// TODO: replace writeFile with POST request to CMS
fs.writeFile('./parsed-docs.json', JSON.stringify(docs), err => {
  if (err) console.error(err);
});
