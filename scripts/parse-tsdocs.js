const docgen = require('react-docgen-typescript');
const fs = require('fs');
const path = require('path');

const options = {
  savePropValueAsString: true,
};

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);

  return dirList
    .map(subDir => `${path.resolve(dir, subDir)}/package.json`)
    .filter(packageJsonPath => fs.existsSync(packageJsonPath))
    .map(packageJsonPath => require(packageJsonPath).name);
}

const dirPath = path.resolve(__dirname, '../packages');
const packagePrefix = `@leafygreen-ui/`;

async function getFilenames() {
  const parsedFileNames = [];
  await getAllPackages(dirPath).forEach(async pkg => {
    const dirPath = `./packages/${pkg.substring(packagePrefix.length)}/src`;
    const dir = await fs.readdirSync(dirPath);
    const regex = /^(?!.*\.(spec|d|story|stories)\.tsx?$).*\.tsx?$/;
    const filenames = dir.filter(filename => regex.test(filename));
    parsedFileNames.push(...filenames.map(fn => `${dirPath}/${fn}`));
  });
  return parsedFileNames;
}

getFilenames().then(filenames => {
  // eslint-disable-next-line no-console
  console.log(filenames);
  const docs = docgen.parse(filenames, options);
  // TODO: Replace log with push to CMS
  // eslint-disable-next-line no-console
  console.log(docs);
});
