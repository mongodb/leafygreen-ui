/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { getNameVariants } from './utils/getNameVariants';
import { CreatePackageOptions } from './create.types';
import { changeset } from './templates';

interface CreateChangesetArgs
  extends Pick<Required<CreatePackageOptions>, 'scope'>,
    Omit<CreatePackageOptions, 'scope'> {
  name: string;
}

export function createChangeset({
  name,
  scope,
  dry,
  verbose,
}: CreateChangesetArgs) {
  const rootDir = process.cwd();
  const { packageNameKebab, packageNamePascal } = getNameVariants(name);

  // Write changeset file to repo root .changeset directory
  const changesetDir = path.resolve(rootDir, '.changeset');
  const changesetFile = `${packageNameKebab}.md`;
  const fileContents = changeset({
    scope,
    packageNameKebab,
    packageNamePascal,
  });

  if (dry) {
    console.log(
      chalk.greenBright('(dry-run)'),
      `Would write ${changesetFile} to ${path.resolve(
        changesetDir,
        changesetFile,
      )}`,
    );
    verbose && console.log(chalk.gray(fileContents));
    return;
  }

  // Ensure .changeset directory exists
  fse.mkdirSync(changesetDir, { recursive: true });

  // Write the changeset file
  fse.writeFile(
    path.resolve(changesetDir, changesetFile),
    fileContents,
    handleErr,
  );

  console.log(chalk.green(`Created changeset: ${chalk.bold(changesetFile)}`));
}

function handleErr(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}
