import { TemplateParameters } from '../../create.types';

export const readMe = ({
  scope,
  packageNameTitle,
  packageNameKebab,
}: Pick<
  TemplateParameters,
  'scope' | 'packageNameTitle' | 'packageNameKebab'
>) => `
# ${packageNameTitle}

![npm (scoped)](https://img.shields.io/npm/v/${scope}/${packageNameKebab}.svg)
#### [View on MongoDB.design](https://www.mongodb.design/component/${packageNameKebab}/live-example/)

## Installation

### PNPM

\`\`\`shell
pnpm add ${scope}/${packageNameKebab}
\`\`\`

### Yarn

\`\`\`shell
yarn add ${scope}/${packageNameKebab}
\`\`\`

### NPM

\`\`\`shell
npm install ${scope}/${packageNameKebab}
\`\`\`

`;
