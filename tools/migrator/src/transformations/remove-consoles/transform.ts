// remove-consoles.js
// @ts-nocheck

export default (fileInfo, api) => {
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
};
