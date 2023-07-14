// import { spawn } from 'child_process';
import fs from 'fs';
import { camelCase, kebabCase, startCase } from 'lodash';
import path from 'path';

import { CreatePackageOptions } from './create.types';
import {
  component,
  componentIndex,
  index,
  pkgJson,
  readMe,
  tsConfig,
  spec,
  types,
  styles,
} from './templates';

export function createPackage(
  name: string,
  { directory, scope }: CreatePackageOptions,
) {
  const rootDir = process.cwd();

  console.log({ name, directory });

  // Construct all required parameters
  const packageNameKebab = kebabCase(name);
  const packageNameTitle = startCase(name);
  const packageNamePascal = camelCase(name).replace(/^\w/, c =>
    c.toUpperCase(),
  );

  // Create the appropriate directory
  const packageDir = path.resolve(rootDir, directory, packageNameKebab);
  const makeFile = (fileName: string, contents: string) => {
    return fs.writeFile(
      path.resolve(packageDir, fileName),
      contents,
      handleErr,
    );
  };

  fs.mkdir(packageDir, { recursive: true }, err => {
    if (err) {
      console.log(`Package ${packageNameKebab} already exists`);
      return;
    }

    // Write the appropriate files for each template
    makeFile(
      'package.json',
      pkgJson({ scope, packageNameKebab, packageNameTitle }),
    );

    makeFile('tsconfig.json', tsConfig);
    makeFile('readme.md', readMe({ packageNameKebab, packageNameTitle }));

    /** src directory */
    fs.mkdir(path.resolve(packageDir, 'src'), { recursive: true }, err => {
      makeFile('src/index.ts', index({ packageNamePascal }));
      makeFile(
        `src/${packageNamePascal}.story.tsx`,
        index({ packageNamePascal }),
      );

      /** src/ComponentName directory */
      fs.mkdir(
        path.resolve(packageDir, `src/${packageNamePascal}`),
        { recursive: true },
        err => {
          const subDir = `src/${packageNamePascal}`;

          makeFile(`${subDir}/index.ts`, componentIndex({ packageNamePascal }));

          makeFile(
            `${subDir}/${packageNamePascal}.tsx`,
            component({ packageNamePascal }),
          );

          makeFile(
            `${subDir}/${packageNamePascal}.spec.tsx`,
            spec({ packageNamePascal, packageNameKebab }),
          );

          makeFile(
            `${subDir}/${packageNamePascal}.types.ts`,
            types({ packageNamePascal, packageNameKebab }),
          );

          makeFile(`${subDir}/${packageNamePascal}.styles.ts`, styles);
        },
      );
    });
  });
}

function handleErr(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}
