import fse from 'fs-extra';
import path from 'path';

export function writeFiles(
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

function handleErr(err: NodeJS.ErrnoException | null) {
  if (err) throw err;
}
