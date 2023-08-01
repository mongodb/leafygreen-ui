/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import fse from 'fs-extra';
import { camelCase, kebabCase, startCase } from 'lodash';
import path from 'path';

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

export function createPackage(name: string, options: CreatePackageOptions) {
  const rootDir = process.cwd();

  const { scopes } = getLGConfig();
  const scope = options.scope ?? Object.keys(scopes)[0];
  const directory = options.directory ?? Object.values(scopes)[0];

  // Construct all required parameters
  const packageNameKebab = kebabCase(name);
  const packageNameTitle = startCase(name);
  const packageNamePascal = camelCase(name).replace(/^\w/, c =>
    c.toUpperCase(),
  );

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

function handleErr(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}

function writeFiles(
  files: Array<{
    name: string;
    contents: string;
  }>,
  config: {
    dir: string;
    packageNamePascal: string;
  },
) {
  // Make the directory src and src/Component
  fse.mkdirSync(path.resolve(config.dir, 'src', config.packageNamePascal), {
    recursive: true,
  });

  // Write all component files
  for (const { name, contents } of files) {
    fse.writeFile(path.resolve(config.dir, name), contents, handleErr);
  }
}
