import { TemplateParameters } from '../../create.types';

export const readMe = ({
  packageNameTitle,
  packageNameKebab,
}: Pick<TemplateParameters, 'packageNameTitle' | 'packageNameKebab'>) => `
# ${packageNameTitle}

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/${packageNameKebab}.svg)
#### [View on MongoDB.design](https://www.mongodb.design/component/${packageNameKebab}/example/)

## Installation

### Yarn

\`\`\`shell
yarn add @leafygreen-ui/${packageNameKebab}
\`\`\`

### NPM

\`\`\`shell
npm install @leafygreen-ui/${packageNameKebab}
\`\`\`

`;
