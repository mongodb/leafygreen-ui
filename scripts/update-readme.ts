import { getAllPackageNames } from '@lg-tools/meta';
import fs from 'fs';
import path from 'path';
import * as prettier from 'prettier';

updateReadme();

async function updateReadme() {
  const readmeFile = path.resolve(__dirname, '../README.md');
  const readme = fs.readFileSync(readmeFile, 'utf-8');

  const tableMd = await buildTable();
  const regex = /(## Packages)+?(\n|.)+?(?=((## [a-zA-Z ]*\n)+?))/;
  const newReadme = readme.replace(regex, tableMd);

  fs.writeFileSync(readmeFile, newReadme);
}

async function buildTable() {
  const packages = getAllPackageNames();
  const packagesTable = packages.reduce(
    (md, pkg) => {
      const [_, pkgName] = pkg.split('/');
      const pkgMd = `[${pkg}](http://mongodb.design/component/${pkgName}/example)`;
      const versionMd = `[![version](https://img.shields.io/npm/v/${pkg})](https://www.npmjs.com/package/${pkg})`;
      const downloadsMd = `![downloads](https://img.shields.io/npm/dm/${pkg}?color=white)`;
      md += '\n' + `| ${pkgMd} | ${versionMd} | ${downloadsMd} |`;
      return md;
    },
    `## Packages
| Package | Latest | Downloads |
| -------- | ------ | --------- |`,
  );

  const prettierConfig = await prettier.resolveConfig(
    '@lg-tools/lint/config/prettier.config.js',
  );
  const formattedTable = prettier.format(
    packagesTable,
    prettierConfig ? { ...prettierConfig, parser: 'markdown' } : undefined,
  );

  return formattedTable;
}
