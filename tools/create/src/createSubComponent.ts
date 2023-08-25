/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { getComponentPath } from './utils/getComponentPath';
import { getNameVariants } from './utils/getNameVariants';
import { writeFiles } from './utils/writeFiles';
import { CreatePackageOptions } from './create.types';
import { component, componentIndex, spec, styles, types } from './templates';

interface CreateComponentArgs {
  name: string;
  parent: Required<CreatePackageOptions>['parent'];
}

export function createSubComponent({ name, parent }: CreateComponentArgs) {
  const { packageNamePascal: parentNamePascal } = getNameVariants(parent);
  const { packageNameKebab, packageNamePascal } = getNameVariants(name);

  console.log(
    chalk.green(
      `Creating sub-component ${chalk.bold(
        parentNamePascal + '/' + packageNamePascal,
      )}`,
    ),
  );

  const parentDir = getComponentPath(parent);

  if (!parentDir) {
    console.error(chalk.red(`Could not find parent package ${parent}`));
    process.exit(127);
  }

  const subComponentDir = path.resolve(parentDir, 'src', packageNamePascal);

  fse.mkdir(subComponentDir, { recursive: true }, err => {
    if (err) {
      console.log(`Package ${packageNameKebab} already exists`);
      return;
    }

    writeFiles(
      [
        {
          name: `index.ts`,
          contents: componentIndex({ packageNamePascal }),
        },
        {
          name: `${packageNamePascal}.tsx`,
          contents: component({ packageNamePascal }),
        },
        {
          name: `${packageNamePascal}.spec.tsx`,
          contents: spec({ packageNamePascal, packageNameKebab }),
        },
        {
          name: `${packageNamePascal}.types.ts`,
          contents: types({ packageNamePascal }),
        },
        {
          name: `${packageNamePascal}.styles.ts`,
          contents: styles,
        },
      ],
      {
        dir: subComponentDir,
        packageNamePascal,
      },
    );
  });
}
