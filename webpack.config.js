const path = require('path');
const webpack = require('webpack');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'production') {
  const isProduction = env === 'production';

  return {
    mode: env,
    entry: './src/index.js',
    target: 'web',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
      libraryTarget: isProduction ? 'umd' : undefined,
      libraryExport: 'default',
    },

    externals: isProduction
      ? [
          'react',
          'emotion',
          'react-emotion',
          'create-emotion',
          'polished',
          'prop-types',
        ]
      : [],

    resolve: {
      extensions: ['.js', '.json', '.less', '.css'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
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
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 8192,
          },
        },
      ],
    },

    plugins: (function() {
      let plugins = [
        // Defines global variables
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify((!isProduction).toString()),
        }),
      ];

      return plugins;
    })(),
  };
};
