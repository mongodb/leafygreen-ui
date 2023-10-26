import fse from 'fs-extra';
import path from 'path';

import { makeId, makeVarName } from './utils';

buildRulesIndexFile();

export function buildRulesIndexFile() {
  const rulesDir = path.resolve(__dirname, '../src/rules');
  fse.readdir(rulesDir).then(files => {
    files = files.filter(file => file !== 'index.ts');
    const importStatements = files
      .map(fileName => {
        const fileId = makeId(fileName.replace('.ts', ''));
        return `import { ${makeVarName(fileId)} } from './${fileId}';`;
      })
      .join('\n');

    const declarations = files
      .map(fileName => {
        const fileId = makeId(fileName.replace('.ts', ''));
        return `  '${fileId}' : ${makeVarName(fileId)},`;
      })
      .join('\n');

    const indexContent = `/**
* DO NOT MODIFY THIS FILE
* ANY CHANGES WILL BE REMOVED ON THE NEXT BUILD
*/
${importStatements}

export const rules = {
${declarations}
}
`;

    fse.writeFile(path.resolve(rulesDir, 'index.ts'), indexContent);
  });
}
