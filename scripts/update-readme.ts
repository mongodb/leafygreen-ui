import { getAllPackageNames, getLGConfig } from '@lg-tools/meta';
import fs from 'fs';
import path from 'path';
// @ts-expect-error - no prettier types
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
  const lgConfig = getLGConfig();

  const initialTable = `
## Packages
| Package | Latest | Downloads | Live Example |
| ------- | ------ | --------- | ---- |`;

  const packagesTable = packages.reduce((md, pkg) => {
    const [scope, pkgName] = pkg.split('/');
    const scopePath = lgConfig.scopes[scope];
    // Link to the package source
    const pkgMd = `[${pkg}](./${scopePath}/${pkgName})`;
    // Link to the package on npm, with a status badge
    const versionMd = `[![version](https://img.shields.io/npm/v/${pkg})](https://www.npmjs.com/package/${pkg})`;
    // An npm downloads badge
    const downloadsMd = `![downloads](https://img.shields.io/npm/dm/${pkg}?color=white)`;
    // Link to the live example on mongodb.design, if it exists
    const exampleMd =
      scope !== '@lg-tools'
        ? `[Live Example](http://mongodb.design/component/${pkgName}/live-example)`
        : '';
    const newTableRow = `| ${pkgMd} | ${versionMd} | ${downloadsMd} | ${exampleMd} |`;
    return md + '\n' + newTableRow;
  }, initialTable);

  const prettierConfig = await prettier.resolveConfig(
    '@lg-tools/lint/config/prettier.config.js',
  );
  const formattedTable = prettier.format(
    packagesTable,
    prettierConfig ? { ...prettierConfig, parser: 'markdown' } : undefined,
  );

  return formattedTable;
}
