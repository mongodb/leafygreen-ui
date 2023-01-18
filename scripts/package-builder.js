const fs = require('fs');

if (process.argv.length <= 2) {
  throw new Error('No package name found. Please provide a package name');
}

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

    fs.writeFile(`${newDirectory}/src/index.ts`, index, handleErr);

    fs.writeFile(
      `${newDirectory}/src/${PACKAGE_UC}.story.tsx`,
      storybook,
      handleErr,
    );

    fs.mkdir(`${newDirectory}/src/${PACKAGE_UC}`, { recursive: true }, err => {
      handleErr(err);

      fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}/${PACKAGE_UC}.tsx`, rootFile, handleErr);

      fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}/index.tsx`, index, handleErr);

      fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}/${PACKAGE_UC}.spec.tsx`, spec, handleErr);

      fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}/${PACKAGE_UC}.styles.ts`, styles, handleErr);

      fs.writeFile(`${newDirectory}/src/${PACKAGE_UC}/${PACKAGE_UC}.types.ts`, types , handleErr);
    });
  });
});

const packageJSON = `
  {
    "name": "@leafygreen-ui/${PACKAGE_LC}",
    "version": "0.9.0",
    "description": "leafyGreen UI Kit ${PACKAGE_HUMANREADABLE}",
    "main": "./dist/index.js",
    "module": "./dist/esm/index.js",
    "types": "./dist/index.d.ts",
    "typesVersions": {
      "<3.9": { "*": ["ts3.4/*"] }
    },
    "scripts": {
      "build": "../../node_modules/.bin/rollup --config ../../rollup.config.js"
    },
    "license": "Apache-2.0",
    "homepage": "https://github.com/mongodb/leafygreen-ui/tree/main/packages/${PACKAGE_LC}",
    "repository": {
      "type": "git",
      "url": "https://github.com/mongodb/leafygreen-ui"
    },
    "bugs": {
      "url": "https://jira.mongodb.org/projects/PD/summary"
    },
    "publishConfig": {
      "access": "public"
    },
    "dependencies": {
      "@leafygreen-ui/lib": "^6.1.0"
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
#### [View on MongoDB.design](https://www.mongodb.design/component/${PACKAGE_LC}/example/)

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

export function ${PACKAGE_UC}({}) {
  return <div>your content here</div>;
}

${PACKAGE_UC}.displayName = '${PACKAGE_UC}';
`;

const index = `
export { ${PACKAGE_UC} } from './${PACKAGE_UC}';
`;

const storybook = `
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {${PACKAGE_UC}} from '.';

export default {
  title: 'Components/${PACKAGE_UC}',
  component: ${PACKAGE_UC},
}

const Template: ComponentStory<typeof ${PACKAGE_UC}> = (props) => (
  <${PACKAGE_UC} {...props} />
);

export const Basic = Template.bind({});

`;

const spec = `
import React from 'react';
import { render } from '@testing-library/react';

import {${PACKAGE_UC}} from '.';

describe('packages/${PACKAGE_LC}', () => {
  test('condition', () => {

  })
})
`;

const types = ``;

const styles = `import { css } from '@leafygreen-ui/emotion';`
