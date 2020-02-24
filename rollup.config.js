import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import svgr from '@svgr/rollup';
import urlPlugin from 'rollup-plugin-url';
import fs from 'fs';
import path from 'path';

function getAllPackages(dir) {
  const dirContent = fs.readdirSync(dir);

  return dirContent.map(subDir => {
    const packageConfigPath = path.resolve(dir, subDir) + '/package.json';

    return require(packageConfigPath).name;
  });
}

function generateConfig(target) {
  const isESM = target === 'esm';

  return {
    input: 'src/index.ts',
    output: {
      file: `dist/index.${target}.js`,
      format: isESM ? 'esm' : 'cjs',

      // Rollup warns about mixing named and default exports when building for CJS.
      // Explicitly setting exports to 'named' for those builds disables the warning,
      // though we might want to address this in the future by changing how we export.
      exports: isESM ? 'auto' : 'named',
      sourcemap: true,
    },

    external: id =>
      [
        'react',
        'react-dom',
        'emotion',
        'react-emotion',
        'create-emotion',
        'create-emotion-server',
        'polished',
        'prop-types',
        'react-transition-group',
        ...getAllPackages('../../packages'), // LeafyGreen UI Packages

        // We test if an import includes lodash to avoid having to whitelist every nested lodash module individually
      ].includes(id) || /lodash/.test(id),

    plugins: [
      replace({ __TARGET__: target }),

      commonjs({
        include: /node_modules/,
        namedExports: {
          // React only exports CJS for hooks
          react: ['useRef', 'useEffect', 'useState', 'useCallback', 'useMemo'],
        },
      }),

      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          module: isESM ? 'esnext' : 'commonjs',
        },
      }),

      urlPlugin({
        limit: 50000,
        include: ['**/*.png'],
      }),

      urlPlugin({
        limit: 0,
        include: ['**/*.less'],
        fileName: '[name][extname]',
      }),

      svgr(),
    ],
  };
}

const targets = ['esm', 'node'];

export default targets.map(generateConfig);
