//TODO: is this doing anything?
function resolve(transform) {
  return require.resolve(`./dist/codemods/${transform}/transform`);
}

module.exports = {
  presets: {
    'popover-v12': resolve('popover-v12'),
  },
};
