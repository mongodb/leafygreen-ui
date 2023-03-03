const fs = require('fs');

if (process.argv.length <= 2) {
  throw new Error('No package name found. Please provide a package name');
}

const packageName = process.argv[process.argv.length - 1];
const packageNameKebab = packageName.toLowerCase();
const packageNamePascal = packageName
  .split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join('');
const packageNameHumanReadable = packageName
  .split('-')
  .map(el => el.replace(/^\w/, c => c.toUpperCase()))
  .join(' ');

const splitDir = __dirname.split('scripts')[0];
const srcDir = `${splitDir}packages`;
const newDir = `${srcDir}/${packageNameKebab}`;
const newSrcDir = `${newDir}/src`;
const newSubDir = `${newSrcDir}/${packageNamePascal}`;

const handleErr = err => {
  if (err) throw err;
};

fs.mkdir(newDir, { recursive: true }, err => {
  handleErr(err);

  fs.writeFile(`${newDir}/package.json`, packageJSON, handleErr);

  fs.writeFile(`${newDir}/tsconfig.json`, tsConfig, handleErr);

  fs.writeFile(`${newDir}/README.md`, readMe, handleErr);

  fs.mkdir(`${newSrcDir}`, { recursive: true }, err => {
    handleErr(err);

    fs.writeFile(`${newSrcDir}/index.ts`, rootIndex, handleErr);

    fs.writeFile(
      `${newDir}/src/${packageNamePascal}.story.tsx`,
      storybook,
      handleErr,
    );

    fs.mkdir(`${newSubDir}`, { recursive: true }, err => {
      handleErr(err);

      fs.writeFile(
        `${newSubDir}/${packageNamePascal}.tsx`,
        rootFile,
        handleErr,
      );

      fs.writeFile(`${newSubDir}/index.tsx`, index, handleErr);

      fs.writeFile(
        `${newSubDir}/${packageNamePascal}.spec.tsx`,
        spec,
        handleErr,
      );

      fs.writeFile(
        `${newSubDir}/${packageNamePascal}.styles.ts`,
        styles,
        handleErr,
      );

      fs.writeFile(
        `${newSubDir}/${packageNamePascal}.types.ts`,
        types,
        handleErr,
      );
    });
  });
});

const packageJSON = `
  {
    "name": "@laffygreen-ui/${packageNameKebab}",
    "version": "0.9.0",
    "description": "Laffygreen UI Kit ${packageNameHumanReadable}",
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
    "homepage": "https://github.com/thesonofthomp/leafygreen-ui/tree/laffygreen-ui/packages/${packageNameKebab}",
    "repository": {
      "type": "git",
      "url": "https://github.com/thesonofthomp/leafygreen-ui/tree/laffygreen-ui"
    },
    "bugs": {
      "url": "https://jira.mongodb.org/projects/PD/summary"
    },
    "publishConfig": {
      "access": "public"
    },
    "dependencies": {
      "@leafygreen-ui/lib": "^10.0.0"
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
# ${packageNameHumanReadable}

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/${packageNameKebab}.svg)
#### [View on MongoDB.design](https://www.mongodb.design/component/${packageNameKebab}/example/)

## Installation

### Yarn

\`\`\`shell
yarn add @laffygreen-ui/${packageNameKebab}
\`\`\`

### NPM

\`\`\`shell
npm install @laffygreen-ui/${packageNameKebab}
\`\`\`

## Example

**Output HTML**

## Properties

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |

`;

const rootFile = `
import React from 'react';

export function ${packageNamePascal}({}) {
  return <div>your content here</div>;
}

${packageNamePascal}.displayName = '${packageNamePascal}';
`;

const rootIndex = `export { ${packageNamePascal}, ${packageNamePascal}Props } from './${packageNamePascal}';`;

const index = `
export  { ${packageNamePascal} } from './${packageNamePascal}';
export { ${packageNamePascal}Props } from './${packageNamePascal}.types';
`;

const storybook = `
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {${packageNamePascal}} from '.';

export default {
  title: 'Components/${packageNamePascal}',
  component: ${packageNamePascal},
}

const Template: ComponentStory<typeof ${packageNamePascal}> = (props) => (
  <${packageNamePascal} {...props} />
);

export const Basic = Template.bind({});

`;

const spec = `
import React from 'react';
import { render } from '@testing-library/react';

import {${packageNamePascal}} from '.';

describe('packages/${packageNameKebab}', () => {
  test('condition', () => {

  })
})
`;

const types = `export interface ${packageNamePascal}Props {}`;

const styles = `import { css } from '@leafygreen-ui/emotion';`;
