/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { getNameVariants } from './utils/getNameVariants';
import { writeFiles } from './utils/writeFiles';
import { CreatePackageOptions } from './create.types';
import {
  component,
  componentIndex,
  index,
  pkgJson,
  readMe,
  spec,
  story,
  styles,
  tsConfig,
  types,
} from './templates';

interface CreateComponentArgs
  extends Pick<Required<CreatePackageOptions>, 'scope' | 'directory'> {
  name: string;
}

export function createComponent({
  name,
  scope,
  directory,
}: CreateComponentArgs) {
  const rootDir = process.cwd();

  const { packageNameKebab, packageNameTitle, packageNamePascal } =
    getNameVariants(name);

  console.log(
    chalk.green(
      `Creating package ${chalk.bold(scope + '/' + packageNameKebab)}`,
    ),
  );

  // Create the appropriate directory
  const packageDir = path.resolve(rootDir, directory, packageNameKebab);

  // Create the package directories
  fse.mkdir(packageDir, { recursive: true }, err => {
    if (err) {
      console.log(`Package ${packageNameKebab} already exists`);
      return;
    }

    // Write the appropriate files for each template
    writeFiles(
      [
        {
          name: 'package.json',
          contents: pkgJson({
            scope,
            packageNameKebab,
            packageNameTitle,
          }),
        },
        {
          name: 'tsconfig.json',
          contents: tsConfig,
        },
        {
          name: 'README.md',
          contents: readMe({ packageNameKebab, packageNameTitle }),
        },
        {
          name: 'src/index.ts',
          contents: index({ packageNamePascal }),
        },
        {
          name: `src/${packageNamePascal}.stories.tsx`,
          contents: story({ packageNamePascal }),
        },
        {
          name: `src/${packageNamePascal}/index.ts`,
          contents: componentIndex({ packageNamePascal }),
        },
        {
          name: `src/${packageNamePascal}/${packageNamePascal}.tsx`,
          contents: component({ packageNamePascal }),
        },
        {
          name: `src/${packageNamePascal}/${packageNamePascal}.spec.tsx`,
          contents: spec({ packageNamePascal, packageNameKebab }),
        },
        {
          name: `src/${packageNamePascal}/${packageNamePascal}.types.ts`,
          contents: types({ packageNamePascal }),
        },
        {
          name: `src/${packageNamePascal}/${packageNamePascal}.styles.ts`,
          contents: styles,
        },
      ],
      {
        dir: packageDir,
        packageNamePascal,
      },
    );
  });
}
