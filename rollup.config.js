import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import svgr from '@svgr/rollup';
import urlPlugin from 'rollup-plugin-url';
import fs from 'fs';
import path from 'path';

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);
  return dirList.map(function(subDir) {
    subDir = path.resolve(dir, subDir);
    const json = require(`${subDir}/package.json`);
    return json.name;
  });
}

const leafyGreenPackages = getAllPackages('../../packages');

const external = id => {
  const externals = [
    'react',
    'react-dom',
    'emotion',
    'react-emotion',
    'create-emotion',
    'create-emotion-server',
    'polished',
    'prop-types',
    'react-transition-group',
    // LeafyGreen UI Packages
    ...leafyGreenPackages,
  ];

  if (externals.includes(id)) {
    return true;
  }

  // We handle lodash imports this way so we can treat 'lodash/omit'
  // as an external as we do with 'lodash'
  if (/lodash/.test(id)) {
    return true;
  }

  return false;
};

function generateConfig(target) {
  const replacePlugin = replace({ __TARGET__: `'${target}'` });

  const resolvePlugin = resolve({
    extensions: ['.js', '.jsx', '.ts', 'tsx'],
  });

  const commonjsPlugin = commonjs({
    include: /node_modules/,
    namedExports: {
      react: ['useRef', 'useEffect', 'useState', 'useCallback', 'useMemo'],
    },
  });

  const typescriptPlugin = typescript({
    tsconfig: 'tsconfig.json',

    tsconfigOverride: {
      module: target === 'esm' ? 'esnext' : 'commonjs',
    },

    verbosity: 2,
  });

  const urlLoaderPlugin = urlPlugin({
    limit: 50000,
    include: ['**/*.png'],
  });

  return {
    input: 'src/index.ts',
    output: {
      file: `dist/index.${target}.js`,
      format: target === 'esm' ? 'esm' : 'cjs',
      sourcemap: true,
    },
    external,
    plugins: [
      replacePlugin,
      resolvePlugin,
      commonjsPlugin,
      typescriptPlugin,
      urlLoaderPlugin,
      svgr(),
    ],
  };
}

export default [generateConfig('esm'), generateConfig('node')];
