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
  getLgIds,
  index,
  pkgJson,
  readMe,
  spec,
  story,
  styles,
  testing,
  testingIndex,
  testingSpec,
  testingTypes,
  tsConfig,
  types,
} from './templates';

interface CreateComponentArgs
  extends Pick<Required<CreatePackageOptions>, 'scope' | 'directory'>,
    Omit<CreatePackageOptions, 'scope' | 'directory'> {
  name: string;
}

export function createComponent({
  name,
  scope,
  directory,
  dry,
  verbose,
}: CreateComponentArgs) {
  const rootDir = process.cwd();

  const {
    packageNameKebab,
    packageNameTitle,
    packageNamePascal,
    packageNameSnake,
  } = getNameVariants(name);

  console.log(
    chalk.green(
      `Creating package ${chalk.bold(scope + '/' + packageNameKebab)}`,
    ),
  );

  // Create the appropriate directory
  const packageDir = path.resolve(rootDir, directory, packageNameKebab);
  const doesPackageDirExist = fse.existsSync(packageDir);

  if (doesPackageDirExist) {
    throw new Error(`Package ${packageNameKebab} already exists`);
  }

  const filesToWrite = [
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
      contents: tsConfig(scope),
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
    {
      name: `src/testing/getTestUtils.ts`,
      contents: testing(),
    },
    {
      name: `src/testing/getTestUtils.spec.ts`,
      contents: testingSpec({ packageNamePascal, packageNameKebab }),
    },
    {
      name: `src/testing/getTestUtils.types.ts`,
      contents: testingTypes(),
    },
    {
      name: `src/testing/index.ts`,
      contents: testingIndex(),
    },
    {
      name: `src/utils/getLgIds.ts`,
      contents: getLgIds({ packageNameSnake }),
    },
  ];

  writeFiles(filesToWrite, {
    dir: packageDir,
    name,
    scope,
    dry,
    verbose,
  });
}
