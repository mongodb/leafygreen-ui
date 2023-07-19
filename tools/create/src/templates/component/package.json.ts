import { TemplateParameters } from '../../create.types';

export const pkgJson = ({
  scope,
  packageNameKebab,
  packageNameTitle,
}: Pick<
  TemplateParameters,
  'scope' | 'packageNameKebab' | 'packageNameTitle'
>) => `  "name": "${scope}/${packageNameKebab}",
  "version": "0.1.0",
  "description": "LeafyGreen UI Kit ${packageNameTitle}",
  "main": "./dist/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/index.d.ts",
  "license": "Apache-2.0",
  "scripts": {
    "build": "lg build-package",
    "tsc": "lg build-ts",
    "docs": "lg build-tsdoc"
  },
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@leafygreen-ui/emotion": "^4.0.4",
    "@leafygreen-ui/lib": "^10.4.0"
  },
  "devDependencies": {
    "@lg-tools/cli": "^0.0.1"
  },
  "homepage": "https://github.com/mongodb/leafygreen-ui/tree/main/packages/${packageNameKebab}",
  "repository": {
    "type": "git",
    "url": "https://github.com/mongodb/leafygreen-ui"
  },
  "bugs": {
    "url": "https://jira.mongodb.org/projects/PD/summary"
  }
}`;
