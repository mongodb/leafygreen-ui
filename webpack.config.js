const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

// A list of languages we support syntax highlighting for.
// This whitelist is used to omit the inclusion of languages we don't
// support in order to keep the bundle smaller.
const hljsSupportedLanguages = [
  'javascript',
  'typescript',
  'csp', // C#
  'cpp', // C++
  'go',
  'java',
  'perl',
  'php',
  'python',
  'ruby',
  'scala',
  'bash',
  'shell',
  'sql',
  'yaml',
  'json',
];

function getAllPackages(dir) {
  const dirList = fs.readdirSync(dir);
  return dirList.map(function(subDir) {
    subDir = path.resolve(dir, subDir);
    const json = require(`${subDir}/package.json`);
    return json.name;
  });
}

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'production') {
  const isProduction = env === 'production';

  return {
    mode: env,
    entry: './src/index',
    target: 'web',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
      libraryTarget: isProduction ? 'umd' : undefined,
    },

    externals: isProduction
      ? [
          'react',
          'emotion',
          'react-emotion',
          'create-emotion',
          'polished',
          'prop-types',
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
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 50000,
          },
        },
      ],
    },

    plugins: (function() {
      // Removes the dist directory when building
      const CleanWebpackPluginInstance = new CleanWebpackPlugin([
        path.resolve(process.cwd(), 'dist'),
      ]);

      // Defines global variables
      const DefinePluginInstance = new webpack.DefinePlugin({
        __DEV__: JSON.stringify((!isProduction).toString()),
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

      return [
        CleanWebpackPluginInstance,
        DefinePluginInstance,
        ContextReplacementPluginInstance,
      ];
    })(),
  };
};
