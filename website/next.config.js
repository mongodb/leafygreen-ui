const path = require('path');
const fs = require('fs');

function getAliasList(dir) {
  const dirList = fs.readdirSync(dir);

  return dirList.map(dir => {
    return {
      name: `@leafygreen-ui/${dir}`,
      path: path.resolve(__dirname, `../packages/${dir}`),
    };
  });
}

const aliasPathsToResolve = getAliasList('../packages');
console.log(aliasPathsToResolve);

module.exports = () => {
  return {
    webpack(config, { defaultLoaders }) {
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../pages')],
        use: [defaultLoaders.babel],
      });

      /** Resolve aliases */
      aliasPathsToResolve.forEach(module => {
        config.resolve.alias[module.name] = module.path;
      });
    },
  };
};
