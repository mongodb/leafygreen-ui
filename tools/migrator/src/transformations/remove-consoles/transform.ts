// remove-consoles.js

import { type API, type FileInfo } from 'jscodeshift';

export default function transformer(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { type: 'Identifier', name: 'console' },
      },
    })
    .remove()
    .toSource();
}
