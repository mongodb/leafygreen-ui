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

  const packagesTable = packages.reduce(
    (md, pkg) => {
      const [scope, pkgName] = pkg.split('/');
      const scopePath = lgConfig.scopes[scope];
      const pkgMd = `[${pkg}](./${scopePath}/${pkgName})`;
      const versionMd = `[![version](https://img.shields.io/npm/v/${pkg})](https://www.npmjs.com/package/${pkg})`;
      const downloadsMd = `![downloads](https://img.shields.io/npm/dm/${pkg}?color=white)`;
      const docsMd = `[Docs](http://mongodb.design/component/${pkgName}/example)`;
      md += '\n' + `| ${pkgMd} | ${versionMd} | ${downloadsMd} | ${docsMd} |`;
      return md;
    },
    `## Packages
| Package | Latest | Downloads | Docs |
| ------- | ------ | --------- | ---- |`,
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
