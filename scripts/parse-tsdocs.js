const docgen = require('react-docgen-typescript');
const fs = require('fs');

const options = {
  savePropValueAsString: true,
};

const parsedPackages = ['radio-group'];

async function getFilenames() {
  const parsedFileNames = [];
  await parsedPackages.forEach(async pkg => {
    const dirPath = `./packages/${pkg}/src`;
    const dir = await fs.readdirSync(dirPath);
    const regex = /^(?!.*\.(spec|d|story|stories)\.tsx?$).*\.tsx?$/;
    const filenames = dir.filter(filename => regex.test(filename));
    parsedFileNames.push(...filenames.map(fn => `${dirPath}/${fn}`));
  });
  return parsedFileNames;
}

getFilenames().then(filenames => {
  const docs = docgen.parse(filenames, options);
  // TODO: Replace log with push to CMS
  // eslint-disable-next-line no-console
  console.log(docs);
});
