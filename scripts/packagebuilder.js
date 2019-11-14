const fs = require('fs');
const splitDir = __dirname.split('scripts')[0];
const srcDir = `${splitDir}packages`;

const PACKAGE = process.argv[process.argv.length - 1];
const PACKAGE_LC = PACKAGE.toLowerCase();
const PACKAGE_UC = PACKAGE.split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join('');
const PACKAGE_HUMANREADABLE = PACKAGE.split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join(' ');

const newDirectory = `${srcDir}/${PACKAGE_LC}`;
fs.mkdir(newDirectory, { recursive: true }, err => {
  if (err) throw err;

  fs.writeFile(`${newDirectory}/package.json`, packageJSON, err => {
    if (err) throw err;
  });

  fs.writeFile(`${newDirectory}/tsconfig.json`, tsConfig, err => {
    if (err) throw err;
  });

  fs.writeFile(`${newDirectory}/README.md`, readMe, err => {
    if (err) throw err;
  });

  fs.mkdir(`${newDirectory}/src`, { recursive: true }, err => {
    if (err) throw err;

    fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}.tsx`, rootFile, err => {
      if (err) throw err;
    });

    fs.writeFile(`${newDirectory}/src/index.ts`, index, err => {
      if (err) throw err;
    });

    fs.writeFile(
      `${newDirectory}/src/${PACKAGE_UC}.story.tsx`,
      storybook,
      err => {
        if (err) throw err;
      },
    );

    fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}.spec.tsx`, spec, err => {
      if (err) throw err;
    });
  });
});

const packageJSON = `
  {
    "name": "@leafygreen-ui/${PACKAGE_LC}",
    "version": "0.9.0",
    "description": "leafyGreen UI Kit ${PACKAGE_HUMANREADABLE}",
    "main": "./dist/index.js",
    "types": "./dist/index.d.ts",
    "scripts": {
      "build": "../../node_modules/.bin/webpack --config ../../webpack.config.js"
    },
    "license": "Apache-2.0",
    "publishConfig": {
      "access": "public"
    },
    "devDependencies": {
      "@leafygreen-ui/lib": "^3.2.0"
    }
  }
`;

const tsConfig = `
{
  "extends": "../../package.tsconfig.json",
  "compilerOptions": {
    "declarationDir": "dist",
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

## Example

**Output HTML**

## Properties

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |

`;

const rootFile = `
import React from 'react'

export default function ${PACKAGE_UC}({}) {
  return(<div>your content here</div>)
}
`;

const index = `
import ${PACKAGE_UC} from './${PACKAGE_UC}';
export default ${PACKAGE_UC};
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
import { render, cleanup } from '@testing-library/react';
import ${PACKAGE_UC} from '.';

afterAll(cleanup);

describe('packages/${PACKAGE_LC}', () => {})
`;
