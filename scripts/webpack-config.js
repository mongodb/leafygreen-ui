const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = function(env = 'development') {
  const isProduction = env === 'production';

  return {
    entry: './src/index.js',

    target: 'web',

    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
      library: isProduction ? 'leafygreen' : undefined,
      libraryTarget: isProduction ? 'umd' : undefined,
    },

    externals: isProduction ?
      [
        'react',
        'react-emotion',
        'polished',
        'prop-types',
      ] :
      [],

    resolve: {
      extensions: ['.js', '.json', '.less', '.css'],
    },

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{ loader: 'babel-loader' }],
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
        new CleanWebpackPlugin([path.resolve(process.cwd(), 'dist')]),

        // Defines global variables
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(
              isProduction ? 'production' : 'development',
            ),
          },
          __DEV__: JSON.stringify(JSON.parse(isProduction ? 'false' : 'true')),
        }),
      ];

      if (isProduction) {
        plugins = [
          ...plugins,
          new webpack.optimize.ModuleConcatenationPlugin(),
        ]
      } else {
        plugins = [
          ...plugins,

          // Prints more readable module names in the browser console on HMR updates
          new webpack.NamedModulesPlugin(),

          // Do not emit compiled assets that include errors
          new webpack.NoEmitOnErrorsPlugin(),
        ]
      }

      return plugins;
    })(),
  };
};
