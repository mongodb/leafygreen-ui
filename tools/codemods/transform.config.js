//TODO: is this doing anything?
function resolve(transform) {
  return require.resolve(`./dist/codemods/${transform}/transform`);
}

module.exports = {
  presets: {
    'consolidate-props': resolve('consolidate-props'),
    'rename-component-prop': resolve('rename-component-prop'),
    'update-component-prop-value': resolve('update-component-prop-value'),
  },
};
