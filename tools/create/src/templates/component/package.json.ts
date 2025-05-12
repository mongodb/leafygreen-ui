import { TemplateParameters } from '../../create.types';

export const pkgJson = ({
  scope,
  packageNameKebab,
  packageNameTitle,
}: Pick<
  TemplateParameters,
  'scope' | 'packageNameKebab' | 'packageNameTitle'
>) => `  
{
  "name": "${scope}/${packageNameKebab}",
  "version": "0.1.0",
  "description": "LeafyGreen UI Kit ${packageNameTitle}",
  "main": "./dist/umd/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "license": "Apache-2.0",
  "scripts": {
    "build": "lg-build bundle",
    "tsc": "lg-build tsc",
    "docs": "lg-build docs"
  },
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@leafygreen-ui/emotion": "workspace:^",
    "@leafygreen-ui/lib": "workspace:^"
  },
  "homepage": "https://github.com/mongodb/leafygreen-ui/tree/main/packages/${packageNameKebab}",
  "repository": {
    "type": "git",
    "url": "https://github.com/mongodb/leafygreen-ui"
  },
  "bugs": {
    "url": "https://jira.mongodb.org/projects/LG/summary"
  }
}
`;
