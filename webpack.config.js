const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

// A list of languages we support syntax highlighting for.
// This whitelist is used to omit the inclusion of languages we don't
// support in order to keep the bundle smaller.
const hljsSupportedLanguages = [
  'javascript',
  'typescript',
  'cs', // C#
  'c-like', // C++
  'go',
  'ini', // includes toml
  'java',
  'perl',
  'php',
  'python',
  'ruby',
  'rust',
  'scala',
  'swift',
  'kotlin',
  'objectivec',
  'bash',
  'shell',
  'sql',
  'yaml',
  'json',
  'diff',
];

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);

  return dirList
    .map(subDir => `${path.resolve(dir, subDir)}/package.json`)
    .filter(packageJsonPath => fs.existsSync(packageJsonPath))
    .map(packageJsonPath => require(packageJsonPath).name);
}

function getLodashExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, 'node_modules', 'lodash'))
    .filter(fileName => {
      const splitName = fileName.split('.');
      const extension = splitName[splitName.length - 1];

      return extension === 'js';
    })
    .map(fileName => 'lodash/' + fileName.split('.')[0]);
}

function getDirectGlyphImports() {
  const glyphsDir = path.resolve(__dirname, './packages/icon/src/glyphs');

  return fs
    .readdirSync(glyphsDir)
    .filter(path => /.svg/.test(path))
    .map(
      fileName => `@leafygreen-ui/icon/dist/${path.basename(fileName, '.svg')}`,
    );
}

function getGeneratedFiles() {
  const directory = path.resolve(process.cwd(), 'src/generated');

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter(file => /\.tsx?$/.test(file))
    .map(file => path.resolve(directory, file));
}

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function (env = 'production') {
  const isProduction = env === 'production';

  const baseConfig = {
    mode: env,
    externals: isProduction
      ? [
          'react',
          'react-dom',
          'emotion',
          'react-emotion',
          'create-emotion',
          'create-emotion-server',
          'polished',
          'prop-types',
          'react-transition-group',
          '@testing-library/react',
          'lodash',
          ...getLodashExternals(),
          ...getAllPackages('../../packages'),
          ...getDirectGlyphImports(),
        ]
      : [],

    resolve: {
      extensions: ['.js', '.json', '.less', '.css', '.tsx', '.ts'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              // Makes Babel treat the directory containing babel.config.js as the project root
              rootMode: 'upward',
            },
          },
          exclude: /node_modules/,
        },

        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: '@svgr/webpack',
        },

        {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 50000,
          },
        },
        {
          test: /\.less(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },

    plugins: (function () {
      // Intercepts non-whitelisted modules from Highlight.js
      //
      // Previously, Highlight.js would import every language it supports,
      // regardless of whether or not we were using it.
      //
      // This cuts the bundle size for the syntax component down to around
      // 1/20th of the size that it would otherwise be.
      const ContextReplacementPluginInstance = new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${hljsSupportedLanguages.join('|')})$`),
      );

      return [ContextReplacementPluginInstance];
    })(),
  };

  const baseOutputConfig = {
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: isProduction ? 'umd' : undefined,
    globalObject: "(typeof self !== 'undefined' ? self : this)",
  };

  return [
    {
      ...baseConfig,
      entry: './src/index',
      output: {
        ...baseOutputConfig,
        filename: 'index.bundle.js',
      },
    },
    ...getGeneratedFiles().map(entry => ({
      ...baseConfig,
      entry,
      output: {
        ...baseOutputConfig,
        filename: `${path.basename(entry, path.extname(entry))}.js`,
      },
    })),
  ];
};
