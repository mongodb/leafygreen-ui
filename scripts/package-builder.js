const fs = require('fs');

const PACKAGE = process.argv[process.argv.length - 1];
const PACKAGE_LC = PACKAGE.toLowerCase();
const PACKAGE_UC = PACKAGE.split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join('');
const PACKAGE_HUMANREADABLE = PACKAGE.split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join(' ');

const splitDir = __dirname.split('scripts')[0];
const srcDir = `${splitDir}packages`;
const newDirectory = `${srcDir}/${PACKAGE_LC}`;

const handleErr = err => {
  if (err) throw err;
};

fs.mkdir(newDirectory, { recursive: true }, err => {
  handleErr(err);

  fs.writeFile(`${newDirectory}/package.json`, packageJSON, handleErr);

  fs.writeFile(`${newDirectory}/tsconfig.json`, tsConfig, handleErr);

  fs.writeFile(`${newDirectory}/README.md`, readMe, handleErr);

  fs.mkdir(`${newDirectory}/src`, { recursive: true }, err => {
    handleErr(err);

    fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}.tsx`, rootFile, handleErr);

    fs.writeFile(`${newDirectory}/src/index.ts`, index, handleErr);

    fs.writeFile(
      `${newDirectory}/src/${PACKAGE_UC}.story.tsx`,
      storybook,
      handleErr,
    );

    fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}.spec.tsx`, spec, handleErr);
  });
});

const packageJSON = `
  {
    "name": "@leafygreen-ui/${PACKAGE_LC}",
    "version": "0.9.0",
    "description": "leafyGreen UI Kit ${PACKAGE_HUMANREADABLE}",
    "main": "./dist/index.bundle.js",
    "types": "./dist/index.d.ts",
    "scripts": {
      "build": "../../node_modules/.bin/webpack --config ../../webpack.config.js"
    },
    "license": "Apache-2.0",
    "publishConfig": {
      "access": "public"
    },
    "dependencies": {
      "@leafygreen-ui/lib": "^5.0.0"
    }
  }
`;

const tsConfig = `
{
  "extends": "../../package.tsconfig.json",
  "compilerOptions": {
    "declarationDir": "dist",
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "references": [
    {
      "path": "../lib"
    }
  ]
}
`;

const readMe = `
# ${PACKAGE_HUMANREADABLE}

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/${PACKAGE_LC}.svg)
#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/${PACKAGE_LC}--default)

## Installation

### Yarn

\`\`\`shell
yarn add @leafygreen-ui/${PACKAGE_LC}
\`\`\`

### NPM

\`\`\`shell
npm install @leafygreen-ui/${PACKAGE_LC}
\`\`\`

## Example

**Output HTML**

## Properties

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |

`;

const rootFile = `
import React from 'react';

export default function ${PACKAGE_UC}({}) {
  return <div>your content here</div>;
}
`;

const index = `
export { default } from './${PACKAGE_UC}';
`;

const storybook = `
import React from 'react';
import { storiesOf } from '@storybook/react';
import ${PACKAGE_UC} from '.';

storiesOf('${PACKAGE_UC}', module)
  .add('Default', () => (
    <${PACKAGE_UC} />
  ))
`;

const spec = `
import React from 'react';
import { render } from '@testing-library/react';
import ${PACKAGE_UC} from '.';

describe('packages/${PACKAGE_LC}', () => {
  test('condition', () => {

  })
})
`;
