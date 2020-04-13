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
  'cpp', // C++
  'go',
  'java',
  'perl',
  'php',
  'python',
  'ruby',
  'scala',
  'swift',
  'kotlin',
  'objectivec',
  'bash',
  'shell',
  'sql',
  'yaml',
  'json',
];

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);
  return dirList.map(function (subDir) {
    subDir = path.resolve(dir, subDir);
    const json = require(`${subDir}/package.json`);
    return json.name;
  });
}

// Base Webpack configuration, used by all other configurations for common settings
function generateConfigFunc(target = 'web') {
  return function (env = 'production') {
    const isProduction = env === 'production';

    return {
      mode: env,
      entry: './src/index',
      target: target,
      output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: `index.${target}.js`,
        libraryTarget: isProduction ? 'umd' : undefined,
      },

      externals: isProduction
        ? [
            'react',
            'react-dom',
            'emotion',
            'lodash',
            'react-emotion',
            'create-emotion',
            'create-emotion-server',
            'polished',
            'prop-types',
            'react-transition-group',
            '@testing-library/react',
            ...getAllPackages('../../packages'),
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
        // Defines global variables
        const DefinePluginInstance = new webpack.DefinePlugin({
          __DEV__: JSON.stringify((!isProduction).toString()),
          __TARGET__: JSON.stringify(target.toString()),
        });

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

        return [DefinePluginInstance, ContextReplacementPluginInstance];
      })(),
    };
  };
}

module.exports = [generateConfigFunc('web'), generateConfigFunc('node')];
