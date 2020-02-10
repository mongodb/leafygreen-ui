const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
// const typescript = require('rollup-plugin-typescript2');
const babel = require('rollup-plugin-babel');
const { default: svgr } = require('@svgr/rollup');
const urlPlugin = require('rollup-plugin-url');
const fs = require('fs');
const path = require('path');

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);
  return dirList.map(function(subDir) {
    subDir = path.resolve(dir, subDir);
    const json = require(`${subDir}/package.json`);
    return json.name;
  });
}

const extensions = ['.js', '.ts', '.tsx'];

const presets = ['@babel/preset-typescript', '@babel/preset-react'];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  'emotion',
];

module.exports = {
  external: [
    'react',
    'react-dom',
    'emotion',
    'react-emotion',
    'create-emotion',
    'create-emotion-server',
    'polished',
    'prop-types',
    'react-transition-group',
    ...getAllPackages('../../packages'),
  ],
  plugins: [
    resolve({ extensions }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        react: ['useRef', 'useEffect', 'useState', 'useCallback'],
      },
    }),
    babel({
      extensions,
      presets,
      plugins,
      exclude: /node_modules/,
    }),
    svgr(),
    urlPlugin({ limit: 50000, include: ['**/*.png'] }),
  ],
};
