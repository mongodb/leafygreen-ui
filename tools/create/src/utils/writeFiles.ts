/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { CreatePackageOptions } from '../create.types';

import { getNameVariants } from './getNameVariants';

interface WriteFilesOptions
  extends Pick<CreatePackageOptions, 'scope' | 'dry' | 'verbose'> {
  name: string;
  dir: string;
}

export function writeFiles(
  files: Array<{
    name: string;
    contents: string;
  }>,
  { name, dir, dry, verbose }: WriteFilesOptions,
) {
  const { packageNamePascal } = getNameVariants(name);
  const doesPackageDirExist = fse.existsSync(dir);

  // Make the package directory if it doesn't exist
  if (!doesPackageDirExist && !dry) {
    fse.mkdir(dir, { recursive: true });
  }

  const needsSrcDir = files.some(f => f.name.includes('src/'));

  // Make the directory src and src/Component if necessary
  if (needsSrcDir && !dry) {
    fse.mkdirSync(path.resolve(dir, 'src', packageNamePascal), {
      recursive: true,
    });
  }

  // Write all component files
  for (const { name, contents } of files) {
    if (dry) {
      console.log(
        chalk.greenBright('(dry-run)'),
        `Would write ${name} to ${path.resolve(dir, name)}`,
      );
      verbose && console.log(chalk.gray(contents));
      continue;
    }
    fse.writeFile(path.resolve(dir, name), contents, handleErr);
  }
}

function handleErr(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}
