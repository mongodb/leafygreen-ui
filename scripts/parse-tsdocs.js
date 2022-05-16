const docgen = require('react-docgen-typescript');
const fs = require('fs');

const options = {
  savePropValueAsString: true,
};

const parsedPackages = [
  // 'radio',
  // 'radio-group',
  'palette',
];
const tsConfigParser = docgen.withCustomConfig('./tsconfig.json', options);

async function getFilenames() {
  const parsedFileNames = [];
  await parsedPackages.forEach(async pkg => {
    const dirPath = `./packages/${pkg}/src`;
    const dir = await fs.readdirSync(dirPath);
    const regex = /^(?!.*\.(spec|d|story|stories)\.tsx?$).*\.tsx?$/;
    const filenames = dir.filter(
      filename => filename !== 'index.ts' && regex.test(filename),
    );
    parsedFileNames.push(...filenames.map(fn => `${dirPath}/${fn}`));
  });
  return parsedFileNames;
}

getFilenames().then(filenames => {
  const docs = tsConfigParser.parse(filenames, options);
  // TODO: Replace log with push to CMS
  // eslint-disable-next-line no-console
  console.log(docs);
});
